from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "superkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTE = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#as password 
def hash_password(password:str)->str:
    return pwd_context.hash(password)

#verify password
def verify_password(plain_password,hashed_password)->bool:
    return pwd_context.verify(plain_password,hashed_password)

#create jwt token to save in local storaHe 
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow()+timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTE)
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    