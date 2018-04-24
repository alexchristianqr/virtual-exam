import $ from 'jquery'
import 'bootstrap'

export default {
  init () {
    this.load()
  },
  load () {
    $(document).ready(($) => {
      'use strict' // Start of use strict
      let scrollToTop = null
      // Toggle the side navigation
      $('#sidenavToggler').click((e) => {
        e.preventDefault()
        $('body').toggleClass('sidenav-toggled')
        $('.navbar-sidenav .nav-link-collapse').addClass('collapsed')
        $('.navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level').removeClass('show')
      })
      // Force the toggled class to be removed when a collapsible nav link is clicked
      $('.navbar-sidenav .nav-link-collapse').click((e)=> {
        e.preventDefault()
        $('body').removeClass('sidenav-toggled')
      })
      // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
      $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', (e)=> {
        let e0 = e.originalEvent, delta = e0.wheelDelta || -e0.detail
        this.scrollTop += (delta < 0 ? 1 : -1) * 30
        e.preventDefault()
      })
      // Scroll to top button appear
      $(document).scroll(()=> {
        let scrollDistance = $(this).scrollTop()
        if (scrollDistance > 100) {
          $('.scroll-to-top').fadeIn()
        } else {
          $('.scroll-to-top').fadeOut()
        }
      })
      // Smooth scrolling using jQuery easing
      $(document).on('click', 'a.scroll-to-top', (e) => {
        window.clearInterval(1);
        scrollToTop = window.setInterval(() => {
          let pos = window.pageYOffset;
          if ( pos > 0 ) {
            window.scrollTo( 0, pos - 20 );
          } else {
            window.clearInterval( scrollToTop );
          }
        }, 16);
        e.preventDefault();
      })
    }) // End of use strict
  }
}