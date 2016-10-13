/**
 * Created by Administrator on 2016/10/10.
 * ding xi sheng huo wang javascript file
 */

'use strict';

$(document).ready(function () {

  // 首页活动滚动
  var $owlHuodongV1 = $('.huodong-v1-slide');
  $owlHuodongV1.owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      750: {
        items: 2,
        nav: false,
      },
      970: {
        items: 4,
        nav: false,
        loop: false,
      },
      1400: {
        items: 5,
        nav: false,
        loop: false,
      },
    },
  });
  $('.prev-v1').click(function () {
    $owlHuodongV1.trigger('prev.owl.carousel');
  });

  $('.next-v1').click(function () {
    $owlHuodongV1.trigger('next.owl.carousel');
  });


  // 首页积分商城
  $('#jfsc-index').cubeportfolio({
    filters: '#jfsc-index-filter',
    loadMore: '#js-loadMore-masonry-projects',
    loadMoreAction: 'click',
    layoutMode: 'grid',
    defaultFilter: '*',
    animationType: 'quicksand',
    gapHorizontal: 35,
    gapVertical: 25,
    gridAdjustment: 'responsive',
    mediaQueries: [{
      width: 1500,
      cols: 5,
    }, {
      width: 1100,
      cols: 4,
    }, {
      width: 800,
      cols: 3,
    }, {
      width: 480,
      cols: 2,
      options: {
        caption: '',
      },
    }, {
      width: 320,
      cols: 1,
      options: {
        caption: '',
      },
    },
    ],
    caption: 'zoom',
    displayType: 'fadeIn',
    displayTypeSpeed: 100,
  })


  // init cubeportfolio
  var singlePage = $('#js-singlePage-container').children('div');
  $('#js-grid-slider-projects').cubeportfolio({
    layoutMode: 'slider',
    drag: true,
    auto: false,
    autoTimeout: 5000,
    autoPauseOnHover: true,
    showNavigation: true,
    showPagination: false,
    rewindNav: false,
    scrollByPage: false,
    gridAdjustment: 'responsive',
    mediaQueries: [{
      width: 1500,
      cols: 5,
    }, {
      width: 1100,
      cols: 4,
    }, {
      width: 800,
      cols: 3,
    }, {
      width: 480,
      cols: 2,
      options: {
        caption: '',
      },
    }, {
      width: 320,
      cols: 1,
      options: {
        caption: '',
      },
    },
  ],
    gapHorizontal: 0,
    gapVertical: 25,
    caption: 'overlayBottomReveal',
    displayType: 'fadeIn',
    displayTypeSpeed: 100,

  });

});
