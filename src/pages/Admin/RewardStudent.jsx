import axios from "axios";
import React, { useState } from "react";
import Inputfield from "../../components/CustomTextInput";
import Web3 from "web3";

const RewardStudent = () => {
  const [rollno, setRollno] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [addr, setAddr] = useState("");

  const sendTransaction = async (e) => {
    e.preventDefault();

    if (rollno === "") {
      alert("Enter Valid Details");
    } else {
      let tokenAddress = "0xE3E8b36dCEA6ABa09cAdca6Cb06724D6dC9C5E1d";
      axios.get(`http://localhost:5050/api/user/rollno/${rollno}`)
        .then((resp) => {
          setAddr(resp.data.wallet_address);
          setName(resp.data.name);
        })
        .catch((err) => {
          console.log(err);
        });
      let toAddress = addr;

      function getDataFieldValue(tokenRecipientAddress, tokenAmount) {
        const web3 = new Web3();
        const TRANSFER_FUNCTION_ABI = {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transfer",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        };
        return web3.eth.abi.encodeFunctionCall(TRANSFER_FUNCTION_ABI, [
          tokenRecipientAddress,
          tokenAmount,
        ]);
      }

      await window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: "0xddCDCE51A529c4F6e2Db62e29bA30eED434941F9",
              to: tokenAddress,
              data: getDataFieldValue(toAddress, amount),
            },
          ],
        })
        .then((result) => {
          console.log(result);
          alert(`${name} awarded with ${amount} coins`);
        })
        .catch((error) => {
          console.log(error);
          alert("Transaction Denied");
        });
    }
  }

  const clr = (e) => {
    setRollno("");
    setAmount(0);
  }

  return (
    <div className="w-full bg-white px-12 py-16">
      <h1 className="font-semibold text-4xl text-black mb-16">
        Reward Student
      </h1>
      <section className="w-3/4 space-y-6">
        <div className="flex space-x-4 items-center justify-center w-full">
          <p className="w-1/4 font-semibold text-lg">Enter Student Rollno.</p>
          <Inputfield
            placeholder="Eg. 20z2xx"
            valueState={[rollno, setRollno]}
          />
        </div>
        <div className="flex space-x-4 items-center justify-center w-full">
          <p className="w-1/4 font-semibold text-lg">Enter PC Amount</p>
          <Inputfield
            type="number"
            placeholder="Eg. 100"
            valueState={[amount, setAmount]}
          />
        </div>
      </section>
      <section className="py-16">
        <div className="flex items-center space-x-4">
          <button onClick={(e) => sendTransaction(e)} className="w-fit px-8 py-2 text-lg bg-red-500 text-white font-semibold rounded-lg shadow-lg">
            Reward
          </button>

          <button onClick={(e) => clr(e)} className="w-fit px-8 py-2 text-lg border-red-500 text-red-500 border-2  font-semibold rounded-lg shadow-lg">
            Clear
          </button>
        </div>
      </section>
    </div>
  );
};

export default RewardStudent;
