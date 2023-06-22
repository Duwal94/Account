import ReCAPTCHA from "react-google-recaptcha";
import useFormValidationSchema from "../Validation/Loanvalid";
import React, { useEffect, useState } from "react";

import Select from "react-select";
import useFormValues from "../States/loanelegibility.tsx";
import Modal from "react-modal";
import { API_URL } from "../Utilities/Constants";

function Loaneligibility() {
  //form handles

  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [emi, setEmi] = useState("");
  const [formErrors, setFormErrors] = useState({});
  // Api states
  const [selection, setSelection] = useState("2");
  const [businessNatureApi, setBusinessNatureApi] = useState([]);
  const [branchApi, setBranchApi] = useState([]);
  const [incomeTypesApi, setIncomeTypesApi] = useState([]);
  const [yearsOfExperienceApi, setYearsOfExperienceApi] = useState([]);
  const [loanTypesApi, setLoanTypesApi] = useState([]);
  const [responseMessage, setResponseMessage] = useState("hello");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const eligibilityType = selection; // Set the eligibilityType value here
  const validationSchema = useFormValidationSchema(eligibilityType);
  const [formValues, setFormValues] = useFormValues(eligibilityType);
  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };
  //set name,value to form
  const handleChange = (e) => {
    const { name, value, id } = e.target;
    let newValue;
    if (id === "num") {
      newValue = parseInt(value); // Convert value to an integer
    } else {
      newValue = value;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
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
  useEffect(() => {
    // Perform the desired action whenever `selection` changes
    console.log(formValues);
    console.log(selection);
  }, [formValues]);

  //emi cal
  useEffect(() => {
    const calculateEMI = () => {
      const amountValue = parseFloat(amount);
      const rateMapping = {
        1: 11,
        2: 12,
        3: 10,
        4: 12,
        5: 13,
      };

      const rates = rateMapping[rate];

      const rateValue = parseFloat(rates) / 12 / 100;
      const yearValue = parseInt(years);
      const monthValue = parseInt(months);
      const totalMonths = yearValue * 12 + monthValue;
      const a1 = Math.pow(1 + rateValue, totalMonths);
      const a2 = Math.pow(1 + rateValue, totalMonths) - 1;
      const interest = (amountValue * rateValue * a1) / a2;
      const emiValue = interest.toFixed(2);
      setEmi(emiValue);
    };

    calculateEMI();
  }, [rate, amount, months, years]);
  // Api fetch getreqest
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          `${API_URL}/GeneralComponents/BusinessNatures`
        );
        const data1 = await response1.json();
        setBusinessNatureApi(data1);

        const response2 = await fetch(`${API_URL}/GeneralComponents/Branch`);
        const data2 = await response2.json();
        setBranchApi(data2);
        const response3 = await fetch(`${API_URL}/LoanEligibility/IncomeTypes`);
        const data3 = await response3.json();
        setIncomeTypesApi(data3);
        const response4 = await fetch(
          `${API_URL}/LoanEligibility/YearsOfExperience`
        );
        const data4 = await response4.json();
        setYearsOfExperienceApi(data4);
        const response5 = await fetch(`${API_URL}/LoanEligibility/LoanTypes`);
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
    const url = `${API_URL}/LoanEligibility`; // Replace with your API endpoint URL

    try {
      // Validate the form using Yup
      await validationSchema.validate(formValues, { abortEarly: false });

      // Clear form errors if form is valid
      setFormErrors({});

      // Send POST request to the API endpoint
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }

      const responseData = await response.json();

      if (responseData.status === true) {
        // Form submitted successfully
        setResponseMessage("Form submitted successfully");
        setModalIsOpen(true);
      } else {
        // Error in the API response
        setResponseMessage(responseData.error_msg);
        setModalIsOpen(true);
      }
    } catch (error) {
      // Validation error or API request error
      console.error("Error:", error);
      if (error.name === "ValidationError") {
        // Yup validation error
        const fieldErrors = {};
        error.inner.forEach((validationError) => {
          fieldErrors[validationError.path] = validationError.message;
        });
        setFormErrors(fieldErrors);
      } else {
        // API request error
        setResponseMessage("An error occurred while submitting the form.");
        setModalIsOpen(true);
      }
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

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      eli01emi: parseFloat(emi) || prevValues.eli01emi,
    }));
  }, [emi]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 pcolor mb-5" id="loan">
          <h4 className="text-warning">Loan Eligibility</h4>
        </div>

        <div className="row justify-content-evenly p-0">
          <div
            className="col-md-11 col-lg-9 col-xxl-8"
            id="box-shadow"
            style={{ backgroundColor: "#FAFBFF" }}
          >
            <div className="row">
              <div className="button">
                <a href="/">
                  {" "}
                  <button className="back-button">
                    Back{" "}
                    <img src="/Assets/images/Exit icon/exit.png" alt="..." />
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
                    id="num"
                    value={2}
                    checked={selection === "2"}
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
                    id="num"
                    value={1}
                    checked={selection === "1"}
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
                {formErrors.eli01first_name && (
                  <div className="error">{formErrors.eli01first_name}</div>
                )}
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
                {formErrors.eli01middle_name && (
                  <div className="error">{formErrors.eli01middle_name}</div>
                )}
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
                {formErrors.eli01last_name && (
                  <div className="error">{formErrors.eli01last_name}</div>
                )}
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
                {formErrors.eli01address && (
                  <div className="error">{formErrors.eli01address}</div>
                )}
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
                  maxLength={10}
                  onKeyPress={(event) => {
                    const keyCode = event.which || event.keyCode;
                    const keyValue = String.fromCharCode(keyCode);
                    const regex = /^[0-9]*$/;
                    if (!regex.test(keyValue)) {
                      event.preventDefault();
                    }
                  }}
                />
                {formErrors.eli01mobile_no && (
                  <div className="error">{formErrors.eli01mobile_no}</div>
                )}
              </div>
              {/* ///////////////////////////////////////////////////////////////////////// */}
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
                {formErrors.eli01email && (
                  <div className="error">{formErrors.eli01email}</div>
                )}
              </div>
              {selection === "1" && (
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
                  {formErrors.eli01company_name && (
                    <div className="error">{formErrors.eli01company_name}</div>
                  )}
                </div>
              )}
              {selection === "1" && (
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
                    id="num"
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
                  {formErrors.eli01nature_of_business && (
                    <div className="error">
                      {formErrors.eli01nature_of_business}
                    </div>
                  )}
                </div>
              )}
              {selection === "1" && (
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
                  {formErrors.eli01experience && (
                    <div className="error">{formErrors.eli01experience}</div>
                  )}
                </div>
              )}
              {selection === "2" && (
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
                  {formErrors.eli01monthly_income && (
                    <div className="error">
                      {formErrors.eli01monthly_income}
                    </div>
                  )}
                </div>
              )}
              {selection === "2" && (
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
                    name="eli01eli02uin"
                    id="income_type"
                    onChange={handleChange}
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
                  {formErrors.eli01eli02uin && (
                    <div className="error">{formErrors.eli01eli02uin}</div>
                  )}
                </div>
              )}
              <div className="col-12 mt-5">
                {/*Loan Information Title*/}
                <h5 className="basic information" id="personal-details">
                  Loan Information
                </h5>
              </div>

              <div className="col-md-3">
                <label
                  for="inputaccountsholdernumber"
                  className="form-label yolo"
                >
                  Period
                  <span className="text-danger">*</span>
                </label>
                <div className="input-group col-md-3">
                  <select
                    className="form-select"
                    aria-describedby="validationServer04Feedback"
                    name="eli01loan_period_year"
                    id="num"
                    value={formValues.eli01loan_period_year}
                    onChange={(e) => {
                      handleChange(e);
                      setYears(e.target.value);
                    }}
                  >
                    <option selected disabled>
                      Select
                    </option>
                    <option value="0">0</option>
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

                  <div className="input-group-prepend">
                    <span className="input-group-text">Year</span>
                  </div>
                  {formErrors.eli01loan_period_year && (
                    <div className="error">
                      {formErrors.eli01loan_period_year}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <label for="inputaccountsholdernumber" class="form-label yolo">
                  Period
                  <span className="text-danger">*</span>
                </label>
                <div className="input-group col-md-3">
                  <select
                    className="form-select"
                    aria-describedby="validationServer04Feedback"
                    name="eli01loan_period_month"
                    id="num"
                    value={formValues.eli01loan_period_month}
                    onChange={(e) => {
                      handleChange(e);
                      setMonths(e.target.value);
                    }}
                  >
                    <option selected disabled>
                      Select
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2"> 2</option>
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

                  <div className="input-group-prepend">
                    <span className="input-group-text">Month</span>
                  </div>
                  {formErrors.eli01loan_period_month && (
                    <div className="error">
                      {formErrors.eli01loan_period_month}
                    </div>
                  )}
                </div>
              </div>
              {selection === "2" && (
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
                    onChange={(e) => {
                      handleChange(e);
                      setRate(e.target.value);
                    }}
                  >
                    <option selected>Select the Loan Type</option>
                    {loanTypesApi.map((item) => (
                      <option key={item.eli00rateperyear} value={item.eli00uin}>
                        {item.eli00title}
                      </option>
                    ))}
                  </select>
                  {formErrors.eli01ploan_type && (
                    <div className="error">{formErrors.eli01ploan_type}</div>
                  )}
                </div>
              )}
              <div className="col-md-6 ">
                {/*Requested Loan Amount*/}
                <label htmlFor="loanamount" className="form-label yolo  ">
                  Requested Loan Amount
                </label>
                <input
                  type="number"
                  className="form-control numberOnly"
                  name="eli01requested_loan_amount"
                  value={formValues.eli01requested_loan_amount}
                  onChange={(e) => {
                    handleChange(e);
                    setAmount(e.target.value);
                  }}
                  id="num"
                  placeholder="NPR"
                />
                {formErrors.eli01requested_loan_amount && (
                  <div className="error">
                    {formErrors.eli01requested_loan_amount}
                  </div>
                )}
              </div>
              {selection === "2" && (
                <div className="col-md-5">
                  <label htmlFor="loanamount" className="form-label yolo">
                    E.M.I
                  </label>
                  <input
                    type="number"
                    className="form-control numberOnly"
                    name="eli01emi"
                    id="num"
                    placeholder="NPR"
                    value={emi}
                    onChange={handleChange}
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
                  type="number"
                  className="form-control"
                  id="num"
                  placeholder="NPR"
                  name="eli01value_of_property"
                  value={formValues.eli01value_of_property}
                  onChange={handleChange}
                />
                {formErrors.eli01value_of_property && (
                  <div className="error">
                    {formErrors.eli01value_of_property}
                  </div>
                )}
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
                {formErrors.eli01bra01uin && (
                  <div className="error">{formErrors.eli01bra01uin}</div>
                )}
              </div>
              <div className="col-12 mt-4">
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
