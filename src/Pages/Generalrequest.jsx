import React from "react";

import { useState, useEffect } from "react";
import Select from "react-select";
import useFormValues from "../States/GeneralRequest.tsx";
import Modal from "react-modal";
import useFormValidationSchema from "../Validation/GeneralValidation";
import { API_URL } from "../Utilities/Constants";
function Generalrequest() {
  const [selectedOption, setSelectedOption] = useState("");

  const eligibilityType = selectedOption;
  const validationSchema = useFormValidationSchema(eligibilityType);
  const [formValues, setFormValues] = useFormValues(eligibilityType);
  const [formErrors, setFormErrors] = useState({});
  const [typesApi, setTypesApi] = useState([]);
  const [branchApi, setBranchApi] = useState([]);
  const [serviceTypeApi, setServiceTypeApi] = useState([]);
  const [customertypeApi, setCustomertypeApi] = useState([]);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response0 = await fetch(`${API_URL}/OnlineRequest/Types`);
        const data0 = await response0.json();
        setTypesApi(data0);

        const response1 = await fetch(`${API_URL}/GeneralComponents/Branch`);
        const data1 = await response1.json();
        setBranchApi(data1);

        const response2 = await fetch(`${API_URL}/OnlineRequest/ServiceType`);
        const data2 = await response2.json();
        setServiceTypeApi(data2);

        const response3 = await fetch(`${API_URL}/OnlineRequest/CustomerType`);
        const data3 = await response3.json();
        setCustomertypeApi(data3);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
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
  //fetch Account verify data from the api
  const fetchAcctVerifyData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/GeneralComponents/VerifyAccount?AccNo=${formValues.car02acc_no}`
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
        `${API_URL}/GeneralComponents/VerifyOTP?AccNo=${formValues.car02acc_no}&OTP=${otpInput}`
      );
      const jsonData = await response.json();
      setOtpApi(jsonData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // // ////////checking
  useEffect(() => {
    // Perform the desired action whenever `[]` changes
    console.log(formValues);
  }, [formValues]);
  //post fetch
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${API_URL}/OnlineRequest`; // Replace with your API endpoint URL

    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      // Validate the form using Yup
      await validationSchema.validate(formValues, { abortEarly: false });

      // Clear form errors if form is valid
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
      car02acc_holder_name: otpApi?.name || prevValues.car02acc_holder_name,
      car02mobile_no: otpApi?.contact || prevValues.car02mobile_no,
      car02email: otpApi?.email || prevValues.car02email,
    }));
  }, [otpApi?.name, otpApi?.contact, otpApi?.email]);
  return (
    <div classname="GeneralRequest">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 pcolor mb-5" id="loan">
            <h4 className="text-warning">General Request</h4>
          </div>
        </div>

        <div className="container">
          {/* general request fom  */}
          <div className="row justify-content-evenly p-0">
            <div className="col-md-11 col-lg-9 col-xxl-8">
              <div className="row" id="box-shadow">
                <div className="row">
                  <div className="button">
                    <a href="index.html">
                      <button id="bckbtn" className="back-button">
                        Back
                        <img src="/Assets/images/Exit icon/exit.png" alt="" />
                      </button>
                    </a>
                  </div>
                  <div className="col-12 mt-4" id="loantype">
                    <p className="text-center">How can we help you?</p>
                  </div>
                </div>
                <form method="post" onSubmit={handleSubmit}>
                  <div className="row mt-5">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-2" />
                        <div className="col-8">
                          <div className="mb-3" id="Online">
                            <label
                              htmlFor="formGroupExampleInput"
                              className="form-label yolo"
                            >
                              Online Request Type
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              id="inputstate"
                              className="form-select valid"
                              name="car02car01uin"
                              onChange={handleDropdownChange}
                            >
                              <option value>
                                {" "}
                                -- Select Online Request --{" "}
                              </option>

                              {typesApi.map((item) => (
                                <option
                                  key={item.car01uin}
                                  value={item.car01uin}
                                >
                                  {item.car01title}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* ACCT no verify */}
                          <div className="md-3 ">
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
                                value={formValues.car02acc_no}
                                name="car02acc_no"
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
                            {formErrors.car02acc_no && (
                              <div className="error">
                                {formErrors.car02acc_no}
                              </div>
                            )}
                          </div>
                          {/* OTP verify */}
                          {otpVerify === true && (
                            <div className="md-3 ">
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
                                An OTP verification code will be sent to your
                                phone via SMS. Copy the OTP code from the SMS
                                into the OTP box.
                              </p>
                              <p id="reOTP" style={{ display: "none" }}>
                                New OTP verification code had been resent to
                                your phone via SMS.
                              </p>
                            </div>
                          )}

                          <div className="mb-3">
                            <label
                              htmlFor="validationholder"
                              className="form-label yolo"
                              id="Online"
                            >
                              Account Holder's Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationholder accountholder required"
                              name="accountholder"
                              disabled
                              value={otpApi?.name || ""}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="validationemail"
                              className="form-label yolo"
                              id="Online"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              name="Email"
                              id="validationemail  "
                              disabled
                              value={otpApi?.email || ""}
                            />
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor="validationmobile"
                              className="form-label yolo"
                              id="Online"
                            >
                              Mobile Number
                            </label>
                            <input
                              className="form-control numberOnly"
                              name="mobilenumber"
                              id="validationmobile  "
                              disabled
                              value={otpApi?.contact || ""}
                            />
                          </div>
                          {/*branch*/}
                          {selectedOption === "1" && (
                            <div className="md-3">
                              <label
                                htmlFor="branch"
                                className="form-label yolo"
                              >
                                Preferred Branch
                              </label>
                              <Select
                                name="car02bra01uin"
                                id="select_branch"
                                value={branchApi.find(
                                  (item) => item.bra01name === ""
                                )}
                                onChange={handleChangeSelect}
                                options={branchApi.map((item) => ({
                                  value: item.bra01uin,
                                  label: item.bra01name,
                                  name: "car02bra01uin",
                                }))}
                                placeholder="Name of the Branch"
                              />
                              {formErrors.car02bra01uin && (
                                <div className="error">
                                  {formErrors.car02bra01uin}
                                </div>
                              )}
                            </div>
                          )}
                          {/* Customer Type* */}
                          {(selectedOption === "4" ||
                            selectedOption === "2") && (
                            <div className="mb-3" id="Online">
                              <label
                                htmlFor="formGroupExampleInput"
                                className="form-label yolo"
                              >
                                Customer Type*
                              </label>
                              <select
                                id="inputstate"
                                className="form-select"
                                name="car02enum_cus_type"
                                onChange={handleChange}
                              >
                                <option selected>-- select an option --</option>
                                {customertypeApi.map((item) => (
                                  <option
                                    key={item.bindField}
                                    value={item.bindField}
                                  >
                                    {item.displayField}
                                  </option>
                                ))}
                              </select>
                              {formErrors.car02enum_cus_type && (
                                <div className="error">
                                  {formErrors.car02enum_cus_type}
                                </div>
                              )}
                            </div>
                          )}

                          {(selectedOption === "4" ||
                            selectedOption === "2") && (
                            <div className="mb-3" id="Online">
                              <label
                                htmlFor="formGroupExampleInput"
                                className="form-label yolo"
                              >
                                Service Type*
                              </label>
                              <select
                                id="inputstate"
                                className="form-select"
                                name="car02enum_ser_type"
                                onChange={handleChange}
                              >
                                <option selected>-- select an option --</option>
                                {serviceTypeApi.map((item) => (
                                  <option
                                    key={item.bindField}
                                    value={item.bindField}
                                  >
                                    {item.displayField}
                                  </option>
                                ))}
                              </select>
                              {formErrors.car02enum_ser_type && (
                                <div className="error">
                                  {formErrors.car02enum_ser_type}
                                </div>
                              )}
                            </div>
                          )}

                          {(selectedOption === "2" ||
                            selectedOption === "4") && (
                            <div className="md-3">
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
                                <div className="error">
                                  {formErrors.CitizenShipFile}
                                </div>
                              )}
                            </div>
                          )}

                          {(selectedOption === "2" ||
                            selectedOption === "4") && (
                            <div className="md-3">
                              <label
                                htmlFor="inputCitizenship"
                                className="form-label yolo required"
                              >
                                Upload passportSize photo
                              </label>
                              <input
                                className="form-control form-control-lg"
                                id="formFileLg"
                                type="file"
                                name="SignatureFile"
                                onChange={handleChange}
                              />
                              {formErrors.SignatureFile && (
                                <div className="error">
                                  {formErrors.SignatureFile}
                                </div>
                              )}
                            </div>
                          )}

                          {selectedOption === "5" && (
                            <div className="mb-3">
                              <label
                                htmlFor="validationmobile"
                                className="form-label yolo"
                                id="Online"
                              >
                                Card number
                              </label>
                              <input
                                className="form-control numberOnly"
                                name="car02card_no"
                                id="validationmobile  "
                                placeholder="card number"
                                onChange={handleChange}
                              />
                              {formErrors.car02card_no && (
                                <div className="error">
                                  {formErrors.car02card_no}
                                </div>
                              )}
                            </div>
                          )}

                          {selectedOption === "5" && (
                            <div className="mb-3">
                              <label
                                htmlFor="validationmobile"
                                className="form-label yolo"
                                id="Online"
                              >
                                Reason for block
                              </label>
                              <input
                                className="form-control numberOnly"
                                name="car02reason_for_block"
                                id="validationmobile  "
                                placeholder="Reason for block"
                                onChange={handleChange}
                              />
                              {formErrors.car02reason_for_block && (
                                <div className="error">
                                  {formErrors.car02reason_for_block}
                                </div>
                              )}
                            </div>
                          )}

                          <div className="form-check mb-3 m-3">
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
                              <p className="form-label yolo">
                                I have read, understood and agree to the (Terms
                                And Conditions).
                              </p>
                            </label>
                          </div>
                        </div>

                        <div className="col-12 mt-5 mb-5" id="btn">
                          <button
                            type="submit"
                            className="btn btn-outline-dark text-danger ps-4 pe-4"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                {/* Modal */}
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

export default Generalrequest;
