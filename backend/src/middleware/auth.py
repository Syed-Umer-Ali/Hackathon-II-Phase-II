from typing import Optional
import os
from jose import jwt, JWTError
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.status import HTTP_403_FORBIDDEN
from pydantic import ValidationError
from dotenv import load_dotenv
from loguru import logger

from ..models.base import User

# Ensure env is loaded
load_dotenv()

# Configuration
SECRET_KEY = os.getenv("BETTER_AUTH_SECRET")
ALGORITHM = "HS256"

if not SECRET_KEY:
    logger.error("BETTER_AUTH_SECRET environment variable is not set.")
    raise ValueError("BETTER_AUTH_SECRET environment variable is not set.")

# Reusable OAuth2
reusable_oauth2 = HTTPBearer(scheme_name="JWT")

async def get_current_user(token: HTTPAuthorizationCredentials = Security(reusable_oauth2)) -> User:
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            logger.warning("Token missing 'sub' claim")
            raise HTTPException(
                status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials: User ID missing"
            )
        # In a real application, you would fetch the user from the database here
        user = User(user_id=user_id, email=payload.get("email", f"{user_id}@example.com"))
    except JWTError as e:
        logger.warning(f"JWT Validation failed: {e}")
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail=f"Could not validate credentials: {str(e)}"
        )
    except ValidationError as e:
        logger.warning(f"Token payload validation failed: {e}")
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials: Invalid user data in token"
        )
    return user

def get_user_id_from_token(token: HTTPAuthorizationCredentials = Security(reusable_oauth2)) -> str:
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials: User ID missing"
            )
        return user_id
    except JWTError:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials: Invalid token"
        )
