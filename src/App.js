import React, { useState, useEffect, Fragment } from "react";
import NewsArticle from "./components/NewsArticles";
import ReactPaginate from "react-paginate";
import "./styles/App.css";

const apiTopheadlines  ="https://newsapi.org/v2/top-headlines?pageSize=12";
const apiEndpoint="https://newsapi.org/v2/everything?";
const key = "&apiKey=1267fb5c15264fe7a074c15ccd129b58";

function App() {

  const [dataNews, setDataNews] = useState();
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [selectedCategory, setCategorySelected] = useState("general");
  const [selectedSortBy, setSortBySelected] = useState("publishedAt");
  const[searchTitle, setSearchTitle]=useState();
  const [error, setError]=useState();
  const [pageNumber, setPageNumber] = useState(1);


  useEffect(() => {
   
    const getDataFiler = async () => {
      const url =(`${apiTopheadlines}&page=${pageNumber}&sortBy=${selectedSortBy}&category=${selectedCategory}&country=${selectedCountry}${key}`);

      const responde = await fetch(url);
      const result = await responde.json();
      setDataNews(result);
      console.log(result);
     

    };
    
    
    getDataFiler();    
   
  }, [selectedCountry, selectedCategory, selectedSortBy,pageNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchTitle) {
      return setError("Enter a text please");
    }

    const responde = await fetch(`${apiEndpoint}q=${searchTitle}${key}`);
    const result = await responde.json();

    if (result.totalResults === 0) {
    
      return setError("No results");
      
    }
    if (result.status === "error") {
  
      return setError("invalid search");
      
    }
   
    setDataNews(result, setError(""), 
    setSearchTitle(""),);
  };

  const changePage = async({selected}) => {
    setPageNumber(selected+1);
    console.log(pageNumber);
  };
  const getData = async () => {
    const responde = await fetch(`${apiTopheadlines}&category=${selectedCategory}${key}`);
    const result = await responde.json();
    setDataNews(result, setPageNumber(1));
  };

  if (dataNews) {
    return (
      <Fragment>
        <div className="box-header">

          <h1 className="head-text" style={{cursor:'pointer'}}
          onClick={getData}>
            News
          
          </h1>
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
            
            // dataNews.articles.length !==0 
            // ?

              dataNews.articles !==undefined
              ?
                dataNews.articles.map((news) => (
                <NewsArticle props={news} key={news.url} />))

              :<h3>{`${dataNews.status}: ${dataNews.message}`}</h3> 

            // :<h2>Search limit reached</h2> 
          }
        </div>
        <ReactPaginate
          pageCount={Math.ceil(10)}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          activeClassName={"paginationActive"}
        
        />
      </Fragment>
    );
  } else {
    return (
      <div className="box-header">
        <h1 style={{padding:80}}>Loading...</h1>
      </div>
    );
  }
}

export default App;
