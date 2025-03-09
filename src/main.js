import './style.css';
import javascriptLogo from './logo.jpg';
import viteLogo from './gatara-logo.svg';
import Navigo from 'navigo';

const router = new Navigo('/');

function render(content) {
  document.querySelector('#app').innerHTML = content;
  // Attach event listeners after rendering
  attachEventListeners();
}

const homePage = `
  <div>
    <a href="https://gatara.org" target="_blank">
      <img src="${viteLogo}" class="logo" alt="" />
    </a>
    <a href="/" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="" style="border-radius: 3rem;"/>
    </a>
    <h1>Omar Gatara</h1>
    <p class="read-the-docs">
      My Personal website is coming soon, stay tuned!
    </p>
    <button id="subscribe-btn">Subscribe to Newsletter</button>
  </div>
`;

const NewsletterPage = () => {
  return `
    <div>
      <button id="close-btn" style="position: absolute; top: 10px; right: 10px;">X</button>
      <h1>Subscribe to My Newsletter</h1>
      <p class="read-the-docs">
        Stay updated with the latest AI developments, breakthrough models, and practical implementations. 
        Get curated insights on AI tools, APIs, and innovations that matter for developers and business leaders.
      </p>
      <form id="newsletter-form" class="newsletter-form">
        <div class="form-row">
          <input 
            type="text" 
            id="firstName" 
            placeholder="First Name" 
            required
          />
          <input 
            type="text" 
            id="lastName" 
            placeholder="Last Name" 
            required
          />
        </div>
        <div class="form-row">
          <input 
            type="text" 
            id="city" 
            placeholder="City" 
            required
          />
          <input 
            type="text" 
            id="state" 
            placeholder="State/Province" 
            required
          />
        </div>
        <input 
          type="email" 
          id="email" 
          placeholder="Email Address" 
          required
        />
        
        <div class="radio-group">
          <h3>What best describes you?</h3>
          
          <label class="radio-label">
            <input type="radio" name="userType" value="developer" required>
            I'm a developer looking to stay updated on AI advancements and implementation
          </label>
          
          <label class="radio-label">
            <input type="radio" name="userType" value="business">
            I'm a CEO/Manager seeking AI insights for product integration
          </label>
          
          <label class="radio-label">
            <input type="radio" name="userType" value="researcher">
            I'm a researcher/ML engineer working on AI projects
          </label>
          
          <label class="radio-label">
            <input type="radio" name="userType" value="startup">
            I'm a startup founder building AI-powered solutions
          </label>
          
          <label class="radio-label">
            <input type="radio" name="userType" value="enthusiast">
            I'm an AI enthusiast following the latest developments
          </label>
        </div>

        <button type="submit">Subscribe to AI Updates</button>
      </form>
    </div>
  `;
};

// Function to attach event listeners
function attachEventListeners() {
  // Attach subscribe button listener
  const subscribeButton = document.getElementById('subscribe-btn');
  if (subscribeButton) {
    subscribeButton.addEventListener('click', () => {
      render(NewsletterPage());
    });
  }

  // Attach close button listener
  const closeButton = document.getElementById('close-btn');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      render(homePage);
    });
  }

  // Attach form submission listener
  document.getElementById('newsletter-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Create and show the popup with the card and loader
    const popup = createPopup(`
      <div class="banter-loader">
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
        <div class="banter-loader__box"></div>
      </div>
    `);

    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      city: e.target.city.value,
      state: e.target.state.value,
      userType: e.target.userType.value
    };

    try {
      // Construct the URL with query parameters
      const url = new URL('https://script.google.com/macros/s/AKfycbwusUJIl5YtuYo6ixWxRoQiE4R63-AYUrUSnGr8JO5UV3JaQ8Xw5OsOwUSVvTkgI2ss3g/exec');
      url.search = new URLSearchParams(formData).toString();

      // Send a GET request
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow' // Follow redirects (required for Google Apps Script)
      });

      if (response.ok) {
        // Replace the loader with a success message
        popup.querySelector('.card-image').innerHTML = `
          <div class="success-message">
            <p>Thanks for subscribing! Stay tuned...</p>
          </div>
        `;
        setTimeout(() => {
          closePopup(popup);
          render(homePage);
        }, 3000); // Close the popup and render the home page after 3 seconds
      } else {
        // Replace the loader with a failure message
        popup.querySelector('.card-image').innerHTML = `
          <div class="error-message">
            <p>Something went wrong. Please try again.</p>
          </div>
        `;
        setTimeout(() => {
          closePopup(popup);
        }, 3000); // Close the popup after 3 seconds
      }
    } catch (error) {
      console.error('Error:', error);
      // Replace the loader with a failure message
      popup.querySelector('.card-image').innerHTML = `
        <div class="error-message">
          <p>Failed to submit the form. Please try again.</p>
        </div>
      `;
      setTimeout(() => {
        closePopup(popup);
      }, 3000); // Close the popup after 3 seconds
    }
  });
}

// Function to create a popup
function createPopup(content) {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = `
    <div class="card">
      <div class="card-content">
        <div class="card-top">
        </div>
        <div class="card-bottom">
        </div>
      </div>
      <div class="card-image">
        ${content} <!-- Loader or message will go here -->
      </div>
    </div>
  `;
  document.body.appendChild(popup);
  return popup;
}

// Function to close the popup
function closePopup(popup) {
  document.body.removeChild(popup);
}

// Router setup
router
  .on('/', () => {
    render(homePage);
  })
  .resolve();