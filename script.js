// Modern GameZone JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Video carousel functionality
    const videoCards = document.querySelectorAll('.video-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentVideoIndex = 0;

    function showVideo(index) {
        videoCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }

    function nextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videoCards.length;
        showVideo(currentVideoIndex);
    }

    function prevVideo() {
        currentVideoIndex = (currentVideoIndex - 1 + videoCards.length) % videoCards.length;
        showVideo(currentVideoIndex);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevVideo);
        nextBtn.addEventListener('click', nextVideo);
    }

    // Auto-play video carousel
    let carouselInterval = setInterval(nextVideo, 5000);

    // Pause auto-play on hover
    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        videoContainer.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextVideo, 5000);
        });
    }

    // Game category interactions
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', function() {
            const game = this.getAttribute('data-game');
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // You can add navigation to game-specific content here
            console.log(`Selected game: ${game}`);
        });
    });

    // Leaderboard functionality
    const gameButtons = document.querySelectorAll('.game-btn');
    const leaderboards = document.querySelectorAll('.leaderboard');

    gameButtons.forEach(button => {
        button.addEventListener('click', function() {
            const game = this.getAttribute('data-game');
            
            // Update active button
            gameButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding leaderboard
            leaderboards.forEach(board => {
                board.classList.remove('active');
                if (board.id === `${game}-leaderboard`) {
                    board.classList.add('active');
                }
            });
        });
    });

    // Upload form functionality
    const uploadForm = document.querySelector('.upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('.upload-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Yükleniyor...';
            submitBtn.disabled = true;
            
            // Simulate upload process
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Başarıyla Yüklendi!';
                submitBtn.style.background = 'var(--secondary-color)';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 2000);
        });
    }

    // Profile clips filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clipCards = document.querySelectorAll('.clip-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter clips
            clipCards.forEach(card => {
                const game = card.getAttribute('data-game');
                if (filter === 'all' || game === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Toast notification system
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Video like functionality
    document.querySelectorAll('.video-stats').forEach(stats => {
        const likeBtn = stats.querySelector('.fa-heart').parentElement;
        likeBtn.addEventListener('click', function() {
            const likeCount = this.textContent;
            const currentLikes = parseInt(likeCount.replace(/[^\d]/g, ''));
            
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                this.innerHTML = `<i class="fas fa-heart"></i> ${currentLikes - 1}`;
                showToast('Beğeni kaldırıldı', 'info');
            } else {
                this.classList.add('liked');
                this.innerHTML = `<i class="fas fa-heart"></i> ${currentLikes + 1}`;
                showToast('Video beğenildi!', 'success');
            }
        });
    });

    // XP progress animation
    const xpFill = document.querySelector('.xp-fill');
    if (xpFill) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    xpFill.style.width = '75%';
                }
            });
        });
        observer.observe(xpFill);
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Mobile menu functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Touch gesture improvements for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleVerticalSwipe();
    });

    function handleVerticalSwipe() {
        const swipeThreshold = 100;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - could be used for quick actions
                console.log('Swipe up detected');
            } else {
                // Swipe down - could be used for quick actions
                console.log('Swipe down detected');
            }
        }
    }

    // Mobile-specific video controls
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Add mobile-friendly video controls
        video.addEventListener('touchstart', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });

    // Prevent zoom on double tap for mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Mobile-friendly scroll behavior
    const smoothScrollTo = (target) => {
        const element = document.querySelector(target);
        if (element) {
            const offsetTop = element.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Update smooth scrolling for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScrollTo(target);
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.game-card, .stat-card, .clip-card, .leaderboard-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Keyboard navigation for video carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevVideo();
        } else if (e.key === 'ArrowRight') {
            nextVideo();
        }
    });

    // Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextVideo(); // Swipe left
            } else {
                prevVideo(); // Swipe right
            }
        }
    }

    // Performance optimization: Throttle scroll events
    let ticking = false;
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateOnScroll);

    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Success message for demo
    setTimeout(() => {
        showToast('GameZone\'a hoş geldin! 🎮', 'success');
    }, 1000);

    // Video voting functionality
    document.querySelectorAll('.vote-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const voteType = this.classList.contains('upvote') ? 'upvote' : 'downvote';
            const voteCount = this.querySelector('.vote-count');
            const currentVotes = parseInt(voteCount.textContent);
            
            // Check if user already voted
            const userVotes = JSON.parse(localStorage.getItem('userVotes') || '{}');
            const userVoteKey = `video_${videoId}`;
            const previousVote = userVotes[userVoteKey];
            
            // Remove previous vote if exists
            if (previousVote) {
                const previousBtn = document.querySelector(`[data-video="${videoId}"].vote-btn.${previousVote}`);
                if (previousBtn) {
                    previousBtn.classList.remove('voted');
                    const prevCount = previousBtn.querySelector('.vote-count');
                    const prevVotes = parseInt(prevCount.textContent);
                    prevCount.textContent = prevVotes - 1;
                }
            }
            
            // Add new vote
            if (previousVote !== voteType) {
                this.classList.add('voted');
                voteCount.textContent = currentVotes + 1;
                userVotes[userVoteKey] = voteType;
                
                // Show success message
                const voteMessage = voteType === 'upvote' ? 'Video beğenildi! 👍' : 'Video beğenilmedi! 👎';
                showToast(voteMessage, 'success');
            } else {
                // Remove vote if clicking same button
                voteCount.textContent = currentVotes - 1;
                delete userVotes[userVoteKey];
                showToast('Oyunuz kaldırıldı', 'info');
            }
            
            // Save user votes to localStorage
            localStorage.setItem('userVotes', JSON.stringify(userVotes));
        });
    });

    // Load user votes on page load
    function loadUserVotes() {
        const userVotes = JSON.parse(localStorage.getItem('userVotes') || '{}');
        
        Object.keys(userVotes).forEach(voteKey => {
            const videoId = voteKey.replace('video_', '');
            const voteType = userVotes[voteKey];
            const voteBtn = document.querySelector(`[data-video="${videoId}"].vote-btn.${voteType}`);
            
            if (voteBtn) {
                voteBtn.classList.add('voted');
            }
        });
    }

    // Initialize user votes
    loadUserVotes();
});

// CSS for additional animations
const additionalStyles = `
    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .tooltip {
        position: fixed;
        background: var(--dark-surface);
        color: var(--text-primary);
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.9rem;
        z-index: 10000;
        pointer-events: none;
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--dark-border);
    }
    
    .liked {
        color: var(--danger-color) !important;
    }
    
    .liked i {
        animation: pulse 0.3s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);