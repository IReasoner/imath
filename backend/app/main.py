from fastapi import FastAPI
from app.routers import game_session, users
from app.database import engine, get_db, Base
from app import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(game_session.router, prefix="/api", tags=["Game Session"])
app.include_router(users.router, prefix="/api/user", tags=["User"])


app.get("/api/health", include_in_schema=False)
def health():
    return {"status": "ok"}

@app.get("/", include_in_schema=False)
def read_root():
    return {"message": "Hello from ireasoner backend!"}



