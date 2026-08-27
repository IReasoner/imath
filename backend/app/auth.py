import jwt
from datetime import datetime, timedelta, UTC
from pwdlib import PasswordHash
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from typing import Annotated
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.config import settings
from app.database import get_db
from app.models import User


oauth2_schema = OAuth2PasswordBearer(
  tokenUrl="/api/user/login"
  )


_hash_object = PasswordHash.recommended()

def hash_password(password: str):
  return _hash_object.hash(password)

def verify_hashed_password(plain_password: str, hashed_password: str):
  return _hash_object.verify(plain_password, hashed_password)


def create_access_token(data: dict):

  to_encode = data.copy()

  expire_minutes = datetime.now(UTC) + timedelta(
    days=settings.access_token_expire_day
    )

  to_encode.update({
    "exp": expire_minutes
  })

  encoded_jwt = jwt.encode(
    to_encode,
    settings.secret_key,
    algorithm=settings.algorithm
  )

  return encoded_jwt
  
def verify_access_token(access_token: str):

  try:
    payload = jwt.decode(
      access_token,
      settings.secret_key,
      algorithms=[settings.algorithm]
    )

    # payload give back id as string because what we passed to create access token is string.

    user_id = payload["id"]

    return int(user_id)

    # jwt.invalidtokenerror was used to catch raised error when token expired.
    # ValueError and TypeError was used to catch if converting string to int didn't work.
    # KeyError was used to catch if payload dont have "id" (but that cant happen).

  except (jwt.InvalidTokenError, ValueError, TypeError, KeyError):
    return None


def get_current_user(
  access_token: Annotated[str, Depends(oauth2_schema)],
  db: Annotated[Session, Depends(get_db)]
):
  user_id = verify_access_token(access_token=access_token)
  
    # user_id not was checked because verify_access_token can return None
    # if access token had expired
  if user_id is None:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="invalid or token expired"
    )


  stmt = db.execute(
    select(User)
    .where(User.id == user_id)
  )

  user = stmt.scalar_one_or_none()

  # this was checked because a user with valid access token might trying to access the app
  # but the account user might have being deleted which can caused user not found
  if user is None:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail="invalid or token expired"
    )

  return user
   
Current_user = Annotated[User, Depends(get_current_user)]
