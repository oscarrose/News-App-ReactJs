import React, { useState, useEffect, Fragment } from "react";
import NewsArticle from "./components/NewsArticles";
import Pagination from "./components/Pagination";
import "./styles/App.css";

const apiTopheadlines  ="https://newsapi.org/v2/top-headlines?pageSize=21";
const apiEndpoint="https://newsapi.org/v2/everything?";

const key = "&apiKey=1267fb5c15264fe7a074c15ccd129b58";

function App() {

  const [dataNews, setDataNews] = useState();
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedCategory, setCategorySelected] = useState("general");
  const [selectedSortBy, setSortBySelected] = useState("publishedAt");
  const[searchTitle, setSearchTitle]=useState();
  const [error, setError]=useState();

  useEffect(() => {
    const getData = async () => {
      const responde = await fetch(apiTopheadlines+key);
      const result = await responde.json();
      setDataNews(result);
    };

    const getDataFiler = async () => {
      const url =(`${apiTopheadlines }&sortBy=${selectedSortBy}&category=${selectedCategory}&country=${selectedCountry}${key}`);

      const responde = await fetch(url);
      const result = await responde.json();
      setDataNews(result);
      console.log(url);
      console.log(responde);
    };

    if ((selectedCountry === "us" || "cu" || "ca" || "mx") && 
      (selectedCategory === "sports" || "entertainment" || "technology") &&
      (selectedSortBy === "popularity" || "relevancy"))
    {
      getDataFiler();
      console.log("unido");
    }else{
      getData();
      console.log("solo");
    }
  }, [selectedCountry, selectedCategory, selectedSortBy]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchTitle) {
      return setError("Enter a text please");
    }

    const responde = await fetch(`${apiEndpoint}q=${searchTitle}${key}`);
    const result = await responde.json();

    if (result.totalResults === 0) {
      console.log(`${apiEndpoint}q=${searchTitle}${key}`);
      return setError("No results");
      
    }
    if (result.status === "error") {
      console.log(`${apiEndpoint}q=${searchTitle}${key}`);
      return setError("invalid search");
      
    }
    console.log(result);
    console.log(`${apiEndpoint}q=${searchTitle}${key}`);
    setDataNews(result, setError(""), setSearchTitle(""));
  };

  if (dataNews) {
    return (
      <Fragment>
        <div className="box-header">
          <h1 className="head-text">News</h1>
          <form className="search-title" onSubmit={handleSubmit}>
            <input
              type="search"
              value={searchTitle}
              name="search"
              placeholder="Search"
              onChange={(e) => setSearchTitle(e.target.value)}
            />

            <p>{error ? error : ""}</p>
          </form>

          <div className="filter-country">
            <select onChange={(event)=>{setSelectedCountry
              (event.target.value)}}>
                <option value="us">select country</option>
                <option>sg</option>
                <option>cu</option>
                <option>ca</option>
                <option>mx</option>
            </select>
          </div>

          <div>
            <select onChange={(event)=>{setCategorySelected
              (event.target.value)}}>
                  <option value="general">category</option>
                  <option>sports</option>
                  <option>entertainment</option>
                  <option>technology</option>
            </select>
          </div>

          <div>
            <select onChange={(event)=>{ setSortBySelected
              (event.target.value)}}>
                <option value="publishedAt">sortBy</option>
                <option>popularity</option>
                <option>relevancy</option>
            </select>
          </div>
        </div>

        <div className="all-news">
          {
             dataNews.articles.map((news) => (
              <NewsArticle props={news} key={news.url} />
            ))
              
           
            // dataNews 
            // ? 
             
               
            // :<h3>Loading...</h3>
          }
        </div>
        <Pagination />
      </Fragment>
    );
  } else {
    return (
      <div className="box-header">
        <h1 className="head-text">Loading...</h1>
      </div>
    );
  }
}

export default App;
