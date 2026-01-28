// Estado global para idioma atual
let currentLang = 'en';

// Carrega os dados do arquivo JSON e renderiza o conteúdo
document.addEventListener('DOMContentLoaded', async () => {
    // Verifica se há preferência de idioma salva
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
    }
    
    // Atualiza o seletor de idioma
    updateLanguageSelector();
    
    // Carrega e renderiza os dados
    await loadAndRender();
});

// Atualiza o seletor de idioma visual
function updateLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.value = currentLang;
    }
}

// Carrega o arquivo JSON do idioma atual e renderiza
async function loadAndRender() {
    try {
        const response = await fetch(`data-${currentLang}.json`);
        const data = await response.json();
        renderPage(data);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Função para trocar o idioma
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    loadAndRender();
}

function renderPage(data) {
    renderSidebar(data);
    renderAboutMe(data);
    renderProjects(data);
    renderTechnologies(data);
    renderTimeline(data);
    renderCommunity(data);
    renderContact(data);
}

function renderSidebar(data) {
    const { profile, navigation } = data;
    
    // Profile photo
    const profilePhoto = document.getElementById('profile-photo');
    profilePhoto.src = profile.photo;
    profilePhoto.alt = `${profile.name} profile photo`;
    
    // Name
    document.getElementById('profile-name').textContent = profile.name;
    
    // CV Link
    const cvLink = document.getElementById('cv-link');
    cvLink.href = profile.cvLink;
    cvLink.textContent = profile.cvLabel;
    
    // Navigation
    const navContainer = document.getElementById('sidebar-nav');
    navContainer.innerHTML = navigation.map(nav => 
        `<a href="${nav.href}"><i class="${nav.icon}"></i> ${nav.label}</a>`
    ).join('');
}

function renderAboutMe(data) {
    const { about, statistics, labels } = data;
    
    document.getElementById('about-greeting').textContent = about.greeting;
    document.getElementById('about-description').textContent = about.description;
    document.getElementById('statistics-title').textContent = labels.statistics;
    
    const statsContainer = document.getElementById('stats-grid');
    statsContainer.innerHTML = statistics.map(stat => `
        <div class="stat-card">
            <span class="value">${stat.value}</span>
            <p class="label">${stat.label}</p>
        </div>
    `).join('');
}

function renderProjects(data) {
    const { projects, labels } = data;
    
    document.getElementById('projects-title').textContent = labels.projects;
    
    const projectsContainer = document.getElementById('project-grid');
    projectsContainer.innerHTML = projects.map(project => {
        const tagsHtml = project.tags 
            ? `<div class="project-tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>`
            : '';
        return `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${tagsHtml}
                <a href="${project.link}">${labels.viewProject}</a>
            </div>
        `;
    }).join('');
}

function renderTechnologies(data) {
    const { technologies, labels } = data;
    
    document.getElementById('technologies-title').textContent = labels.technologies;
    
    const techContainer = document.getElementById('technologies-grid');
    techContainer.innerHTML = technologies.map(tech => {
        const iconHtml = tech.icon === 'svg' 
            ? tech.svg 
            : `<i class="${tech.icon}"></i>`;
        return `
            <div class="tech-card">
                ${iconHtml}
                <p>${tech.name}</p>
            </div>
        `;
    }).join('');
}

function renderTimeline(data) {
    const { timeline, labels } = data;
    
    document.getElementById('timeline-title').textContent = labels.timeline;
    
    const timelineContainer = document.getElementById('timeline');
    timelineContainer.innerHTML = timeline.map(item => `
        <div class="timeline-item ${item.position}">
            <div class="timeline-content">
                <h4>${item.period}</h4>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
}

function renderCommunity(data) {
    const { community } = data;
    
    document.getElementById('community-title').textContent = community.title;
    
    const communityContainer = document.getElementById('community-content');
    communityContainer.innerHTML = `
        <div class="community-card">
            <div class="community-header">
                <img src="${community.logo}" alt="${community.name} logo" class="community-logo">
                <div class="community-info">
                    <h3>${community.name}</h3>
                    <p class="community-fullname">${community.fullName}</p>
                    <span class="community-role">${community.role}</span>
                </div>
            </div>
            <p class="community-description">${community.description}</p>
            <div class="community-achievements">
                ${community.achievements.map(achievement => `
                    <div class="achievement-card">
                        <i class="${achievement.icon}"></i>
                        <h4>${achievement.title}</h4>
                        <p>${achievement.description}</p>
                    </div>
                `).join('')}
            </div>
            <a href="${community.ctaLink}" target="_blank" class="community-cta">
                <i class="fas fa-external-link-alt"></i> ${community.ctaText}
            </a>
        </div>
    `;
}

function renderContact(data) {
    const { contact, labels } = data;
    
    document.getElementById('contact-title').textContent = labels.contact;
    
    const contactContainer = document.getElementById('contact-links');
    contactContainer.innerHTML = `
        <a href="mailto:${contact.email}"><i class="fas fa-envelope"></i> Email</a>
        <a href="${contact.linkedin}" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a>
        <a href="${contact.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
        <a href="${contact.medium}" target="_blank"><i class="fab fa-medium"></i> Medium</a>
        <a href="${contact.devto}" target="_blank"><i class="fab fa-dev"></i> Dev.to</a>
    `;
}
