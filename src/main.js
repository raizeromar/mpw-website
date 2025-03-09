import './style.css'
import javascriptLogo from './logo.jpg'
import viteLogo from './gatara-logo.svg'
import Navigo from 'navigo'
import { NewsletterPage } from './pages/newsletter'

const router = new Navigo('/')

function render(content) {
  document.querySelector('#app').innerHTML = content
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
    <button onclick="window.location.href='/newsletter'">Subscribe to Newsletter</button>
  </div>
`

router
  .on('/', () => {
    render(homePage)
  })
  .on('/newsletter', () => {
    render(NewsletterPage())
  })
  .resolve()

// Handle form submission
document.addEventListener('submit', (e) => {
  if (e.target.id === 'newsletter-form') {
    e.preventDefault()
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      city: e.target.city.value,
      state: e.target.state.value,
      userType: e.target.userType.value
    }
    // Here you would typically send this to your backend
    console.log('Newsletter subscription:', formData)
    alert('Thanks for subscribing! We\'ll be in touch soon.')
    router.navigate('/')
  }
})