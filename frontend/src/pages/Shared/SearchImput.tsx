function SearchInput(props) {
  function onChange(e) {
    props.onChange(e);
  }

  function handleSearch(e) {
    props.handleSearch(e);
  }

  return (
    
      <div className="input-group justify-content-center">
        <div className="row">
          <div className="col-12 ">
            <div className="input-group">
              <input
                onChange={onChange}
                className="form-control rounded"
                placeholder={props.placeholder}
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <button
                type="button"
                className="btn btn-outline-primary bg-white"
                onClick={handleSearch}
              >
                Szukaj
              </button>
            </div>
          </div>
        </div>
      </div>
   
  );
}

export default SearchInput;
