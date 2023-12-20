import os
import sys

from fastapi import FastAPI
from typing import Optional

PROJECT_ROOT = os.path.abspath(os.path.join(
                  os.path.dirname(__file__), 
                  os.pardir)
)
sys.path.append(PROJECT_ROOT)

from scraper.ebay_scraper import get_ebay_data

app = FastAPI()

@app.get("/api/")
def read_data(keyword: str, num_pages: Optional[int] = 1, condition: Optional[str] = None, sacat: Optional[int] = 0):
    return get_ebay_data(keyword, num_pages, condition, sacat)