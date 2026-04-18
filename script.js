async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        
        const grid = document.getElementById('projectGrid');
        const filters = document.getElementById('filters');
        const searchInput = document.getElementById('searchInput');
        
        let currentFilter = 'all';
        let currentSearch = '';

        function renderProjects() {
            grid.innerHTML = '';
            
            const filteredProjects = projects.filter(p => {
                // Filter by language/category
                const matchesFilter = currentFilter === 'all' || 
                                     (currentFilter === 'AI' ? (p.tags.includes('AI') || p.tags.includes('ML')) : 
                                      (p.language === currentFilter || p.tags.includes(currentFilter)));
                
                // Filter by search query
                const searchLower = currentSearch.toLowerCase();
                const matchesSearch = p.name.toLowerCase().includes(searchLower) || 
                                     p.description.toLowerCase().includes(searchLower) ||
                                     p.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
                                     p.language.toLowerCase().includes(searchLower);
                
                return matchesFilter && matchesSearch;
            });

            if (filteredProjects.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 4rem;">No projects found matching your criteria.</p>';
                return;
            }

            filteredProjects.forEach((project, index) => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.style.animationDelay = `${index * 0.05}s`;
                
                card.innerHTML = `
                    <div class="project-header">
                        <h3 class="project-name">${project.name}</h3>
                        <p class="project-desc">${project.description}</p>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    <div class="project-footer">
                        <div class="stars">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                            ${project.stars}
                        </div>
                        <a href="${project.url}" target="_blank" class="view-link">
                            View Project
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </a>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // Initial render
        renderProjects();

        // Filter event listeners
        filters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                currentFilter = e.target.dataset.filter;
                renderProjects();
            }
        });

        // Search event listener
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderProjects();
        });

    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectGrid').innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ef4444;">Failed to load projects. Please check projects.json connectivity.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);
