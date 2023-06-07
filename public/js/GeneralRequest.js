$(function(){
    var $generalrequest = $("#myform")

    if($generalrequest.length){
        $generalrequest.validate({
            rules: {
                accountnumber:{
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
                select_req:{
                    required: true 
                }
                


            },
            messages:{
                accountnumber:{
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
                select_req:{
                    required: "Atleast an item should be selected !"
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
