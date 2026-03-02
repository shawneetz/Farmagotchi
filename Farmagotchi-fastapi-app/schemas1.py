"""
    This file contains the schema objects to be used for input and data validation,
    to ensure data integrity, before inserting data to the database.
"""

from pydantic import BaseModel, ConfigDict, Field, EmailStr, field_validator
from uuid import UUID
from datetime import datetime
from typing import Optional, List, Literal


# ── User ────────────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=2, max_length=255)
    location: str = Field(..., max_length=255)  # e.g., "Los Baños"

class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=255)
    location: Optional[str] = Field(None, max_length=255)

class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    name: str
    location: str
    createdAt: datetime
    updatedAt: datetime

    model_config = ConfigDict(from_attributes=True)


# ── Plot ─────────────────────────────────────────────────────────────────────

class PlotCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    cropType: str = Field(..., min_length=2, max_length=100)
    sizeArea: Optional[float] = Field(None, gt=0)
    isActive: Optional[bool] = True

class PlotUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=255)
    cropType: Optional[str] = Field(None, min_length=2, max_length=100)
    sizeArea: Optional[float] = Field(None, gt=0)
    isActive: Optional[bool] = None

class PlotResponse(BaseModel):
    id: UUID
    userId: UUID
    name: str
    cropType: str
    sizeArea: Optional[float]
    isActive: bool
    createdAt: datetime
    updatedAt: datetime

    model_config = ConfigDict(from_attributes=True)


# ── Plant/Pet ──────────────────────────────────────────────────

class PlantCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    plotId: UUID 
    petImage: str = Field(..., max_length=255)  # e.g., "tree.png"

class PlantUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=255)
    petImage: Optional[str] = Field(None, max_length=255)

class PlantResponse(BaseModel):
    id: UUID
    plotId: UUID
    name: str
    petImage: str
    happiness: int
    createdAt: datetime
    updatedAt: datetime

    model_config = ConfigDict(from_attributes=True)


# ── Task ─────────────────────────────────────────────────────────────────────

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    category: Literal["daily", "weekly", "miscellaneous"]
    happinessReward: int = Field(..., ge=0, le=100)

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=255)
    category: Optional[Literal["daily", "weekly", "miscellaneous"]] = None
    happinessReward: Optional[int] = Field(None, ge=0, le=100)
    isCompleted: Optional[bool] = None

class TaskResponse(BaseModel):
    id: UUID
    plotId: UUID
    title: str
    category: str
    happinessReward: int
    isCompleted: bool
    lastCompletedAt: Optional[datetime]
    createdAt: datetime
    updatedAt: datetime

    model_config = ConfigDict(from_attributes=True)


# ── Scan ─────────────────────────────────────────────────────────────────────

class ScanCreate(BaseModel):
    imageUrl: str = Field(..., max_length=2048)
    healthScore: int = Field(..., ge=0, le=100)
    anomalies: List[str] = Field(default_factory=list)
    tips: List[str] = Field(default_factory=list)
    happinessImpact: int = Field(..., ge=-100, le=100)

    @field_validator("anomalies", "tips")
    @classmethod
    def validate_string_list(cls, v):
        if any(len(item) > 255 for item in v):
            raise ValueError("List items must not exceed 255 characters.")
        return v

class ScanResponse(BaseModel):
    id: UUID
    plotId: UUID
    imageUrl: str
    healthScore: int
    anomalies: List[str]
    tips: List[str]
    happinessImpact: int
    createdAt: datetime

    model_config = ConfigDict(from_attributes=True)


# ── Transaction ───────────────────────────────────────────────────────────────

class TransactionCreate(BaseModel):
    type: Literal["income", "expense"]
    name: str = Field(..., min_length=2, max_length=100)  # e.g., "Rice", "Fertilizer"
    cost: float = Field(..., gt=0)
    transactionDate: datetime

class TransactionResponse(BaseModel):
    id: UUID
    plotId: UUID
    type: str
    name: str
    cost: float
    transactionDate: datetime
    createdAt: datetime

    model_config = ConfigDict(from_attributes=True)


# ── Chat Message ──────────────────────────────────────────────────────────────

class ChatMessageCreate(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(..., min_length=1, max_length=2000)

class ChatMessageResponse(BaseModel):
    id: UUID
    plotId: UUID
    role: str
    content: str
    createdAt: datetime

    model_config = ConfigDict(from_attributes=True)


# ── Weather ───────────────────────────────────────────────────────────────────

class WeatherResponse(BaseModel):
    location: str
    currentTemp: float
    highTemp: float
    lowTemp: float
    condition: Literal["cloud", "sun", "cloud-rain", "cloud-lightning", "cloud-snow", "wind", "cloud-drizzle"]