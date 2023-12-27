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
    """
    Retrieves eBay data based on the provided keyword and optional parameters.

    Args:
        keyword (str): The keyword to search for.
        num_pages (int, optional): The number of pages to scrape. Defaults to 1.
        condition (str, optional): The condition of the items to filter. Defaults to None.
        sacat (int, optional): The SACAT value to filter the items. Defaults to 0.

    Returns:
        dict: The scraped eBay data.
    """
    async with aiohttp.ClientSession() as session:
        return await get_ebay_data(session, keyword, num_pages, condition, sacat)
