import uvicorn
from app.api import app

#To Run: uvicorn main:app --reload
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)