$(document).ready(function() {
  $(".hamburguer-bt").click(function() {
    $(this).toggleClass("on")
      .next()
      .slideToggle();
     
  });
  

  $(window).scroll(function() {
    let valor = $(".menu").offset().top > 120;
    switch (valor) {
      case true:
        $(".menu").css({ "background-color": "rgba(255,255,255, .8)" });
        $("#myimg").css({
          "margin-top": ".3rem",
          "width": "3.5rem",
          "height": "3.5rem"
        });
        break;
      case false:
        $("#myimg").css({
          "margin-top": "4rem",
          "width": "20rem",
          "height": "20rem"
        });
        $(".menu").css({ "background-color": "transparent" });
        break;
    }
  });

  

  /* 	$(window).scroll(function() {
        if ($(".menu").offset().top > 90) {
			$(".menu").css({"background-color": "rgba(255,255,255, .8)"});
			$("#myimg").css({"margin": ".3rem", "width": "3.5rem","height":"3.5rem"});
        } else{
            $("#myimg").css({"margin-top": "3rem", "width": "20rem","height":"20rem"});
            $(".menu").css({"background-color": "transparent" });
        }   
        

      });
 */
});
