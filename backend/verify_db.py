import asyncio
from src.db import engine
from sqlalchemy import text

async def verify_db():
    try:
        async with engine.connect() as conn:
            print("Successfully connected to the database!")
            
            # Check current database name
            result = await conn.execute(text("SELECT current_database();"))
            db_name = result.scalar()
            print(f"Connected to database: {db_name}")
            
            # List tables
            result = await conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"))
            tables = result.scalars().all()
            print("Tables found:", tables)
            
            if not tables:
                print("No tables found. Ensure the app has started at least once to create tables.")
            else:
                print("Schema appears to be initialized.")

    except Exception as e:
        print(f"Connection failed: {e}")
    finally:
        await engine.dispose()

if __name__ == "__main__":
    asyncio.run(verify_db())
