from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
import models.board as board_model
import schemas.board as board_schema

router = APIRouter()

@router.post("/add-board", response_model=board_schema.Response)
def add_board(board: board_schema.BoardCreate, db: Session = Depends(get_db)):
    new_board = board_model.Board(
        name=board.name,
        total_cols=board.total_cols,
        user_id=board.user_id
    )
    db.add(new_board)
    db.commit()
    db.refresh(new_board)
    return new_board


@router.get("/get-board/{board_id}", response_model=board_schema.Response)
def get_board(board_id: int, db: Session = Depends(get_db)):
    db_board = db.query(board_model.Board).filter(board_model.Board.id == board_id).first()
    if not db_board:
        raise HTTPException(status_code=404, detail="Board not found")
    return db_board


@router.put("/update-board/{board_id}", response_model=board_schema.Response)
def update_board(board_id: int, board: board_schema.UpdateBoard, db: Session = Depends(get_db)):
    db_board = db.query(board_model.Board).filter(board_model.Board.id == board_id).first()
    if not db_board:
        raise HTTPException(status_code=404, detail="Board not found")

    if board.name is not None:
        db_board.name = board.name
    if board.total_cols is not None:
        db_board.total_cols = board.total_cols

    db.commit()
    db.refresh(db_board)
    return db_board
