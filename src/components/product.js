import Product from "./Products";


  
 const Products = ({ dataArray, loading, error }) => {
    let data;
    if (dataArray.length > 0) {
      data = dataArray
        .filter((item, index) => index < 20)
        .map((item) => <Product product={item} />);
    } else {
      data = <p className="error-text">Nothing found...</p>;
    }
    return (
      <div className="products">
        {loading ? <div className="lds-dual-ring"></div> : data}
        <h2 className="error-text">{error}</h2>
      </div>
    );
  };
  export default Products