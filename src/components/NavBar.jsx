import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoLight from "../assets/logo-light1.png";

const NavBar = ({ options }) => {
  const [accounts, setAccounts] = useState(null);
  const [conn, setConn] = useState("Connect Wallet");

  const connectWallet = async () => {
    let accounts = await window?.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        console.log(err.code);
        if (err.code === -32002) {
          alert("Check metamask extension!");
        }
      });
    setAccounts(accounts);
    console.log(accounts);

    if (accounts) {
      axios.get(`http://localhost:5050/api/user/address/${accounts[0]}`)
        .then((res) => {
          console.log(res);
          setConn(res.data.name + " Wallet Connected");
        })
    }

  }

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="w-1/5 bg-gradient-to-br from-red-500 to-red-800 h-screen flex flex-col">
      <div className="flex items-center justify-start px-6 py-16 ">
        <img src={LogoLight} alt="logo" className="w-12 h-auto mr-4" />
        <h1 className="text-white text-3xl font-semibold">ICTPS</h1>
      </div>
      <div className="flex-col flex w-full">
        {options.map((option) => (
          <Link to={option.path} className="w-full">
            <button className="w-full px-8 py-4 text-lg text-white font-semibold text-left hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-red-600">
              {option.name}
            </button>
          </Link>
        ))}
      </div>
      <div className="flex-1"></div>

      <div className="py-16">
        <button onClick={(e) => connectWallet(e)} className="w-full px-8 py-4 text-lg text-white font-semibold text-left hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-red-600">
          {conn}
        </button>
        <Link to={"/login"} className="w-full">
          <button className="w-full px-8 py-4 text-lg text-white font-semibold text-left hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 hover:text-red-600">
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
