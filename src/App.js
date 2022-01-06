import "./App.css";
import useData from "./useData";
import { useState, useRef, useEffect } from "react";

// Import Components
import Coin from "./Coin";
import Pagination from "./Pagination";

// Material UI
import Radio from "@mui/material/Radio";

// Loading component if component is loading.
function Loading() {
  return <h1>Loading...</h1>;
}

// Error component if there is an error
function Error() {
  return (
    <div>
      <h1>...Error...</h1>
      <h3>See console</h3>
    </div>
  );
}

/*
  Product Requirement 1:
  Display a paginated list of Cryptocurrencies
*/

function App() {
  // Fun useRef hook
  const inputBox = useRef(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // Custom Hook to make external API Calls
  const [loading, response, error] = useData();

  // State for Filter by Name or by Symbol?
  const [filterBy, setFilterBy] = useState("name");

  // State for the search term
  const [search, setSearch] = useState("");

  // handleChange for every word/ keystroke entered
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // handleChange for changing what we are filtering by.
  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  // The filtered Results
  let filteredCoins;
  if (filterBy === "name") {
    filteredCoins = response.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));
  } else {
    filteredCoins = response.filter((coin) => coin.symbol.toLowerCase().includes(search.toLowerCase()));
  }

  // Pagination Code
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredCoins.slice(indexOfFirstPost, indexOfLastPost);

  console.log("Current Posts", currentPosts);

  // Automatically focus on the text input field.
  useEffect(() => {
    inputBox.current.focus();
  }, []);

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">
          Crypto <i>Tracker</i>
        </h1>
        <form>
          <div className="radio-field">
            Name
            <Radio color="secondary" checked={filterBy === "name"} onChange={handleFilterChange} value="name" />
            Symbol
            <Radio color="secondary" checked={filterBy === "symbol"} onChange={handleFilterChange} value="symbol" />
          </div>
          <input ref={inputBox} className="coin-input" type="text" onChange={handleChange} placeholder="Search" />
        </form>
      </div>
      {error ? <Error /> : null}
      {loading ? <Loading /> : null}
      {/* <Pagination postsPerPage={postsPerPage} totalPosts={filteredCoins.length} paginate={paginate} /> */}
      {filteredCoins.map((coin) => {
        return (
          <>
            <Coin key={coin.id} name={coin.name} price={coin.current_price} symbol={coin.symbol} marketcap={coin.total_volume} volume={coin.market_cap} image={coin.image} priceChange={coin.price_change_percentage_24h} />
          </>
        );
      })}
    </div>
  );
}

export default App;
