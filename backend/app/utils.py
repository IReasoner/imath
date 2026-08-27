from app.engines.engine_data import career_table

def get_position(level:int, stage:int):
  return (level - 1) * len(career_table["stages_info"]) + stage


def get_percentage(stage:int):
  return career_table["stages_info"][str(stage)]["passed_percentage"]


def calculate_pass_or_fail(score:int, level:int, stage:int):
  cut_off_mark = get_percentage(stage=stage)

  number_of_question = career_table["levels"][str(level)]["number_of_question"]

  user_percentage = (score / number_of_question) * 100

  if user_percentage >= cut_off_mark:
    return "passed"
  else:
    return "failed"


def generate_stage_data(
    requested_level: int, 
    current_level: int, 
    current_stage: int, 
    active_stage: int
  ):

    stage_data = []

    if requested_level < current_level:

      for num in range(len(career_table["stages_info"])):

        data = {
          "stage": num + 1,
          "status": "passed",
          "active": active_stage == num + 1
        }

        stage_data.append(data)

    if requested_level == current_level:

      for num in range(len(career_table["stages_info"])):

        stage_num = num + 1
        status = None

        if current_stage > stage_num:
          status = "passed"
        elif current_stage == stage_num:
          status = "current"
        elif current_stage < stage_num:
          status = "locked"

        data = {
          "stage": num + 1,
          "status": status,
          "active": active_stage == num + 1
        }

        stage_data.append(data)

    return stage_data
    
def get_next_stage(stage: int):
  next_stage = None

  if stage < len(career_table["stages_info"]):
    next_stage = stage + 1
  else:
    next_stage = stage = len(career_table["stages_info"])

  return next_stage


  




   


