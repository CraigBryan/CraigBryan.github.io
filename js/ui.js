/*jslint browser: true*/
/*global $, jQuery*/

"use strict";

var configs = {
  "header height": 150,
  "scroll duration": 750,
  "menu active class": 'active'

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

    function toggleMenuElements() {
      toggleClass(layout, configs["menu active class"]);
      toggleClass(menu, configs["menu active class"]);
      toggleClass(menuLink, configs["menu active class"]);
    };

    menuLink.click(function (e) {
      e.preventDefault();
      toggleMenuElements();
    });

    $('#menu a').click(function (e) {
      if (menu.hasClass(configs["menu active class"])) {
        toggleMenuElements();
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
          duration: configs["scroll duration"],
          easing: 'swing'
        }
      );

      $(this).blur();
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
      return $(window).scrollTop() + configs["header height"];
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

      if(tops.length === 0) {
        return;
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
      tops = null;
    });

    highlightMenu(); //Highlights the right one at the start
  }());
});