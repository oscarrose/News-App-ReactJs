import React, {useState,useEffect, Fragment} from "react";
import NewsArticle from "./components/NewsArticles";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import "./styles/App.css";


const apiUrl="https://newsapi.org/v2/everything?q=tesla&from=2021-09-21&sortBy=publishedAt&apiKey=1267fb5c15264fe7a074c15ccd129b58";

const countryUs="https://newsapi.org/v2/top-headlines?country=us&apiKey=1267fb5c15264fe7a074c15ccd129b58";

const countryCu="https://newsapi.org/v2/top-headlines?country=cu&apiKey=1267fb5c15264fe7a074c15ccd129b58";

const countryCa="https://newsapi.org/v2/top-headlines?country=ca&apiKey=1267fb5c15264fe7a074c15ccd129b58";

const countryMx="https://newsapi.org/v2/top-headlines?country=mx&apiKey=1267fb5c15264fe7a074c15ccd129b58";

function App() {


  const[dataNews, setDataNews] = useState();
  const [selected, setSelected] =useState("select country...");

  const changeSelectOption = (event) => {
    setSelected(event.target.value);
  };

  useEffect(()=>{

    const getData=async()=>{
      const responde=await fetch(apiUrl)
      const result=await responde.json()
      setDataNews(result)

    };

    const getDataCountryUs=async()=>{
      const responde=await fetch(countryUs)
      const result=await responde.json()
      setDataNews(result)
    };

    const getDataCountryAe=async()=>{
      const responde=await fetch(countryCu)
      const result=await responde.json()
      setDataNews(result)

    };
    const getDataCountryCa=async()=>{
      const responde=await fetch(countryCa)
      const result=await responde.json()
      setDataNews(result)

    };

    const getDataCountryMx=async()=>{
      const responde=await fetch(countryMx)
      const result=await responde.json()
      setDataNews(result)

    };
    if(selected==="select country..."){
      getData();
    
      
    }else if(selected ==="us") {
      getDataCountryUs();
      
     
    }else if(selected==="cu"){
      getDataCountryAe();
     

    }else if (selected==="ca"){
      getDataCountryCa();
   

    }else if(selected==="mx"){
      getDataCountryMx();

    }
    

  },[selected]);
 
  return(
    <Fragment>
      
      <div className="box-header"> 

        <h1 className="head-text">News</h1>
        <Search props={dataNews}/> 

        <div className="filter-country">
          <select onChange={changeSelectOption}>
              <option >select country...</option>
              <option>us</option>
              <option>cu</option>
              <option>ca</option>
              <option>mx</option>
            </select>
        </div>
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
