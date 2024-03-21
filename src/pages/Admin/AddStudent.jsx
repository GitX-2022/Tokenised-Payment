import axios from "axios";
import React, { useState } from "react";
import Inputfield from "../../components/CustomTextInput";

const AddStudent = () => {
  const [rollno, setRollno] = useState("");
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");

  const addStudent = async (e) => {
    e.preventDefault();

    if (rollno === "" || name === "" || addr === "") {
      alert("Enter Valid Details");
    } else {
      axios.post("http://localhost:5050/api/user/add", {
        rollno: rollno,
        name: name,
        wallet_address: addr,
      })
        .then((res) => {
          console.log(res);
          alert("Student Added Successfully");
          clr(e);
        })
        .catch((err) => {
          console.log(err);
          alert("Error Occured");
        });
    }
  }

  const clr = (e) => {
    setRollno("");
    setName("");
    setAddr("");
  }

  return (
    <div className="w-full bg-white px-12 py-16">
      <h1 className="font-semibold text-4xl text-black mb-16">
        Add New Student
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
          <p className="w-1/4 font-semibold text-lg">Enter Student Name</p>
          <Inputfield
            placeholder="John Doe"
            valueState={[name, setName]}
          />
        </div>
        <div className="flex space-x-4 items-center justify-center w-full">
          <p className="w-1/4 font-semibold text-lg">Enter Wallet Address</p>
          <Inputfield
            placeholder="0x..."
            valueState={[addr, setAddr]}
          />
        </div>
      </section>
      <section className="py-16">
        <div className="flex items-center space-x-4">
          <button onClick={(e) => addStudent(e)} className="w-fit px-8 py-2 text-lg bg-red-500 text-white font-semibold rounded-lg shadow-lg">
            Add
          </button>

          <button onClick={(e) => clr(e)} className="w-fit px-8 py-2 text-lg border-red-500 text-red-500 border-2  font-semibold rounded-lg shadow-lg">
            Clear
          </button>
        </div>
      </section>
    </div>
  );
};

export default AddStudent;
