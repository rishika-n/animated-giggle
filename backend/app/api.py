import openai
import logging
import schedule
import time
from app.data import zodiacs
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

class HoroscopeData(BaseModel):
    zodiac: str
    category: str
    #date: str


origins = [
    "http://localhost:3000",
    "localhost:3000"
]

openai.api_key = "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"


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# @app.get("/")
# async def root():
#     return {"message": "Hello World"}


@app.get("/zodiacs", tags=["zodiacs"])
async def get_zodiacs() -> dict:
    return { "data": zodiacs }

@app.post("/gethoroscope")
def process_options(item: HoroscopeData):
    processed_data = {
        "zodiac": item.zodiac,
        "category": item.category,
        #"date": item.date
    }
    prompt = "Generate a horoscope for " + processed_data["zodiac"] + " for today in the "+ processed_data["category"] +" category."
    response = openai.Completion.create(
        engine="text-davinci-003",  # You might need to adjust the engine according to available options
        prompt=prompt,
        max_tokens=100  # Adjust the length of the generated text
    )
    return(response.choices[0].text.strip())







# horoscope = response.choices[0].text.strip()
# print(horoscope)