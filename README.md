# Climate Change News API

The Climate Change News API is a RESTful web service that provides access to a curated collection of news articles related to climate change from reputable newspapers and sources. This API offers a straightforward way to programmatically access up-to-date information on climate change issues. Users can retrieve a consolidated list of climate change articles from multiple sources or select articles from a specific newspaper, making it a valuable resource for developers, researchers, and applications interested in climate change news. With no authentication required, it offers easy access to valuable climate-related content.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Base URL](#base-url)
  - [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#MIT)

## Getting Started

### Prerequisites

Before using the Climate Change News API, make sure you have the following prerequisites installed:

- Node.js and npm (Node Package Manager)
- Express.js
- Axios
- Cheerio

You can install these dependencies using npm:

```
npm install
```

### Installation

1. Clone this repository to your local machine:

```
git clone https://github.com/Mohammad-Shoeb-Faizan/ClimateChangeAPI.git
```

2. Navigate to the project directory:

```
cd climate-change-news-api
```

3. Install the required dependencies:

```
npm install
```

4. Start the server:

```
npm start
```

The API server will be accessible at `http://localhost:8000` by default. You can configure the port in the code if needed.

## Usage

### Base URL

The base URL for the Climate Change News API is:

```
https://climatechangeapi-ateh.onrender.com
```

### Endpoints

- `GET /`

  Returns a welcome message indicating that you've reached the Climate Change News API.

- `GET /news`

  Retrieves a list of climate change articles from multiple newspapers.

- `GET /news/:newspaperId`

  Retrieves climate change articles from a specific newspaper identified by `newspaperId`.

## Contributing

Contributions are welcome! If you would like to contribute to the Climate Change News API, please follow the community guidelines.

## MIT Licence

Copyright (c) 2023 Mohammad Shoeb Faizan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
