import React from 'react'
import ExitImg from '../Assets/images/Exit icon/exit.png';
import { useState,useEffect } from 'react';

function Generalrequest() {
  const [selectedOption, setSelectedOption] = useState('Debit Card Request');
  const [branchApi, setBranchApi] = useState([]);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          "http://api.onlineform.ants.com.np/GeneralComponents/Branch"
        );
        const data1 = await response1.json();
        setBranchApi(data1);

      
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
                    <button id='bckbtn' className="back-button">
                      Back 
                      <img src={ExitImg} alt=""  />
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
                          <label htmlFor="formGroupExampleInput" className="form-label yolo">
                            Online Request Type
                          </label>
                          <select value={selectedOption} onChange={handleDropdownChange}>
                            <option selected>Choose your account type</option>
                         
                            <option>Debit Card Request</option>
                            <option>Mobile Banking Request</option>
                            <option>Lockers Banking Request</option>
                            <option>Internet Banking Request</option>
                            <option>Card Block Request</option>
                          </select>
                        </div>
                        

                        <div className="mb-3">
                          <label htmlFor="validationAccount" className="form-label yolo" id="Online">
                            Account Number
                          </label>
                          <input type="Account" className="form-control numberOnly" name="accountnumber" id="validationAccount" placeholder="Refferer's account number" />
                          <div className="invalid-feedback" id="account">
                            You cannot have this field empty*
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label htmlFor="validationholder" className="form-label yolo" id="Online">
                            Account Holder's Name
                          </label>
                          <input type="text" className="form-control" id="validationholder accountholder required" name="accountholder" placeholder="Refferer's account holder name" />
                          <div className="invalid-feedback">
                            You cannot have this field empty*
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="validationemail" className="form-label yolo" id="Online">
                            Email
                          </label>
                          <input type="email" className="form-control" name="Email" id="validationemail  " placeholder="Refferer's email" />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="validationmobile" className="form-label yolo" id="Online">
                            Mobile Number
                          </label>
                          <input className="form-control numberOnly" name="mobilenumber" id="validationmobile  " placeholder="Refferer's mobile number" />
                        </div>

                        {selectedOption === 'Debit Card Request' &&  ( 
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
                         )}

                        {selectedOption === 'Mobile Banking Request' && ( <div className="mb-3" id="Online">
                          <label htmlFor="formGroupExampleInput" className="form-label yolo">
                           Customer Type*
                          </label>
                          <select id="inputstate" className="form-select" name="select_req">
                            <option selected>-- select an option --</option>
                            <option>Individual</option>
                            <option>Proppriotership firm</option>
                            <option>parternership firm</option>
                            <option>Company</option>
                          </select>
                        </div> )}

                        {selectedOption === 'Mobile Banking Request' && (   <div className="mb-3" id="Online">
                          <label htmlFor="formGroupExampleInput" className="form-label yolo">  
                           Service Type*
                          </label>
                          <select id="inputstate" className="form-select" name="select_req">
                            <option selected>-- select an option --</option>
                            <option>Alert only</option>
                            <option>Transaction with alert</option>
                            <option>Inquiry Only</option>
                            <option>Transaction with inquiry </option>
                          </select>
                        </div>  )}

                        {selectedOption === 'Mobile Banking Request' && (   
                           <div className="col-md-12">
                           <div className="col-lg-10">
                             <div className="col-lg-10">
                               <div className="row d-flex">
                                 <div className="col-md-5 col-lg-3 col-xl-4">
                                   <label htmlFor="inputPP" className="form-label yolo">upload citizen</label>
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
                           </div>)}

                               

                      {selectedOption === 'Mobile Banking Request' && (

<div className="col-md-12">
<div className="col-lg-10">
  <div className="col-lg-10">
    <div className="row d-flex">
      <div className="col-md-5 col-lg-3 col-xl-4">
        <label htmlFor="inputPP" className="form-label yolo">Passport Size Photograph</label>
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
</div>
 )}

                            {selectedOption === 'Internet Banking Request' && ( <div className="mb-3" id="Online">
                          <label htmlFor="formGroupExampleInput" className="form-label yolo">
                           Customer Type*
                          </label>
                          <select id="inputstate" className="form-select" name="select_req">
                            <option selected>-- select an option --</option>
                            <option>Individual</option>
                            <option>Proppriotership firm</option>
                            <option>parternership firm</option>
                            <option>Company</option>
                          </select>
                        </div> )}

                        {selectedOption === 'Internet Banking Request' && (   <div className="mb-3" id="Online">
                          <label htmlFor="formGroupExampleInput" className="form-label yolo">  
                           Service Type*
                          </label>
                          <select id="inputstate" className="form-select" name="select_req">
                            <option selected>-- select an option --</option>
                            <option>Alert only</option>
                            <option>Transaction with alert</option>
                            <option>Inquiry Only</option>
                            <option>Transaction with inquiry </option>
                          </select>
                        </div>  )}

                        {selectedOption === 'Internet Banking Request' && (   
                              <div className="col-md-12">
                              <div className="col-lg-10">
                                <div className="col-lg-10">
                                  <div className="row d-flex">
                                    <div className="col-md-5 col-lg-3 col-xl-4">
                                      <label htmlFor="inputPP" className="form-label yolo">upload citizen</label>
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
                              </div> )}

                      {selectedOption === 'Internet Banking Request' && (

<div className="col-md-12">
<div className="col-lg-10">
  <div className="col-lg-10">
    <div className="row d-flex">
      <div className="col-md-5 col-lg-3 col-xl-4">
        <label htmlFor="inputPP" className="form-label yolo">Passport Size Photograph</label>
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
</div> )}

                            {selectedOption === 'Card Block Request' && (    <div className="mb-3">
                          <label htmlFor="validationmobile" className="form-label yolo" id="Online">
                          Card number
                          </label>
                          <input className="form-control numberOnly" name="mobilenumber" id="validationmobile  " placeholder="card number" />
                        </div> )}

                        {selectedOption === 'Card Block Request' && (    <div className="mb-3">
                          <label htmlFor="validationmobile" className="form-label yolo" id="Online">
                            Reason for block
                          </label>
                          <input className="form-control numberOnly" name="mobilenumber" id="validationmobile  " placeholder="Reason for block" />
                        </div> )}

                        {selectedOption === 'Card Block Request' && (     <div className="form-check ps-5">
                  <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <p className="form-label yolo">
                    I have read, understood and agree to the (Terms And Conditions).
                    </p>
                  </label>
                </div> )}
                </div>

                <div className="col-12 mt-5 mb-5" id="btn">
                        <button type="submit" className="btn btn-outline-dark text-danger ps-4 pe-4" id="submit">
                          Send
                        </button>
                      </div>
                      {/* Modal */}
                      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <h1 className="modal-title text-center" id="exampleModalLabel">
                              Successful!
                            </h1>
                            <div className="modal-body text-center">
                              {/* ... 375 x 285 */}
                              Your form has been successfully submitted.
                            </div>
                            <div className="modal-footer m-3">
                              <p className="text-center" data-bs-dismiss="modal">
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
  
  )
} 

export default Generalrequest;
                               
                               