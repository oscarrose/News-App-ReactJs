import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "../styles/App.css";

function Pagination ({props}){
    const [pageNumber, setPageNumber] = useState(0);
  
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
  
    
    const pageCount = Math.ceil(1000 / usersPerPage);
  
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
  
    return (
      <div className="App">
        
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    );
}
export default Pagination;