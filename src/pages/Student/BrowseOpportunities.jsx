import axios from "axios";
import React, { useEffect, useState } from "react";

const BrowseOpportunities = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/event")
      .then((res) => {
        console.log(res.data);
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full bg-white px-12 py-16">
      <h1 className="font-semibold text-4xl text-black mb-16">
        Browse Opportunities
      </h1>
      <section className="w-3/4 space-y-6 ">
        {events.length <= 0 ? (
          <div>Loading...</div>
        ) : (
          events.map((event) => {
            return (
              <div className="w-full mt-4">
                <div className="flex justify-between items-center space-x-8">
                  <div>
                    <h1 className="font-semibold text-2xl text-black">
                      {event.name}
                    </h1>
                    <p className="text-gray-500">{event.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-bold text-3xl text-right">
                      {event.prize}
                      <span className="text-gray-600 text-base">{"  "}PC</span>
                    </p>
                    <p className="text-gray-500 text-right">
                      {new Date(event.date).toDateString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default BrowseOpportunities;
