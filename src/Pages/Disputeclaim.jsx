import React, {useState,useEffect} from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import ExitImg from '../Assets/images/Exit icon/exit.png'

function Disputeclaim() {
  const [disputeTypesApi, setDisputeTypesApi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          "http://api.onlineform.ants.com.np/DisputeClaim/DisputeTypes"
        );
        const data1 = await response1.json();
        setDisputeTypesApi(data1);

      
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
        <div className="row" id="box-shadow">
          <div className="row">
            <div className="button">
              <a href="index.html">
                <button className="back-button">
                  Back
                  <img src={ExitImg} alt="" />
                </button>
              </a>
            </div>
         
            <form className="row g-3 ps-5 pb-5" id="dispute_form">
            <div className="col-md-5 business ">
                  {/*Business Type*/}
                  <label
                    htmlFor="inputbusinesstype"
                    className="form-label yolo "
                  >
                    Dispute Types
                  </label>
                  <select
                    className="form-select"
                    id="business_type"
                    name="eli01nature_of_business"
              
                  >
                    <option value={0} selected disabled>
                   Dispute types
                    </option>
                    {disputeTypesApi.map((item) => (
                      <option key={item.bindField} value={item.bindField}>
                        {item.displayField}
                      </option>
                    ))}
                  </select>
                </div> 
              <div className="row">
                <div className="col-md-6 mt-3">
                  <label htmlFor="inputaccountsholdernumber" className="form-label yolo">
                    Account Holder's Number
                  </label>
                  <div className="input-group">
                    <input type="text" className="form-control numberOnly" placeholder="Account Number" id="accounts_number" name="mobilenumber" aria-label="Account Number" aria-describedby="verify" />
                    <div className="input-group-append">
                      <button className="btn btn-danger btnclick otpStep" id="verifyX" type="button">
                        <i className />   Verify Account
                      </button></div>
                  </div>
                </div>
                <div className="col-md-5 mt-3">
                  <label htmlFor="inputaccountsname" className="form-label yolo">
                    Account Holder's Name
                  </label>
                  <input type="accountsname" className="form-control" id="accountsname" name="accountholder" placeholder="Enter your name" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-3 form">
                  <label htmlFor="contact" className="form-label yolo">Contact
                  </label>
                  <input type="contact" className="form-control numberOnly " name="contact" id="contact" placeholder="01-XXXXXXXX" />
                </div>
                <div className="col-md-5 mt-3">
                  <label htmlFor="inputemailid" className="form-label yolo">
                    Email ID
                  </label>
                  <input name="Email" className="form-control" id="inputemail" placeholder="sagun@gmail.com " />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-3 form">
                  <label htmlFor="inputtransaction" className="form-label yolo">
                    Transaction Date
                  </label>
                  <input type="date" name="DOB" className="form-control" id="inputtransaction" placeholder="XX-XX-XXXX" />
                </div>
                <div className="col-md-5 mt-3">
                  <label htmlFor="inputclaim/Dispute" className="form-label yolo numberOnly">
                    Claim/Dispute Amount
                  </label>
                  <input type="claim" className="form-control" id="inputclaim_Dispute" name="d_amount" placeholder="NPR" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <label htmlFor="inputmerchant" className="form-label yolo">
                    Transaction Bank/ Merchant
                  </label>
                  <input type="Transaction Bank/ Merchant" name="t_bank" className="form-control" id="inputTransaction Bank/ Merchant" placeholder="Bank Name" />
                </div>
                <div className="col-md-5 mt-3">
                  <label htmlFor="inputlocation" className="form-label yolo">
                    Transaction Location
                  </label>
                  <input type="location" name="t_location" className="form-control" id="inputlocation" placeholder="Location" />
                </div>
              </div>
              <div className="row mt-5">
                <p className="form-label yolo">
                  Please tick on below dispute options as appropriate:
                </p>
                <div className="form-check ps-5">
                  <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <p className="form-label yolo">
                      I used my Debit/Credit/OD card to perform transaction.
                      However, the transaction was unsuccessful/declined &amp; my
                      account was debited
                    </p>
                  </label>
                </div>
                <div className="form-check ps-5">
                  <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <p className="form-label yolo">
                      Mentioned transaction was charged to my account more
                      than once
                    </p>
                  </label>
                </div>
                <div className="form-check ps-5">
                  <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <p className="form-label yolo">
                      I had paid by other means or purchase was cancelled
                    </p>
                  </label>
                </div>
                <div className="form-check ps-5">
                  <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <p className="form-label yolo">
                      The amount billed by Merchant was different from Sales
                      draft or documents that I have authorized
                    </p>
                  </label>
                </div>
                <div className="form-check ps-5">
                  <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <p className="form-label yolo">
                      Unauthorized transaction - I did not authorize or
                      participate in the transaction(s) mentioned above or
                      authorized anyone to engage in the transaction(s). At
                      the time of this transaction the card was in my
                      possession
                    </p>
                  </label>
                </div>
                <div className="form-check ps-5">
                  <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <p className="form-label yolo">
                      Any other information (please specify)
                    </p>
                  </label>
                </div>
                <div className="form-check ps-5 mt-4">
                  <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <p className="form-label yolo">
                      I have read, understood and agree to the
                      <span className="terms">Terms And Conditions</span>
                    </p>
                  </label>
                </div>
              </div>
              <div className="container">
      <ReCAPTCHA sitekey="6Ldbdg0TAAAAAI7KAf72Q6uagbWzWecTeBWmrCpJ" />
    </div>
              <div className="col-12 mt-2 mb-5" id="btn">
                <button type="submit" className="btn btn-outline-dark text-danger ps-4 pe-4" id="btn1">
                  Send
                </button>
              </div>
            </form></div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Disputeclaim;