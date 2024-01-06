import { useState } from "react"

const Search = () => {
  const [search, setSearch]= useState("");
  const [sort, setSort]= useState("");
  const [maxPrice, setMaxrice]= useState(100000);
  const [category, setCategory]= useState("");
  const [page, setPage]= useState(1);
  return (
    <div>search</div>
  )
}

export default Search