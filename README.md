# eBay Price Analyzer

eBay Price Analyzer is a full-stack web application that provides in-depth analytics on the historical performance of eBay listings based on a specified keyword, condition, and category. This project showcases my capabilities in full-stack development, web scraping, and asynchronous programming.

## Key Highlights

- **Efficient Web Scraping:** Utilized BeautifulSoup to effectively scrape eBay listing data, providing the foundation for our analytics.

- **Asynchronous Programming:** Leveraged Asyncio and aiohttp for handling asynchronous tasks, significantly improving the performance of data extraction and processing.

- **User Interface Design:** Crafted a user-friendly interface using React and Ant Design, offering users an intuitive experience while exploring the eBay analytics. The UI/UX design was completely done using Figma.

## Features

- Search eBay listings with a keyword, condition, and category.
- View detailed analytics including average price, min and max prices, and the total number of listings.
- Recent searches are saved in local storage for easy access.

## Built With

- [React](https://reactjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
- [Asyncio](https://docs.python.org/3/library/asyncio.html)
- [aiohttp](https://docs.aiohttp.org/en/stable/)
- [Ant Design](https://ant.design/)
- UI/UX designed with [Figma](https://www.figma.com/)

## Getting Started

### Development Setup

1. Navigate to the server directory and activate the Python virtual environment

   ```
   cd server
   source .venv/bin/activate
   ```

2. Install the required Python packages

   ```
   pip install -r requirements.txt
   ```

3. Run the FastAPI server using uvicorn

   ```
   uvicorn main:app --reload
   ```

4. In a new terminal, navigate to the client directory and install the required npm packages

   ```
   cd client
   npm install
   ```

5. Start the React development server

   ```
   npm start
   ```

The application should now be running at `localhost:3000`.

### Production Setup

1. Build the Docker images

   ```
   docker-compose build
   ```

2. Bring up the containers

   ```
   docker-compose up
   ```

The application should now be running at `localhost:80`.

## Usage

Open your web browser and navigate to `localhost:3000` (for development setup) or `localhost:80` (for production setup). Input your desired keyword, specify the condition and category, and view the generated analytics.

## Future Plans

- Visualizations
- More extensive scraping
- More datapoints
- UI improvements

## Contact

For any queries or if you'd like to learn more about the project, feel free to reach out to me at (Your Email).

## Contributing

Contributions are welcome. Please feel free to fork the repository and submit your pull requests.

## License

Please refer to the repository file for details.

## Contact

For any queries or if you'd like to learn more about the project, feel free to reach out to me.