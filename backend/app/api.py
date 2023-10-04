import openai
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from app.data import zodiacs, categories
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import os
from dotenv import load_dotenv

logging.basicConfig(level=logging.INFO,  # Set your desired log level (INFO, DEBUG, ERROR, etc.)
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Create a logger instance for your FastAPI app

app = FastAPI()



class HoroscopeData(BaseModel):
    zodiac: str
    category: str
    date: str


origins = [
    "http://127.0.0.1:3000",
    "127.0.0.1:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
daily_horoscope = {}

def populate_data():
    print("populate data called")
    daily_horoscope.clear()
    # Replace this with your data population logic
    for zodiac in zodiacs:
        for category in categories:
            prompt = "Generate a horoscope that is less than 100 characters for " + zodiac + " for today in the "+ category +" category. Begin the horoscope by stating Hello " + zodiac +"! Today, your horoscope for " + category + " is: "
            response = openai.Completion.create(
                engine="text-davinci-003",  # You might need to adjust the engine according to available options
                prompt=prompt,
                max_tokens=100  # Adjust the length of the generated text
            )
            daily_horoscope[(zodiac, category)] = response.choices[0].text.strip()
    print(daily_horoscope)

scheduler = BackgroundScheduler()
scheduler.add_job(populate_data, 'cron', hour=0, minute=0, second=0)
scheduler.start()

@app.on_event("startup")
async def startup():
    populate_data()

async def ensure_data_populated():
    while not daily_horoscope:
        await asyncio.sleep(1)
    return daily_horoscope

@app.get("/zodiacs", tags=["zodiacs"])
async def get_zodiacs() -> dict:
    return { "data": zodiacs }

@app.post("/gethoroscope")
def process_options(item: HoroscopeData, data: dict = Depends(ensure_data_populated)):
    processed_data = {
        "zodiac": item.zodiac,
        "category": item.category,
        "date": item.date
    }
    return(data[(processed_data["zodiac"], processed_data["category"])])







# horoscope = response.choices[0].text.strip()
# print(horoscope)