import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Coin from "../Coin";
import btcData from "./btcData";

test("Should render Coin Component", () => {
  const { name, price, symbol, marketcap, volume, image } = btcData;
  render(<Coin name={name} price={price} symbol={symbol} marketcap={marketcap} volume={volume} image={image} />);
  const coinElement = screen.getAllByTestId("bitcoin");
  expect(coinElement).toBeInTheDocument();
  // Check Texts on screen
  expect(coinElement).toHaveTextContent("USD");
  expect(coinElement).toHaveTextContent("Price Change");

  // Check classnames renders
  expect(coinElement).toHaveClass("coin-price");
  expect(coinElement).toHaveClass("coin-data");
  expect(coinElement).toHaveClass("coin-volume");
  expect(coinElement).toHaveClass("coin-marketcap");
});
