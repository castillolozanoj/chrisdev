function scrollLogo(window) {
  $(window).scroll(function() {
    let valor = $(".menu").offset().top > 120;
    switch (valor) {
      case true:
        $(".menu").css({ "background-color": "#fff" });
        $(".myimg").css({
          "margin-top": ".3rem",
          width: "3.5rem",
          height: "3.5rem"
        });
        $(".ir-arriba").slideDown(300);
        break;
      case false:
        $(".myimg").css({
          "margin-top": "4rem",
          width: "20rem",
          height: "20rem"
        });
        $(".menu").css({ "background-color": "transparent" });
        $(".ir-arriba").slideUp(300);
        break;
    }
  });
}
