const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

const newspapers = [
  {
    name: "cityam",
    address:
      "https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/",
    base: "",
  },
  {
    name: "thetimes",
    address: "https://www.thetimes.co.uk/environment/climate-change",
    base: "",
  },
  {
    name: "guardian",
    address: "https://www.theguardian.com/environment/climate-crisis",
    base: "",
  },
  {
    name: "telegraph",
    address: "https://www.telegraph.co.uk/climate-change",
    base: "https://www.telegraph.co.uk",
  },
  {
    name: "nyt",
    address: "https://www.nytimes.com/international/section/climate",
    base: "",
  },
  {
    name: "latimes",
    address: "https://www.latimes.com/environment",
    base: "",
  },
  {
    name: "smh",
    address: "https://www.smh.com.au/environment/climate-change",
    base: "https://www.smh.com.au",
  },
  {
    name: "un",
    address: "https://www.un.org/climatechange",
    base: "",
  },
  {
    name: "bbc",
    address: "https://www.bbc.co.uk/news/science_and_environment",
    base: "https://www.bbc.co.uk",
  },
  {
    name: "es",
    address: "https://www.standard.co.uk/topic/climate-change",
    base: "https://www.standard.co.uk",
  },
  {
    name: "sun",
    address: "https://www.thesun.co.uk/topic/climate-change-environment/",
    base: "",
  },
  {
    name: "dm",
    address:
      "https://www.dailymail.co.uk/news/climate_change_global_warming/index.html",
    base: "",
  },
  {
    name: "nyp",
    address: "https://nypost.com/tag/climate-change/",
    base: "",
  },
  {
    name: "timesofindia",
    address: "https://timesofindia.indiatimes.com/environment/global-warming",
    base: "https://timesofindia.indiatimes.com",
  },
  {
    name: "hindustantimes",
    address: "https://www.hindustantimes.com/environment/",
    base: "https://www.hindustantimes.com",
  },
  {
    name: "indianexpress",
    address: "https://indianexpress.com/about/climate-change/",
    base: "https://indianexpress.com",
  },
  {
    name: "thehindu",
    address: "https://www.thehindu.com/sci-tech/energy-and-environment/",
    base: "https://www.thehindu.com",
  },
  {
    name: "dnaindia",
    address: "https://www.dnaindia.com/environment",
    base: "https://www.dnaindia.com",
  },
  {
    name: "newindianexpress",
    address: "https://www.newindianexpress.com/environment/",
    base: "https://www.newindianexpress.com",
  },
  {
    name: "zeenews",
    address: "https://zeenews.india.com/environment",
    base: "https://zeenews.india.com",
  },
  {
    name: "deccanchronicle",
    address: "https://www.deccanchronicle.com/nation/current-affairs/",
    base: "https://www.deccanchronicle.com",
  },
  {
    name: "business-standard",
    address: "https://www.business-standard.com/topic/climate-change",
    base: "https://www.business-standard.com",
  },
  {
    name: "thequint",
    address: "https://www.thequint.com/environment",
    base: "https://www.thequint.com",
  },
];

const fetchArticlesFromNewspaper = async (newspaper) => {
  try {
    const response = await axios.get(newspaper.address);
    const html = response.data;
    const $ = cheerio.load(html);

    const articles = $('a:contains("climate")', html)
      .map(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        return {
          title,
          url: newspaper.base + url,
          source: newspaper.name,
        };
      })
      .get();

    return articles;
  } catch (error) {
    console.error(`Error fetching articles from ${newspaper.name}: ${error}`);
    return [];
  }
};

const fetchAllArticles = async () => {
  const allArticles = await Promise.all(
    newspapers.map((newspaper) => fetchArticlesFromNewspaper(newspaper))
  );

  return allArticles.flat(); // Combine arrays from multiple newspapers into one
};

app.get("/", (req, res) => {
  res.json("Welcome to my Climate Change News API");
});

app.get("/news", async (req, res) => {
  try {
    const articles = await fetchAllArticles();
    res.json(articles);
  } catch (error) {
    console.error(`Error fetching articles: ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred while fetching articles" });
  }
});

app.get("/news/:newspaperId", async (req, res) => {
  const newspaperId = req.params.newspaperId;
  const newspaper = newspapers.find((n) => n.name === newspaperId);

  if (!newspaper) {
    return res.status(404).json({ error: "Newspaper not found" });
  }

  try {
    const articles = await fetchArticlesFromNewspaper(newspaper);
    res.json(articles);
  } catch (error) {
    console.error(`Error fetching articles from ${newspaperId}: ${error}`);
    res.status(500).json({
      error: `An error occurred while fetching articles from ${newspaperId}`,
    });
  }
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
