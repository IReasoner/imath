from fastapi import APIRouter, HTTPException, status, Depends
from app.auth import Current_user
from app.engines.engine_data import challenge_table, career_table
from app.engines.engine import get_question
from app.schemas import UnlockedInfo, LockedInfo, ChallengeResponse, CareerMeResponse
from app.utils import generate_stage_data
from typing import Union, Annotated
from sqlalchemy import select
from app.models import LevelProgress
from app.database import get_db

router = APIRouter()

@router.get("/career/me/{user_id}", response_model=CareerMeResponse)
def career_me(
    user_id: int, 
    current_user: Current_user, 
    db: Annotated[LevelProgress, Depends(get_db)]
    ):

   if user_id != current_user.id:
        raise HTTPException(
           status_code=status.HTTP_403_FORBIDDEN,
           detail="you are not authorized to access this route"
        )

   # current_user.to_level.highest_stage,
   # this directly will not work because to_level is a list

   stmt = db.execute(
       select(LevelProgress)
       .where(
           LevelProgress.user_id == current_user.id, 
           LevelProgress.level == current_user.to_progress.highest_unlocked_level
           )
       )

   user_level_progress = stmt.scalar_one_or_none()
   

   return {
      "current_level": current_user.to_progress.highest_unlocked_level,
      "current_stage":  user_level_progress.highest_stage,
   }



@router.get("/career/info/{user_id}", response_model=Union[UnlockedInfo, LockedInfo])
def level_stage_info(
    user_id: int,
    requested_level: int,
    requested_stage: int, 
    current_user: Current_user,
    db: Annotated[LevelProgress, Depends(get_db)]
    ):

      if user_id != current_user.id:
         raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="you are not authorized to access this route"
         )

      next_level = None
      message = None

      # locked level
      # i need to add a check for user that unlocked level in order to passed message that level 4 is coming soon


      if current_user.to_progress.highest_unlocked_level == 4 and requested_level == 4:
          return LockedInfo(
                level=requested_level,
                next_level=4,
                prev_level=requested_level - 1,
                status="locked",
                message="Coming Soon"
          )


      if requested_level > current_user.to_progress.highest_unlocked_level:

         # note this 4 is hardcoded, the current available level is 3, 
         # but we are using 4 to ensure that level 4 will be the last level
         if requested_level == 4: 
            message = "Coming Soon"
            next_level = 4
         else:
             message = f"Complete Level {requested_level - 1} to unlocked this level"
             next_level = requested_level + 1

         return LockedInfo(
               level=requested_level,
               next_level=next_level,
               prev_level=requested_level - 1,
               status="locked",
               message=message
         )

      current_level_stage = None

      stmt = db.execute(
            select(LevelProgress)
            .where(
                LevelProgress.user_id == current_user.id, 
                LevelProgress.level == current_user.to_progress.highest_unlocked_level
                )
            )
      
      user_level_progress = stmt.scalar_one_or_none()

      if requested_level == current_user.to_progress.highest_unlocked_level:

         if requested_stage > user_level_progress.highest_stage:

             current_level_stage = user_level_progress.highest_stage
      

      time_ms = career_table["levels"][str(requested_level)]["time_ms"]
      used_stage = requested_stage if not current_level_stage else current_level_stage
      stage_type = career_table["stages_info"][str(used_stage)]["stage_type"]

      range = {
         "from": career_table["levels"][str(requested_level)]["stages"][str(used_stage)]["quiz_range"]["min"],
         "to": career_table["levels"][str(requested_level)]["stages"][str(used_stage)]["quiz_range"]["max"]
      }

      prev_level = None

      if requested_level == 1:
         prev_level = 1
      else:
          prev_level = requested_level - 1
     

      return UnlockedInfo(
          level=requested_level,
          next_level=requested_level + 1,
          prev_level=prev_level,
          status="unlocked",
          stage=used_stage,
          stage_type=stage_type,
          time_ms=time_ms,
          range=range,
          stage_data=generate_stage_data(
               requested_level=requested_level,
               current_level=current_user.to_progress.highest_unlocked_level,
               current_stage=user_level_progress.highest_stage,
               active_stage=used_stage
            )
      )
         


@router.get("/career/question/{user_id}")
def level_stage_question(
   user_id: int,
   requested_level: int, 
   requested_stage: int,
   current_user: Current_user,
   db: Annotated[LevelProgress, Depends(get_db)]
 ):

    if user_id != current_user.id:
        raise HTTPException(
           status_code=status.HTTP_403_FORBIDDEN,
           detail="you are not authorized to access this route"
        )


    if requested_level > current_user.to_progress.highest_unlocked_level:
       raise HTTPException(
          status_code=status.HTTP_403_FORBIDDEN,
          detail="you have not unlocked this level"
       )

   #  this condition should later be tested out, like how it really works
   # but what this roughly do is to ensure that, if user as already passed let level 1 and now in level 2
   # stage 2, but want to access level 1 stage for 4, without this first check that will result to "you have not unlocked this stage" becasue 4 > 2 which is current stage, but user as already passed that
   # that is why we first checked if requested level is the same as current user level
   # so if user already passed the requested level this check will be skip
   # but if user requested for higher level the top check will stop the user before coming to this if condition
    stmt = db.execute(
         select(LevelProgress)
         .where(
            LevelProgress.user_id == current_user.id, 
            LevelProgress.level == current_user.to_progress.highest_unlocked_level
            )
         )

    user_level_progress = stmt.scalar_one_or_none()
    if requested_level == current_user.to_progress.highest_unlocked_level:
      if requested_stage > user_level_progress.highest_stage:
            raise HTTPException(
               status_code=status.HTTP_403_FORBIDDEN,
               detail="you have not unlocked this stage"
            )
      
   
    current_user_question = get_question(
        switch="career",
        level=str(requested_level),
        stage=str(requested_stage)
        )
   
    return current_user_question



# but type and difficulty are called Query parameter
# and as they are like that they are both required, on else i set = None.
# they are not path parameter, eg: ("/challenge/{type}/{difficulty}").
# and sending a request body with a get request is bad, so aviod it.
@router.get("/challenge", response_model=ChallengeResponse)
def challenge_route(type: str, difficulty: str):
    
    challenge_question = get_question(
    switch="challenge", 
    type=type,
    difficulty=difficulty
    )

    example = challenge_table["examples"][type]
    time_ms = challenge_table["difficulty"][difficulty]["time_ms"]
    range = {
       "from": challenge_table["difficulty"][difficulty][f"{difficulty}_setup"][type]["quiz_range"]["min"],
       "to": challenge_table["difficulty"][difficulty][f"{difficulty}_setup"][type]["quiz_range"]["max"]
    }

    complete_question_data = {
       "example": example, 
       "time_ms": time_ms,
       "range": range,
       "question_box": challenge_question
    }


    return complete_question_data
