import "./App.css";
import useData from "./useData";
import { useState, useRef, useEffect } from "react";
import Coin from "./Coin";

// Material UI
import Radio from "@mui/material/Radio";

function Loading() {
  return <h1>Loading...</h1>;
}

function Error() {
  return (
    <div>
      <h1>...Error...</h1>
      <h3>See console</h3>
      <h1>...Error...</h1>
    </div>
  );
}

function App() {
  // Fun useRef hook
  const inputBox = useRef(null);

  // Custom Hook to make external API Calls
  const [loading, response, error] = useData();

  // Filter by Name or by Symbol?
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
    inputBox.current.focus();
  };

  const filteredCoins = response.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));
  const filterBySymbolCoins = response.filter((coin) => coin.symbol.toLowerCase().includes(search.toLowerCase()));

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
      {filterBy === "name" &&
        filteredCoins.map((coin) => {
          return <Coin key={coin.id} name={coin.name} price={coin.current_price} symbol={coin.symbol} marketcap={coin.total_volume} volume={coin.market_cap} image={coin.image} priceChange={coin.price_change_percentage_24h} />;
        })}
      {filterBy === "symbol" &&
        filterBySymbolCoins.map((coin) => {
          return <Coin key={coin.id} name={coin.name} price={coin.current_price} symbol={coin.symbol} marketcap={coin.total_volume} volume={coin.market_cap} image={coin.image} priceChange={coin.price_change_percentage_24h} />;
        })}
    </div>
  );
}

export default App;
