// Post Like functionality
document.querySelectorAll('.post-actions button').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
        const icon = this.querySelector('i');
        
        // Add animation class
        icon.classList.add('animate__animated', 'animate__bounceIn');
        setTimeout(() => {
            icon.classList.remove('animate__animated', 'animate__bounceIn');
        }, 1000);
    });
});

// Messaging panel toggle
const messagingPanel = document.querySelector('.messaging');
const messagingHeader = document.querySelector('.messaging-header');

messagingHeader.addEventListener('click', () => {
    messagingPanel.classList.toggle('messaging-minimized');
});

// Post creation input enhancement
const postInput = document.querySelector('.post-input button');
postInput.addEventListener('click', () => {
    postInput.classList.add('active');
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }
    lastScroll = currentScroll;
});

// Notification badge update
const notificationBadge = document.createElement('span');
notificationBadge.className = 'notification-badge';
notificationBadge.textContent = '3';
document.querySelector('.fa-bell').parentElement.appendChild(notificationBadge);

// Search input enhancement
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('focus', () => {
    document.querySelector('.search-box').classList.add('search-active');
});

searchInput.addEventListener('blur', () => {
    document.querySelector('.search-box').classList.remove('search-active');
});

// Like button hover effect
document.querySelectorAll('.post-actions button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Load navbar
document.addEventListener('DOMContentLoaded', function() {
    // Navbar initialization
    const navbar = `
        <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top border-bottom">
            <div class="container">
                <!-- Logo and Search -->
                <div class="d-flex align-items-center flex-grow-1">
                    <a class="navbar-brand me-2" href="index.html">
                        <i class="fab fa-linkedin text-primary" style="font-size: 2.3rem;"></i>
                    </a>
                    <div class="search-box flex-grow-1 me-4 position-relative">
                        <i class="fas fa-search position-absolute search-icon"></i>
                        <input type="text" class="form-control rounded-pill search-input" placeholder="Arama Yap">
                    </div>
                </div>

                <!-- Mobile Toggle Button -->
                <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Navigation Items -->
                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav align-items-center ms-auto">
                        <li class="nav-item">
                            <a class="nav-link d-flex flex-column align-items-center" href="index.html">
                                <i class="fas fa-home"></i>
                                <span class="nav-text">Ana Sayfa</span>
                                <span class="nav-indicator"></span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex flex-column align-items-center" href="network.html">
                                <i class="fas fa-user-friends"></i>
                                <span class="nav-text">Ağım</span>
                                <span class="nav-indicator"></span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex flex-column align-items-center" href="jobs.html">
                                <i class="fas fa-briefcase"></i>
                                <span class="nav-text">İş İlanları</span>
                                <span class="nav-indicator"></span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex flex-column align-items-center" href="messaging.html">
                                <i class="fas fa-comment-dots"></i>
                                <span class="nav-text">Mesajlaşma</span>
                                <span class="nav-indicator"></span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link d-flex flex-column align-items-center" href="#" id="notificationsLink">
                                <i class="fas fa-bell"></i>
                                <span class="nav-text">Bildirimler</span>
                                <span class="notification-badge">3</span>
                                <span class="nav-indicator"></span>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link d-flex flex-column align-items-center" href="#" data-bs-toggle="dropdown">
                                <img src="https://picsum.photos/id/237/32/32" class="rounded-circle nav-profile-img" alt="profile">
                                <span class="nav-text">Ben<i class="fas fa-caret-down ms-1"></i></span>
                                <span class="nav-indicator"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end profile-dropdown">
                                <li>
                                    <div class="px-3 py-2">
                                        <div class="d-flex align-items-center">
                                            <img src="https://picsum.photos/id/237/48/48" class="rounded-circle me-2" alt="profile">
                                            <div>
                                                <h6 class="mb-0">Kullanıcı Adı</h6>
                                                <p class="text-muted mb-0 small">Yazılım Geliştirici</p>
                                            </div>
                                        </div>
                                        <button class="btn btn-primary rounded-pill w-100 mt-2">Profili Görüntüle</button>
                                    </div>
                                </li>
                                <li><hr class="dropdown-divider"></li>
                                <li><h6 class="dropdown-header">Hesap</h6></li>
                                <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i>Ayarlar ve Gizlilik</a></li>
                                <li><a class="dropdown-item" href="#"><i class="fas fa-question-circle me-2"></i>Yardım</a></li>
                                <li><a class="dropdown-item" href="#"><i class="fas fa-moon me-2"></i>Görünüm</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt me-2"></i>Oturumu Kapat</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown work-dropdown">
                            <a class="nav-link d-flex flex-column align-items-center" href="#" data-bs-toggle="dropdown">
                                <i class="fas fa-th"></i>
                                <span class="nav-text">İş<i class="fas fa-caret-down ms-1"></i></span>
                                <span class="nav-indicator"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><h6 class="dropdown-header">İş</h6></li>
                                <li><a class="dropdown-item" href="#"><i class="fas fa-users me-2"></i>Sayfa Oluştur</a></li>
                                <li><a class="dropdown-item" href="#"><i class="fas fa-bullhorn me-2"></i>Reklam Oluştur</a></li>
                                <li><a class="dropdown-item" href="#"><i class="fas fa-chart-line me-2"></i>İstatistikler</a></li>
                            </ul>
                        </li>
                        <li class="nav-item d-none d-lg-block">
                            <a class="nav-link text-muted premium-link" href="#">
                                Premium'u ücretsiz<br>deneyin
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    document.getElementById('navbar-placeholder').innerHTML = navbar;

    // Set active nav item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activeLink = document.querySelector(`a[href="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        activeLink.querySelector('.nav-indicator')?.classList.add('active');
    }

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle notification clicks
    document.getElementById('notificationsLink')?.addEventListener('click', function(e) {
        e.preventDefault();
        const badge = this.querySelector('.notification-badge');
        if (badge) {
            badge.style.display = 'none';
        }
    });

    // Load messaging panel
    const messaging = `
        <div class="messaging">
            <div class="messaging-header">
                <h6 class="mb-0">Mesajlaşma</h6>
            </div>
        </div>
    `;
    document.getElementById('messaging-placeholder').innerHTML = messaging;

    // Initialize posts
    const mockPosts = [
        {
            id: 1,
            author: 'Ahmet Yılmaz',
            title: 'Kıdemli Yazılım Geliştirici',
            content: 'Yeni projemizde React ve Node.js kullanarak harika bir uygulama geliştirdik! #webdevelopment #javascript',
            image: 'https://picsum.photos/id/28/600/400',
            likes: 42,
            comments: 8,
            shares: 5,
            time: '2s'
        },
        {
            id: 2,
            author: 'Ayşe Demir',
            title: 'UX Designer',
            content: 'Kullanıcı deneyimi tasarımında yeni trendler üzerine bir makale yazdım. Link yorumlarda!',
            likes: 28,
            comments: 12,
            shares: 3,
            time: '15d'
        }
    ];

    function createPost(postData) {
        const postHTML = `
            <div class="card mb-3 post" data-post-id="${postData.id}">
                <div class="card-body">
                    <div class="post-header d-flex align-items-center mb-3">
                        <img src="https://picsum.photos/id/64/48/48" alt="profile" class="rounded-circle me-2">
                        <div>
                            <h6 class="mb-0">${postData.author}</h6>
                            <p class="text-muted mb-0">${postData.title}</p>
                            <small class="text-muted">${postData.time}</small>
                        </div>
                        <div class="dropdown ms-auto">
                            <button class="btn btn-light btn-sm" data-bs-toggle="dropdown">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#"><i class="fas fa-bookmark me-2"></i>Kaydet</a></li>
                                <li><a class="dropdown-item" href="#"><i class="fas fa-link me-2"></i>Kopyala</a></li>
                                <li><a class="dropdown-item" href="#"><i class="fas fa-flag me-2"></i>Bildir</a></li>
                            </ul>
                        </div>
                    </div>
                    <p>${postData.content}</p>
                    ${postData.image ? `<img src="${postData.image}" class="img-fluid rounded mb-3" alt="post image">` : ''}
                    <div class="post-stats d-flex align-items-center text-muted mb-2">
                        <span><i class="fas fa-thumbs-up text-primary"></i> ${postData.likes}</span>
                        <span class="ms-2">${postData.comments} yorum</span>
                        <span class="ms-2">${postData.shares} paylaşım</span>
                    </div>
                    <div class="post-actions d-flex border-top pt-2">
                        <button class="btn btn-light flex-grow-1 like-btn">
                            <i class="far fa-thumbs-up"></i> Beğen
                        </button>
                        <button class="btn btn-light flex-grow-1 comment-btn">
                            <i class="far fa-comment"></i> Yorum Yap
                        </button>
                        <button class="btn btn-light flex-grow-1 share-btn">
                            <i class="far fa-share-square"></i> Paylaş
                        </button>
                    </div>
                    <div class="comments-section mt-3 d-none">
                        <div class="comment-input d-flex mb-3">
                            <img src="https://picsum.photos/id/237/32/32" alt="profile" class="rounded-circle me-2">
                            <input type="text" class="form-control rounded-pill" placeholder="Yorum yaz...">
                        </div>
                        <div class="comments-list"></div>
                    </div>
                </div>
            </div>
        `;
        return postHTML;
    }

    function initializePosts() {
        const feedContainer = document.querySelector('.feed-container');
        if (feedContainer) {
            mockPosts.forEach(post => {
                feedContainer.insertAdjacentHTML('beforeend', createPost(post));
            });
        }
    }

    initializePosts();

    // Post creation form handling
    function initializePostCreation() {
        const postInput = document.querySelector('.post-input button');
        const postModal = new bootstrap.Modal(document.getElementById('createPostModal'));
        
        if (postInput) {
            postInput.addEventListener('click', () => {
                postModal.show();
            });
        }

        const postForm = document.getElementById('createPostForm');
        if (postForm) {
            postForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const content = document.getElementById('postContent').value;
                const newPost = {
                    id: mockPosts.length + 1,
                    author: 'Kullanıcı Adı',
                    title: 'Yazılım Geliştirici',
                    content: content,
                    likes: 0,
                    comments: 0,
                    shares: 0,
                    time: 'Şimdi'
                };
                document.querySelector('.feed-container').insertAdjacentHTML('afterbegin', createPost(newPost));
                postModal.hide();
                postForm.reset();
            });
        }
    }

    initializePostCreation();

    // Notification system
    class NotificationSystem {
        constructor() {
            this.notifications = [];
            this.container = document.createElement('div');
            this.container.className = 'notification-container position-fixed top-0 end-0 p-3';
            document.body.appendChild(this.container);
        }

        show(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `alert alert-${type} alert-dismissible fade show`;
            notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            this.container.appendChild(notification);
            setTimeout(() => notification.remove(), 5000);
        }
    }

    const notificationSystem = new NotificationSystem();

    // Handle post interactions
    document.addEventListener('click', function(e) {
        if (e.target.closest('.like-btn')) {
            const post = e.target.closest('.post');
            const likeBtn = e.target.closest('.like-btn');
            const likesCount = post.querySelector('.post-stats span:first-child');
            
            likeBtn.classList.toggle('active');
            if (likeBtn.classList.contains('active')) {
                likeBtn.innerHTML = '<i class="fas fa-thumbs-up text-primary"></i> Beğenildi';
                notificationSystem.show('Gönderi beğenildi!', 'success');
            } else {
                likeBtn.innerHTML = '<i class="far fa-thumbs-up"></i> Beğen';
            }
        }

        if (e.target.closest('.comment-btn')) {
            const post = e.target.closest('.post');
            const commentsSection = post.querySelector('.comments-section');
            commentsSection.classList.toggle('d-none');
        }

        if (e.target.closest('.share-btn')) {
            notificationSystem.show('Paylaşım bağlantısı kopyalandı!', 'info');
        }
    });

    // Handle comment submissions
    document.addEventListener('keypress', function(e) {
        if (e.target.closest('.comment-input input') && e.key === 'Enter') {
            const input = e.target;
            const commentsList = input.closest('.comments-section').querySelector('.comments-list');
            const comment = `
                <div class="comment d-flex align-items-start mb-2 animate__animated animate__fadeIn">
                    <img src="https://picsum.photos/id/237/32/32" alt="profile" class="rounded-circle me-2">
                    <div class="comment-content p-2 bg-light rounded">
                        <h6 class="mb-1">Kullanıcı Adı</h6>
                        <p class="mb-0">${input.value}</p>
                    </div>
                </div>
            `;
            commentsList.insertAdjacentHTML('beforeend', comment);
            input.value = '';
            notificationSystem.show('Yorum eklendi!', 'success');
        }
    });

    // Handle profile hover cards
    const profileLinks = document.querySelectorAll('.post-header h6');
    profileLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const hoverCard = document.createElement('div');
            hoverCard.className = 'profile-hover-card card position-fixed animate__animated animate__fadeIn';
            hoverCard.style.left = `${rect.left}px`;
            hoverCard.style.top = `${rect.bottom + 10}px`;
            hoverCard.innerHTML = `
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <img src="https://picsum.photos/id/64/64/64" alt="profile" class="rounded-circle me-3">
                        <div>
                            <h6 class="mb-1">${this.textContent}</h6>
                            <p class="text-muted mb-0">Yazılım Geliştirici</p>
                        </div>
                    </div>
                    <p class="text-muted small mb-2"><i class="fas fa-building me-2"></i>Tech Company</p>
                    <p class="text-muted small mb-3"><i class="fas fa-map-marker-alt me-2"></i>İstanbul, Türkiye</p>
                    <button class="btn btn-primary btn-sm rounded-pill w-100">
                        <i class="fas fa-plus me-1"></i>Bağlantı Kur
                    </button>
                </div>
            `;
            document.body.appendChild(hoverCard);
            
            const removeCard = () => {
                hoverCard.classList.replace('animate__fadeIn', 'animate__fadeOut');
                setTimeout(() => hoverCard.remove(), 300);
            };
            
            hoverCard.addEventListener('mouseleave', removeCard);
            this.addEventListener('mouseleave', function(e) {
                if (!hoverCard.contains(e.relatedTarget)) {
                    removeCard();
                }
            });
        });
    });
});

// Network page functionality
if (window.location.pathname.includes('network.html')) {
    // Handle connection invitations
    document.querySelectorAll('.invitation-item button').forEach(button => {
        button.addEventListener('click', function() {
            const invitationItem = this.closest('.invitation-item');
            invitationItem.classList.add('animate__animated', 'animate__fadeOutRight');
            setTimeout(() => {
                invitationItem.remove();
            }, 500);
        });
    });

    // Handle connection suggestions
    document.querySelectorAll('.suggestion-card button').forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-check me-1"></i>Bağlantı Gönderildi';
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-secondary');
            this.disabled = true;
        });
    });
}

// Profile page functionality
if (window.location.pathname.includes('profile.html')) {
    // Handle profile photo hover effect
    const profilePhoto = document.querySelector('.profile-photo-large');
    if (profilePhoto) {
        profilePhoto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        profilePhoto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Handle skill endorsements
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', function() {
            const badge = this.querySelector('.badge');
            if (badge.classList.contains('bg-primary')) {
                badge.textContent = 'Onayla';
                badge.classList.remove('bg-primary');
                badge.classList.add('bg-secondary');
            } else {
                badge.textContent = 'Onaylandı';
                badge.classList.remove('bg-secondary');
                badge.classList.add('bg-primary');
            }
        });
    });
}
