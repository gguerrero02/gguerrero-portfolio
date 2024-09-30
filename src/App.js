import logo from './logo.svg';
import menu_icon from './menu_icon.svg'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <a className="App-link">About</a>
        <a className="App-link">Projects</a>
        <a className="App-link">Contact</a>
      </header>
      <div className="Menu-button">
        <button type="button">
        <svg className="Menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104.1 81.08">

            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <line class="cls-1" x1="5.5" y1="5.5" x2="98.6" y2="5.5"/>
                <line class="cls-1" x1="5.5" y1="40.54" x2="98.6" y2="40.54"/>
                <line class="cls-1" x1="5.5" y1="75.58" x2="98.6" y2="75.58"/>
              </g>
            </g>
          </svg>
        </button>
      </div>
      <div className="App-body">
        <h1>Garrett Guerrero</h1>
        <p> I'm a born and raised Texan that recently moved to New York. 
            At my core, I love to create. Throughout my life I have always had hobbies where
            I am creating something new out of nothing. Knitting, crochet, woodworking, cooking - 
            all of these were outlets for me to put pieces of my mind into the zeitgeist, 
            and programming is no different. 
            
            Front-end development gives me the opportunity to mix two beautiful things, design and logic.
            I may just be getting my career started, but I strive to create user interfaces that capture 
            the very essence of the program while being intuitive, clean, and pleasing to the eye. Please 
            scroll and take a look at some of the projects I have helped bring to life. </p>
      </div>
    </div>
  );
}

export default App;
