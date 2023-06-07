  $("input[name='loan_switch']").change(function(){
    var checking = $("input[name='loan_switch']:checked").val();
    console.log(checking);
    if(checking == 'individual'){
      $(".business").addClass("d-none");
      $(".individual").removeClass("d-none");
      
      

    }else if (checking == 'business'){
      $(".individual").addClass("d-none");
      $(".business").removeClass("d-none");
 
      
    }
  });




  $(function(){
    var $generalrequest = $("#loan_form")

    if($generalrequest.length){
        $generalrequest.validate({
            rules: {
                first_name:{
                    required: true
                },
                last_name:{
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
                address:{
                    required: true
                },
                income:{
                  required: true,
                },
                income_type:{
                  required: true,
                  
                },
                loan_type:{
                  required: true 
                },
                period:{
                  required: true 
                },
                loan_amount:{
                  required: true 
                },
                select_branch:{
                  required: true
                },
                tvp:{
                  required: true
                },
                businessname:{
                  required: true
                },
                business_type:{
                  required: true
                },
                yearexp:{
                  required: true
                }
              
              
           
             


            },
            messages:{
                first_name:{
                    required: "Please don't leave this field empty !"
                },
                last_name:{
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
                address:{
                    required: "Please don't leave this field empty !"
                },
                income:{
                    required: "Please don't leave this field empty !"
                },
                income_type:{
                  required: "At least one item should be selected !"
                },
                loan_type:{
                  required: "At least one item should be selected !"
                },
                period:{
                  required: "At least one item should be selected !"
                },
                loan_amount:{
                  required: "Please don't leave this field empty !"
                },
                select_branch:{
                  required:"Atleast one branch should be selected"
                },
                tvp:{
                  required: "Please don't leave this field empty !"
                },
                businessname:{
                  required: "Please don't leave this field empty !"
                },
                business_type:{
                  required: "Please don't leave this field empty !"
                },
                yearexp:{
                  required: "Please don't leave this field empty !"
                }

             


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