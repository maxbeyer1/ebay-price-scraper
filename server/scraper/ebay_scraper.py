import requests
from bs4 import BeautifulSoup
import re
import numpy as np
from dateutil.parser import parse as parse_date
import asyncio
import aiohttp
import lxml
import cchardet
from datetime import datetime


async def get_html(session, url):
    """
    Retrieves the HTML content from a given URL using an async HTTP session.

    Args:
        session (aiohttp.ClientSession): The async HTTP session.
        url (str): The URL to fetch the HTML content from.

    Returns:
        BeautifulSoup: The parsed HTML content as a BeautifulSoup object.
    """
    async with session.get(url) as response:
        return BeautifulSoup(await response.text(), 'lxml')


def get_sold_items(soup):
    """
    Extracts all sold items from the parsed HTML content.

    Args:
        soup (BeautifulSoup): The parsed HTML content as a BeautifulSoup object.

    Returns:
        list: A list of BeautifulSoup objects representing the sold items.
    """
    return soup.find_all('li', {'class': 's-item'})


def get_item_data(item):
    """
    Extracts the price and date from a single sold item.

    Args:
        item (BeautifulSoup): A BeautifulSoup object representing a sold item.

    Returns:
        dict: A dictionary containing the price and date of the item.
    """
    if item.find('span', string='Sponsored'):
        return None

    price = item.find('span', {'class': 's-item__price'}).text

    if ' to ' in price:
        return None

    date = item.find('span', {'class': 'POSITIVE'}).text
    date = parse_date(date.replace('Sold ', ''))

    return {'price': float(re.sub(r'[\$,]', '', price)), 'date': date}


def calculate_average_price(items):
    """
    Calculates the average price of a list of sold items.

    Args:
        items (list): A list of sold items.

    Returns:
        float: The average price of the sold items.
    """
    prices = [item['price'] for item in items]
    return sum(prices) / len(prices) if prices else 0


def calculate_max_min_price(items):
    """
    Calculates the maximum and minimum price of a list of sold items.

    Args:
        items (list): A list of sold items.

    Returns:
        tuple: A tuple containing the maximum and minimum price of the sold items.
    """
    prices = [item['price'] for item in items]
    return max(prices), min(prices) if prices else 0


def remove_outliers(items, field, multiplier):
    """
    Removes outliers from a list of sold items based on a given field and multiplier.

    Args:
        items (list): A list of sold items.
        field (str): The field to consider for outlier removal.
        multiplier (float): The multiplier used to determine the outlier range.

    Returns:
        list: A list of sold items with outliers removed.
    """
    values = [item[field] for item in items]
    quartile_1, quartile_3 = np.percentile(values, [25, 75])
    iqr = quartile_3 - quartile_1
    lower_bound = abs(quartile_1 - (iqr * multiplier))
    upper_bound = quartile_3 + (iqr * multiplier)

    return [item for item in items if lower_bound <= item[field] <= upper_bound]


def get_date_range(items):
    """
    Retrieves the range of dates from a list of sold items.

    Args:
        items (list): A list of sold items.

    Returns:
        tuple: A tuple containing the earliest and latest date in the sold items.
    """
    dates = [item['date'] for item in items]
    return dates[-1], dates[0]


async def get_ebay_data(session, keyword, num_pages, condition='Used', sacat='0'):
    """
    Scrapes data from eBay for a given keyword and number of pages.

    Args:
        session (aiohttp.ClientSession): The async HTTP session.
        keyword (str): The keyword to search for on eBay.
        num_pages (int): The number of pages to scrape.
        condition (str, optional): The condition of the items to search for. Defaults to 'Used'.
        sacat (str, optional): The eBay category ID. Defaults to '0'.

    Returns:
        dict: A dictionary containing the scraped data, including average price, max price, min price,
              total number of items, and date range.
    """
    items = []

    condition_map = {
        'New': 1000,
        'Used': 3000,
        'For parts or not working': 7000,
        'Open box': 1500
    }

    condition_value = condition_map.get(condition, 0)

    async def fetch_page(page):
        url = f'https://www.ebay.com/sch/i.html?_nkw="{keyword}"&_sacat={sacat}&_sop=13&LH_Complete=1&LH_Sold=1&LH_ItemCondition={condition}&_ipg=240&_pgn={page}'
        soup = await get_html(session, url)

        sold_items = get_sold_items(soup)
        for item in sold_items:
            data = get_item_data(item)
            if data is not None:
                items.append(data)

        print(f'Page {page} fetched and data extracted')

    tasks = [fetch_page(page) for page in range(1, num_pages + 1)]
    await asyncio.gather(*tasks)

    items = remove_outliers(items, 'price', 1.5)

    date_range = get_date_range(items)

    return {
        'average_price': calculate_average_price(items),
        'max_price': calculate_max_min_price(items)[0],
        'min_price': calculate_max_min_price(items)[1],
        'total_items': len(items),
        'date_range': date_range[0].strftime("%m/%d/%Y") + " to " + date_range[1].strftime("%m/%d/%Y")
    }


async def main():
    async with aiohttp.ClientSession() as session:
        data = await get_ebay_data(session, 'iphone 8', 4)
        print(data)
