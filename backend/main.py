import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from apscheduler.schedulers.background import BackgroundScheduler

from config import settings
# Aici vei include ulterior routerele tale (ex: auth, classes, bookings, waitlist)
# from routers import auth, classes, bookings, waitlist, reminders

scheduler = BackgroundScheduler()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Aici poți adăuga task-uri automate care rulează în fundal (ex: trimitere remindere email)
    # scheduler.add_job(trimite_remindere_zilnice, 'interval', hours=1)
    scheduler.start()
    print("[APScheduler] Scheduler-ul pentru remindere și waitlist a fost pornit.")
    
    yield
    
    scheduler.shutdown()
    print("[APScheduler] Scheduler-ul a fost oprit.")

app = FastAPI(
    title="Pilates Booking API",
    lifespan=lifespan
)

# Configurare CORS preluată din setări
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Aici vei adăuga rutele când le creezi:
# app.include_router(auth.router)
# app.include_router(classes.router)
# app.include_router(bookings.router)
# app.include_router(waitlist.router)

@app.get("/")
def root():
    return {"message": "API-ul pentru programări la orele de Pilates este activ și funcțional!"}