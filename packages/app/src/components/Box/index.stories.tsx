import React from 'react'
import BoxComponent from './Box'
import FlexComponent from './Flex'
import Text from '../Text/Text'

export default {
  title: 'Components/Primitives',
  component: BoxComponent,
  argTypes: {},
}

export const Box: React.FC = () => {
  return (
    <div>
      <BoxComponent as='p'>Contains background, border, layout, position, and space from </BoxComponent>
    </div>
  )
}

export const Flex: React.FC = () => {
  return (
    <div>
      <Text>Based on the Box component. You can apply any flexbox properties on the Flex component.</Text>
      <FlexComponent justifyContent='space-between' mt='40px'>
        <span>Left</span>
        <span>right</span>
      </FlexComponent>
      <FlexComponent justifyContent='center' mt='8px'>
        <span>center</span>
      </FlexComponent>
    </div>
  )
}
