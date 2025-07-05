import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { Coincontext } from "../../context/Coincontext"
import { Link } from "react-router-dom"
const Navbar = () => {
    const { setcurrency } = useContext(Coincontext)
    const currencyhandler = (event) => {
        switch (event.target.value) {
          case "usd": {
            setcurrency({ name: "usd", Symbol: "$" });
            break;
          }
          case "eur": {
            setcurrency({ name: "eur", Symbol: "€" });
            break;
          }
          case "inr": {
            setcurrency({ name: "inr", Symbol: "₹" });
            break;
          }
          default: {
            setcurrency({ name: "usd", Symbol: "$" });
            break;
          }
        }
        
    }
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img className="logo" src={logo} alt="" />
      </Link>
      <ul>
        <Link to={"/"}>
          {" "}
          <li>Home</li>
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyhandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
      </div>
      <button>
        Sing up <img src={arrow_icon} alt="" />
      </button>
    </div>
  );
}

export default Navbar
