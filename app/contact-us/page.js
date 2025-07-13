import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";
import "./page.css";

function App() {
  return (
    <div>
      <Header />

      <div className="contact-us-container">
        <div className="contact-us">
          <h1 id="contact-us-title">Contact Us</h1>

          <p>
            We’re always here to help you! Whether you have a question about
            your order, need clarification on a product, want to provide
            feedback, or just need general support — the Quick-Mart team is
            ready to assist you with care and speed.
          </p>

          <p>
            Your satisfaction is our top priority. We understand that sometimes
            you may need to speak with someone directly, especially when
            shopping online. That’s why we provide responsive and dedicated
            customer support to ensure your shopping experience is smooth,
            stress-free, and trustworthy.
          </p>

          <h3>📬 Contact Information</h3>
          <ul>
            <li>
              <strong>Email:</strong> shahrukhaltaf123@gmail.com
            </li>
            <li>
              <strong>Phone:</strong> +92-333-5712658
            </li>
            <li>
              <strong>Business Hours:</strong> Monday to Saturday, 9:00 AM –
              6:00 PM
            </li>
            <li>
              <strong>Response Time:</strong> We typically respond to emails and
              missed calls within 24 hours during business days.
            </li>
          </ul>

          <h3>📍 Office Address</h3>
          <p>
            Website owned by <strong>Quick-Mart</strong>,<br />
            Shahrukh Free Zone,
            <br />
            Dubai International City,
            <br />
            Dubai, United Arab Emirates
          </p>

          <h3>🛠 Quick Help & Order Inquiries</h3>
          <p>
            If you’ve already placed an order, you don’t need to follow up
            immediately — our team will contact you shortly for confirmation via
            phone. This is a core part of how Quick-Mart processes all orders,
            ensuring we confirm details with you directly before moving ahead
            with dispatch and delivery.
          </p>
          <p>
            For urgent concerns like changing delivery addresses, updating
            contact info, or reporting an issue, please call us directly within
            our business hours.
          </p>

          <h3>🤝 Customer Care Commitment</h3>
          <p>
            We value every customer and strive to provide a human touch with
            every order. Our support team is trained to handle concerns with
            empathy, patience, and professionalism. Whether you are a first-time
            buyer or a returning customer, we treat your questions and feedback
            with equal importance.
          </p>

          <h3>💡 Need Answers Fast?</h3>
          <p>
            We are working on a dedicated <strong>Help Center</strong> and{" "}
            <strong>FAQ</strong> section where you’ll be able to find answers to
            common questions like:
          </p>
          <ul>
            <li>Where is my order?</li>
            <li>How do I cancel or modify my order?</li>
            <li>How long does delivery take?</li>
            <li>What should I do if I receive the wrong or damaged product?</li>
          </ul>
          <p>
            Until then, feel free to reach out to us directly. We’re always
            happy to help.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
