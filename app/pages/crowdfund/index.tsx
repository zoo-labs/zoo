import { useState, useEffect } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { ethers } from 'ethers'
import Layout from '../../components/Layout'
import ProjectCard from '../../components/crowdfund/ProjectCard'
import CreateProjectModal from '../../components/crowdfund/CreateProjectModal'
import { styled } from '../../stitches.config'
import { Button } from '../../components/primitives'
import CrowdfundFactoryABI from '../../abi/CrowdfundFactory.json'

const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_CROWDFUND_FACTORY_ADDRESS || ''

const Container = styled('div', {
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '2rem',
})

const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '3rem',
})

const Title = styled('h1', {
  fontSize: '3rem',
  fontWeight: 'bold',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backgroundClip: 'text',
  color: 'transparent',
})

const Stats = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  marginBottom: '3rem',
})

const StatCard = styled('div', {
  background: '$gray2',
  borderRadius: '12px',
  padding: '1.5rem',
  border: '1px solid $gray6',
})

const StatLabel = styled('div', {
  fontSize: '0.875rem',
  color: '$gray11',
  marginBottom: '0.5rem',
})

const StatValue = styled('div', {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '$gray12',
})

const FilterBar = styled('div', {
  display: 'flex',
  gap: '1rem',
  marginBottom: '2rem',
  flexWrap: 'wrap',
})

const FilterButton = styled('button', {
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  border: '1px solid $gray6',
  background: '$gray2',
  color: '$gray11',
  cursor: 'pointer',
  transition: 'all 0.2s',
  
  '&:hover': {
    background: '$gray3',
    borderColor: '$gray7',
  },
  
  variants: {
    active: {
      true: {
        background: '$primary9',
        color: 'white',
        borderColor: '$primary9',
      },
    },
  },
})

const ProjectGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
  gap: '2rem',
})

const EmptyState = styled('div', {
  textAlign: 'center',
  padding: '4rem 2rem',
  color: '$gray11',
})

export default function Crowdfund() {
  const { address, isConnected } = useAccount()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filter, setFilter] = useState('all')
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalRaised: '0',
    activeProjects: 0,
    totalContributors: 0,
  })

  // Read all projects from factory
  const { data: projectAddresses } = useContractRead({
    address: FACTORY_ADDRESS as `0x${string}`,
    abi: CrowdfundFactoryABI,
    functionName: 'getAllProjects',
  })

  useEffect(() => {
    loadProjects()
  }, [projectAddresses])

  const loadProjects = async () => {
    if (!projectAddresses || !Array.isArray(projectAddresses)) {
      setLoading(false)
      return
    }

    try {
      const projectData = await Promise.all(
        projectAddresses.map(async (address: string) => {
          // Load project data from contract
          // This would need actual contract calls
          return {
            address,
            name: `Project ${address.slice(0, 6)}`,
            description: 'Amazing Web3 project',
            fundingGoal: ethers.utils.parseEther('10'),
            totalRaised: ethers.utils.parseEther('5'),
            deadline: Date.now() + 30 * 24 * 60 * 60 * 1000,
            contributorCount: 25,
            category: 'DeFi',
            imageUrl: '/images/placeholder.jpg',
          }
        })
      )

      setProjects(projectData)
      calculateStats(projectData)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (projectData: any[]) => {
    const totalRaised = projectData.reduce(
      (sum, p) => sum.add(p.totalRaised),
      ethers.BigNumber.from(0)
    )
    const activeProjects = projectData.filter(
      p => Date.now() < p.deadline
    ).length
    const totalContributors = projectData.reduce(
      (sum, p) => sum + p.contributorCount,
      0
    )

    setStats({
      totalProjects: projectData.length,
      totalRaised: ethers.utils.formatEther(totalRaised),
      activeProjects,
      totalContributors,
    })
  }

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    if (filter === 'active') return Date.now() < project.deadline
    if (filter === 'completed') return Date.now() >= project.deadline
    if (filter === 'my-projects') return project.creator === address
    return project.category.toLowerCase() === filter
  })

  return (
    <Layout>
      <Container>
        <Header>
          <div>
            <Title>zoo.fund</Title>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>
              Decentralized crowdfunding for Web3 projects
            </p>
          </div>
          {isConnected && (
            <Button
              size="large"
              onClick={() => setShowCreateModal(true)}
              css={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Launch Project
            </Button>
          )}
        </Header>

        <Stats>
          <StatCard>
            <StatLabel>Total Projects</StatLabel>
            <StatValue>{stats.totalProjects}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Total Raised</StatLabel>
            <StatValue>{parseFloat(stats.totalRaised).toFixed(2)} ETH</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Active Projects</StatLabel>
            <StatValue>{stats.activeProjects}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Total Contributors</StatLabel>
            <StatValue>{stats.totalContributors}</StatValue>
          </StatCard>
        </Stats>

        <FilterBar>
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All Projects
          </FilterButton>
          <FilterButton
            active={filter === 'active'}
            onClick={() => setFilter('active')}
          >
            Active
          </FilterButton>
          <FilterButton
            active={filter === 'completed'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </FilterButton>
          <FilterButton
            active={filter === 'defi'}
            onClick={() => setFilter('defi')}
          >
            DeFi
          </FilterButton>
          <FilterButton
            active={filter === 'nft'}
            onClick={() => setFilter('nft')}
          >
            NFT
          </FilterButton>
          <FilterButton
            active={filter === 'gaming'}
            onClick={() => setFilter('gaming')}
          >
            Gaming
          </FilterButton>
          {isConnected && (
            <FilterButton
              active={filter === 'my-projects'}
              onClick={() => setFilter('my-projects')}
            >
              My Projects
            </FilterButton>
          )}
        </FilterBar>

        {loading ? (
          <EmptyState>Loading projects...</EmptyState>
        ) : filteredProjects.length === 0 ? (
          <EmptyState>
            <h3>No projects found</h3>
            <p>Be the first to launch a project!</p>
          </EmptyState>
        ) : (
          <ProjectGrid>
            {filteredProjects.map(project => (
              <ProjectCard key={project.address} project={project} />
            ))}
          </ProjectGrid>
        )}

        {showCreateModal && (
          <CreateProjectModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              setShowCreateModal(false)
              loadProjects()
            }}
          />
        )}
      </Container>
    </Layout>
  )
}