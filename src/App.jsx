//imports
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  //states
  const [api, setApi] = useState("https://dummyjson.com/products");
  const [loading, setLoading] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [error, setError] = useState();

  //refs
  const inputRef = useRef();

  //this function make http request with axios and set loading 
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}`);
      setDataArray(response.data.products);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setLoading(false);
  };

  //this function show the data from dataArray state (api returned product array) 
  const showData = () => {
    let data;
    if (dataArray.length > 0) {
      data = dataArray
        .filter((item, index) => index < 20)
        .map((item) => {
          return (
            <div key={item.id} className="product">
              <img src={item.images[0]} alt="" />
              <div className="details">
                <p>
                  category : <span>{item.category}</span>
                </p>
                <p>
                  title : <span>{item.title}</span>
                </p>
                <p>
                  brand : <span>{item.brand}</span>
                </p>
                <p>
                  price : <span>{item.price}$</span> 
                </p>
                <p>
                  description : <span>{item.description}</span>
                </p>
                <button>
                  Shop Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        });
    }else{
      data = <p className="error-text">Nothing found...</p>
    }
    return data;
  };

  //this function chnage the api with given query in search field
  const searchData = (e) => {
    e.preventDefault();
    let query = inputRef.current.value;
    setApi(`https://dummyjson.com/products/search?q=${query}`);
  };

  //useEfects
  useEffect(() => {
    getData();
    showData();
  }, [api]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>
          React <span>Axios</span> Example
        </h1>
      </div>
      <div className="search-con">
        <form onSubmit={(e) => searchData(e)} className="frm" action="">
          <input
            ref={inputRef}
            required
            type="text"
            placeholder="Search anythng...."
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="products">
        {loading ? <div className="lds-dual-ring"></div> : showData()}
        <h2 className="error-text">{error}</h2>
      </div>
    </div>
  );
};

export default App;