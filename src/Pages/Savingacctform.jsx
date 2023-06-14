import React, { useState, useEffect } from "react";
import ExitImg from "../Assets/images/Exit icon/exit.png";
import FaceB from "../Assets/images/After_Verification/Social Network/Facebook.png";
import TIW from "../Assets/images/After_Verification/Social Network/Twitter.png";
import LinkedIn from "../Assets/images/After_Verification/Social Network/LinkedIn.png";
import RECap from "../Assets/images/recaptcha.png";
import Select from "react-select";
import { API_URL } from "../Utilities/Constants";

function Savingacctform() {
  const [selection, setSelection] = useState("yes");
  const [branchApi, setBranchApi] = useState([]);
  const [districtApi, setDistrictApi] = useState([]);
  const [provienceApi, setProvienceApi] = useState([]);
  const [municipalityApi, setMunicipalityApi] = useState([]);
  const [genderApi, setGenderApi] = useState([]);
  const [martialApi, setMartialApi] = useState([]);
  const [occupationApi, setOccupationApi] = useState([]);
  const [annualApi, setAnnualApi] = useState([]);
  const [totalAssetApi, setTotalAssetApi] = useState([]);
  const [aoPurposeApi, setAoPurposeApi] = useState([]);
  const [antiTaxamtApi, setAntiTaxamtApi] = useState([]);
  const [eduApi, setEduApi] = useState([]);

  const [sameAsAbove, setSameAsAbove] = useState(false);
  const [show, setShow] = useState("false");

  const [province, setProvince] = useState(""); // Store the selected province value
  const [district, setDistrict] = useState(""); // Store the selected district value
  const [municipality, setMunicipality] = useState(""); // Store the selected municipality value
  const [ward, setWard] = useState(""); // Store the selected municipality value
  const [street, setStreet] = useState(""); // Store the selected municipality value
  const [house, setHouse] = useState(""); // Store the selected municipality value
  const [selectedImages, setSelectedImages] = useState([]);
  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };
  const handleSelectionChange2 = (event) => {
    setShow(event.target.value);
  };
  const handleState = (newValue) => {
    setSelection(newValue);
    console.log(selection);
  };
  const handlePrevious = (newValue) => {
    setSelection(newValue);
    console.log(selection);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response3 = await fetch(`${API_URL}/KYC/GetProvienceList`);
        const data3 = await response3.json();
        setProvienceApi(data3);

        const response2 = await fetch(`${API_URL}/GeneralComponents/Branch`);
        const data2 = await response2.json();
        setBranchApi(data2);
        const response1 = await fetch(`${API_URL}/GeneralComponents/Gender`);
        const data1 = await response1.json();
        setGenderApi(data1);
        const response4 = await fetch(`${API_URL}/GeneralComponents/Education`);
        const data4 = await response4.json();
        setEduApi(data4);
        const response5 = await fetch(
          `${API_URL}/GeneralComponents/MaritalStatus`
        );
        const data5 = await response5.json();
        setMartialApi(data5);
        const response6 = await fetch(
          `${API_URL}/GeneralComponents/Occupation`
        );
        const data6 = await response6.json();
        setOccupationApi(data6);
        const response7 = await fetch(
          `${API_URL}/GeneralComponents/AnnualTransactionNumber`
        );
        const data7 = await response7.json();
        setAnnualApi(data7);

        const response8 = await fetch(
          `${API_URL}/GeneralComponents/TotalAssets`
        );
        const data8 = await response8.json();
        setTotalAssetApi(data8);
        const response9 = await fetch(
          `${API_URL}/GeneralComponents/PurposeOfAccountOpening`
        );
        const data9 = await response9.json();
        setAoPurposeApi(data9);
        const response10 = await fetch(
          ` ${API_URL}/GeneralComponents/AnnualAnticipatedAmount`
        );
        const data10 = await response10.json();
        setAntiTaxamtApi(data10);
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
  //for select-form
  // const handleChangeSelect = (selectedOption) => {
  //   if (selectedOption) {
  //     const { name, value } = selectedOption;

  //     setFormValues((prevValues) => ({
  //       ...prevValues,
  //       [name]: value,
  //     }));
  //   }
  // };

  return (
    <div className="container-fluid mb-5">
      <form>
        {selection === "yes" && (
          <div
            className="row justify-content-evenly  mt-5 mb-5"
            id="saving_verification"
          >
            <div className="col-md-12 col-lg-9 col-xl-8" id="form-section">
              <form className="row" id="form" style={{ height: 539 }}>
                <div className="row">
                  <div className="button">
                    <a className="btn back-button ps-3" href="index.html">
                      Back
                      <img src={ExitImg} alt />
                    </a>
                  </div>
                </div>
                <div className="row mt-5 mb-5">
                  <div className="col-12 text-center">
                    <p>
                      Do you already have Saving Account with
                      <strong>Mahalaxmi Bikas Bank Ltd.</strong>?
                    </p>
                    <div className="d-flex justify-content-center">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="yes_bus_switch"
                          id="yes_switch"
                          value="yes"
                          checked={selection === "yes"}
                          onChange={handleSelectionChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="yes_switch"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="no_bus_switch"
                          id="no_switch"
                          value="no"
                          checked={selection === "no"}
                          onChange={handleSelectionChange}
                        />
                        <label className="form-check-label" htmlFor="no_switch">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {selection === "no" && (
          <div className="row row justify-content-evenly   " id="saving_form">
            <div className="col-md-12 col-lg-9 col-xl-8" id="form-section">
              <div className="row" id="box-shadow">
                <div className="row">
                  <div className="button">
                    <a href="/">
                      <button className="back-button ps-3">
                        Back
                        <img src={ExitImg} alt />
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
                            defaultValue="true"
                            id="flexRadioDefault1"
                            defaultChecked
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
                            defaultValue="false"
                            id="flexRadioDefault2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Other
                          </label>
                        </div>
                      </div>
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
                            id="flexRadioDefault1"
                            defaultValue="Mr."
                            defaultChecked
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
                            defaultValue="Mrs."
                            id="flexRadioDefault2"
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
                            defaultValue="M/S"
                            id="flexRadioDefault2"
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
                            defaultValue="Miss"
                            id="flexRadioDefault2"
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
                            defaultValue="Minor"
                            id="flexRadioDefault2"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Minor
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      {/* Preferred Branch */}
                      <label htmlFor="branch" className="form-label yolo">
                        Preferred Branch
                      </label>
                      <Select
                        name="kyc01bra01uin"
                        id="select_branch"
                        // onChange={handleChangeSelect}
                        options={branchApi.map((item) => ({
                          value: item.bra01uin,
                          label: item.bra01name,
                          name: "kyc01bra01uin",
                        }))}
                        placeholder="Name of the Branch"
                      />

                      {/* {formErrors.kyc01bra01uin && (
                        <div className="error">{formErrors.kyc01bra01uin}</div>
                      )} */}
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
                      />
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
                      />
                    </div>
                    {/* Mobile Number */}
                    <div className="col-md-4">
                      <label htmlFor="inputMobileNumber" className="form-label">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputMobileNumber"
                        placeholder="+977 9898989898"
                      />
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
                      />
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
                        id="inputTelephoneNumber"
                        placeholder="01-0024984"
                      />
                    </div>
                    {/* Mobile Number 2 (Optional) */}
                    <div className="col-md-4">
                      <label
                        htmlFor="inputMobileNumber2"
                        className="form-label"
                      >
                        Mobile Number 2 (Optional)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputMobileNumber2"
                        placeholder="01-0024984"
                      />
                    </div>
                    {/* Date of Birth (B.S.) */}
                    <div className="col-md-4 mt-4">
                      <label>Date of Birth (B.S.)</label>
                      <input
                        type="date"
                        name="DOB"
                        className="form-control text"
                        placeholder
                      />
                    </div>
                    {/* Date of Birth (A.D.) */}
                    <div className="col-md-3 mt-4">
                      <label>Date of Birth (A.D.)</label>
                      <input
                        type="date"
                        name="DOB"
                        className="form-control text"
                        placeholder
                      />
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
                        <div className="img">
                          <img
                            src={FaceB}
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
                            src={TIW}
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
                            src={LinkedIn}
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
                        id="inputMobileNumber2"
                        placeholder="Username or URL Link"
                      />
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
                          <img src={RECap} alt id="recap" />
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
                        type="button"
                        className="btn btn-outline-dark text-danger ps-4 pe-4"
                        onClick={() => handleState("generald")}
                      >
                        next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {selection === "generald" && (
          <div>
            <div
              className="row justify-content-evenly  mt-5 mb-5"
              id="generald"
            >
              <div className="col-md-11 col-lg-9 col-xxl-8">
                <div className="row" id="box-shadow">
                  <div className="row">
                    <div className="button">
                      <button
                        className="back-button ps-3"
                        onClick={() => handlePrevious("no")}
                      >
                        Back
                        <img src={ExitImg} alt="..." />
                      </button>
                    </div>
                  </div>
                  {/* personal details  */}
                  <div className="row ps-5">
                    <form className="row gx-4 gy-4">
                      <div className="col-12 mt-4">
                        {" "}
                        {/*PERSONAL DETAILS TITLE*/}
                        <h5 id="personal-details">Personal Information</h5>
                      </div>
                      <div className="col-md-3">
                        {" "}
                        {/*Date of Birth B.S. Date Picker*/}
                        <label htmlFor="dob" className="form-label yolo">
                          Date of Birth (B.S.)
                        </label>
                        <input
                          type="date"
                          name="DOB"
                          className="form-control text"
                          placeholder
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        {" "}
                        {/*Date of Birth A.D. Date Picker*/}
                        <label htmlFor="DOB" className="form-label yolo">
                          Date of Birth (A.D)
                        </label>
                        <input
                          type="date"
                          name="DOB"
                          className="form-control text"
                          placeholder
                          required
                        />
                      </div>
                      <div className="col-md-3">
                        <label
                          htmlFor="inputGender"
                          className="form-label yolo"
                        >
                          Gender
                        </label>
                        <select
                          className="form-select"
                          id="num"
                          name="kyc04set04uin"
                          // onChange={handleChange}
                        >
                          <option value={0} selected disabled>
                            Gender
                          </option>
                          {genderApi.map((item) => (
                            <option key={item.bindField} value={item.bindField}>
                              {item.displayField}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label
                          htmlFor="inputMartial"
                          className="form-label yolo"
                        >
                          Martail Status
                        </label>
                        <select
                          className="form-select"
                          id="num"
                          name="kyc04set04uin"
                          // onChange={handleChange}
                        >
                          <option value={0} selected disabled>
                            Status
                          </option>
                          {martialApi.map((item) => (
                            <option key={item.bindField} value={item.bindField}>
                              {item.displayField}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3 ">
                        <label
                          htmlFor="validationnationality"
                          className="form-label yolo"
                          id="Online"
                        >
                          Nationality
                        </label>
                        <input
                          type="nationality"
                          className="form-control"
                          id="validationAccount required"
                          placeholder="Nationality"
                          required
                        />
                        <div className="invalid-feedback">
                          You cannot have this field empty!!
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputEdu" className="form-label yolo">
                          Education
                        </label>
                        <select
                          className="form-select"
                          id="num"
                          name="kyc04set04uin"
                          // onChange={handleChange}
                        >
                          <option value={0} selected disabled>
                            Education
                          </option>
                          {eduApi.map((item) => (
                            <option key={item.bindField} value={item.bindField}>
                              {item.displayField}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="row m-3" id="box-shadow">
                        {/*Citizenship Form*/}
                        <div className="col-12 " id="citizenship">
                          <div className="row gy-4">
                            <div className="col-12 mt-4">
                              <h5 id="citizenship-details">Citizenship</h5>
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputCitizenshipNumber"
                                className="form-label yolo"
                              >
                                Citizenship Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputCitizenshipNumber"
                                placeholder="01-0024984"
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label yolo">
                                Date of Issue (B.S.)
                              </label>
                              <input
                                type="date"
                                name="DOB"
                                className="form-control text"
                                placeholder
                              />
                            </div>
                            <div className="col-md-4 ">
                              <label className="form-label yolo">
                                Date of Issue (A.D.)
                              </label>
                              <input
                                type="date"
                                name="DOB"
                                className="form-control text"
                                placeholder
                              />
                            </div>
                            <div className="col-md-4">
                              <label
                                htmlFor="inputPlaceOfIssue"
                                className="form-label yolo"
                              >
                                Place of Issue
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputPlaceofIssue"
                                placeholder="01-0024984"
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label yolo">
                                Issuing Authority
                              </label>
                              <input
                                type="date"
                                name="DOB"
                                className="form-control text"
                                placeholder
                              />
                            </div>
                          </div>
                          {/* passport form */}
                          <div className=" col-12 " id="passport">
                            <div className="row">
                              <div className="col-12 mt-4">
                                <h5 id="passport-details">Passport</h5>
                              </div>
                              <div className="col-md-4">
                                <label
                                  htmlFor="inputPassportNumber"
                                  className="form-label yolo required"
                                >
                                  Passport No
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputPassportNumber"
                                  placeholder="01-0024984"
                                />
                              </div>
                              <div className="col-md-4">
                                <label
                                  htmlFor="inputPlaceOfIssue"
                                  className="form-label yolo required"
                                >
                                  Select Place of Issue
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputPlaceofIssue"
                                  placeholder="01-0024984"
                                />
                              </div>
                              <div className="col-md-4">
                                <label
                                  htmlFor="inputPIssueAuthority"
                                  className="form-label yolo required"
                                >
                                  Issuing Authority
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputIssue"
                                  placeholder="01-0024984"
                                />
                              </div>
                              <div className="col-md-4 mt-4">
                                <label
                                  htmlFor="inputDateIssuue"
                                  className="form-label yolo required"
                                >
                                  Date of Issue (A.D.)
                                </label>
                                <input
                                  type="date"
                                  name="DOB"
                                  className="form-control text"
                                  placeholder
                                />
                              </div>
                              <div className="col-md-4 mt-4">
                                <label
                                  htmlFor="inputDate"
                                  className="form-label yolo required"
                                >
                                  Date of Issue (B.S.)
                                </label>
                                <input
                                  type="date"
                                  name="DOB"
                                  className="form-control text"
                                  placeholder
                                />
                              </div>
                              <div className="col-md-4 mt-4">
                                <label
                                  htmlFor="InputeExpiry"
                                  className="form-label yolo required"
                                >
                                  ID Expiry Date (A.D.)
                                </label>
                                <input
                                  type="date"
                                  name="DOB"
                                  className="form-control text"
                                  placeholder
                                />
                              </div>
                              <div className="col-md-4 mt-4">
                                <label
                                  htmlFor="InputIDExpiry"
                                  className="form-label yolo required"
                                >
                                  ID Expiry Date (B.S.)
                                </label>
                                <input
                                  type="date"
                                  name="DOB"
                                  className="form-control text"
                                  placeholder
                                />
                              </div>
                              <div className="col-md-4 mt-4">
                                <label
                                  htmlFor="inputPassport"
                                  className="form-label yolo required"
                                >
                                  Passport Issue For Foreigner
                                </label>
                                <input
                                  type="date"
                                  name="DOB"
                                  className="form-control text"
                                  placeholder
                                />
                              </div>
                              <div className="col-md-4 mt-4">
                                <label
                                  htmlFor="inputPassportIssue"
                                  className="form-label yolo required"
                                >
                                  Passport Issue Date(B.S.)
                                </label>
                                <input
                                  type="date"
                                  name="DOB"
                                  className="form-control text"
                                  placeholder
                                />
                              </div>
                              <div className="col-md-4 mt-4">
                                <label
                                  htmlFor="inputPassportExpiry"
                                  className="form-label yolo required"
                                >
                                  Passport Expiry (for foreigners)
                                </label>
                                <input
                                  type="date"
                                  name="DOB"
                                  className="form-control text"
                                  placeholder
                                />
                              </div>
                              <div className="col-md-4 mt-4">
                                <label
                                  htmlFor="inputPassportExDate"
                                  className="form-label yolo required"
                                >
                                  Passport Expiry Date (B.S.)
                                </label>
                                <input
                                  type="date"
                                  name="DOB"
                                  className="form-control text"
                                  placeholder
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-5 mb-5 text-center">
                        <button
                          type="button"
                          className="btn btn-outline-dark text-danger ps-4 pe-4"
                          onClick={() => handleState("addr_details")}
                        >
                          next
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {selection === "addr_details" && (
          <div
            className="row justify-content-evenly  mt-5 mb-5"
            id="addr_details"
          >
            <div
              className="col-md-11 col-lg-9 col-xxl-8 justify-content-evenly"
              id="form-section"
            >
              <div className="row justify-content-evenly" id="form">
                <div className="col-12">
                  {" "}
                  {/*Back*/}
                  <div className="button">
                    <button
                      className="back-button ps-3"
                      onClick={() => handlePrevious("generald")}
                    >
                      Back
                      <img src={ExitImg} alt="..." />
                    </button>
                  </div>
                </div>

                <div className="col-12 mt-4">
                  <h3 className="p-3">Address Details</h3>
                  <h5 id="personal-details">Permanent Address</h5>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputProvince" className="form-label yolo">
                    Province
                  </label>
                  <select
                    id="inputProvince"
                    className="form-select"
                    name="kyc03set03uin"
                    //  onChange={handleChange}
                  >
                    <option selected>Select Province</option>
                    {provienceApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                  {/* {formErrors.kyc03set03uin && (
                   <div className="error">{formErrors.kyc03set03uin}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputDistrict" className="form-label yolo">
                    District
                  </label>
                  <select
                    id="inputDistrict"
                    className="form-select"
                    name="kyc03set04uin"
                    //  onChange={handleChange}
                  >
                    <option selected>Name of the District</option>
                    {districtApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                  {/* {formErrors.kyc03set04uin && (
                   <div className="error">{formErrors.kyc03set04uin}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <label
                    htmlFor="inputMunicipality"
                    className="form-label yolo"
                  >
                    Municipality
                  </label>
                  <select
                    id="inputMunicipality"
                    className="form-select"
                    name="kyc03set05uin"
                    //  onChange={handleChange}
                  >
                    <option selected>Name of the Municipality/VDC</option>
                    {municipalityApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                  {/* {formErrors.kyc03set05uin && (
                   <div className="error">{formErrors.kyc03set05uin}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputWardNumber" className="form-label yolo">
                    Ward Number
                  </label>
                  <input
                    type="num"
                    className="form-control syncSame numberOnly"
                    id="num"
                    name="kyc03ward_no"
                    maxLength={2}

                    //  onChange={handleChange}
                  />
                  {/* {formErrors.kyc03ward_no && (
                   <div className="error">{formErrors.kyc03ward_no}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputStreet" className="form-label yolo">
                    Street
                  </label>
                  <input
                    type="text"
                    className="form-control syncSame "
                    id="Street"
                    name="kyc03street"
                    maxLength={10}

                    //  onChange={handleChange}
                  />
                  {/* {formErrors.kyc03street && (
                   <div className="error">{formErrors.kyc03street}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputHouseNumber" className="form-label yolo">
                    House Number
                  </label>
                  <input
                    type="text"
                    className="form-control syncSame numberOnly"
                    id="num"
                    name="kyc03house_no"
                    maxLength={100}
                    //  onChange={handleChange}
                  />
                  {/* {formErrors.kyc03house_no && (
                   <div className="error">{formErrors.kyc03house_no}</div>
                 )} */}
                </div>
                {/* same asa above */}
                <div className="col-12 mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={sameAsAbove}
                    // onChange={handleCheckboxChange}
                    id="flexCheckApprove"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    <p className="form-label yolo">Same as above:</p>
                  </label>
                </div>

                <div className="col-12 mt-5">
                  <h5 id="personal-details">Current Address</h5>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputProvince" className="form-label yolo">
                    Province
                  </label>
                  <select
                    id="num"
                    className="form-select"
                    name="kyc03set03uin_temp"
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      // handleChange(e);
                    }}
                    disabled={sameAsAbove} // Disable the dropdown if sameAsAbove is checked
                  >
                    <option value="">Select Province</option>
                    {provienceApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                  {/* {formErrors.kyc03set03uin_temp && !sameAsAbove && (
                   <div className="error">{formErrors.kyc03set03uin_temp}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputDistrict" className="form-label yolo">
                    District
                  </label>
                  <select
                    id="num"
                    className="form-select"
                    name="kyc03set04uin_temp"
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      // handleChange(e);
                    }}
                    disabled={sameAsAbove} // Disable the dropdown if sameAsAbove is checked
                  >
                    <option value="">Name of the District</option>
                    {districtApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                  {/* {formErrors.kyc03set04uin_temp && !sameAsAbove && (
                   <div className="error">{formErrors.kyc03set04uin_temp}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <label
                    htmlFor="inputMunicipality"
                    className="form-label yolo"
                  >
                    Municipality
                  </label>
                  <select
                    id="num"
                    className="form-select"
                    name="kyc03set05uin_temp"
                    value={municipality}
                    onChange={(e) => {
                      setMunicipality(e.target.value);
                      // handleChange(e);
                    }}
                    disabled={sameAsAbove} // Disable the dropdown if sameAsAbove is checked
                  >
                    <option value="">Name of the Municipality/VDC</option>
                    {municipalityApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                  {/* {formErrors.kyc03set05uin_temp && !sameAsAbove && (
                   <div className="error">{formErrors.kyc03set05uin_temp}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputWardNumber" className="form-label yolo">
                    Ward Number
                  </label>
                  <input
                    type="num"
                    className="form-control syncSame numberOnly"
                    id="num"
                    name="kyc03ward_no_temp"
                    value={ward}
                    maxLength={2}
                    //  onChange={handleChange}
                    disabled={sameAsAbove}
                  />
                  {/* {formErrors.kyc03ward_no_temp && !sameAsAbove && (
                   <div className="error">{formErrors.kyc03ward_no_temp}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputStreet" className="form-label yolo">
                    Street
                  </label>
                  <input
                    type="text"
                    className="form-control syncSame "
                    id="Street"
                    name="kyc03street_temp"
                    maxLength={10}
                    value={street}
                    //  onChange={handleChange}
                    disabled={sameAsAbove}
                  />
                  {/* {formErrors.kyc03street_temp && !sameAsAbove && (
                   <div className="error">{formErrors.kyc03street_temp}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputHouseNumber" className="form-label yolo">
                    House Number
                  </label>
                  <input
                    type="text"
                    className="form-control syncSame numberOnly"
                    id="num"
                    name="kyc03house_no_temp"
                    maxLength={100}
                    //  onChange={handleChange}
                    value={house}
                    disabled={sameAsAbove}
                  />
                  {/* {formErrors.kyc03house_no_temp && !sameAsAbove && (
                   <div className="error">{formErrors.kyc03house_no_temp}</div>
                 )} */}
                </div>
                <div className="col-12 mt-5 mb-5 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-dark text-danger ps-4 pe-4 "
                    id="addr_next"
                    onClick={() => handleState("family")}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {selection === "family" && (
          <div>
            <div class="row justify-content-evenly  mt-5 mb-5" id="family">
              <div className="col-md-11 col-lg-9 col-xxl-8">
                <div className="row" id="box-shadow">
                  <div className="row">
                    <div className="button">
                      <button
                        className="back-button ps-3"
                        onClick={() => handlePrevious("addr_details")}
                      >
                        Back
                        <img src={ExitImg} alt="..." />
                      </button>
                    </div>
                  </div>
                  <div className="col-12 mt-5">
                    {" "}
                    {/*Family Details Section*/}
                    <h5 id="family-details">Family Details</h5> {/*TITLE*/}
                    <div className="question-container">
                      <table className="table" id="targetTable">
                        <thead>
                          <tr>
                            <th scope="col">Relation</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Citizenship No.</th>
                            <th scope="col">Date of Issue</th>
                            <th scope="col">Place of Issue</th>
                            <th scope="col">Status</th>
                            <th scope="col">
                              <button
                                className="btn btn-primary"
                                id="addRowButton"
                              >
                                Add Row
                              </button>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <select
                                className="form-select"
                                name="relation"
                                disabled
                              >
                                <option value="Father" selected>
                                  GrandFather
                                </option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="fullName"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="citizenshipNo"
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                name="dateOfIssue"
                              />
                            </td>
                            <td>
                              <select
                                className="form-select"
                                name="placeOfIssue"
                              >
                                <option value="Morang">Morang</option>
                                <option value="Kathmandu">Kathmandu</option>
                                <option value="Pokhara">Pokhara</option>
                              </select>
                            </td>
                            <td>
                              <div className="switch">
                                <input type="checkbox" id="mySwitch1" />
                                <label htmlFor="mySwitch1" className="slider" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select
                                className="form-select"
                                name="relation"
                                disabled
                              >
                                <option value="Father" selected>
                                  Father
                                </option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="fullName"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="citizenshipNo"
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                name="dateOfIssue"
                              />
                            </td>
                            <td>
                              <select
                                className="form-select"
                                name="placeOfIssue"
                              >
                                <option value="Morang">Morang</option>
                                <option value="Kathmandu">Kathmandu</option>
                                <option value="Pokhara">Pokhara</option>
                              </select>
                            </td>
                            <td>
                              <div className="switch">
                                <input type="checkbox" id="mySwitch2" />
                                <label htmlFor="mySwitch2" className="slider" />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select
                                className="form-select"
                                name="relation"
                                disabled
                              >
                                <option value="Father" selected>
                                  Mother
                                </option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="fullName"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="citizenshipNo"
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                name="dateOfIssue"
                              />
                            </td>
                            <td>
                              <select
                                className="form-select"
                                name="placeOfIssue"
                              >
                                <option value="Morang">Morang</option>
                                <option value="Kathmandu">Kathmandu</option>
                                <option value="Pokhara">Pokhara</option>
                              </select>
                            </td>
                            <td>
                              <div className="switch">
                                <input type="checkbox" id="mySwitch3" />
                                <label htmlFor="mySwitch3" className="slider" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-12 mt-5 mb-5 d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn pcolor text-white ps-3 pe-3"
                      id="family_prev"
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-dark text-danger ps-4 pe-4"
                      onClick={() => handleState("occupation")}
                    >
                      next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {selection === "occupation" && (
          <div>
            <div
              className="row justify-content-evenly  mt-5 mb-5"
              id="occupation"
            >
              <div className="col-md-11 col-lg-9 col-xxl-8">
                <div className="row" id="box-shadow">
                  <div className="row">
                    <div className="button">
                      <button
                        className="back-button ps-3"
                        onClick={() => handlePrevious("family")}
                      >
                        Back
                        <img src={ExitImg} alt="..." />
                      </button>
                    </div>
                  </div>
                  <div className="col-12 mt-5">
                    <h5 id="family-details">Occupation Details</h5> {/*TITLE*/}
                    {/* First Row */}
                    <div className="col-md-4">
                      <label
                        htmlFor="inputOccupation1"
                        className="form-label yolo"
                      >
                        Occupation
                      </label>
                      <select
                        className="form-select"
                        id="num"
                        name="kyc04set04uin"
                        // onChange={handleChange}
                      >
                        <option value={0} selected disabled>
                          Occupation
                        </option>
                        {occupationApi.map((item) => (
                          <option key={item.bindField} value={item.bindField}>
                            {item.displayField}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="row gx-4 gy-4">
                      {/* Second Row */}
                      <div className="col-md-3">
                        <label
                          htmlFor="inputOccupation2"
                          className="form-label yolo"
                        >
                          Exp. Annual T/O
                        </label>
                        <select
                          className="form-select"
                          id="num"
                          name="kyc04set04uin"
                          // onChange={handleChange}
                        >
                          <option value={0} selected disabled>
                            Select an option
                          </option>
                          {annualApi.map((item) => (
                            <option key={item.bindField} value={item.bindField}>
                              {item.displayField}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label
                          htmlFor="inputOccupation3"
                          className="form-label yolo"
                        >
                          Amount Rs
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputFirstName"
                          name=""
                        />
                      </div>
                      <div className="col-md-3">
                        <label
                          htmlFor="inputOccupation4"
                          className="form-label yolo"
                        >
                          Total Assets
                        </label>
                        <select
                          className="form-select"
                          id="num"
                          name="kyc04set04uin"
                          // onChange={handleChange}
                        >
                          <option value={0} selected disabled>
                            Select an option
                          </option>
                          {totalAssetApi.map((item) => (
                            <option key={item.bindField} value={item.bindField}>
                              {item.displayField}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-2 ">
                        <label
                          htmlFor="inputOccupation5"
                          className="form-label yolo"
                        >
                          Amount Rs
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputFirstName"
                          name=""
                        />
                      </div>
                      {/* Third Row */}
                      <div className="col-md-3 mb-4">
                        <label
                          htmlFor="inputOccupation6"
                          className="form-label yolo"
                        >
                          Purpose of AO
                        </label>
                        <select
                          className="form-select"
                          id="num"
                          name="kyc04set04uin"
                          // onChange={handleChange}
                        >
                          <option value={0} selected disabled>
                            Select an option
                          </option>
                          {aoPurposeApi.map((item) => (
                            <option key={item.bindField} value={item.bindField}>
                              {item.displayField}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label
                          htmlFor="inputOccupation7"
                          className="form-label yolo"
                        >
                          Purpose(if Other)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputFirstName"
                          name=""
                        />
                      </div>
                      <div className="col-md-3">
                        <label
                          htmlFor="inputOccupation8"
                          className="form-label yolo"
                        >
                          Anticipated Annual TXN
                        </label>
                        <select
                          className="form-select"
                          id="num"
                          name="kyc04set04uin"
                          // onChange={handleChange}
                        >
                          <option value={0} selected disabled>
                            Select an option
                          </option>
                          {antiTaxamtApi.map((item) => (
                            <option key={item.bindField} value={item.bindField}>
                              {item.displayField}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-2">
                        <label
                          htmlFor="inputOccupation9"
                          className="form-label yolo"
                        >
                          Anticipated Amt. of AI
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputFirstName"
                          name=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-11 col-lg-9 col-xxl-8">
                <div className="row" id="box-shadow">
                  <div className="row gx-4 gy-4">
                    {/* Scrollable Container */}
                    <div className="col-md-12 scroll-container">
                      {/* Question 1 */}
                      <div
                        className="question-container"
                        style={{
                          backgroundColor: "#f2f2f2",
                          padding: 10,
                          marginBottom: 10,
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>
                          Do you have any account with other Bank and Financial
                          Institution? :
                        </p>
                        <div className="row">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="questionOption1"
                              id="questionYesRadio1"
                              defaultValue="yes"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="questionYesRadio1"
                            >
                              Yes
                            </label>
                          </div>

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="questionOption1"
                              id="questionNoRadio1"
                              defaultValue="no"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="questionNoRadio1"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Question 2 */}
                      <div
                        className="question-container"
                        style={{
                          backgroundColor: "#f2f2f2",
                          padding: 10,
                          marginBottom: 10,
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>
                          Are You Associated with Any Criminal Activity Before?
                          :
                        </p>
                        <div className="row">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="questionOption2"
                              id="questionYesRadio1"
                              defaultValue="yes"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="questionYesRadio1"
                            >
                              Yes
                            </label>
                          </div>

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="questionOption2"
                              id="questionNoRadio1"
                              defaultValue="no"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="questionNoRadio1"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Question 3 */}
                      <div
                        className="question-container"
                        style={{
                          backgroundColor: "#f2f2f2",
                          padding: 10,
                          marginBottom: 10,
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>
                          Do You Have Nominee:
                        </p>
                        <div className="row">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="questionOption3"
                              id="questionYesRadio1"
                              value="true"
                              checked={show === "true"}
                              onChange={handleSelectionChange2}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="questionYesRadio1"
                            >
                              Yes
                            </label>
                          </div>

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="questionOption3"
                              id="questionNoRadio1"
                              defaultValue="no"
                              value="false"
                              checked={show === "false"}
                              onChange={handleSelectionChange2}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="questionNoRadio1"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Toggle */}
                      {show === "true" && (
                        <div
                          className="question-container "
                          id="toggle"
                          style={{
                            backgroundColor: "#f2f2f2",
                            padding: 10,
                            marginBottom: 10,
                          }}
                        >
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Nominee's Name</th>
                                <th scope="col">Citizenship No.</th>
                                <th scope="col">Date of Issue</th>
                                <th scope="col">Place of Issue</th>
                                <th scope="col">Relation</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="nomineeName"
                                    name="nomineeName"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="citizenshipNo"
                                    name="citizenshipNo"
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="dateOfIssue"
                                    name="dateOfIssue"
                                  />
                                </td>
                                <td>
                                  <select
                                    className="form-select"
                                    id="placeOfIssue"
                                    name="placeOfIssue"
                                  >
                                    <option value="Morang">Morang</option>
                                    <option value="Kathmandu">Kathmandu</option>
                                    <option value="Pokhara">Pokhara</option>
                                  </select>
                                </td>
                                <td>
                                  <select
                                    className="form-select"
                                    id="relation"
                                    name="relation"
                                  >
                                    <option value="Father">Father</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Sibling">Sibling</option>
                                  </select>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Repeat the above question-container pattern for the remaining questions */}
                      {/* Question 4 */}
                      <div
                        className="question-container"
                        style={{
                          backgroundColor: "#f2f2f2",
                          padding: 10,
                          marginBottom: 10,
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>
                          Do you have any Beneficial Owner(BO)? :
                        </p>
                        <div className="row">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="questionOption4"
                              id="questionYesRadio1"
                              defaultValue="yes"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="questionYesRadio1"
                            >
                              Yes
                            </label>
                          </div>

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="questionOption4"
                              id="questionNoRadio1"
                              defaultValue="no"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="questionNoRadio1"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Question 5 */}
                      <div
                        className="question-container"
                        style={{
                          backgroundColor: "#f2f2f2",
                          padding: 10,
                          marginBottom: 10,
                        }}
                      >
                        <p style={{ fontWeight: "bold" }}>
                          Are You a US Resident/Citizen/ Permanent Resident/
                          Green card Holder ?:
                        </p>
                        <div className="row">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="questionOption5"
                              id="questionYesRadio1"
                              defaultValue="yes"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="questionYesRadio1"
                            >
                              Yes
                            </label>
                          </div>

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="questionOption5"
                              id="questionNoRadio1"
                              defaultValue="no"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="questionNoRadio1"
                            >
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mt-5 mb-5 d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn pcolor text-white ps-3 pe-3"
                        id="Occ_prev"
                      >
                        Previous
                      </button>
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
        )}
      </form>
    </div>
  );
}

export default Savingacctform;
