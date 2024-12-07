import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from "react-swipeable";
import './App.css';
import profileImage from './assets/portrait.JPG';


function DogLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 192.24 243.89" className="Dog-logo">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path className="cls-1" d="M.14,169.28c31.43-1.1,49.65-8.67,66.58-30.54S97.8,67.61,93.92,40.23c-.18-1.27-.47-2.67-1.51-3.42-2-1.42-4.6.58-5.93,2.6a26.8,26.8,0,0,0-4.33,16.88,11.46,11.46,0,0,0,2.33,6.64c2.07,2.38,5.4,3.14,8.52,3.62a99.58,99.58,0,0,0,22.09.94c4.31-.29,8.79-.93,12.35-3.38,4.42-3,6.68-8.27,8.45-13.31,5.76-16.41,8.66-33.65,11.53-50.8,7.06,50.76,8.28,123.77-.86,174.19-1.36,7.49-3,15-6.14,21.92-9.8,22-33.52,36.19-57.59,37.61s-49.28-6-67.48-21.82c-5.2-4.53-8.89-10.87-11.77-18.52a55.77,55.77,0,0,1-3-27.85c1.64-10.94,4.61-22.15,12.65-29.74,6.08-5.74,14-9.11,21.86-12,19.46-7,40.08-11.6,60.75-10.61,29.42,1.41,57.63,11.51,86.37,17.93"/>
          <path className="cls-1" d="M113.5,90.16a60.47,60.47,0,0,0-2.73,9.9"/>
          <path className="cls-1" d="M130.24,87.07a66.14,66.14,0,0,0-3.85,15.22"/>
        </g>
      </g>
    </svg>
  )
}

function MenuButton({ toggleSidebar }) {
  return (
    <div className="Menu-button">
      <button type="button" onClick={toggleSidebar}>
        <svg className="Menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104.1 81.08">
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <line className="cls-1" x1="5.5" y1="5.5" x2="98.6" y2="5.5"/>
              <line className="cls-1" x1="5.5" y1="40.54" x2="98.6" y2="40.54"/>
              <line className="cls-1" x1="5.5" y1="75.58" x2="98.6" y2="75.58"/>
            </g>
          </g>
        </svg>
      </button>
    </div>
  )
};

function Sidebar({ activeSection, toggleSidebar }) {
  return (
    <div className="Sidebar">
      <a className={`nav-link ${activeSection === 'dog' ? 'active-link':''}`} href="#about"><DogLogo/></a>
      <a className={`nav-link ${activeSection === 'about' ? 'active-link':''}`} href="#about">About</a>
      <a className={`nav-link ${activeSection === 'projects' ? 'active-link':''}`} href="#projects">Projects</a>
      <a className={`nav-link ${activeSection === 'contact' ? 'active-link':''}`} href="#contact">Contact</a>
    </div>
  );
}

function Navbar({ activeSelection }) {
  return (
    <nav className="App-header">
      <DogLogo/>
    
      <a
        className={`App-link ${activeSelection === 'about' ? 'active-link':''}`} // Use activeSelection here
        href="#about"
      >
        About
      </a>
      <a
        className={`App-link ${activeSelection === 'projects' ? 'active-link':''}`} // Use activeSelection here
        href="#projects"
      >
        Projects
      </a>
      <a
        className={`App-link ${activeSelection === 'contact' ? 'active-link':''}`} // Use activeSelection here
        href="#contact"
      >
        Contact
      </a>
    </nav>
  )
}

function importAllImages(r) {
  return r.keys().map(r);
}

const loadImagesWithDescriptions = () => {
  const descriptions = require('./assets/project_images/descriptions.json');
  // console.log(JSON.stringify(descriptions, null, 2));

  // Helper to organize files into projects and subfolders
  const importImagesRecursively = (context) => {
    const projects = {};

    context.keys().forEach((filePath, index) => {  // 'index' is the loop iteration number
      const pathParts = filePath.replace('./', '').split('/');
      const projectName = pathParts[0];  // This will give you the project name
      const subFolder = pathParts.length > 2 ? pathParts[1]:'root';  // Second-level folder or 'root'
      const fileName = pathParts[pathParts.length - 1];  // The file name
      
      // Initialize the project if it doesn't exist
      if (!projects[projectName]) {
        // Use 'index' to fetch the project description from descriptions.projects
        const projectDescription = descriptions.projects[index]?.[projectName]?.description || 'No project description available';
        
        projects[projectName] = {
          description:projectDescription,
          subFolders:{}
        };
      }


      // console.log(project + JSON.stringify(descriptions.projects[project]), null, 2))z

      // Initialize the subfolder if it doesn't exist
      if (!projects[projectName].subFolders[subFolder]) {
        projects[projectName].subFolders[subFolder] = [];
      }

      // Add the image with metadata to the subfolder
      projects[projectName].subFolders[subFolder].push({
        src:context(filePath),
        name:fileName,
        description:descriptions[projectName]?.[subFolder]?.[fileName] || 'No description available',
      });
    });

    return projects;
  };

  // Statically include all images in the `project_images` directory and its subdirectories
  const projectFolders = require.context(
    './assets/project_images',
    true, // Recursively include subfolders
    /\.(png|jpe?g|svg)$/ // Match image file extensions
  );

  return importImagesRecursively(projectFolders);
};



const imgsWithDescs = loadImagesWithDescriptions();
// console.log(imgsWithDescs);
// const nightswipe_img = importAllImages(require.context('./assets/project_images/nightswipe', false, /\.(png|jpe?g|svg)$/));
// const il_img = importAllImages(require.context('./assets/project_images/infinite_library', false, /\.(png|jpe?g|svg)$/));


function Pictures({images}) {
  console.log(images);
  // State to keep track of the currently displayed image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle going to the previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1:prevIndex - 1
    );
  };

  // Function to handle going to the next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const swipeHandler = useSwipeable({
    onSwipedLeft:goToNext,
    onSwipedRight:goToPrevious,
    preventDefaultTouchmoveEvent:true,
    trackMouse:false,
  });

  return (
    <div className = "Pictures">
        

      <div className = "Pictures-image" {...swipeHandler}>
        {console.log("current src: ", images[currentIndex])}
        <img src={images[currentIndex]} alt="no pictures found"/>
      </div>
        

      <div className="Pictures-dots">
        <div className = "Pictures-button">
          <button onClick={goToPrevious}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 90 90">
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                        <path d="M41.5,1A40.5,40.5,0,1,1,1,41.5,40.55,40.55,0,0,1,41.5,1m0-1A41.5,41.5,0,1,0,83,41.5,41.5,41.5,0,0,0,41.5,0Z"/>
                        <polyline className="cls-1" points="52.12 55.79 23.62 41.5 52.12 27.21"/>
                    </g>
                </g>
            </svg>
          </button>
        </div>
        {images.map((_, index) => (
          <span
            key={index}
            style={{
              height: '15px',
              width: '15px',
              margin: '0 5px',
              backgroundColor: currentIndex === index ? '#17293A' : '#B0D7FF',
              borderRadius: '50%',
              display: 'inline-block'
            }}
          />
        ))}
        <div className = "Pictures-button">
          <button onClick={goToNext}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -5 90 90">
              <g id="Layer_2_1_">
                <g id="Layer_1-2">
                  <path d="M41.5,1C19.1,1,1,19.1,1,41.5S19.1,82,41.5,82S82,63.9,82,41.5C82,19.1,63.9,1,41.5,1 M41.5,0C64.4,0,83,18.6,83,41.5
                    S64.4,83,41.5,83S0,64.4,0,41.5S18.6,0,41.5,0z"/>
                  <polyline className="st0" points="30.9,55.8 59.4,41.5 30.9,27.2"/>
                </g>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function About( {sectionsRef}) {
  return (
    <div
      id="about"
      ref={(el) => (sectionsRef.current[0] = el)}
      className="App-intro"
    >
      <div className="Me">
        <div className="Rectangle">
          <div className="Dog-spacing">
            <svg className="dog-no-bones" xmlns="http://www.w3.org/2000/svg" viewBox="-5 -10 420 275">
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                  <path id="dawg" className="g" d="M.14,169.28c31.43-1.1,49.65-8.67,66.58-30.54S97.8,67.61,93.92,40.23c-.18-1.27-.47-2.67-1.51-3.42-2-1.42-4.6.58-5.93,2.6a26.8,26.8,0,0,0-4.33,16.88,11.46,11.46,0,0,0,2.33,6.64c2.07,2.38,5.4,3.14,8.52,3.62a99.58,99.58,0,0,0,22.09.94c4.31-.29,8.79-.93,12.35-3.38,4.42-3,6.68-8.27,8.45-13.31,5.76-16.41,8.66-33.65,11.53-50.8,7.06,50.76,8.28,123.77-.86,174.19-1.36,7.49-3,15-6.14,21.92-9.8,22-33.52,36.19-57.59,37.61s-49.28-6-67.48-21.82c-5.2-4.53-8.89-10.87-11.77-18.52a55.77,55.77,0,0,1-3-27.85c1.64-10.94,4.61-22.15,12.65-29.74,6.08-5.74,14-9.11,21.86-12,19.46-7,40.08-11.6,60.75-10.61,29.42,1.41,57.63,11.51,86.37,17.93,20.94,4.68,64.51,8.86,84.79,5.36,28.38-4.92,44-7.69,67.07-30.31C349,91.65,355.9,56,355.9,56c10,9.34,16.7,25.86,16.18,39.84"/>
                  <path id="dawg" className="eye-1" d="M113.5,90.16a60.47,60.47,0,0,0-2.73,9.9"/>
                  <path id="dawg" className="eye-2" d="M130.24,87.07a66.14,66.14,0,0,0-3.85,15.22"/>
                  <path id="dawg" className="paw-1" d="M170.93,199.51l-8.81,25.73a4.47,4.47,0,0,1-1.28,2.22,4.36,4.36,0,0,1-2.83.59c-3.34-.11-6.69-.5-10-.33a17,17,0,0,0-9.44,3c-2.67,2-4.45,5.43-3.86,8.72s4,6,7.27,5.29"/>
                  <path id="dawg" className="paw-2" d="M189,213.06l-5.28,25.21a5.23,5.23,0,0,1-1.32,2.95,5,5,0,0,1-2.48,1c-2.92.55-5.87,1-8.83,1.22-2.79.25-5.7.4-8.16,1.73s-4.33,4.29-3.41,6.93c.81,2.32,3.32,3.53,5.65,4.26a37.91,37.91,0,0,0,21.55.32c3.24-.92,6.9-3,6.82-6.41"/>
                  <path id="dawg" className="paw-3" d="M329.16,188.79c3,10.06,4,14.65,7.07,24.71a4.4,4.4,0,0,1,.21,2.87,4.51,4.51,0,0,1-2.52,2.1c-5.43,2.52-12.51,4.13-14.34,9.34a7.53,7.53,0,0,0,2.16,7.86,10.05,10.05,0,0,0,8.74,2.33"/>
                  <path id="dawg" className="paw-4" d="M349.27,193.11c5.11,11.92,7.62,18.63,12.73,30.56a1.63,1.63,0,0,1,.17,1.3,1.86,1.86,0,0,1-1.11.77c-3.24,1.1-6.89.45-10.39.45s-7.53,1.11-8.6,4a6.41,6.41,0,0,0,0,3.73,8.55,8.55,0,0,0,4.45,6c2.23,1,4.87.72,7.29.28a62.28,62.28,0,0,0,24.41-10"/>
                  <path id="dawg" className="arrett" d="M192.64,150.09c-2.79-3.64-8-2.29-11.12.76-5.87,5.76-7.53,16.55-3.81,24.66a11.59,11.59,0,0,0,4.7,5.6,8.54,8.54,0,0,0,5.4.64c6.52-1.12,12-7.51,12.87-15.11.64,4.51,1.67,9.68,5.16,11.86a10.4,10.4,0,0,0,4.72,1.26c18.33,1.56,41.11-.08,54.8-.74,7.68-.37,21.94,1.27,30.1-4.29,6-4.06,10-9.9,8.92-17.88a34.55,34.55,0,0,0-2.12-7.85c-1.74-5.23-10.18-38-10.18-38s11.18,37.51,14.5,41.91,5.41,8.87,10.26,9.47a6.26,6.26,0,0,0,5.81-2.06c1.84-2.37,1.61-6,1.26-9.19-1-9.44-14.44-52.12-14.44-52.12s19.5,51.08,24.91,54.84c2.33,1.62.32-9.76,3-10s5-4.37,4.89-7.52"/>
                  <path id="dawg" className="wag-1" d="M329.24,45a26.11,26.11,0,0,0-6.67,14.33"/>
                  <path id="dawg" className="wag-2" d="M320.56,29.3a59.4,59.4,0,0,0-11.31,22.24"/>
                  <path id="dawg" className="wag-3" d="M385.21,46.8a33,33,0,0,1,6.16,15.76"/>
                  <path id="dawg" className="wag-4" d="M395.89,35.09a58.41,58.41,0,0,1,9.76,34.37"/>
                </g>
              </g>
            </svg>
          </div>
        </div>
      
        <div className="Image-container">
          <img src={profileImage} alt = "Profile" className="Circular-image" />
        </div>
        
      </div>
      <p> 
          <h1>Hi, I'm Garrett</h1>
        
          I'm a born and raised Texan that recently moved to New York. 
          At my core, I love to create. Throughout my life I have always had hobbies where
          I am creating something new out of nothing. Knitting, crochet, woodworking, cooking - 
          all of these were outlets for me to put pieces of my mind into the zeitgeist, 
          and programming is no different. 
            
          Front-end development gives me the opportunity to mix two beautiful things, design and logic.
          I may just be getting my career started, but I strive to create user interfaces that capture 
          the very essence of the program while being intuitive, clean, and pleasing to the eye. Please 
          scroll and take a look at some of the projects I have helped bring to life. 
        
        </p> 
    </div>
  )
}


function Projects( {sectionsRef} ) {

  const data = require('./assets/project_images/descriptions.json');
  console.log("raw data:", data.projects);

  const projects = loadImagesWithDescriptions(); 
  const [activeTabs, setActiveTabs] = useState({});
  const [filteredContent, setFilteredContent] = useState([]);
  const handleTabChange = (projectName, tab) => {
    setActiveTabs(prev => ({
      ...prev,
      [projectName]: tab
    }));

  };

  const placeholderImage = require("./assets/project_images/default_image.png");

  const safeRequire = (imagePath) => {
    try {
      return require('.' + imagePath);
    } catch (error) {
      console.log('Image not found: ${imagePath}');
      return placeholderImage;
    }
  }

  let proj = Object.keys(data.projects[0]).map((projectName) => {
    const project = data.projects[0][projectName];
    return(

      
        <div className = "Project-grid">
          <div className = "Project-name">
          <h1>{projectName}</h1>
        </div>
        <div className = "Project-pictures">
          {!activeTabs[projectName] ? (
            <Pictures images={[project.default_image]}/>
          ):(
            <Pictures 
              images={project.subFolders[activeTabs[projectName].toLowerCase()]
                ?.map(img => safeRequire(img.src)) || []}
            />         
          )}
        </div>
        <div className = "Project-description">
          <p>{project.description || "no description"}</p>
        </div>
        <div className = "Project-tabs">
          <ul>
            {["Design", "Implementation", "Result"].map((tab) =>
              <a 
                key = {tab}
                className = {activeTabs[projectName] === tab ? "active-tab":""}
                onClick = {() => handleTabChange(projectName, tab)}
              >
                {tab}
              </a>
            )}
          </ul>
        </div>
      </div>
      
        
    );
  });


  return (
    <div
      id="projects"
      ref={(el) => (sectionsRef.current[1] = el)}
      className="App-project"
    >
      {proj}
    </div>
    // <div
    //   id="projects"
    //   ref={(el) => (sectionsRef.current[1] = el)}
    //   className="App-project"
    // >
    
    //   <div className = "Project-grid">
    //     <div className = "Project-name">
    //     <h1></h1>
    //   </div>
    //   <div className = "Project-pictures">
        
    //   </div>
    //   <div className = "Project-description">
    //     <p></p>
    //   </div>
    //   <div className = "Project-tabs">
    //     <ul>
    //       {["Design", "Implementation", "Result"].map((tab) =>
    //         <a 
    //           key = {tab}
    //           className = {activeTab === tab ? "active-tab" : ""}
    //           onClick = {() => handleTabChange(tab)}
    //         >
    //           {tab}
    //         </a>
    //       )}
    //     </ul>
    //   </div>
    // </div>
    
      
    // </div>
  )
}

function Contact ( {sectionsRef} ) {
  return (
    <div
      id="contact"
      ref={(el) => (sectionsRef.current[2] = el)}
      className="App-contact"
    >
      <h1>Contact Me</h1>
      <p><h2>Phone: </h2> (325) 262-6866</p>
      <p><h2>Email: </h2> garrettecgue@gmail.com</p>
      <p><a href="https://www.linkedin.com/in/garrettecgue"><h2>Connect with me on LinkedIn!</h2></a></p>
      <p><a href="https://www.github.com/garrettguerrero"><h2>Check out my GitHub!</h2></a></p>

    </div>
  )
}

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const [activeSelection, setActiveSelection] = useState(''); // Correct state name here
  const sectionsRef = useRef([]);

  useEffect(() => {
    const options = { 
      root:null,
      rootMargin:'0px',
      threshold:0.6, // Adjust as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {  
          setActiveSelection(entry.target.id); // Correct setter here
        }
      });
    }, options);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);


  return (
    <div className="App">
      
      <Navbar activeSelection={activeSelection} />
      {sidebarVisible && <Sidebar activeSection={activeSelection} toggleSidebar={toggleSidebar  } />}
      
      <div className="App-body">
        <About sectionsRef={sectionsRef} />
        <Projects sectionsRef={sectionsRef} />
        <Contact sectionsRef={sectionsRef} />
      </div>
    </div>
  );
}

export default App;
