// Sistema de Modais Estilo Yu-Gi-Oh
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todas as fotos clicáveis
    const teamPhotos = document.querySelectorAll('.team-photo[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // Adiciona event listeners para abrir modais
    teamPhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(`modal-${modalId}`);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Previne scroll do body
                
                // Anima as barras de skill
                setTimeout(() => {
                    animateSkillBars(modal);
                }, 300);
            }
        });
    });

    // Adiciona event listeners para fechar modais
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(`modal-${modalId}`);
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restaura scroll do body
            }
        });
    });

    // Fecha modal ao clicar fora dele
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Fecha modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Função para animar as barras de skill
    function animateSkillBars(modal) {
        const skillBars = modal.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const skillLevel = bar.getAttribute('data-skill');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = skillLevel + '%';
            }, 100);
        });
    }

    // Adiciona cursor pointer nas fotos
    teamPhotos.forEach(photo => {
        photo.style.cursor = 'pointer';
        
        // Adiciona efeito de hover mais pronunciado
        photo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15)';
            this.style.boxShadow = '0 0 50px rgba(218, 165, 32, 0.8), 0 0 100px rgba(138, 43, 226, 0.6)';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 20px rgba(218, 165, 32, 0.3), inset 0 0 20px rgba(0, 0, 0, 0.3)';
        });
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

    // Efeito de parallax sutil no scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.projects-section::before, .contact-section::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
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
            // Aqui você pode adicionar lógica para abrir um modal de adição de projeto
            // ou redirecionar para um formulário
            alert('🚀 Funcionalidade de adicionar projeto em desenvolvimento!\n\nEm breve você poderá adicionar seus próprios projetos épicos!');
        });
    }
});

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
