import './style.css'
import javascriptLogo from './logo.jpg'
import viteLogo from './gatara-logo.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://gatara.org" target="_blank">
      <img src="${viteLogo}" class="logo" alt="" />
    </a>
    <a href="/" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="" style="border-radius: 3rem;"/>
    </a>
    <h1>Omar Gatara</h1>
    <p class="read-the-docs">
      My Personal website is comming soon, stay toned!
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
