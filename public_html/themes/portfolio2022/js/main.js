function link_is_external(link_element) {
    return (link_element.host !== window.location.host);
}

function isElementFullyInViewport(el, size) {
    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();
    var elbottom = rect.bottom - size;

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        elbottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function isElementInViewport(el, size) {

  if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();
    // var elbottom = rect.bottom - size;
    var eltop = rect.top - size;
    console.log(rect.top);

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ &&
        eltop <= (window.innerHeight || document.documentElement.clientHeight)  /* or $(window).height() */;
}

function preload(arrayOfImages) {
  $(arrayOfImages).each(function(){
      $('<img/>')[0].src = this;
      // Alternatively you could use:
      // (new Image()).src = this;
  });
}

(function ($) {
    $(document).ready(function()
    {
        // If anchor in URL, smooth scroll to it
        if (window.location.hash)
        {
            var anchorLink = window.location.hash;

            // Only try to smooth anchor if there is actually a matching element
            if ($(anchorLink).offset())
            {
                var positionWithOffset = $(anchorLink).offset().top - 200;

                $('html, body').animate({
                    scrollTop: positionWithOffset
                }, 500);
            }
        }

        // Open external links in a new tab
        $('a').each(function()
        {
        if (link_is_external(this)) {
            $(this).attr('target', '_blank');
        }
        });

        // Toggle mobile menu
        $('.menu-toggle').each(function() {
            $(this).click(function() {
            if ($(this).hasClass('menu-active'))
            {
                $('.main-nav').removeClass('active');
                $('.menu-toggle').each(function() {
                    $(this).removeClass('menu-active');
                });
                $('.close-menu').each(function() {
                    $(this).removeClass('active');
                    $(this).addClass('hidden');
                });
                $('.open-menu').each(function() {
                    $(this).removeClass('hidden');
                    $(this).addClass('active');
                });
            }
            else
            {
                $('.main-nav').addClass('active');
                $('.menu-toggle').each(function() {
                    $(this).addClass('menu-active');
                });
                $('.close-menu').each(function() {
                    $(this).removeClass('hidden');
                    $(this).addClass('active');
                });
                $('.open-menu').each(function() {
                    $(this).removeClass('active');
                    $(this).addClass('hidden');
                });
            }
            });
        });

        // Smooth anchor scroll for same page clicks
        $(document).on('click', 'a[href^="#"]', function (event) {
            // If not toggling the menu, close the mobile menu for any other anchor scroll clicks
            if ($(this).attr('href') == '#main-content')
            {
            event.preventDefault();
            var topOffset = $($.attr(this, 'href')).offset().top - 200;

            $('html, body').animate({
                scrollTop: topOffset
            }, 500);
            }
        });

    });
    $(window).scroll(function() { 
        // Homepage tags move
        var scrollPos = $(document).scrollTop();
    
        $('.view-skills').css( "left", -scrollPos );
        
      });
})(jQuery);