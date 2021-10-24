import React, {useState, Fragment} from "react";
import "../styles/App.css";
import NewsArticle from "./NewsArticles"

const api="https://newsapi.org/v2/everything?q=";
const key="&apiKey=b5a8298a23464d559d7685059ca45b46";

function Search(){
    const[news, setNews]=useState();
    const[searchTitle, setSearchTitle]=useState();
    const [error, setError]=useState();

    const  handleSubmit= async(e)=>{
        e.preventDefault();
    
        if(!searchTitle){
            return setError("Enter a text please");
        }

        const responde=await fetch(`${api}${searchTitle}`+key)
        const result=await responde.json();

        if(result.totalResults===0){
            return setError("No results");
        }
        setNews(result, setError(""), setSearchTitle(""))
      
    }

    return(
        <Fragment>
            <form className="search-title" onSubmit={handleSubmit}>
                
                <input type="search" value={searchTitle}
                name="search" placeholder="Search" 
                onChange={(e)=>setSearchTitle(e.target.value)}/>

                <p>{error ? error :""}</p>
            </form>
        
        </Fragment>
    );

}

export default Search;