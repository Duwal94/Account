
//terms and condition button event handeling
$("#agree").click(function () {
  $("#terms").addClass("d-none");
  $("#verify").removeClass("d-none");
});
$("#decline").click(function () {
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
      } else {
        swal("You need to agree to terms and condition to proceed further.");
      }
    });
});
$(".back-button").click(function () {
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
$("input[name='kyc_verify']").change(function () {
  var checkdVal = $("input[name='kyc_verify']:checked").val();
  console.log(checkdVal);
  if (checkdVal == 'no') {
    $("#verify").addClass("d-none");
    $("#generald").removeClass("d-none");
    $("#kyc_banner").removeClass("d-none");

    swal({
      title: "Inforrmation",
      text: "You are now redirected to form. Please fill the form correctly!",
      icon: "info",
      dangerMode: true,
    })
  }
  else {
    swal({
      title: "Error?",
      text: "You can't have multiple kyc accounts!",
      icon: "error",
      dangerMode: true,
    })
  }
});


// general information form scripts 
$("#genr_next").click(function () {
  $("#generald").addClass("d-none")
  $("#addr_details").removeClass("d-none");
});


// script for buttons of address section 
$("#addr_prev").click(function () {
  $("#addr_details").addClass("d-none");
  $("#generald").removeClass("d-none");
});

$("#addr_next").click(function () {
  $("#addr_details").addClass("d-none");
  $("#family").removeClass("d-none");
});



$("#family_prev").click(function () {
  $("#family").addClass("d-none");
  $("#addr_details").removeClass("d-none");
});

$("#family_next").click(function () {
  $("#family").addClass("d-none");
  $("#occupation").removeClass("d-none");
});

$("#Occ_prev").click(function () {
  $("#occupation").addClass("d-none");
  $("#family").removeClass("d-none");
});



//Occupation toogle for question no 3
$("input[name='toogle_1']").change(function () {
  var checkdVal = $("input[name='toogle_1']:checked").val();
  console.log(checkdVal);
  if (checkdVal == 'yes') {

    $("#toogle").removeClass("d-none");


  }
  else {
    $("#toogle").addClass("d-none");
  }
});



//add row in family table 
$(document).ready(function () {
  // Add row when the "Add Row" button is clicked
  $("#addRowButton").click(function () {
    // Clone the last row in the table
    const newRow = $("#targetTable tbody tr:last").clone();

    // Clear the input values of the cloned row
    newRow.find("input").val("");

    // Append the cloned row to the table body
    $("#targetTable tbody").append(newRow);
  });

  // Remove row when the "Remove Row" button is clicked
  $("#removeRowButton").click(function () {
    // Check if there is more than one row in the table body
    const rowCount = $("#targetTable tbody tr").length;
    console.log(rowCount);
    if (rowCount > 1) {
      // Remove the last row from the table body
      $("#targetTable tbody tr").eq(rowCount - 1).remove();
    }
  });
});






// script for form switch of proof upload section 
$("input[name='proof_switch']").change(function () {
  var checkdVal = $("input[name='proof_switch']:checked").val();
  console.log(checkdVal);
  if (checkdVal == 'passport') {

    $("#passport").removeClass("d-none");
    $("#citizenship").addClass("d-none");
    $("#voter").addClass("d-none");

  } else if (checkdVal == 'citizenship') {

    $("#citizenship").removeClass("d-none");
    $("#passport").addClass("d-none");
    $("#voter").addClass("d-none");

  }
  else {
    $("#voter").removeClass("d-none");
    $("#passport").addClass("d-none");
    $("#citizenship").addClass("d-none");
  }

});

// final page (PROOF UPLOAD)button scripts
$("#proof_prev").click(function () {
  $("#proof").addClass("d-none");
  $("#addr_details").removeClass("d-none");
});

