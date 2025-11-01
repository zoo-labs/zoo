import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import { ethers } from 'ethers'
import Layout from '../../../components/Layout'
import ContributeModal from '../../../components/crowdfund/ContributeModal'
import MilestoneCard from '../../../components/crowdfund/MilestoneCard'
import ContributorsList from '../../../components/crowdfund/ContributorsList'
import { styled } from '../../../stitches.config'
import { Button } from '../../../components/primitives'
import CrowdfundProjectABI from '../../../abi/CrowdfundProject.json'

const Container = styled('div', {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
})

const Header = styled('div', {
  marginBottom: '3rem',
})

const BackButton = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',
  marginBottom: '1rem',
  background: 'transparent',
  border: '1px solid $gray6',
  borderRadius: '8px',
  color: '$gray11',
  cursor: 'pointer',
  transition: 'all 0.2s',
  
  '&:hover': {
    background: '$gray2',
    borderColor: '$gray7',
  },
})

const ProjectHeader = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  gap: '3rem',
  marginBottom: '3rem',
  
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

const ProjectInfo = styled('div', {})

const Title = styled('h1', {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: '$gray12',
})

const Category = styled('span', {
  display: 'inline-block',
  padding: '0.25rem 0.75rem',
  background: '$primary3',
  color: '$primary11',
  borderRadius: '20px',
  fontSize: '0.875rem',
  fontWeight: '500',
  marginBottom: '1rem',
})

const Description = styled('p', {
  fontSize: '1.125rem',
  color: '$gray11',
  lineHeight: '1.75',
  marginBottom: '2rem',
})

const CreatorInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  background: '$gray2',
  borderRadius: '12px',
  marginBottom: '2rem',
})

const CreatorAvatar = styled('div', {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
})

const CreatorDetails = styled('div', {})

const CreatorLabel = styled('div', {
  fontSize: '0.875rem',
  color: '$gray11',
})

const CreatorAddress = styled('div', {
  fontSize: '1rem',
  fontWeight: '500',
  color: '$gray12',
})

const FundingCard = styled('div', {
  background: '$gray2',
  borderRadius: '16px',
  padding: '2rem',
  border: '1px solid $gray6',
})

const FundingProgress = styled('div', {
  marginBottom: '2rem',
})

const ProgressBar = styled('div', {
  width: '100%',
  height: '12px',
  background: '$gray5',
  borderRadius: '6px',
  overflow: 'hidden',
  marginBottom: '1rem',
})

const ProgressFill = styled('div', {
  height: '100%',
  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '6px',
  transition: 'width 0.3s',
})

const FundingStats = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '2rem',
})

const FundingStat = styled('div', {})

const StatValue = styled('div', {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '$gray12',
})

const StatLabel = styled('div', {
  fontSize: '0.875rem',
  color: '$gray11',
  marginTop: '0.25rem',
})

const TimeRemaining = styled('div', {
  padding: '1rem',
  background: '$gray3',
  borderRadius: '8px',
  textAlign: 'center',
  marginBottom: '1.5rem',
})

const Tabs = styled('div', {
  display: 'flex',
  gap: '1rem',
  borderBottom: '1px solid $gray6',
  marginBottom: '2rem',
})

const Tab = styled('button', {
  padding: '1rem',
  background: 'transparent',
  border: 'none',
  color: '$gray11',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  position: 'relative',
  transition: 'color 0.2s',
  
  '&:hover': {
    color: '$gray12',
  },
  
  variants: {
    active: {
      true: {
        color: '$primary11',
        
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-1px',
          left: 0,
          right: 0,
          height: '2px',
          background: '$primary9',
        },
      },
    },
  },
})

const TabContent = styled('div', {
  minHeight: '400px',
})

const SocialLinks = styled('div', {
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
})

const SocialLink = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',
  background: '$gray3',
  borderRadius: '8px',
  color: '$gray11',
  textDecoration: 'none',
  transition: 'all 0.2s',
  
  '&:hover': {
    background: '$gray4',
    color: '$gray12',
  },
})

export default function ProjectDetail() {
  const router = useRouter()
  const { address: projectAddress } = router.query
  const { address: userAddress, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState('overview')
  const [showContributeModal, setShowContributeModal] = useState(false)
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Read project details
  const { data: projectDetails } = useContractRead({
    address: projectAddress as `0x${string}`,
    abi: CrowdfundProjectABI,
    functionName: 'getProjectDetails',
    enabled: !!projectAddress,
  })

  // Read contributor count
  const { data: contributorCount } = useContractRead({
    address: projectAddress as `0x${string}`,
    abi: CrowdfundProjectABI,
    functionName: 'getContributorCount',
    enabled: !!projectAddress,
  })

  // Read milestones
  const { data: milestoneCount } = useContractRead({
    address: projectAddress as `0x${string}`,
    abi: CrowdfundProjectABI,
    functionName: 'getMilestoneCount',
    enabled: !!projectAddress,
  })

  useEffect(() => {
    if (projectDetails) {
      const [name, description, creator, fundingGoal, deadline, totalRaised, fundingComplete, projectCancelled] = projectDetails as any
      
      setProject({
        address: projectAddress,
        name,
        description,
        creator,
        fundingGoal,
        deadline: deadline.toNumber() * 1000,
        totalRaised,
        fundingComplete,
        projectCancelled,
        contributorCount: contributorCount?.toNumber() || 0,
        milestoneCount: milestoneCount?.toNumber() || 0,
      })
      setLoading(false)
    }
  }, [projectDetails, contributorCount, milestoneCount, projectAddress])

  useEffect(() => {
    if (router.query.contribute === 'true' && isConnected) {
      setShowContributeModal(true)
    }
  }, [router.query, isConnected])

  if (loading) {
    return (
      <Layout>
        <Container>
          <div>Loading project details...</div>
        </Container>
      </Layout>
    )
  }

  if (!project) {
    return (
      <Layout>
        <Container>
          <div>Project not found</div>
        </Container>
      </Layout>
    )
  }

  const progress = project.totalRaised
    .mul(100)
    .div(project.fundingGoal)
    .toNumber()

  const daysLeft = Math.max(
    0,
    Math.floor((project.deadline - Date.now()) / (1000 * 60 * 60 * 24))
  )

  const isActive = Date.now() < project.deadline && !project.projectCancelled

  return (
    <Layout>
      <Container>
        <Header>
          <BackButton onClick={() => router.push('/crowdfund')}>
            ← Back to Projects
          </BackButton>
        </Header>

        <ProjectHeader>
          <ProjectInfo>
            <Category>DeFi</Category>
            <Title>{project.name}</Title>
            <Description>{project.description}</Description>
            
            <CreatorInfo>
              <CreatorAvatar />
              <CreatorDetails>
                <CreatorLabel>Created by</CreatorLabel>
                <CreatorAddress>
                  {project.creator.slice(0, 6)}...{project.creator.slice(-4)}
                </CreatorAddress>
              </CreatorDetails>
            </CreatorInfo>

            <SocialLinks>
              <SocialLink href="#" target="_blank">
                🌐 Website
              </SocialLink>
              <SocialLink href="#" target="_blank">
                🐦 Twitter
              </SocialLink>
              <SocialLink href="#" target="_blank">
                💬 Discord
              </SocialLink>
            </SocialLinks>
          </ProjectInfo>

          <FundingCard>
            <FundingProgress>
              <ProgressBar>
                <ProgressFill css={{ width: `${Math.min(progress, 100)}%` }} />
              </ProgressBar>
              <FundingStats>
                <FundingStat>
                  <StatValue>
                    {ethers.utils.formatEther(project.totalRaised)} ETH
                  </StatValue>
                  <StatLabel>
                    raised of {ethers.utils.formatEther(project.fundingGoal)} goal
                  </StatLabel>
                </FundingStat>
                <FundingStat>
                  <StatValue>{progress}%</StatValue>
                  <StatLabel>funded</StatLabel>
                </FundingStat>
              </FundingStats>
            </FundingProgress>

            <TimeRemaining>
              {isActive ? (
                <>
                  <StatValue>{daysLeft}</StatValue>
                  <StatLabel>{daysLeft === 1 ? 'day' : 'days'} remaining</StatLabel>
                </>
              ) : project.fundingComplete ? (
                <StatLabel>Funding complete!</StatLabel>
              ) : project.projectCancelled ? (
                <StatLabel>Project cancelled</StatLabel>
              ) : (
                <StatLabel>Funding ended</StatLabel>
              )}
            </TimeRemaining>

            <FundingStat css={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <StatValue>{project.contributorCount}</StatValue>
              <StatLabel>backers</StatLabel>
            </FundingStat>

            {isActive && (
              <Button
                size="large"
                onClick={() => setShowContributeModal(true)}
                disabled={!isConnected}
                css={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {isConnected ? 'Back this project' : 'Connect wallet to contribute'}
              </Button>
            )}

            {!isActive && !project.fundingComplete && (
              <Button
                size="large"
                disabled
                css={{
                  width: '100%',
                  opacity: 0.5,
                }}
              >
                Funding period ended
              </Button>
            )}
          </FundingCard>
        </ProjectHeader>

        <Tabs>
          <Tab
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Tab>
          <Tab
            active={activeTab === 'milestones'}
            onClick={() => setActiveTab('milestones')}
          >
            Milestones ({project.milestoneCount})
          </Tab>
          <Tab
            active={activeTab === 'contributors'}
            onClick={() => setActiveTab('contributors')}
          >
            Contributors ({project.contributorCount})
          </Tab>
          <Tab
            active={activeTab === 'updates'}
            onClick={() => setActiveTab('updates')}
          >
            Updates
          </Tab>
        </Tabs>

        <TabContent>
          {activeTab === 'overview' && (
            <div>
              <h3>About this project</h3>
              <p>{project.description}</p>
              {/* Add more project details, roadmap, team info etc */}
            </div>
          )}
          
          {activeTab === 'milestones' && (
            <MilestoneCard projectAddress={projectAddress as string} />
          )}
          
          {activeTab === 'contributors' && (
            <ContributorsList projectAddress={projectAddress as string} />
          )}
          
          {activeTab === 'updates' && (
            <div>
              <p>No updates yet</p>
            </div>
          )}
        </TabContent>

        {showContributeModal && (
          <ContributeModal
            project={project}
            onClose={() => setShowContributeModal(false)}
            onSuccess={() => {
              setShowContributeModal(false)
              // Refresh project data
              router.reload()
            }}
          />
        )}
      </Container>
    </Layout>
  )
}