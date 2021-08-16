import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Card as Existing, CardBody } from 'components'
import { useModal } from 'components/Modal'
import HatchModal from 'components/ZooModals/HatchModal'
import { EggCardType } from './types'


const wiggle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(4deg);
  }
  75% {
    transform: rotate(-4deg);
  }
  100% {
    transform: rotate(0deg);
  }
`

const pulse = keyframes`
  0% {
    box-shadow: 0px 4px 12px #555555;
  }
  50% {
    box-shadow: 0px 4px 14px #EEEEEE;
  }
  100% {
    box-shadow: 0px 4px 12px #555555;
  }
}
`
const scale = keyframes`
  0% {
	transform: scale(1);
  }
  50% {
	transform: scale(1.05);
  }
  100% {
	transform: scale(1);
  }
}
`

const wiggleAnimation = (props) =>
  css`
    ${wiggle} 0.5s ease-in-out;
  `

const pulseAnimation = (props) =>
  css`
    ${pulse} 2.2s ease-in-out infinite;
  `

const scaleAnimation = (props) =>
  css`
    ${scale} 2.2s ease-in-out infinite;
  `

const InfoBlock = styled.div`
  padding: 8px;
  text-align: center;
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999999;
`

const TextWrapper = styled.div`
  text-shadow: 0px 2px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #ffffff;
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 1.4px;
  text-transform: uppercase;
`

const TimeoutWrapper = styled.div<{ barwidth?: string }>`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 1.8;
  text-align: center;
  color: white;
  padding: 4px;
  text-align: center;
  width: 100%;
  background-color: #a7565e;
  z-index: 999999;
  ::before {
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ barwidth }) => barwidth};
    background: grey;
  }
`

const TimeoutDisplay = styled.span`
  position: relative;
  z-index: 2;
`

const cardAnimation = (interactive, hatching, hatched) => {
  if (!interactive && !hatching) return scaleAnimation
  if (hatched) return pulseAnimation
  if (hatching) return scaleAnimation
  return null
}

const Card = styled(Existing)<{ timedOut?: boolean; interactive?: boolean; hatching?: boolean; hatched?: boolean }>`
  animation:  ${({ interactive, hatching, hatched }) => cardAnimation(interactive, hatching, hatched)};
  cursor: pointer;
  width: 160px;
  margin: 4px 8px 16px 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  display: block;
  opacity: ${({ interactive, hatching }) => (!interactive && !hatching ? '0.7' : null)};
  transition: all 1s ease-in-out;
`

export const EggCard: React.FC<EggCardType> = ({ egg, hatchEgg, hatchEggReady }) => {
  const onHatch = () => hatchEgg(egg)
  const onReveal = () => hatchEggReady(egg)

  const buttonActions = () => {
    if (egg.timeRemaining > 0) return null
    if (!egg.interactive) return null
    if (!egg.hatched) return onHatch()
    if (egg.hatched) return onReveal()
  }

  const hatched  = egg.hatched && egg.interactive
  const hatching = egg.hatched && !egg.interactive

  const buttonLabel = (egg) => {
    if (!egg.hatched && !egg.interactive) return 'PENDING'
    if (!egg.hatched &&  egg.interactive) return 'HATCH'
    if  (egg.hatched && !egg.interactive) return 'MINTING'
    if  (egg.hatched &&  egg.interactive) return 'READY'
    return ''
  }

  const basicEggURL       = window.location.origin + '/static/images/basic.jpg'
  const hybridEggURL      = window.location.origin + '/static/images/hybrid.jpg'
  const transparentEggURL = window.location.origin + '/static/images/transparent.jpg'
  const backgroundImage   = !egg.interactive && !hatching ? transparentEggURL : egg.basic ? basicEggURL : hybridEggURL

  return (
    <>
      <Card
        onClick={() => buttonActions()}
        style={{ backgroundColor: '#000000' }}
        timedOut={egg.timeRemaining > 0 ? true : false}
        interactive={egg.interactive}
        hatching={hatching}
        hatched={hatched}>
        <CardBody
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0% 60%',
            borderRadius: 8,
            height: 160,
            transition: 'background-image 1000ms linear',
          }}>
          <TextWrapper
            style={{
              position: 'absolute',
              top: 8,
              left: 0,
              width: '100%',
              textAlign: 'center',
            }}>
            {egg.name}
          </TextWrapper>
        {egg.timeRemaining > 0 ? (
          <TimeoutWrapper barwidth={egg.CTAOverride ? egg.CTAOverride.barwidth : 0}>
            <TimeoutDisplay>{`${egg.CTAOverride.timeRemainingDaysHours.days}D ${egg.CTAOverride.timeRemainingDaysHours.hours}H`}</TimeoutDisplay>
          </TimeoutWrapper>
        ) : (
          <InfoBlock
            style={{
              position: 'absolute',
              textAlign: 'center',
              padding: 8,
            }}>
            <TextWrapper>{buttonLabel(egg)}</TextWrapper>
          </InfoBlock>
        )}
        </CardBody>
      </Card>
    </>
  )
}

export default EggCard
