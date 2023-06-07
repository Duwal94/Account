$(function(){
    var $generalrequest = $("#dispute_form")

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
                contact:{
                    required: true,
                    number: true,
                    maxlength: 9
                },
                select_dispute:{
                    required: true 
                },
                DOB:{
                    required: true
                },
                d_amount:{
                    required:true
                },
                t_bank:{
                    required: true
                },
                t_location:{
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
                contact:{
                    required: "Please don't leave this field empty !",
                    number:"Please enter numbers only !",
                    maxlength: "Please enter valid contact number !"
                },
                select_dispute:{
                    required: "Atleast an item should be selected !"
                },
                d_amount:{
                    required: "Pleade don't leave this field empty !"
                },
                t_bank:{
                    required: "Please don't leave this field empty !"
                },
                t_location:{
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
