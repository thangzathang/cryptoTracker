import { useEffect, useReducer } from "react";
import axios from "axios";

// let APILink = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${pageNum}&sparkline=false`;

/*
  Product Requirement 4:
  Provide a loading state whilst data is being pulled

  Product Requirement 5:
  Provide an error state if the call fails
*/
export default function useData(pageNum = 1) {
  let [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "LOADING": {
          return { ...state, loading: true };
        }
        case "RESOLVED": {
          return {
            ...state,
            loading: false,
            response: action.response,
            error: null,
          };
        }
        case "ERROR": {
          return {
            ...state,
            loading: false,
            response: null,
            error: action.error,
          };
        }
        default:
          return state;
      }
    },
    {
      loading: false,
      response: [],
      error: null,
    }
  );

  useEffect(() => {
    let isCurrent = true;
    dispatch({ type: "LOADING" });

    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${pageNum}&sparkline=false`)
      .then((res) => {
        if (isCurrent) {
          console.log(res.data);
          dispatch({ type: "RESOLVED", response: res.data });
        }
      })
      .catch((error) => dispatch({ type: "ERROR", error }));

    return () => {
      isCurrent = false;
    };
  }, [pageNum]);

  return [state.loading, state.response, state.error];
}
