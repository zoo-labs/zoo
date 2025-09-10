// Dynamic domain-based project loading
(function() {
  // Get current domain
  const domain = window.location.hostname;
  const urlParams = new URLSearchParams(window.location.search);
  const projectParam = urlParams.get('project');
  
  // Domain to project mapping
  const domainMap = {
    'ocean.fund': 'ocean-dao',
    'neuro.fund': 'neuro-dao',
    'longevity.fund': 'longevity-dao',
    'climate.fund': 'climate-dao',
    'quantum.fund': 'quantum-dao',
    'fusion.fund': 'fusion-dao',
    'space.fund': 'space-dao',
    'aisafety.fund': 'ai-safety-dao',
    'zoo.fund': 'ocean-dao', // default
    'localhost': 'ocean-dao' // for local testing
  };
  
  // Determine which project to show
  let projectId = projectParam || domainMap[domain] || 'ocean-dao';
  
  // Load project data
  fetch('/data/projects.json')
    .then(response => response.json())
    .then(data => {
      const project = data.projects.find(p => p.id === projectId);
      if (project) {
        updatePageWithProject(project);
      }
    })
    .catch(error => {
      console.error('Error loading project data:', error);
    });
  
  function updatePageWithProject(project) {
    // Update title
    document.title = `${project.name} - Decentralized Science Funding`;
    
    // Update all elements with data-project attributes
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
      el.textContent = `$${project.fundingRaised?.toLocaleString() || '0'}`;
    });
    
    document.querySelectorAll('[data-project="funding-goal"]').forEach(el => {
      el.textContent = `$${project.fundingGoal?.toLocaleString() || '0'}`;
    });
    
    document.querySelectorAll('[data-project="percent-funded"]').forEach(el => {
      el.textContent = `${project.percentFunded || 0}%`;
    });
    
    document.querySelectorAll('[data-project="progress-bar"]').forEach(el => {
      el.style.width = `${project.percentFunded || 0}%`;
    });
    
    // Update team members if they exist
    if (project.team) {
      const teamContainer = document.querySelector('[data-project="team"]');
      if (teamContainer) {
        teamContainer.innerHTML = project.team.map(member => `
          <div class="team-member">
            <div class="member-avatar">${member.avatar}</div>
            <div class="member-name">${member.name}</div>
            <div class="member-role">${member.role}</div>
          </div>
        `).join('');
      }
    }
    
    // Update milestones if they exist
    if (project.milestones) {
      const milestonesContainer = document.querySelector('[data-project="milestones"]');
      if (milestonesContainer) {
        milestonesContainer.innerHTML = project.milestones.map(milestone => `
          <div class="milestone">
            <div class="milestone-status ${milestone.status}">${milestone.status}</div>
            <div class="milestone-phase">${milestone.phase}</div>
            <div class="milestone-title">${milestone.title}</div>
            <div class="milestone-description">${milestone.description}</div>
          </div>
        `).join('');
      }
    }
    
    // Add project selector/switcher
    const projectSelector = document.querySelector('[data-project="selector"]');
    if (projectSelector) {
      fetch('/data/projects.json')
        .then(response => response.json())
        .then(data => {
          projectSelector.innerHTML = `
            <select onchange="window.location.href='/?project=' + this.value" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 8px; border-radius: 6px;">
              ${data.projects.map(p => `
                <option value="${p.id}" ${p.id === projectId ? 'selected' : ''}>
                  ${p.name} - ${p.domain || 'zoo.fund'}
                </option>
              `).join('')}
            </select>
          `;
        });
    }
  }
})();