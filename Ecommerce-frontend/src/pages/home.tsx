import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"


const Home = () => {

  const addToCartHandler=()=>{
  
  }

  return (
    <div className='home'>
      <section></section>
      <h1>Latest Products
        <Link to="/search" className="findMore"> More</Link>
      </h1>
      <main>
        <ProductCard 
        productId="fghjbk"
        name="MacBook"
        price={123456}
        stock={23}
        photo="https://m.media-amazon.com/images/I/71vFKBpKakL._SX569_.jpg"
        handler={addToCartHandler}/>
      </main>
    </div>
  )
}

export default Home