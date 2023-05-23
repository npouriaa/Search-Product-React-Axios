import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Products from "./components/product";
import Header from "./components/Header"

const App = () => {
  //states
  const [api, setApi] = useState("https://dummyjson.com/products");
  const [loading, setLoading] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const [error, setError] = useState();

  //refs
  const inputRef = useRef();

  //this function makes an HTTP request with axios and sets loading
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


  //this function changes the API with given query in search field
  const searchData = (e) => {
    e.preventDefault();
    let query = inputRef.current.value;
    setApi(`https://dummyjson.com/products/search?q=${query}`);
  };

  useEffect(() => {
    getData();
  }, [api]);

  return (
    <div className="container">
      <Header />
      <Search inputRef={inputRef} searchData={searchData} />
      <Products dataArray={dataArray} loading={loading} error={error} />
    </div>
  );
};

export default App;