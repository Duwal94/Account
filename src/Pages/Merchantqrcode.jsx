import { useState, useEffect } from "react";

import Select from "react-select";
import useFormValues from "../States/MerchantQr.tsx";
import Modal from "react-modal";
import useFormValidationSchema from "../Validation/MerchantValid";
import { API_URL } from "../Utilities/Constants";

function Merchantqrcode() {
  const [selection, setSelection] = useState(true);

  const [branchApi, setBranchApi] = useState([]);
  const [registeredApi, setRegisteredApi] = useState([]);
  const [businessNatureApi, setBusinessNatureApi] = useState([]);
  const [acctApi, setAcctApi] = useState(null);
  const [otpApi, setOtpApi] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [otpVerify, setOtpVerify] = useState(false);
  const [responseMessage, setResponseMessage] = useState("hello");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const eligibilityType = selection;
  const validationSchema = useFormValidationSchema(eligibilityType);
  const [formValues, setFormValues] = useFormValues(eligibilityType);
  const [otpInput, setOtpInput] = useState("");

  const otpverifyChange = (event) => {
    setOtpInput(event.target.value);
  };

  // fetch api data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`${API_URL}/MerchantAcquisition/Branch`);
        const data1 = await response1.json();
        setBranchApi(data1);

        const response2 = await fetch(
          `${API_URL}/MerchantAcquisition/RegisteredWith`
        );
        const data2 = await response2.json();
        setRegisteredApi(data2);
        const response3 = await fetch(
          `${API_URL}/GeneralComponents/BusinessNatures`
        );
        const data3 = await response3.json();
        setBusinessNatureApi(data3);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  //fetch Account verify data from the api
  const fetchAcctVerifyData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/GeneralComponents/VerifyAccount?AccNo=${formValues.car06acc_no}`
      );
      const jsonData = await response.json();
      setAcctApi(jsonData);
      setOtpVerify(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //fetch otp data
  const fetchOtpVerifyData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/GeneralComponents/VerifyOTP?AccNo=${formValues.car06acc_no}&OTP=${otpInput}`
      );
      const jsonData = await response.json();
      setOtpApi(jsonData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelectionChange = (event) => {
    const newValue = event.target.value === "true";
    setSelection(newValue);
    setOtpVerify(false);
    setOtpApi(null);
  };

  //set name,value to form
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    const newValue =
      type === "file" ? files[0] : type === "checkbox" ? checked : value;

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
  }, [formValues]);

  //post fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${API_URL}/MerchantAcquisition`; // Replace with your API endpoint URL

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      // Validate the form using Yup
      await validationSchema.validate(formValues, { abortEarly: false });

      // Clear form errors if form is valid
      setFormErrors({});
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
      // Handle error
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
  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      car06name: otpApi?.name || prevValues.car06name,
      car06contact_person_contact_no:
        otpApi?.contact || prevValues.car06contact_person_contact_no,
    }));
  }, [otpApi?.name, otpApi?.contact]);
  return (
    <div className="container-fluid">
      <div className="col-12 pcolor mb-5" id="loan">
        <h4 className="text-warning">Merchant QR code</h4>
      </div>

      <div className="row justify-content-evenly p-0">
        <div className="col-md-11 col-lg-9 col-xxl-8" id="box-shadow">
          <div className="row">
            <div className="col-12">
              <div className="button">
                <a href="index.html">
                  <button className="back-button">
                    Back <img src="/Assets/images/Exit icon/exit.png" alt="" />
                  </button>
                </a>
              </div>
            </div>
            <div className="col-12 mt-4" id="loantype">
              <p className="text-center">Merchant Application</p>
            </div>
            {/* Form started */}
            <div className="col-12">
              <form
                className="row gx-5 gy-4 px-5"
                id="Merch_qr"
                name="validation"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <div className="row mt-5 ">
                    <div className="col-12 text-center">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="car06is_individual"
                          id="ind_switch"
                          value="true"
                          checked={selection === true}
                          onChange={(e) => {
                            handleSelectionChange(e);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="ind_switch"
                        >
                          Individual
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="car06is_individual"
                          id="bus_switch"
                          value="false"
                          checked={selection === false}
                          onChange={(e) => {
                            handleSelectionChange(e);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="bus_switch"
                        >
                          Business
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <h5 className="Referral" id="personal-details">
                    Refferal
                  </h5>
                </div>
                {/* Reffered By */}
                <div className="col-md-5">
                  <label htmlFor="inputrefferedby" className="form-label yolo">
                    Reffered By
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Refferer Name"
                    name="car06reffered_by"
                    value={formValues.car06reffered_by}
                    onChange={handleChange}
                  />
                  {formErrors.car06reffered_by && (
                    <div className="error">{formErrors.car06reffered_by}</div>
                  )}
                </div>
                {/* ref contact no */}
                <div className="col-md-5">
                  <label htmlFor="inputnumber" className="form-label yolo">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="form-control numberOnly"
                    id="inputMiddleName"
                    placeholder="Contact Number(Refferer's)"
                    name="car06refferer_contact_no"
                    onChange={handleChange}
                    value={formValues.car06refferer_contact_no}
                  />
                  {formErrors.car06refferer_contact_no && (
                    <div className="error">
                      {formErrors.car06refferer_contact_no}
                    </div>
                  )}
                </div>
                <div className="col-12 mt-4">
                  <h5 className="basic information" id="personal-details">
                    Basic Information
                  </h5>
                </div>
                <div className="col-md-5" id="Business">
                  <label
                    htmlFor="validationrequest"
                    className="form-label yolo"
                  >
                    Request For
                  </label>
                  <input
                    type="request"
                    className="form-control"
                    id="validationrequest"
                    placeholder="QR Code"
                    disabled
                  />
                </div>
                {/* ACCT no verify */}
                <div className="col-md-5 ">
                  <label
                    htmlFor="inputaccountsholdernumber"
                    className="form-label yolo"
                  >
                    Account Holder's Number
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control numberOnly"
                      placeholder="Account Number"
                      id="accounts_number"
                      value={formValues.car06acc_no}
                      name="car06acc_no"
                      aria-label="Account Number"
                      aria-describedby="verify"
                      onChange={handleChange}
                    />

                    <div className="input-group-append">
                      <button
                        className="btn btn-danger btnclick otpStep"
                        id="verifyX"
                        type="button"
                        onClick={fetchAcctVerifyData}
                      >
                        <i className /> Verify Account
                      </button>
                    </div>
                  </div>
                  {formErrors.car06acc_no && (
                    <div className="error">{formErrors.car06acc_no}</div>
                  )}
                </div>
                {/* OTP verify */}
                {otpVerify === true && (
                  <div className="col-md-5 ">
                    <label htmlFor="otpnumber">
                      OTP Number
                      <span className="text-danger">*</span>
                    </label>
                    <div className="input-group mb-4">
                      <input
                        type="text"
                        className="form-control"
                        onChange={otpverifyChange}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-warning"
                          type="button"
                          id="VerifyOtp"
                          onClick={fetchOtpVerifyData}
                        >
                          <i className="fas fa-sync-alt" /> Verify OTP
                        </button>
                      </div>
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary"
                          type="button"
                          id="resendOtp"
                          onClick={fetchAcctVerifyData}
                        >
                          <i className="fas fa-sync-alt" /> Resend OTP
                        </button>
                      </div>
                    </div>
                    <p id="firstOTP">
                      An OTP verification code will be sent to your phone via
                      SMS. Copy the OTP code from the SMS into the OTP box.
                    </p>
                    <p id="reOTP" style={{ display: "none" }}>
                      New OTP verification code had been resent to your phone
                      via SMS.
                    </p>
                  </div>
                )}
                {/* name */}
                <div className="col-md-5">
                  <label htmlFor="inputname" className="form-label yolo">
                    Name
                  </label>
                  <input
                    className="form-control"
                    id="inputname"
                    name="accountholder"
                    disabled
                    value={otpApi?.name || " "}
                  />
                </div>
                {/* contact */}
                <div className="col-md-5">
                  <label htmlFor="inputnumber" className="form-label yolo">
                    Contact Number
                  </label>
                  <input
                    className="form-control numberOnly"
                    id="inputnumber"
                    name="mobilenumber"
                    disabled
                    value={otpApi?.contact || " "}
                  />
                </div>

                {/* pan */}
                {selection === false && (
                  <div className="col-md-5">
                    <label htmlFor="inputpan" className="form-label yolo">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      className="form-control numberOnly"
                      id="inputpan"
                      placeholder="01-1918292"
                      name="car06pan_or_vat"
                      onChange={handleChange}
                      value={formValues.car06pan_or_vat}
                    />
                    {formErrors.car06pan_or_vat && (
                      <div className="error">{formErrors.car06pan_or_vat}</div>
                    )}
                  </div>
                )}
                {/*Registered with*/}
                {selection === false && (
                  <div className="col-md-5 business ">
                    <label
                      htmlFor="inputbusinesstype"
                      className="form-label yolo "
                    >
                      Registered with
                    </label>
                    <select
                      className="form-select"
                      id="business_type"
                      name="car06car03uin"
                      onChange={handleChange}
                    >
                      <option value={0} selected disabled>
                        registered with
                      </option>
                      {registeredApi.map((item) => (
                        <option key={item.bindField} value={item.bindField}>
                          {item.displayField}
                        </option>
                      ))}
                    </select>
                    {formErrors.car06car03uin && (
                      <div className="error">{formErrors.car06car03uin}</div>
                    )}
                  </div>
                )}
                {/* QR FOR */}
                <div className="col-md-5">
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="inputtext" className="form-label yolo">
                        QR Code For
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex">
                      <div className="form-check form-check-inline ms-1">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="car06mobile_payment_type"
                          id="flexRadioDefault1"
                          value="1"
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault1"
                        >
                          Fone Pay
                        </label>

                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="car06mobile_payment_type"
                            id="flexRadioDefault1"
                            value="2"
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            Union Pay
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Business Type*/}
                {selection === false && (
                  <div className="col-md-5 business ">
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
                {/* Name of Authorized Person of the Company */}
                {selection === false && (
                  <div className="col-md-5">
                    <label
                      htmlFor="inputrefferedby"
                      className="form-label yolo"
                    >
                      Name of Authorized Person of the Company
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Name of Authorized Person of the Company "
                      name="car06authorized_person"
                      value={formValues.car06authorized_person}
                      onChange={handleChange}
                    />
                    {formErrors.car06authorized_person && (
                      <div className="error">
                        {formErrors.car06authorized_person}
                      </div>
                    )}
                  </div>
                )}
                {/* Contact Number of Authorized Person */}
                {selection === false && (
                  <div className="col-md-5">
                    <label
                      htmlFor="inputrefferedby"
                      className="form-label yolo"
                    >
                      Contact Number of Authorized Person
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Contact Number of Authorized Person"
                      name="car06authorized_person_contact_no"
                      onChange={handleChange}
                      value={formValues.car06authorized_person_contact_no}
                    />
                    {formErrors.car06authorized_person_contact_no && (
                      <div className="error">
                        {formErrors.car06authorized_person_contact_no}
                      </div>
                    )}
                  </div>
                )}
                {/* Name of Contact Person of Company */}
                {selection === false && (
                  <div className="col-md-5">
                    <label
                      htmlFor="inputrefferedby"
                      className="form-label yolo"
                    >
                      Name of Contact Person of Company *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Name of Contact Person of Company *"
                      name="car06contact_person"
                      value={formValues.car06contact_person}
                      onChange={handleChange}
                    />
                    {formErrors.car06contact_person && (
                      <div className="error">
                        {formErrors.car06contact_person}
                      </div>
                    )}
                  </div>
                )}
                {/* Contact Number of Contact Person * */}
                {selection === false && (
                  <div className="col-md-5">
                    <label
                      htmlFor="inputrefferedby"
                      className="form-label yolo"
                    >
                      Contact Number of Contact Person
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Contact Number of Contact Person "
                      name="car06contact_person_contact_no"
                      onChange={handleChange}
                    />
                    {formErrors.car06contact_person_contact_no && (
                      <div className="error">
                        {formErrors.car06contact_person_contact_no}
                      </div>
                    )}
                  </div>
                )}
                {/* address */}
                <div className="col-md-5">
                  <label htmlFor="inputaddress" className="form-label yolo">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputaddress"
                    placeholder="Enter your address"
                    name="car06address"
                    onChange={handleChange}
                    value={formValues.car06address}
                  />
                  {formErrors.car06address && (
                    <div className="error">{formErrors.car06address}</div>
                  )}
                </div>

                {/* Preferred Branch */}
                <div className="col-md-5">
                  <label htmlFor="branch" className="form-label yolo">
                    Preferred Branch
                  </label>
                  <Select
                    name="car06bra01uin"
                    id="select_branch"
                    value={branchApi.find((item) => item.bra01name === "")}
                    onChange={handleChangeSelect}
                    options={branchApi.map((item) => ({
                      value: item.bra01uin,
                      label: item.bra01name,
                      name: "car06bra01uin",
                    }))}
                    placeholder="Name of the Branch"
                  />
                  {formErrors.car06bra01uin && (
                    <div className="error">{formErrors.car06bra01uin}</div>
                  )}
                </div>
                {/* shop photo */}
                {selection === false && (
                  <div className="col-md-5">
                    <label
                      htmlFor="inputCitizenship"
                      className="form-label yolo required"
                    >
                      Upload Shop Photo
                    </label>
                    <input
                      className="form-control form-control-lg"
                      id="formFileLg"
                      type="file"
                      name="SignatureFile"
                      onChange={handleChange}
                    />
                    {formErrors.SignatureFile && (
                      <div className="error">{formErrors.SignatureFile}</div>
                    )}
                  </div>
                )}
                {/* Upload Citizenship */}
                <div className="col-md-5">
                  <label
                    htmlFor="inputCitizenship"
                    className="form-label yolo required"
                  >
                    Upload Citizenship
                  </label>
                  <input
                    className="form-control form-control-lg"
                    id="formFileLg"
                    type="file"
                    name="CitizenShipFile"
                    onChange={handleChange}
                  />
                  {formErrors.CitizenShipFile && (
                    <div className="error">{formErrors.CitizenShipFile}</div>
                  )}
                </div>
                <div className="col-12 mt-5 mb-5" id="btn">
                  <button
                    type="submit"
                    className="btn btn-outline-dark text-danger ps-4 pe-4"
                    id="btn1"
                  >
                    Send
                  </button>
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
    </div>
  );
}

export default Merchantqrcode;
