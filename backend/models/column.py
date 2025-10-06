from sqlalchemy import Column, String, Integer, ForeignKey
from db.database import Base
from sqlalchemy.orm import relationship


class BoardColumn(Base):
    __tablename__ = "columns"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    board_id = Column(Integer, ForeignKey("boards.id"), nullable=False, index=True)
    position = Column(Integer, nullable=False, index=True)

    board = relationship("Board", back_populates="columns")
    tasks = relationship("Task", back_populates="column", cascade="all, delete-orphan")
