"""

"""

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings): 
    SUPABASE_URL: str = ""

    @property
    def DATABASE_URL(self) -> str:
        return (f"{self.SUPABASE_URL}")
    
    model_config=SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"    )

settings = Settings()

print(settings.DATABASE_URL)