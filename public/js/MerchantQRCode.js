$("input[name='ind_bus_switch']").change(function(){
    var checkdVal = $("input[name='ind_bus_switch']:checked").val();
    console.log(checkdVal);
    if(checkdVal=='individual') 
    {
      
      $( "#Business" ).addClass( "d-none" );
      $( "#individual" ).removeClass( "d-none" );
      $( "#ind_switch" ).attr( 'checked',true );
      $( "#bus_switch" ).removeAttr("checked")
    }else{

      $( "#individual" ).addClass( "d-none" );
      $( "#Business" ).removeClass( "d-none" );
      $( "#bus_switch" ).attr( "checked", true );
      $( "#ind_switch" ).removeAttr("checked")

    }

    });

    $(function(){
      var $generalrequest = $("#Merch_qr")
  
      if($generalrequest.length){
          $generalrequest.validate({
              rules: {
                  Refferers_name:{
                      required: true
                  },
                  accountholder:{
                      required: true
                  },
                  Email:{
                      required: true,
                      email: true
                  },
                  mobilenumber:{
                      required: true,
                      number: true,
                      rangelength: [10, 10]
                  },
                  r_contact:{
                      required: true,
                      number: true,
                      rangelength: [10, 10]
                  },
                  name:{
                      required: true 
                  },
                  accountnumber:{
                    required: true 
                  },
                  pan:{
                      required:true
                  },
               
  
  
              },
              messages:{
                  Refferers_name:{
                      required: "Please don't leave this field empty !"
                  },
                  accountholder:{
                      required: "Please don't leave this field empty !"
                  },
                  Email:{
                      required: "Please don't leave this field empty !",
                      email: "Please enter a valid email address."
                  },
                  mobilenumber:{
                      required: "Please don't leave this field empty !",
                      number:"Please enter numbers only !",
                      rangelength: "Please enter ten digit number !"
                  },
                  r_contact:{
                      required: "Please don't leave this field empty !",
                      number:"Please enter numbers only !",
                      maxlength: "Please enter valid contact number !"
                  },
                  name:{
                      required: "Atleast an item should be selected !"
                  },
                  accountnumber:{
                    required: "Atleast an item should be selected !"
                  },
                  pan:{
                      required: "Pleade don't leave this field empty !"
                  },
  
  
              }
          })
      }
  })
  
  function forceNumeric(){
      var $input = $(this);
      $input.val($input.val().replace(/[^\d]+/g,''));
  }
  $(document).on('propertychange input keyup keypress keydown', '.numberOnly', forceNumeric);
  
  function alphaOnly(event) {
      var value = String.fromCharCode(event.which);
      var pattern = new RegExp(/[a-zA-Z]/i);
      return pattern.test(value);
   }
   $(document).on('input keypress','.alphaOnly', alphaOnly);
  