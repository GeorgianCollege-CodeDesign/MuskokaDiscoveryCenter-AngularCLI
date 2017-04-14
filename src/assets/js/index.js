 $(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    $('.scroll').on('click', function(e){
		e.preventDefault()

  $('html, body').animate({
      scrollTop : $(this.hash).offset().top
    }, 1500);
});

});


$('#kidout').on('click', function () {
   $('#signin').hide();
   $('#signout').fadeIn();
});

$('#kidin').on('click', function () {
   $('#signout').hide();
   $('#signin').fadeIn();
});

 $('.confirmation').on('click', function() {
   return confirm('Are you sure you want to delete this item?');
 });

