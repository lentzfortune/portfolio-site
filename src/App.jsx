import './App.css';
import { Navbar } from "./Narvbar";
import picture from "./assets/picture.jpg";
import { useEffect, useRef, useState } from "react";
import { sendMessage } from "./api.js";

export default function App() {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const successTimer = useRef(null);

  useEffect(() => () => clearTimeout(successTimer.current), []);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSending(true);
    setStatus("");
    clearTimeout(successTimer.current);

    try {
      const result = await sendMessage(Object.fromEntries(formData));
      setStatus(result.message);
      form.reset();
      successTimer.current = setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <section id="bio">
          <div>
            <img src={picture} alt="picture of Lentz" id="lentz" />
          </div>

          <div>
            <p id="about">
              My name is Lentz Fortune. I'm a Software Engineer and recent Florida Gulf Coast University
              (FGCU) graduate with a passion for building web-based solutions.
              I currently work as an Information Technolgy Associate, where I solve technical problems for customers.
              I provide website development and maintenance, WordPress updates, database management, SQL query optimization, and 
              ongoing technical support. Whether you're starting a new project or improving an existing one, I'm here to help bring your ideas to life.
            </p>
          </div>
        </section>

        <section id="methodSection">
          
          <div id="projects">
            <div className="projects">
              <h2>My Process</h2>
              <p>
                I believe great software starts with collaboration. We begin by discussing your goals
                and defining the key requirements. Next, I create a working prototype so 
                you can review the design and functionality beofre full development begins.
                After your feedback and approval, I build the final product and keep you informed every step of the way.
              </p>
              </div>
              </div>
              
            <div className='projects'>
                <h2>Technologies I Work With</h2>
                
            <div className='skills'> 

              
              
              <div>
                    
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" />
                    <p>Vite</p>
              </div>

              <div>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" />
                    <p>PostgeSQL</p>
              </div>

              <div>
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
                  <p>React</p>
              </div>

              <div> 
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" />
                  <p>Visual Studio Code</p>
              </div>

              <div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />
                <p>Node.js</p>
              </div>

              <div>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" />
                <p>Express.js</p>
              </div>

            </div>
            
            </div>
            
          
                
              
            

            
          
        </section>

        <section id="contactMe">
          
          <div id="contactMeBox">
           
            <p>
              <h2>Contact</h2>
              I'm interested in discussing entry-level software engineering,
              IT support, or freelance opportunities? I'd love to hear from you.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                required
              />

              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                required
              />

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                required
              />

              <textarea
                id="inquiry"
                name="message"
                placeholder="Tell me about your project or opportunity..."
                rows="5"
                required
              ></textarea>

              <button type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Send Message"}
              </button>
              {status && <p role="status">{status}</p>}
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
