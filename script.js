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
                        <div c
