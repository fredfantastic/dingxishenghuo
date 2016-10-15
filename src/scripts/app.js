/**
 * Created by Administrator on 2016/10/10.
 * ding xi sheng huo wang javascript file
 */

'use strict';

$(document).ready(function () {
  // 首页活动
  $('#huodong-v2-slide').cubeportfolio({
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
  });

});
