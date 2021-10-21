import React, {useState,useEffect, Fragment} from "react";
import NewsArticle from "./components/NewsArticles";
import Pagination from "./components/Pagination";
import "./styles/App.css";



function App() {

  const apiUrl="https://newsapi.org/v2/everything?q=tesla&from=2021-09-21&sortBy=publishedAt&apiKey=1267fb5c15264fe7a074c15ccd129b58"

  const[dataNews, setDataNews] = useState();


  useEffect(()=>{
    const getData=async()=>{
      const responde=await fetch(apiUrl)
      const result=await responde.json()
      setDataNews(result)
     
    };
    

    getData();
   
  },[]);

  return(
    <Fragment>
      
      <div> 
        <h1 className="head-text">News</h1>
        
      </div>

      <div className="all-news">
          {
            dataNews 
            ? 
              dataNews.articles.map((news)=>(
              <NewsArticle props={news} key={news.url}/>)) 

            :"Loading"
          }
         
        </div>
      <Pagination/>
      
     
    </Fragment>
  );  

 
}

export default App;
