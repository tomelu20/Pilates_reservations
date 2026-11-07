from sqlalchemy import (
    CheckConstraint,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    text,
)
from sqlalchemy.dialects.mssql import TINYINT
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"
    __table_args__ = (
        CheckConstraint(
            "role IN ('admin', 'instructor', 'client')",
            name="ck_users_role",
        ),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)
    nume = Column(String(255), nullable=False)
    prenume = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    phone_number = Column(String(20), nullable=False)
    role = Column(String(20), nullable=False, server_default=text("'client'"))
    is_verified = Column(TINYINT, server_default=text("0"))
    verification_code = Column(String(100), nullable=True)
    verification_code_expires_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=text("GETDATE()"))

    teaching_classes = relationship(
        "Class", back_populates="instructor", foreign_keys="Class.instructor_id"
    )
    subscriptions = relationship("Subscription", back_populates="user")
    bookings = relationship("Booking", back_populates="user")
    waitlist_entries = relationship("Waitlist", back_populates="user")


class Class(Base):
    __tablename__ = "classes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    instructor_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    capacity = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), server_default=text("0.00"))
    created_at = Column(DateTime, server_default=text("GETDATE()"))

    instructor = relationship(
        "User", back_populates="teaching_classes", foreign_keys=[instructor_id]
    )
    bookings = relationship("Booking", back_populates="class_session")
    waitlist_entries = relationship("Waitlist", back_populates="class_session")


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    total_credits = Column(Integer, nullable=False)
    remaining_credits = Column(Integer, nullable=False)
    expires_at = Column(Date, nullable=False)
    created_at = Column(DateTime, server_default=text("GETDATE()"))

    user = relationship("User", back_populates="subscriptions")


class Booking(Base):
    __tablename__ = "bookings"
    __table_args__ = (
        CheckConstraint(
            "status IN ('confirmed', 'cancelled', 'attended')",
            name="ck_bookings_status",
        ),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    class_id = Column(
        Integer, ForeignKey("classes.id", ondelete="NO ACTION"), nullable=False
    )
    status = Column(String(20), server_default=text("'confirmed'"))
    reminder_sent = Column(TINYINT, server_default=text("0"))
    booked_at = Column(DateTime, server_default=text("GETDATE()"))

    user = relationship("User", back_populates="bookings")
    class_session = relationship("Class", back_populates="bookings")


class Waitlist(Base):
    __tablename__ = "waitlist"
    __table_args__ = (
        CheckConstraint(
            "status IN ('waiting', 'promoted', 'cancelled')",
            name="ck_waitlist_status",
        ),
    )

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    class_id = Column(
        Integer, ForeignKey("classes.id", ondelete="NO ACTION"), nullable=False
    )
    position = Column(Integer, nullable=False)
    status = Column(String(20), server_default=text("'waiting'"))
    created_at = Column(DateTime, server_default=text("GETDATE()"))

    user = relationship("User", back_populates="waitlist_entries")
    class_session = relationship("Class", back_populates="waitlist_entries")
