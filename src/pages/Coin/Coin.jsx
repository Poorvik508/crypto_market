import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from "react-router-dom"
import { Coincontext } from "../../context/Coincontext";
const Coin = () => {
  const { coinId } = useParams();
  const [coindata, setcoindata] = useState();
  const{currency}=useContext(Coincontext)
  const fetchCoinData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    await fetch(`http://localhost:5000/api/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setcoindata(res))
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    fetchCoinData();
  },[currency])
  return (
    <div>
      
    </div>
  )
}

export default Coin
