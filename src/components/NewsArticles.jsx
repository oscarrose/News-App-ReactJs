import React from "react";

function NewsArticle({props}){
    return(
       
        <div>
            
         <img src={props.urlToImage} alt='image the news'/>
         <h2>{props.title}</h2> 
         <h6>{props.author}</h6>
         <p>{props.description}</p>
         <h6>{props.publishedAt}</h6>
        </div>
    );
}

export default NewsArticle;