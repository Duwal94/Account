import React, { useState, useEffect } from "react";
import useFormValidationSchema from "../Validation/Savings";
import Select from "react-select";
import { API_URL } from "../Utilities/Constants";
import Modal from "react-modal";
import useFormValues from "../States/Savings.tsx";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import NepaliDate from "nepali-date-converter";

function Savingacctform() {
  const [branchApi, setBranchApi] = useState([]);
  const [acctTypeApi, setBAcctTypeApi] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [formValues, setFormValues] = useFormValues();
  const [responseMessage, setResponseMessage] = useState("hello");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const validationSchema = useFormValidationSchema();
  const [bsDate, setBsDate] = useState("");
  const [adDate, setAdDate] = useState("");

  ///date
  const handleBsDate = (bsDate, index) => {
    if (bsDate) {
      const [year, month, day] = bsDate.split("-").map(Number);
      if (
        year >= 2000 &&
        year <= 2090 &&
        month >= 1 &&
        month <= 12 &&
        day >= 1 &&
        day <= 30
      ) {
        const nepaliDate = new NepaliDate(year, month - 1, day + 1);
        const convertedDate = nepaliDate.toJsDate().toISOString().slice(0, 10);
        if (index === 1) {
          setBsDate(bsDate);
          setAdDate(convertedDate);
        } else if (index === 2) {
          // setKyc04IssuedDateNep(bsDate);
          // setKyc04IssuedDateEng(convertedDate);
        } else if (index === 3) {
          // setKyc04PassportIssuedDateNep(adDate);
          // setKyc04PassportIssuedDateEng(convertedDate);
        } else if (index === 4) {
          // setKyc04ExpiryDateNep(adDate);
          // setKyc04ExpiryDateEng(convertedDate);
        } else if (index === 5) {
          // setKyc04VisaIssueDateNep(adDate);
          // setKyc04VisaIssueDateEng(convertedDate);
        } else if (index === 6) {
          // setKyc04VisaExpiryDateNep(adDate);
          // setKyc04VisaExpiryDateEng(convertedDate);
        } else if (index === 7) {
          // setKyc04VoterIdIssuedDateNep(adDate);
          // setKyc04VoterIdIssuedDateEng(convertedDate);
        }
      }
    }
  };

  const handleAdDate = (event, index) => {
    const adDate = event.target.value;
    const jsDate = new Date(adDate);
    const nepaliDate = new NepaliDate(jsDate);
    const bsYear = nepaliDate.getYear();
    const bsMonth = nepaliDate.getMonth() + 1;
    const bsDay = nepaliDate.getDate();
    const formattedMonth = bsMonth.toString().padStart(2, "0");
    const formattedDay = bsDay.toString().padStart(2, "0");
    const convertedDate = `${bsYear}-${formattedMonth}-${formattedDay}`;
    console.log(convertedDate);
    if (index === 1) {
      setAdDate(adDate);
      setBsDate(convertedDate);
    } else if (index === 2) {
      // setKyc04IssuedDateEng(adDate);
      // setKyc04IssuedDateNep(convertedDate);
    } else if (index === 3) {
      // setKyc04PassportIssuedDateEng(adDate);
      // setKyc04PassportIssuedDateNep(convertedDate);
    } else if (index === 4) {
      // setKyc04ExpiryDateEng(adDate);
      // setKyc04ExpiryDateNep(convertedDate);
    } else if (index === 5) {
      // setKyc04VisaIssueDateEng(adDate);
      // setKyc04VisaIssueDateNep(convertedDate);
    } else if (index === 6) {
      // setKyc04VisaExpiryDateEng(adDate);
      // setKyc04VisaExpiryDateNep(convertedDate);
    } else if (index === 7) {
      // setKyc04VoterIdIssuedDateEng(adDate);
      // setKyc04VoterIdIssuedDateNep(convertedDate);
    }
  };

  // ////////checking
  useEffect(() => {
    // Perform the desired action whenever `selection` changes
    console.log(formValues);
  }, [formValues]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await fetch(`${API_URL}/GeneralComponents/Branch`);
        const data2 = await response2.json();
        setBranchApi(data2);
        const response3 = await fetch(
          `${API_URL}/AccountInfo/SavingAccountTypes`
        );
        const data3 = await response3.json();
        setBAcctTypeApi(data3);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  //selection image facebook google etc
  const handleImageClick = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(
        selectedImages.filter((selectedImage) => selectedImage !== image)
      );
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  //set name,value to form
  const handleChange = (e) => {
    const { name, value, type, files, checked, id } = e.target;
    let newValue;

    if (type === "file") {
      newValue = files[0];
    } else if (type === "checkbox") {
      newValue = checked;
    } else if (id === "num") {
      newValue = parseInt(value); // Convert value to an integer
    } else if (id === "bool") {
      newValue = JSON.parse(value); // Convert value to an integer
    } else {
      newValue = value; // Treat value as a string for other types
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  // for select-form
  const handleChangeSelect = (selectedOption) => {
    if (selectedOption) {
      const { name, value } = selectedOption;
      let newValue;

      newValue = parseInt(value);
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: newValue,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${API_URL}/AccountInfo/SavingAccountInfo`; // Replace with your API endpoint URL

    try {
      // Validate the form using Yup
      await validationSchema.validate(formValues, { abortEarly: false });

      // // Clear form errors if form is valid
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
        setResponseMessage(
          "Form submitted successfully " +
            responseData.ref_id +
            responseData.online_form2_pase_link
        );
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
        //   // Yup validation error
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

  //disable field value intake
  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,

      aac02dob_eng: adDate || prevValues.aac02dob_eng,
      acc02dob_nep: bsDate || prevValues.acc02dob_nep,
    }));
  }, [adDate, bsDate]);

  return (
    <div className="container-fluid mb-5">
      <form onSubmit={handleSubmit}>
        <div className="row row justify-content-evenly   " id="saving_form">
          <div className="col-md-12 col-lg-9 col-xl-8" id="form-section">
            <div className="row" id="box-shadow">
              <div className="row">
                <div className="button">
                  <a href="/">
                    <button className="back-button ps-3">
                      Back
                      <img src="/Assets/images/Exit icon/exit.png" alt="..." />
                    </button>
                  </a>
                </div>
              </div>
              <div className="text-center heading5">
                <h5> Savings Account</h5>
              </div>

              <div className="row ps-5">
                <div className="row gy-3 gx-4">
                  <div className="col-md-3 d-flex flex-column">
                    <div className="div">
                      <label className="form-label">Apply From</label>
                      <span
                        className="required text-danger"
                        aria-required="true"
                        style={{ background: "transparent" }}
                      >
                        *
                      </span>
                    </div>
                    <div className="col-md-32 d-flex">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="acc02is_local_citizen"
                          defaultValue={1}
                          id="num"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Nepal
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="acc02is_local_citizen"
                          defaultValue={2}
                          id="num"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          Other
                        </label>
                      </div>
                    </div>
                    {formErrors.acc02is_local_citizen && (
                      <div className="error">
                        {formErrors.acc02is_local_citizen}
                      </div>
                    )}
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="inputSalutation" className="form-label">
                      Salutation
                    </label>
                    <span
                      className="required text-danger"
                      aria-required="true"
                      style={{ background: "transparent" }}
                    >
                      *
                    </span>
                    <div className="col-md-4 d-flex">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="acc02salutation"
                          id="num"
                          defaultValue={1}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Mr.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="acc02salutation"
                          defaultValue={2}
                          id="num"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          Mrs.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="acc02salutation"
                          defaultValue={3}
                          id="num"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          M/S
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="acc02salutation"
                          defaultValue={4}
                          id="num"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          Miss
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="acc02salutation"
                          defaultValue={5}
                          id="num"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          Minor
                        </label>
                      </div>
                    </div>
                    {formErrors.acc02salutation && (
                      <div className="error">{formErrors.acc02salutation}</div>
                    )}
                  </div>

                  <div className="col-md-3">
                    {/* Preferred Branch */}
                    <label htmlFor="branch" className="form-label yolo">
                      Preferred Branch
                    </label>
                    <Select
                      id="num"
                      name="acc02bra01uin"
                      onChange={handleChangeSelect}
                      options={branchApi.map((item) => ({
                        value: String(item.bra01uin),
                        label: item.bra01name,
                        name: "acc02bra01uin",
                      }))}
                      placeholder="Name of the Branch"
                    />

                    {formErrors.acc02bra01uin && (
                      <div className="error">{formErrors.acc02bra01uin}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <h5 id="personal-details">Personal Details</h5>
                  </div>

                  {/* First Name */}
                  <div className="col-md-4">
                    <label htmlFor="inputFirstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputFirstName"
                      placeholder="First Name"
                      onChange={handleChange}
                      name="acc02FirstName"
                    />
                    {formErrors.acc02FirstName && (
                      <div className="error">{formErrors.acc02FirstName}</div>
                    )}
                  </div>
                  {/* Middle Name */}
                  <div className="col-md-4">
                    <label htmlFor="inputMiddleName" className="form-label">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputMiddleName"
                      placeholder="Middle Name"
                      onChange={handleChange}
                      name="acc02MiddleName"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-md-3">
                    <label htmlFor="inputLastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                      name="acc02LastName"
                    />
                    {formErrors.acc02LastName && (
                      <div className="error">{formErrors.acc02LastName}</div>
                    )}
                  </div>
                  {/* Mobile Number */}
                  <div className="col-md-4">
                    <label htmlFor="inputMobileNumber" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="num"
                      placeholder="+977 9898989898"
                      onChange={handleChange}
                      name="acc02Mobile_no"
                    />
                    {formErrors.acc02Mobile_no && (
                      <div className="error">{formErrors.acc02Mobile_no}</div>
                    )}
                  </div>
                  {/* Email */}
                  <div className="col-md-4">
                    <label htmlFor="inputEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail"
                      placeholder="username@gmail.com"
                      onChange={handleChange}
                      name="acc02Email"
                    />
                    {formErrors.acc02Email && (
                      <div className="error">{formErrors.acc02Email}</div>
                    )}
                  </div>
                  {/* Telephone Number */}
                  <div className="col-md-3">
                    <label
                      htmlFor="inputTelephoneNumber"
                      className="form-label"
                    >
                      Telephone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="num"
                      placeholder="01-0024984"
                      onChange={handleChange}
                      name="acc02phone_no"
                    />
                    {formErrors.acc02phone_no && (
                      <div className="error">{formErrors.acc02phone_no}</div>
                    )}
                  </div>
                  {/* Mobile Number 2 (Optional)
                  <div className="col-md-4">
                    <label htmlFor="inputMobileNumber2" className="form-label">
                      Mobile Number 2 (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputMobileNumber2"
                      placeholder="01-0024984"
                      onChange={handleChange}
                    />
                  </div> */}
                  {/* Date of Birth (B.S.) */}
                  <div className="col-md-4">
                    {/*Date of Birth B.S. Date Picker*/}
                    <label htmlFor="dob" className="form-label yolo">
                      Date of Birth (B.S.)
                    </label>
                    <NepaliDatePicker
                      inputClassName="form-control"
                      value={bsDate}
                      onChange={(value) => {
                        handleBsDate(value, 1);
                        setFormValues((prevValues) => ({
                          ...prevValues,
                          acc02dob_nep: value,
                        }));
                      }}
                      options={{ calenderLocale: "ne", valueLocale: "en" }}
                    />
                    {/* {formErrors.acc02dob_nep && (
                        <div className="error">{formErrors.acc02dob_nep}</div>
                      )} */}
                  </div>
                  {/* Date of Birth (A.D.) */}
                  <div className="col-md-4">
                    {/*Date of Birth A.D. Date Picker*/}
                    <label htmlFor="DOB" className="form-label yolo">
                      Date of Birth (A.D)
                    </label>
                    <input
                      type="date"
                      className="form-control englishDate text dateISO"
                      name="aac02dob_eng"
                      value={adDate}
                      onChange={(e) => {
                        handleAdDate(e, 1);
                        handleChange(e);
                      }}
                    />
                    {/* {formErrors.aac02dob_eng && (
                        <div className="error">{formErrors.aac02dob_eng}</div>
                      )} */}
                  </div>
                  {/* acct types */}
                  <div className="col-md-3 business ">
                    <label
                      htmlFor="inputbusinesstype"
                      className="form-label yolo "
                    >
                      Account Type
                    </label>
                    <select
                      className="form-select"
                      id="num"
                      name="acc02acc01uin"
                      onChange={handleChange}
                    >
                      <option value={0} selected disabled>
                        Type of Business
                      </option>
                      {acctTypeApi.map((item) => (
                        <option key={item.bindField} value={item.bindField}>
                          {item.displayField}
                        </option>
                      ))}
                    </select>
                    {formErrors.acc02acc01uin && (
                      <div className="error">{formErrors.acc02acc01uin}</div>
                    )}
                  </div>

                  {/* Social Network */}
                  <div className="col-md-6 col-lg-4">
                    <label>Social Network</label>
                    <div
                      className="container"
                      style={{
                        borderWidth: "0px 1px",
                        borderStyle: "solid",
                        borderColor: "#b9b9b9",
                        borderRadius: "5px 6px 0px 0px",
                      }}
                    >
                      {/* url socail */}
                      <div className="img">
                        <img
                          src="/Assets/images/After_Verification/Social Network/Facebook.png"
                          style={{
                            padding: 10,
                            border: selectedImages.includes("FaceB")
                              ? "2px solid blue"
                              : "none",
                          }}
                          onClick={() => handleImageClick("FaceB")}
                          alt="..."
                        />
                        <img
                          src="/Assets/images/After_Verification/Social Network/Twitter.png"
                          style={{
                            padding: 10,
                            border: selectedImages.includes("TIW")
                              ? "2px solid blue"
                              : "none",
                          }}
                          onClick={() => handleImageClick("TIW")}
                          alt="..."
                        />
                        <img
                          src="/Assets/images/After_Verification/Social Network/LinkedIn.png"
                          style={{
                            padding: 10,
                            border: selectedImages.includes("LinkedIn")
                              ? "2px solid blue"
                              : "none",
                          }}
                          onClick={() => handleImageClick("LinkedIn")}
                          alt="..."
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="insta"
                      placeholder="Username or URL Link"
                      onChange={handleChange}
                      name="acc02contact_medium_no"
                    />
                    {formErrors.acc02contact_medium_no && (
                      <div className="error">
                        {formErrors.acc02contact_medium_no}
                      </div>
                    )}
                  </div>
                  {/* CAPTCHA */}
                  <div className="col-12 mt-5">
                    <h5 id="verify-captcha">Verify Captcha</h5>
                    <div className="row">
                      <div className="col-4">
                        <input
                          type="text"
                          className="form-control"
                          id="inputCaptcha"
                          placeholder="ENTER CAPTCHA"
                        />
                      </div>
                      <div className="col-4 d-flex">
                        <img
                          src="/Assets/images/recaptcha.png"
                          alt="..."
                          id="recap"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue
                        id="flexCheckDefault"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        I have read, understood and agreed to the terms and
                        condition
                        <span className="text-danger">
                          (Terms And Conditions).
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="col-12 mt-5 mb-5 text-center">
                    <button
                      type="submit"
                      className="btn btn-outline-dark text-danger ps-4 pe-4"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
  );
}

export default Savingacctform;
