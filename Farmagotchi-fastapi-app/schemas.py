"""
    This file contains the schema objects to be used for input and data validation,
    to ensure data integrity, before inserting data to the database.
"""


from pydantic import BaseModel, ConfigDict, Field, EmailStr, List, field_validator
from uuid import UUID
from datetime import datetime
from decimal import Decimal
from typing import Optional

from models import EvolutionStage, TaskFrequency, TransactionType, MessageSender

class LocationSchema(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    city: Optional[str] = Field(None, max_length=255)

class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=2, max_length=255)
    location: LocationSchema

class UserUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=255)
    location: Optional[LocationSchema]

class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    name: str
    location: LocationSchema
    createdAt: datetime
    updatedAt: datetime

    model_config = ConfigDict(from_attributes=True)

class PlotCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    cropType: str = Field(..., min_length=2, max_length=100)
    sizeArea: Optional[float] = Field(None, gt=0)
    isActive: Optional[bool] = True

class PlotUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=255)
    cropType: Optional[str] = Field(None, min_length=2, max_length=100)
    sizeArea: Optional[float] = Field(None, gt=0)
    isActive: Optional[bool]

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


class FarmagotchiCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    petType: str = Field(..., min_length=2, max_length=100)

class FarmagotchiUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=255)

class FarmagotchiResponse(BaseModel):
    id: UUID
    plotId: UUID
    name: str
    petType: str
    level: int
    happiness: int
    evolutionStage: EvolutionStage
    createdAt: datetime
    updatedAt: datetime

    model_config = {"from_attributes": True}

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    frequency: TaskFrequency
    happinessReward: int = Field(..., ge=0, le=100)

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    frequency: Optional[TaskFrequency]
    happinessReward: Optional[int] = Field(None, ge=0, le=100)
    isCompleted: Optional[bool]

class TaskResponse(BaseModel):
    id: UUID
    plotId: UUID
    title: str
    description: Optional[str]
    frequency: TaskFrequency
    happinessReward: int
    isCompleted: bool
    lastCompletedAt: Optional[datetime]
    createdAt: datetime

    model_config = ConfigDict(from_attributes=True)

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

class TransactionCreate(BaseModel):
    type: TransactionType
    amount: Decimal = Field(..., gt=0)
    category: str = Field(..., min_length=2, max_length=100)
    notes: Optional[str] = Field(None, max_length=1000)
    transactionDate: datetime

class TransactionCreate(BaseModel):
    type: TransactionType
    amount: Decimal = Field(..., gt=0)
    category: str = Field(..., min_length=2, max_length=100)
    notes: Optional[str] = Field(None, max_length=1000)
    transactionDate: datetime

class TransactionResponse(BaseModel):
    id: UUID
    plot_id: UUID
    type: TransactionType
    amount: Decimal
    category: str
    notes: Optional[str]
    transactionDate: datetime
    createdAt: datetime

    model_config = ConfigDict(from_attributes=True)

class ChatMessageCreate(BaseModel):
    sender: MessageSender
    content: str = Field(..., min_length=1, max_length=2000)
    contextSnapshot: Optional[dict]

class ChatMessageResponse(BaseModel):
    id: UUID
    plotId: UUID
    sender: MessageSender
    content: str
    contextSnapshot: Optional[dict]
    createdAt: datetime

    model_config = ConfigDict(from_attributes=True)