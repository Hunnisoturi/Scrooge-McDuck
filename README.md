## Project Overview

This is my version of an MVP for Scrooge McDuck. Mr McDuck needed a software solution for analyzing
historical stock market data. The project requirements were as follows:

- Mr McDuck must be able to import historical stock market data from a CSV file to the application
- He must be able to limit the date range to be inspected
- He must be able to gain the following insights from the data:
  - How many days was the longest bullish trend within a given date range?
  - Which dates within the given date range had a) the highest trading volume and b) the most significant price change within a day
  - Within a given date range, which dates had the best opening price compared to 5 days simple moving average (SMA 5)

On top of these requirements I also implemented a collapsible list with full dataset (or if limited, then the data in the given date range)

## Project technologies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation and running the app

Clone the project to your local machine.

Navigate to the project folder.

In the project folder, run:

### `npm install`

This will install the required dependencies.

To run the application, in the project folder run:

### `npm start`

This will open the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Important instructions

THe CSV file given to the application must be formatted as follows:

“Date, Close/Last, Volume, Open, High, Low

01/19/2021, $127.83, 90757330, $127.78, $128.71, $126.938”

The app is only validated to work with this data format, and you may encounter errors if the data format is not correct.

The app is only validated to work on a desktop viewport. You may find the user experience to be suboptimal on a mobile device or tablet.
The app is only validated to work on the latest version of Google Chrome. All the features may not be available on other browsers.

## Final notes

I had a blast making this, hope you enjoy it too. All the code in this repository is free to use.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
