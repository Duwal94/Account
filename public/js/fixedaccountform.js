         //kyc verification check scripts
         $("input[name='fd_verify']").change(function(){
        var checkdVal = $("input[name='fd_verify']:checked").val();
        console.log(checkdVal);
        if(checkdVal=='no') 
        {
          
          $( "#fixed_verification").addClass( "d-none" );
          $("#fixed_form").removeClass("d-none");
          $("#kyc_banner").removeClass("d-none");

        }
        else{
          alert("You cannot have multiple Kyc Accounts")
        }

        });

   