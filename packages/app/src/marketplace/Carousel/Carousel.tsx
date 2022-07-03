import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import cn from 'classnames'

import SlickCarousel from 'react-slick'

import type CarouselCardProps from './CarouselCardProps'
import { PreviousArrow, NextArrow } from './Arrows'

const CarouselOuter = styled.div`

  position: relative;

  // This allows room for the cards to expand on hover without getting clipped out by the parent div 
  & .slick-track {
    padding: 25px 0px;
  },

  & .slick-slide {
    padding-right: 8px; // theme.spacing(1)
  },

  & .carousel-card {
    margin-left: 6px;
    margin-right: 6px;
  }
`

export interface CarouselProps<T> {
  elements: T[]
  height: number
//  aspectRatio: number
  RenderComponent: React.FC<CarouselCardProps<T>>
  title?: string 
  handleElementSelected?: (element: T) => void
  outerClassName?: string
  titleClassName?: string
  cardClassName?: string
  responsivity?: Array<any>
}

  // Have to use the function syntax to support generics
  // https://stackoverflow.com/questions/68757395/how-to-make-a-functional-react-component-with-generic-type
function Carousel<T>({
  elements,
  height,
//  aspectRatio,
  RenderComponent,
  title,
  handleElementSelected,
  outerClassName,
  titleClassName,
  cardClassName,
  responsivity
}: PropsWithChildren<CarouselProps<T>>) {

      // NOTE: We could pass in a "averageWidth" prop, and generate these breakpoints dynamically.
      // Common are based on ~320px width
  const responsive = responsivity ? responsivity : {}

  const sliderSettings = {
    dots: false,
    infinite: true,
    variableWidth: false,
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 4,
    swipeToSlide: true,
    // @ts-ignore
    prevArrow: <PreviousArrow />,
    // @ts-ignore
    nextArrow: <NextArrow />,
    responsive: responsive
  }

  return (
      // For some reason, the 100% width seems to be important if the parent has certain flex-box props going on
      // and with various tailwind mysteries.
    <div className={outerClassName ? outerClassName : ''} style={{width: '100%'}}>
      <h4 className={titleClassName ? titleClassName : ''}>{(title) ? title : `Carousel Title`}</h4>
      <CarouselOuter>
        <SlickCarousel {...sliderSettings} >
          {elements.map((element, i) => (
            <RenderComponent 
              element={element} 
              height={height} 
              //aspectRatio={aspectRatio} 
              handleElementSelected={handleElementSelected} 
              classNameOuter={cn('carousel-card', cardClassName ? cardClassName : '')}
              key={i} // ok, since no stable ID's (React DOCs)
            />
          ))}
        </SlickCarousel>
      </CarouselOuter>
    </div>
  )
}

export default Carousel
