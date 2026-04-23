async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        
        const grid = document.getElementById('projectGrid');
        const filters = document.getElementById('filters');
        
        function renderProjects(filter = 'all') {
            grid.innerHTML = '';
            
            const filteredProjects = projects.filter(p => {
                if (filter === 'all') return true;
                if (filter === 'AI') return p.tags.includes('AI') || p.tags.includes('ML');
                return p.language === filter || p.tags.includes(filter);
            });

            filteredProjects.forEach((project, index) => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.style.animationDelay = `${index * 0.1}s`;
                
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
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filter projects
                renderProjects(e.target.dataset.filter);
            }
        });

    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectGrid').innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #ef4444;">Failed to load projects. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);

