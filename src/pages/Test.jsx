import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { Link } from "react-router-dom";

const Test = () => {
  const [accounts, setAccounts] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
  }, []);

  const handleAccountsChanged = (a) => {
    console.log("accounts changed");
    setAccounts(a);
  };

  const connectWallet = async (e) => {
    e.preventDefault();
    let accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        console.log(err.code);
      });
    setAccounts(accounts);
    console.log(accounts);
  };

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
    const walletAddress = accounts[0];

    const contract = new Web3Client.eth.Contract(minABI, tokenAddress);
    contract.methods
      .balanceOf(walletAddress)
      .call()
      .then((res) => {
        console.log(res);
        setBalance(res);
      })
      .catch((err) => console.log(err));
  };

  const sendTransaction = async (e) => {
    e.preventDefault();
    const provider = await detectEthereumProvider();

    if (!provider) {
      console.log("No provider detected");
      return;
    } else {
      console.log(provider);
    }

    let Web3Client = new Web3(provider);

    let tokenAddress = "0xE3E8b36dCEA6ABa09cAdca6Cb06724D6dC9C5E1d";
    let toAddress = "0x2C154049dF236a281fc1BF400564c60F2FcA2042";
    let fromAddress = accounts[0];

    let decimals = Web3.utils.toBN(0);
    let amount = Web3.utils.toBN(20);

    let minABI = [
      {
        constant: false,
        inputs: [
          {
            name: "_to",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        type: "function",
      },
    ];

    let contract = new Web3Client.eth.Contract(minABI, tokenAddress, {
      from: fromAddress,
    });

    let value = 25;

    let a = contract.methods
      .transfer(toAddress, value)
      .call()
      .then((res) => {
        console.log(res);
        // setBalance(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>Intra-college Tokenised Payment System</h1>
      <button onClick={(e) => connectWallet(e)}>Connect wallet</button>
      <button onClick={(e) => checkBalance(e)}>Check Balance</button>
      <button onClick={(e) => sendTransaction(e)}>Send Transaction</button>
    </div>
  );
};

export default Test;
