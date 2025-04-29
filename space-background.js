// Add this script tag at the end of your body element
document.addEventListener('DOMContentLoaded', function() {
    // Make sure the space-background div exists
    let spaceBackground = document.getElementById('space-background');
    
    // If it doesn't exist, create it
    if (!spaceBackground) {
      console.log('Creating space-background div');
      spaceBackground = document.createElement('div');
      spaceBackground.id = 'space-background';
      spaceBackground.style.position = 'fixed';
      spaceBackground.style.top = '0';
      spaceBackground.style.left = '0';
      spaceBackground.style.width = '100%';
      spaceBackground.style.height = '100%';
      spaceBackground.style.zIndex = '-1';
      spaceBackground.style.backgroundColor = '#000000';
      spaceBackground.style.overflow = 'hidden';
      document.body.insertBefore(spaceBackground, document.body.firstChild);
    }
    
    const starCount = 250; // Number of stars
    const starLayers = 3; // Different layers for parallax effect
    const stars = [];
    
    // Star appearance variations
    const starSizes = ['star-tiny', 'star-small', 'star-medium', 'star-large'];
    const starColors = ['', 'star-blue', 'star-yellow']; // Empty string for default white
    
    // Make sure the star CSS classes exist
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .star {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        opacity: 1;
      }
      .star-tiny {
        width: 1px;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.3);
      }
      .star-small {
        width: 2px;
        height: 2px;
        background-color: rgba(255, 255, 255, 0.4);
      }
      .star-medium {
        width: 3px;
        height: 3px;
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 3px 1px rgba(255, 255, 255, 0.2);
      }
      .star-large {
        width: 4px;
        height: 4px;
        background-color: rgba(255, 255, 255, 0.6);
        box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.3);
      }
      .star-blue {
        background-color: rgba(240, 248, 255, 0.5);
        box-shadow: 0 0 6px 2px rgba(135, 206, 235, 0.2);
      }
      .star-yellow {
        background-color: rgba(255, 250, 250, 0.5);
        box-shadow: 0 0 6px 2px rgba(255, 255, 224, 0.2);
      }
    `;
    document.head.appendChild(styleElement);
    
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
        
        // Add very slight vertical variation for 3D effect
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
        star.element.style.opacity = '1';
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
      const x = Math.random() * window.innerWidth - window.innerWidth; // Start from left (off-screen)
      const y = Math.random() * window.innerHeight; // Random vertical position
      
      // Determine speed based on size/layer (for 3D effect)
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
      
      // Adjust for layer
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
      starElement.style.opacity = '1';
      
      // Add to DOM and star array
      spaceBackground.appendChild(starElement);
      stars.push(star);
    }
    
    // Start animation
    animateStars();
    
    // Log that the animation has started
    console.log('Space background animation started');
  });