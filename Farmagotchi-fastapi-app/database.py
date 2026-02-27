
from sqlalchemy import create_engine, engine
from sqlalchemy.ext.declarative import sessionmaker, declarative_base
from config import settings

engine=create_engine(settings.DATABASE_URL,pool_pre_ping=True, echo=True)

SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base = declarative_base()

def getDatabase():
    database=SessionLocal()
    try:
        yield database
    finally:
        database.close()