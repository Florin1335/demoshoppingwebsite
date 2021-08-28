import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query !== "") {
      history.push(`/cautare/${query}`);
      setQuery("");
    }
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img alt="logo" src="/headerLogo.png" width="130" height="70"></img>
        </Link>
        <form className="d-flex w-100" onSubmit={handleSearch}>
          <input
            className="form-control"
            placeholder="Search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          ></input>
          <button type="submit" className="btn btn-dark">
            <span className="d-flex align-items-center">
              Search&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </nav>
  );
}
