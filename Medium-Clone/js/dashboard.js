// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Load user data
    loadUserData();
    loadUserStories();
    loadUserDrafts();
    loadUserComments();
    setupTabNavigation();
    setupNotifications();
});

function loadUserData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    document.querySelectorAll('.user-avatar').forEach(avatar => {
        avatar.src = currentUser.avatar || 'https://via.placeholder.com/150';
    });
}

function loadUserStories() {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userStories = articles.filter(article => article.authorId === currentUser.id && !article.isDraft);
    
    const storiesContainer = document.getElementById('userStories');
    storiesContainer.innerHTML = userStories.map(article => `
        <div class="col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text text-muted">
                        ${new Date(article.date).toLocaleDateString()} · ${article.readTime} min read
                    </p>
                    <p class="card-text">${article.content.substring(0, 100)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button class="btn btn-outline-dark btn-sm" onclick="editArticle('${article.id}')">
                            Edit
                        </button>
                        <button class="btn btn-outline-danger btn-sm" onclick="deleteArticle('${article.id}')">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('') || '<div class="col-12"><p class="text-muted">No stories published yet.</p></div>';
}

function loadUserDrafts() {
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userDrafts = articles.filter(article => article.authorId === currentUser.id && article.isDraft);
    
    const draftsContainer = document.getElementById('userDrafts');
    draftsContainer.innerHTML = userDrafts.map(draft => `
        <div class="col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${draft.title || 'Untitled Draft'}</h5>
                    <p class="card-text text-muted">Last edited: ${new Date(draft.lastEdited).toLocaleDateString()}</p>
                    <p class="card-text">${draft.content.substring(0, 100)}...</p>
                    <button class="btn btn-dark btn-sm" onclick="continueDraft('${draft.id}')">
                        Continue Writing
                    </button>
                </div>
            </div>
        </div>
    `).join('') || '<div class="col-12"><p class="text-muted">No drafts found.</p></div>';
}

function loadUserComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userComments = comments.filter(comment => comment.userId === currentUser.id);
    
    const commentsContainer = document.getElementById('userComments');
    commentsContainer.innerHTML = userComments.map(comment => `
        <div class="card mb-3">
            <div class="card-body">
                <p class="card-text">${comment.content}</p>
                <p class="card-text">
                    <small class="text-muted">
                        On article: ${comment.articleTitle} · ${new Date(comment.date).toLocaleDateString()}
                    </small>
                </p>
            </div>
        </div>
    `).join('') || '<p class="text-muted">No comments yet.</p>';
}

function setupTabNavigation() {
    const tabLinks = document.querySelectorAll('.list-group-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active tab
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding content
            const targetId = link.getAttribute('data-tab');
            tabContents.forEach(content => {
                content.style.display = content.id === targetId ? 'block' : 'none';
            });
        });
    });
}

function setupNotifications() {
    // Check for new notifications every minute
    checkNotifications();
    setInterval(checkNotifications, 60000);
}

function checkNotifications() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
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

function editArticle(articleId) {
    window.location.href = `write.html?edit=${articleId}`;
}

function deleteArticle(articleId) {
    if (confirm('Are you sure you want to delete this article?')) {
        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        const updatedArticles = articles.filter(article => article.id !== articleId);
        localStorage.setItem('articles', JSON.stringify(updatedArticles));
        loadUserStories();
    }
}

function continueDraft(draftId) {
    window.location.href = `write.html?draft=${draftId}`;
}
