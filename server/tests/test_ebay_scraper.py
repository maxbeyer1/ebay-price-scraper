import os
import sys
import pytest
import aiohttp
from bs4 import BeautifulSoup, Tag
from datetime import datetime

PROJECT_ROOT = os.path.abspath(os.path.join(
    os.path.dirname(__file__),
    os.pardir)
)
sys.path.append(PROJECT_ROOT)

from scraper.ebay_scraper import get_html, get_sold_items, get_item_data, calculate_average_price, \
    calculate_max_min_price, remove_outliers, get_date_range, get_ebay_data

# Sample eBay search page content for testing
sample_html = """
<ul>
    <li class='s-item'>Item 1</li>
    <li class='s-item'>Item 2</li>
    <li class='s-item'>Item 3</li>
</ul>
"""

# Sample item HTML content for testing
sample_item_html = '''
<li class='s-item'>
    <span class='s-item__price'>$23.50</span>
    <span class='POSITIVE'>Sold Aug 10, 2021</span>
</li>
'''

# Test data for items
test_items = [
    {'price': 20.0, 'date': '2021-08-10'},
    {'price': 30.0, 'date': '2021-08-11'},
    {'price': 40.0, 'date': '2021-08-12'}
]


@pytest.mark.asyncio
async def test_get_html():
    async with aiohttp.ClientSession() as session:
        html = await get_html(session, 'https://www.ebay.com')
        assert html is not None
        assert isinstance(html, BeautifulSoup)


def test_get_sold_items():
    soup = BeautifulSoup(sample_html, 'lxml')
    items = get_sold_items(soup)
    assert len(items) == 3
    assert all(isinstance(item, Tag) for item in items)


def test_get_item_data():
    item_soup = BeautifulSoup(sample_item_html, 'lxml')
    item_data = get_item_data(item_soup)
    assert item_data is not None
    assert item_data['price'] == 23.50
    assert item_data['date'] == datetime(2021, 8, 10, 0, 0)


def test_calculate_average_price():
    average_price = calculate_average_price(test_items)
    assert average_price == 30.0  # Expected average


def test_calculate_max_min_price():
    max_price, min_price = calculate_max_min_price(test_items)
    assert max_price == 40.0  # Expected max price
    assert min_price == 20.0  # Expected min price


# Test data with an outlier
test_items_with_outlier = [
    {'price': 10.0, 'date': '2021-08-18'},
    {'price': 20.0, 'date': '2021-08-10'},
    {'price': 30.0, 'date': '2021-08-11'},
    {'price': 40.0, 'date': '2021-08-12'},
    {'price': 45.0, 'date': '2021-08-13'},
    {'price': 50.0, 'date': '2021-08-14'},
    {'price': 55.0, 'date': '2021-08-15'},
    {'price': 60.0, 'date': '2021-08-16'},
    {'price': 25.0, 'date': '2021-08-19'},
    {'price': 35.0, 'date': '2021-08-20'},
    {'price': 40.0, 'date': '2021-08-21'},
    {'price': 50.0, 'date': '2021-08-22'},
    {'price': 100.0, 'date': '2021-08-17'},  # potential high-end outlier
    {'price': 200.0, 'date': '2021-08-23'},  # potential high-end outlier
    {'price': 5.0, 'date': '2021-08-24'}  # potential low-end outlier
]


def test_remove_outliers():
    cleaned_items = remove_outliers(test_items_with_outlier, 'price', 1.5)
    assert len(cleaned_items) == 12  # One item should be removed as an outlier
    assert all(item['price'] != 100.0 or 200.0 or 5.0 for item in cleaned_items)  # Outlier should be removed


def test_get_date_range():
    start_date, end_date = get_date_range(test_items)
    assert start_date == '2021-08-12'  # Expected start date (most recent)
    assert end_date == '2021-08-10'  # Expected end date (oldest)
