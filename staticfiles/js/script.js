window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scrollIndicator").style.width = scrolled + "%";
};

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
document.addEventListener('DOMContentLoaded', function() {
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

  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      console.log('Navigating to category:', this.querySelector('h2').textContent);
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
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

    const button = this.querySelector('button');
    if (button) {
      button.addEventListener('click', function(e) {
        e.stopPropagation();
        const productName = card.querySelector('h2').textContent;
        const productPrice = card.querySelector('.price').textContent;
        
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

  productCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.tagName !== 'BUTTON') {
        const productName = this.querySelector('h2').textContent;
        console.log('Viewing details for:', productName);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
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

  const buyButton = document.querySelector('.product-info button');
  if (buyButton) {
    buyButton.addEventListener('click', function() {
      const productName = document.querySelector('.product-info h1').textContent;
      const productPrice = document.querySelector('.price').textContent;
      
      this.textContent = 'Added to Cart!';
      this.style.background = 'linear-gradient(45deg, var(--gold), var(--baby-pink))';
      
      setTimeout(() => {
        this.textContent = 'Buy Now';
        this.style.background = 'linear-gradient(45deg, var(--baby-pink), var(--gold))';
      }, 2000);
      
      console.log(`Purchased ${productName} (${productPrice})`);
    });
  }

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

document.addEventListener('DOMContentLoaded', function() {
  const productGrid = document.querySelector('.products-grid');
  
  if (productGrid) {
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

  const wishlistButtons = document.querySelectorAll('.btn-wishlist');
  
  wishlistButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.textContent = this.textContent === '♡' ? '♥' : '♡';
      this.style.color = this.textContent === '♥' ? 'red' : 'var(--baby-pink)';
      
      const productName = this.closest('.product-card').querySelector('h3').textContent;
      console.log(`${productName} ${this.textContent === '♥' ? 'added to' : 'removed from'} wishlist`);
    });
  });

  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('.price').textContent;
      
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
document.addEventListener('DOMContentLoaded', function() {
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

  const brandCards = document.querySelectorAll('.brand-card');
  brandCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.classList.contains('btn-view-products')) {
        const brandName = this.querySelector('h2').textContent;
        console.log(`Viewing all products from ${brandName}`);
      }
    });
  });

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

document.addEventListener('DOMContentLoaded', function() {
  const categoryCards = document.querySelectorAll('.category-card');
  const navButtons = document.querySelectorAll('.categories-nav button');
  
  if (categoryCards.length > 0) {
    categoryCards[0].classList.add('active');
    if (navButtons.length > 0) navButtons[0].classList.add('active');
    
    navButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetIndex = this.getAttribute('data-target');
        
        categoryCards.forEach(card => card.classList.remove('active'));
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        categoryCards[targetIndex].classList.add('active');
        this.classList.add('active');
      });
    });
  }

  const allCards = document.querySelectorAll('.category-card, .product-card');
  allCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

  const buttons = document.querySelectorAll('.btn, .btn-add-to-cart, .btn-wishlist');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const originalText = this.textContent;
      const originalBg = this.style.background;
      
      this.textContent = 'Added!';
      this.style.background = 'var(--gold)';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = originalBg;
      }, 1500);
    });
  });
});
confetti({
  particleCount: 150,
  spread: 100,
  colors: ['#ff69b4', '#ffd700', '#ffffff'], 
});


document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
    alert('Product added to cart!');
});








document.addEventListener('DOMContentLoaded', function() {
  // Scroll progress indicator
  const scrollIndicator = document.createElement('div');
  scrollIndicator.id = 'scrollIndicator';
  scrollIndicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(to right, #ffb6c1, #ffd700);
    width: 0%;
    z-index: 1000;
    transition: width 0.1s ease;
  `;
  document.body.prepend(scrollIndicator);
  
  window.onscroll = function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollIndicator.style.width = scrolled + "%";
  };

  // Create floating elements
  const floatingContainer = document.createElement('div');
  floatingContainer.className = 'floating-elements';
  document.querySelector('.brands-section').appendChild(floatingContainer);
  
  for (let i = 0; i < 8; i++) {
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
      opacity: ${Math.random() * 0.2 + 0.05};
    `;
    floatingContainer.appendChild(floatingElement);
  }

  // Brand card animations
  const brandCards = document.querySelectorAll('.brand-card');
  
  brandCards.forEach((card, index) => {
    // Initial styling for staggered animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
    
    // Add hover effects
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px) rotateX(5deg)';
      this.style.boxShadow = '0 20px 50px rgba(255, 182, 193, 0.3)';
      
      // Logo bounce effect
      const logo = this.querySelector('.brand-logo');
      if (logo) {
        logo.style.transform = 'scale(1.1)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateX(0)';
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
      
      // Logo reset
      const logo = this.querySelector('.brand-logo');
      if (logo) {
        logo.style.transform = 'scale(1)';
      }
    });
    
    // Click effect
    card.addEventListener('click', function() {
      this.style.transform = 'translateY(-5px) scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'translateY(-15px) rotateX(5deg)';
      }, 200);
    });
  });

  // Button ripple effect
  const buttons = document.querySelectorAll('.btn-view-products, .btn-contact');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Ripple effect
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // For demo purposes - in real app this would navigate
      console.log(`Navigating to ${this.textContent.trim()} page`);
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // If it's a brand card, add a slight delay between each
        if (entry.target.classList.contains('brand-card')) {
          const index = Array.from(brandCards).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all animateable elements
  document.querySelectorAll('.brand-card, .section-header, .brand-cta').forEach(el => {
    observer.observe(el);
  });
  
  // Confetti effect for special actions
  window.celebrate = function() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffb6c1', '#ffd700', '#ffffff']
    });
  };
});

// Optional: If you want to add a "Back to Top" button
function initBackToTop() {
  const backToTop = document.createElement('button');
  backToTop.id = 'backToTop';
  backToTop.innerHTML = '↑';
  backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(to right, #ffb6c1, #ffd700);
    color: white;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(255, 182, 193, 0.4);
    z-index: 999;
  `;
  document.body.appendChild(backToTop);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });
  
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initBackToTop);