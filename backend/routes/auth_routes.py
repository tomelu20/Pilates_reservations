import re
import secrets
import smtplib
from email.message import EmailMessage
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field, field_validator
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from database import get_db
from models import User

router = APIRouter(prefix="/api/auth", tags=["Autentificare & Înregistrare"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---------------------------------------------------------
# MODELE DE VALIDARE PYDANTIC
# ---------------------------------------------------------
class UserRegister(BaseModel):
    nume: str = Field(..., min_length=1)
    prenume: str = Field(..., min_length=1)
    email: EmailStr
    phone_number: str
    password: str

    @field_validator('phone_number')
    @classmethod
    def validate_phone(cls, v: str) -> str:
        if not re.match(r'^\d{10}$', v):
            raise ValueError('Numărul de telefon trebuie să conțină exact 10 cifre.')
        return v

    @field_validator('password')
    @classmethod
    def validate_password_complexity(cls, v: str) -> str:
        if len(v) < 6:
            raise ValueError('Parola trebuie să conțină minim 6 caractere.')
        if not re.search(r'[A-Z]', v):
            raise ValueError('Parola trebuie să conțină cel puțin o literă mare.')
        if not re.search(r'[a-z]', v):
            raise ValueError('Parola trebuie să conțină cel puțin o literă mică.')
        if not re.search(r'[0-9]', v):
            raise ValueError('Parola trebuie să conțină cel puțin un număr.')
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', v):
            raise ValueError('Parola trebuie să conțină cel puțin un caracter special.')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class GoogleAuthModel(BaseModel):
    email: EmailStr
    nume: str
    prenume: str
    google_id: str

class VerifyEmailModel(BaseModel):
    email: EmailStr
    code: str

# ---------------------------------------------------------
# FUNCȚIE AUXILIARĂ TRIMITERE EMAIL
# ---------------------------------------------------------
def send_verification_email(to_email: str, code: str):
    # Configurează datele serverului tău SMTP (exemplu Gmail sau alt furnizor)
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "emailul_tau@gmail.com"
    sender_password = "parola_ta_de_aplicatie"

    msg = EmailMessage()
    msg.set_content(f"Bun venit la Zenith Studio!\n\nCodul tău de verificare este: {code}\nAcest cod este valabil 24 de ore.")
    msg["Subject"] = "Cod de verificare - Zenith Studio"
    msg["From"] = sender_email
    msg["To"] = to_email

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
    except Exception as e:
        print(f"Eroare la trimiterea emailului SMTP: {e}")

# ---------------------------------------------------------
# RUTE BACKEND
# ---------------------------------------------------------

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserRegister, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Acest email este deja înregistrat."
        )

    hashed_password = pwd_context.hash(user_data.password)

    # Generare cod scurt numeric de 6 cifre pentru o experiență de utilizare fluidă
    verification_code = "".join([str(secrets.randbelow(10)) for _ in range(6)])
    expires_at = datetime.utcnow() + timedelta(hours=24)

    new_user = User(
        nume=user_data.nume,
        prenume=user_data.prenume,
        email=user_data.email,
        password_hash=hashed_password,
        phone_number=user_data.phone_number,
        role="client",
        is_verified=0,
        verification_code=verification_code,
        verification_code_expires_at=expires_at
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Trimiterea efectivă a emailului
    send_verification_email(new_user.email, verification_code)

    return {
        "message": "Utilizator înregistrat cu succes. Un cod de verificare a fost trimis pe email.",
        "email": new_user.email
    }


@router.post("/verify-email")
def verify_email(data: VerifyEmailModel, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilizatorul nu a fost găsit.")

    if user.is_verified == 1:
        return {"message": "Contul este deja verificat."}

    if user.verification_code != data.code:
        raise HTTPException(status_code=400, detail="Codul de verificare este incorect.")

    if user.verification_code_expires_at and datetime.utcnow() > user.verification_code_expires_at:
        raise HTTPException(status_code=400, detail="Codul de verificare a expirat.")

    # Activarea contului
    user.is_verified = 1
    user.verification_code = None
    user.verification_code_expires_at = None
    db.commit()

    return {"message": "Contul a fost activat cu succes! Te poți autentifica."}


@router.post("/login")
def login_user(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not user.password_hash:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email sau parolă incorectă."
        )

    if not pwd_context.verify(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email sau parolă incorectă."
        )

    if user.is_verified == 0:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Te rugăm să îți verifici adresa de email înainte de autentificare."
        )

    return {
        "access_token": "fake-jwt-token-example",
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "nume": user.nume,
            "prenume": user.prenume,
            "email": user.email,
            "role": user.role
        }
    }


@router.post("/google")
def google_auth(data: GoogleAuthModel, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        user = User(
            nume=data.nume,
            prenume=data.prenume,
            email=data.email,
            password_hash=None,
            phone_number="0000000000",
            role="client",
            is_verified=1
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return {
        "access_token": "fake-google-jwt-token-example",
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "nume": user.nume,
            "prenume": user.prenume,
            "email": user.email,
            "role": user.role
        }
    }