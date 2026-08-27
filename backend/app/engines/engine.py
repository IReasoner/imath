import random
from app.engines.engine_data import QUESTION_BANK, OPERATORS
from app.engines.engine_data import count
from app.engines.engine_utils import clear_question_bank, career_challenge_switcher, create_question_and_answer, get_random_number

# this function decide which type of question should be given based on which router the user is on


def _generate_question(
      switch: str,
      level: str | None = None,
      stage: str | None = None,
      difficulty: str | None = None,
      type: str | None = None,
      operator_number: int | None = None,  
      is_negative: bool | None = None, 
      is_random: bool | None  = None
      ) -> list[dict[str, int]]:



   # this method directly saved the return of the function into the give variable
   # this bracket around is just to enable having the variable in muiltiple lines
   
   (
      number_of_question, 
      min, 
      max
   ) = career_challenge_switcher(
      switch=switch,
      level=level,
      stage=stage,
      difficulty=difficulty,
      type=type
      )

  # range start from 0 to minus 1 from given number eg: 10 = 0 to 9
   for _ in range(number_of_question):

      
      # this will only execute if the question is random
      if is_random:
         operator_number = random.randint(0, 2)
         if operator_number == 1:
            is_negative = True

      first_number = get_random_number(min=min, max=max)
      second_number = get_random_number(min=min, max=max)

      # this check if we are generating question for negative question
      # this also work so that we wont have a situation of 1 - 4 = -4 for level 1 to 2
      if is_negative:
          while second_number > first_number:
            second_number = get_random_number(min=min, max=max)

      obj = create_question_and_answer(first_number, OPERATORS[operator_number], second_number)
      QUESTION_BANK.append(obj)

   # question bank is a list and contains dict of question
   return QUESTION_BANK




def get_question(
      switch: str, # switch is most because user most choose btw challenge and career
      level: str | None = None, # is not a most for challenge but for career
      stage: str | None = None,
      difficulty: str | None = None, # is not a most for career but for challenge
      type: str | None = None, 
   ):
   
   clear_question_bank()
   count["count"] = 0

   if type == "addition" or stage == "1":
      return _generate_question(
         operator_number=0, 
         switch=switch,
         type=type,
         level=level, # if nothing passed this will be None
         stage=stage, # if nothing passed this will be None
         difficulty=difficulty # if nothing passed this will be None
         )

   if type == "subtraction" or stage == "2":
      return _generate_question(
         operator_number=1, 
         is_negative=True, 
         level=level,
         stage=stage,
         switch=switch,
         type=type,
         difficulty=difficulty
         )
   
   if type == "multiplication" or stage == "3":
      return _generate_question(
         operator_number=2, 
         switch=switch,
         type=type,
         level=level,
         stage=stage,
         difficulty=difficulty
         )

   
   if stage == "4":
      return _generate_question(
         is_random=True, 
         level=level, 
         stage=stage, 
         switch=switch, 
         )

   

