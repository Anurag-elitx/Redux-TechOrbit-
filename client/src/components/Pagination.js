const Pagination = ({ totalItems }) => {
    const pageNumbers = [];
  
    // calculate the total number of pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    // create an array of page numbers
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button onClick={() => setCurrentPage(number)}>{number}</button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  export default Pagination;