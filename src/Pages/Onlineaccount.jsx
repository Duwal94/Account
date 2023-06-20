import CardS from "../component/card/Card";
import React, { useEffect, useState } from "react";
import { API_URL } from "../Utilities/Constants";

function Onlineaccount() {
  const [schema, setSchema] = useState([]);
  const [activeButton, setActiveButton] = useState(1);
  const [selection, setSelection] = useState("Saving");
  const [schema2, setSchema2] = useState([]);

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleChangeSelection = (newValue) => {
    setSelection(newValue);
  };

  useEffect(() => {
    fetchSchema();
    fetchSchema2();
  }, []);

  const fetchSchema = async () => {
    try {
      const response = await fetch(`${API_URL}/AccountInfo/SavingAccountTypes`);
      const data = await response.json();
      setSchema(data);
    } catch (error) {
      console.error("Error fetching schema:", error);
    }
  };
  const fetchSchema2 = async () => {
    try {
      const response = await fetch(`${API_URL}/AccountInfo/FDAccountTypes`);
      const data = await response.json();
      setSchema2(data);
    } catch (error) {
      console.error("Error fetching schema2:", error);
    }
  };
  return (
    <div className=" card-container col-lg-12">
      <div className="row">
        <div className="text-center p-3">
          <button
            className="btn7"
            style={{
              backgroundColor: activeButton === 1 ? " #AD2E16" : "white",
              color: activeButton === 1 ? " white" : "black",
            }}
            onClick={() => {
              handleButtonClick(1);
              handleChangeSelection("Saving");
            }}
          >
            Saving Account
          </button>
          <button
            className="btn7"
            style={{
              backgroundColor: activeButton === 2 ? " #AD2E16" : "white",
              color: activeButton === 2 ? " white" : "black",
            }}
            onClick={() => {
              handleButtonClick(2);
              handleChangeSelection("Fixed");
            }}
          >
            Fixed Deposit
          </button>
        </div>
        {selection === "Saving" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="row">
              {schema.map((field) => (
                <CardS
                  title={field.acc01title}
                  bulletPoints={[
                    `Minimum Balance: ${field.acc01RatePerAnnum}`,
                    "Free Mobile Banking for First Year.",
                    `${field.acc01RatePerAnnum} discount on Safe Deposit Lockers`,
                    "Connect IPS Facility",
                  ]}
                  annual={field.acc01RatePerAnnum}
                />
              ))}
            </div>
          </div>
        )}
        {selection === "Fixed" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="row">
              {schema2.map((fields) => (
                <CardS
                  title={fields.acc01title}
                  bulletPoints={[
                    `Minimum Balance: ${fields.acc01RatePerAnnum}`,
                    "Free Mobile Banking for First Year.",
                    `${fields.acc01RatePerAnnum} discount on Safe Deposit Lockers`,
                    "Connect IPS Facility",
                  ]}
                  annual={fields.acc01RatePerAnnum}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Onlineaccount;
