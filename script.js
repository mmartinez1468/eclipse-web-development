///////////////// PRE LOADER /////////////////
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    
    loader.classList.add('loaderHidden');
  
    loader.addEventListener('transitioned', () => {
      document.body.removeChild('loader');
    })
  })

///////////////// OPENS MENU /////////////////
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
  
    toggle.addEventListener('click', () => {
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
  
        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
  }
  showMenu('nav-toggle', 'nav-menu')
  
  ///////////////// MOBILE DROPDOWN HANDLING /////////////////
  document.addEventListener('DOMContentLoaded', function() {
    // Get all dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown__item');
    
    // Check if we're on mobile
    const isMobile = () => window.innerWidth <= 1118;
    
    // Function to handle dropdown clicks on mobile
    const handleDropdownClick = function(e) {
      if (!isMobile()) return; // Only apply on mobile
      
      // Prevent the click from bubbling up
      e.stopPropagation();
      
      // Toggle dropdown menu visibility with a class
      const dropdownMenu = this.querySelector('.dropdown__menu');
      
      // Check if this dropdown is already open
      const isOpen = dropdownMenu.classList.contains('dropdown-active');
      
      // First close all open dropdowns
      document.querySelectorAll('.dropdown-active').forEach(menu => {
        menu.classList.remove('dropdown-active');
        menu.style.maxHeight = '0px';
      });
      
      // Toggle the clicked dropdown
      if (!isOpen) {
        dropdownMenu.classList.add('dropdown-active');
        dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
      }
    };
    
    // Function to handle subdropdown clicks on mobile
    const handleSubdropdownClick = function(e) {
      if (!isMobile()) return; // Only apply on mobile
      
      // Prevent the click from bubbling up
      e.stopPropagation();
      
      // Toggle subdropdown menu visibility
      const subdropdownMenu = this.querySelector('.dropdown__submenu');
      
      // Check if this subdropdown is already open
      const isSubOpen = subdropdownMenu.classList.contains('dropdown-active');
      
      // Toggle the clicked subdropdown
      if (!isSubOpen) {
        subdropdownMenu.classList.add('dropdown-active');
        subdropdownMenu.style.maxHeight = subdropdownMenu.scrollHeight + 'px';
      } else {
        subdropdownMenu.classList.remove('dropdown-active');
        subdropdownMenu.style.maxHeight = '0px';
      }
    };
    
    // Add click event listeners to dropdown items
    dropdownItems.forEach(item => {
      const dropdownLink = item.querySelector('.nav__link');
      if (dropdownLink) {
        dropdownLink.addEventListener('click', handleDropdownClick.bind(item));
      }
      
      // Handle subitem clicks
      const subItems = item.querySelectorAll('.dropdown__subitem');
      subItems.forEach(subItem => {
        const subLink = subItem.querySelector('.dropdown__link');
        if (subLink) {
          subLink.addEventListener('click', handleSubdropdownClick.bind(subItem));
        }
      });
    });
    
    // Reset mobile-specific styles when resizing to desktop
    window.addEventListener('resize', function() {
      if (!isMobile()) {
        document.querySelectorAll('.dropdown-active').forEach(menu => {
          menu.classList.remove('dropdown-active');
          menu.style.maxHeight = '';
        });
      }
    });
  });














  document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on mobile viewport
    if (window.innerWidth <= 768) {
        const landingIntro = document.querySelector('.landing-intro');
        const paragraph = landingIntro.querySelector('p');
        
        // Create the Read More button
        const readMoreBtn = document.createElement('button');
        readMoreBtn.className = 'read-more-btn';
        readMoreBtn.textContent = 'Read More';
        
        // Insert the button after the paragraph
        landingIntro.insertBefore(readMoreBtn, paragraph.nextSibling);
        
        // Function to toggle expanded state
        function toggleExpanded() {
            paragraph.classList.toggle('expanded');
            
            if (paragraph.classList.contains('expanded')) {
                readMoreBtn.textContent = 'Read Less';
            } else {
                readMoreBtn.textContent = 'Read More';
            }
        }
        
        // Add click event to paragraph
        paragraph.addEventListener('click', function(e) {
            // Only toggle if not already expanded
            if (!paragraph.classList.contains('expanded')) {
                toggleExpanded();
            }
        });
        
        // Add click event to Read More button
        readMoreBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the paragraph click event from firing
            toggleExpanded();
        });
    }
});

// Optional: Handle resize events to add/remove functionality based on viewport width
window.addEventListener('resize', function() {
    const landingIntro = document.querySelector('.landing-intro');
    const paragraph = landingIntro.querySelector('p');
    let readMoreBtn = landingIntro.querySelector('.read-more-btn');
    
    if (window.innerWidth <= 768) {
        // Add functionality for mobile if resized from desktop
        if (!readMoreBtn) {
            readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.textContent = 'Read More';
            
            landingIntro.insertBefore(readMoreBtn, paragraph.nextSibling);
            
            // Function to toggle expanded state
            function toggleExpanded() {
                paragraph.classList.toggle('expanded');
                
                if (paragraph.classList.contains('expanded')) {
                    readMoreBtn.textContent = 'Read Less';
                } else {
                    readMoreBtn.textContent = 'Read More';
                }
            }
            
            // Add click event to paragraph
            paragraph.addEventListener('click', function(e) {
                // Only toggle if not already expanded
                if (!paragraph.classList.contains('expanded')) {
                    toggleExpanded();
                }
            });
            
            // Add click event to Read More button
            readMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent the paragraph click from firing
                toggleExpanded();
            });
        }
    } else {
        // Remove functionality for desktop
        if (readMoreBtn) {
            readMoreBtn.remove();
        }
        // Remove expanded class and click event for desktop
        paragraph.classList.remove('expanded');
        paragraph.style.cursor = 'default';
    }
});






















document.addEventListener('DOMContentLoaded', function() {
  const spaceBackground = document.getElementById('space-background');
  const starCount = 250; // Number of stars
  const starLayers = 3; // Different layers for parallax effect
  const stars = [];
  
  // Star appearance variations
  const starSizes = ['star-tiny', 'star-small', 'star-medium', 'star-large'];
  const starColors = ['', 'star-blue', 'star-yellow']; // Empty string for default white
  
  // Create initial star field
  for (let i = 0; i < starCount; i++) {
    createStar();
  }
  
  // Animation function
  function animateStars() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      
      // Move stars from left to right (at a slower pace)
      star.x += star.speed;
      
      // Add very slight vertical variation for 3D effect (reduced from original)
      star.y += (Math.sin(star.x / 200) * star.layer * 0.05);
      
      // Reset star if it goes off screen to the right
      if (star.x > width + 20) {
        star.x = -20; // Place just off-screen to the left
        star.y = Math.random() * height; // Random height
      }
      
      // Update star position on screen
      star.element.style.left = `${star.x}px`;
      star.element.style.top = `${star.y}px`;
      
      // Stars stay fully visible
      star.element.style.opacity = 1;
    }
    
    requestAnimationFrame(animateStars);
  }
  
  // Create a new star
  function createStar() {
    const starElement = document.createElement('div');
    starElement.className = 'star';
    
    // Randomly select star size
    const sizeClass = starSizes[Math.floor(Math.random() * starSizes.length)];
    starElement.classList.add(sizeClass);
    
    // Randomly select star color (with more weight to white)
    if (Math.random() > 0.7) {
      const colorClass = starColors[Math.floor(Math.random() * starColors.length)];
      if (colorClass) {
        starElement.classList.add(colorClass);
      }
    }
    
    // Initial position - distributed across the screen
    // Start from left side of the screen
    const x = Math.random() * window.innerWidth - window.innerWidth; // Start from left (off-screen)
    const y = Math.random() * window.innerHeight; // Random vertical position
    
    // Determine speed based on size/layer (for 3D effect)
    // REDUCED SPEEDS by ~60% for all star sizes
    const layer = Math.floor(Math.random() * starLayers);
    let speed;
    
    switch (sizeClass) {
      case 'star-tiny':
        speed = 0.2 + Math.random() * 0.2; // Slowest stars (appear furthest)
        break;
      case 'star-small':
        speed = 0.3 + Math.random() * 0.3;
        break;
      case 'star-medium':
        speed = 0.5 + Math.random() * 0.5;
        break;
      case 'star-large':
        speed = 0.7 + Math.random() * 0.6; // Fastest stars (appear closest)
        break;
      default:
        speed = 0.4 + Math.random() * 0.3;
    }
    
    // Adjust for layer - reduced for slower movement
    speed += layer * 0.2;
    
    // Create star object with all properties
    const star = {
      element: starElement,
      x: x,
      y: y,
      speed: speed,
      layer: layer
    };
    
    // Set stars to be fully visible
    starElement.style.opacity = 1;
    
    // Add to DOM and star array
    spaceBackground.appendChild(starElement);
    stars.push(star);
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    // No special handling needed; stars will naturally adjust as they move
  });
  
  // Start animation
  animateStars();
});















