import React,{useState, useEffect} from "react";
import NewsArticles from "./NewsArticles";
const apiUrl="https://newsapi.org/v2/everything?q=tesla&from=2021-09-21&sortBy=publishedAt&apiKey=1267fb5c15264fe7a074c15ccd129b58";

const countryUs="https://newsapi.org/v2/top-headlines?country=us&apiKey=1267fb5c15264fe7a074c15ccd129b58";

const countryCu="https://newsapi.org/v2/top-headlines?country=cu&apiKey=1267fb5c15264fe7a074c15ccd129b58";

const countryCa="https://newsapi.org/v2/top-headlines?country=ca&apiKey=1267fb5c15264fe7a074c15ccd129b58";

const countryMx="https://newsapi.org/v2/top-headlines?country=mx&apiKey=1267fb5c15264fe7a074c15ccd129b58";

function FilterCountry({c1,c2,c3,c4}){

    const [selected, setSelected] =useState("");
    const[dataNews, setDataNews] = useState();

    const changeSelectOption = (event) => {
        setSelected(event.target.value);
        console.log(selected);
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
          console.log(result)
        };
    
        const getDataCountryAe=async()=>{
          const responde=await fetch(countryCu)
          const result=await responde.json()
          setDataNews(result)
          console.log(result)
    
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
        <div>
              <select onChange={changeSelectOption}>
              <option>select country...</option>
              <option>{c1}</option>
              <option>{c2}</option>
              <option>{c3}</option>
              <option>{c4}</option>
        </select>

        <div className="all-news">
          {
            dataNews 
            ? 
              dataNews.articles.map((news)=>(
              <NewsArticles props={news} key={news.url}/>)) 
                
            :"Loading"
          }
         
        </div>
            
        </div>
      
     

    );
}
export default FilterCountry;


