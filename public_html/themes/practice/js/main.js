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
    var elbottom = rect.bottom - size;

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ &&
        elbottom <= (window.innerHeight || document.documentElement.clientHeight)  /* or $(window).height() */;
}

(function ($) {
  
  $(document).ready(function()
  {

    $("h1").each(function(){
      $(this).html($(this).html().replace(/&reg;/gi, '<sup>&reg;</sup>').replace(/®/gi, '<sup>&reg;</sup>'));
    });

    // Toggling the mobile menu
    $('.mobile-menu').click(function() {
        $(this).toggleClass('active');
        $(".mobile-close").toggleClass('active');
        $('.mobile .region-nav').toggleClass('active');
    });
    $('.mobile-close').click(function() {
        $(".mobile-menu").toggleClass('active');
        $(this).toggleClass('active');
        $('.mobile .region-nav').toggleClass('active');
    });

    // Set empty links to have the hash as their href - no longer a Drupal default
    $('#block-akebono-main-menu a').each(function()
    {
      if ($(this).data('drupal-link-system-path') == '<front>' && $(this).attr('href') == '')
      {
        $(this).attr('href', '#');
      }
    });

    // If homepage
    if ($('body').hasClass('path-frontpage'))
    {
      // Homepage word transition / animation
      var words = new Array('logo.','branding.','business cards.','t-shirt.','website.');
      var i = 0;

      setInterval( function(){
        $('.word-change').animate({'opacity': 0}, 1500, function () {
          $('.word-change').text( words[ i ] );
          if( i < 4 ) 
          {
            i++;
          } else {
            i = 0;
          }
        }).animate({'opacity': 1}, 1500);
      }, 1500 );
    }

    $(".anchor-link").click(function(e) {
      e.preventDefault();
      var aid = $(this).attr("href");
      $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
    });

    // Add Quotes to Testimonial quote
    $('.field_quote').each(function() {
      var rawQuote = $(this).text();
      newQuote = '<p>' + '“' + rawQuote + '”' + '<p>';
      $(this).html(newQuote);
    });

    // Add class to have animation
    setTimeout(function(){
      $('#block-homepageheader h1').addClass('active');
      $('#block-practice-page-title h1').addClass('active');
    }, 300);
    setTimeout(function(){
      $('#block-homepageheader p').addClass('active');
    }, 500);

    $('.purple-button').each(function() {
      $(this).parent().addClass('purple-button-wrapper');
    });

  });
  $(window).scroll(function() { 
    // Homepage tags move
    var scrollPos = $(document).scrollTop();

    $('.view-homepage_tags').css( "left", -scrollPos );
    
    // If viewable on a large screen, load the applicable strips
    $('#block-aboutme').each(function() {
      var isVisible = isElementInViewport($(this), 300);
        if (isVisible)
        {
          $(this).addClass('active');
        }
    });

    var time = 10;
    $('#block-views-block-projects-block-1').each(function() {
      var isVisible = isElementInViewport($(this), 300);
      if (isVisible)
      {
        $(this).addClass('active'); 

        $(this).find('.views-row').each(function(e) {
          
          setTimeout(() => {
            $(this).addClass('active');
          }, time);
          time += 300;
        });
      }
    });

    $('#block-views-block-projects-block-2').each(function() {
      var isVisible = isElementInViewport($(this), 300);
      if (isVisible)
      {
        $(this).addClass('active'); 

        $(this).find('.views-row').each(function(e) {
          
          setTimeout(() => {
            $(this).addClass('active');
          }, time);
          time += 300;
        });
      }
    });

  });
  $( document ).ajaxComplete(function() {
    var ajaxtime = 10;
    $('#block-views-block-projects-block-2 .views-row').each(function(e) {
      setTimeout(() => {
        $(this).addClass('active');
      }, ajaxtime);
      ajaxtime += 300;
    });
  });
})(jQuery);