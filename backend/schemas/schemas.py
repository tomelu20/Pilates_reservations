from pydantic import BaseModel, EmailStr, Field, field_validator
import re

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

class VerifyEmailModel(BaseModel):
    email: EmailStr
    code: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class GoogleAuthModel(BaseModel):
    email: EmailStr
    nume: str
    prenume: str
    google_id: str