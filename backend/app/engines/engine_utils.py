import random
from app.engines.engine_data import career_table, QUESTION_BANK, challenge_table
from app.engines.engine_data import counter


def clear_question_bank():
      QUESTION_BANK.clear()

def career_challenge_switcher(
      switch: str,
      type: str,
      level: str | None = None,
      stage: str | None = None,
      difficulty: str | None = None
      ):
   
   if switch == "career":
      number_of_question = career_table["levels"][level]["number_of_question"]
      min = career_table["levels"][level]["stages"][stage]["quiz_range"]["min"]
      max = career_table["levels"][level]["stages"][stage]["quiz_range"]["max"]
      return [number_of_question, min, max]
   
   if switch == "challenge":
      number_of_question = challenge_table["difficulty"][difficulty]["number_of_question"]
      min = challenge_table["difficulty"][difficulty][f"{difficulty}_setup"][type]["quiz_range"]["min"]
      max = challenge_table["difficulty"][difficulty][f"{difficulty}_setup"][type]["quiz_range"]["max"]
      return [number_of_question, min, max]
   

def get_random_number(min: int, max: int) -> int:
  # this give a random number from the give range: eg 1 to 3 = 1 or 2 or 3
  return random.randint(min, max)



def create_question_and_answer(
      first_number: int,
      operator: str,
      second_number: int
      ) -> dict[str, int]:
  
  question_string = f"{first_number} {operator} {second_number}"
  
  return {
     "index": counter(),
     "question": question_string,
      "answer": str(eval(question_string)),
      "is_correct": None,
      "user_answer": None
  }
    
  

