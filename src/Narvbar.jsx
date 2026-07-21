import './App.css';
import resume from './assets/fortune-lentz-resume.pdf'

export function Navbar(){
    return(
        <nav>
            
            <ul>
                
                <li><a href="#about">Bio</a></li>
                <li><a href={resume} target="_blank" rel="noopener noreferrer">Resume</a></li>
                <li><a href='#contactMe'>Contact</a></li>
            </ul>
        </nav>
    );
}
