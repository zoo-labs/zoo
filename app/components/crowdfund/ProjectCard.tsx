import { useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { styled } from '../../stitches.config'
import { Button } from '../primitives'

const Card = styled('div', {
  background: '$gray2',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid $gray6',
  transition: 'all 0.3s',
  cursor: 'pointer',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    borderColor: '$primary9',
  },
})

const ImageContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: '200px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  overflow: 'hidden',
})

const ProjectImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

const CategoryBadge = styled('div', {
  position: 'absolute',
  top: '1rem',
  left: '1rem',
  padding: '0.25rem 0.75rem',
  background: 'rgba(0, 0, 0, 0.7)',
  color: 'white',
  borderRadius: '20px',
  fontSize: '0.875rem',
  fontWeight: '500',
})

const Content = styled('div', {
  padding: '1.5rem',
})

const Title = styled('h3', {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: '$gray12',
})

const Description = styled('p', {
  fontSize: '0.875rem',
  color: '$gray11',
  marginBottom: '1rem',
  lineHeight: '1.5',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

const ProgressContainer = styled('div', {
  marginBottom: '1rem',
})

const ProgressBar = styled('div', {
  width: '100%',
  height: '8px',
  background: '$gray5',
  borderRadius: '4px',
  overflow: 'hidden',
})

const ProgressFill = styled('div', {
  height: '100%',
  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '4px',
  transition: 'width 0.3s',
})

const Stats = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
})

const Stat = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const StatValue = styled('div', {
  fontSize: '1.125rem',
  fontWeight: 'bold',
  color: '$gray12',
})

const StatLabel = styled('div', {
  fontSize: '0.75rem',
  color: '$gray11',
  marginTop: '0.25rem',
})

const Footer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '1rem',
  borderTop: '1px solid $gray6',
})

const TimeLeft = styled('div', {
  fontSize: '0.875rem',
  color: '$gray11',
})

interface ProjectCardProps {
  project: {
    address: string
    name: string
    description: string
    fundingGoal: ethers.BigNumber
    totalRaised: ethers.BigNumber
    deadline: number
    contributorCount: number
    category: string
    imageUrl?: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
  const [imageError, setImageError] = useState(false)

  const progress = project.totalRaised
    .mul(100)
    .div(project.fundingGoal)
    .toNumber()

  const daysLeft = Math.max(
    0,
    Math.floor((project.deadline - Date.now()) / (1000 * 60 * 60 * 24))
  )

  const isActive = Date.now() < project.deadline

  const handleClick = () => {
    router.push(`/crowdfund/project/${project.address}`)
  }

  const handleContribute = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/crowdfund/project/${project.address}?contribute=true`)
  }

  return (
    <Card onClick={handleClick}>
      <ImageContainer>
        {project.imageUrl && !imageError ? (
          <ProjectImage
            src={project.imageUrl}
            alt={project.name}
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: 'rgba(255, 255, 255, 0.3)',
          }}>
            🚀
          </div>
        )}
        <CategoryBadge>{project.category}</CategoryBadge>
      </ImageContainer>
      
      <Content>
        <Title>{project.name}</Title>
        <Description>{project.description}</Description>
        
        <ProgressContainer>
          <ProgressBar>
            <ProgressFill css={{ width: `${Math.min(progress, 100)}%` }} />
          </ProgressBar>
        </ProgressContainer>
        
        <Stats>
          <Stat>
            <StatValue>
              {ethers.utils.formatEther(project.totalRaised)} ETH
            </StatValue>
            <StatLabel>
              raised of {ethers.utils.formatEther(project.fundingGoal)} goal
            </StatLabel>
          </Stat>
          <Stat>
            <StatValue>{progress}%</StatValue>
            <StatLabel>funded</StatLabel>
          </Stat>
          <Stat>
            <StatValue>{project.contributorCount}</StatValue>
            <StatLabel>backers</StatLabel>
          </Stat>
        </Stats>
        
        <Footer>
          <TimeLeft>
            {isActive ? (
              daysLeft > 0 ? `${daysLeft} days left` : 'Ending soon'
            ) : (
              'Ended'
            )}
          </TimeLeft>
          {isActive && (
            <Button
              size="small"
              onClick={handleContribute}
              css={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}
            >
              Contribute
            </Button>
          )}
        </Footer>
      </Content>
    </Card>
  )
}