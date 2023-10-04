import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../slices/cartSlice";
// import { useGetAllProductsQuery } from "../slices/productsApi";
import { Link } from "react-router-dom";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>nuova collezione 2024</h2>
          <div className="categoryes">
          <a href="" className="category">Camicie</a>
          <a href="" className="category">Pantaloni</a>
          <a href="" className="category">Felpe</a>
          <a href="" className="category">Jeans</a>
          {/* <a href="" className="category">Completi</a> */}
          {/* <a href="" className="category">Tute</a> */}
          {/* <a href="" className="category">Cappelli</a> */}
          {/* <a href="" className="category">Scarpe</a> */}

          </div>

          <h2>New Arrivals</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <Link to ={`/product/${product._id}`} alt={product.name} >
                    <img src={product.image?.url} alt={product.name} />
                  </Link>
                  <h3>{product.name}</h3>
                  <div className="details">
                    
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
