function Footer() {
  return (
    <div className="col mt-5">
      <footer className="footer border-top border-warning border-2">
        <div className="container-fluid">
          <div className="row justify-content-evenly">
            <div className="col-11">
              <div className="row justify-content-center mt-4">
                <div className="col-md-3 col-sm-3 col-lg-3 col-xl-5 p-0 mx-0 mt-3">
                  <h6 className="text-warning footer-head">
                    Learning &amp; Development
                  </h6>
                  <ul className="footer-link p-0">
                    <li className="nav-link">
                      <a href="#"> Training Details </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 p-0 col-lg-3 col-sm-4 col-xl-5 mx-auto mt-3">
                  <h6 className="text-warning footer-head">
                    Rates,Charges and limits
                  </h6>
                  <ul className="footer-link p-0">
                    <li className="nav-link">
                      <a href="#">Gold Rate</a>
                    </li>
                    <li className="nav-link">
                      <a href="#">Interest Rates</a>
                    </li>
                    <li className="nav-link">
                      <a href="#"> Base Rates &amp; Intrest Spread </a>
                    </li>
                    <li className="nav-link">
                      <a href="#"> Standard Tariff of Charges </a>
                    </li>
                    <li className="nav-link">
                      <a href="#">Stock Exchange</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 p-0 col-lg-3 col-sm-3 col-xl-2 mx-auto mt-3">
                  <h6 className="text-warning footer-head">News/Notice</h6>
                  <ul className="footer-link p-0">
                    <li className="nav-link">
                      <a href="#">News</a>
                    </li>
                    <li className="nav-link">
                      <a href="#">Notice</a>
                    </li>
                    <li className="nav-link">
                      <a href="#" className="text-uppercase">
                        {" "}
                        csr{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row d-flex justify-content-between align-items-center social-link mt-4 text-white">
                <div className="col-12">
                  <div className="row justify-content-lg-between">
                    <div className="px-0 col-12 col-lg-9 justify-content-lg-between col-xl-7 mx-0 mt-2 contact">
                      <div className="row d-flex ms-2">
                        <div className="col-md-4 col-lg-2 px-0 mt-3">
                          <li className="nav-link p-md-0 py-3">
                            <i className="bi bi-telephone"></i>: 01-4268719
                          </li>
                        </div>
                        <div className="col-md-4 col-lg-3 px-0">
                          <li className="nav-link p-md-0 py-3">
                            <i className="bi bi-telephone fa-2x"></i>
                            Toll Free: 16600115015
                          </li>
                        </div>
                        <div className="  col-md-4 col-lg-6 px-0 style={{ color: 'white' }}">
                          <li className="nav-link p-md-0 py-3">
                            <i className="bi bi-envelope fa-2x "></i>:
                            info@mahalaxmibank.com.np
                          </li>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-start col-md-4 col-lg-3 col-xl-3 justify-content-lg-end mx-0 contact pt-2">
                      <p className="text-center mt-3">Connect with Us</p>
                      <div className="d-flex ms-3 social-icon">
                        <li className="nav-link px-2">
                          <a
                            href="https://www.facebook.com/mahalaxmibikasbank/"
                            target="_blank"
                          >
                            <i className="bi bi-facebook fa-2x"></i>
                          </a>
                        </li>
                        <li className="nav-link px-2">
                          <a
                            href="https://twitter.com/bank_bikas?lang=en"
                            target="_blank"
                          >
                            <i className="bi bi-twitter fa-2x"></i>
                          </a>
                        </li>
                        <li className="nav-link px-2">
                          <a
                            href="https://www.youtube.com/watch?v=5h57KaIbLWs"
                            target="_blank"
                          >
                            <i className=" bi bi-youtube fa-2x"></i>
                          </a>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row copyright border-top border-1 border-warning mt-1 text-center">
                <h6 className="text-white mt-2">
                  Copyright © 2022 Mahalaxmi Bikas Bank Limited.All Rights
                  Reserved.
                </h6>
                <h6 className="text-white">Crafted by Inficare</h6>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
