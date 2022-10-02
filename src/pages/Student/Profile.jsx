import axios from "axios";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

const Profile = () => {
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [roll, setRoll] = useState("");
  const [bal, setBal] = useState(0);

  useEffect(() => {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((res) => {
        axios
          .get(`http://localhost:8080/api/user/address/${res}`)
          .then((resp) => {
            console.log(resp.data);
            setName(resp.data.name);
            setAddr(resp.data.wallet_address);
            setRoll(resp.data.rollno);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, []);

  const checkBalance = async (e) => {
    e.preventDefault();
    const provider = await detectEthereumProvider();

    if (!provider) {
      console.log("No provider detected");
      return;
    } else {
      console.log(provider);
    }

    let Web3Client = new Web3(provider);

    const minABI = [
      {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
      },
    ];

    const tokenAddress = "0xE3E8b36dCEA6ABa09cAdca6Cb06724D6dC9C5E1d";
    const walletAddress = addr;

    const contract = new Web3Client.eth.Contract(minABI, tokenAddress);
    contract.methods
      .balanceOf(walletAddress)
      .call()
      .then((res) => {
        console.log(res);
        setBal(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-full bg-white px-12 py-16">
      <h1 className="font-semibold text-4xl text-black">View Profile</h1>
      <br></br><br></br>
      <h2><b>Account Name: </b>{name}</h2>
      <br></br>
      <h2><b>Account Address: </b>{addr}</h2>
      <br></br>
      <h2><b>Roll No: </b>{roll}</h2>
      <section className="py-16">
        <div className="flex items-center space-x-4">
          <button onClick={(e) => checkBalance(e)} className="w-fit px-8 py-2 text-lg bg-red-500 text-white font-semibold rounded-lg shadow-lg">
            Check Balance
          </button>
        </div>
      </section>
      <h2><b>Balance: </b>{bal} PSG Coins</h2>
    </div>
  );
};

export default Profile;
