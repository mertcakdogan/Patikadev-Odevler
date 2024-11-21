// Sample article data
let articles = JSON.parse(localStorage.getItem('articles')) || [
    {
        id: 1,
        title: "The Art of Writing Clean Code",
        author: "John Doe",
        authorId: 1,
        date: "Dec 1, 2023",
        readTime: "5 min read",
        content: "Learn the principles of writing clean, maintainable code that your future self will thank you for.",
        category: "Programming",
        comments: []
    },
    {
        id: 2,
        title: "Getting Started with Web Development",
        author: "Jane Smith",
        authorId: 2,
        date: "Dec 2, 2023",
        readTime: "7 min read",
        content: "A comprehensive guide to starting your journey in web development from scratch.",
        category: "Web Development",
        comments: []
    },
    {
        id: 3,
        title: "The Future of Artificial Intelligence",
        author: "Mike Johnson",
        authorId: 3,
        date: "Dec 3, 2023",
        readTime: "10 min read",
        content: "Exploring the possibilities and challenges of AI in the coming decades.",
        category: "Technology",
        comments: []
    }
];

let filteredArticles = articles;
let currentArticle = null;

// User Management
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Update UI based on authentication state
function updateAuthUI() {
    const authButtons = document.querySelector('.navbar .d-flex');
    const writeLink = document.querySelector('a[href="write.html"]');

    if (currentUser) {
        authButtons.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-dark dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown">
                    ${currentUser.name}
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><a class="dropdown-item" href="#">My Stories</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="signOut()">Sign Out</a></li>
                </ul>
            </div>
        `;
        writeLink.style.display = 'block';
        
        // Add notification icon if user is logged in
        const notificationIcon = document.querySelector('.notifications-icon');
        if (notificationIcon) {
            notificationIcon.style.display = 'block';
            checkNotifications();
        }
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-outline-dark me-2" data-bs-toggle="modal" data-bs-target="#signInModal">Sign In</button>
            <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#signUpModal">Get Started</button>
        `;
        writeLink.style.display = 'none';
    }
}

// Sign Up Function
function signUp(event) {
    event.preventDefault();
    
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    // Check if user already exists
    if (users.find(user => user.email === email)) {
        alert('Email already registered');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login after signup
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Close modal and update UI
    const modal = bootstrap.Modal.getInstance(document.getElementById('signUpModal'));
    modal.hide();
    updateAuthUI();
    
    // Clear form
    document.getElementById('signUpForm').reset();
}

// Sign In Function
function signIn(event) {
    event.preventDefault();
    
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Close modal and update UI
        const modal = bootstrap.Modal.getInstance(document.getElementById('signInModal'));
        modal.hide();
        updateAuthUI();
        
        // Redirect to dashboard after login
        window.location.href = 'dashboard.html';
        
        // Clear form
        document.getElementById('signInForm').reset();
    } else {
        alert('Invalid email or password');
    }
}

// Sign Out Function
function signOut() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
}

// Function to create article cards
function createArticleCard(article) {
    return `
        <div class="col-md-4 mb-4">
            <div class="card article-card border-0" onclick="openArticle(${article.id})">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-2">
                        <img src="https://i.pravatar.cc/150?u=${article.authorId}" alt="${article.author}" class="author-avatar">
                        <span class="author-name">${article.author}</span>
                    </div>
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text article-preview">${article.content.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
                    <div class="article-meta d-flex justify-content-between align-items-center">
                        <div>
                            <span>${article.date} · ${article.readTime}</span>
                        </div>
                        <span class="badge bg-light text-dark">${article.category}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to render articles
function renderArticles(articles) {
    const articlesContainer = document.getElementById('articlesContainer');
    articlesContainer.innerHTML = articles.length ? 
        articles.map(article => createArticleCard(article)).join('') :
        '<div class="col-12 text-center">No articles found</div>';
}

// Search and filter functions
function filterArticles() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm) ||
                            article.content.toLowerCase().includes(searchTerm) ||
                            article.author.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || article.category === category;
        return matchesSearch && matchesCategory;
    });
    
    renderArticles(filteredArticles);
}

// Open article modal
function openArticle(articleId) {
    currentArticle = articles.find(a => a.id === articleId);
    if (!currentArticle) return;

    const modal = new bootstrap.Modal(document.getElementById('articleModal'));
    document.querySelector('#articleModal .modal-title').textContent = currentArticle.title;
    document.getElementById('articleContent').innerHTML = currentArticle.content;
    
    // Show/hide comment form based on login status
    const commentForm = document.getElementById('addCommentForm');
    if (currentUser) {
        commentForm.style.display = 'block';
    } else {
        commentForm.style.display = 'none';
    }
    
    renderComments();
    modal.show();
}

// Comments functions
function renderComments() {
    const commentsList = document.getElementById('commentsList');
    const comments = currentArticle.comments || [];
    
    commentsList.innerHTML = comments.length ? comments.map(comment => `
        <div class="comment mb-3 p-3 border-bottom">
            <div class="d-flex align-items-center mb-2">
                <img src="https://i.pravatar.cc/150?u=${comment.userId}" alt="${comment.author}" class="author-avatar">
                <div class="ms-2">
                    <strong>${comment.author}</strong>
                    <small class="text-muted ms-2">${comment.date}</small>
                </div>
            </div>
            <p class="mb-0">${comment.text}</p>
        </div>
    `).join('') : '<p class="text-muted">No comments yet</p>';
}

// Add comment function
function addComment() {
    if (!currentUser) {
        alert('Please sign in to comment');
        return;
    }

    const commentText = document.getElementById('commentText').value.trim();
    if (!commentText) {
        alert('Please write a comment');
        return;
    }

    const comment = {
        id: Date.now(),
        text: commentText,
        author: currentUser.name,
        userId: currentUser.id,
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    };

    if (!currentArticle.comments) {
        currentArticle.comments = [];
    }
    
    currentArticle.comments.push(comment);

    // Update article in the articles array
    const articleIndex = articles.findIndex(a => a.id === currentArticle.id);
    articles[articleIndex] = currentArticle;
    
    // Save to localStorage
    localStorage.setItem('articles', JSON.stringify(articles));

    // Create notification for article author
    if (currentArticle.authorId !== currentUser.id) {
        const notification = {
            id: Date.now(),
            userId: currentArticle.authorId,
            message: `${currentUser.name} commented on your article "${currentArticle.title}"`,
            date: new Date().toISOString(),
            read: false,
            type: 'comment',
            articleId: currentArticle.id
        };

        const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        notifications.push(notification);
        localStorage.setItem('notifications', JSON.stringify(notifications));

        // Show toast to article author if they're currently viewing the page
        if (currentArticle.authorId === JSON.parse(localStorage.getItem('currentUser'))?.id) {
            showToast(notification.message);
        }
    }

    // Clear comment input and refresh comments
    document.getElementById('commentText').value = '';
    renderComments();
}

// Notification functionality
function checkNotifications() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const userNotifications = notifications.filter(n => n.userId === currentUser.id && !n.read);
    
    // Update notification badge
    const badge = document.querySelector('.notification-badge');
    const notificationsList = document.querySelector('.notifications-list');
    
    if (userNotifications.length > 0) {
        badge.style.display = 'block';
        badge.textContent = userNotifications.length;
        
        // Update dropdown list
        notificationsList.innerHTML = userNotifications.map(notification => `
            <div class="notification-item p-2 border-bottom">
                <p class="mb-1">${notification.message}</p>
                <small class="text-muted">${new Date(notification.date).toLocaleDateString()}</small>
            </div>
        `).join('');
    } else {
        badge.style.display = 'none';
        notificationsList.innerHTML = '<div class="text-center text-muted">No new notifications</div>';
    }
}

function showToast(message) {
    const toastEl = document.getElementById('notificationToast');
    const toast = new bootstrap.Toast(toastEl);
    toastEl.querySelector('.toast-body').textContent = message;
    toast.show();
}

// Setup notifications when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add authentication listeners
    const signUpForm = document.getElementById('signUpForm');
    const signInForm = document.getElementById('signInForm');
    
    if (signUpForm) {
        signUpForm.addEventListener('submit', signUp);
    }
    
    if (signInForm) {
        signInForm.addEventListener('submit', signIn);
    }
    
    // Add search and filter listeners
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterArticles);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterArticles);
    }
    
    // Render initial articles
    renderArticles(articles);
    
    // Update auth UI
    updateAuthUI();
    
    // Add comment button listener
    const submitComment = document.getElementById('submitComment');
    if (submitComment) {
        submitComment.addEventListener('click', addComment);
    }
    
    if (currentUser) {
        setupNotifications();
    }
});

function setupNotifications() {
    // Check for new notifications every minute
    checkNotifications();
    setInterval(checkNotifications, 60000);
}
