 import SlideImage1 from '../Assets/CarouselSlider/SlideImage1.png'
 import SlideImage2 from '../Assets/CarouselSlider/SlideImage2.png'
 import SlideImage3 from '../Assets/CarouselSlider/SlideImage3.png'
 import Autoscroll from './Autoscroll'


function Dashboard(){

    return(
      <div>
  <div className="slick">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-2 col-md-1 text-white">Notice:</div>
        <div className="col-10 col-md-11">
          <div className="slick-link">
            <div className="slide">
              <a href className="nav-link">
               
              </a>
            </div>
            <div>
      
      <Autoscroll text="Notice" />
      <div className="slide">
              <a href className="nav-link">15 DAYS NOTICE FOR SEALED BIDS</a>
            </div>
            <div className="slide">
              <a href className="nav-link">Data Center Colocation</a>
            </div>
            <div className="slide">
              <a href className="nav-link">CSR Notice</a>
            </div>
            <div className="slide">
              <a href className="nav-link">
                            Request For Proposal for Online Account System
                        </a>
            </div>
    </div>
    
          
            <div className="slide">
              <a href className="nav-link">
               
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 
  
    <section className="carousel-slider">
      <div id="carouselExampleIndicators" className="carousel" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active carousel-image">
            <img src={SlideImage1} className="d-block img-fluid w-100 slide-img" alt="..." />
            <div className="carousel-caption d-none d-sm-block">
              <h2>Open a KYC Account</h2>
              <p>Open online KYC bank account at home</p>
              <a href="KYCform.html">
                <button type="button" className="btn btn-danger px-5">
                  Apply
                </button>
              </a>
            </div>
          </div>
          <div className="carousel-item carousel-image">
            <img src={SlideImage2} className="d-block img-fluid w-100" alt="..." />
            <div className="carousel-caption d-none d-sm-block">
              <h2>Open a KYC Account</h2>
              <p>Open online KYC bank account at home</p>
              <a href="KYCform.html">
                <button type="button" className="btn btn-danger px-5">
                  Apply
                </button>
              </a>
            </div>
          </div>
          <div className="carousel-item carousel-image">
            <img src={SlideImage3} className="d-block img-fluid w-100" alt="..." />
            <div className="carousel-caption d-none d-sm-block">
              <h2>Open a KYC Account</h2>
              <p>Open online KYC bank account at home</p>
              <a href="KYCform.html">
                <button type="button" className="btn btn-danger px-5">
                  Apply
                </button>
              </a>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
 
    <section className="separate">
      <div className="notice-banner bgcolor py-4 border-3 border-bottom border-warning" />
    </section>
   
    <section className="feature p-5 m-5">
      <div className="container ">
        <div className="row my-5">
          <h3 className="text-center fw-bold">Our Features</h3>
        </div>
        <div className="row  ">
          
          <div className="col-lg-2 ">
            <a href="KYCForm.html" className="card d-flex  tcolor text-center align-items-center justify-content-center feature-card hoverImg img1 CardImg nav-link">
              <h6 className="px-4 py-3">Open KYC Account</h6>
            </a>
          </div>
          
          <div className="col-lg-2 ">
            <a href="onlineaccount.html" className="card d-flex  tcolor text-center align-items-center justify-content-center feature-card hoverImg img2 CardImg nav-link">
              <h6 className="px-4 py-3">Open Account Online</h6>
            </a>
          </div>
       
          <div className="col-lg-2 ">
            <a href="LoanEligibility.html" className="card d-flex  tcolor text-center align-items-center justify-content-center feature-card hoverImg img3 CardImg nav-link">
              <h6 className="px-3 py-3">Loan Eligibility</h6>
            </a>
          </div>
         
          <div className="col-lg-2 ">
            <a href="General Request.html" className="card d-flex  tcolor text-center align-items-center justify-content-center feature-card hoverImg img4 CardImg nav-link">
              <h6 className="px-3 py-3">General Request</h6>
            </a>
          </div>
         
          <div className="col-lg-2">
            <a href="DisputeClaim.html" className="card d-flex  tcolor text-center align-items-center justify-content-center feature-card hoverImg img5 CardImg nav-link">
              <h6 className="px-3 py-3">Dispute Claim</h6>
            </a>
          </div>
          
          <div className="col-lg-1 ">
            <a href="MerchantQRCode.html" className="card d-flex  tcolor text-center align-items-center justify-content-center feature-card hoverImg img6 CardImg nav-link">
              <h6 className="px-3 py-3">QR Merchant Aquisition</h6>
            </a>
          </div>
         
        </div>
      </div>
    </section>
    </div>

    )
}
export default Dashboard;