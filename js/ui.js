/*jslint browser: true*/
/*global $, jQuery*/

"use strict";

var properties = {
  "header height": 200,
  "scroll duration": 750
};

$(document).ready(function () {

  /*
   * Deals with the showing and hiding of the menu at the side
   */
  (function () {

    var layout = $('#layout'),
      menu = $('#menu'),
      menuLink = $('#menuLink');

    function toggleClass(element, className) {
      if (element.hasClass(className)) {
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
      if (menu.hasClass(active)) {
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
      }
    });
  }());

  /*
   * Smooth scrolling for menu links
   */
  (function () {
    $('#menu a[href^="#"]').click(function (e) {
      e.preventDefault();

      var $target = $(this.hash);

      $('html, body').stop().animate(
        { 'scrollTop': $target.offset().top },
        {
          duration: properties["scroll duration"],
          easing: 'swing'
        }
      );
    });
  }());

  /*
   * Deals with highlighting links as the user scrolls
   */
  (function () {
    var menuItems = jQuery("#menu li"),
    tops = null;

    function calculateTops() {
      tops = [];
      $(".subsection").each(function (index) {
        tops[index] = $(this).offset().top;
      });
    };

    function calculateScroll() {
      return $(window).scrollTop() + properties["header height"];
    };

    function toggleActiveMenuItem(index) {
      for (var i = 0; i < menuItems.length; ++i) {
        if(i === index) {
          $(menuItems[i]).addClass("menu-item-divided pure-menu-selected");
        } else {
          $(menuItems[i]).removeClass("menu-item-divided pure-menu-selected");
        }
      }
    };

    function highlightMenu () {
      var scroll = calculateScroll();
      var index = 0;

      if(tops === null) {
        calculateTops();
      }

      for (var i = 0; i < tops.length - 1; ++i) {
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