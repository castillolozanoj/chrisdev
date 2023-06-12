
$(document).ready(function(){
    $(".hamburguer-bt").click(function() {
        $(this).toggleClass("on")
          .next()
          .slideToggle();
      });

    $(".menu").css({ "background-color": "rgba(242, 243, 244, .3)" });
    $(".myimg").css({
      "margin-top": ".3rem",
      "width": "30rem",
      "height": "4rem"
    });

    $('.media-container').click(function() {
      if ($(this).hasClass('playing')) {
        $(this).removeClass('playing');
        $(this).find('.media-video')[0].pause();
      } else {
        $(this).addClass('playing');
        $(this).find('.media-video')[0].play();
     
      }
    });
    var likes = {};

 // Recuperar los datos de localStorage y actualizar los contadores de "Me gusta"
$('.like-count').each(function() {
  var postId = $(this).data('id');
  var likes = parseInt(localStorage.getItem(postId)) || 0;
  $(this).text(likes);
});

// Manejar el evento click del botón de "Me gusta"
$('.like-button').click(function() {
  var postId = $(this).data('id');
  var likes = parseInt(localStorage.getItem(postId)) || 0;
  likes++;
  localStorage.setItem(postId, likes);
  $('[data-id="' + postId + '"].like-count').text(likes);
});
});
  






