import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const NewsContext=createContext();

export const NewsContextProvider=(props)=>{
    const [data, setdata] = useState([]);
   // const apikey='b5a8298a23464d559d7685059ca45b46';

    useEffect(()=>{
        axios
        .get(
            'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b5a8298a23464d559d7685059ca45b46'
            )
        .then((responde)=> setdata(responde.data))
        .catch((error)=>console.log(error));
    },[data]);

    return(
        <NewsContext.Provider values={{data}}>
            {props.children}
        </NewsContext.Provider>
    );
};
