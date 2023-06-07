
//terms and condition button event handeling
$("#agree").click(function(){
  $("#terms").addClass("d-none");
  $("#verify").removeClass("d-none");
});
$("#decline").click(function(){
  swal({
    title: "Are you sure?",
    text: "You will be redirected to homepage!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete ) {
     window.location = "index.html";    
    } else {
      swal("You need to agree to terms and condition to proceed further.");
    }
  });
});
$(".back-button").click(function(){
  swal({
    title: "Are you sure?",
    text: "You will be redirected to homepage!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
     window.location = "index.html";    
    }
  });
});


//kyc verification check scripts
$("input[name='kyc_verify']").change(function(){
  var checkdVal = $("input[name='kyc_verify']:checked").val();
  console.log(checkdVal);
  if(checkdVal=='no') 
  {
    $( "#verify").addClass( "d-none" );
    $("#generald").removeClass("d-none");
    $("#kyc_banner").removeClass("d-none");

    swal({
      title: "Inforrmation",
      text: "You are now redirected to form. Please fill the form correctly!",
      icon: "info",
      dangerMode: true,
    })
  }
  else{
    swal({
      title: "Error?",
      text: "You can't have multiple kyc accounts!",
      icon: "error",
      dangerMode: true,
    })
  }
});


  // general information form scripts 
  $("#genr_next").click(function(){
  $("#generald").addClass("d-none")
  $("#addr_details").removeClass("d-none");
});


// script for buttons of address section 
$("#addr_prev").click(function(){
  $("#addr_details").addClass("d-none");
  $("#generald").removeClass("d-none");
});

$("#addr_next").click(function(){
  $("#addr_details").addClass("d-none");
  $("#proof").removeClass("d-none");
});






// script for form switch of proof upload section 
$("input[name='proof_switch']").change(function(){
  var checkdVal = $("input[name='proof_switch']:checked").val();
  console.log(checkdVal);
  if(checkdVal=='passport') 
  {
    
    $( "#passport").removeClass( "d-none" );
    $( "#citizenship").addClass( "d-none" );
    $( "#voter").addClass( "d-none" );

  }else if(checkdVal=='citizenship'){

    $( "#citizenship").removeClass( "d-none" );
    $( "#passport").addClass( "d-none" );
    $( "#voter").addClass( "d-none" );

  }
  else{
    $( "#voter").removeClass( "d-none" );
    $( "#passport").addClass( "d-none" );
    $( "#citizenship").addClass( "d-none" );
  }

  });

  // final page (PROOF UPLOAD)button scripts
  $("#proof_prev").click(function(){
  $("#proof").addClass("d-none");
  $("#addr_details").removeClass("d-none");
});

