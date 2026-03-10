import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

async def migrate():
    print(f"Connecting to {DATABASE_URL}")
    engine = create_async_engine(DATABASE_URL)
    async with engine.begin() as conn:
        print("Adding 'priority' column to 'task' table...")
        try:
            await conn.execute(text("ALTER TABLE task ADD COLUMN priority VARCHAR NOT NULL DEFAULT 'low'"))
            print("Migration successful!")
        except Exception as e:
            print(f"Migration failed or column already exists: {e}")
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(migrate())
