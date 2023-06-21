import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFormValues from "../States/SavingSecond.tsx";
import Select from "react-select";
import { API_URL } from "../Utilities/Constants";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import NepaliDate from "nepali-date-converter";
import Modal from "react-modal";

function SavingacctformSecond() {
  const [selection, setSelection] = useState("no");
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
  const [genaraldistrictApi, setGeneralDistrictApi] = useState([]);
  const [eduApi, setEduApi] = useState([]);

  const [sameAsAbove, setSameAsAbove] = useState(false);
  const [show, setShow] = useState("false");

  const [province1, setProvince1] = useState("0"); // Store the selected province value
  const [province, setProvince] = useState(""); // Store the selected province value
  const [district, setDistrict] = useState(""); // Store the selected district value
  const [municipality, setMunicipality] = useState(""); // Store the selected municipality value
  const [ward, setWard] = useState(""); // Store the selected municipality value
  const [street, setStreet] = useState(""); // Store the selected municipality value
  const [house, setHouse] = useState(""); // Store the selected municipality value
  const [residentPhoneNumber, setResidentPhoneNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [officePhoneNumber, setOfficePhoneNumber] = useState("");

  const [selectedImages, setSelectedImages] = useState([]);
  const [formValues, setFormValues] = useFormValues();
  const [responseMessage, setResponseMessage] = useState("hello");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [bsDate, setBsDate] = useState("");
  const [adDate, setAdDate] = useState("");
  const [acc04IssuedDateNep, setAcc04IssuedDateNep] = useState("");
  const [acc04IssuedDateEng, setAcc04IssuedDateEng] = useState("");
  const [acc05IssuedDateNep, setAcc05IssuedDateNep] = useState("");
  const [acc05IssuedDateEng, setAcc05IssuedDateEng] = useState("");
  const [acc05ExpiryDateNep, setAcc05ExpiryDateNep] = useState("");
  const [acc05ExpiryDateEng, setAcc05ExpiryDateEng] = useState("");

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
          setAcc04IssuedDateNep(bsDate);
          setAcc04IssuedDateEng(convertedDate);
        } else if (index === 3) {
          setAcc05IssuedDateNep(adDate);
          setAcc05IssuedDateEng(convertedDate);
        } else if (index === 4) {
          setAcc05ExpiryDateNep(adDate);
          setAcc05ExpiryDateEng(convertedDate);
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

    if (index === 1) {
      setAdDate(adDate);
      setBsDate(convertedDate);
    } else if (index === 2) {
      setAcc04IssuedDateEng(adDate);
      setAcc04IssuedDateNep(convertedDate);
      console.log(convertedDate);
    } else if (index === 3) {
      setAcc05IssuedDateEng(adDate);
      setAcc05IssuedDateNep(convertedDate);
    } else if (index === 4) {
      setAcc05ExpiryDateEng(adDate);
      setAcc05ExpiryDateNep(convertedDate);
    }
  };

  // ////////checking
  useEffect(() => {
    // Perform the desired action whenever `selection` changes
    console.log(formValues);
  }, [formValues, acc04IssuedDateEng]);

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
        const response21 = await fetch(
          ` ${API_URL}/GeneralComponents/GetDistricts`
        );
        const data21 = await response21.json();
        setGeneralDistrictApi(data21);
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
      newValue = parseInt(value);
      console.log("dddddddddddddddddddd"); // Convert value to an integer
    } else if (id === "bool") {
      newValue = JSON.parse(value); // Convert value to an integer
    } else if (name === "aac02dob_eng") {
      const newValues = e.target.value;
      setAdDate(newValues);
      newValue = value;
    } else if (name === "provience1") {
      setProvince1(value);
    } else if (name === "acc06set05uin") {
      newValue = parseInt(value);
    } else {
      newValue = value; // Treat value as a string for other types
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    if (name === "acc06street2") {
      setStreet(value);
    } else if (name === "acc06ward_no2") {
      setWard(value !== "" ? parseInt(value) : value);
    } else if (name === "acc06resident_phone_no2") {
      setResidentPhoneNumber(value !== "" ? parseInt(value) : value);
    } else if (name === "acc06house_no2") {
      setHouse(value !== "" ? parseInt(value) : value);
    } else if (name === "acc06office_no2") {
      setOfficePhoneNumber(value !== "" ? parseInt(value) : value);
    } else if (name === "acc06mobile_no2") {
      setMobileNumber(value !== "" ? parseInt(value) : value);
    }
  };
  useEffect(() => {
    const fetchOtpVerifyData = async () => {
      try {
        const response17 = await fetch(
          `${API_URL}/GeneralComponents/GetDistrictsByProvinceId?id=${province1}`
        );
        const data17 = await response17.json();
        setDistrictApi(data17);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOtpVerifyData();
  }, [province1]);
  useEffect(() => {
    const fetchOtpVerifyData = async () => {
      try {
        const response41 = await fetch(
          `${API_URL}/GeneralComponents/GetMuncipalityByDistrictId?id=${formValues.acc06set04uin}`
        );
        const data41 = await response41.json();
        setMunicipalityApi(data41);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOtpVerifyData();
  }, [formValues.acc06set04uin]);
  //for select-form
  const handleChangeSelect = (selectedOption) => {
    if (selectedOption) {
      const { name, value } = selectedOption;

      setFormValues((prevValues) => ({
        ...prevValues,
        acc02bra01uin: value, // Update the value of the acc02bra01uin property
      }));
    }
  };
  const handleCheckboxChange = () => {
    setSameAsAbove(!sameAsAbove); // Toggle the checkbox state
    if (sameAsAbove) {
      // Reset the dropdown values if sameAsAbove is unchecked
      setProvince("");
      setDistrict("");
      setMunicipality("");
      setWard("");
      setStreet("");
      setHouse("");
      setResidentPhoneNumber("");
      setMobileNumber("");
      setOfficePhoneNumber("");
    } else {
      setProvince(province1);
      setDistrict(formValues.acc06set04uin);
      setMunicipality(formValues.acc06set05uin);
      setWard(formValues.acc06ward_no);
      setStreet(formValues.acc06street);
      setHouse(formValues.acc06house_no);
      setResidentPhoneNumber(formValues.acc06resident_phone_no);
      setMobileNumber(formValues.acc06mobile_no);
      setOfficePhoneNumber(formValues.acc06office_no);
    }
  };
  //disable field value intake
  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,

      acc06set04uin2: parseInt(district) || prevValues.acc06set04uin2,
      acc06set05uin2: parseInt(municipality) || prevValues.acc06set05uin2,
      acc06ward_no2: ward || prevValues.acc06ward_no2,
      acc06street2: street || prevValues.acc06street2,
      acc06house_no2: house || prevValues.acc06house_no2,
      aac02dob_eng: adDate || prevValues.aac02dob_eng,
      acc02dob_nep: bsDate || prevValues.acc02dob_nep,
      acc04issued_date_nep:
        acc04IssuedDateNep || prevValues.acc04issued_date_nep,
      acc04issued_date_eng:
        acc04IssuedDateEng || prevValues.acc04issued_date_eng,
      acc05issued_date_nep:
        acc05IssuedDateNep || prevValues.acc05issued_date_nep,
      acc05issued_date_eng:
        acc05IssuedDateEng || prevValues.acc05issued_date_eng,
      acc05expiry_date_nep:
        acc05ExpiryDateNep || prevValues.acc05expiry_date_nep,
      acc05expiry_date_eng:
        acc05ExpiryDateEng || prevValues.acc05expiry_date_eng,

      acc06resident_phone_no2:
        residentPhoneNumber || prevValues.acc06resident_phone_no2,
      acc06mobile_no2: mobileNumber || prevValues.acc06mobile_no2,
      acc06office_no2: officePhoneNumber || prevValues.acc06office_no2,
    }));
  }, [
    district,
    municipality,
    ward,
    street,
    house,
    adDate,
    bsDate,
    acc04IssuedDateNep,
    acc04IssuedDateEng,
    acc05IssuedDateNep,
    acc05IssuedDateEng,
    acc05ExpiryDateNep,
    acc05ExpiryDateEng,
    residentPhoneNumber,
    mobileNumber,
    officePhoneNumber,
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${API_URL}/AccountInfo/UpdateSavingFormData`; // Replace with your API endpoint URL

    try {
      // Validate the form using Yup
      // await validationSchema.validate(formValues, { abortEarly: false });

      // // Clear form errors if form is valid
      // setFormErrors({});

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
      // if (error.name === "ValidationError") {
      //   //   // Yup validation error
      //   const fieldErrors = {};
      //   error.inner.forEach((validationError) => {
      //     fieldErrors[validationError.path] = validationError.message;
      //   });
      //   setFormErrors(fieldErrors);
      // } else {
      // API request error
      setResponseMessage("An error occurred while submitting the form.");
      setModalIsOpen(true);
      // }
    }
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
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
    <div className="container-fluid mb-5">
      <form onSubmit={handleSubmit}>
        {selection === "no" && (
          <div className="row row justify-content-evenly   " id="saving_form">
            <div className="col-md-12 col-lg-9 col-xl-8" id="form-section">
              <div className="row" id="box-shadow">
                <div className="row">
                  <div className="button">
                    <a href="/">
                      <button className="back-button ps-3">
                        Back
                        <img src="/Assets/images/Exit icon/exit.png" alt />
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
                            checked={formValues.acc02is_local_citizen === 1}
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
                            checked={formValues.acc02is_local_citizen === 2}
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
                            checked={formValues.acc02salutation === 1}
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
                            checked={formValues.acc02salutation === 2}
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
                            checked={formValues.acc02salutation === 3}
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
                            checked={formValues.acc02salutation === 4}
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
                            checked={formValues.acc02salutation === 5}
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
                    </div>

                    <div className="col-md-3">
                      {/* Preferred Branch */}
                      <label htmlFor="branch" className="form-label yolo">
                        Preferred Branch
                      </label>
                      <Select
                        name="acc02bra01uin"
                        id="select_branch"
                        options={branchApi.map((item) => ({
                          value: String(item.bra01uin),
                          label: item.bra01name,
                          name: "acc02bra01uin",
                        }))}
                        value={{
                          label:
                            branchApi.find(
                              (item) =>
                                item.bra01uin ===
                                parseInt(formValues.acc02bra01uin)
                            )?.bra01name || null,
                        }} // Set the value prop to the selectedBranch state
                        onChange={handleChangeSelect}
                      />
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
                        value={formValues.acc02FirstName}
                        onChange={handleChange}
                        name="acc02FirstName"
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
                        value={formValues.acc02MiddleName || ""}
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
                        value={formValues.acc02LastName}
                        onChange={handleChange}
                        name="acc02LastName"
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
                        value={formValues.acc02Mobile_no}
                        onChange={handleChange}
                        name="acc02Mobile_no"
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
                        value={formValues.acc02Email}
                        onChange={handleChange}
                        name="acc02Email"
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
                        value={formValues.acc02phone_no}
                        onChange={handleChange}
                        name="acc02phone_no"
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
                    <div className="col-md-4">
                      {/*Date of Birth B.S. Date Picker*/}
                      <label htmlFor="dob" className="form-label yolo">
                        Date of Birth (B.S.)
                      </label>
                      <NepaliDatePicker
                        inputClassName="form-control"
                        value={bsDate || formValues.acc02dob_nep}
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
                    <div className="col-md-3">
                      {/*Date of Birth A.D. Date Picker*/}
                      <label htmlFor="DOB" className="form-label yolo">
                        Date of Birth (A.D)
                      </label>
                      <input
                        type="date"
                        className="form-control englishDate text dateISO"
                        name="aac02dob_eng"
                        value={adDate || formValues.aac02dob_eng}
                        onChange={(e) => {
                          handleAdDate(e, 1);
                          handleChange(e);
                        }}
                      />
                      {/* {formErrors.aac02dob_eng && (
                        <div className="error">{formErrors.aac02dob_eng}</div>
                      )} */}
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
                        id="inputMobileNumber2"
                        placeholder="Username or URL Link"
                        value={formValues.acc02contact_medium_no || ""}
                        onChange={handleChange}
                        name="acc02contact_medium_no"
                      />
                    </div>
                    {/* CAPTCHA */}

                    {/* <div className="col-12">
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
                    </div> */}
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
                        <img
                          src="/Assets/images/Exit icon/exit.png"
                          alt="..."
                        />
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
                        <label
                          htmlFor="inputGender"
                          className="form-label yolo"
                        >
                          Gender
                        </label>
                        <select
                          className="form-select"
                          id="num"
                          name="acc03Gender"
                          onChange={handleChange}
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
                          name="acc03MaritalStatus"
                          onChange={handleChange}
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
                          name="acc03Nationality"
                          placeholder="Nationality"
                          onChange={handleChange}
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
                          name="acc03Education"
                          onChange={handleChange}
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
                        <div className="col-12  " id="citizenship">
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
                                name="acc04citizenship_no"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label yolo">
                                Date of Issue (B.S.)
                              </label>
                              <NepaliDatePicker
                                inputClassName="form-control"
                                value={acc04IssuedDateNep}
                                onChange={(value) => {
                                  handleBsDate(value, 2);
                                  setFormValues((prevValues) => ({
                                    ...prevValues,
                                    acc04issued_date_nep: value,
                                  }));
                                }}
                                options={{
                                  calenderLocale: "ne",
                                  valueLocale: "en",
                                }}
                              />
                            </div>
                            <div className="col-md-4 ">
                              <label className="form-label yolo">
                                Date of Issue (A.D.)
                              </label>
                              <input
                                type="date"
                                className="form-control englishDate text dateISO"
                                name="acc04issued_date_eng"
                                value={acc04IssuedDateEng}
                                onChange={(e) => {
                                  handleAdDate(e, 2);
                                  handleChange(e);
                                }}
                              />
                            </div>
                            <div className="col-md-4  ">
                              {/*Business Type*/}
                              <label
                                htmlFor="inputbusinesstype"
                                className="form-label yolo "
                              >
                                Place of Issue
                              </label>
                              <select
                                className="form-select"
                                id="num"
                                name="acc04set04uin"
                                onChange={handleChange}
                              >
                                <option value={0} selected disabled>
                                  Place of Issue
                                </option>
                                {genaraldistrictApi.map((item) => (
                                  <option
                                    key={item.bindField}
                                    value={item.bindField}
                                  >
                                    {item.displayField}
                                  </option>
                                ))}
                              </select>
                              {/* {formErrors.acc04set04uin && (
                                <div className="error">
                                  {formErrors.acc04set04uin}
                                </div>
                              )} */}
                            </div>
                            <div className="col-md-4">
                              <label className="form-label yolo">
                                Office of Issue *
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputCitizenshipNumber"
                                name="acc04issued_office"
                                onChange={handleChange}
                              />
                            </div>
                            <div className="col-md-4">
                              <label className="form-label yolo">PAN *</label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputCitizenshipNumber"
                                name="acc04Pan"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          {/* passport form */}
                          <div className=" col-12  pd-2 " id="passport">
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
                                  name="acc05passport_no"
                                  onChange={handleChange}
                                />
                              </div>

                              <div className="col-md-4">
                                <label
                                  htmlFor="inputPIssueAuthority"
                                  className="form-label yolo required"
                                >
                                  Issuing Office *
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="inputIssue"
                                  name="acc05issued_office"
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="col-md-4 ">
                                <label
                                  htmlFor="inputDateIssuue"
                                  className="form-label yolo required"
                                >
                                  Date of Issue (B.S.)
                                </label>
                                <NepaliDatePicker
                                  inputClassName="form-control"
                                  value={acc05IssuedDateNep}
                                  onChange={(value) => {
                                    handleBsDate(value, 3);
                                    setFormValues((prevValues) => ({
                                      ...prevValues,
                                      acc05issued_date_nep: value,
                                    }));
                                  }}
                                  options={{
                                    calenderLocale: "ne",
                                    valueLocale: "en",
                                  }}
                                />
                              </div>
                              <div className="col-md-4 ">
                                <label
                                  htmlFor="inputDate"
                                  className="form-label yolo required"
                                >
                                  Date of Issue (A.D.)
                                </label>
                                <input
                                  type="date"
                                  className="form-control englishDate text dateISO"
                                  name="acc05issued_date_eng"
                                  value={acc05IssuedDateEng}
                                  onChange={(e) => {
                                    handleAdDate(e, 3);
                                    handleChange(e);
                                  }}
                                />
                              </div>
                              <div className="col-md-4 ">
                                <label
                                  htmlFor="InputeExpiry"
                                  className="form-label yolo required"
                                >
                                  Date Of Expiry(B.S.)
                                </label>
                                <NepaliDatePicker
                                  inputClassName="form-control"
                                  value={acc05ExpiryDateNep}
                                  onChange={(value) => {
                                    handleBsDate(value, 4);
                                    setFormValues((prevValues) => ({
                                      ...prevValues,
                                      acc05expiry_date_nep: value,
                                    }));
                                  }}
                                  options={{
                                    calenderLocale: "ne",
                                    valueLocale: "en",
                                  }}
                                />
                              </div>
                              <div className="col-md-4 ">
                                <label
                                  htmlFor="InputIDExpiry"
                                  className="form-label yolo required"
                                >
                                  Date Of Expiry(A.D.)
                                </label>
                                <input
                                  type="date"
                                  className="form-control englishDate text dateISO"
                                  name="acc05expiry_date_eng"
                                  value={acc05ExpiryDateEng}
                                  onChange={(e) => {
                                    handleAdDate(e, 4);
                                    handleChange(e);
                                  }}
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
                      <img src="/Assets/images/Exit icon/exit.png" alt="..." />
                    </button>
                  </div>
                </div>

                <div className="col-12 mt-4 ">
                  <h3 className="p-3">Address Details</h3>
                  <h5 id="personal-details">Permanent Address</h5>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputProvince" className="form-label yolo">
                    Province
                  </label>
                  <select
                    className="form-select"
                    name="provience1"
                    onChange={handleChange}
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
                    id="num"
                    className="form-select"
                    name="acc06set04uin"
                    onChange={handleChange}
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
                    id="num"
                    className="form-select"
                    name="acc06set05uin"
                    onChange={handleChange}
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
                    name="acc06ward_no"
                    maxLength={2}
                    onChange={handleChange}
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
                    name="acc06street"
                    maxLength={10}
                    onChange={handleChange}
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
                    name="acc06house_no"
                    maxLength={100}
                    onChange={handleChange}
                  />
                  {/* {formErrors.kyc03house_no && (
                   <div className="error">{formErrors.kyc03house_no}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <span className="text-danger">*</span>
                  <label htmlFor="inputHouseNumber" className="form-label yolo">
                    Office Phone Number
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    id="num"
                    type="text"
                    className="form-control"
                    placeholder
                    name="acc06office_no"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputHouseNumber" className="form-label yolo">
                    {" "}
                    Resident Phone Number
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    id="num"
                    type="text"
                    className="form-control"
                    placeholder
                    name="acc06resident_phone_no"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputHouseNumber" className="form-label yolo">
                    Mobile Number
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    id="num"
                    placeholder
                    name="acc06mobile_no"
                    onChange={handleChange}
                  />
                </div>

                {/* same asa above */}
                <div className="col-12 mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={sameAsAbove}
                    onChange={handleCheckboxChange}
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
                    name="acc06set04uin2"
                    value={district}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      handleChange(e);
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
                    name="acc06set05uin2"
                    value={municipality}
                    onChange={(e) => {
                      setMunicipality(e.target.value);
                      handleChange(e);
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
                    type="text"
                    className="form-control syncSame numberOnly"
                    id="num"
                    name="acc06ward_no2"
                    value={ward}
                    maxLength={2}
                    onChange={handleChange2}
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
                    name="acc06street2"
                    maxLength={10}
                    value={street}
                    onChange={handleChange2}
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
                    name="acc06house_no2"
                    maxLength={100}
                    onChange={handleChange2}
                    value={house}
                    disabled={sameAsAbove}
                  />
                  {/* {formErrors.kyc03house_no_temp && !sameAsAbove && (
                   <div className="error">{formErrors.kyc03house_no_temp}</div>
                 )} */}
                </div>
                <div className="col-md-5">
                  <span className="text-danger">*</span>
                  <label htmlFor="inputHouseNumber" className="form-label yolo">
                    Office Phone Number
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    id="num"
                    name="acc06office_no2"
                    onChange={handleChange2}
                    value={officePhoneNumber}
                    disabled={sameAsAbove}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputHouseNumber" className="form-label yolo">
                    {" "}
                    Resident Phone Number
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder
                    name="acc06resident_phone_no2"
                    id="num"
                    onChange={handleChange2}
                    value={residentPhoneNumber}
                    disabled={sameAsAbove}
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputHouseNumber" className="form-label yolo">
                    Mobile Number
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder
                    id="num"
                    name="acc06mobile_no2"
                    onChange={handleChange2}
                    value={mobileNumber}
                    disabled={sameAsAbove}
                  />
                </div>

                <div className="col-12 mt-5 mb-5 d-flex justify-content-between">
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
                        <img
                          src="/Assets/images/Exit icon/exit.png"
                          alt="..."
                        />
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
                        <img
                          src="/Assets/images/Exit icon/exit.png"
                          alt="..."
                        />
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

export default SavingacctformSecond;
