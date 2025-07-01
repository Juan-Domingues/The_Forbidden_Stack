// Controle dos cards expansíveis da equipe
document.addEventListener('DOMContentLoaded', function() {
    // Função para ajustar o layout do grid com diferentes números de membros
    function adjustTeamGridLayout() {
        const teamGrid = document.querySelector('.team-grid');
        const teamCards = document.querySelectorAll('.team-card');
        const memberCount = teamCards.length;
        
        // Remover classes anteriores
        teamGrid.classList.remove('four-members-grid', 'five-members-grid', 'six-members-grid', 'seven-members-grid');
        
        // Aplicar classe baseada no número de membros
        if (memberCount === 4) {
            teamGrid.classList.add('four-members-grid');
        } else if (memberCount === 5) {
            teamGrid.classList.add('five-members-grid');
        }
    }
    
    // Executar ajuste do layout
    adjustTeamGridLayout();
    
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        const cardFront = card.querySelector('.card-front');
        const closeBtn = card.querySelector('.close-btn');
        
        // Expandir card ao clicar
        cardFront.addEventListener('click', function() {
            const teamGrid = document.querySelector('.team-grid');
            
            // Fechar outros cards expandidos
            teamCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Expandir o card clicado
            card.classList.add('expanded');
            
            // Animar as barras de skill
            setTimeout(() => {
                animateSkills(card);
            }, 300);
            
            // Scroll suave para o card expandido
            setTimeout(() => {
                card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        });
        
        // Fechar card ao clicar no botão de fechar
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            card.classList.remove('expanded');
        });
    });
    
    // Fechar cards ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.team-card')) {
            teamCards.forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });
    
    // Fechar cards com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            teamCards.forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });

    // Navegação
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Scroll suave para seções
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }

            // Fechar menu mobile após clique
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Destacar link ativo durante scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                const sectionHeight = targetSection.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    // Animação de entrada dos cards de projeto
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar cards de projeto para animação
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Efeito de clique no card "Adicionar Projeto"
    const addProjectCard = document.querySelector('.project-add');
    if (addProjectCard) {
        addProjectCard.addEventListener('click', function() {
            alert('🚀 Funcionalidade de adicionar projeto em desenvolvimento!\n\nEm breve você poderá adicionar seus próprios projetos épicos!');
        });
    }
});

// Função para animar as barras de skill
function animateSkills(card) {
    const skillBars = card.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const skillValue = bar.getAttribute('data-skill');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = skillValue + '%';
        }, 100);
    });
}

// Efeito de digitação para títulos (opcional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação nos títulos principais (opcional)
window.addEventListener('load', function() {
    const mainTitle = document.querySelector('.apresentacao__texto__titulo');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        typeWriter(mainTitle, originalText, 80);
    }
});
