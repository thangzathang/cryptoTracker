import "./App.css";
import useData from "./useData";
import { useState } from "react";
import Coin from "./Coin";

function App() {
  const [loading, coins, error] = useData();

  console.log("Type of coins is:", typeof coins);

  let result = coins.map(({ foo }) => foo);

  // console.log(coins);

  // const handleChange = (e) => {
  //   setSearch(e.target.value);
  // };

  // const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <h1>hi</h1>
    // <div className="coin-app">
    //   <div className="coin-search">
    //     <h1 className="coin-text">Search a currency</h1>
    //     <form>
    //       <input className="coin-input" type="text" onChange={handleChange} placeholder="Search" />
    //     </form>
    //   </div>
    //   {filteredCoins.map((coin) => {
    //     return <Coin key={coin.id} name={coin.name} price={coin.current_price} symbol={coin.symbol} marketcap={coin.total_volume} volume={coin.market_cap} image={coin.image} priceChange={coin.price_change_percentage_24h} />;
    //   })}
    // </div>
  );
}

export default App;
