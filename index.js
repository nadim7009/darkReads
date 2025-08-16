// script.js

document.addEventListener('DOMContentLoaded', function() {
    // 1. Book Shelf Functionality
    const addToShelfButtons = document.querySelectorAll('.btn-orange');
    addToShelfButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookCard = this.closest('.book-card');
            const title = bookCard.querySelector('.book-title').textContent;
            const author = bookCard.querySelector('.book-author').textContent;
            
            // Check if already in shelf
            if (this.textContent.includes('Added')) {
                alert(`${title} is already in your bookshelf!`);
                return;
            }
            
            // Add to shelf
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.classList.add('added-to-shelf');
            
            // Store in localStorage
            const bookData = {
                title: title,
                author: author,
                cover: bookCard.querySelector('.book-cover').src,
                addedAt: new Date().toLocaleString()
            };
            
            let bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
            bookshelf.push(bookData);
            localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
            
            // Show confirmation
            showToast(`${title} added to your bookshelf!`);
        });
    });
    
    // 2. Search Functionality
    const searchBox = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    searchButton.addEventListener('click', performSearch);
    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const query = searchBox.value.trim();
        if (query.length > 0) {
            // In a real app, this would redirect to search results
            showToast(`Searching for: ${query}`);
            searchBox.value = '';
        }
    }
    
    // 3. Genre Filter Active State
    const genreButtons = document.querySelectorAll('.btn-genre');
    genreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            genreButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would filter the books
            const genre = this.textContent;
            showToast(`Filtering by: ${genre}`);
        });
    });
    
    // 4. Toast Notification System
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close">&times;</button>
        `;
        
        document.body.appendChild(toast);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
        
        // Manual close
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });
    }
    
    // 5. Responsive Navbar Enhancement
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navbarToggler.addEventListener('click', function() {
        const isExpanded = navbarCollapse.classList.contains('show');
        if (isExpanded) {
            navbarCollapse.style.maxHeight = navbarCollapse.scrollHeight + 'px';
            setTimeout(() => {
                navbarCollapse.style.maxHeight = '0';
            }, 10);
        } else {
            navbarCollapse.style.maxHeight = navbarCollapse.scrollHeight + 'px';
            setTimeout(() => {
                navbarCollapse.style.maxHeight = 'none';
            }, 300);
        }
    });
    
    // 6. Book Rating Hover Effect
    const starRatings = document.querySelectorAll('.book-rating .stars');
    starRatings.forEach(stars => {
        stars.addEventListener('mouseover', function(e) {
            if (e.target.tagName === 'I') {
                const allStars = this.querySelectorAll('i');
                const hoveredIndex = Array.from(allStars).indexOf(e.target);
                
                allStars.forEach((star, index) => {
                    if (index <= hoveredIndex) {
                        star.classList.add('hovered');
                    } else {
                        star.classList.remove('hovered');
                    }
                });
            }
        });
        
        stars.addEventListener('mouseout', function() {
            this.querySelectorAll('i').forEach(star => {
                star.classList.remove('hovered');
            });
        });
    });
    
    // 7. Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && validateEmail(email)) {
                // In a real app, this would send to a server
                showToast('Thanks for subscribing!');
                emailInput.value = '';
            } else {
                showToast('Please enter a valid email address');
            }
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // 8. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 9. Dynamic "New Release" Badges
    const newReleaseBadges = document.querySelectorAll('.book-badge.new');
    const daysThreshold = 30; // Consider books "new" if released in last 30 days
    
    newReleaseBadges.forEach(badge => {
        const releaseDate = new Date();
        // Randomize release dates for demo (within last 30 days)
        releaseDate.setDate(releaseDate.getDate() - Math.floor(Math.random() * daysThreshold));
        
        // Update badge text with relative time
        const daysAgo = Math.floor((new Date() - releaseDate) / (1000 * 60 * 60 * 24));
        if (daysAgo < 7) {
            badge.textContent = 'Just Added';
        } else if (daysAgo < 14) {
            badge.textContent = 'New Release';
        } else {
            badge.textContent = 'Recent';
        }
    });
    
    // 10. Book Cover Hover Effect
    const bookCovers = document.querySelectorAll('.book-cover');
    bookCovers.forEach(cover => {
        cover.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        cover.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});