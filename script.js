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
