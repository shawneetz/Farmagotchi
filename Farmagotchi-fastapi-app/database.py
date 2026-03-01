


from sqlalchemy.ext.asyncio import (create_async_engine, AsyncSession, async_sessionmaker)
from sqlalchemy.orm import declarative_base
from config import settings
from typing import AsyncGenerator

engine = create_async_engine(settings.DATABASE_URL,echo=True,pool_pre_ping=True)
AsyncSessionLocal = async_sessionmaker(bind=engine,autoflush=False,autocommit=False,expire_on_commit=False)

Base = declarative_base()

async def getDatabase() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()    