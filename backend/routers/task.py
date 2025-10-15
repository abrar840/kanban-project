from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session,joinedload
from db.database import get_db
import models.task as task_model
import schemas.task as task_schema
from services.utils import get_current_user
from models.task import Task
from typing import List

router = APIRouter()


@router.post("/create-task", response_model=task_schema.TaskResponse)
def create_task(task: task_schema.TaskCreate, db: Session = Depends(get_db), user: str = Depends(get_current_user)):
    new_task = task_model.Task(
        title=task.title,
        description=task.description,
        column_id=task.column_id,
        position=task.position,
        board_id=task.board_id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@router.get("/get-task-by-id/{task_id}", response_model=task_schema.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(task_model.Task).options(
        
        joinedload(Task.user)
         
    ).filter(task_model.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return db_task



@router.get("/get-task-by-boardid/{board_id}", response_model=List[task_schema.TaskResponse])
def get_task(board_id: int, db: Session = Depends(get_db)):
    db_task = db.query(task_model.Task).filter(task_model.Task.board_id == board_id).all()
    if not db_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return db_task



@router.put("/update-task/{task_id}", response_model=task_schema.TaskResponse)
def update_task(task_id: int, task: task_schema.UpdateTask, db: Session = Depends(get_db)):
    db_task = db.query(task_model.Task).filter(task_model.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    if task.title is not None:
        db_task.title = task.title
    if task.description is not None:
        db_task.description = task.description
    if task.position is not None:
        db_task.position = task.position
  
    if hasattr(task, "user_id"):
        db_task.user_id = task.user_id  


    db.commit()
    db.refresh(db_task)
    return db_task
