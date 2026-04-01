import { useState } from 'react'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { ethers } from 'ethers'
import { styled } from '../../stitches.config'
import { Button } from '../primitives'
import CrowdfundFactoryABI from '../../abi/CrowdfundFactory.json'

const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_CROWDFUND_FACTORY_ADDRESS || ''

const Overlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
})

const Modal = styled('div', {
  background: '$gray1',
  borderRadius: '16px',
  width: '90%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflow: 'auto',
  padding: '2rem',
})

const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
})

const Title = styled('h2', {
  fontSize: '1.75rem',
  fontWeight: 'bold',
  color: '$gray12',
})

const CloseButton = styled('button', {
  background: 'transparent',
  border: 'none',
  fontSize: '1.5rem',
  color: '$gray11',
  cursor: 'pointer',
  padding: '0.5rem',
  
  '&:hover': {
    color: '$gray12',
  },
})

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

const Label = styled('label', {
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '$gray11',
})

const Input = styled('input', {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid $gray6',
  background: '$gray2',
  color: '$gray12',
  fontSize: '1rem',
  
  '&:focus': {
    outline: 'none',
    borderColor: '$primary9',
  },
})

const Textarea = styled('textarea', {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid $gray6',
  background: '$gray2',
  color: '$gray12',
  fontSize: '1rem',
  minHeight: '120px',
  resize: 'vertical',
  
  '&:focus': {
    outline: 'none',
    borderColor: '$primary9',
  },
})

const Select = styled('select', {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid $gray6',
  background: '$gray2',
  color: '$gray12',
  fontSize: '1rem',
  cursor: 'pointer',
  
  '&:focus': {
    outline: 'none',
    borderColor: '$primary9',
  },
})

const Row = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
})

const ButtonGroup = styled('div', {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'flex-end',
  marginTop: '1rem',
})

const ErrorMessage = styled('div', {
  color: '$red11',
  fontSize: '0.875rem',
  marginTop: '0.5rem',
})

interface CreateProjectModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function CreateProjectModal({ onClose, onSuccess }: CreateProjectModalProps) {
  const { address } = useAccount()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: 'DEFI',
    fundingGoal: '',
    duration: '30',
    imageUrl: '',
    website: '',
    twitter: '',
    discord: '',
  })

  const deadline = Math.floor(Date.now() / 1000) + parseInt(formData.duration) * 24 * 60 * 60

  const { config } = usePrepareContractWrite({
    address: FACTORY_ADDRESS as `0x${string}`,
    abi: CrowdfundFactoryABI,
    functionName: 'createProject',
    args: [
      formData.name,
      formData.slug,
      formData.description,
      ethers.utils.parseEther(formData.fundingGoal || '0'),
      deadline,
      '', // IPFS hash - would be uploaded separately
    ],
    enabled: Boolean(
      formData.name &&
      formData.slug &&
      formData.description &&
      formData.fundingGoal &&
      parseFloat(formData.fundingGoal) > 0
    ),
  })

  const { write } = useContractWrite({
    ...config,
    onSuccess: () => {
      onSuccess()
    },
    onError: (error) => {
      setError(error.message)
      setLoading(false)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Validate form
    if (!formData.name || !formData.slug || !formData.description) {
      setError('Please fill in all required fields')
      return
    }
    
    if (parseFloat(formData.fundingGoal) <= 0) {
      setError('Funding goal must be greater than 0')
      return
    }
    
    if (parseInt(formData.duration) < 1) {
      setError('Duration must be at least 1 day')
      return
    }
    
    setLoading(true)
    
    try {
      // Upload metadata to IPFS (mock for now)
      const metadata = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        imageUrl: formData.imageUrl,
        website: formData.website,
        twitter: formData.twitter,
        discord: formData.discord,
        createdAt: Date.now(),
        creator: address,
      }
      
      // In production, upload to IPFS and get hash
      // const ipfsHash = await uploadToIPFS(metadata)
      
      // Create project on blockchain
      if (write) {
        write()
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create project')
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Launch Your Project</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Project Name *</Label>
            <Input
              type="text"
              placeholder="My Amazing Project"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>URL Slug *</Label>
            <Input
              type="text"
              placeholder="my-amazing-project"
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Description *</Label>
            <Textarea
              placeholder="Describe your project and what makes it unique..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
            />
          </FormGroup>
          
          <Row>
            <FormGroup>
              <Label>Category *</Label>
              <Select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="DEFI">DeFi</option>
                <option value="NFT">NFT</option>
                <option value="GAMING">Gaming</option>
                <option value="INFRASTRUCTURE">Infrastructure</option>
                <option value="SOCIAL">Social</option>
                <option value="DAO_TOOLING">DAO Tooling</option>
                <option value="RESEARCH">Research</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Funding Goal (ETH) *</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="10"
                value={formData.fundingGoal}
                onChange={(e) => handleChange('fundingGoal', e.target.value)}
                required
              />
            </FormGroup>
          </Row>
          
          <FormGroup>
            <Label>Campaign Duration (days) *</Label>
            <Input
              type="number"
              min="1"
              max="365"
              placeholder="30"
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Project Image URL</Label>
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={(e) => handleChange('imageUrl', e.target.value)}
            />
          </FormGroup>
          
          <Row>
            <FormGroup>
              <Label>Website</Label>
              <Input
                type="url"
                placeholder="https://myproject.com"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Twitter</Label>
              <Input
                type="text"
                placeholder="@myproject"
                value={formData.twitter}
                onChange={(e) => handleChange('twitter', e.target.value)}
              />
            </FormGroup>
          </Row>
          
          <FormGroup>
            <Label>Discord</Label>
            <Input
              type="url"
              placeholder="https://discord.gg/..."
              value={formData.discord}
              onChange={(e) => handleChange('discord', e.target.value)}
            />
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <ButtonGroup>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !write}
              css={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}
            >
              {loading ? 'Creating...' : 'Launch Project'}
            </Button>
          </ButtonGroup>
        </Form>
      </Modal>
    </Overlay>
  )
}