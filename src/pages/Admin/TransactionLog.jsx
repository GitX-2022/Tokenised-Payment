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
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full bg-white px-12 py-16 ">
      <h1 className="font-semibold text-4xl text-black mb-16">
        Transaction Log
      </h1>
      <section className="w-[calc(300vw/4+16px)] space-y-8 h-[calc(100vh-200px)] overflow-y-scroll pr-16">
        {
          transactions.length <= 0 ? <div>Loading...</div> : transactions.reverse().map((tx) => (
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <p className="text-3xl font-semibold">
                  From:{" "}
                  {tx.fromRn.toLowerCase() === "admin" ? "Admin" : tx.fromRn}
                </p>
                <p className="text-gray-400 text-xs">Address: {tx.from}</p>
              </div>
              <div className="space-y-2 flex flex-col items-end">
                <p className="text-3xl font-bold">
                  {parseInt(tx.data, 16)}
                  <span className="text-gray-600 text-base">{"  "}PC</span>
                </p>
                <div className="flex items-center space-x-2">
                  <AiFillCalendar size={20} className="text-gray-400" />
                  <p className="text-xs text-gray-400">
                    {new Date(parseInt(tx.timeStamp) * 1000).toDateString()}
                    {", "}
                    {new Date(parseInt(tx.timeStamp) * 1000).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default TransactionLog;
