import { Component } from '@angular/core';

import SwiperCore, { SwiperOptions, Navigation } from 'swiper';

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-highlight-projects',
  templateUrl: './highlight-projects.component.html',
})

export class HighlightProjectsComponent {
  config: SwiperOptions = {
    slidesPerView: 1.2,
    spaceBetween: 15,
    navigation: {
      nextEl: '#h-next',
      prevEl: '#h-prev',
    },
    pagination: false,
    scrollbar: { draggable: true },
    breakpoints: {
      400: {
        slidesPerView: 1.5,
      },
      500: {
        slidesPerView: 1.7,
      },
      600: {
        slidesPerView: 1.9,
      },
      700: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 2.5,
      },
      900: {
        slidesPerView: 2.7,
        spaceBetween: 15,
      },
      992 : {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 32,
      }
    },
  };
}
