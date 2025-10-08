from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
import models.column as column_model
import schemas.column as column_schema

router = APIRouter()


@router.post("/create-column", response_model=column_schema.ColumnResponse)
def create_column(column: column_schema.ColumnCreate, db: Session = Depends(get_db)):
    db_col = db.query(column_model.BoardColumn).filter(
        column_model.BoardColumn.position == column.position,
        column_model.BoardColumn.board_id == column.board_id
    ).first()

    if db_col:
       
        db_col.title = column.title
        db.commit()
        db.refresh(db_col)
        return db_col
    else:
     
        new_column = column_model.BoardColumn(
            title=column.title,
            board_id=column.board_id,
            position=column.position
        )
        db.add(new_column)
        db.commit()
        db.refresh(new_column)
        return new_column



@router.get("/get-columns/{board_id}", response_model=list[column_schema.ColumnResponse])
def get_columns(board_id: int, db: Session = Depends(get_db)):
    db_cols = db.query(column_model.BoardColumn).filter(column_model.BoardColumn.board_id == board_id).all()
    if not db_cols:
        raise HTTPException(status_code=404, detail="No columns found for this board")
    return db_cols


@router.put("/update-column/{column_id}", response_model=column_schema.ColumnResponse)
def update_column(column_id: int, column: column_schema.UpdateColumn, db: Session = Depends(get_db)):
    db_col = db.query(column_model.BoardColumn).filter(column_model.BoardColumn.id == column_id).first()
    if not db_col:
        raise HTTPException(status_code=404, detail="Column not found")

    if column.title is not None:
        db_col.title = column.title
    if column.position is not None:
        db_col.position = column.position

    db.commit()
    db.refresh(db_col)
    return db_col
