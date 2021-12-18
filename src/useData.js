import { useEffect, useReducer } from "react";
import axios from "axios";

const APILink = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false";

export default function useData() {
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
      .get(APILink)
      .then((res) => {
        if (isCurrent) {
          dispatch({ type: "RESOLVED", response: res.data });
        }
      })
      .catch((error) => dispatch({ type: "ERROR", error }));

    return () => {
      isCurrent = false;
    };
  }, []);

  return [state.loading, state.response, state.error];
}
