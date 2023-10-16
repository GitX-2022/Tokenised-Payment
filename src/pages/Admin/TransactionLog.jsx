import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";


const TransactionLog = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/transaction")
      .then((res) => {
        console.log(res);
        setTransactions(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full bg-white px-12 py-16 h-screen">
      <h1 className="font-semibold text-4xl text-gray-800 mb-16">
        Transaction Log
      </h1>
      <section className="w-full space-y-4 h-[calc(100vh-200px)] overflow-y-scroll pr-4">
        {
          transactions.length <= 0 ? <div>Loading...</div> : transactions.map((tx) => (
            <div className="w-full p-4 rounded-xl shadow-md">
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
                    <AiFillCalendar size={20} className="text-gray-400" />
                    <p className="text-sm font-semibold text-gray-400">
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
