import React, { useState } from "react";
import Inputfield from "../../components/CustomTextInput";

const AddEvent = () => {
  const [ename, setEname] = useState("");
  const [edesc, setEdesc] = useState("");
  const [tokens, setTokens] = useState(0);
  const [date, setDate] = useState(0);

  const clr = (e) => {
    setEname("");
    setEdesc("");
    setTokens(0);
    setDate(0);
  }

  const publish = (e) => {
    if (ename !== "" && edesc !== "" && tokens !== 0 && date !== 0) {
      alert("Event Details Published");
    } else {
      alert("Enter Valid Details");
    }
  }

  return (
    <div className="w-full bg-white px-12 py-16">
      <h1 className="font-semibold text-4xl text-black">
        Add Event
      </h1>
      <section className="w-3/4 space-y-6">
        <div className="flex space-x-4 items-center justify-center w-full">
          <p className="w-1/4 font-semibold text-lg">Event Name</p>
          <Inputfield
            placeholder="Enter Event Name"
            valueState={[ename, setEname]}
          />
        </div>
        <div className="flex space-x-4 items-center justify-center w-full">
          <p className="w-1/4 font-semibold text-lg">Description</p>
          <Inputfield
            placeholder="Enter Event Description"
            valueState={[edesc, setEdesc]}
          />
        </div>
        <div className="flex space-x-4 items-center justify-center w-full">
          <p className="w-1/4 font-semibold text-lg">PSG Tokens</p>
          <Inputfield
            type="number"
            placeholder="Enter allocated PSG Token for the winner"
            valueState={[tokens, setTokens]}
          />
        </div>
        <div className="flex space-x-4 items-center justify-center w-full">
          <p className="w-1/4 font-semibold text-lg">Date</p>
          <Inputfield
            type="date"
            placeholder="Event Date"
            valueState={[date, setDate]}
          />
        </div>
      </section>
      <section className="py-16">
        <div className="flex items-center space-x-4">
          <button onClick={(e) => publish(e)} className="w-fit px-8 py-2 text-lg bg-red-500 text-white font-semibold rounded-lg shadow-lg">
            Publish
          </button>

          <button onClick={(e) => clr(e)} className="w-fit px-8 py-2 text-lg border-red-500 text-red-500 border-2  font-semibold rounded-lg shadow-lg">
            Clear
          </button>
        </div>
      </section>
    </div>
  )
}

export default AddEvent