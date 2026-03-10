from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from src.db import create_db_and_tables
from loguru import logger
import sys

# Configure Loguru
logger.remove()
logger.add(sys.stderr, format="{time} {level} {message}", level="INFO")
logger.add("logs/backend.log", rotation="10 MB", retention="7 days", level="DEBUG")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up...")
    await create_db_and_tables()
    logger.info("Database tables created.")
    yield
    logger.info("Shutting down...")

app = FastAPI(lifespan=lifespan)

# Configure CORS
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response status code: {response.status_code}")
    return response

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"An unexpected error occurred: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "An internal server error occurred."},
    )

@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok"}

# Placeholder for API routers
from src.api import auth, tasks
app.include_router(auth.router, prefix="/api/v1", tags=["auth"])
app.include_router(tasks.router, prefix="/api/v1", tags=["tasks"])