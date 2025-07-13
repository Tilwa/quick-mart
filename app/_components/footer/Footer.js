import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section contact">
          <h4>Contact us</h4>
          <p>
            Website owned by Quick-Mark, Shahrukh Free Zone, Dubai International
            City, Dubai, UAE
          </p>
          <p>
            📧 <a href="mailto:shahrukhaltaf123@gmail.com">Quick-Mart.ae</a>
          </p>
          <p>
            📧{" "}
            <a href="shahrukhaltaf123@gmail.com">shahrukhaltaf123@gmail.com</a>
          </p>
          <p>
            🌐 <a href="https://Quick-Mart.ae">Quick-Mart.ae</a>
          </p>
          <p>📞 +971 561491729</p>
        </div>

        <div className="footer-section info">
          <h4>Information</h4>
          <ul>
            <li>
              <a href="/policy">Policy</a>
            </li>
            <li>
              <a href="/about-us">About us</a>
            </li>
            <li>
              <a href="/contact-us">Contact us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h4>Newsletter</h4>
          <div className="newsletter-input">
            <input type="email" placeholder="Email" />
            <button>Subscribe</button>
          </div>
          <p>Follow us on social media</p>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Privacy Policy - Terms of Use - User Information Legal Enquiry Guide{" "}
          <br />© 2025 Quick-Mart, All rights reserved
        </p>
      </div>
    </footer>
  );
}
