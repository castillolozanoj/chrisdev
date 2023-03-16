function scrollLogo(window) {
  $(window).scroll(function() {
    let valor = $(".menu").offset().top > 120;
    switch (valor) {
      case true:
        $(".menu").css({ "background-color": "#f2f3f4" });
        $(".myimg").css({
          "margin-top": ".3rem",
          width: "30rem",
          height: "4rem"
        });
        $(".ir-arriba").slideDown(300);
        break;
      case false:
        $(".myimg").css({
          "margin-top": "4rem",
          width: "55rem",
          height: "20rem"
        });
        $(".menu").css({ "background-color": "transparent" });
        $(".ir-arriba").slideUp(300);
        break;
    }
  });
}
