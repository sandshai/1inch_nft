import { Component } from '@angular/core';

import SwiperCore, { SwiperOptions, Navigation } from 'swiper';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-utility-collections',
  templateUrl: './utility-collections.component.html',
})
export class UtilityCollectionsComponent {
  config: SwiperOptions = {
    slidesPerView: 1.2,
    spaceBetween: 15,
    navigation: {
      nextEl: '#u-next',
      prevEl: '#u-prev',
    },
    pagination: false,
    scrollbar: { draggable: true },
    breakpoints: {
      400: {
        slidesPerView: 1.5,
      },
      500: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 2.3,
      },
      767: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1100: {
        slidesPerView: 4.5,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 4.7,
        spaceBetween: 32,
      },
      1250: {
        slidesPerView: 4.8,
        spaceBetween: 32,
      },
      1300: {
        slidesPerView: 5,
        spaceBetween: 32,
      },
    },
  };
}
