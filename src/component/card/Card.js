import React, { useState } from 'react';
import './Card.css';
import ExitImg from '../../Assets/images/Exit icon/exit.png';
import Image from "../../Assets/images/saving_acc.jpg";

const CardS = ({ title, bulletPoints }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);

  const handleFlip = (e) => {
    if (e.target.classList.contains('detail-button')) {
      setIsFlipped(!isFlipped);
    }
    if (e.target.classList.contains('back94')) {
      setIsFlipped(!isFlipped);
    }
  };

  const toggleRow = (rowId) => {
    if (rowId === expandedRows) {
      setExpandedRows(null);
    } else {
      setExpandedRows(rowId);
    }
  };

  const data = [
    { id: 1, feature: 'Fearture', data: 'Placeholder content for this accordion, which is intended to demonstrate the .accordion-flush class. This is the first items accordion body.' },
    { id: 2, feature: 'Fearture', data: 'Placeholder content for this accordion, which is intended to demonstrate the .accordion-flush class. This is the second items accordion body. Lets imagine this being filled with some actual content.' },
    { id: 3, feature: 'Fearture3', data: 'Placeholder content for this accordion, which is intended to demonstrate the .accordion-flush class. This is the third items accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.' },
  ];



  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-inner">
        <div className="card-front">
          <div className="ribbon-2">20% ANNUAL</div>

          <div
            class="c-name d-flex  text-center justify-content-center align-content-center p-2"
          >
            {title}
          </div>
          <img src={Image} alt="..." className="card-img" />


          <ul class="list-group">
            {bulletPoints.map((point, index) => (

              <li className=' list-group-item' key={index}>{point}</li>

            ))}</ul>



          <a
            href="/Savings"
            className="btn1"
          >
            Open Account
          </a>
          <button className="detail-button btn2  ">View Details</button>
        </div>
        <div className="card-back">
          <button className="back94">
            <img src={ExitImg} alt="Back" />Back
          </button>

          <p className='fixed'>Account Details</p>

          <div className="tables">
            <table>
              <tbody>
                {data.map((row) => (
                  <React.Fragment key={row.id}>
                    <tr onClick={() => toggleRow(row.id)}>
                      <td className="horizontal-border">{row.feature}</td>

                    </tr>
                    {expandedRows === row.id && (
                      <tr>
                        <td colSpan="4" className="box-border">{row.data}</td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CardS;