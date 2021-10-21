import React, {useState, Fragment, useEffect} from "react";
import "../styles/App.css";

function Search({props}){
    const[news, setNews]=useState([{props}]);
    const[searchTitle, setSearchTitle]=useState("");
    const [loading, setLoading] = useState(false);

  /*  useEffect(() => {
        const validNews = async () => {
           
            if(news){
                setLoading(true)
            }else{
                setLoading(false) 
            }
        };
       
       validNews();
    }, []);*/

    return(
        <Fragment>
            <input type="search" className="search-title" 
            name="search" placeholder="Search title..." 
            onChange={(e)=>setSearchTitle(e.target.value)}/>

            {loading ? (
                <h4>Loading...</h4>
                ) : (
                     news
                     .filter((value)=> {
                        if (searchTitle === "") {
                        return value;
                        } else if (
                        value.title.toLowerCase().includes(searchTitle.toLowerCase())
                        ) {
                            console.log(value)
                         return value;
                        }
                    }).map((itemNews) => 
                    <h5  key={itemNews.url}>
                        {itemNews.title}
                    </h5>)
                )
            }

        </Fragment>
    );
    



}

export default Search;