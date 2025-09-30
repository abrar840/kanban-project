from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
import models.board as board_model
import schemas.board as board_schema
from services.utils import hash_password, verify_password, create_access_token
from fastapi import HTTPException 
router = APIRouter()


@router.post("/add-board",response_model=board_schema.Response)

def addboard(board:board_schema.BoardCreate, db: Session=Depends(get_db)):
    new_board = board_model.Board(
        name = board.name,
        total_cols=board.total_cols,
        user_id = board.user_id

    )

    db.add(new_board)
    db.commit()
    db.refresh(db_board)
    return new_board


@router.get("/get-board")
def getboard(board:board_schema.GetBoard, db: Session=Depends(get_db)):
    db_board = db.query(board_model.Board).filter(board_model.Board.id==board.id).first()
    if not db_board:
        raise HTTPException()
    return db_board
       

@router.put("/update-board", response_model=board_schema.Response)
def updateboard(board:board_schema.UpdateBoard, db: Session = Depends(get_db)):
    db_board = db.query(board_model.Board).filter(board_model.Board.id==board.id).first()
    if not db_board:
        raise HTTPException()
    if board.name is not None:
        db_board.name = board.name
    if board.total_cols is not None:    
        db_board.total_cols = board.total_cols
    db.commit()
    db.refresh(db_board)
    return db_board