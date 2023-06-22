import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import Modal from "react-modal";
import useFormValues from "../States/Dispute.tsx";
import useFormValidationSchema from "../Validation/DisputeValid";
function Disputeclaim() {
  const [selectedOption, setSelectedOption] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const eligibilityType = selectedOption;
  const validationSchema = useFormValidationSchema(eligibilityType);
  const [formValues, setFormValues] = useFormValues(eligibilityType);

  const [cardTypeApi, setCardTypeApi] = useState([]);
  const [disputeTypesApi, setDisputeTypesApi] = useState([]);
  const [show, setShow] = useState(false);

  const [otpVerify, setOtpVerify] = useState(false);
  const [acctApi, setAcctApi] = useState(null);
  const [otpApi, setOtpApi] = useState(null);
  const [responseMessage, setResponseMessage] = useState("hello");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const otpverifyChange = (event) => {
    setOtpInput(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    setOtpVerify(false);
    setOtpApi(null);
  };
  const handleSelectionChangeRadio = () => {
    setShow((prevState) => !prevState);
  };

  //api fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          "http://api.onlineform.ants.com.np/DisputeClaim/DisputeTypes"
        );
        const data1 = await response1.json();
        setDisputeTypesApi(data1);
        const response2 = await fetch(
          "http://api.onlineform.ants.com.np/DisputeClaim/CardTypes"
        );
        const data2 = await response2.json();
        setCardTypeApi(data2);
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
        `http://api.onlineform.ants.com.np/GeneralComponents/VerifyAccount?AccNo=${formValues.car06acc_no}`
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
        `http://api.onlineform.ants.com.np/GeneralComponents/VerifyOTP?AccNo=${formValues.car06acc_no}&OTP=${otpInput}`
      );
      const jsonData = await response.json();
      setOtpApi(jsonData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //set name,value to form
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    let newValue;

    if (type === "file") {
      newValue = files[0];
    } else if (type === "checkbox") {
      newValue = checked;
    } else if (type === "claim") {
      newValue = parseInt(value); // Convert value to an integer
    } else if (name === "car05car04uin") {
      newValue = parseInt(value);
    } else {
      newValue = value; // Treat value as a string for other types
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  // // ////////checking
  useEffect(() => {
    // Perform the desired action whenever `[]` changes
    console.log(formValues);
  }, [formValues]);
  //post fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://api.onlineform.ants.com.np/DisputeClaim"; // Replace with your API endpoint URL

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
  //disable field value intake
  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      car05acc_holder_name: otpApi?.name || prevValues.car05acc_holder_name,
      car05contact_no: otpApi?.contact || prevValues.car05contact_no,
      car05email_id: otpApi?.email || prevValues.car05email_id,
    }));
  }, [otpApi?.name, otpApi?.contact, otpApi?.email]);
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 pcolor mb-5" id="loan">
            <h4 className="text-warning">Dispute Claim</h4>
          </div>
        </div>

        <div className="row justify-content-evenly p-0">
          <div className="col--md-11 col-lg-9 col-xxl-8">
            <div
              className="row"
              id="box-shadow"
              style={{ backgroundColor: "#FAFBFF" }}
            >
              <div className="row">
                <div className="button">
                  <a href="/">
                    <button className="back-button">
                      Back
                      <img src="/Assets/images/Exit icon/exit.png" alt="" />
                    </button>
                  </a>
                </div>

                <form
                  className="row g-3 ps-5 pb-5"
                  id="dispute_form"
                  onSubmit={handleSubmit}
                >
                  <div className="col-md-6 ">
                    <label
                      htmlFor="inputbusinesstype"
                      className="form-label yolo "
                    >
                      Dispute Types
                    </label>

                    <select
                      className="form-select"
                      name="car05sys06uin"
                      onChange={(e) => {
                        handleDropdownChange(e);
                      }}
                    >
                      <option value=""> -- Select Online Request -- </option>
                      {disputeTypesApi.map((item) => (
                        <option key={item.bindField} value={item.bindField}>
                          {item.displayField}
                        </option>
                      ))}
                    </select>
                    {formErrors.car05sys06uin && (
                      <div className="error">{formErrors.car05sys06uin}</div>
                    )}
                  </div>
                  {selectedOption === "1" && (
                    <div className="col-md-5 ">
                      <label
                        htmlFor="validationmobile"
                        className="form-label yolo"
                        id="Online"
                      >
                        Card number
                      </label>
                      <input
                        className="form-control numberOnly"
                        name="car05card_no"
                        id="validationmobile  "
                        placeholder="card number"
                        onChange={handleChange}
                      />
                      {formErrors.car05card_no && (
                        <div className="error">{formErrors.car05card_no}</div>
                      )}
                    </div>
                  )}
                  {selectedOption === "1" && (
                    <div className="col-md-6">
                      <label
                        htmlFor="formGroupExampleInput"
                        className="form-label yolo"
                      >
                        Card Type*
                      </label>
                      <select
                        id="inputstate"
                        className="form-select"
                        name="car05car04uin"
                        onChange={handleChange}
                      >
                        <option selected>-- select an option --</option>
                        {cardTypeApi.map((item) => (
                          <option
                            key={parseInt(item.car04uin)}
                            value={parseInt(item.car04uin, 10)}
                          >
                            {item.car04title}
                          </option>
                        ))}
                      </select>
                      {formErrors.car05car04uin && (
                        <div className="error">{formErrors.car05car04uin}</div>
                      )}
                    </div>
                  )}
                  {/* Registered Mobile Number * */}
                  {selectedOption === "2" && (
                    <div className="col-md-5 ">
                      <label
                        htmlFor="validationmobile"
                        className="form-label yolo"
                        id="Online"
                      >
                        Registered Mobile Number *
                      </label>
                      <input
                        className="form-control numberOnly"
                        name="car05registered_mobile_no"
                        id="validationmobile  "
                        placeholder="card number"
                        onChange={handleChange}
                      />
                      {formErrors.car05registered_mobile_no && (
                        <div className="error">
                          {formErrors.car05registered_mobile_no}
                        </div>
                      )}
                    </div>
                  )}
                  {/* iTouch Username * */}
                  {selectedOption === "3" && (
                    <div className="col-md-5 ">
                      <label
                        htmlFor="validationmobile"
                        className="form-label yolo"
                        id="Online"
                      >
                        iTouch Username *
                      </label>
                      <input
                        className="form-control numberOnly"
                        name="car05itouch_user_name"
                        id="validationmobile  "
                        placeholder="card number"
                        onChange={handleChange}
                      />
                      {formErrors.car05itouch_user_name && (
                        <div className="error">
                          {formErrors.car05itouch_user_name}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="row">
                    {/* ACCT no verify */}
                    <div className="col-md-6 mt-3">
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
                          value={formValues.car05acc_no}
                          name="car05acc_no"
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
                      {formErrors.car05acc_no && (
                        <div className="error">{formErrors.car05acc_no}</div>
                      )}
                    </div>
                    {/* OTP verify */}
                    {otpVerify === true && (
                      <div className="col-md-6 mt-3">
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
                          An OTP verification code will be sent to your phone
                          via SMS. Copy the OTP code from the SMS into the OTP
                          box.
                        </p>
                        <p id="reOTP" style={{ display: "none" }}>
                          New OTP verification code had been resent to your
                          phone via SMS.
                        </p>
                      </div>
                    )}
                    <div className="col-md-5 mt-3">
                      <label
                        htmlFor="inputaccountsname"
                        className="form-label yolo"
                      >
                        Account Holder's Name
                      </label>
                      <input
                        type="accountsname"
                        className="form-control"
                        id="accountsname"
                        name="car05acc_holder_name"
                        disabled
                        value={otpApi?.name || ""}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mt-3 form">
                      <label htmlFor="contact" className="form-label yolo">
                        Contact
                      </label>
                      <input
                        type="contact"
                        className="form-control numberOnly "
                        name="car05contact_no"
                        id="contact"
                        disabled
                        value={otpApi?.contact || ""}
                      />
                    </div>
                    <div className="col-md-5 mt-3">
                      <label htmlFor="inputemailid" className="form-label yolo">
                        Email ID
                      </label>
                      <input
                        name="car05email_id"
                        className="form-control"
                        id="inputemail"
                        value={otpApi?.email || ""}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mt-3 form">
                      <label
                        htmlFor="inputtransaction"
                        className="form-label yolo"
                      >
                        Transaction Date
                      </label>
                      <input
                        type="date"
                        name="car05tran_date"
                        className="form-control"
                        id="inputtransaction"
                        placeholder="XX-XX-XXXX"
                        onChange={handleChange}
                        value={formValues.car05tran_date}
                      />
                      {formErrors.car05tran_date && (
                        <div className="error">{formErrors.car05tran_date}</div>
                      )}
                    </div>
                    <div className="col-md-5 mt-3">
                      <label
                        htmlFor="inputclaim/Dispute"
                        className="form-label yolo numberOnly"
                      >
                        Claim/Dispute Amount
                      </label>
                      <input
                        type="claim"
                        className="form-control"
                        id="inputclaim_Dispute"
                        name="car05dispute_amount"
                        placeholder="NPR"
                        onChange={handleChange}
                        value={formValues.car05dispute_amount}
                      />
                      {formErrors.car05dispute_amount && (
                        <div className="error">
                          {formErrors.car05dispute_amount}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mt-3">
                      <label
                        htmlFor="inputmerchant"
                        className="form-label yolo"
                      >
                        Transaction Bank/ Merchant
                      </label>
                      <input
                        type="Transaction Bank/ Merchant"
                        name="car05txn_bank"
                        className="form-control"
                        id="inputTransaction Bank/ Merchant"
                        placeholder="Bank Name"
                        onChange={handleChange}
                        value={formValues.car05txn_bank}
                      />
                      {formErrors.car05txn_bank && (
                        <div className="error">{formErrors.car05txn_bank}</div>
                      )}
                    </div>
                    <div className="col-md-5 mt-3">
                      <label
                        htmlFor="inputlocation"
                        className="form-label yolo"
                      >
                        Transaction Location
                      </label>
                      <input
                        type="location"
                        name="car05txn_location"
                        className="form-control"
                        id="inputlocation"
                        placeholder="Location"
                        onChange={handleChange}
                        value={formValues.car05txn_location}
                      />
                      {formErrors.car05txn_location && (
                        <div className="error">
                          {formErrors.car05txn_location}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mt-5">
                    <p className="form-label yolo">
                      Please tick on below dispute options as appropriate:
                    </p>
                    <div className="form-check ps-5">
                      <div className="d-flex align-items-start">
                        <input
                          className="form-check-input me-3"
                          type="checkbox"
                          id="flexCheckDefault"
                          defaultValue="true"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                          style={{ paddingTop: "10px" }}
                        >
                          <p className="form-label yolo">
                            I used my Debit/Credit/OD card to perform
                            transaction. However, the transaction was
                            unsuccessful/declined & amp; my account was debited
                          </p>
                        </label>
                      </div>
                    </div>
                    <div className="form-check ps-5">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        defaultValue="true"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                        style={{ paddingTop: "15px" }}
                      >
                        <p className="form-label yolo">
                          Mentioned transaction was charged to my account more
                          than once
                        </p>
                      </label>
                    </div>
                    <div className="form-check ps-5">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        defaultValue="true"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                        style={{ paddingTop: "15px" }}
                      >
                        <p className="form-label yolo">
                          I had paid by other means or purchase was cancelled
                        </p>
                      </label>
                    </div>
                    <div className="form-check ps-5">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        defaultValue="true"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                        style={{ paddingTop: "15px" }}
                      >
                        <p className="form-label yolo">
                          The amount billed by Merchant was different from Sales
                          draft or documents that I have authorized
                        </p>
                      </label>
                    </div>
                    <div className="form-check ps-5">
                      <div className="d-flex align-items-start">
                        <input
                          className="form-check-input me-3"
                          type="checkbox"
                          id="flexCheckDefault"
                          defaultValue="true"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                          style={{ paddingTop: "10px" }}
                        >
                          <p className="form-label yolo">
                            Unauthorized transaction - I did not authorize or
                            participate in the transaction(s) mentioned above or
                            authorized anyone to engage in the transaction(s).
                            At the time of this transaction the card was in my
                            possession
                          </p>
                        </label>
                      </div>
                    </div>
                    <div className="form-check ps-5">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        defaultValue={show}
                        onChange={handleSelectionChangeRadio}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                        style={{ paddingTop: "15px" }}
                      >
                        <p className="form-label yolo">
                          Any other information (please specify)
                        </p>
                      </label>
                    </div>
                    {show === true && (
                      <div id="otherremarks">
                        <label htmlFor="car05txn_other_remarks">
                          {" "}
                          Remarks <span>*</span>
                        </label>
                        <textarea
                          className="form-control"
                          cols={5}
                          id="car05txn_other_remarks"
                          name="car05txn_other_remarks"
                          rows={5}
                          defaultValue={""}
                          onChange={handleChange}
                        />
                        <span
                          className="field-validation-valid text-danger"
                          data-valmsg-for="car05txn_other_remarks"
                          data-valmsg-replace="true"
                        />
                      </div>
                    )}
                    <div className="form-check ps-5 mt-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        required
                        defaultValue="true"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                        style={{ paddingTop: "15px" }}
                      >
                        <p className="form-label yolo">
                          I have read, understood and agree to the
                          <span className="terms">Terms And Conditions</span>
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="col-12 mt-2 mb-5" id="btn">
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
    </div>
  );
}

export default Disputeclaim;
