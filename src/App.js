import React, {useState,useEffect, Fragment} from "react";
import NewsArticle from "./components/NewsArticles";
import "./styles/App.css";



function App() {

  const apiUrl="https://newsapi.org/v2/everything?q=tesla&from=2021-09-20&sortBy=publishedAt&apiKey=1267fb5c15264fe7a074c15ccd129b58"

  const[dataNews, setDataNews] = useState();

  const getData=async()=>{
    const responde=await fetch(apiUrl)
    const result=await responde.json()
    setDataNews(result)
    console.log(dataNews);
    console.log(result);
   
  };
  
  useEffect(()=>{

    getData();

  },[]);

  return(
    <Fragment>
      <div> 
        <h1>News</h1>
      </div>

      <div>
          {
            dataNews 
            ? 
              dataNews.articles.map((news)=>(
              <NewsArticle props={news} key={news.url}/>)) 

            :"Loading"
          }
        </div>
     
    </Fragment>
  );  

 
}

export default App;
