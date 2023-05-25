function scrollLogo (window) {
  $(window).scroll(function () {
    const valor = $('.menu').offset().top > 120
    switch (valor) {
      case true:
        $('.menu').css({ 'background-color': 'rgba(242, 243, 244, .3)', 'border-bottom': '1px solid  #000' })
        $('.myimg ').css({
          'margin-top': '.3rem',
          width: '30rem',
          height: '4rem'
        })
        $('.ir-arriba').slideDown(300)
        break
      case false:
        $('.myimg ').css({
          'margin-top': '4rem',
          width: '50rem',
          height: '20rem'
        })
        $('.menu').css({ 'background-color': 'transparent', 'border-bottom': 'none' })
        $('.ir-arriba').slideUp(300)
        break
    }
  })
}
