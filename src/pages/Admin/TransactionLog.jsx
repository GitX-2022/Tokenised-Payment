import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";


const TransactionLog = () => {
  const [transactions, setTransactions] = useState([]);
  const [userAddr, setUserAddr] = useState("");

  useEffect(() => {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((res) => {
        console.log(res);
        setUserAddr(res[0]);
      });
  }, []);

  useEffect(() => {
    if (userAddr !== "") {
      axios
        .get("http://localhost:5050/api/transaction")
        .then((res) => {
          console.log(res);
          if (userAddr.toLowerCase() === process.env.REACT_APP_ADMIN_ADDRESS.toLowerCase()) {
            setTransactions(res.data.reverse());
          } else {
            setTransactions(
              res.data.filter((tx) => tx.from === userAddr || tx.to === userAddr).reverse()
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userAddr]);

  return (
    <div className="w-full bg-white px-12 py-16 h-screen overflow-y-scroll">
      <h1 className="font-semibold text-4xl text-gray-800 mb-8 pl-4">
        Transaction Log
      </h1>
      <section className="w-full space-y-4 p-4 pb-12">
        {
          transactions.length <= 0 ?
            <div className="flex flex-col gap-8">
              {[...Array(10)].map((_, i) => (
                <div className={`w-full p-4 rounded-xl shadow-md animate-pulse bg-gray-200 h-36`}>
                </div>
              ))}
            </div>
            : transactions.map((tx) => (
              <div className={`w-full p-4 rounded-xl shadow-md ${tx.from === userAddr && "bg-gradient-to-l from-red-200 via-white "} ${tx.to === userAddr && "bg-gradient-to-l from-green-200 via-white"}`}>
                <p className="text-gray-400 text-xs pb-4">Txn Hash: <span className="font-semibold text-gray-800">{tx.hash}</span></p>
                <div className="flex justify-between items-center gap-8">
                  <div className="space-y-2 w-1/3">
                    <p className="text-2xl text-gray-400 ">
                      From:{" "}
                      <span className="font-semibold text-gray-800">
                        {tx.fromName}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs">Address: <span className="font-semibold text-gray-800">{tx.from}</span></p>
                  </div>
                  <div className="space-y-2 w-1/3">
                    <p className="text-2xl text-gray-400 ">
                      To:{" "}
                      <span className="font-semibold text-gray-800">
                        {tx.toName}
                      </span>
                    </p>
                    <p className="text-gray-400 text-xs">Address: <span className="font-semibold text-gray-800">{tx.to}</span></p>
                  </div>
                  <div className="space-y-2 flex flex-col items-end">
                    <p className="text-3xl font-bold">
                      {tx.value}
                      <span className="text-gray-600 text-base">{"  "}PC</span>
                    </p>
                    <div className="flex items-center space-x-2">
                      <AiFillCalendar size={20} className="text-gray-800" />
                      <p className="text-sm font-semibold text-gray-800">
                        {new Date(parseInt(tx.timeStamp) * 1000).toDateString()}
                        {", "}
                        {new Date(parseInt(tx.timeStamp) * 1000).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </section>
    </div>
  );
};

export default TransactionLog;
