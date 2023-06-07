import  { useState,useEffect } from 'react';
import ExitImg from '../Assets/images/Exit icon/exit.png';
import FaceB from "../Assets/images/After_Verification/Social Network/Facebook.png"
import TIW from "../Assets/images/After_Verification/Social Network/Twitter.png"
import LinkedIn from "../Assets/images/After_Verification/Social Network/LinkedIn.png"

function OnlineKyc() {

    const [selection, setSelection] = useState("terms");
    const [internalRadio, setInternalradio] = useState("citizen");
    const [districtApi, setDistrictApi] = useState([]);
    const [branchApi, setBranchApi] = useState([]);
    const handleChangeSelection = (newValue) => {
      setSelection(newValue);
    };
    const handleSelectionChangeRadio = (event) => {
      setSelection(event.target.value);
    };
    const handleSelectionChangeIntenalRadio = (event) => {
      setInternalradio(event.target.value);
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response1 = await fetch(
            "http://api.onlineform.ants.com.np/KYC/GetDistrictList"
          );
          const data1 = await response1.json();
          setDistrictApi(data1);

          const response2 = await fetch(
            "http://api.onlineform.ants.com.np/GeneralComponents/Branch"
          );
          const data2 = await response2.json();
          setBranchApi(data2);
  
        
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
    return (
      <div>  <div className="row " id="kyc_banner">
        <div className="col-12 pcolor mb-5" id="loan">
          <h4 className="card-title text-warning">KYC Form</h4>
        </div>
      </div>
        {/*Terms and Conditions section for KYC Page*/}
        {selection === "terms" && (<div className="row justify-content-evenly  mt-5 mb-5 rounded-3" id="terms">
          <div className="col-8 ">
            <div className="row justify-content-evenly rounded-3" id="form">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 mt-5 mb-2" id="loantype">
                    <p className="text-center">Terms and Conditions</p>
                  </div>
                </div>
              </div>
              <div className="col-10">
                <div className="row justify-content-evenly  pt-4 mb-4" id="inner-box">
                  <div className="col-12">
                    <p>You can acquire Content on our Services for free or for a charge, either of which is referred to as a “Transaction.” Each Transaction is an electronic contract between you and Apple, and/or you and the entity providing the Content on our Services. However, if you are a customer of Apple Distribution International Ltd., Apple Distribution International Ltd. is the merchant of record for some Content you acquire from Apple Books, Apple Podcasts, or App Store as displayed on the product page and/or during the acquisition process for the relevant Service. In such case, you acquire the Content from Apple Distribution International Ltd., which is licensed by the Content provider (e.g., App Provider (as defined below), book publisher, etc.). When you make your first Transaction, we will ask you to choose how frequently we should ask for your password for future Transactions. On applicable Apple hardware, if you enable Touch ID for Transactions, we will ask you to authenticate all Transactions with your fingerprint, and if you enable Face ID for Transactions, we will ask you to authenticate all Transactions using facial recognition. Manage your password settings at any time by following these instructions: https://support.apple.com/HT204030.</p>
                    <p>You can acquire Content on our Services for free or for a charge, either of which is referred to as a “Transaction.” Each Transaction is an electronic contract between you and Apple, and/or you and the entity providing the Content on our Services. However, if you are a customer of Apple Distribution International Ltd., Apple Distribution International Ltd. is the merchant of record for some Content you acquire from Apple Books, Apple Podcasts, or App Store as displayed on the product page and/or during the acquisition process for the relevant Service. In such case, you acquire the Content from Apple Distribution International Ltd., which is licensed by the Content provider (e.g., App Provider (as defined below), book publisher, etc.). When you make your first Transaction, we will ask you to choose how frequently we should ask for your password for future Transactions. On applicable Apple hardware, if you enable Touch ID for Transactions, we will ask you to authenticate all Transactions with your fingerprint, and if you enable Face ID for Transactions, we will ask you to authenticate all Transactions using facial recognition. Manage your password settings at any time by following these instructions: https://support.apple.com/HT204030.</p>
                    <p>You can acquire Content on our Services for free or for a charge, either of which is referred to as a “Transaction.” Each Transaction is an electronic contract between you and Apple, and/or you and the entity providing the Content on our Services. However, if you are a customer of Apple Distribution International Ltd., Apple Distribution International Ltd. is the merchant of record for some Content you acquire from Apple Books, Apple Podcasts, or App Store as displayed on the product page and/or during the acquisition process for the relevant Service. In such case, you acquire the Content from Apple Distribution International Ltd., which is licensed by the Content provider (e.g., App Provider (as defined below), book publisher, etc.). When you make your first Transaction, we will ask you to choose how frequently we should ask for your password for future Transactions. On applicable Apple hardware, if you enable Touch ID for Transactions, we will ask you to authenticate all Transactions with your fingerprint, and if you enable Face ID for Transactions, we will ask you to authenticate all Transactions using facial recognition. Manage your password settings at any time by following these instructions: https://support.apple.com/HT204030.</p>
                    <p>You can acquire Content on our Services for free or for a charge, either of which is referred to as a “Transaction.” Each Transaction is an electronic contract between you and Apple, and/or you and the entity providing the Content on our Services. However, if you are a customer of Apple Distribution International Ltd., Apple Distribution International Ltd. is the merchant of record for some Content you acquire from Apple Books, Apple Podcasts, or App Store as displayed on the product page and/or during the acquisition process for the relevant Service. In such case, you acquire the Content from Apple Distribution International Ltd., which is licensed by the Content provider (e.g., App Provider (as defined below), book publisher, etc.). When you make your first Transaction, we will ask you to choose how frequently we should ask for your password for future Transactions. On applicable Apple hardware, if you enable Touch ID for Transactions, we will ask you to authenticate all Transactions with your fingerprint, and if you enable Face ID for Transactions, we will ask you to authenticate all Transactions using facial recognition. Manage your password settings at any time by following these instructions: https://support.apple.com/HT204030.</p>
                    <p>You can acquire Content on our Services for free or for a charge, either of which is referred to as a “Transaction.” Each Transaction is an electronic contract between you and Apple, and/or you and the entity providing the Content on our Services. However, if you are a customer of Apple Distribution International Ltd., Apple Distribution International Ltd. is the merchant of record for some Content you acquire from Apple Books, Apple Podcasts, or App Store as displayed on the product page and/or during the acquisition process for the relevant Service. In such case, you acquire the Content from Apple Distribution International Ltd., which is licensed by the Content provider (e.g., App Provider (as defined below), book publisher, etc.). When you make your first Transaction, we will ask you to choose how frequently we should ask for your password for future Transactions. On applicable Apple hardware, if you enable Touch ID for Transactions, we will ask you to authenticate all Transactions with your fingerprint, and if you enable Face ID for Transactions, we will ask you to authenticate all Transactions using facial recognition. Manage your password settings at any time by following these instructions: https://support.apple.com/HT204030.</p>
                    <p>You can acquire Content on our Services for free or for a charge, either of which is referred to as a “Transaction.” Each Transaction is an electronic contract between you and Apple, and/or you and the entity providing the Content on our Services. However, if you are a customer of Apple Distribution International Ltd., Apple Distribution International Ltd. is the merchant of record for some Content you acquire from Apple Books, Apple Podcasts, or App Store as displayed on the product page and/or during the acquisition process for the relevant Service. In such case, you acquire the Content from Apple Distribution International Ltd., which is licensed by the Content provider (e.g., App Provider (as defined below), book publisher, etc.). When you make your first Transaction, we will ask you to choose how frequently we should ask for your password for future Transactions. On applicable Apple hardware, if you enable Touch ID for Transactions, we will ask you to authenticate all Transactions with your fingerprint, and if you enable Face ID for Transactions, we will ask you to authenticate all Transactions using facial recognition. Manage your password settings at any time by following these instructions: https://support.apple.com/HT204030.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center mb-4">
                <button type="button" className="btn text-dark" id="decline">Decline</button>
                <button type="button" className="btn btn-outline-dark text-danger ps-4 pe-4" id="agree" onClick={() => handleChangeSelection('Account')}>  I Agree</button>
              </div>
            </div>
          </div>
        </div>)}
        {/*Verification Section inorder to Proceed*/}
        {selection === "Account" && (<div className="row justify-content-evenly  mt-5 mb-5" id="verify">
          <div className="col-md-11 col-lg-9 col-xl-8" id="form-section">
            <form className="row" id="form" style={{ height: 539 }}>
              <div className="row">
                <div className="button">
                  <a className="btn back-button ps-3" href="KYCform.html">
                    Back
                    <img src={ExitImg} alt="..." />
                  </a>
                </div>
              </div>
              <div className="row mt-5 mb-5">
                <div className="col-12 text-center">
                  <p>
                    Do you already have KYC Account with
                    <strong>Mahalaxmi Bikas Bank Ltd.</strong>
                    ?
                  </p>
                  <div className="d-flex justify-content-center">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="yes_bus_switch"
                        id="yes_switch"
                        value="yes"
                        checked={selection === 'yes'}
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
                        checked={selection === 'no'}
                        onChange={handleSelectionChangeRadio}
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
        </div>)}
        {/* progress bar section  */}
        <div className="row justify-content-evenly d-none mt-5 mb-5" id="progress-section">
          <div className="col-12">
            <div className="row">
              <div className="progress container d-flex justify-content-center align-items-center">
                <div className="progresses">
                  <div className="steps" style={{ border: '1px solid black' }}>
                    <span><i className="fa fa-check" /></span>
                  </div>
                  <span className="line" />
                  <div className="steps" style={{ border: '1px solid black' }}>
                    <span><i className="fa fa-check" /></span>
                  </div>
                  <span className="line" />
                  <div className="steps" id="steps" style={{ border: '1px solid black' }}>
                    <span className="hello font-weight-bold">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* General Details Form section starts */}
        {selection === "no" && (<div className="row justify-content-evenly  mt-5 mb-5" id="generald">
          <div className="col-md-11 col-lg-9 col-xxl-8">
            <div className="row" id="box-shadow">
              <div className="row">
                <div className="button">
                  <button className="back-button ps-3">
                    Back
                    <img src={ExitImg} alt="..." />
                  </button>
                </div>
              </div>
              <div className="row ps-5">
                <form className="row gx-4 gy-4">
                <div className="col-md-5 business ">
                           {/*Business Type*/}
                           <label
                             htmlFor="inputbusinesstype"
                             className="form-label yolo "
                           >
                            Preferred branch
                           </label>
                           <select
                             className="form-select"
                             id="business_type"
                             name="eli01nature_of_business"
                       
                           >
                             <option value={0} selected disabled>
                           Preferred branch
                             </option>
                             {branchApi.map((item) => (
                               <option key={item.bindField} value={item.bindField}>
                                 {item.displayField}
                               </option>
                             ))}
                           </select>
                         </div>
                  <div className="col-md-5">                      {/*Saluation Drop Down*/}
                    <label htmlFor="validationAccount" className="form-label yolo" id="Online">
                      Salutation
                    </label>
                    
<div>
  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" />
  <label className="form-check-label" htmlFor="inlineRadio1">Mr.</label>
  <div className="form-check form-check-inline">
    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" />
    <label className="form-check-label" htmlFor="inlineRadio2">Mrs.</label>
  </div>
  <div className="form-check form-check-inline">
    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" defaultValue="option3"  />
    <label className="form-check-label" htmlFor="inlineRadio3">M/S</label>
  </div>
  <div className="form-check form-check-inline">
    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" defaultValue="option3"  />
    <label className="form-check-label" htmlFor="inlineRadio3">Miss</label>
  </div>
  <div className="form-check form-check-inline">
    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" defaultValue="option3"  />
    <label className="form-check-label" htmlFor="inlineRadio3">Minor</label>
  </div>
</div>

                  </div>
                  <div className="col-12 mt-4">                     {/*PERSONAL DETAILS TITLE*/}
                    <h5 id="personal-details">Personal Details</h5>
                  </div>
                  <div className="col-md-4 ">                      {/*First Name Field*/}
                    <label htmlFor="validationname" className="form-label yolo" id="Online">
                      First Name
                    </label>
                    <input type="firstname" className="form-control" id="validationAccount required" placeholder="First Name" required />
                    <div className="invalid-feedback">
                      You cannot have this field empty!!
                    </div>
                  </div>
                  <div className="col-md-4">                       {/*Middle Name Field*/}
                    <label htmlFor="inputMiddleName" className="form-label yolo">
                      Middle Name
                    </label>
                    <input type="text" className="form-control" id="inputMiddleName" placeholder="Middle Name" required />
                  </div>
                  <div className="col-md-3">                       {/*Last Name Field*/}
                    <label htmlFor="inputLastName" className="form-label yolo">
                      Last Name
                    </label>
                    <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" required />
                  </div>
                  <div className="col-md-4">                       {/*Mobile Number Field*/}
                    <label htmlFor="inputMobileNumber" className="form-label yolo">
                      Mobile Number
                    </label>
                    <input type="text" className="form-control" id="inputMobileNumber" placeholder="+977 9898989898" required />
                  </div>
                  <div className="col-md-4">                       {/*Email Address Field*/}
                    <label htmlFor="inputEmail" className="form-label yolo">Email</label>
                    <input type="text" className="form-control" id="inputEmail" placeholder="username@gmail.com" required />
                  </div>
                  <div className="col-md-3">                       {/*Telephone Number Field*/}
                    <label htmlFor="inputTelephoneNumber" className="form-label yolo">
                      Telephone Number
                    </label>
                    <input type="text" className="form-control" id="inputTelephoneNumber" placeholder="01-0024984" required />
                  </div>
                  <div className="col-md-4">                       {/*Mobile Number 2 Field*/}
                    <label htmlFor="inputMobileNumber2" className="form-label yolo">
                      Mobile Number 2 (Optional)
                    </label>
                    <input type="text" className="form-control" id="inputMobileNumber2" placeholder="01-0024984" required />
                  </div>
                  <div className="col-md-4">                       {/*Date of Birth B.S. Date Picker*/}
                    <label htmlFor="dob" className="form-label yolo">
                      Date of Birth (B.S.)
                    </label>
                    <input type="date" name="DOB" className="form-control text" placeholder required />
                  </div>
                  <div className="col-md-3">                       {/*Date of Birth A.D. Date Picker*/}
                    <label htmlFor="DOB" className="form-label yolo">
                      Date of Birth (A.D)
                    </label>
                    <input type="date" name="DOB" className="form-control text" placeholder required />
                  </div>
                  <div className="col-md-4">                       {/*Social Network Selection and Details*/}
                    <label htmlFor="Social Network" className="form-label yolo">
                      Social Network
                    </label>
                    <div className="container" style={{ borderWidth: '0px 1px', borderStyle: 'solid', borderColor: '#b9b9b9', borderRadius: '5px 6px 0px 0px' }}>
                      <div className="img p-2">
                        <img src={FaceB} style={{ padding: 10 }} alt="..." />
                        <img src={TIW} style={{ padding: 10 }} alt="..." />
                        <img src={LinkedIn} style={{ padding: 10 }} alt="..." />
                      </div>
                    </div>
                    <input type="text" className="form-control" id="inputMobileNumber2" placeholder="Username or URL Link" required />
                  </div>
                  <div className="col-12 mt-5">                    {/*Family Details Section*/}
                    <h5 id="family-details">Family Details</h5>           {/*TITLE*/}
                    <div className="row gx-4 gy-4">
                      <div className="col-12 col-md-6">                       {/*Grand Father's Name*/}
                        <label htmlFor="inputGrandPaName" className="form-label yolo">
                          GrandFather's Name
                        </label>
                        <input type="text" className="form-control" id="inputGrandPaName" placeholder="GrandFather's Name" required />
                      </div>
                      <div className="col-12 col-md-5">                       {/*Grand Father's Nationality*/}
                        <label htmlFor="inputGrandPaNationality" className="form-label yolo">
                          GrandFather's Nationality
                        </label>
                        <input type="text" className="form-control" id="inputGrandPaNationality" placeholder="GrandFather's Name" required />
                      </div>
                      <div className="col-12 col-md-6">                       {/*Father's Name*/}
                        <label htmlFor="inputFatherName" className="form-label yolo">
                          Father's Name
                        </label>
                        <input type="text" className="form-control" id="inputFatherName" placeholder="Father's Name" required />
                      </div>
                      <div className="col-12 col-md-5">                       {/*Father's Nationality*/}
                        <label htmlFor="inputFatherNationality" className="form-label yolo">
                          Father's Nationality
                        </label>
                        <input type="text" className="form-control" id="inputFatherNationality" placeholder="Father's Nationality" required />
                      </div>
                      <div className="col-12 col-md-6">                       {/*Mother's Name*/}
                        <label htmlFor="inputMotherName" className="form-label yolo">
                          Mother's Name
                        </label>
                        <input type="text" className="form-control" id="inputMotherName" placeholder="Mother's Name" required />
                      </div>
                      <div className="col-12 col-md-5">                       {/*Mother's Nationality*/}
                        <label htmlFor="inputMotherNationality" className="form-label yolo">
                          Mother's Nationality
                        </label>
                        <input type="text" className="form-control" id="inputMotherNationality" placeholder="Mother's Nationality" required />
                      </div>
                      <div className="col-12 col-md-6">                       {/*Spouse's Name*/}
                        <label htmlFor="inputSpouseName" className="form-label yolo">
                          Spouse's Name
                        </label>
                        <input type="text" className="form-control" id="inputSpouseName" placeholder="Spouse's Name" required />
                      </div>
                      <div className="col-12 col-md-5">                       {/*Spouse's Nationality*/}
                        <label htmlFor="inputSpouseNationality" className="form-label yolo">
                          Spouse's Nationality
                        </label>
                        <input type="text" className="form-control" id="inputSpouseNationality" placeholder="Spouse's Nationality" required />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-5 mb-5" id="btn">
                    <button type="button" className="btn btn-outline-dark text-danger ps-4 pe-4 " id="genr_next" onClick={() => handleChangeSelection('Address')}>Next</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>)}
        {/* Address details  */}
        {selection === "Address" && (<div className="row justify-content-evenly  mt-5 mb-5" id="addr_details">
          <div className="col-md-11 col-lg-9 col-xxl-8 justify-content-evenly" id="form-section">
            <div className="row justify-content-evenly" id="form">
              <div className="col-12">      {/*Back*/}
                <div className="button">
                  <a href="KYCform.html">
                    <button className="back-button ps-3">
                      Back
                      <img src={ExitImg} alt="..." />
                    </button>
                  </a>
                </div>
              </div>
              <form className="row justify-content-evenly gy-3 gx-5">
                <div className="col-12 mt-4">
                  <h3 className="p-3">Address Details</h3>
                  <h5 id="personal-details">Permanent Address</h5>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputProvince" className="form-label yolo">Province</label>
                  <select id="inputProvince" className="form-select">
                    <option selected>Select Province</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputDistrict" className="form-label yolo">District</label>
                  <select id="inputDistrict" className="form-select">
                    <option selected>Name of the District</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputMunicipality" className="form-label yolo">Municipality</label>
                  <select id="inputMunicipality" className="form-select">
                    <option selected>Name of the Municipality/VDC</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputWardNumber" className="form-label yolo">Ward Number</label>
                  <select id="inputWard Number" className="form-select">
                    <option selected>01-0024984</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputStreet" className="form-label yolo">Street</label>
                  <select id="inputStreet" className="form-select">
                    <option selected>Mandala Street</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputHouseNumber" className="form-label yolo">House Number</label>
                  <select id="inputHouseNumber" className="form-select">
                    <option selected>01-0024984</option>
                  </select>
                </div>
                <div className="col-12 mt-5">
                  <h5 id="personal-details">Current Address</h5>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputProvince" className="form-label yolo">Province</label>
                  <select id="inputProvince" className="form-select">
                    <option selected>Select Province</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputDistrict" className="form-label yolo">District</label>
                  <select id="inputDistrict" className="form-select">
                    <option selected>Name of the District</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputMunicipality" className="form-label yolo">Municipality</label>
                  <select id="inputMunicipality" className="form-select">
                    <option selected>Name of the Municipality/VDC</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputWardNumber" className="form-label yolo">Ward Number</label>
                  <select id="inputWard Number" className="form-select">
                    <option selected>01-0024984</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputStreet" className="form-label yolo">Street</label>
                  <select id="inputStreet" className="form-select">
                    <option selected>Mandala Street</option>
                  </select>
                </div>
                <div className="col-md-5">
                  <label htmlFor="inputHouseNumber" className="form-label yolo">House Number</label>
                  <select id="inputHouseNumber" className="form-select">
                    <option selected>01-0024984</option>
                  </select>
                </div>
                <div className="col-12 mt-5 mb-5 d-flex justify-content-between">
                  <button type="button" className="btn btn-outline-dark text-danger ps-4 pe-4 " id="addr_prev" onClick={() => handleChangeSelection('no')}>Previous</button>
                  <button type="button" className="btn btn-outline-dark text-danger ps-4 pe-4 " id="addr_next" onClick={() => handleChangeSelection('Doc')}>Next</button>
                </div>
              </form>
            </div>
          </div>
        </div>)}
        {/* Document Details and Proof Upload Section */}
        {/*Proof Upload*/}
        {selection === "Doc" && (<div className="row justify-content-evenly  mt-5 mb-5" id="proof">
          <div className="col-md-11 col-lg-9 col-xxl-8" id="form-section">
            <div className="row " id="form">
              <div className="col-12">
                <div className="row text-center" id="text">
                  <span className="text text-center mt-5">Document Type</span>
                </div>
                <form className="row ps-5 pe-5">
                  {/* switch radio buttons */}
                  <div className="col-md-12 d-flex justify-content-center mt-4 mb-4">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="proof_switch" id="flexRadioDefault1" value="citizen"
                        checked={internalRadio === 'citizen'}
                        onChange={handleSelectionChangeIntenalRadio} />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Citizenship
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="proof_switch" id="flexRadioDefault2" value="passport"
                        checked={internalRadio === 'passport'}
                        onChange={handleSelectionChangeIntenalRadio} />
                      <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Passport
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="proof_switch" id="flexRadioDefault2" value="voter"
                        checked={internalRadio === 'voter'}
                        onChange={handleSelectionChangeIntenalRadio} />
                      <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Voter ID
                      </label>
                    </div>
                  </div>
                  {/*TIT*/}
                  <div className="col-12 mt-4">
                    <h5 className id="personal-details">Details</h5>
                  </div>
                  {/*Citizenship Form*/}
                  {internalRadio === "citizen" && (<div className="col-12 " id="citizenship">
                    <div className="row gy-4">
                      <div className="col-md-4">
                        <label htmlFor="inputCitizenshipNumber" className="form-label yolo">
                          Citizenship Number
                        </label>
                        <input type="text" className="form-control" id="inputCitizenshipNumber" placeholder="01-0024984" />
                      </div>
                      <div className="col-md-5 business ">
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
                             name="eli01nature_of_business"
                       
                           >
                             <option value={0} selected disabled>
                          Place of Issue
                             </option>
                             {districtApi.map((item) => (
                               <option key={item.bindField} value={item.bindField}>
                                 {item.displayField}
                               </option>
                             ))}
                           </select>
                         </div> 
                      <div className="col-md-3">
                        <label className="form-label yolo">Issuing Authority</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                    </div>
                      <div className="col-md-4">
                        <label className="form-label yolo">Date of Issue (B.S.)</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label yolo">Date of Issue (A.D.)</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                      
                     
                  </div>)}
                  {/* passport form */}
                  {internalRadio === "passport" && (<div className=" col-12 " id="passport">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="inputPassportNumber" className="form-label yolo required">Passport No</label>
                        <input type="text" className="form-control" id="inputPassportNumber" placeholder="01-0024984" />
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="inputPlaceOfIssue" className="form-label yolo required">Select Place of Issue</label>
                        <input type="text" className="form-control" id="inputPlaceofIssue" placeholder="01-0024984" />
                      </div>
                      <div className="col-md-3">
                        <label htmlFor="inputPIssueAuthority" className="form-label yolo required">Issuing Authority</label>
                        <input type="text" className="form-control" id="inputIssue" placeholder="01-0024984" />
                      </div>
                      <div className="col-md-4 mt-3">
                        <label htmlFor="inputDateIssuue" className="form-label yolo required">Date of Issue (A.D.)</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                      <div className="col-md-4 mt-3">
                        <label htmlFor="inputDate" className="form-label yolo required">Date of Issue (B.S.)</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                      <div className="col-md-3 mt-3">
                        <label htmlFor="InputeExpiry" className="form-label yolo required">ID Expiry Date (A.D.)</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                      <div className="col-md-4 mt-3">
                        <label htmlFor="InputIDExpiry" className="form-label yolo required">ID Expiry Date (B.S.)</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                      <div className="col-md-4 mt-4">
                        <label htmlFor="inputPassport" className="form-label yolo required">Passport Issue For Foreigner</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                      <div className="col-md-3 mt-4">
                        <label htmlFor="inputPassportIssue" className="form-label yolo required">Passport Issue Date(B.S.)</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                      <div className="col-md-4 mt-4">
                        <label htmlFor="inputPassportExpiry" className="form-label yolo required">Passport Expiry (for foreigners)</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                      <div className="col-md-4 mt-4">
                        <label htmlFor="inputPassportExDate" className="form-label yolo required">Passport Expiry Date (B.S.)</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                    </div>
                  </div>)}
                  {/*Voter card form*/}
                  {internalRadio === "voter" && (<div className=" col-12 " id="voter">
                    <div className="row">
                      <div className="col-md-4">
                        <label htmlFor="inputSalutation" className="form-label yolo">Voter ID</label>
                        <select id="inputSalutation" className="form-select">
                          <option selected>01-0024984</option>
                        </select>
                      </div>
                      <div className="col-md-4 ">
                        <label className="form-label yolo">Date of Issue (B.S.)</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                      <div className="col-md-3 ">
                        <label className="form-label yolo">Date of Issue (A.D.)</label>
                        <input type="date" name="DOB" className="form-control text" placeholder />
                      </div>
                    </div>
                  </div>)}
                  {/* upload documents */}
                  <div className="document_upload">
                    <div className="col-12">
                      <h5 className="mt-5" id="personal-details">Upload Document</h5>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="col-lg-10">
                        <div className="col-lg-10">
                          <div className="row d-flex">
                            <div className="col-md-5 col-lg-3 col-xl-4">
                              <label htmlFor="inputCitizenship" className="form-label yolo required">Citizenship/Passport/Voter's ID</label>
                            </div>
                            <div className="col-md-6">
                              <div className="col-md-6">
                                <div className="row">
                                  <input className="form-control form-control-lg" id="formFileLg" type="file" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="col-lg-10">
                            <div className="col-lg-10">
                              <div className="row d-flex">
                                <div className="col-md-5 col-lg-3 col-xl-4">
                                  <label htmlFor="inputPP" className="form-label yolo required">Passport Size Photograph</label>
                                </div>
                                <div className="col-md-6">
                                  <div className="col-md-6">
                                    <div className="row">
                                      <input className="form-control form-control-lg" id="formFileLg" type="file" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 d-flex justify-content-between mt-5 mb-5">
                            <button type="button" className="btn btn-outline-dark text-danger ps-4 pe-4" id="proof_prev" onClick={() => handleChangeSelection('Address')}>
                              Previous
                            </button>
                            <button type="button" className="btn btn-outline-dark text-danger ps-3 pe-3" id="kyc_submit">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div></form>
              </div></div></div>
        </div>)}
  
      </div>
  
  )
}

export default OnlineKyc