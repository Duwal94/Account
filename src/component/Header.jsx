
function Header(){
    return(
        
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><img className="logo" src="http://mlbl.onlineform.ants.com.np/images/LOGO.png" alt="" srcset="" /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav p-2 ">
        <li className="nav-item text-primary">
          <a className="nav-link" aria-current="page" href="OnlineKyc">Online KYC</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="Onlineaccount">Online Account</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="Loaneligibility">Loan Eligibility</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="Generalrequest">General Request</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="disputeclaim">Dispute Claim</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="Merchantqrcode">Merchant QR Code</a>
        </li>
      </ul> 
    </div>
  </div>
 
</nav>


  
     

    )
}
export default Header;