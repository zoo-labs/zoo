import { CloseIcon, Flex, IconButton, Label } from 'components'
import useTheme from 'hooks/useTheme'
import React from 'react'
import Sheet from 'react-modal-sheet'
import styled, { keyframes } from 'styled-components'
import { height } from 'styled-system'

interface Props {
  onDismiss?: () => null
  header?: string
  height?: string
}

const HeaderOutline = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.borderColor}`};
  margin-bottom: 16px;
`

const animatebottom = (height) => keyframes`
   from {
     bottom: -${height};
   }

   to {
     bottom: 0;
   }
`

const animateup = (height) => keyframes`
   from {
      bottom: 0;
   }

   to {
      bottom: -${height};
   }
`

const CustomSheet = styled(Sheet)<{ ismodalopen?: boolean; height: string }>`
  position: relative;
  animation: ${(props) => (props.ismodalopen ? animatebottom(props.height) : animateup(props.height))} 0.45s;
`

const BottomModal: React.FC<Props> = ({ children, header, onDismiss, height }) => {
  const [isOpen, setOpen] = React.useState(true)
  const [ismodalopen, setIsModalOpen] = React.useState(true)
  const theme = useTheme()

  const onClose = () => {
    setIsModalOpen(false)
    setTimeout(function () {
      setOpen(false)
      onDismiss()
    }, 400)
  }

  return (
    <>
      <CustomSheet isOpen={isOpen} onClose={onClose} ismodalopen={ismodalopen} height={height}>
        <Sheet.Container
          style={{
            width: '90vw',
            left: '5vw',
            overflow: 'hidden',
            height: height ? height : '320px',
            background: theme.isDark ? '#000000' : '#FFFFFF',
          }}>
          {/* <Sheet.Header /> */}
          <Sheet.Header>
            <HeaderOutline>
              <Label mt='16px' mb='16px' textTransform='uppercase' textAlign='center' fontSize='20px' fontWeight='550'>
                {header}
              </Label>
            </HeaderOutline>
            <IconButton onClick={onClose} style={{ position: 'absolute', background: 'white', width: '32px', top: '12px', right: '12px' }}>
              <CloseIcon />
            </IconButton>
          </Sheet.Header>
          <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop onTap={onClose} />
      </CustomSheet>
    </>
  )
}
export default BottomModal
