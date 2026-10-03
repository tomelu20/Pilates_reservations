from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from config import settings

# Creare engine SQLAlchemy folosind URL-ul din config/settings
engine = create_engine(settings.DATABASE_URL)

# Factory pentru sesiuni de baza de date
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Clasa de bază pentru modelele ORM pe care le vei crea ulterior
Base = declarative_base()  

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()