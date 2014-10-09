$(document).ready(function() {

  /*
   * Deals with the showing and hiding of the menu at the side
   */
  (function () {

    var layout   = $('#layout'),
        menu     = $('#menu'),
        menuLink = $('#menuLink');

    function toggleClass(element, className) {
      if(element.hasClass(className)) {
        element.removeClass(className);

      } else {
        element.addClass(className);
      }
    };

    menuLink.click(function (e) {
      var active = 'active';
      e.preventDefault();
      toggleClass(layout, active);
      toggleClass(menu, active);
      toggleClass(menuLink, active);
    });

    $('#menu a').click(function (e) {
      var active = 'active';
      if(menu.hasClass(active)) {
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
      }
    });
  }());

  /*
   * Deals with highlighting links as the user scrolls
   */
  (function () {
    var menuItems = jQuery("#menu li");

    var tops = undefined;

    function calculateTops() {
      tops = [];
      jQuery(".subsection").each(function (index) {
        tops[index] = $(this).offset().top;
      });
    };

    function calculateScroll() {
      return $(window).scrollTop() + 200;
    };

    function toggleActiveMenuItem(index) {
      for(var i = 0; i < menuItems.length; ++i) {
        if(i === index) {
          $(menuItems[i]).addClass("menu-item-divided pure-menu-selected");
        } else {
          $(menuItems[i]).removeClass("menu-item-divided pure-menu-selected");
        }
      }
    };

    function highlightMenu() {
      var scroll = calculateScroll();
      var index = 0;

      if(tops === undefined) {
        calculateTops();
      }

      for(var i = 0; i < tops.length - 1; ++i) {
        if(scroll >= tops[i] && scroll < tops[i+1]) {
          index = i;
          break;
        }

        index = tops.length - 1;
      }

      toggleActiveMenuItem(index);
    };

    //When scrolling, highlight proper menu item
    $(window).scroll(function () {
      highlightMenu();
    });

    //Resets the tops array when the window is resized
    $(window).resize(function () {
      tops = undefined;
    });

    highlightMenu(); //Highlights the right one at the start
  }());
});