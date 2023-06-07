
$(document).ready(function(){

  $('.flipbtn').off('click').on('click', function(e){
      $parent = $(this).closest('.card');
      $parent.find('.front').toggleClass('flipped');
      $parent.find('.back').toggleClass('flipped');

  });

  $(".tbtns").click(function(){
    $('.tbtns').removeClass('active').removeClass('text-white').addClass('bg-white').addClass('text-black');
    $('.contentR').removeClass('show');
    $( $(this).data('target') ) .addClass('show');
    $(this).addClass('active').removeClass('bg-white').removeClass('text-black').addClass('text-white');
   

    
  });

});