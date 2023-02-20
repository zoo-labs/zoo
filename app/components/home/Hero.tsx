import { FC } from 'react'
import Link from 'next/link'

import {
  Text,
  Box,
  Flex,
  Grid,
  Button
} from 'components/primitives'


const Hero: FC<{
  videoWidth: number,
  videoHeight: number,
  tokenHref: string,
  learnMoreHref: string
}> = ({
  videoWidth,
  videoHeight,
  tokenHref,
  learnMoreHref
}) => {

  return (
    <Flex
      align='center'
      justify='center'
      direction='column'
      css={{
        backgroundColor: 'transparent'
      }}
    >
      <Text style='h4' css={{textAlign: 'center', color: '$gray12'}} >ALL NEW ASSET BACKED</Text>
      <Text
        style='h2'
        css={{
          textAlign: 'center',
          color: '$gray12'
        }}
      >LUX URANIUM</Text>
      <Box css={{  borderRadius: 16, backgroundColor: 'black', p: 36, mt: '$2' }} >
        <video
          loop
          muted
          autoPlay
          width={videoWidth}
          height={videoHeight}
          style={{ padding: 32, marginTop: -32 }} // :aa why?
        >
          <source src="./video/luxfinal1.mp4" type="video/mp4" />
        </video>
      </Box>
      <Flex direction='row' css={{ mt: '$2', gap: '$2'}} className="grid h-[100px] w-[380px] grid-cols-2 gap-4">
        <a href={learnMoreHref}>
          <Button color='secondary'>
            Learn More
          </Button>
        </a>
        <Link href={tokenHref}>
          <Button >
            Buy Now
          </Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Hero
