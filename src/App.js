import React, {useState,useEffect, Fragment} from "react";
import NewsArticle from "./components/NewsArticles";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import "./styles/App.css";


const apiUrl="https://newsapi.org/v2/top-headlines?language=es&pageSize=21&apiKey=b5a8298a23464d559d7685059ca45b46";

const key="b5a8298a23464d559d7685059ca45b46";

function App() {


  const[dataNews, setDataNews] = useState();
  const [selectedCountry, setSelectedCountry] =useState();
  const[selectedCategory, setCategorySelected]=useState()
  const[selectedSortBy, setSortBySelected]=useState()


  const changeSelectCountry = (event) => {
    setSelectedCountry(event.target.value);
    console.log(event.target.value);
  };

  const changeSelectSortby = (event) => {
    setSortBySelected(event.target.value);
    console.log(event.target.value);
  };
  
  const changeSelectCategory=(event)=>{
    setCategorySelected(event.target.value);
    console.log(event.target.value);  
  };
 
  useEffect(()=>{

    const getData=async()=>{
      const responde=await fetch(apiUrl)
      const result=await responde.json()
      setDataNews(result)

    };
    
    const getDataFiler=async()=>{
      const url=("https://newsapi.org/v2/top-headlines?pageSize=21&sortBy="+selectedSortBy+"&category="+selectedCategory+"&country="+selectedCountry+"&apiKey="+key);

      const responde=await fetch(url)
      const result=await responde.json()
      setDataNews(result)
      console.log(url);
      console.log(responde);
    

    };
    
    
    if((selectedCountry==="us"||"cu" ||"ca"||"mx") &&(selectedCategory==="sports"||"entertainment"||"technology") &&(selectedSortBy==="popularity"||"relevancy")){
      getDataFiler();
      console.log("unido" );
    }else{
      getData();
      console.log("solo");
    }
    

  },[selectedCountry,selectedCategory,selectedSortBy]);
 
  return(
    <Fragment>
      
      <div className="box-header"> 

        <h1 className="head-text">News</h1>
        <Search props={dataNews}/> 

        <div className="filter-country">
          <select onChange={changeSelectCountry}>
              <option value="us">select country</option>
              <option>sg</option>
              <option>cu</option>
              <option>ca</option>
              <option>mx</option>
            </select>
        </div>

        <div>
          <select onChange={changeSelectCategory}>
              <option value="general">category</option>
              <option>sports</option>
              <option>entertainment</option>
              <option>technology</option>
            </select>
        </div>

        <div>
          <select onChange={changeSelectSortby}>
              <option  value="publishedAt">sortBy</option>
              <option>popularity</option>
              <option>relevancy</option>
            </select>
        </div>
      </div>

      <div className="all-news">
          {
            dataNews 
            ? 
              dataNews.articles.map((news)=>(
              <NewsArticle props={news} key={news.url}/>)) 
                
            :"Loading..."
          }
         
        </div>
      <Pagination/>
      
    </Fragment>
  );  

 
}

export default App;
