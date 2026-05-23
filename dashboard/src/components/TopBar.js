import React, { useEffect, useState } from "react";
import axios from "axios";

import Menu from "./Menu";

const TopBar = () => {
  const [indices, setIndices] = useState({
    nifty50: { value: 23560, change: 0.18},
    sensex: { value: 67183, change: 1.22 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIndices();
  }, []);

  const fetchIndices = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://velstox.onrender.com/api/indices", {
        withCredentials: true,
      });
      if (response.data) {
        setIndices(response.data);
      }
    } catch (error) {
      console.error("Error fetching indices:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{indices.nifty50.value.toFixed(2)} </p>
          <p className={`percent ${indices.nifty50.change >= 0 ? 'up' : 'down'}`}>
            {indices.nifty50.change >= 0 ? '+' : ''}{indices.nifty50.change.toFixed(2)}%
          </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{indices.sensex.value.toFixed(2)}</p>
          <p className={`percent ${indices.sensex.change >= 0 ? 'up' : 'down'}`}>
            {indices.sensex.change >= 0 ? '+' : ''}{indices.sensex.change.toFixed(2)}%
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
