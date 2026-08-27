from pydantic import BaseModel, EmailStr

class CreateUser(BaseModel):
  username: str
  email: EmailStr
  password: str

class Me(BaseModel):
  id: int
  email: EmailStr
  username: str

class UpdateProgress(BaseModel):
  level: int
  stage: int
  score: int

class ReplayResponse(BaseModel):
  level: int
  stage: int
  stage_type: str
  state: str
  score: int
  total_question: int

class PassedStageResponse(ReplayResponse):
  unlocked_stage: int

class FailedStageResponse(ReplayResponse):
  locked_stage: int | None
  required_score: int
  next_level: int | None

class LevelCompletedResponse(BaseModel):
  level: int
  unlocked_level: int
  state: str
  score: int
  total_question: int


class CareerMeResponse(BaseModel):
  current_level: int
  current_stage: int
  

class UnlockedInfo(BaseModel):
  level: int
  next_level: int
  prev_level: int
  status: str
  stage: int
  stage_type: str
  time_ms: int
  range: dict
  stage_data: list[dict]

class LockedInfo(BaseModel):
  level: int
  next_level: int
  prev_level: int
  status: str
  message: str
 

class ChallengeResponse(BaseModel):
  example: str
  time_ms: int
  range: dict
  question_box: list[dict]