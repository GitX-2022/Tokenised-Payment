import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Inputfield from "../components/CustomTextInput";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (
      username.toLowerCase() === "admin@psgtech.ac.in" &&
      password.toLowerCase() === "admin"
    ) {
      navigate("/admin");
    } else if (
      username.toLowerCase().includes("@psgtech.ac.in") &&
      password.length > 0
    ) {
      navigate("/student");
    } else {
      alert("Provide valid credentials");
    }
  };

  return (
    <main className="w-screen h-screen bg-gradient-to-br from-red-500 to-red-700 flex justify-center items-center">
      <section className="rounded-lg w-fit h-fit bg-white px-8 py-16 shadow-2xl">
        <h1 className="text-3xl text-center mb-4">Login</h1>
        {/* <h3><b>Todo</b></h3>
        <h3>1. Reverse Transaction Log</h3>
        <h3>2. Update connect wallet button</h3>
        <h3>3. Connect add event page with database</h3>
        <h3>4. Login auth with database</h3> */}
        <Inputfield placeholder="Email" valueState={[username, setUsername]} />
        <Inputfield
          placeholder="Password"
          type="password"
          valueState={[password, setPassword]}
        />
        <button
          onClick={(e) => handleClick(e)}
          className="w-full mt-4 px-8 py-2 text-lg bg-red-500 text-white font-semibold rounded-lg shadow-lg"
        >
          Login
        </button>
      </section>
    </main>
  );
};

export default Login;
