from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from app.schemas import (
  CreateUser, 
  UpdateProgress, 
  Me, 
  ReplayResponse, 
  PassedStageResponse, 
  FailedStageResponse, 
  LevelCompletedResponse
  )
from app.models import User, Progress, LevelProgress
from app.database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import select
from fastapi.security import OAuth2PasswordRequestForm
from app.auth import (
  hash_password, 
  verify_hashed_password, 
  create_access_token,
  Current_user
  )
from app.utils import get_position
from typing import Union
from app.engines.engine_data import career_table
from app.utils import calculate_pass_or_fail, get_percentage, get_next_stage


router = APIRouter()

@router.get("/me", response_model=Me)
def me(current_user: Current_user):
  return current_user

  
@router.post("/register")
def create_user(
  user: CreateUser, 
  db: Annotated[Session, Depends(get_db)]
  ):

  stmt = db.execute(
    select(User)
    .where(User.username == user.username)
  )

  existing_user = stmt.scalar_one_or_none()

  if existing_user:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="username already exist"
    )

  stmt = db.execute(
      select(User)
      .where(User.email == user.email)
    )
  
  existing_email = stmt.scalar_one_or_none()
  
  if existing_email:
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST,
      detail="email already exist"
    )
  

  hashed_password = hash_password(password=user.password)

  new_user = User(
    username=user.username, 
    email=user.email,
    hashed_password=hashed_password,
    to_progress=Progress(),
    to_level=[LevelProgress()]
    )

  db.add(new_user)
  db.commit()
  

  return {"message": "submit successfully"}


@router.post("/login")
def login(
  db: Annotated[Session, Depends(get_db)],
  form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
  ):

  stmt = db.execute(
    select(User)
    .where(User.email == form_data.username)
  )

  user = stmt.scalar_one_or_none()

  if user is None or not verify_hashed_password(
      plain_password=form_data.password,
      hashed_password=user.hashed_password
    ):
    raise HTTPException(
      status_code=status.HTTP_400_BAD_REQUEST, 
      detail="invalid email or password"
      )

  user_id = {
    "id": str(user.id)
  }

  access_token = create_access_token(data=user_id)

  return {
    "access_token": access_token
  }


@router.patch(
    "/progress/{user_id}", 
    response_model=Union[
     ReplayResponse,
     PassedStageResponse,
     FailedStageResponse,
     LevelCompletedResponse
     ])
def update_progress(
  user_id: int,
  data: UpdateProgress,
  current_user: Current_user,
  db: Annotated[Session, Depends(get_db)]
): 

  if user_id != current_user.id:
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="you cannot modify this route"
    )

  stmt = db.execute(
    select(Progress)
    .where(Progress.user_id == current_user.id)
  )

  user_progress = stmt.scalar_one_or_none()

  if not user_progress:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="user not found or account deleted"
    )


  stmt = db.execute(
    select(LevelProgress)
    .where(
      LevelProgress.user_id == current_user.id,
      LevelProgress.level == user_progress.highest_unlocked_level
      )
  )

  user_level_progress = stmt.scalar_one_or_none()


  # this get_position convert level and stage to a single number number starting from 1

  requested_position = get_position(level=data.level, stage=data.stage)
  current_position = get_position(
    level=user_progress.highest_unlocked_level, 
    stage=user_level_progress.highest_stage
    )


  if requested_position > current_position:
      raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="you have not unlocked this stage or level"
      )


  stage_type = career_table["stages_info"][str(data.stage)]["stage_type"]
  total_question = career_table["levels"][str(data.level)]["number_of_question"]


  if requested_position < current_position:
    return ReplayResponse(
      level=data.level,
      stage=data.stage,
      stage_type=stage_type,
      state="replay",
      score=data.score,
      total_question=total_question
    )

  elif requested_position == current_position:
    required_score = (get_percentage(stage=data.stage) / 100) * total_question
    state = calculate_pass_or_fail(score=data.score, level=data.level, stage=data.stage)
    next_stage = get_next_stage(stage=data.stage)

    if state == "failed":
      return FailedStageResponse(
        level=data.level,
        next_level=data.level + 1 if data.stage == len(career_table["stages_info"]) else None,
        stage=data.stage,
        stage_type=stage_type,
        state=state,
        score=data.score,
        total_question=total_question,
        locked_stage=next_stage if data.stage < len(career_table["stages_info"]) else None,
        required_score=required_score
      )
    
    if user_level_progress.highest_stage == len(career_table["stages_info"]) and state == "passed":
      current_user.to_progress.highest_unlocked_level += 1
      new_level_start = LevelProgress(
        level=data.level + 1,
        user_id=current_user.id,
        highest_stage=1
      )

      db.add(new_level_start)
      db.commit()

      return LevelCompletedResponse(
        level=data.level,
        unlocked_level=data.level + 1,
        state="completed",
        score=data.score,
        total_question=total_question,
      )

    if user_level_progress.highest_stage < len(career_table["stages_info"]) and state == "passed":
      user_level_progress.highest_stage += 1
      db.commit()

      return PassedStageResponse(
        level=data.level,
        stage=data.stage,
        stage_type=stage_type,
        state=state,
        score=data.score,
        total_question=total_question,
        unlocked_stage=next_stage
      )
  


  
 











