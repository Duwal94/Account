import { useState, useEffect } from "react";
import useFormValues from "../States/KYC.tsx";
import Select from "react-select";
import Modal from "react-modal";
import {
  useFormValidationSchema,
  useStateValidationSchema,
} from "../Validation/KycVaild";
import { API_URL } from "../Utilities/Constants";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import NepaliDate from "nepali-date-converter";

function OnlineKyc() {
  const [selection, setSelection] = useState("terms");
  const [internalRadio, setInternalradio] = useState("citizen");
  const [districtApi, setDistrictApi] = useState([]);
  const [districtApi2, setDistrictApi2] = useState([]);
  const [genaraldistrictApi, setGeneralDistrictApi] = useState([]);

  const [branchApi, setBranchApi] = useState([]);
  const [provienceApi, setProvienceApi] = useState([]);
  const [municipalityApi, setMunicipalityApi] = useState([]);
  const [municipalityApi2, setMunicipalityApi2] = useState([]);
  const [sameAsAbove, setSameAsAbove] = useState(false);

  const [province, setProvince] = useState(""); // Store the selected province value
  const [district, setDistrict] = useState(""); // Store the selected district value
  const [municipality, setMunicipality] = useState(""); // Store the selected municipality value
  const [ward, setWard] = useState(""); // Store the selected municipality value
  const [street, setStreet] = useState(""); // Store the selected municipality value
  const [house, setHouse] = useState(""); // Store the selected municipality value
  const [bsDate, setBsDate] = useState("");
  const [adDate, setAdDate] = useState("");
  const [kyc04IssuedDateNep, setKyc04IssuedDateNep] = useState("");
  const [kyc04IssuedDateEng, setKyc04IssuedDateEng] = useState("");

  const [kyc04PassportIssuedDateNep, setKyc04PassportIssuedDateNep] =
    useState("");
  const [kyc04PassportIssuedDateEng, setKyc04PassportIssuedDateEng] =
    useState("");

  const [kyc04ExpiryDateNep, setKyc04ExpiryDateNep] = useState("");
  const [kyc04ExpiryDateEng, setKyc04ExpiryDateEng] = useState("");

  const [kyc04VisaIssueDateNep, setKyc04VisaIssueDateNep] = useState("");
  const [kyc04VisaIssueDateEng, setKyc04VisaIssueDateEng] = useState("");

  const [kyc04VisaExpiryDateNep, setKyc04VisaExpiryDateNep] = useState("");
  const [kyc04VisaExpiryDateEng, setKyc04VisaExpiryDateEng] = useState("");

  const [kyc04VoterIdIssuedDateNep, setKyc04VoterIdIssuedDateNep] =
    useState("");
  const [kyc04VoterIdIssuedDateEng, setKyc04VoterIdIssuedDateEng] =
    useState("");

  const [formErrors, setFormErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("hello");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const eligibilityType = internalRadio; // Set the eligibilityType value here
  const formstates = selection;
  const validationStates = useStateValidationSchema(formstates);
  const validationSchema = useFormValidationSchema(eligibilityType);

  const [formValues, setFormValues] = useFormValues(eligibilityType);

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
          setKyc04IssuedDateNep(bsDate);
          setKyc04IssuedDateEng(convertedDate);
        } else if (index === 3) {
          setKyc04PassportIssuedDateNep(adDate);
          setKyc04PassportIssuedDateEng(convertedDate);
        } else if (index === 4) {
          setKyc04ExpiryDateNep(adDate);
          setKyc04ExpiryDateEng(convertedDate);
        } else if (index === 5) {
          setKyc04VisaIssueDateNep(adDate);
          setKyc04VisaIssueDateEng(convertedDate);
        } else if (index === 6) {
          setKyc04VisaExpiryDateNep(adDate);
          setKyc04VisaExpiryDateEng(convertedDate);
        } else if (index === 7) {
          setKyc04VoterIdIssuedDateNep(adDate);
          setKyc04VoterIdIssuedDateEng(convertedDate);
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
      setKyc04IssuedDateEng(adDate);
      setKyc04IssuedDateNep(convertedDate);
    } else if (index === 3) {
      setKyc04PassportIssuedDateEng(adDate);
      setKyc04PassportIssuedDateNep(convertedDate);
    } else if (index === 4) {
      setKyc04ExpiryDateEng(adDate);
      setKyc04ExpiryDateNep(convertedDate);
    } else if (index === 5) {
      setKyc04VisaIssueDateEng(adDate);
      setKyc04VisaIssueDateNep(convertedDate);
    } else if (index === 6) {
      setKyc04VisaExpiryDateEng(adDate);
      setKyc04VisaExpiryDateNep(convertedDate);
    } else if (index === 7) {
      setKyc04VoterIdIssuedDateEng(adDate);
      setKyc04VoterIdIssuedDateNep(convertedDate);
    }
  };

  // ////////checking
  useEffect(() => {
    // Perform the desired action whenever `selection` changes
    console.log(formValues);
  }, [formValues]);

  const handleChangeSelection = async (newValue) => {
    try {
      // Validate the form using Yup
      await validationStates.validate(formValues, { abortEarly: false });

      // Clear form errors if the form is valid
      setFormErrors({});
      setSelection(newValue);
    } catch (error) {
      if (error.name === "ValidationError") {
        // Yup validation error
        const fieldErrors = {};
        error.inner.forEach((validationError) => {
          fieldErrors[validationError.path] = validationError.message;
        });
        setFormErrors(fieldErrors);
      }
    }
  };

  const handlePrevious = (newValue) => {
    setSelection(newValue);
  };

  const handleSelectionChangeRadio = (event) => {
    setSelection(event.target.value);
  };
  const handleSelectionChangeIntenalRadio = (event) => {
    setInternalradio(event.target.value);
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
    } else if (name === "kyc03set03uin") {
      newValue = parseInt(value);
    } else if (name === "kyc03set04uin") {
      newValue = parseInt(value);
    } else if (name === "kyc03set05uin") {
      newValue = parseInt(value);
    } else {
      newValue = value; // Treat value as a string for other types
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };
  //set ward
  const handleChange2 = (event) => {
    const { name, value } = event.target;
    if (name === "kyc03ward_no_temp") {
      setWard(value);
    } else if (name === "kyc03street_temp") {
      setStreet(value);
    } else {
      setHouse(value);
    } // Update the ward state with the new value
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response3 = await fetch(`${API_URL}/KYC/GetProvienceList`);
        const data3 = await response3.json();
        setProvienceApi(data3);

        const response2 = await fetch(`${API_URL}/GeneralComponents/Branch`);
        const data2 = await response2.json();
        setBranchApi(data2);
        const response7 = await fetch(
          ` ${API_URL}/GeneralComponents/GetDistricts`
        );
        const data7 = await response7.json();
        setGeneralDistrictApi(data7);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchOtpVerifyData = async () => {
      try {
        const response1 = await fetch(
          `${API_URL}/KYC/GetDistrictsByProvinceId?id=${formValues.kyc03set03uin}`
        );
        const data1 = await response1.json();
        setDistrictApi(data1);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOtpVerifyData();
  }, [formValues.kyc03set03uin]);
  useEffect(() => {
    const fetchOtpVerifyData = async () => {
      try {
        const response4 = await fetch(
          `${API_URL}/KYC/GetMuncipalityByDistrictId?id=${formValues.kyc03set04uin}`
        );
        const data4 = await response4.json();
        setMunicipalityApi(data4);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOtpVerifyData();
  }, [formValues.kyc03set04uin]);
  useEffect(() => {
    const fetchOtpVerifyData2 = async () => {
      try {
        const response1 = await fetch(
          `${API_URL}/KYC/GetDistrictsByProvinceId?id=${formValues.kyc03set03uin_temp}`
        );
        const data1 = await response1.json();
        setDistrictApi2(data1);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOtpVerifyData2();
  }, [formValues.kyc03set03uin_temp]);
  useEffect(() => {
    const fetchOtpVerifyData2 = async () => {
      try {
        const response4 = await fetch(
          `${API_URL}/KYC/GetMuncipalityByDistrictId?id=${formValues.kyc03set04uin_temp}`
        );
        const data4 = await response4.json();
        setMunicipalityApi2(data4);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOtpVerifyData2();
  }, [formValues.kyc03set04uin_temp]);
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
    } else {
      setProvince(formValues.kyc03set03uin);
      setDistrict(formValues.kyc03set04uin);
      setMunicipality(formValues.kyc03set05uin);
      setWard(formValues.kyc03ward_no);
      setStreet(formValues.kyc03street);
      setHouse(formValues.kyc03house_no);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${API_URL}/KYC`; // Replace with your API endpoint URL

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      // Validate the form using Yup
      await validationSchema.validate(formValues, { abortEarly: false });

      // // Clear form errors if form is valid
      setFormErrors({});

      // Send POST request to the API endpoint
      const response = await fetch(url, {
        method: "POST",
        body: formData,
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
      // // Handle error
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
  //disable field value intake
  useEffect(() => {
    setFormValues((prevValues) => {
      let updatedValues = { ...prevValues };

      updatedValues.kyc03set03uin_temp =
        province || prevValues.kyc03set03uin_temp;
      updatedValues.kyc03set04uin_temp =
        district || prevValues.kyc03set04uin_temp;
      updatedValues.kyc03set05uin_temp =
        municipality || prevValues.kyc03set05uin_temp;
      updatedValues.kyc03ward_no_temp = ward || prevValues.kyc03ward_no_temp;
      updatedValues.kyc03street_temp = street || prevValues.kyc03street_temp;
      updatedValues.kyc03house_no_temp = house || prevValues.kyc03house_no_temp;
      updatedValues.kyc01dob_eng = adDate || prevValues.kyc01dob_eng;
      updatedValues.kyc01dob_nep = bsDate || prevValues.kyc01dob_nep;

      if (internalRadio === "citizen") {
        updatedValues.kyc04issued_date_nep =
          kyc04IssuedDateNep || prevValues.kyc04issued_date_nep;
        updatedValues.kyc04issued_date_eng =
          kyc04IssuedDateEng || prevValues.kyc04issued_date_eng;
      } else if (internalRadio === "passport") {
        updatedValues.kyc04passport_issued_date_nep =
          kyc04PassportIssuedDateNep ||
          prevValues.kyc04passport_issued_date_nep;
        updatedValues.kyc04passport_issued_date_eng =
          kyc04PassportIssuedDateEng ||
          prevValues.kyc04passport_issued_date_eng;

        updatedValues.kyc04visa_issue_date_nep =
          kyc04VisaIssueDateNep || prevValues.kyc04visa_issue_date_nep;
        updatedValues.kyc04visa_issue_date_eng =
          kyc04VisaIssueDateEng || prevValues.kyc04visa_issue_date_eng;

        updatedValues.kyc04expiry_date_eng =
          kyc04ExpiryDateEng || prevValues.kyc04expiry_date_eng;
        updatedValues.kyc04expiry_date_nep =
          kyc04ExpiryDateNep || prevValues.kyc04expiry_date_nep;

        updatedValues.kyc04visa_expiry_date_nep =
          kyc04VisaExpiryDateNep || prevValues.kyc04visa_expiry_date_nep;
        updatedValues.kyc04visa_expiry_date_eng =
          kyc04VisaExpiryDateEng || prevValues.kyc04visa_expiry_date_eng;
      } else if (internalRadio === "voter") {
        updatedValues.kyc04voterid_issued_date_nep =
          kyc04VoterIdIssuedDateNep || prevValues.kyc04voterid_issued_date_nep;
        updatedValues.kyc04voterid_issued_date_eng =
          kyc04VoterIdIssuedDateEng || prevValues.kyc04voterid_issued_date_eng;
      }

      // Continue adding if-else conditions for other fields as needed

      return updatedValues;
    });
  }, [
    province,
    district,
    municipality,
    ward,
    street,
    house,
    adDate,
    bsDate,
    kyc04IssuedDateNep,
    kyc04IssuedDateEng,
    kyc04PassportIssuedDateNep,
    kyc04PassportIssuedDateEng,
    kyc04VisaIssueDateNep,
    kyc04VisaIssueDateEng,
    kyc04VisaExpiryDateNep,
    kyc04VisaExpiryDateEng,
    kyc04VoterIdIssuedDateNep,
    kyc04VoterIdIssuedDateEng,
    kyc04ExpiryDateEng,
    kyc04ExpiryDateNep,
    eligibilityType, // Add eligibilityType as a dependency
  ]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row " id="kyc_banner">
          <div className="col-12 pcolor mb-5" id="loan">
            <h4 className="card-title text-warning">KYC Form</h4>
          </div>
        </div>
        {/*Terms and Conditions section for KYC Page*/}
        {selection === "terms" && (
          <div
            className="row justify-content-evenly  mt-5 mb-5 rounded-3"
            id="terms"
          >
            <div className="col-8 ">
              <div
                className="row justify-content-evenly rounded-3"
                id="form"
                style={{ backgroundColor: "#FAFBFF" }}
              >
                <div className="col-12">
                  <div className="row">
                    <div className="col-12 mt-5 mb-2" id="loantype">
                      <p className="text-center">Terms and Conditions</p>
                    </div>
                  </div>
                </div>
                <div className="col-10">
                  <div
                    className="row justify-content-evenly  pt-4 mb-4"
                    id="inner-box"
                  >
                    <div className="col-12">
                      <p>
                        You can acquire Content on our Services for free or for
                        a charge, either of which is referred to as a
                        “Transaction.” Each Transaction is an electronic
                        contract between you and Apple, and/or you and the
                        entity providing the Content on our Services. However,
                        if you are a customer of Apple Distribution
                        International Ltd., Apple Distribution International
                        Ltd. is the merchant of record for some Content you
                        acquire from Apple Books, Apple Podcasts, or App Store
                        as displayed on the product page and/or during the
                        acquisition process for the relevant Service. In such
                        case, you acquire the Content from Apple Distribution
                        International Ltd., which is licensed by the Content
                        provider (e.g., App Provider (as defined below), book
                        publisher, etc.). When you make your first Transaction,
                        we will ask you to choose how frequently we should ask
                        for your password for future Transactions. On applicable
                        Apple hardware, if you enable Touch ID for Transactions,
                        we will ask you to authenticate all Transactions with
                        your fingerprint, and if you enable Face ID for
                        Transactions, we will ask you to authenticate all
                        Transactions using facial recognition. Manage your
                        password settings at any time by following these
                        instructions: https://support.apple.com/HT204030.
                      </p>
                      <p>
                        You can acquire Content on our Services for free or for
                        a charge, either of which is referred to as a
                        “Transaction.” Each Transaction is an electronic
                        contract between you and Apple, and/or you and the
                        entity providing the Content on our Services. However,
                        if you are a customer of Apple Distribution
                        International Ltd., Apple Distribution International
                        Ltd. is the merchant of record for some Content you
                        acquire from Apple Books, Apple Podcasts, or App Store
                        as displayed on the product page and/or during the
                        acquisition process for the relevant Service. In such
                        case, you acquire the Content from Apple Distribution
                        International Ltd., which is licensed by the Content
                        provider (e.g., App Provider (as defined below), book
                        publisher, etc.). When you make your first Transaction,
                        we will ask you to choose how frequently we should ask
                        for your password for future Transactions. On applicable
                        Apple hardware, if you enable Touch ID for Transactions,
                        we will ask you to authenticate all Transactions with
                        your fingerprint, and if you enable Face ID for
                        Transactions, we will ask you to authenticate all
                        Transactions using facial recognition. Manage your
                        password settings at any time by following these
                        instructions: https://support.apple.com/HT204030.
                      </p>
                      <p>
                        You can acquire Content on our Services for free or for
                        a charge, either of which is referred to as a
                        “Transaction.” Each Transaction is an electronic
                        contract between you and Apple, and/or you and the
                        entity providing the Content on our Services. However,
                        if you are a customer of Apple Distribution
                        International Ltd., Apple Distribution International
                        Ltd. is the merchant of record for some Content you
                        acquire from Apple Books, Apple Podcasts, or App Store
                        as displayed on the product page and/or during the
                        acquisition process for the relevant Service. In such
                        case, you acquire the Content from Apple Distribution
                        International Ltd., which is licensed by the Content
                        provider (e.g., App Provider (as defined below), book
                        publisher, etc.). When you make your first Transaction,
                        we will ask you to choose how frequently we should ask
                        for your password for future Transactions. On applicable
                        Apple hardware, if you enable Touch ID for Transactions,
                        we will ask you to authenticate all Transactions with
                        your fingerprint, and if you enable Face ID for
                        Transactions, we will ask you to authenticate all
                        Transactions using facial recognition. Manage your
                        password settings at any time by following these
                        instructions: https://support.apple.com/HT204030.
                      </p>
                      <p>
                        You can acquire Content on our Services for free or for
                        a charge, either of which is referred to as a
                        “Transaction.” Each Transaction is an electronic
                        contract between you and Apple, and/or you and the
                        entity providing the Content on our Services. However,
                        if you are a customer of Apple Distribution
                        International Ltd., Apple Distribution International
                        Ltd. is the merchant of record for some Content you
                        acquire from Apple Books, Apple Podcasts, or App Store
                        as displayed on the product page and/or during the
                        acquisition process for the relevant Service. In such
                        case, you acquire the Content from Apple Distribution
                        International Ltd., which is licensed by the Content
                        provider (e.g., App Provider (as defined below), book
                        publisher, etc.). When you make your first Transaction,
                        we will ask you to choose how frequently we should ask
                        for your password for future Transactions. On applicable
                        Apple hardware, if you enable Touch ID for Transactions,
                        we will ask you to authenticate all Transactions with
                        your fingerprint, and if you enable Face ID for
                        Transactions, we will ask you to authenticate all
                        Transactions using facial recognition. Manage your
                        password settings at any time by following these
                        instructions: https://support.apple.com/HT204030.
                      </p>
                      <p>
                        You can acquire Content on our Services for free or for
                        a charge, either of which is referred to as a
                        “Transaction.” Each Transaction is an electronic
                        contract between you and Apple, and/or you and the
                        entity providing the Content on our Services. However,
                        if you are a customer of Apple Distribution
                        International Ltd., Apple Distribution International
                        Ltd. is the merchant of record for some Content you
                        acquire from Apple Books, Apple Podcasts, or App Store
                        as displayed on the product page and/or during the
                        acquisition process for the relevant Service. In such
                        case, you acquire the Content from Apple Distribution
                        International Ltd., which is licensed by the Content
                        provider (e.g., App Provider (as defined below), book
                        publisher, etc.). When you make your first Transaction,
                        we will ask you to choose how frequently we should ask
                        for your password for future Transactions. On applicable
                        Apple hardware, if you enable Touch ID for Transactions,
                        we will ask you to authenticate all Transactions with
                        your fingerprint, and if you enable Face ID for
                        Transactions, we will ask you to authenticate all
                        Transactions using facial recognition. Manage your
                        password settings at any time by following these
                        instructions: https://support.apple.com/HT204030.
                      </p>
                      <p>
                        You can acquire Content on our Services for free or for
                        a charge, either of which is referred to as a
                        “Transaction.” Each Transaction is an electronic
                        contract between you and Apple, and/or you and the
                        entity providing the Content on our Services. However,
                        if you are a customer of Apple Distribution
                        International Ltd., Apple Distribution International
                        Ltd. is the merchant of record for some Content you
                        acquire from Apple Books, Apple Podcasts, or App Store
                        as displayed on the product page and/or during the
                        acquisition process for the relevant Service. In such
                        case, you acquire the Content from Apple Distribution
                        International Ltd., which is licensed by the Content
                        provider (e.g., App Provider (as defined below), book
                        publisher, etc.). When you make your first Transaction,
                        we will ask you to choose how frequently we should ask
                        for your password for future Transactions. On applicable
                        Apple hardware, if you enable Touch ID for Transactions,
                        we will ask you to authenticate all Transactions with
                        your fingerprint, and if you enable Face ID for
                        Transactions, we will ask you to authenticate all
                        Transactions using facial recognition. Manage your
                        password settings at any time by following these
                        instructions: https://support.apple.com/HT204030.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 d-flex justify-content-center mb-4 "
                  style={{ backgroundColor: "#FAFBFF" }}
                >
                  <button type="button" className="btn text-dark" id="decline">
                    Decline
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark text-danger ps-4 pe-4"
                    id="agree"
                    onClick={() => handleChangeSelection("Account")}
                  >
                    {" "}
                    I Agree
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/*Verification Section inorder to Proceed*/}
        {selection === "Account" && (
          <div className="row justify-content-evenly  mt-5 mb-5" id="verify">
            <div
              className="col-md-11 col-lg-9 col-xl-8"
              id="form-section"
              style={{ backgroundColor: "#FAFBFF" }}
            >
              <div className="row">
                <div className="button">
                  <button
                    className="back-button ps-3"
                    onClick={() => handlePrevious("terms")}
                  >
                    Back
                    <img src="/Assets/images/Exit icon/exit.png" alt="..." />
                  </button>
                </div>
              </div>
              <div className="row mt-5 mb-5">
                <div className="col-12 text-center">
                  <p>
                    Do you already have KYC Account with
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
                        onChange={handleSelectionChangeRadio}
                      />
                      <label className="form-check-label" htmlFor="yes_switch">
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
                        onChange={handleSelectionChangeRadio}
                      />
                      <label className="form-check-label" htmlFor="no_switch">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* General Details Form section starts */}
        {selection === "no" && (
          <div className="row justify-content-evenly  mt-5 mb-5" id="generald">
            <div className="col-md-11 col-lg-9 col-xxl-8">
              <div
                className="row"
                id="box-shadow"
                style={{ backgroundColor: "#FAFBFF" }}
              >
                <div className="row">
                  <div className="button">
                    <button
                      className="back-button ps-3"
                      onClick={() => handlePrevious("Account")}
                    >
                      Back
                      <img src="/Assets/images/Exit icon/exit.png" alt="..." />
                    </button>
                  </div>
                </div>
                <div className="row ps-5">
                  <div className="col-md-5">
                    {/* Preferred Branch */}
                    <label htmlFor="branch" className="form-label yolo">
                      Preferred Branch
                    </label>
                    <Select
                      name="kyc01bra01uin"
                      id="select_branch"
                      onChange={handleChangeSelect}
                      options={branchApi.map((item) => ({
                        value: item.bra01uin,
                        label: item.bra01name,
                        name: "kyc01bra01uin",
                      }))}
                      placeholder="Name of the Branch"
                    />

                    {formErrors.kyc01bra01uin && (
                      <div className="error">{formErrors.kyc01bra01uin}</div>
                    )}
                  </div>
                  <div className="col-md-5">
                    {" "}
                    {/*Saluation Drop Down*/}
                    <label
                      htmlFor="validationAccount"
                      className="form-label yolo"
                      id="Online"
                    >
                      Salutation
                    </label>
                    <div>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="kyc01salutation"
                        id="inlineRadio1"
                        defaultValue="0"
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Mr.
                      </label>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="kyc01salutation"
                          id="inlineRadio2"
                          defaultValue="1"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          Mrs.
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="kyc01salutation"
                          id="inlineRadio3"
                          defaultValue="4"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          M/S
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="kyc01salutation"
                          id="inlineRadio3"
                          defaultValue="2"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          Miss
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="kyc01salutation"
                          id="inlineRadio3"
                          defaultValue="3"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio3"
                        >
                          Minor
                        </label>
                      </div>
                    </div>
                    {formErrors.kyc01salutation && (
                      <div className="error">{formErrors.kyc01salutation}</div>
                    )}
                  </div>
                  <div className="col-12 mt-4">
                    {" "}
                    {/*PERSONAL DETAILS TITLE*/}
                    <h5 id="personal-details">Personal Details</h5>
                  </div>
                  <div className="col-md-4 ">
                    {" "}
                    {/*First Name Field*/}
                    <label
                      htmlFor="validationname"
                      className="form-label yolo"
                      id="Online"
                      placeholder="First Name"
                    >
                      First Name
                    </label>
                    <input
                      type="firstname"
                      className="form-control"
                      name="kyc01first_name"
                      placeholder="First Name"
                      onChange={handleChange}
                    />
                    {formErrors.kyc01first_name && (
                      <div className="error">{formErrors.kyc01first_name}</div>
                    )}
                    <div className="invalid-feedback">
                      You cannot have this field empty!!
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    {/*Middle Name Field*/}
                    <label
                      htmlFor="inputMiddleName"
                      className="form-label yolo"
                    >
                      Middle Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Middle Name"
                      name="kyc01middle_name"
                      onChange={handleChange}
                    />
                    {formErrors.kyc01middle_name && (
                      <div className="error">{formErrors.kyc01middle_name}</div>
                    )}
                  </div>

                  <div className="col-md-3">
                    {" "}
                    {/*Last Name Field*/}
                    <label htmlFor="inputLastName" className="form-label yolo">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputLastName"
                      placeholder="Last Name"
                      name="kyc01last_name"
                      onChange={handleChange}
                    />
                    {formErrors.kyc01last_name && (
                      <div className="error">{formErrors.kyc01last_name}</div>
                    )}
                  </div>

                  <div className="col-md-4">
                    {" "}
                    {/*Mobile Number Field*/}
                    <label
                      htmlFor="inputMobileNumber"
                      className="form-label yolo"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="num"
                      placeholder="+977 9898989898"
                      name="kyc01mobile_no"
                      onChange={handleChange}
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
                    {formErrors.kyc01mobile_no && (
                      <div className="error">{formErrors.kyc01mobile_no}</div>
                    )}
                  </div>
                  <div className="col-md-4">
                    {" "}
                    {/*Email Address Field*/}
                    <label htmlFor="inputEmail" className="form-label yolo">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail"
                      placeholder="username@gmail.com"
                      name="kyc01email"
                      onChange={handleChange}
                    />
                    {formErrors.kyc01email && (
                      <div className="error">{formErrors.kyc01email}</div>
                    )}
                  </div>
                  <div className="col-md-3">
                    {" "}
                    {/*Telephone Number Field*/}
                    <label
                      htmlFor="inputTelephoneNumber"
                      className="form-label yolo"
                    >
                      Telephone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="num"
                      placeholder="01-0024984"
                      name="kyc01phone_no"
                      onChange={handleChange}
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
                    {formErrors.kyc01phone_no && (
                      <div className="error">{formErrors.kyc01phone_no}</div>
                    )}
                  </div>
                  <div className="col-md-4">
                    {" "}
                    {/*Mobile Number 2 Field*/}
                    <label
                      htmlFor="inputMobileNumber2"
                      className="form-label yolo"
                    >
                      Mobile Number 2 (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="num"
                      placeholder="01-0024984"
                      onChange={handleChange}
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
                  </div>
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
                          kyc01dob_nep: value,
                        }));
                      }}
                      options={{ calenderLocale: "ne", valueLocale: "en" }}
                    />
                    {formErrors.kyc01dob_nep && (
                      <div className="error">{formErrors.kyc01dob_nep}</div>
                    )}
                  </div>
                  <div className="col-md-3">
                    {/*Date of Birth A.D. Date Picker*/}
                    <label htmlFor="DOB" className="form-label yolo">
                      Date of Birth (A.D)
                    </label>
                    <input
                      type="date"
                      className="form-control englishDate text dateISO"
                      name="kyc01dob_eng"
                      value={adDate}
                      onChange={(e) => {
                        handleAdDate(e, 1);
                        handleChange(e);
                      }}
                    />
                    {formErrors.kyc01dob_eng && (
                      <div className="error">{formErrors.kyc01dob_eng}</div>
                    )}
                  </div>
                  <div className="col-md-4">
                    {" "}
                    {/*Social Network Selection and Details*/}
                    <label htmlFor="Social Network" className="form-label yolo">
                      Social Network
                    </label>
                    <div
                      className="container"
                      style={{
                        borderWidth: "0px 1px",
                        borderStyle: "solid",
                        borderColor: "#b9b9b9",
                        borderRadius: "5px 6px 0px 0px",
                      }}
                    >
                      <div className="img p-2">
                        <img
                          src="/Assets/images/After_Verification/Social Network/Facebook.png"
                          style={{ padding: 10 }}
                          alt="..."
                        />
                        <img
                          src="/Assets/images/After_Verification/Social Network/Twitter.png"
                          style={{ padding: 10 }}
                          alt="..."
                        />
                        <img
                          src="/Assets/images/After_Verification/Social Network/LinkedIn.png"
                          style={{ padding: 10 }}
                          alt="..."
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="num"
                      placeholder="Username or URL Link"
                      name="kyc01contact_medium_id"
                      onChange={handleChange}
                    />
                    {formErrors.kyc01contact_medium_id && (
                      <div className="error">
                        {formErrors.kyc01contact_medium_id}
                      </div>
                    )}
                  </div>
                  <div className="col-12 mt-5">
                    {" "}
                    {/*Family Details Section*/}
                    <h5 id="family-details">Family Details</h5> {/*TITLE*/}
                    <div className="row gx-4 gy-4">
                      <div className="col-12 col-md-6">
                        {" "}
                        {/*Grand Father's Name*/}
                        <label
                          htmlFor="inputGrandPaName"
                          className="form-label yolo"
                        >
                          GrandFather's Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputGrandPaName"
                          placeholder="GrandFather's Name"
                          name="kyc02grandfather_name"
                          onChange={handleChange}
                        />
                        {formErrors.kyc02grandfather_name && (
                          <div className="error">
                            {formErrors.kyc02grandfather_name}
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-md-5">
                        {" "}
                        {/*Grand Father's Nationality*/}
                        <label
                          htmlFor="inputGrandPaNationality"
                          className="form-label yolo"
                        >
                          GrandFather's Nationality
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputGrandPaNationality"
                          placeholder="GrandFather's Name"
                          name="kyc02grandfather_nationality"
                          onChange={handleChange}
                        />
                        {formErrors.kyc02grandfather_nationality && (
                          <div className="error">
                            {formErrors.kyc02grandfather_nationality}
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-md-6">
                        {" "}
                        {/*Father's Name*/}
                        <label
                          htmlFor="inputFatherName"
                          className="form-label yolo"
                        >
                          Father's Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputFatherName"
                          placeholder="Father's Name"
                          name="kyc02father_name"
                          onChange={handleChange}
                        />
                        {formErrors.kyc02father_name && (
                          <div className="error">
                            {formErrors.kyc02father_name}
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-md-5">
                        {" "}
                        {/*Father's Nationality*/}
                        <label
                          htmlFor="inputFatherNationality"
                          className="form-label yolo"
                        >
                          Father's Nationality
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputFatherNationality"
                          placeholder="Father's Nationality"
                          name="kyc02father_nationality"
                          onChange={handleChange}
                        />
                        {formErrors.kyc02father_nationality && (
                          <div className="error">
                            {formErrors.kyc02father_nationality}
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-md-6">
                        {" "}
                        {/*Mother's Name*/}
                        <label
                          htmlFor="inputMotherName"
                          className="form-label yolo"
                        >
                          Mother's Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputMotherName"
                          placeholder="Mother's Name"
                          name="kyc02mother_name"
                          onChange={handleChange}
                        />
                        {formErrors.kyc02mother_name && (
                          <div className="error">
                            {formErrors.kyc02mother_name}
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-md-5">
                        {" "}
                        {/*Mother's Nationality*/}
                        <label
                          htmlFor="inputMotherNationality"
                          className="form-label yolo"
                        >
                          Mother's Nationality
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputMotherNationality"
                          placeholder="Mother's Nationality"
                          name="kyc02mother_nationality"
                          onChange={handleChange}
                        />
                        {formErrors.kyc02mother_nationality && (
                          <div className="error">
                            {formErrors.kyc02mother_nationality}
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-md-6">
                        {" "}
                        {/*Spouse's Name*/}
                        <label
                          htmlFor="inputSpouseName"
                          className="form-label yolo"
                        >
                          Spouse's Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputSpouseName"
                          placeholder="Spouse's Name"
                          name="kyc02spouse"
                          onChange={handleChange}
                        />
                        {formErrors.kyc02spouse && (
                          <div className="error">{formErrors.kyc02spouse}</div>
                        )}
                      </div>
                      <div className="col-12 col-md-5">
                        {" "}
                        {/*Spouse's Nationality*/}
                        <label
                          htmlFor="inputSpouseNationality"
                          className="form-label yolo"
                        >
                          Spouse's Nationality
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputSpouseNationality"
                          placeholder="Spouse's Nationality"
                          name="kyc02spouse_nationality"
                          onChange={handleChange}
                        />
                        {formErrors.kyc02spouse_nationality && (
                          <div className="error">
                            {formErrors.kyc02spouse_nationality}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-5 mb-5" id="btn">
                    <button
                      type="button"
                      className="btn btn-outline-dark text-danger ps-4 pe-4 "
                      id="genr_next"
                      onClick={() => handleChangeSelection("Address")}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Address details  */}
        {selection === "Address" && (
          <div
            className="row justify-content-evenly  mt-5 mb-5"
            id="addr_details"
          >
            <div
              className="col-md-11 col-lg-9 col-xxl-8 justify-content-evenly"
              id="form-section"
            >
              <div
                className="row justify-content-evenly"
                id="form"
                style={{ backgroundColor: "#FAFBFF" }}
              >
                <div className="col-12">
                  {" "}
                  {/*Back*/}
                  <div className="button">
                    <a href="KYCform.html">
                      <button className="back-button ps-3">
                        Back
                        <img
                          src="/Assets/images/Exit icon/exit.png"
                          alt="..."
                        />
                      </button>
                    </a>
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
                    onChange={handleChange}
                  >
                    <option selected>Select Province</option>
                    {provienceApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                  {formErrors.kyc03set03uin && (
                    <div className="error">{formErrors.kyc03set03uin}</div>
                  )}
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputDistrict" className="form-label yolo">
                    District
                  </label>
                  <select
                    id="inputDistrict"
                    className="form-select"
                    name="kyc03set04uin"
                    onChange={handleChange}
                  >
                    <option selected>Name of the District</option>
                    {districtApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                  {formErrors.kyc03set04uin && (
                    <div className="error">{formErrors.kyc03set04uin}</div>
                  )}
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
                    onChange={handleChange}
                  >
                    <option selected>Name of the Municipality/VDC</option>
                    {municipalityApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                  {formErrors.kyc03set05uin && (
                    <div className="error">{formErrors.kyc03set05uin}</div>
                  )}
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
                    onChange={handleChange}
                    onKeyPress={(event) => {
                      const keyCode = event.which || event.keyCode;
                      const keyValue = String.fromCharCode(keyCode);
                      const regex = /^[0-9]*$/;
                      if (!regex.test(keyValue)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  {formErrors.kyc03ward_no && (
                    <div className="error">{formErrors.kyc03ward_no}</div>
                  )}
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
                    onChange={handleChange}
                  />
                  {formErrors.kyc03street && (
                    <div className="error">{formErrors.kyc03street}</div>
                  )}
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
                    onChange={handleChange}
                    onKeyPress={(event) => {
                      const keyCode = event.which || event.keyCode;
                      const keyValue = String.fromCharCode(keyCode);
                      const regex = /^[0-9]*$/;
                      if (!regex.test(keyValue)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  {formErrors.kyc03house_no && (
                    <div className="error">{formErrors.kyc03house_no}</div>
                  )}
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
                      handleChange(e);
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
                  {formErrors.kyc03set03uin_temp && !sameAsAbove && (
                    <div className="error">{formErrors.kyc03set03uin_temp}</div>
                  )}
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
                      handleChange(e);
                    }}
                    disabled={sameAsAbove} // Disable the dropdown if sameAsAbove is checked
                  >
                    <option value="">Name of the District</option>
                    {districtApi2.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                  {formErrors.kyc03set04uin_temp && !sameAsAbove && (
                    <div className="error">{formErrors.kyc03set04uin_temp}</div>
                  )}
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
                      handleChange(e);
                    }}
                    disabled={sameAsAbove} // Disable the dropdown if sameAsAbove is checked
                  >
                    <option value="">Name of the Municipality/VDC</option>
                    {municipalityApi2.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                  {formErrors.kyc03set05uin_temp && !sameAsAbove && (
                    <div className="error">{formErrors.kyc03set05uin_temp}</div>
                  )}
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputWardNumber" className="form-label yolo">
                    Ward Number
                  </label>
                  <input
                    className="form-control syncSame numberOnly"
                    id="num"
                    name="kyc03ward_no_temp"
                    value={ward}
                    maxLength={2}
                    onChange={handleChange2}
                    disabled={sameAsAbove}
                    onKeyPress={(event) => {
                      const keyCode = event.which || event.keyCode;
                      const keyValue = String.fromCharCode(keyCode);
                      const regex = /^[0-9]*$/;
                      if (!regex.test(keyValue)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  {formErrors.kyc03ward_no_temp && !sameAsAbove && (
                    <div className="error">{formErrors.kyc03ward_no_temp}</div>
                  )}
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
                    onChange={handleChange2}
                    disabled={sameAsAbove}
                  />
                  {formErrors.kyc03street_temp && !sameAsAbove && (
                    <div className="error">{formErrors.kyc03street_temp}</div>
                  )}
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
                    onChange={handleChange2}
                    value={house}
                    disabled={sameAsAbove}
                    onKeyPress={(event) => {
                      const keyCode = event.which || event.keyCode;
                      const keyValue = String.fromCharCode(keyCode);
                      const regex = /^[0-9]*$/;
                      if (!regex.test(keyValue)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  {formErrors.kyc03house_no_temp && !sameAsAbove && (
                    <div className="error">{formErrors.kyc03house_no_temp}</div>
                  )}
                </div>
                <div className="col-12 mt-5 mb-5 d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-dark text-danger ps-4 pe-4 "
                    id="addr_prev"
                    onClick={() => handlePrevious("no")}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-dark text-danger ps-4 pe-4 "
                    id="addr_next"
                    onClick={() => handleChangeSelection("Doc")}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Document Details and Proof Upload Section */}
        {/*Proof Upload*/}
        {selection === "Doc" && (
          <div className="row justify-content-evenly  mt-5 mb-5" id="proof">
            <div className="col-md-11 col-lg-9 col-xxl-8" id="form-section">
              <div
                className="row "
                id="form "
                style={{ backgroundColor: "#FAFBFF" }}
              >
                <div className="col-12">
                  <div className="row text-center" id="text">
                    <span className="text text-center mt-5">Document Type</span>
                  </div>

                  {/* switch radio buttons */}
                  <div className="col-md-12 d-flex justify-content-center mt-4 mb-4">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="proof_switch"
                        id="flexRadioDefault1"
                        value="citizen"
                        checked={internalRadio === "citizen"}
                        onChange={handleSelectionChangeIntenalRadio}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Citizenship
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="proof_switch"
                        id="flexRadioDefault2"
                        value="passport"
                        checked={internalRadio === "passport"}
                        onChange={handleSelectionChangeIntenalRadio}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Passport
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="proof_switch"
                        id="flexRadioDefault2"
                        value="voter"
                        checked={internalRadio === "voter"}
                        onChange={handleSelectionChangeIntenalRadio}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Voter ID
                      </label>
                    </div>
                  </div>
                  {/*TIT*/}
                  <div className="col-12 mt-4">
                    <h5 className id="personal-details">
                      Details
                    </h5>
                  </div>
                  {/*Citizenship Form*/}
                  {internalRadio === "citizen" && (
                    <div className="col-12 " id="citizenship">
                      <div className="row gy-4">
                        <div className="col-md-3">
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
                            name="kyc04identity_no"
                            onChange={handleChange}
                          />
                          {formErrors.kyc04identity_no && (
                            <div className="error">
                              {formErrors.kyc04identity_no}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3  ">
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
                            name="kyc04set04uin"
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
                          {formErrors.kyc04set04uin && (
                            <div className="error">
                              {formErrors.kyc04set04uin}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3">
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
                            name="kyc04issued_office"
                            onChange={handleChange}
                          />
                          {formErrors.kyc04issued_office && (
                            <div className="error">
                              {formErrors.kyc04issued_office}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3">
                          <label className="form-label yolo">
                            Date of Issue (B.S.)
                          </label>
                          <NepaliDatePicker
                            inputClassName="form-control"
                            value={kyc04IssuedDateNep}
                            onChange={(value) => {
                              handleBsDate(value, 2);
                              setFormValues((prevValues) => ({
                                ...prevValues,
                                kyc04issued_date_nep: value,
                              }));
                            }}
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                          />
                          {formErrors.kyc04issued_date_nep && (
                            <div className="error">
                              {formErrors.kyc04issued_date_nep}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3">
                          <label className="form-label yolo">
                            Date of Issue (A.D.)
                          </label>
                          <input
                            type="date"
                            className="form-control englishDate text dateISO"
                            name="kyc01dob_eng"
                            value={kyc04IssuedDateEng}
                            onChange={(e) => {
                              handleAdDate(e, 2);
                              handleChange(e);
                            }}
                          />
                          {formErrors.kyc04issued_date_eng && (
                            <div className="error">
                              {formErrors.kyc04issued_date_eng}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* passport form */}
                  {internalRadio === "passport" && (
                    <div className=" col-12 " id="passport">
                      <div className="row">
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
                            name="kyc04passport_identity_no"
                            onChange={handleChange}
                          />
                          {formErrors.kyc04passport_identity_no && (
                            <div className="error">
                              {formErrors.kyc04passport_identity_no}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3  ">
                          {/*Business Type*/}
                          <label
                            htmlFor="inputbusinesstype"
                            className="form-label yolo "
                          >
                            Place of Issue
                          </label>
                          <select
                            className="form-select"
                            id="business_type"
                            name="kyc04set04uin"
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
                          {formErrors.kyc04set04uin && (
                            <div className="error">
                              {formErrors.kyc04set04uin}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3">
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
                            name="kyc04issued_office"
                            onChange={handleChange}
                          />
                          {formErrors.kyc04issued_office && (
                            <div className="error">
                              {formErrors.kyc04issued_office}
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 mt-3">
                          <label
                            htmlFor="inputDateIssuue"
                            className="form-label yolo required"
                          >
                            Date of Issue (A.D.)
                          </label>
                          <input
                            type="date"
                            className="form-control englishDate text dateISO"
                            name="kyc04passport_issued_date_eng"
                            value={kyc04PassportIssuedDateEng}
                            onChange={(e) => {
                              handleAdDate(e, 3);
                              handleChange(e);
                            }}
                          />
                          {formErrors.kyc04passport_issued_date_eng && (
                            <div className="error">
                              {formErrors.kyc04passport_issued_date_eng}
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 mt-3">
                          <label
                            htmlFor="inputDate"
                            className="form-label yolo required"
                          >
                            Date of Issue (B.S.)
                          </label>
                          <NepaliDatePicker
                            inputClassName="form-control"
                            value={kyc04PassportIssuedDateNep}
                            onChange={(value) => {
                              handleBsDate(value, 3);
                              setFormValues((prevValues) => ({
                                ...prevValues,
                                kyc04passport_issued_date_nep: value,
                              }));
                            }}
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                          />
                          {formErrors.kyc04passport_issued_date_nep && (
                            <div className="error">
                              {formErrors.kyc04passport_issued_date_nep}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3 mt-3">
                          <label
                            htmlFor="InputeExpiry"
                            className="form-label yolo required"
                          >
                            ID Expiry Date (A.D.)
                          </label>
                          <input
                            type="date"
                            className="form-control englishDate text dateISO"
                            name="kyc04expiry_date_eng"
                            value={kyc04ExpiryDateEng}
                            onChange={(e) => {
                              handleAdDate(e, 4);
                              handleChange(e);
                            }}
                          />
                          {formErrors.kyc04expiry_date_eng && (
                            <div className="error">
                              {formErrors.kyc04expiry_date_eng}
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 mt-3">
                          <label
                            htmlFor="InputIDExpiry"
                            className="form-label yolo required"
                          >
                            ID Expiry Date (B.S.)
                          </label>
                          <NepaliDatePicker
                            inputClassName="form-control"
                            value={kyc04ExpiryDateNep}
                            onChange={(value) => {
                              handleBsDate(value, 4);
                              setFormValues((prevValues) => ({
                                ...prevValues,
                                kyc04expiry_date_nep: value,
                              }));
                            }}
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                          />

                          {formErrors.kyc04expiry_date_nep && (
                            <div className="error">
                              {formErrors.kyc04expiry_date_nep}
                            </div>
                          )}
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
                            className="form-control englishDate text dateISO"
                            name="kyc04visa_issue_date_eng"
                            value={kyc04VisaIssueDateEng}
                            onChange={(e) => {
                              handleAdDate(e, 5);
                              handleChange(e);
                            }}
                          />
                          {formErrors.kyc04visa_issue_date_eng && (
                            <div className="error">
                              {formErrors.kyc04visa_issue_date_eng}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3 mt-4">
                          <label
                            htmlFor="inputPassportIssue"
                            className="form-label yolo required"
                          >
                            Passport Issue for Foreigner Date(B.S.)
                          </label>
                          <NepaliDatePicker
                            inputClassName="form-control"
                            value={kyc04VisaIssueDateNep}
                            onChange={(value) => {
                              handleBsDate(value, 5);
                              setFormValues((prevValues) => ({
                                ...prevValues,
                                kyc04visa_issue_date_nep: value,
                              }));
                            }}
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                          />
                          {formErrors.kyc04visa_issue_date_nep && (
                            <div className="error">
                              {formErrors.kyc04visa_issue_date_nep}
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 mt-4">
                          <label
                            htmlFor="inputPassportExpiry"
                            className="form-label yolo required"
                          >
                            Passport Expiry for foreigners (A.D)
                          </label>
                          <input
                            type="date"
                            className="form-control englishDate text dateISO"
                            name="kyc04visa_expiry_date_eng"
                            value={kyc04VisaExpiryDateEng}
                            onChange={(e) => {
                              handleAdDate(e, 6);
                              handleChange(e);
                            }}
                          />
                          {formErrors.kyc04visa_expiry_date_eng && (
                            <div className="error">
                              {formErrors.kyc04visa_expiry_date_eng}
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 mt-4">
                          <label
                            htmlFor="inputPassportExDate"
                            className="form-label yolo required"
                          >
                            Passport Expiry for foreigners (B.S.)
                          </label>
                          <NepaliDatePicker
                            inputClassName="form-control"
                            value={kyc04VisaExpiryDateNep}
                            onChange={(value) => {
                              handleBsDate(value, 6);
                              setFormValues((prevValues) => ({
                                ...prevValues,
                                kyc04visa_expiry_date_nep: value,
                              }));
                            }}
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                          />

                          {formErrors.kyc04visa_expiry_date_nep && (
                            <div className="error">
                              {formErrors.kyc04visa_expiry_date_nep}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/*Voter card form*/}
                  {internalRadio === "voter" && (
                    <div className=" col-12 " id="voter">
                      <div className="row">
                        <div className="col-md-4 voter">
                          {/*Last Name Field*/}
                          <label htmlFor className="form-label yolo">
                            Voter ID
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control required"
                            id="voterIdentity"
                            name="kyc04voter_identity_no"
                            onChange={handleChange}
                          />
                          {formErrors.kyc04voter_identity_no && (
                            <div className="error">
                              {formErrors.kyc04voter_identity_no}
                            </div>
                          )}
                        </div>

                        <div className="col-md-4 ">
                          <label className="form-label yolo">
                            Date of Issue (B.S.)
                          </label>
                          <NepaliDatePicker
                            inputClassName="form-control"
                            value={kyc04VoterIdIssuedDateNep}
                            onChange={(value) => {
                              handleBsDate(value, 7);
                              setFormValues((prevValues) => ({
                                ...prevValues,
                                kyc04voterid_issued_date_nep: value,
                              }));
                            }}
                            options={{
                              calenderLocale: "ne",
                              valueLocale: "en",
                            }}
                          />

                          {formErrors.kyc04voterid_issued_date_nep && (
                            <div className="error">
                              {formErrors.kyc04voterid_issued_date_nep}
                            </div>
                          )}
                        </div>
                        <div className="col-md-3 ">
                          <label className="form-label yolo">
                            Date of Issue (A.D.)
                          </label>
                          <input
                            type="date"
                            className="form-control englishDate text dateISO"
                            name="kyc04voterid_issued_date_eng"
                            value={kyc04VoterIdIssuedDateEng}
                            onChange={(e) => {
                              handleAdDate(e, 7);
                              handleChange(e);
                            }}
                          />
                          {formErrors.kyc04voterid_issued_date_eng && (
                            <div className="error">
                              {formErrors.kyc04voterid_issued_date_eng}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* upload documents */}
                  <div className="document_upload">
                    <div className="col-12">
                      <h5 className="mt-5" id="personal-details">
                        Upload Document
                      </h5>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="col-lg-10">
                        <div className="col-md-4 voter" id="Citizenship">
                          <label
                            htmlFor="inputCitizenship"
                            className="form-label yolo"
                          >
                            Citizenship / Passport/ Voter's ID
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control form-control-lg"
                            id="formFileLg"
                            type="file"
                            name="CitizenShipFile"
                            onChange={handleChange}
                          />
                          {formErrors.CitizenShipFile && (
                            <div className="error">
                              {formErrors.CitizenShipFile}
                            </div>
                          )}
                        </div>

                        <div className="col-md-12">
                          <div className="col-md-4 voter" id="Signature">
                            <label
                              htmlFor="inputSignature"
                              className="form-label yolo"
                            >
                              PassportSize Photograph
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="file"
                              className="form-control form-control-lg"
                              name="PhotoFile"
                              placeholder="Insert Signature"
                              onChange={handleChange}
                            />
                            {formErrors.PhotoFile && (
                              <div className="error">
                                {formErrors.PhotoFile}
                              </div>
                            )}
                          </div>

                          <div className="col-12 d-flex justify-content-between mt-5 mb-5">
                            <button
                              type="button"
                              className="btn btn-outline-dark text-danger ps-4 pe-4"
                              id="proof_prev"
                              onClick={() => handlePrevious("Address")}
                            >
                              Previous
                            </button>
                            <button
                              type="submit"
                              className="btn btn-outline-dark text-danger ps-3 pe-3"
                              id="kyc_submit"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
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

export default OnlineKyc;
