import React from 'react'
import styled from 'styled-components'
import cn from 'classnames'

import type NameElement  from './NameElement'
import type CarouselCardProps  from './CarouselCardProps'

const NameCarouselCardOuter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const NameCarouselCardName = styled.div`
  font-size: 1.8rem;
  color: 'white';
`

const NameCarouselCard: React.FC<CarouselCardProps<NameElement>> = ({
  element, 
  height,
//  aspectRatio,
  handleElementSelected,
  classNameOuter
}) => {

  const onClick = (e) => {
    if (handleElementSelected) {
      handleElementSelected(element)  
      e.preventDefault()
      e.stopPropagation()
    }
  }

    // Don't put these in the SC since we want them to be 
    // hardest to override 
  const sizeStyles = {
    height: height,
    //width: height * aspectRatio, // set dynamically by slick
    backgroundColor: 'inherit'
  }

    // NOTE: The Carousel component we use seems to clobber the 'style' prop of the outermost div,
    // so we need an extra div on the ouside.
  return (
      <NameCarouselCardOuter 
        style={sizeStyles} 
        onClick={onClick} 
        className={cn(
          classNameOuter ? classNameOuter : '', 
          handleElementSelected ? 'hover:cursor-pointer' : '',
          'border border-indigo-600 rounded'
        )}
      >
        <NameCarouselCardName>{element.name}</NameCarouselCardName>
      </NameCarouselCardOuter>
  )
}

export default NameCarouselCard
