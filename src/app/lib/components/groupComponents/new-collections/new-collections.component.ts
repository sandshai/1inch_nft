import { Component } from '@angular/core';

import SwiperCore, { SwiperOptions, Navigation } from 'swiper';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-new-collections',
  templateUrl: './new-collections.component.html',
})
export class NewCollectionsComponent {

  config: SwiperOptions = {
    slidesPerView: 1.2,
    spaceBetween: 15,
    navigation: {
      nextEl: '#next',
      prevEl: '#prev',
    },
    pagination: false,
    scrollbar: { draggable: true },
    breakpoints: {
      500: {
        slidesPerView: 1.7,
      },
      767: {
        slidesPerView: 2.4,
      },
      992 : {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },
  };

}
