// Initialize Quill editor
const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Tell your story...',
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ]
    }
});

// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'index.html';
}

// Get articles from localStorage or initialize empty array
let articles = JSON.parse(localStorage.getItem('articles')) || [];

// Handle article publishing
document.getElementById('publishButton').addEventListener('click', () => {
    const title = document.getElementById('articleTitle').value;
    const category = document.getElementById('articleCategory').value;
    const content = quill.root.innerHTML;

    if (!title || !category || quill.getText().trim().length < 10) {
        alert('Please fill in all fields and write at least 10 characters');
        return;
    }

    const article = {
        id: Date.now(),
        title,
        content,
        category,
        author: currentUser.name,
        authorId: currentUser.id,
        date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric'
        }),
        readTime: Math.ceil(quill.getText().split(' ').length / 200) + ' min read',
        comments: []
    };

    articles.push(article);
    localStorage.setItem('articles', JSON.stringify(articles));

    // Redirect to home page
    window.location.href = 'index.html';
});
