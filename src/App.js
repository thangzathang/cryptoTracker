import "./App.css";
import useData from "./useData";
import { useState } from "react";
import Coin from "./Coin";

// Material UI
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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
  // Custom Hook to make external API Calls
  const [loading, response, error] = useData();

  // console.log(response);

  const [filterBy, setFilterBy] = useState("name");

  const [search, setSearch] = useState();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const filteredCoins = response.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));
  // const filterBySymbolCoins = response.filter((coin) => coin.symbol.toLowerCase().includes(search.toLowerCase()));
  // console.log(filteredCoins);

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">
          Crypto <i>Tracker</i>
        </h1>
        {/* <Radio checked={filterBy === "name"} onChange={handleFilterChange} value="name" name="radio-buttons" />
        <Radio checked={filterBy === "symbol"} onChange={handleFilterChange} value="symbol" name="radio-buttons" /> */}
        <form>
          <input className="coin-input" type="text" onChange={handleChange} placeholder="Search" />
        </form>
      </div>
      {error ? <Error /> : null}
      {loading ? (
        <Loading />
      ) : (
        filteredCoins.map((coin) => {
          return <Coin key={coin.id} name={coin.name} price={coin.current_price} symbol={coin.symbol} marketcap={coin.total_volume} volume={coin.market_cap} image={coin.image} priceChange={coin.price_change_percentage_24h} />;
        })
      )}
    </div>
  );
}

export default App;
