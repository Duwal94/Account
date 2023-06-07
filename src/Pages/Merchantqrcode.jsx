import { useState, useEffect } from "react";
import ExitImg from "../Assets/images/Exit icon/exit.png";
import Select from "react-select";

function Merchantqrcode() {
  const [selection, setSelection] = useState("business");
  const [branchApi, setBranchApi] = useState([]);
  const [registeredApi, setRegisteredApi] = useState([]);
  const [businessNatureApi, setBusinessNatureApi] = useState([]);
  const [otpVerify, setOtpVerify] = useState(true);

  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          "http://api.onlineform.ants.com.np/MerchantAcquisition/Branch"
        );
        const data1 = await response1.json();
        setBranchApi(data1);

        const response2 = await fetch(
          "http://api.onlineform.ants.com.np/MerchantAcquisition/RegisteredWith"
        );
        const data2 = await response2.json();
        setRegisteredApi(data2);
        const response3 = await fetch(
          "http://api.onlineform.ants.com.np/GeneralComponents/BusinessNatures"
        );
        const data3 = await response3.json();
        setBusinessNatureApi(data3);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
                    Back <img src={ExitImg} alt="" />
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
              >
                <div className="col-12">
                  <div className="row mt-5 ">
                    <div className="col-12 text-center">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="ind_bus_switch"
                          id="ind_switch"
                          value="individual"
                          checked={selection === "individual"}
                          onChange={handleSelectionChange}
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
                          name="ind_bus_switch"
                          id="bus_switch"
                          value="business"
                          checked={selection === "business"}
                          onChange={handleSelectionChange}
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
                    name="Refferers_name"
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputnumber" className="form-label yolo">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="form-control numberOnly"
                    id="inputMiddleName"
                    placeholder="Contact Number(Refferer's)"
                    name="r_contact"
                  />
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
                      name="mobilenumber"
                      aria-label="Account Number"
                      aria-describedby="verify"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-danger btnclick otpStep"
                        id="verifyX"
                        type="button"
                      >
                        <i className /> Verify Account
                      </button>
                    </div>
                  </div>
                </div>
                {/* OTP verify */}
                {otpVerify === true && (
                  <div className="col-md-5 ">
                    <label htmlFor="otpnumber">
                      OTP Number
                      <span className="text-danger">*</span>
                    </label>
                    <div className="input-group mb-4">
                      <input type="text" className="form-control" />
                      <div className="input-group-append">
                        <button
                          className="btn btn-warning"
                          type="button"
                          id="VerifyOtp"
                        >
                          <i className="fas fa-sync-alt" /> Verify OTP
                        </button>
                      </div>
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary"
                          type="button"
                          id="resendOtp"
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

                <div className="col-md-5">
                  <label htmlFor="inputname" className="form-label yolo">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputname"
                    placeholder="Enter your name"
                    name="name"
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputnumber" className="form-label yolo">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    className="form-control numberOnly"
                    id="inputnumber"
                    placeholder="Contact Number(Refferer's)"
                    name="mobilenumber"
                  />
                </div>
                {selection === "business" && (
                  <div className="col-md-5">
                    <label htmlFor="inputpan" className="form-label yolo">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      className="form-control numberOnly"
                      id="inputpan"
                      placeholder="01-1918292"
                      name="pan"
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
                      Registered with
                    </label>
                    <select
                      className="form-select"
                      id="business_type"
                      name="eli01nature_of_business"
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
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          defaultChecked
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
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
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
                {selection === "business" && (
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
                  </div>
                )}
                {selection === "business" && (
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
                      name="Refferers_name"
                    />
                  </div>
                )}
                {selection === "business" && (
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
                      name="Refferers_name"
                    />
                  </div>
                )}
                {selection === "business" && (
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
                      name="Refferers_name"
                    />
                  </div>
                )}
                {selection === "business" && (
                  <div className="col-md-5">
                    <label
                      htmlFor="inputrefferedby"
                      className="form-label yolo"
                    >
                      Contact Number of Contact Person *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Contact Number of Contact Person "
                      name="Refferers_name"
                    />
                  </div>
                )}

                <div className="col-md-5">
                  <label htmlFor="inputaddress" className="form-label yolo">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputaddress"
                    placeholder="Enter your address"
                  />
                </div>

                {/* Preferred Branch */}
                <div className="col-md-5">
                  <label htmlFor="branch" className="form-label yolo">
                    Preferred Branch
                  </label>
                  <Select
                    name="eli01bra01uin"
                    id="select_branch"
                    value={branchApi.find((item) => item.bra01name === "")}
                    options={branchApi.map((item) => ({
                      value: item.bra01uin,
                      label: item.bra01name,
                      name: "eli01bra01uin",
                    }))}
                    placeholder="Name of the Branch"
                  />
                </div>

                {selection === "business" && (
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
                    />
                  </div>
                )}
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
                  />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Merchantqrcode;
