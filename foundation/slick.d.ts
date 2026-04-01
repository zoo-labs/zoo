import React from 'react';

declare module 'react-slick' {
  export interface Settings {
    accessibility?: boolean;
    adaptiveHeight?: boolean;
    arrows?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    centerMode?: boolean;
    centerPadding?: string;
    className?: string;
    cssEase?: string;
    dots?: boolean;
    dotsClass?: string;
    draggable?: boolean;
    easing?: string;
    fade?: boolean;
    focusOnSelect?: boolean;
    infinite?: boolean;
    initialSlide?: number;
    lazyLoad?: boolean;
    pauseOnDotsHover?: boolean;
    pauseOnFocus?: boolean;
    pauseOnHover?: boolean;
    responsive?: Array<{
      breakpoint: number;
      settings: Settings | 'unslick';
    }>;
    rtl?: boolean;
    slide?: string;
    slidesToScroll?: number;
    slidesToShow?: number;
    speed?: number;
    swipe?: boolean;
    swipeToSlide?: boolean;
    touchMove?: boolean;
    touchThreshold?: number;
    useCSS?: boolean;
    useTransform?: boolean;
    variableWidth?: boolean;
    vertical?: boolean;
    verticalSwiping?: boolean;
    waitForAnimate?: boolean;
    afterChange?: (currentSlide: number) => void;
    beforeChange?: (currentSlide: number, nextSlide: number) => void;
  }

  export default class Slider extends React.Component<Settings> {}
}