import React, { useEffect, useRef } from 'react';
const AutoScroll = ({ text }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const scrollText = () => {
      container.scrollLeft += 1; // Adjust the scroll speed by changing the value here
    };

    const intervalId = setInterval(scrollText, 30); // Adjust the scroll interval (in milliseconds) here

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="auto-scroll-container" ref={containerRef}>
      <span className="auto-scroll-text">{text}</span>
      <div className="slide">
              <a href className="nav-link">15 DAYS NOTICE FOR SEALED BIDS</a>
            </div>
            <div className="slide">
              <a href className="nav-link">Data Center Colocation</a>
            </div>
            <div className="slide">
              <a href className="nav-link">CSR Notice</a>
            </div>
            <div className="slide">
              <a href className="nav-link">
                            Request For Proposal for Online Account System
                        </a>
            </div>
            <div className="slide">
              <a href className="nav-link">
               
              </a>
            </div>
    </div>
  );
};

export default AutoScroll;