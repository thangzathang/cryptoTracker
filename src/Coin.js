import React from "react";
import "./Coin.css";

/*
Product Requirement 2:
For the Visible Cryptocurrencies, provide further information in any form you find
appropriate
*/

const Coin = ({ id, name, price, symbol, marketcap, volume, image, priceChange }) => {
  return (
    <div className="coin-container" data-testid={`test-${id}`}>
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <p className="coin-symbol">{symbol}</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">
            <span>USD </span>${price}
          </p>
          <p className="coin-volume">${volume.toLocaleString()}</p>
          Price Change
          {priceChange < 0 ? <p className="coin-percent red">{priceChange.toFixed(2)}%</p> : <p className="coin-percent green">{priceChange.toFixed(2)}%</p>}
          <p className="coin-marketcap">Mkt Cap: ${marketcap.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
