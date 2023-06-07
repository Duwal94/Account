import React, { useState } from 'react';
import ExitImg from '../Assets/images/Exit icon/exit.png';
import FaceB from "../Assets/images/After_Verification/Social Network/Facebook.png"
import TIW from "../Assets/images/After_Verification/Social Network/Twitter.png"
import LinkedIn from "../Assets/images/After_Verification/Social Network/LinkedIn.png"
import RECap from "../Assets/images/recaptcha.png"


function Savingacctform() {
    const [selection, setSelection] = useState("yes");
    const handleSelectionChange = (event) => {
        setSelection(event.target.value);
    };
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageClick = (image) => {
        if (selectedImages.includes(image)) {
            setSelectedImages(selectedImages.filter((selectedImage) => selectedImage !== image));
        } else {
            setSelectedImages([...selectedImages, image]);
        }
    };
    return (
        <div className="container-fluid mb-5">

            {selection === "yes" && (
                <div className="row justify-content-evenly  mt-5 mb-5" id="saving_verification">
                    <div className="col-md-11 col-lg-9 col-xl-8" id="form-section">
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
                                                onChange={handleSelectionChange}
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
                </div>)}
        


            {selection === 'no' && (<div className="row justify-content-evenly " id="saving_form">
                <div className="col-md-11 col-lg-9 col-xl-8" id="form-section">
                    <div className="row" id="form">
                        <div className="row">
                            <div className="button">
                                <a href="index.html">
                                    <button className="back-button ps-3">
                                        Back
                                        <img src={ExitImg} alt />
                                    </button>
                                </a>
                            </div>
                        </div>
                        <div className="row ps-5">
                            <form className="row gy-3 gx-4">
                                <div className="col-md-4 d-flex">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Nepal
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Other
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputSalutation" className="form-label">
                                        Salutation
                                    </label>
                                    <select id="inputSalutation" className="form-select">
                                        <option selected>Select Salutation</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputBranch" className="form-label">
                                        Prefered Branch
                                    </label>
                                    <select id="inputBranch" className="form-select">
                                        <option selected>Select Branch</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <h5 id="personal-details">Personal Details</h5>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputFirstName" className="form-label">
                                        First Name
                                    </label>
                                    <input type="text" className="form-control" id="inputFirstName" placeholder="First Name" />
                                    <span id="emptyfield" className="form-text text-danger" style={{ fontSize: 10 }}>
                                        You cannot leave this field empty.
                                    </span>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputMiddleName" className="form-label">
                                        Middle Name
                                    </label>
                                    <input type="text" className="form-control" id="inputMiddleName" placeholder="Middle Name" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputLastName" className="form-label">
                                        Last Name
                                    </label>
                                    <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputMobileNumber" className="form-label">
                                        Mobile Number
                                    </label>
                                    <input type="text" className="form-control" id="inputMobileNumber" placeholder="+977 9898989898" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="inputEmail" placeholder="username@gmail.com" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputTelephoneNumber" className="form-label">
                                        Telephone Number
                                    </label>
                                    <input type="text" className="form-control" id="inputTelephoneNumber" placeholder="01-0024984" />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="inputMobileNumber2" className="form-label">
                                        Mobile Number 2 (Optional)
                                    </label>
                                    <input type="text" className="form-control" id="inputMobileNumber2" placeholder="01-0024984" />
                                </div>
                                <div className="col-md-4 mt-4">
                                    <label>Date of Birth (B.S.)</label>
                                    <input type="date" name="DOB" className="form-control text" placeholder />
                                </div>
                                <div className="col-md-4 mt-4">
                                    <label>Date of Birth (A.D.)</label>
                                    <input type="date" name="DOB" className="form-control text" placeholder />
                                </div>
                                <div className="col-md-6 col-lg-4">
                                    <label>Social Network</label>
                                    <div className="container" style={{ borderWidth: '0px 1px', borderStyle: 'solid', borderColor: '#b9b9b9', borderRadius: '5px 6px 0px 0px' }}>
                                        <div className="img">
                                            <img
                                                src={FaceB}
                                                style={{ padding: 10, border: selectedImages.includes('FaceB') ? '2px solid blue' : 'none' }}
                                                onClick={() => handleImageClick('FaceB')}
                                                alt='...'
                                            />
                                            <img
                                                src={TIW}
                                                style={{ padding: 10, border: selectedImages.includes('TIW') ? '2px solid blue' : 'none' }}
                                                onClick={() => handleImageClick('TIW')}
                                                alt='...'
                                            />
                                            <img
                                                src={LinkedIn}
                                                style={{ padding: 10, border: selectedImages.includes('LinkedIn') ? '2px solid blue' : 'none' }}
                                                onClick={() => handleImageClick('LinkedIn')}
                                                alt='...'
                                            />
                                        </div>
                                    </div>
                                    <input type="text" className="form-control" id="inputMobileNumber2" placeholder="Username or URL Link" />
                                </div>
                                <div className="col-12 mt-5">
                                    <h5 id="verify-captcha">Verify Captcha</h5>
                                    <div className="row">
                                        <div className="col-4">
                                            <input type="text" className="form-control" id="inputCaptcha" placeholder="ENTER CAPTCHA" />
                                        </div>
                                        <div className="col-4 d-flex">
                                            <img src={RECap} alt id="recap" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            I have read, understood and agreed to the terms and
                                            condition
                                            <span className="text-danger">(Terms And Conditions).</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12 mt-5 mb-5 text-center">
                                    <button type="button" className="btn btn-outline-dark text-danger ps-4 pe-4">
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>

    )
}

export default Savingacctform