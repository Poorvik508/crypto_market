import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Link } from "react-router-dom"
import { Coincontext } from "../../context/Coincontext"

const Home = () => {

    const { allcoin, currency } = useContext(Coincontext);
  const [displaycoin, setdisplaycoin] = useState([]);
  const [input, setinput] = useState('');

  const inputhandler = (event) => {
    setinput(event.target.value);
    if (event.target.value == "") {
      setdisplaycoin(allcoin)
    }
  }
  const searchhandler = async(event) => {
    event.preventDefault();
   const coins =await allcoin.filter((item) => {
     return item.name.toLowerCase().includes(input.toLowerCase())
   })
    setdisplaycoin(coins)
  }
    useEffect(() => {
        setdisplaycoin(allcoin); 
    },[allcoin])
  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welocme to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchhandler}>
          <input onChange={inputhandler} list="coinlist" value={input} type="text" name="" id="" placeholder="search crypto.." required />
          <datalist id='coinlist'>
            {allcoin.map((item,index) => {
              return <option key={index} value={item.name}/>
            })}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24Hrs Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {Array.isArray(displaycoin) &&
          displaycoin.slice(0, 10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>
                {currency.Symbol}
                {item.current_price.toLocaleString()}
              </p>
              <p className={item.price_change_percentage_24h>=0?"green":"red"}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className="market-cap">
                {currency.Symbol}
                {item.market_cap.toLocaleString()}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Home
