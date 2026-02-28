"""
    This file contains the data models to structure the data in the dataBase
    matching the rows in the supaBase [postgres] dataBase used in this project.
"""
from sqlalchemy import Float, String, Integer, DateTime, Boolean, Text, Numeric, ForeignKey, Enum
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.sql import func
from uuid import uuid4
from datetime import datetime
import enum


class Base(DeclarativeBase):
    pass

class TimestampMixin:
    """Reusable timestamp mixin."""
    createdAt: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    updatedAt: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

class UUIDMixin:
    """Reusable UUID primary key mixin."""
    id: Mapped[uuid4] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4
    )

class User(UUIDMixin, TimestampMixin, Base):
    """
    Represents the farmer / account owner.
    """

    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)

    # latitude: Mapped[float] = mapped_column(Float, nullable=False)
    # longitude: Mapped[float] = mapped_column(Float, nullable=False)
    # city: Mapped[str | None] = mapped_column(String(255))
    location: Mapped[dict] = mapped_column(JSON, nullable=False)

    plots = relationship("Plot", back_populates="user", cascade="all, delete-orphan")


class Plot(UUIDMixin, TimestampMixin, Base):
    """
    Represents a physical farming plot.
    """

    __tablename__ = "plots"

    userId: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    cropType: Mapped[str] = mapped_column(String(100), nullable=False)
    sizeArea: Mapped[float | None] = mapped_column(Float)
    isActive: Mapped[bool] = mapped_column(Boolean, default=True)

    user = relationship("User", back_populates="plots")
    farmagotchi = relationship("Farmagotchi", back_populates="plot", uselist=False)
    tasks = relationship("Task", back_populates="plot", cascade="all, delete-orphan")
    scans = relationship("Scan", back_populates="plot", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="plot", cascade="all, delete-orphan")
    chatMessages = relationship("ChatMessage", back_populates="plot", cascade="all, delete-orphan")


class EvolutionStageEnum(str, enum.Enum):
    EGG = "EGG"
    BABY = "BABY"
    JUVENILE = "JUVENILE"
    ADULT = "ADULT"

class Farmagotchi(UUIDMixin, TimestampMixin, Base):
    """
    Digital pet associated 1-to-1 with a plot.
    """

    __tablename__ = "farmagotchi"

    plotId: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("plots.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    petType: Mapped[str] = mapped_column(String(100), nullable=False)

    level: Mapped[int] = mapped_column(Integer, default=1)
    happiness: Mapped[int] = mapped_column(Integer, default=50)

    EvolutionStage: Mapped[EvolutionStageEnum] = mapped_column(
        Enum(EvolutionStageEnum),
        default=EvolutionStageEnum.EGG,
        nullable=False
    )

    plot = relationship("Plot", back_populates="farmagotchi")


class TaskFrequency(str, enum.Enum):
    DAILY = "DAILY"
    WEEKLY = "WEEKLY"
    ONCE = "ONCE"

class Task(UUIDMixin, Base):
    """
    Daily or recurring plot task.
    """

    __tablename__ = "tasks"

    plotId: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("plots.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(String)

    frequency: Mapped[TaskFrequency] = mapped_column(Enum(TaskFrequency))
    happinessReward: Mapped[int] = mapped_column(Integer, default=10)

    isCompleted: Mapped[bool] = mapped_column(Boolean, default=False)
    lastCompletedAt: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    createdAt: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default="now()"
    )

    plot = relationship("Plot", back_populates="tasks")


class Scan(UUIDMixin, Base):
    """
    AI crop analysis record.
    """

    __tablename__ = "scans"

    plotId: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("plots.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    imageUrl: Mapped[str] = mapped_column(String, nullable=False)
    healthScore: Mapped[int] = mapped_column(Integer)

    anomalies: Mapped[list[str]] = mapped_column(JSON)
    tips: Mapped[list[str]] = mapped_column(JSON)

    happinessImpact: Mapped[int] = mapped_column(Integer)

    createdAt: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    plot = relationship("Plot", back_populates="scans")

class TransactionType(str, enum.Enum):
    INCOME = "INCOME"
    EXPENSE = "EXPENSE"

class Transaction(UUIDMixin, Base):
    """
    Financial transaction tied to a plot.
    """

    __tablename__ = "transactions"

    plotId: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("plots.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    type: Mapped[TransactionType] = mapped_column(Enum(TransactionType))
    amount: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)

    category: Mapped[str] = mapped_column(String(100), nullable=False)
    notes: Mapped[str | None] = mapped_column(String)

    transactionDate: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    createdAt: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default="now()")

    plot = relationship("Plot", back_populates="transactions")

class MessageSender(str, enum.Enum):
    USER = "USER"
    FARMAGOTCHI = "FARMAGOTCHI"

class ChatMessage(UUIDMixin, Base):
    """
    Conversation history between user and Farmagotchi.
    """

    __tablename__ = "chatMessages"

    plotId: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("plots.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    sender: Mapped[MessageSender] = mapped_column(Enum(MessageSender))
    content: Mapped[str] = mapped_column(String, nullable=False)

    contextSnapshot: Mapped[dict | None] = mapped_column(JSON)

    createdAt: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    plot = relationship("Plot", back_populates="chatMessages")