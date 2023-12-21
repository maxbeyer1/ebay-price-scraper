import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock

# import main from api folder
from api import main

client = TestClient(main.app)


@pytest.mark.asyncio
async def test_read_data(mocker):
    mock_get_ebay_data = mocker.patch('api.main.get_ebay_data', new_callable=AsyncMock)
    mock_get_ebay_data.return_value = {
        'average_price': 100.0,
        'max_price': 150.0,
        'min_price': 50.0,
        'total_items': 3,
        'date_range': '09/20/2022 to 09/22/2022'
    }

    response = client.get("/api/?keyword=iphone&num_pages=1&condition=Used&sacat=0")

    assert response.status_code == 200
    assert response.json() == {
        'average_price': 100.0,
        'max_price': 150.0,
        'min_price': 50.0,
        'total_items': 3,
        'date_range': '09/20/2022 to 09/22/2022'
    }
