import { useWeb3React } from '@web3-react/core'
import { Card as Existing, CardBody } from 'components'
import { Text } from 'components/Text'
import { useZooKeeper } from 'hooks/useContract'
import useWeb3 from 'hooks/useWeb3'
import Moralis from 'moralis'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addAnimal } from 'state/zoo'
import styled from 'styled-components'
import { Animal } from 'types/zoo'
import { AnimalCardProps } from './types'

const InfoBlock = styled.div`
  padding: 4px;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.6);
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
  // background: white;
  text-align: center;
  color: white;
  padding: 4px;
  text-align: center;
  width: 100%;
  background-color: #a7565e;
  font-size: 14px;
  z-index: 999999;
  ::before {
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //   width: ${({ barwidth }) => barwidth};
    background: grey;
  }
`
const TimeoutDisplay = styled.span`
  position: relative;
  z-index: 2;
`

const BreedWrapper = styled.div<{ cols?: number }>`
  text-shadow: 0px 2px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 550;
  line-height: 1.5;
  letter-spacing: 1.4px;
  text-transform: uppercase;
`

const Card = styled(Existing)<{
  selected?: boolean
  timedOut?: boolean
  rarityColor: string
}>`
  cursor: pointer;
  width: 100%;
  margin: 8px;
  box-shadow: ${(props) => `0px 0px 13px -2px ${props.rarityColor}`};
  backgroundcolor: '#000000';
  display: inline-block;
  border-radius: 8px;
  border: ${({ selected }) => (selected ? '2px solid white' : null)};
  opacity: ${({ timedOut }) => (timedOut ? '0.6' : null)};
`

const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
`

const BidPriceInput = styled.input.attrs({
  type: 'number',
  min: 1,
})`
  width: 100%;
  line-height: 1.5rem;
  margin-left: 15px;
`

export const AnimalCard = ({ animal, animalGroup, hybrid, allAnimals, account, executeStackedBreeding, breedClick }: AnimalCardProps): JSX.Element => {
  const dispatch = useDispatch()
  const bid = useRef(100)
  let array = []
  const web3 = useWeb3()
  const { chainId } = useWeb3React()
  const zooKeeper = useZooKeeper()

  let sellAnimal: Animal = {
    owner: '',
    kind: -1,
    tokenID: -1,
    name: '',
    description: '',
    boost: -1,
    yield: -1,
    rarity: '',
    imageUrl: '',
    dob: -1,
    listed: false,
  }

  // const Confirmation: React.FC<SubAnimalCommonProps> = ({ onDismiss = () => null, breed }) => {
  //   const animal1 = array[0]
  //   const animal2 = array[1]
  //   const cancel = () => {
  //     console.log()
  //     animal1.selected = false
  //     animal2.selected = false
  //     dispatch(addAnimal(animal1))
  //     dispatch(addAnimal(animal2))
  //     onDismiss()
  //   }

  //   return (
  //     <Modal title='Confirm Breed' onDismiss={onDismiss}>
  //       <StyledText color='text'>{`Do you want to breed ${animal1.name} with ${animal2.name}?`}</StyledText>
  //       <Flex style={{ marginTop: 15 }} width='100%' alignItems='center' justifyContent='space-around'>
  //         <BorderButton scale='sm' onClick={() => breed(onDismiss)}>
  //           YES
  //         </BorderButton>
  //         <BorderButton scale='sm' onClick={cancel}>
  //           NO
  //         </BorderButton>
  //       </Flex>
  //     </Modal>
  //   )
  // }

  // const sell = async (onDismiss) => {
  //   const animal: Animal = sellAnimal
  //   const animalObject = Moralis.Object.extend('Animals')
  //   const query = new Moralis.Query(animalObject)
  //   query.equalTo('tokenID', animal.tokenID)
  //   const results = await query.find()
  //   const animalM = results[0]
  //   animalM.set('listed', true)
  //   animalM.set('startBid', String(bid.current))
  //   animalM.set('currentBid', String(bid.current - 1))
  //   animalM.set('buyNow', String(bid.current + 100))
  //   await animalM.save()
  //   // animal.listed = true;
  //   // dispatch(addAnimal(animal));
  //   bid.current = 100

  //   onDismiss()
  // }

  // const SellConfirm: React.FC<SubAnimalCommonProps> = ({ onDismiss = () => null }) => {
  //   return (
  //     <Modal title='Confirm Listing' onDismiss={onDismiss}>
  //       <StyledText style={{ textAlign: 'center' }}>{`Do you want to list ${sellAnimal.name}?`}</StyledText>
  //       <Flex width='100%' alignItems='center' justifyContent='space-evenly' flexDirection='row' mt='16px'>
  //         <StyledText fontSize='18px' style={{ whiteSpace: 'nowrap', marginTop: '5px' }}>
  //           LIST PRICE (ZOO)
  //         </StyledText>
  //         <BidPriceInput type='number' style={{ color: 'black' }} />
  //       </Flex>
  //       <Flex width='100%' alignItems='center' justifyContent='space-evenly' flexDirection='row' mt='16px'>
  //         <BorderButton style={{ fontSize: 14 }} scale='md' onClick={() => sell(onDismiss)}>
  //           Confirm
  //         </BorderButton>
  //         <BorderButton style={{ fontSize: 14 }} scale='md' onClick={() => onDismiss()}>
  //           Cancel
  //         </BorderButton>
  //       </Flex>
  //     </Modal>
  //   )
  // }

  // const [onSell] = useModal(<SellConfirm onDismiss={() => null} breed={sell} />)

  const breed = async (onDismiss) => {
    var an1 = parseInt(array[0].tokenID)
    var an2 = parseInt(array[1].tokenID)
    const isBreedingStackedAnimal = an1 === an2

    if (an1 === an2) {
      an2 = animalGroup[array[0].name][0].tokenID
    }

    const anOb = Moralis.Object.extend('Animals')
    const anQ1 = new Moralis.Query(anOb)
    const anQ2 = new Moralis.Query(anOb)
    anQ1.equalTo('tokenID', an1)
    anQ2.equalTo('tokenID', an2)
    const res1 = await anQ1.find()
    const res2 = await anQ2.find()
    const aniM1 = res1[0]
    const aniM2 = res2[0]
    const mArray = [aniM1, aniM2]

    onDismiss()

    try {
      await zooKeeper.methods
        .breedAnimals(1, an1, an2)
        .send({ from: account })
        .then((res) => {
          console.log(res)
          const TransOb = Moralis.Object.extend('Transactions')
          const newTrans = new TransOb()

          // //
          // // Get next timestamp token can be bred
          // function breedNext(uint256 tokenID) public view returns (uint256) {
          //     IZoo.Token memory token = tokens[tokenID];
          //     return token.breed.timestamp + (token.breed.count * 1 days);
          // }

          // // Check whether token is ready to breed again
          // function breedReady(uint256 tokenID) public view returns (bool) {
          //     // Never bred? Lets go
          //     if (tokens[tokenID].breed.count == 0) {
          //         return true;
          //     }
          //     // If current timestamp is greater than the next breed time, lets go
          //     if (block.timestamp > breedNext(tokenID)) {
          //         return true;
          //     }

          //     // Not ready
          //     return false;
          // }

          newTrans.set('from', account)
          newTrans.set('action', 'Bred Animals')
          // newTrans.set('tokenID', parseInt(egg.tokenID));
          newTrans.set('parentA', aniM1.attributes.Name)
          newTrans.set('parentB', aniM2.attributes.Name)
          newTrans.save()

          // breed.count

          dispatch(addAnimal({ ...array[0], selected: false }))
          dispatch(addAnimal({ ...array[1], selected: false }))
          onDismiss()
        })
    } catch (error) {
      console.log(error)
    }
  }

  const list = (animal: Animal) => {
    sellAnimal = { ...animal }
    // onSell()
  }

  // const [onConfirm] = useModal(<BreedConfirmationModal breed={(arrayValues) => breed(() => null)} />)

  const onCardClick = () => console.log('animal', animal)

  const zoo_location = {
    pathname: `/feed/myzoo/${animal.tokenID}`,
    state: {
      tokenID: animal.tokenID,
    },
  }

  return (
    <Card
      rarityColor={animal.rarityColor}
      onClick={onCardClick}
      key={animal.id}
      selected={animal.selected ? true : false}
      timedOut={animal.timeRemaining > 0 ? true : false}
      style={{ height: '95%', width: 130 }}>
      <CardBody
        style={{
          backgroundImage: `url('${animal.imageUrl}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: ' 100%',
          width: '100%',
        }}>
        <Link to={zoo_location}>
          <TextWrapper
            style={{
              textShadow: '0px 2px 6px rgb(0, 0, 0)',
              fontSize: 16,
              position: 'absolute',
              textTransform: 'lowercase',
              right: 11,
              top: 9,
            }}>
            {animal.timeRemaining <= 0 ? (animalGroup[animal.name] && animalGroup[animal.name].length > 0 ? `x${animalGroup[animal.name].length + 1}` : '') : ''}
          </TextWrapper>
          <TextWrapper
            style={{
              textShadow: '0px 2px 6px rgb(0, 0, 0)',
              textAlign: 'center',
              fontSize: 16,
              letterSpacing: 0,
              height: '100%',
            }}>
            {animal.name}
          </TextWrapper>
        </Link>
        {animal.timeRemaining > 0 ? (
          <TimeoutWrapper barwidth={animal.CTAOverride ? animal.CTAOverride.barwidth : 0}>
            <TimeoutDisplay>{`${animal.CTAOverride.timeRemainingDaysHours.days}D ${animal.CTAOverride.timeRemainingDaysHours.hours}H`}</TimeoutDisplay>
          </TimeoutWrapper>
        ) : (
          <InfoBlock onClick={() => (hybrid === 'pure' ? breedClick(animal) : !animal.listed ? list(animal) : null)}>
            <BreedWrapper>{animal.bloodline === 'pure' ? `BREED` : animal.listed ? 'LISTED' : `SELL`}</BreedWrapper>
          </InfoBlock>
        )}
      </CardBody>
    </Card>
  )
}
