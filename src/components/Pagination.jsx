import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "../styles/App.css";

function Pagination (){
    const [pageNumber, setPageNumber] = useState(1);
  
    const pageCount = Math.ceil(5);
  
    const changePage = ({selected}) => {
      setPageNumber(selected);
      console.log(pageNumber);
    };
  
    return (
      <div>
        
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          activeClassName={"paginationActive"}
        />
      </div>
    );
}
export default Pagination;