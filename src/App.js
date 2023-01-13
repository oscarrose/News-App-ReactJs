import React, { useState, useEffect, Fragment } from "react";
import NewsArticle from "./components/NewsArticles";
import ReactPaginate from "react-paginate";
import "antd/dist/antd.css";
import "./styles/App.css";
import AppLoading from "./components/loadingApp";
import { country, category, sortby } from "./resource/requestData";
import { Select, Input } from "antd";

const apiTopheadlines =process.env.REACT_APP_API_TOPHEADLINES ;
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const key = process.env.REACT_APP_KEY;

function App() {
  const [dataNews, setDataNews] = useState();
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedCategory, setCategorySelected] = useState("general");
  const [selectedSortBy, setSortBySelected] = useState("publishedAt");
  const [searchTitle, setSearchTitle] = useState();
  const [error, setError] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const getDataFiler = async () => {
      const url = `${apiTopheadlines}&page=${pageNumber}&sortBy=${selectedSortBy}&category=${selectedCategory}&country=${selectedCountry}${key}`;

      const responde = await fetch(url);
      const result = await responde.json();
      setDataNews(result);
     
    };

    getDataFiler();
  }, [selectedCountry, selectedCategory, selectedSortBy, pageNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchTitle) {
      return setError("Enter a text please");
    }

    const responde = await fetch(
      `${apiEndpoint}q=${searchTitle}&sortBy=${sortby}${key}`
    );
    const result = await responde.json();

    if (result.totalResults === 0) {
      return setError("No results");
    }
    if (result.status === "error") {
      return setError("invalid search");
    }

    setDataNews(result, setError(""), setSearchTitle(""));
  };

  const changePage = async ({ selected }) => {
    setPageNumber(selected + 1);
    console.log(pageNumber);
  };
  const getNews = async () => {
    const responde = await fetch(`${apiTopheadlines}&category=general${key}`);
    const result = await responde.json();
    setDataNews(result);
  };

  if (dataNews) {
    return (
      <Fragment>
        <div className="box-header">
          <h1 className="head-text" onClick={getNews}>
            News
          </h1>

          <form className="search-title" onSubmit={handleSubmit}>
            <Input
              style={{ width: 180, marginLeft: 155 }}
              type="search"
              value={searchTitle}
              name="search"
              placeholder="Search"
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <p>{error ? error : ""}</p>
          </form>

          <Select
            style={{ width: 180, marginLeft: 80 }}
            options={country}
            placeholder="select one country"
            onChange={(value) => {
              setSelectedCountry(value);
            }}
          />

          <Select
            style={{ width: 180 }}
            options={category}
            placeholder="select one category"
            onChange={(value) => {
              setCategorySelected(value);
            }}
          />

          <Select
            options={sortby}
            style={{ width: 180, marginLeft: -80 }}
            placeholder="select one sortby"
            onChange={(value) => {
              setSortBySelected(value);
            }}
          />
        </div>

        <div className="all-news">
          {dataNews.articles === undefined ? (
            <h3>{`${dataNews.status}: ${dataNews.message}`}</h3>
          ) : (
            dataNews.articles.map((news) => (
              <NewsArticle props={news} key={news.url} />
            ))
          )}
        </div>

        <ReactPaginate
          pageCount={Math.ceil(8)}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          activeClassName={"paginationActive"}
        />
      </Fragment>
    );
  } else {
    return (
      <div className="App-header">
        <AppLoading />
        <h1 style={{ padding: 80 }}>Loading...</h1>
      </div>
    );
  }
}

export default App;
