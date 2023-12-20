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


# Get html from url
async def get_html(session, url):
    async with session.get(url) as response:
        return BeautifulSoup(await response.text(), 'lxml')


# Get all items from page
def get_sold_items(soup):
    return soup.find_all('li', {'class': 's-item'})


# Extract price and date from items
def get_item_data(item):
    # Ignore sponsored items
    if item.find('span', string='Sponsored'):
        return None

    # state = item.find('span', {'class': 'SECONDARY_INFO'}).text

    price = item.find('span', {'class': 's-item__price'}).text

    # Some items display a range of prices, ignore these
    if ' to ' in price:
        return None

    date = item.find('span', {'class': 'POSITIVE'}).text
    # Extract date and convert to datetime object
    date = parse_date(date.replace('Sold ', ''))

    return {'price': float(re.sub(r'[\$,]', '', price)), 'date': date}


# Calculate average price of items
def calculate_average_price(items):
    prices = [item['price'] for item in items]
    return sum(prices) / len(prices) if prices else 0


# Calculate max and min price of items
def calculate_max_min_price(items):
    prices = [item['price'] for item in items]
    return max(prices), min(prices) if prices else 0


# remove outliers using IQR technique
def remove_outliers(items, field, multiplier):
    values = [item[field] for item in items]
    quartile_1, quartile_3 = np.percentile(values, [25, 75])
    iqr = quartile_3 - quartile_1
    lower_bound = abs(quartile_1 - (iqr * multiplier))
    upper_bound = quartile_3 + (iqr * multiplier)

    # print outliers
    print("lower bound: ", lower_bound)
    print("upper bound: ", upper_bound)
    print([item[field] for item in items if item[field] < lower_bound or item[field] > upper_bound])

    return [item for item in items if lower_bound <= item[field] <= upper_bound]


# def get_date_range(items):
#     dates = [item['date'] for item in items]
#     return datetime.fromtimestamp(min(dates)), datetime.fromtimestamp(max(dates))

# Get range of dates from items
# items come pre-sorted because of url used (sop = 13)
def get_date_range(items):
    dates = [item['date'] for item in items]
    return dates[-1], dates[0]  # -1 gets the last item, 0 gets the first item


# Scrape data from ebay
async def get_ebay_data(session, keyword, num_pages, condition='Used', sacat='0'):
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
    # items = remove_outliers(items, 'date', 1.5)

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

# asyncio.run(main())
