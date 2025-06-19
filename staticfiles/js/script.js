// Scroll indicator
window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scrollIndicator").style.width = scrolled + "%";
};

// Animate elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add floating elements dynamically
    const floatingContainer = document.querySelector('.floating-elements');
    if (floatingContainer) {
        for (let i = 0; i < 6; i++) {
            const size = Math.random() * 100 + 50;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            const floatingElement = document.createElement('div');
            floatingElement.className = 'floating';
            floatingElement.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${top}%;
                left: ${left}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                opacity: ${Math.random() * 0.3 + 0.1};
            `;
            floatingContainer.appendChild(floatingElement);
        }
    }
});
// Add this to your existing script.js or create a new one
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effect to category cards
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) rotateX(3deg)';
      this.style.boxShadow = '0 15px 40px rgba(255, 182, 193, 0.3), 0 0 20px rgba(255, 182, 193, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
    });
  });

  // Add click effect to category cards
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      // Add your navigation logic here
      console.log('Navigating to category:', this.querySelector('h2').textContent);
      // Example: window.location.href = '/category/' + this.dataset.categoryId;
    });
  });
});

// Add this to your existing script.js or create a new one
document.addEventListener('DOMContentLoaded', function() {
  // Product card hover effects
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) rotateX(3deg)';
      this.style.boxShadow = '0 15px 40px rgba(255, 182, 193, 0.3), 0 0 20px rgba(255, 182, 193, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
    });

    // Add to cart functionality
    const button = this.querySelector('button');
    if (button) {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        // Add your cart logic here
        const productName = card.querySelector('h2').textContent;
        const productPrice = card.querySelector('.price').textContent;
        
        // Animation effect
        button.textContent = 'Added!';
        button.style.background = 'linear-gradient(45deg, var(--gold), var(--baby-pink))';
        
        setTimeout(() => {
          button.textContent = 'Buy Now';
          button.style.background = 'linear-gradient(45deg, var(--baby-pink), var(--gold))';
        }, 1500);
        
        console.log(`Added ${productName} (${productPrice}) to cart`);
      });
    }
  });

  // Product card click for details
  productCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.tagName !== 'BUTTON') {
        // Add your product detail navigation here
        const productName = this.querySelector('h2').textContent;
        console.log('Viewing details for:', productName);
        // Example: window.location.href = '/products/' + productName.toLowerCase().replace(/\s+/g, '-');
      }
    });
  });
});

// Add this to your existing script.js or create a new one
document.addEventListener('DOMContentLoaded', function() {
  // Product image zoom effect
  const productImage = document.querySelector('.product-image img');
  if (productImage) {
    productImage.addEventListener('mousemove', function(e) {
      const { left, top, width, height } = this.getBoundingClientRect();
      const x = (e.pageX - left) / width * 100;
      const y = (e.pageY - top) / height * 100;
      this.style.transformOrigin = `${x}% ${y}%`;
      this.style.transform = 'scale(1.05)';
    });
    
    productImage.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  }

  // Buy Now button effect
  const buyButton = document.querySelector('.product-info button');
  if (buyButton) {
    buyButton.addEventListener('click', function() {
      // Add your purchase logic here
      const productName = document.querySelector('.product-info h1').textContent;
      const productPrice = document.querySelector('.price').textContent;
      
      // Animation effect
      this.textContent = 'Added to Cart!';
      this.style.background = 'linear-gradient(45deg, var(--gold), var(--baby-pink))';
      
      setTimeout(() => {
        this.textContent = 'Buy Now';
        this.style.background = 'linear-gradient(45deg, var(--baby-pink), var(--gold))';
      }, 2000);
      
      console.log(`Purchased ${productName} (${productPrice})`);
    });
  }

  // Back link hover effect
  const backLink = document.querySelector('.back-link a');
  if (backLink) {
    backLink.addEventListener('mouseenter', function() {
      this.querySelector('span').style.transform = 'translateX(-5px)';
    });
    
    backLink.addEventListener('mouseleave', function() {
      this.querySelector('span').style.transform = 'translateX(0)';
    });
  }
});

// New Arrivals Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize product carousel
  const productGrid = document.querySelector('.products-grid');
  
  if (productGrid) {
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    productGrid.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    productGrid.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    function handleSwipe() {
      if (touchEndX < touchStartX) {
        productGrid.scrollBy({ left: 200, behavior: 'smooth' });
      }
      if (touchEndX > touchStartX) {
        productGrid.scrollBy({ left: -200, behavior: 'smooth' });
      }
    }
  }

  // Wishlist functionality
  const wishlistButtons = document.querySelectorAll('.btn-wishlist');
  
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.textContent = this.textContent === '♡' ? '♥' : '♡';
      this.style.color = this.textContent === '♥' ? 'red' : 'var(--baby-pink)';
      
      // Add your wishlist logic here
      const productName = this.closest('.product-card').querySelector('h3').textContent;
      console.log(`${productName} ${this.textContent === '♥' ? 'added to' : 'removed from'} wishlist`);
    });
  });

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('.price').textContent;
      
      // Animation
      this.textContent = 'Added!';
      this.style.backgroundColor = 'var(--gold)';
      
      setTimeout(() => {
        this.textContent = 'Add to Cart';
        this.style.backgroundColor = 'var(--baby-pink)';
      }, 2000);
      
      console.log(`Added ${productName} (${productPrice}) to cart`);
    });
  });
});
// About Page Animations
document.addEventListener('DOMContentLoaded', function() {
  // Team member hover effects
  const teamMembers = document.querySelectorAll('.team-member');
  teamMembers.forEach(member => {
    member.addEventListener('mouseenter', function() {
      this.querySelector('img').style.transform = 'scale(1.05)';
      this.querySelector('img').style.borderColor = 'var(--gold)';
    });
    
    member.addEventListener('mouseleave', function() {
      this.querySelector('img').style.transform = 'scale(1)';
      this.querySelector('img').style.borderColor = 'var(--baby-pink)';
    });
  });

  // Brand cards interaction
  const brandCards = document.querySelectorAll('.brand-card');
  brandCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.classList.contains('btn-view-products')) {
        const brandName = this.querySelector('h2').textContent;
        console.log(`Viewing all products from ${brandName}`);
        // window.location.href = `/brands/${brandName.toLowerCase().replace(/\s+/g, '-')}`;
      }
    });
  });

  // View Products button effects
  const brandButtons = document.querySelectorAll('.btn-view-products');
  brandButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});
// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchQuery = this.querySelector('input[name="q"]').value.trim();
            if (searchQuery) {
                window.location.href = `/search/?q=${encodeURIComponent(searchQuery)}`;
            }
        });
    }
    
    // Highlight search term if coming from search
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('q');
    if (searchTerm) {
        highlightSearchTerms(searchTerm);
    }
});

function highlightSearchTerms(term) {
    const productCards = document.querySelectorAll('.product-card h3, .product-card p');
    const regex = new RegExp(term, 'gi');
    
    productCards.forEach(card => {
        const html = card.innerHTML;
        const highlighted = html.replace(regex, match => 
            `<span class="highlight">${match}</span>`);
        card.innerHTML = highlighted;
    });
}