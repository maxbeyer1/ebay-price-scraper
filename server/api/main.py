import os
import sys
import aiohttp
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

PROJECT_ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__),
    os.pardir)
)
sys.path.append(PROJECT_ROOT)

from scraper.ebay_scraper import get_ebay_data

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)


@app.get("/api/")
async def read_data(keyword: str, num_pages: Optional[int] = 1, condition: Optional[str] = None, sacat: Optional[int] = 0):
    async with aiohttp.ClientSession() as session:
        return await get_ebay_data(session, keyword, num_pages, condition, sacat)
