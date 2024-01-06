import { useState } from "react"
import ProductCard from "../components/product-card";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const isPrevPage = true;
  const isNextPage = true;

  const addToCartHandler = () => {

  }

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>

        {/* SORT ACCORDING TO PRICE CHOICE */}
        <div>
          <h4>Sort</h4>
          <select value={sort}
            onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        {/* MAX PRICE FILTER */}
        <div>
          {/* If maxPrice provided then show maxPrice else show nothing after colon */}
          <h4>Max Price: {maxPrice || ""}</h4>
          <input type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>

        {/* CATEGORY FILTER */}
        <div>
          <h4>Category</h4>
          <select value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="">None</option>
            <option value="">Sample 1</option>
            <option value="">Sample 2 </option>
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input type="text" className="searchBox"
          placeholder="Search your product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} />

        <div className="search-product-list">
          <ProductCard
            productId="fghjbk"
            name="MacBook"
            price={123456}
            stock={23}
            photo="https://m.media-amazon.com/images/I/71vFKBpKakL._SX569_.jpg"
            handler={addToCartHandler} />
        </div>

        <article>
          <button
            disabled={!isPrevPage}
            onClick={() => setPage((prev) => prev - 1)}>
            Prev
          </button>
          <span>{page} of {4}</span>
          <button
            disabled={!isNextPage}
            onClick={() => setPage((prev) => prev + 1)}>
            Next
          </button>
        </article>
      </main>
    </div>
  )
}

export default Search