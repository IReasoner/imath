from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship
from app.database import Base 

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String, unique=True, index=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String)

    to_progress: Mapped[Progress] = relationship(back_populates="to_user", cascade="all, delete-orphan")
    to_level: Mapped[list[LevelProgress]] = relationship(back_populates="to_user", cascade="all, delete-orphan")


class Progress(Base):
    __tablename__ = "progress"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), index=True)
    highest_unlocked_level: Mapped[int] = mapped_column(Integer, default=1)

    to_user: Mapped[User] = relationship(back_populates="to_progress")

class LevelProgress(Base):
    __tablename__ = "level_progress"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), index=True)

    level: Mapped[int] = mapped_column(Integer, default=1)
    highest_stage: Mapped[int] = mapped_column(Integer, default=1)

    to_user: Mapped[User] = relationship(back_populates="to_level")