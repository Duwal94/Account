$(document).ready(function () {
  $(".loadAjax").each(function (index, item) {
    $.get($(item).data("url"), function (data) {
      $(item).html(data);
    });
  });
});
