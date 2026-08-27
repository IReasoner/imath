OPERATORS = ["+", "-", "*"] # this is for actually setting the question eg: (2 * 2)
QUESTION_BANK = []

count = {
  "count": 0
}

# this is used for auto increment, which is now used as id
def counter(): 
  count["count"] += 1
  return count["count"]


def convert_to_ms(time:str):
  # coverting to int will remove any starting 0, like 05 will be equal to 5
  minute, seconds = map(int, time.split(":"))

  # this 60_000 means 60000, 
  # it represent 5 * 60 * 1000, because 60 * 1000 = 60,000
  return (minute * 60_000) + (seconds * 1_000)


career_table = {
   "stages_info": {
     "1": {
       "stage_type": "addition",
       "passed_percentage": 75
     },   
     "2": {
         "stage_type": "subtraction",
         "passed_percentage": 75
      },
      "3": {
         "stage_type": "multiplication",
         "passed_percentage": 80
      },
      "4": {
         "stage_type": "random",
         "passed_percentage": 90
       }
     
   },
  
  "levels": {
         "1": {
            "number_of_question": 10,
            "time_ms": convert_to_ms(time="1:00"),
            "stages": {
              "1": {
                "quiz_range": {
                  "min": 1,
                  "max": 8
                }
              },   
              "2": {
                  "quiz_range": {
                  "min": 1,
                  "max": 8
                  }
               },
               "3": {
                 "quiz_range": {
                   "min": 1,
                   "max": 5
                 }
               },
               "4": {
                  "quiz_range": {
                   "min": 1,
                   "max": 7
                  }
                }
            }
         },
         "2": {
            "number_of_question": 15,
            "time_ms": convert_to_ms(time="2:00"),
            "stages": {
              "1": {
                "quiz_range": {
                  "min": 5,
                  "max": 10
                }
              },   
              "2": {
                  "quiz_range": {
                  "min": 5,
                  "max": 10
                  }
               },
               "3": {
                 "quiz_range": {
                   "min": 4,
                   "max": 8
                 }
               },
               "4": {
                  "quiz_range": {
                   "min": 5,
                   "max": 8
                  }
                }
            }
        },
        "3": {
           "number_of_question": 20,
           "time_ms": convert_to_ms(time="3:00"),
           "stages": {
             "1": {
               "quiz_range": {
                 "min": 7,
                 "max": 15
               }
             },   
             "2": {
                 "quiz_range": {
                 "min": 7,
                 "max": 15
                 }
              },
              "3": {
                "quiz_range": {
                  "min": 8,
                  "max": 12
                }
              },
              "4": {
                 "quiz_range": {
                  "min": 6,
                  "max": 14
                 }
               }
           }
        }
   },
}


challenge_table = {
   "examples": {
     "addition": "2 + 2 = ?",
     "subtraction": "4 - 2 = ?",
     "multiplication": "6 * 2 = ?",
   },

   "difficulty": {
      "easy": {
        "number_of_question": 10,
        "time_ms": convert_to_ms(time="1:00"),
        "easy_setup": {
           "addition": {
             "quiz_range": {
               "min": 1,
               "max": 10
             }
            },
            "subtraction": {
              "quiz_range": {
                "min": 1,
                "max": 10
              }
             }, 
             "multiplication": {
               "quiz_range": {
                 "min": 1,
                 "max": 7
               }
              } 
          },
      },

      "medium": {
        "number_of_question": 15,
        "time_ms": convert_to_ms(time="2:00"),
        "medium_setup": {
           "addition": {
             "quiz_range": {
               "min": 5,
               "max": 15
             }
            },
            "subtraction": {
              "quiz_range": {
                "min": 5,
                "max": 14
              }
             }, 
             "multiplication": {
               "quiz_range": {
                 "min": 5,
                 "max": 8
               }
              } 
          },
      },
         
      "hard": {
        "number_of_question": 20,
        "time_ms": convert_to_ms(time="3:00"),
        "hard_setup": {
           "addition": {
             "quiz_range": {
               "min": 8,
               "max": 15
             }
            },
            "subtraction": {
              "quiz_range": {
                "min": 8,
                "max": 16
              }
             }, 
             "multiplication": {
               "quiz_range": {
                 "min": 7,
                 "max": 13
               }
              } 
          }
      }
   }

}

