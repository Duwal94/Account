import ReCAPTCHA from "react-google-recaptcha";

import React, { useEffect, useState } from "react";
import ExitImg from "../Assets/images/Exit icon/exit.png";
import Select from "react-select";
import useFormValues from "../States/loanelegibility.tsx";
import Modal from "react-modal";

function Loaneligibility() {
  //form handles

  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [emi, setEmi] = useState("");

  // Api states
  const [selection, setSelection] = useState("individual");
  const [businessNatureApi, setBusinessNatureApi] = useState([]);
  const [branchApi, setBranchApi] = useState([]);
  const [incomeTypesApi, setIncomeTypesApi] = useState([]);
  const [yearsOfExperienceApi, setYearsOfExperienceApi] = useState([]);
  const [loanTypesApi, setLoanTypesApi] = useState([]);
  const [responseMessage, setResponseMessage] = useState("hello");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const eligibilityType = selection; // Set the eligibilityType value here

  const [formValues, setFormValues] = useFormValues(eligibilityType);
  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };
  //set name,value to form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  //for select-form
  const handleChangeSelect = (selectedOption) => {
    if (selectedOption) {
      const { name, value } = selectedOption;

      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };
  // ////////checking
  // useEffect(() => {
  //   // Perform the desired action whenever `selection` changes
  //   console.log(formValues);
  // }, [formValues]);

  //emi cal
  useEffect(() => {
    const calculateEMI = () => {
      const emiValue = years * months * 100; // Sample calculation, replace it with your own logic
      setEmi(emiValue);
    };

    calculateEMI();
  }, [years, months]);
  // Api fetch getreqest
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          "http://api.onlineform.ants.com.np/GeneralComponents/BusinessNatures"
        );
        const data1 = await response1.json();
        setBusinessNatureApi(data1);

        const response2 = await fetch(
          "http://api.onlineform.ants.com.np/GeneralComponents/Branch"
        );
        const data2 = await response2.json();
        setBranchApi(data2);
        const response3 = await fetch(
          "http://api.onlineform.ants.com.np/LoanEligibility/IncomeTypes"
        );
        const data3 = await response3.json();
        setIncomeTypesApi(data3);
        const response4 = await fetch(
          "http://api.onlineform.ants.com.np/LoanEligibility/YearsOfExperience"
        );
        const data4 = await response4.json();
        setYearsOfExperienceApi(data4);
        const response5 = await fetch(
          "http://api.onlineform.ants.com.np/LoanEligibility/LoanTypes"
        );
        const data5 = await response5.json();
        setLoanTypesApi(data5);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://api.onlineform.ants.com.np/LoanEligibility"; // Replace with your API endpoint URL

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === true) {
          setResponseMessage("Form submitted successfully"); // Assuming the response contains a 'message' field
          setModalIsOpen(true);
        } else {
          setResponseMessage(responseData.error_msg);
          setModalIsOpen(true);
        }
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred while submitting the form.");
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  //modal style
  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 pcolor mb-5" id="loan">
          <h4 className="text-warning">Loan Eligibility</h4>
        </div>

        <div className="row justify-content-evenly p-0">
          <div className="col-md-11 col-lg-9 col-xxl-8" id="box-shadow">
            <div className="row">
              <div className="button">
                <a href="index.html">
                  {" "}
                  <button className="back-button">
                    Back <img src={ExitImg} alt="..." />
                  </button>
                </a>
              </div>
              <div className="col-12 mt-4" id="loantype">
                <p className="text-center">Loan Type</p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="row gy-3 gx-5 px-5 py-3"
              id="loan_form"
              name="validation"
            >
              <div className="col-12 text-center d-flex justify-content-center ">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eli01eligibility_type"
                    id="ind_switch"
                    value="individual"
                    checked={selection === "individual"}
                    onChange={(e) => {
                      handleSelectionChange(e);
                      handleChange(e);
                    }}
                  />
                  <label className="form-check-label" htmlFor="ind_switch">
                    Individual
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="eli01eligibility_type"
                    id="bus_switch"
                    value="business"
                    checked={selection === "business"}
                    onChange={(e) => {
                      handleSelectionChange(e);
                      handleChange(e);
                    }}
                  />
                  <label className="form-check-label" htmlFor="bus_switch">
                    Business
                  </label>
                </div>
              </div>
              <div className="col-12 mt-4">
                {/*Personal Details Title*/}
                <h5 className="refferal" id="personal-details">
                  Personal Details
                </h5>
              </div>
              <div className="col-md-6">
                {/*First Name*/}
                <label htmlFor="inputName" className="form-label yolo  ">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="eli01first_name"
                  value={formValues.eli01first_name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="col-md-5">
                {/*Middle Name*/}
                <label htmlFor="inputmiddlename" className="form-label yolo">
                  Middle Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your middle name"
                  name="eli01middle_name"
                  value={formValues.eli01middle_name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6 ">
                {/*last Name*/}
                <label htmlFor="inputlastname" className="form-label yolo  ">
                  Last Name
                </label>
                <input
                  type="lastname"
                  className="form-control"
                  name="eli01last_name"
                  value={formValues.eli01last_name}
                  onChange={handleChange}
                  placeholder="Enter your lastname"
                />
              </div>
              <div className="col-md-5 ">
                {/*Address*/}
                <label htmlFor="inputaddress" className="form-label yolo  ">
                  Address
                </label>
                <input
                  type="address"
                  className="form-control"
                  name="eli01address"
                  value={formValues.eli01address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </div>
              <div className="col-md-6 ">
                {/*Mobile Number*/}
                <label
                  htmlFor="inputmobilenumber"
                  className="form-label yolo  "
                >
                  Mobile Number
                </label>
                <input
                  type="mobilenumber"
                  className="form-control numberOnly"
                  value={formValues.eli01mobile_no}
                  onChange={handleChange}
                  name="eli01mobile_no"
                  placeholder=" +977-XXXXXXXXXX"
                />
              </div>
              <div className="col-md-5 ">
                {" "}
                {/*Email*/}
                <label htmlFor="inputemail" className="form-label yolo  ">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={formValues.eli01email}
                  onChange={handleChange}
                  name="eli01email"
                  placeholder="Enter your email"
                />
              </div>
              {selection === "business" && (
                <div className="col-md-6 business ">
                  {/*Business Name*/}
                  <label htmlFor="inputebusiness" className="form-label yolo ">
                    Business Name
                  </label>
                  <input
                    type="businessname"
                    className="form-control"
                    value={formValues.eli01company_name}
                    onChange={handleChange}
                    name="eli01company_name"
                    placeholder="Name of the business"
                  />
                </div>
              )}
              {selection === "business" && (
                <div className="col-md-5 business ">
                  {/*Business Type*/}
                  <label
                    htmlFor="inputbusinesstype"
                    className="form-label yolo "
                  >
                    Business Type
                  </label>
                  <select
                    className="form-select"
                    id="business_type"
                    name="eli01nature_of_business"
                    onChange={handleChange}
                  >
                    <option value={0} selected disabled>
                      Type of Business
                    </option>
                    {businessNatureApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {selection === "business" && (
                <div className="col-md-6 business ">
                  {/*Years Of Experience*/}
                  <label htmlFor="inputyears" className="form-label yolo  ">
                    Years of experience
                  </label>
                  <select
                    className="form-select"
                    id="yearexp"
                    name="eli01experience"
                    value={formValues.eli01experience}
                    onChange={handleChange}
                  >
                    <option value={0} disabled selected>
                      Experience Level
                    </option>
                    {yearsOfExperienceApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {selection === "individual" && (
                <div className="col-md-6 individual ">
                  {/*Monthly Income*/}
                  <label htmlFor="inputloantype" className="form-label yolo ">
                    Monthly Income
                  </label>
                  <input
                    type="income"
                    className="form-control numberOnly"
                    id="income"
                    name="eli01monthly_income"
                    value={formValues.eli01monthly_income}
                    onChange={handleChange}
                    placeholder="Monthly Income"
                  />
                </div>
              )}
              {selection === "individual" && (
                <div className="col-md-5 individual">
                  {/*Income Type*/}
                  <label
                    htmlFor="inputIncometype"
                    className="form-label yolo  "
                  >
                    Income Type
                  </label>
                  <select
                    className="form-select"
                    name="income_type"
                    id="income_type"
                  >
                    <option value={0} disabled selected>
                      Select the Income Type
                    </option>
                    {incomeTypesApi.map((item) => (
                      <option key={item.eli02uin} value={item.eli02uin}>
                        {item.eli02title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="col-12 mt-5">
                {/*Loan Information Title*/}
                <h5 className="basic information" id="personal-details">
                  Loan Information
                </h5>
              </div>

              <div className="col-md-6">
                {/*Period*/}
                <label htmlFor="years">Years:</label>
                <select
                  className="form-select"
                  id="years"
                  name="eli01loan_period_year"
                  value={formValues.eli01loan_period_year}
                  onChange={(e) => {
                    handleChange(e);
                    setYears(e.target.value);
                  }}
                >
                  <option value="">Select Years</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div className="col-md-6">
                {/*Period*/}
                <label htmlFor="months">Months:</label>
                <select
                  className="form-select"
                  id="months"
                  name="eli01loan_period_month"
                  value={formValues.eli01loan_period_month}
                  onChange={(e) => {
                    handleChange(e);
                    setMonths(e.target.value);
                  }}
                >
                  <option value="">Select Months</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              {selection === "individual" && (
                <div className="col-md-5">
                  <label
                    htmlFor="validationServer04"
                    className="form-label yolo  "
                  >
                    Loan Type
                  </label>
                  <select
                    id="loan_type"
                    className="form-select"
                    aria-describedby="validationServer04Feedback"
                    name="eli01ploan_type"
                    value={formValues.eli01ploan_type}
                    onChange={handleChange}
                  >
                    <option selected disabled>
                      Select the Loan Type
                    </option>
                    {loanTypesApi.map((item) => (
                      <option key={item.eli00uin} value={item.eli00uin}>
                        {item.eli00title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="col-md-6 ">
                {/*Requested Loan Amount*/}
                <label htmlFor="loanamount" className="form-label yolo  ">
                  Requested Loan Amount
                </label>
                <input
                  type="request"
                  className="form-control numberOnly"
                  name="eli01requested_loan_amount"
                  value={formValues.eli01requested_loan_amount}
                  onChange={handleChange}
                  id="loanamount"
                  placeholder="NPR"
                />
              </div>
              {selection === "individual" && (
                <div className="col-md-5">
                  <label htmlFor="loanamount" className="form-label yolo">
                    E.M.I
                  </label>
                  <input
                    type="text"
                    className="form-control numberOnly"
                    name="loan_amount"
                    id="loanamount"
                    placeholder="NPR"
                    value={emi}
                    readOnly
                  />
                </div>
              )}
              <div className="col-md-6 ">
                {/*Tenure Value of Property*/}
                <label htmlFor="inputproperty" className="form-label yolo  ">
                  {" "}
                  Value of Property
                </label>
                <input
                  type="property"
                  className="form-control"
                  id="property"
                  placeholder="NPR"
                  name="eli01value_of_property"
                  value={formValues.eli01value_of_property}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-5">
                {/* Preferred Branch */}
                <label htmlFor="branch" className="form-label yolo">
                  Preferred Branch
                </label>
                <Select
                  name="eli01bra01uin"
                  id="select_branch"
                  value={branchApi.find((item) => item.bra01name === "")}
                  onChange={handleChangeSelect}
                  options={branchApi.map((item) => ({
                    value: item.bra01uin,
                    label: item.bra01name,
                    name: "eli01bra01uin",
                  }))}
                  placeholder="Name of the Branch"
                />
              </div>
              <div className="col-12 mt-4">
                <div className="container">
                  <ReCAPTCHA sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ" />
                </div>
                <div className="col-12 mt-5 mb-5" id="btn">
                  <button
                    type="submit"
                    className="btn btn-outline-dark text-danger ps-4 pe-4"
                    id="btn1"
                  >
                    Check Eligibility
                  </button>
                </div>
              </div>
            </form>
            <div class="modal-dialog modal-dialog-centered">
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyle}
              >
                <h2>Response Message</h2>
                <p>{responseMessage}</p>

                <button onClick={closeModal}>Close</button>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loaneligibility;
