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
        nav: true,
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

});
