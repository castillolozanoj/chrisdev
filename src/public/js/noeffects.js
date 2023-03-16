
$(document).ready(function(){
    $(".hamburguer-bt").click(function() {
        $(this).toggleClass("on")
          .next()
          .slideToggle();
      });

    $(".menu").css({ "background-color": "#f2f3f4" });
    $(".myimg").css({
      "margin-top": ".3rem",
      "width": "30rem",
      "height": "4rem"
    });
});
  






