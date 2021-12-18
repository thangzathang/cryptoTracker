import "./App.css";
import useData from "./useData";
import { useState } from "react";
import Coin from "./Coin";

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
  const [loading, response, error] = useData();

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = response.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input className="coin-input" type="text" onChange={handleChange} placeholder="Search" />
        </form>
      </div>
      {error ? <Error /> : null}
      {loading ? <Loading /> : null}
      {filteredCoins.map((coin) => {
        return <Coin key={coin.id} name={coin.name} price={coin.current_price} symbol={coin.symbol} marketcap={coin.total_volume} volume={coin.market_cap} image={coin.image} priceChange={coin.price_change_percentage_24h} />;
      })}
    </div>
  );
}

export default App;
