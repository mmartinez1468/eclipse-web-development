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














  // Reusable function to add read-more functionality to any text container
function addReadMoreButton(containerSelector, paragraphSelector = 'p', breakpoint = 768) {
  document.addEventListener('DOMContentLoaded', function() {
    // Get all matching containers
    const containers = document.querySelectorAll(containerSelector);
    
    containers.forEach(container => {
      const paragraph = paragraphSelector === 'p' ? 
                        container.querySelector('p') : 
                        container.querySelector(paragraphSelector);
      
      if (!paragraph) return; // Skip if no paragraph found
      
      // Create and configure read-more button only on mobile
      if (window.innerWidth <= breakpoint) {
        setupReadMore(container, paragraph);
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
      containers.forEach(container => {
        const paragraph = paragraphSelector === 'p' ? 
                          container.querySelector('p') : 
                          container.querySelector(paragraphSelector);
        
        if (!paragraph) return;
        
        const existingBtn = container.querySelector('.read-more-btn');
        
        if (window.innerWidth <= breakpoint) {
          // Add button if it doesn't exist
          if (!existingBtn) {
            setupReadMore(container, paragraph);
          }
        } else {
          // Remove button on larger screens
          if (existingBtn) {
            existingBtn.remove();
            paragraph.classList.remove('expanded');
          }
        }
      });
    });
  });
  
  // Helper function to set up the read more button
  function setupReadMore(container, paragraph) {
    // Don't add duplicate buttons
    if (container.querySelector('.read-more-btn')) return;
    
    // Create the Read More button
    const readMoreBtn = document.createElement('button');
    readMoreBtn.className = 'read-more-btn';
    readMoreBtn.textContent = '<';
    
    // Insert the button after the paragraph
    container.insertBefore(readMoreBtn, paragraph.nextSibling);
    
    // Function to toggle expanded state
    function toggleExpanded() {
      paragraph.classList.toggle('expanded');
      readMoreBtn.textContent = paragraph.classList.contains('expanded') ? 
                               '>' : '<';
    }
    
    // Add click event to paragraph for easier mobile UX
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
}

// Updated setupReadMore function
function setupReadMore(container, paragraph) {
  // Don't add duplicate buttons
  if (container.querySelector('.read-more-btn')) return;
  
  // Create the Read More button
  const readMoreBtn = document.createElement('button');
  readMoreBtn.className = 'read-more-btn';
  readMoreBtn.textContent = '<';
  
  // Insert the button after the paragraph
  container.insertBefore(readMoreBtn, paragraph.nextSibling);
  
  // Function to toggle expanded state
  function toggleExpanded() {
    paragraph.classList.toggle('expanded');
    readMoreBtn.classList.toggle('expanded');
    // No need to change text content, we'll use CSS rotation instead
  }
  
  // Add click event to paragraph for easier mobile UX
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

// Apply to your landing intro
addReadMoreButton('.landing-intro');

// Apply to your mission section
addReadMoreButton('.mission-text');

addReadMoreButton('.skillsAbout');

addReadMoreButton('.page-links-intro');

addReadMoreButton('.team-intro');

// You can easily add more sections by calling the function again
// addReadMoreButton('.any-other-section');
// addReadMoreButton('.another-section', '.custom-paragraph-class', 1024); // Custom paragraph selector and breakpoint





















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







































// Default text to display
const defaultText = "Welcome to our site. We create amazing experiences for our customers.";
        
// Function to animate all text in an element
function animateElement(element) {
    // Store original text
    const originalText = element.textContent || defaultText;
    
    // Clear the element
    element.innerHTML = '';
    
    // Split the text into words
    const words = originalText.split(' ');
    
    let delay = 0;
    
    // Process each word
    words.forEach((word, wordIndex) => {
        // Create a word container to keep letters together
        const wordContainer = document.createElement('span');
        wordContainer.className = 'word';
        wordContainer.style.display = 'inline-block';
        wordContainer.style.marginRight = '0.25em'; // Space between words
        
        // Add each letter of the word
        for (let i = 0; i < word.length; i++) {
            const span = document.createElement('span');
            span.textContent = word[i];
            span.className = 'letter';
            
            // Set the animation delay
            span.style.animationDelay = `${delay}s`;
            delay += 0.09;
            
            wordContainer.appendChild(span);
        }
        
        // Add the word to the element
        element.appendChild(wordContainer);
    });
}

// Function to reset the animation
function resetAnimation() {
    const typewriter = document.getElementById('typewriter');
    
    // Store the original text
    const originalText = typewriter.innerText || defaultText;
    
    // Reset the element
    typewriter.innerHTML = '';
    
    // Re-animate after a short delay
    setTimeout(() => {
        typewriter.textContent = originalText;
        animateElement(typewriter);
    }, 100);
}

// Run the animation on page load
document.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.getElementById('typewriter');
    animateElement(typewriter);
});




































