from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import Column, String, Integer, DateTime, Boolean, Text, Numeric, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from uuid import uuid4
from typing import Optional

class Base(DeclarativeBase):
    pass

class BaseModel(Base): 
    """
        Abstract class to be inherited by other Models to have the following rows:
        (1)id, (2)createdAt, (3)updatedAt,  and (4)isDeleted
    """
    __abstract__ = True

    id = mapped_column(UUID(as_uuid=True),primary_key=True, default=uuid4)
    createdAt = mapped_column(DateTime(timezone=True), default=func.now(), nullable=False) 
    updatedAt = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False) 
    isDeleted = mapped_column(Boolean)


class Roles(BaseModel):  
    """
    
    """
    __tablename__ = "roles"
    name = mapped_column(String(50), unique=True, nullable=False, index=True)
    description = mapped_column(String(255))