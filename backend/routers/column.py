from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
import models.column as column_model
import schemas.column as column_schema

router = APIRouter()

@router.post("/create-column",response_model=column_schema.ColumnResponse)
def addcolumn(column:column_schema.ColumnCreate,db: Session = Depends(get_db)):
    new_column = column_model.Column(
        title=column.title,
        board_id=column.board_id,
        position = column.position
)
    
    db.create(new_column)
    db.commit()
    db.refresh(new_column)

    return new_column


@router.get("/get-col")
def getcol(column:column_schema.GetBoard, db: Session=Depends(get_db)):
    db_col = db.query(column_model.Column).filter(column_model.Column.board_id==column.board_id)

    if not db_col:
        raise HTTPException()
    return db_col

@router.put("/update_col", response_model=column_schema.ColumnResponse)
def updatecol(column:column_schema.UpdateColumn, db: Session=Depends(get_db)):
    db_col = db.query(column_model.Column).filter(column_model.Column.id==column.id).first()
    if not db_col:
        raise HTTPException()
    if column.title is not None:
        db_col.title = column.title
    if column.position is not None:
        db_col.position = column.position
    db.commit()
    db.refresh(db_col)
    return db_col