import React from "react";
import ExitImg from "../Assets/images/Exit icon/exit.png";
import { useState, useEffect } from "react";
import Select from "react-select";

function Generalrequest() {
  const [selectedOption, setSelectedOption] = useState("1");

  const [typesApi, setTypesApi] = useState([]);
  const [branchApi, setBranchApi] = useState([]);
  const [serviceTypeApi, setServiceTypeApi] = useState([]);
  const [customertypeApi, setCustomertypeApi] = useState([]);
  const [otpVerify, setOtpVerify] = useState(false);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response0 = await fetch(
          "http://api.onlineform.ants.com.np/OnlineRequest/Types"
        );
        const data0 = await response0.json();
        setTypesApi(data0);

        const response1 = await fetch(
          "http://api.onlineform.ants.com.np/GeneralComponents/Branch"
        );
        const data1 = await response1.json();
        setBranchApi(data1);

        const response2 = await fetch(
          "http://api.onlineform.ants.com.np/OnlineRequest/ServiceType"
        );
        const data2 = await response2.json();
        setServiceTypeApi(data2);

        const response3 = await fetch(
          "http://api.onlineform.ants.com.np/OnlineRequest/CustomerType"
        );
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
                        <img src={ExitImg} alt="" />
                      </button>
                    </a>
                  </div>
                  <div className="col-12 mt-4" id="loantype">
                    <p className="text-center">How can we help you?</p>
                  </div>
                </div>
                <form method="post" id="myform">
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
                                // value={formValues.car06acc_no}
                                name="car06acc_no"
                                aria-label="Account Number"
                                aria-describedby="verify"
                                // onChange={handleChange}
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-danger btnclick otpStep"
                                  id="verifyX"
                                  type="button"
                                  // onClick={fetchAcctVerifyData}
                                >
                                  <i className /> Verify Account
                                </button>
                              </div>
                            </div>
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
                                  // value={acctApi.ref_id}
                                />
                                <div className="input-group-append">
                                  <button
                                    className="btn btn-warning"
                                    type="button"
                                    id="VerifyOtp"
                                    // onClick={fetchOtpVerifyData}
                                  >
                                    <i className="fas fa-sync-alt" /> Verify OTP
                                  </button>
                                </div>
                                <div className="input-group-append">
                                  <button
                                    className="btn btn-primary"
                                    type="button"
                                    id="resendOtp"
                                    // onClick={fetchAcctVerifyData}
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
                            />
                          </div>
                          {/*Business Type*/}
                          {selectedOption === "1" && (
                            <div className="md-3">
                              <label
                                htmlFor="branch"
                                className="form-label yolo"
                              >
                                Preferred Branch
                              </label>
                              <Select
                                name="car06bra01uin"
                                id="select_branch"
                                value={branchApi.find(
                                  (item) => item.bra01name === ""
                                )}
                                onChange={handleChangeSelect}
                                options={branchApi.map((item) => ({
                                  value: item.bra01uin,
                                  label: item.bra01name,
                                  name: "car06bra01uin",
                                }))}
                                placeholder="Name of the Branch"
                              />
                            </div>
                          )}

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
                                name="select_req"
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
                                name="select_req"
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
                                // onChange={handleChange}
                              />
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
                                name="CitizenShipFile"
                                // onChange={handleChange}
                              />
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
                                name="mobilenumber"
                                id="validationmobile  "
                                placeholder="card number"
                              />
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
                                name="mobilenumber"
                                id="validationmobile  "
                                placeholder="Reason for block"
                              />
                            </div>
                          )}

                          <div className="form-check mb-3 m-3">
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
                            id="submit"
                          >
                            Send
                          </button>
                        </div>
                        {/* Modal */}
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex={-1}
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <h1
                                className="modal-title text-center"
                                id="exampleModalLabel"
                              >
                                Successful!
                              </h1>
                              <div className="modal-body text-center">
                                {/* ... 375 x 285 */}
                                Your form has been successfully submitted.
                              </div>
                              <div className="modal-footer m-3">
                                <p
                                  className="text-center"
                                  data-bs-dismiss="modal"
                                >
                                  Okay
                                </p>
                                {/* <button type="button" class="btn btn-dark" >Okay</button> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Generalrequest;
