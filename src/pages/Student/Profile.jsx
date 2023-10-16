import axios from "axios";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { CgProfile } from "react-icons/cg";
import { SiHiveBlockchain } from "react-icons/si";
import { PiIdentificationCardDuotone } from "react-icons/pi";
import { FaEthereum } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

const Profile = () => {
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [roll, setRoll] = useState("");
  const [conn, setConn] = useState(false);
  const [bal, setBal] = useState(0);
  const [toAddress, setToAddress] = useState("");

  const canteen = [
    {
      name: "Tea",
      price: 5,
      img: "https://png.pngtree.com/png-vector/20221230/ourlarge/pngtree-fresh-milk-tea-or-indian-kadak-chai-free-png-image_6543027.png"
    },
    {
      name: "Juice",
      price: 10,
      img: "https://png.pngtree.com/png-clipart/20231002/original/pngtree-juice-drink-sticker-retro-png-image_13228681.png"
    },
    {
      name: "Chocolate",
      price: 8,
      img: "/chocolate.png"
    }
  ]
  const [canteenCount, setCanteenCount] = useState(canteen.map(() => 0));

  const depot = [
    {
      name: "Notebook",
      price: 7,
      img: "/notebook.png"
    },
    {
      name: "Pen",
      price: 2,
      img: "/pen.png"
    }
  ]
  const [depotCount, setDepotCount] = useState(depot.map(() => 0));

  const orderTotal = canteenCount.reduce((a, b, index) => a + (b * canteen[index].price), 0) + depotCount.reduce((a, b, index) => a + (b * depot[index].price), 0);

  useEffect(() => {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((res) => {
        console.log(res);
        axios
          .get(`http://localhost:5050/api/user/address/${res[0]}`)
          .then((resp) => {
            console.log(resp.data);
            setName(resp.data.name);
            setAddr(resp.data.wallet_address);
            setRoll(resp.data.rollno);
            setConn(true);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    if (conn) {
      checkBalance();
    }
  });

  const checkBalance = async (e) => {
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

    // const tokenAddress = "0xE3E8b36dCEA6ABa09cAdca6Cb06724D6dC9C5E1d";
    const tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS;
    const walletAddress = addr;

    const contract = new Web3Client.eth.Contract(minABI, tokenAddress);
    contract.methods
      .balanceOf(walletAddress)
      .call()
      .then((res) => {
        console.log(res);
        setBal(res);
      })
      .catch((err) => console.log("Err", err));
  }

  const sendTransaction = async (e) => {
    if (orderTotal > bal) {
      alert("Insufficient Balance");
      return;
    }

    let tokenAddress = process.env.REACT_APP_TOKEN_ADDRESS;
    axios.get(`http://localhost:5050/api/user/rollno/admin`)
      .then((resp) => {
        setToAddress(resp.data.wallet_address);
      })
      .catch((err) => {
        console.log(err);
      });

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
            from: addr,
            to: tokenAddress,
            data: getDataFieldValue(toAddress, orderTotal),
          },
        ],
      })
      .then((result) => {
        console.log(result);
        alert(`Transaction initiated to buy items with ${orderTotal} coins`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Transaction Denied");
      });
  }

  return (
    <div className="w-full bg-white px-12 py-16">
      <div className="flex flex-row gap-8">
        <div>
          <h1 className="font-semibold text-4xl text-black">Hello,</h1>
          <div className="flex flex-row gap-4 mt-8">
            <div className="flex flex-col gap-4 w-fit">
              <div className="flex flex-row gap-4 w-full">
                <div className="bg-red-50 p-4 w-2/3 rounded-xl shadow-md flex flex-row gap-4 items-center">
                  <CgProfile className="text-red-600 text-3xl" />
                  <p className="text-red-600 text-2xl font-semibold">{name}</p>
                </div>
                <div className="bg-red-50 p-4 w-1/3 rounded-xl shadow-md flex flex-row gap-4 items-center">
                  <PiIdentificationCardDuotone className="text-red-600 text-3xl" />
                  <p className="text-red-600 text-2xl font-semibold">{roll}</p>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-xl shadow-md flex flex-row gap-4 items-center">
                <SiHiveBlockchain className="text-red-600 text-xl" />
                <p className="text-red-600 text-lg font-semibold">{addr}</p>
              </div>
            </div>

            <div className="bg-red-50 p-4 w-56 rounded-xl shadow-md flex flex-col items-end">
              <div className="flex flex-row w-full justify-between">
                <FaEthereum className="text-red-600 text-5xl" />
                <p className="text-red-600 text-7xl font-semibold">{bal}</p>
              </div>
              <p className="text-red-600 text-xl font-semibold">PSG Coins</p>
              {/* <div className="flex flex-row w-full justify-between items-end">
            <FiRefreshCw className="text-red-600 text-lg ml-3" />
          </div> */}
            </div>
          </div>

          <section className="flex flex-col gap-4 py-16">
            <p className="text-3xl font-semibold">Order Food from Canteen</p>
            <div className="flex flex-row gap-6">
              {canteen.map((item, index) => (
                <div className="bg-red-50 p-4 w-fit rounded-xl flex flex-col items-center">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-48 h-48"
                  />
                  <div className="flex flex-row mt-8 justify-between gap-8 w-full">
                    <div className="flex flex-col">
                      <p className="text-red-600 text-xl font-semibold">{item.name}</p>
                      <p className="text-red-500">{item.price} PC</p>
                    </div>

                    <div className="flex flex-row items-center">
                      {canteenCount[index] > 0 ? (
                        <div className="text-xl bg-red-500 text-white px-4 py-2 rounded-lg shadow-md font-semibold flex flex-row gap-4">
                          <button className="" onClick={() => {
                            setCanteenCount([...canteenCount.slice(0, index), canteenCount[index] - 1, ...canteenCount.slice(index + 1)]);
                          }}>
                            -
                          </button>
                          {canteenCount[index]}
                          <button className="" onClick={() => {
                            setCanteenCount([...canteenCount.slice(0, index), canteenCount[index] + 1, ...canteenCount.slice(index + 1)]);
                          }}>
                            +
                          </button>
                        </div>
                      ) : (
                        <button className="text-lg bg-red-500 text-white px-6 py-2 rounded-lg shadow-md font-semibold"
                          onClick={() => {
                            setCanteenCount([...canteenCount.slice(0, index), canteenCount[index] + 1, ...canteenCount.slice(index + 1)]);
                          }}
                        >
                          Buy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-3xl font-semibold pt-8">Buy from Book Depot</p>
            <div className="flex flex-row gap-6">
              {depot.map((item, index) => (
                <div className="bg-red-50 p-4 w-fit rounded-xl flex flex-col items-center">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-48 h-56"
                  />
                  <div className="flex flex-row mt-8 justify-between gap-8 w-full">
                    <div className="flex flex-col">
                      <p className="text-red-600 text-xl font-semibold">{item.name}</p>
                      <p className="text-red-500">{item.price} PC</p>
                    </div>

                    <div className="flex flex-row items-center">
                      {depotCount[index] > 0 ? (
                        <div className="text-xl bg-red-500 text-white px-4 py-2 rounded-lg shadow-md font-semibold flex flex-row gap-4">
                          <button className="" onClick={() => {
                            setDepotCount([...depotCount.slice(0, index), depotCount[index] - 1, ...depotCount.slice(index + 1)]);
                          }}>
                            -
                          </button>
                          {depotCount[index]}
                          <button className="" onClick={() => {
                            setDepotCount([...depotCount.slice(0, index), depotCount[index] + 1, ...depotCount.slice(index + 1)]);
                          }}>
                            +
                          </button>
                        </div>
                      ) : (
                        <button className="text-lg bg-red-500 text-white px-6 py-2 rounded-lg shadow-md font-semibold"
                          onClick={() => {
                            setDepotCount([...depotCount.slice(0, index), depotCount[index] + 1, ...depotCount.slice(index + 1)]);
                          }}
                        >
                          Buy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {(depotCount.reduce((a, b) => a + b, 0) + canteenCount.reduce((a, b) => a + b, 0)) > 0 && (
          <div className="w-full items-center flex flex-col">
            <p className="text-2xl">Order Summary</p>
            <div className="flex flex-col w-full items-center gap-2 mt-8 pl-8">
              {
                canteenCount.map((item, index) => {
                  return (
                    item > 0 && (
                      <div className="flex flex-row w-full gap-4">
                        <p className="w-1/4 text-lg font-semibold">{canteen[index].name}</p>
                        <p className="w-1/4">{canteen[index].price} PC</p>
                        <p className="w-1/4 text-lg font-semibold">{canteenCount[index]}</p>
                        <p className="">{canteenCount[index] * canteen[index].price} PC</p>
                      </div>
                    )
                  )
                })
              }
            </div>
            <div className="flex flex-col w-full items-center gap-2 mt-2 pl-8">
              {
                depotCount.map((item, index) => {
                  return (
                    item > 0 && (
                      <div className="flex flex-row w-full gap-4">
                        <p className="w-1/4 text-lg font-semibold">{depot[index].name}</p>
                        <p className="w-1/4">{depot[index].price} PC</p>
                        <p className="w-1/4 text-lg font-semibold">{depotCount[index]}</p>
                        <p className="">{depotCount[index] * depot[index].price} PC</p>
                      </div>
                    )
                  )
                })
              }
            </div>
            <div className="flex flex-row w-full justify-between mt-4 py-2 px-8 border-t-2 border-gray-200">
              <p className="text-lg font-semibold">Order Total</p>
              <p className="text-lg font-semibold">{orderTotal} PC</p>
            </div>
            <div className="w-full flex justify-end mt-4">
              <button className="text-lg bg-red-500 text-white px-6 py-2 rounded-lg shadow-md font-semibold mt-4" onClick={() => {
                sendTransaction();
              }}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
