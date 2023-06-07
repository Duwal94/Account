$("input[name='saving_verify']").change(function(){
    var checkdVal = $("input[name='saving_verify']:checked").val();
    console.log(checkdVal);
    if(checkdVal=='no') 
    {
      
      $( "#saving_verification").addClass( "d-none" );
      $("#saving_form").removeClass("d-none");
      $("#kyc_banner").removeClass("d-none");

    }
    else{
      alert("You cannot have multiple Kyc Accounts")
    }

    });