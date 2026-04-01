// Simple client-side routing for project pages
(function() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouter);
  } else {
    initRouter();
  }
  
  function initRouter() {
    console.log('Router initializing...');
    
    // Get current path
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Path to project mapping
    const pathMap = {
    '/ocean': 'ocean-dao',
    '/neuro': 'neuro-dao',
    '/longevity': 'longevity-dao',
    '/climate': 'climate-dao',
    '/quantum': 'quantum-dao',
    '/fusion': 'fusion-dao',
    '/space': 'space-dao',
    '/aisafety': 'ai-safety-dao',
    '/ai-safety': 'ai-safety-dao',
    '/governance': 'governance-page',
    '/': null // Show all projects or default
  };
  
  // Check for governance page first
  if (path === '/governance') {
    window.location.href = '/governance.html';
    return;
  }
  
  // Determine which project to show
  let projectId = path === '/' ? null : (pathMap[path] || urlParams.get('project') || null);
  
  console.log('Path:', path, 'ProjectId:', projectId);
  
  // Load project data
  fetch('/data/projects.json')
    .then(response => response.json())
    .then(data => {
      console.log('Data loaded, projectId:', projectId);
      if (projectId) {
        // Show specific project
        const project = data.projects.find(p => p.id === projectId);
        if (project) {
          console.log('Showing project:', project.name);
          showProject(project);
        } else {
          console.log('Project not found, showing all');
          showAllProjects(data.projects);
        }
      } else {
        // Show all projects grid
        console.log('Showing all projects');
        showAllProjects(data.projects);
      }
    })
    .catch(error => {
      console.error('Error loading project data:', error);
    });
  
  function showProject(project) {
    // Update title
    document.title = `${project.name} - Zoo Fund`;
    
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
    
    // Show single project view
    const singleView = document.getElementById('single-project');
    const gridView = document.getElementById('projects-grid');
    if (singleView) singleView.style.display = 'block';
    if (gridView) gridView.style.display = 'none';
  }
  
  function showAllProjects(projects) {
    console.log('showAllProjects called with', projects.length, 'projects');
    document.title = 'Zoo Fund - Decentralized Science Funding';
    
    // Hide single project view, show grid
    const singleView = document.getElementById('single-project');
    const gridView = document.getElementById('projects-grid');
    
    console.log('Single view element:', singleView);
    console.log('Grid view element:', gridView);
    
    if (singleView) {
      singleView.style.display = 'none';
      console.log('Hidden single view');
    }
    
    if (gridView) {
      gridView.style.display = 'block';
      console.log('Showing grid view');
      gridView.innerHTML = `
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
              <button onclick="window.createProject()" style="
                background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                cursor: pointer;
                transition: opacity 0.2s;
              " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                Create Project
              </button>
              <button onclick="window.submitProposal()" style="
                background: transparent;
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.2);
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.2s;
              " onmouseover="this.style.borderColor='rgba(255, 255, 255, 0.4)'" onmouseout="this.style.borderColor='rgba(255, 255, 255, 0.2)'">
                Submit Proposal
              </button>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 32px;">
            ${projects.map(project => `
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
    } else {
      console.error('Grid view element not found!');
    }
  }
  } // End of initRouter
})();