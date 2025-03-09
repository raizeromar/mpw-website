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
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = {
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        email: e.target.email.value,
        city: e.target.city.value,
        state: e.target.state.value,
        userType: e.target.userType.value
      };
      // Here you would typically send this to your backend
      console.log('Newsletter subscription:', formData);
      alert('Thanks for subscribing! We\'ll be in touch soon.');
      render(homePage);
    });
  }
}

router
  .on('/', () => {
    render(homePage);
  })
  .resolve();