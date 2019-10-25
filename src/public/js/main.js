$(document).ready(function() {
  $(".hamburguer-bt").click(function() {
    $(this).toggleClass("on")
      .next()
      .slideToggle();
  });
  
  $('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
 
scrollLogo(window);

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-150948906-1');


});


