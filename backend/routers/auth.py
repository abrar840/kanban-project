from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
import models.user as user_model
import schemas.user as user_schema
from services.utils import hash_password, verify_password, create_access_token
router = APIRouter()

@router.post("/signup", response_model=user_schema.UserResponse)
def signup(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    new_user = user_model.User(
        email=user.email,
        hashed_password=hash_password(user.password),
        full_name=user.full_name
    )  
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(user:user_schema.UserLogin, db: Session= Depends(get_db)):
    db_user = db.query(user_model.User).filter(user_model.User.email==user.email).first()
    
    if not db_user or not verify_password(user.password,db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid credentials ")
    token = create_access_token({"sub":db_user.email})
    
    return {"access_token": token, "toekn_type":"bearer"}