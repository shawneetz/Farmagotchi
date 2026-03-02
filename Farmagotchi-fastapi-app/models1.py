"""
    This file contains the data models to structure the data in the dataBase
    matching the rows in the supaBase [postgres] dataBase used in this project.
"""
from sqlalchemy import Float, String, Integer, DateTime, Boolean, ForeignKey, Enum
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
    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4
    )

# ── User ─────────────────────────────────────────────────────────────────────

class User(UUIDMixin, TimestampMixin, Base):
    """
    Represents the farmer / account owner.
    """

    __tablename__ = "users"

    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    location: Mapped[str] = mapped_column(String(255), nullable=False)  # e.g., "Los Baños"
    isDeleted: Mapped[bool] = mapped_column(Boolean, default=False)

    plots = relationship("Plot", back_populates="user", cascade="all, delete-orphan")


# ── Plot ─────────────────────────────────────────────────────────────────────

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
    isDeleted: Mapped[bool] = mapped_column(Boolean, default=False)

    user = relationship("User", back_populates="plots")
    plants = relationship("Plant", back_populates="plot", uselist=False)
    tasks = relationship("Task", back_populates="plot", cascade="all, delete-orphan")
    scans = relationship("Scan", back_populates="plot", cascade="all, delete-orphan")
    transactions = relationship("Transaction", back_populates="plot", cascade="all, delete-orphan")
    chatMessages = relationship("ChatMessage", back_populates="plot", cascade="all, delete-orphan")


# ── Plants  ───────────────────────────────────────────────────

class Plant(UUIDMixin, TimestampMixin, Base):
    """
    Digital pet associated 1-to-1 with a plot.
    """

    __tablename__ = "plants"

    plotId: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("plots.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    plantImage: Mapped[str] = mapped_column(String(255), nullable=False)  # e.g., "tree.png"
    happiness: Mapped[int] = mapped_column(Integer, default=50)
    isDeleted: Mapped[bool] = mapped_column(Boolean, default=False)
    plot = relationship("Plot", back_populates="plants")


# ── Task ─────────────────────────────────────────────────────────────────────

class TaskCategory(str, TimestampMixin, enum.Enum):
    DAILY = "daily"
    WEEKLY = "weekly"
    MISCELLANEOUS = "miscellaneous"


class Task(UUIDMixin, Base, TimestampMixin):
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
    category: Mapped[TaskCategory] = mapped_column(Enum(TaskCategory), nullable=False)
    happinessReward: Mapped[int] = mapped_column(Integer, default=10)

    isCompleted: Mapped[bool] = mapped_column(Boolean, default=False)
    lastCompletedAt: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    plot = relationship("Plot", back_populates="tasks")


# ── Scan ─────────────────────────────────────────────────────────────────────

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


# ── Transaction ───────────────────────────────────────────────────────────────

class TransactionType(str, enum.Enum):
    INCOME = "income"
    EXPENSE = "expense"


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

    type: Mapped[TransactionType] = mapped_column(Enum(TransactionType), nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)  # e.g., "Rice", "Fertilizer"
    cost: Mapped[float] = mapped_column(Float, nullable=False)

    transactionDate: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    createdAt: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    plot = relationship("Plot", back_populates="transactions")


# ── Chat Message ──────────────────────────────────────────────────────────────

class MessageRole(str, enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"


class ChatMessage(UUIDMixin, Base):
    """
    Conversation history between user and Plants.
    """

    __tablename__ = "chatMessages"

    plotId: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("plots.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    role: Mapped[MessageRole] = mapped_column(Enum(MessageRole), nullable=False)
    content: Mapped[str] = mapped_column(String, nullable=False)

    createdAt: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    plot = relationship("Plot", back_populates="chatMessages")