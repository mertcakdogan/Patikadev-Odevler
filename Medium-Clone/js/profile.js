// Profile functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Load user data
    loadUserProfile();
    loadUserActivity();
    setupEventListeners();
    setupNotifications();
});

function loadUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Update avatar
    document.querySelectorAll('.user-avatar').forEach(avatar => {
        avatar.src = currentUser.avatar || 'https://via.placeholder.com/150';
    });
    
    // Update profile info
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('userBio').textContent = currentUser.bio || 'No bio added yet.';
    
    // Count published articles
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const publishedCount = articles.filter(article => 
        article.authorId === currentUser.id && !article.isDraft
    ).length;
    document.getElementById('articleCount').textContent = publishedCount;
    
    // Populate edit form
    document.getElementById('editName').value = currentUser.name;
    document.getElementById('editEmail').value = currentUser.email;
    document.getElementById('editBio').value = currentUser.bio || '';
}

function loadUserActivity() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    
    // Combine and sort activities
    const activities = [
        ...articles.filter(article => article.authorId === currentUser.id)
            .map(article => ({
                type: 'article',
                date: article.date,
                content: `Published "${article.title}"`,
            })),
        ...comments.filter(comment => comment.userId === currentUser.id)
            .map(comment => ({
                type: 'comment',
                date: comment.date,
                content: `Commented on "${comment.articleTitle}"`,
            }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display activities
    const activityContainer = document.getElementById('recentActivity');
    activityContainer.innerHTML = activities.map(activity => `
        <div class="d-flex align-items-center mb-3">
            <i class="fas fa-${activity.type === 'article' ? 'file-alt' : 'comment'} me-3"></i>
            <div>
                <p class="mb-0">${activity.content}</p>
                <small class="text-muted">${new Date(activity.date).toLocaleDateString()}</small>
            </div>
        </div>
    `).join('') || '<p class="text-muted">No recent activity.</p>';
}

function setupEventListeners() {
    // Avatar upload
    document.getElementById('avatarUpload').addEventListener('change', handleAvatarUpload);
    
    // Profile edit form
    document.getElementById('editProfileForm').addEventListener('submit', handleProfileUpdate);
}

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            currentUser.avatar = e.target.result;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Update all avatar images
            document.querySelectorAll('.user-avatar').forEach(avatar => {
                avatar.src = e.target.result;
            });
            
            // Show success toast
            showToast('Profile photo updated successfully!');
        };
        reader.readAsDataURL(file);
    }
}

function handleProfileUpdate(event) {
    event.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const newPassword = document.getElementById('editPassword').value;
    
    // Update user data
    currentUser.name = document.getElementById('editName').value;
    currentUser.email = document.getElementById('editEmail').value;
    currentUser.bio = document.getElementById('editBio').value;
    
    if (newPassword) {
        currentUser.password = newPassword; // In a real app, this should be hashed
    }
    
    // Save updates
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update users array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Reload profile and show success message
    loadUserProfile();
    showToast('Profile updated successfully!');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
    modal.hide();
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

function showToast(message) {
    const toastEl = document.getElementById('notificationToast');
    const toast = new bootstrap.Toast(toastEl);
    toastEl.querySelector('.toast-body').textContent = message;
    toast.show();
}
