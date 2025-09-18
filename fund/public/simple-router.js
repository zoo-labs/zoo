// Simple router with comprehensive app functionality
(function() {
  // Global state
  window.walletConnected = false;
  window.userAddress = null;

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    console.log('Router initializing...');
    
    const path = window.location.pathname;
    
    // Handle governance page
    if (path === '/governance') {
      window.location.href = '/governance.html';
      return;
    }
    
    // Setup wallet functionality
    setupWallet();
    
    // Setup global functions for buttons
    setupGlobalFunctions();
    
    // Setup modal handlers
    setupModals();
    
    // Determine if we should show a specific project
    const projectPaths = {
      '/ocean': 'ocean-dao',
      '/neuro': 'neuro-dao',
      '/longevity': 'longevity-dao',
      '/climate': 'climate-dao',
      '/quantum': 'quantum-dao',
      '/fusion': 'fusion-dao',
      '/space': 'space-dao',
      '/aisafety': 'ai-safety-dao'
    };
    
    const projectId = projectPaths[path];
    
    // Get elements
    const gridView = document.getElementById('projects-grid');
    const singleView = document.getElementById('single-project');
    
    if (path === '/' || !projectId) {
      // Show all projects
      console.log('Showing all projects');
      if (gridView) {
        gridView.style.display = 'block';
        loadAllProjects(gridView);
      }
      if (singleView) {
        singleView.style.display = 'none';
      }
    } else {
      // Show single project
      console.log('Showing single project:', projectId);
      if (gridView) {
        gridView.style.display = 'none';
      }
      if (singleView) {
        singleView.style.display = 'block';
        loadSingleProject(projectId);
      }
    }
  }
  
  function setupWallet() {
    // Connect wallet function
    window.connectWallet = async function() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          window.walletConnected = true;
          window.userAddress = accounts[0];
          updateWalletDisplay();
        } catch (error) {
          console.error('Failed to connect wallet:', error);
          alert('Failed to connect wallet. Please try again.');
        }
      } else {
        alert('Please install MetaMask to use this feature');
      }
    };

    // Update wallet display
    function updateWalletDisplay() {
      const walletBtn = document.getElementById('walletBtn');
      if (walletBtn && window.walletConnected && window.userAddress) {
        const shortAddress = window.userAddress.substring(0, 6) + '...' + 
                           window.userAddress.substring(window.userAddress.length - 6);
        walletBtn.textContent = shortAddress;
        walletBtn.onclick = null; // Remove click handler once connected
      }
    }

    // Check if already connected
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        if (accounts.length > 0) {
          window.walletConnected = true;
          window.userAddress = accounts[0];
          updateWalletDisplay();
        }
      }).catch(err => console.log('Error checking accounts:', err));
    }
  }
  
  function setupGlobalFunctions() {
    // Create Project function
    window.createProject = function() {
      console.log('Create project clicked');
      if (!window.walletConnected) {
        alert('Please connect your wallet first');
        return;
      }
      const modal = document.getElementById('createProjectModal');
      if (modal) {
        modal.classList.add('active');
      }
    };

    // Submit Proposal function
    window.submitProposal = function() {
      console.log('Submit proposal clicked');
      if (!window.walletConnected) {
        alert('Please connect your wallet first');
        return;
      }
      const modal = document.getElementById('submitProposalModal');
      if (modal) {
        modal.classList.add('active');
      }
    };

    // Fund project function
    window.fundProject = function(projectId) {
      if (!window.walletConnected) {
        alert('Please connect your wallet first');
        return;
      }
      const amount = prompt('Enter amount to fund (in USD):');
      if (amount && !isNaN(amount)) {
        alert(`Transaction initiated: Funding ${projectId} with $${amount}`);
      }
    };

    // Vote functions for governance
    window.voteFor = function(proposalId) {
      if (!window.walletConnected) {
        alert('Please connect your wallet first');
        return;
      }
      alert(`Vote cast: For proposal ${proposalId}`);
    };

    window.voteAgainst = function(proposalId) {
      if (!window.walletConnected) {
        alert('Please connect your wallet first');
        return;
      }
      alert(`Vote cast: Against proposal ${proposalId}`);
    };

    // Tab switching function
    window.showTab = function(tabName) {
      // Hide all tab contents
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Remove active from all tabs
      document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
      });
      
      // Show selected tab content
      const selectedContent = document.getElementById(tabName);
      if (selectedContent) {
        selectedContent.classList.add('active');
      }
      
      // Add active to selected tab
      const selectedTab = document.querySelector(`.tab[onclick*="${tabName}"]`);
      if (selectedTab) {
        selectedTab.classList.add('active');
      }
    };
  }
  
  function setupModals() {
    // Setup modal close buttons
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', function() {
        this.closest('.modal').classList.remove('active');
      });
    });

    // Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          this.classList.remove('active');
        }
      });
    });

    // Handle Create Project form submission
    const createProjectForm = document.getElementById('createProjectForm');
    if (createProjectForm) {
      createProjectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Project creation request submitted. Pending DAO approval.');
        document.getElementById('createProjectModal').classList.remove('active');
        this.reset();
      });
    }

    // Handle Submit Proposal form submission
    const submitProposalForm = document.getElementById('submitProposalForm');
    if (submitProposalForm) {
      submitProposalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Proposal submitted successfully. Voting period begins now.');
        document.getElementById('submitProposalModal').classList.remove('active');
        this.reset();
      });
    }
  }
  
  function loadAllProjects(container) {
    console.log('Loading all projects...');
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => {
        console.log('Projects data loaded:', data.projects.length, 'projects');
        container.innerHTML = `
          <div style="max-width: 1200px; margin: 0 auto; padding: 60px 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 48px;">
              <div>
                <h1 style="font-size: 48px; font-weight: 900; margin-bottom: 16px;">
                  Decentralized Science Funding
                </h1>
                <p style="font-size: 20px; color: rgba(255, 255, 255, 0.7);">
                  Fund breakthrough research through community-driven DAOs
                </p>
              </div>
              <div style="display: flex; gap: 16px;">
                <button onclick="window.createProject && window.createProject()" style="
                  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  border: none;
                  padding: 12px 24px;
                  border-radius: 8px;
                  font-weight: 600;
                  font-size: 16px;
                  cursor: pointer;
                ">Create Project</button>
                <button onclick="window.submitProposal && window.submitProposal()" style="
                  background: transparent;
                  color: white;
                  border: 2px solid rgba(255, 255, 255, 0.2);
                  padding: 12px 24px;
                  border-radius: 8px;
                  font-weight: 600;
                  font-size: 16px;
                  cursor: pointer;
                ">Submit Proposal</button>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 32px;">
              ${data.projects.map(project => `
                <a href="/${project.id.replace('-dao', '')}" style="text-decoration: none; color: inherit;">
                  <div style="
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                    padding: 32px;
                    transition: all 0.3s;
                    cursor: pointer;
                    height: 100%;
                  " onmouseover="this.style.background='rgba(255, 255, 255, 0.05)'" onmouseout="this.style.background='rgba(255, 255, 255, 0.03)'">
                    <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 12px;">
                      ${project.name}
                    </h3>
                    <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 24px; font-size: 14px;">
                      ${project.tagline}
                    </p>
                    <div style="margin-bottom: 16px;">
                      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="font-size: 18px; font-weight: 600;">
                          $${(project.fundingRaised || 0).toLocaleString()}
                        </span>
                        <span style="color: rgba(255, 255, 255, 0.6); font-size: 14px;">
                          ${project.percentFunded || 0}%
                        </span>
                      </div>
                      <div style="
                        width: 100%;
                        height: 6px;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 3px;
                        overflow: hidden;
                      ">
                        <div style="
                          width: ${project.percentFunded || 0}%;
                          height: 100%;
                          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                        "></div>
                      </div>
                      <div style="
                        display: flex;
                        justify-content: space-between;
                        margin-top: 8px;
                        font-size: 12px;
                        color: rgba(255, 255, 255, 0.5);
                      ">
                        <span>Goal: $${(project.fundingGoal || 0).toLocaleString()}</span>
                        <span>${project.status || 'active'}</span>
                      </div>
                    </div>
                    <div style="
                      padding-top: 16px;
                      border-top: 1px solid rgba(255, 255, 255, 0.05);
                      font-size: 14px;
                      color: #667eea;
                    ">
                      View Project →
                    </div>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>
        `;
        console.log('Projects grid rendered');
      })
      .catch(err => {
        console.error('Error loading projects:', err);
        container.innerHTML = '<div style="text-align: center; padding: 60px;">Error loading projects. Please refresh the page.</div>';
      });
  }
  
  function loadSingleProject(projectId) {
    console.log('Loading single project:', projectId);
    fetch('/data/projects.json')
      .then(res => res.json())
      .then(data => {
        const project = data.projects.find(p => p.id === projectId);
        if (project) {
          console.log('Project found:', project.name);
          updateProjectDisplay(project);
        } else {
          console.log('Project not found, redirecting to home');
          // Project not found, redirect to home
          window.location.href = '/';
        }
      })
      .catch(err => {
        console.error('Error loading project:', err);
        window.location.href = '/';
      });
  }
  
  function updateProjectDisplay(project) {
    // Update title
    document.title = `${project.name} - Zoo Fund`;
    
    // Update all project data elements
    document.querySelectorAll('[data-project="name"]').forEach(el => {
      el.textContent = project.name;
    });
    
    document.querySelectorAll('[data-project="tagline"]').forEach(el => {
      el.textContent = project.tagline;
    });
    
    document.querySelectorAll('[data-project="description"]').forEach(el => {
      el.textContent = project.description;
    });
    
    document.querySelectorAll('[data-project="funding-raised"]').forEach(el => {
      el.textContent = `$${(project.fundingRaised || 0).toLocaleString()}`;
    });
    
    document.querySelectorAll('[data-project="funding-goal"]').forEach(el => {
      el.textContent = `$${(project.fundingGoal || 0).toLocaleString()}`;
    });
    
    document.querySelectorAll('[data-project="percent-funded"]').forEach(el => {
      el.textContent = `${project.percentFunded || 0}%`;
    });
    
    document.querySelectorAll('[data-project="progress-bar"]').forEach(el => {
      el.style.width = `${project.percentFunded || 0}%`;
    });
  }
})();