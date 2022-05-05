import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import './Footer.css';

const Footer = () => {

  return (
    <footer>
      <div className="footer-top">
        <div className="creators">
          <h4>Ben Danishevsky</h4>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/benjamin-danishevsky-0a158a237/"><i class="socials fa-brands fa-linkedin fa-flip"></i></a>
            </li>
            <li>
              <a href="https://github.com/benjamin-danishevsky"><i class="socials fa-brands fa-github fa-flip"></i></a>
            </li>
          </ul>
        </div>
        <div className="creators">
          <h4>Grant Walton</h4>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/grant-walton-795261235/"><i class="socials fa-brands fa-linkedin fa-flip"></i></a>
            </li>
            <li>
              <a href="https://github.com/Gwantt"><i class="socials fa-brands fa-github fa-flip"></i></a>
            </li>
          </ul>
        </div>
        <div className="creators">
          <h4>James Chen</h4>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/jameschenn/"><i class="socials fa-brands fa-linkedin fa-flip"></i></a>
            </li>
            <li>
              <a href="https://github.com/jameschenn"><i class="socials fa-brands fa-github fa-flip"></i></a>
            </li>
          </ul>
        </div>
        <div className="creators">
          <h4>Khoi Duong</h4>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/khoiduong1996/"><i class="socials fa-brands fa-linkedin fa-flip"></i></a>
            </li>
            <li>
              <a href="https://github.com/kdngaa"><i class="socials fa-brands fa-github fa-flip"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
