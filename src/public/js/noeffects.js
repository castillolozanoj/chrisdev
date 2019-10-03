
$(document).ready(function(){
    $(".hamburguer-bt").click(function() {
        $(this).toggleClass("on")
          .next()
          .slideToggle();
      });

    $(".menu").css({ "background-color": "#fff" });
    $(".myimg").css({
      "margin-top": ".3rem",
      "width": "3.5rem",
      "height": "3.5rem"
    });
});
  






