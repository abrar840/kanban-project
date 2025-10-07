from sqlalchemy import Column, String, Integer, ForeignKey
from db.database import Base
from sqlalchemy.orm import relationship

class Contributor(Base):
    __tablename__="contributors"

    id = Column(Integer,primary_key=True,index=True)
    board_id = Column(Integer,ForeignKey("boards.id"),nullable=False,index=True)
    email = Column(String(255), ForeignKey("users.email"), nullable=False, index=True)

    role = Column(String(50),nullable=True)
    board = relationship("Board",back_populates="contributors")