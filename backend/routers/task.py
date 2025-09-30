from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Sesssion
from db.database import get_db
import models.task as task_model
import schemas.task as task_schema

router = APIRouter()


@router.post("/create-task",response_model=task_schema.TaskResponse)
def addtask(task:task_schema.TaskCreate, db: Session=Depends(get_db)):
     new_task = task_model.Task(
        title = task.title,
        description = task.description,
        column_id = task.column_id,
        position = task.position,
        user_id = task.user_id

     )


@router.get("/get-task")
def gettask(task:task_schema.GetTask, db: Session=Depends(get_db)):
    db_task = db.query(task_model.Task).filter(task_model.Task.id==task.id).first()
    if not db_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return db_task



@router.put("update_task", response_model=task_schema.TaskResponse)
def updatetask(task:task_schema.UpdateTask, db: Session=Depends(get_db)):
    db_task = db.query(task_model.Task),filter(task_model.Task.id==task.id).first()
    if not db_task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    if task.title is not None:
        db_task.title = task.title
    if task.description is not None:
        db_task.description = task.description
    if task.position is not None:
        db_task.position = task.position
    if task.user_id is not None:
        db_task.user_id = task.user_id


    db.commit()
    db.refresh(db_task)
    return db_task