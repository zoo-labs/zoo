/**
 * Page Selectors
 * Common CSS/XPath selectors for Zoo dApps
 */

/**
 * Common UI Elements
 */
export const COMMON = {
  // Headers & Navigation
  header: 'header',
  logo: '[data-testid="logo"]',
  nav: 'nav',
  menuButton: '[data-testid="menu-button"]',

  // Wallet Connection
  connectWalletButton: 'button:has-text("Connect Wallet")',
  walletAddress: '[data-testid="wallet-address"]',
  disconnectButton: 'button:has-text("Disconnect")',

  // Forms
  input: 'input',
  button: 'button',
  submitButton: 'button[type="submit"]',
  cancelButton: 'button:has-text("Cancel")',

  // Modals
  modal: '[role="dialog"]',
  modalClose: '[aria-label="Close"]',
  modalTitle: '[data-testid="modal-title"]',

  // Notifications
  notification: '[data-testid="notification"]',
  successNotification: '[data-testid="notification-success"]',
  errorNotification: '[data-testid="notification-error"]',

  // Loading States
  loader: '[data-testid="loader"]',
  skeleton: '[data-testid="skeleton"]',
};

/**
 * Zoo AI (localhost:3000)
 */
export const ZOO_AI = {
  // Home Page
  hero: '[data-testid="hero"]',
  heroTitle: 'h1',
  heroDescription: '[data-testid="hero-description"]',

  // Model Selection
  modelSelector: '[data-testid="model-selector"]',
  modelOption: (modelName: string) => `[data-model="${modelName}"]`,

  // Chat Interface
  chatInput: '[data-testid="chat-input"]',
  sendButton: '[data-testid="send-button"]',
  chatMessage: '[data-testid="chat-message"]',
  messageUser: '[data-testid="message-user"]',
  messageAssistant: '[data-testid="message-assistant"]',

  // Model Status
  modelStatus: '[data-testid="model-status"]',
  modelLoading: '[data-testid="model-loading"]',
  modelError: '[data-testid="model-error"]',
};

/**
 * Zoo Foundation (localhost:3002)
 */
export const FOUNDATION = {
  // About Page
  missionSection: '[data-testid="mission"]',
  teamSection: '[data-testid="team"]',
  partnersSection: '[data-testid="partners"]',

  // Team Members
  teamMember: '[data-testid="team-member"]',
  teamMemberName: '[data-testid="team-member-name"]',
  teamMemberRole: '[data-testid="team-member-role"]',

  // Partners
  partnerLogo: '[data-testid="partner-logo"]',
  partnerLink: '[data-testid="partner-link"]',
};

/**
 * Zoo Network (localhost:3003)
 */
export const NETWORK = {
  // Network Stats
  statsSection: '[data-testid="network-stats"]',
  totalNodes: '[data-testid="total-nodes"]',
  activeValidators: '[data-testid="active-validators"]',
  blockHeight: '[data-testid="block-height"]',
  tps: '[data-testid="tps"]',

  // Node Map
  nodeMap: '[data-testid="node-map"]',
  nodeMarker: '[data-testid="node-marker"]',

  // Validator List
  validatorTable: '[data-testid="validator-table"]',
  validatorRow: '[data-testid="validator-row"]',
  validatorAddress: '[data-testid="validator-address"]',
  validatorStake: '[data-testid="validator-stake"]',
};

/**
 * Zoo Vote (localhost:3004)
 */
export const VOTE = {
  // Proposals List
  proposalsList: '[data-testid="proposals-list"]',
  proposalCard: '[data-testid="proposal-card"]',
  proposalTitle: '[data-testid="proposal-title"]',
  proposalStatus: '[data-testid="proposal-status"]',

  // Proposal Details
  proposalDescription: '[data-testid="proposal-description"]',
  proposalVotes: '[data-testid="proposal-votes"]',
  votesFor: '[data-testid="votes-for"]',
  votesAgainst: '[data-testid="votes-against"]',
  votesAbstain: '[data-testid="votes-abstain"]',

  // Voting Actions
  voteForButton: 'button:has-text("Vote For")',
  voteAgainstButton: 'button:has-text("Vote Against")',
  abstainButton: 'button:has-text("Abstain")',

  // Create Proposal
  createProposalButton: 'button:has-text("Create Proposal")',
  proposalTitleInput: 'input[name="title"]',
  proposalDescriptionInput: 'textarea[name="description"]',
  proposalActionsSection: '[data-testid="proposal-actions"]',
  addActionButton: 'button:has-text("Add Action")',
};

/**
 * Zoo Fund (localhost:3005)
 */
export const FUND = {
  // Fund Overview
  fundStats: '[data-testid="fund-stats"]',
  totalValueLocked: '[data-testid="tvl"]',
  totalProjects: '[data-testid="total-projects"]',
  activeGrants: '[data-testid="active-grants"]',

  // Projects
  projectsList: '[data-testid="projects-list"]',
  projectCard: '[data-testid="project-card"]',
  projectName: '[data-testid="project-name"]',
  projectFunding: '[data-testid="project-funding"]',
  projectProgress: '[data-testid="project-progress"]',

  // Apply for Grant
  applyButton: 'button:has-text("Apply for Grant")',
  projectNameInput: 'input[name="projectName"]',
  projectDescriptionInput: 'textarea[name="description"]',
  requestedAmountInput: 'input[name="amount"]',

  // Donate
  donateButton: 'button:has-text("Donate")',
  donationAmountInput: 'input[name="donationAmount"]',
  donateToProject: (projectId: string) => `[data-project-id="${projectId}"] button:has-text("Donate")`,
};

/**
 * Zoo Computer (localhost:3007)
 */
export const COMPUTER = {
  // Compute Dashboard
  computeDashboard: '[data-testid="compute-dashboard"]',
  availableGpu: '[data-testid="available-gpu"]',
  activeJobs: '[data-testid="active-jobs"]',

  // Job Creation
  createJobButton: 'button:has-text("Create Job")',
  jobTypeSelector: '[data-testid="job-type-selector"]',
  jobConfigInput: 'textarea[name="config"]',
  submitJobButton: 'button:has-text("Submit Job")',

  // Job List
  jobsList: '[data-testid="jobs-list"]',
  jobCard: '[data-testid="job-card"]',
  jobStatus: '[data-testid="job-status"]',
  jobProgress: '[data-testid="job-progress"]',

  // GPU Providers
  gpuProvidersList: '[data-testid="gpu-providers"]',
  gpuProviderCard: '[data-testid="gpu-provider-card"]',
  providerName: '[data-testid="provider-name"]',
  providerGpuCount: '[data-testid="provider-gpu-count"]',
  providerPricing: '[data-testid="provider-pricing"]',
};

/**
 * MetaMask Selectors (Browser Extension)
 */
export const METAMASK = {
  notificationWindow: 'div.notification',
  confirmButton: 'button:has-text("Confirm")',
  rejectButton: 'button:has-text("Reject")',
  signButton: 'button:has-text("Sign")',
  nextButton: 'button:has-text("Next")',
  connectButton: 'button:has-text("Connect")',
  approveButton: 'button:has-text("Approve")',

  // Account Selection
  accountList: '[data-testid="account-list"]',
  accountItem: '[data-testid="account-item"]',

  // Transaction Confirmation
  transactionAmount: '[data-testid="transaction-amount"]',
  gasPrice: '[data-testid="gas-price"]',
  totalCost: '[data-testid="total-cost"]',
};

/**
 * Helper function to get testid selector
 */
export function testId(id: string): string {
  return `[data-testid="${id}"]`;
}

/**
 * Helper function to get text content selector
 */
export function hasText(text: string): string {
  return `:has-text("${text}")`;
}

/**
 * Helper function to get attribute selector
 */
export function hasAttr(attr: string, value: string): string {
  return `[${attr}="${value}"]`;
}
