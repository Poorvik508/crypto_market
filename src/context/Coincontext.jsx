import { createContext, useEffect, useState } from "react";

export const Coincontext = createContext()

const CoincontextProvider = (props) => {
    const [allcoin, setallcoin] = useState([])
    const [currency, setcurrency] = useState({
        name: "usd",
        Symbol:"$"
    })
    const fetchallcoin = async () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(
          `http://localhost:5000/api/coins?vs_currency=${currency.name}`,
          options
        )
          .then((res) => res.json())
          .then((res) => setallcoin(res))
          .catch((err) => console.error(err));
    }
    useEffect(() => {
        fetchallcoin();
},[currency])
    const contextValue = {
      allcoin,currency,setcurrency
    }

    return (
        <Coincontext.Provider value={contextValue}>
            {props.children}
        </Coincontext.Provider>
    )
}
export default CoincontextProvider