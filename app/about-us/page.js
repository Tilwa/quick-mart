import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";
import "./page.css";

function App() {
  return (
    <div>
      <Header />
      <div className="about-us-container">
        <div className="about-us">
          <h1 id="about-us-title">About Us</h1>
          <p>
            Welcome to <strong>Quick-Mart</strong>, your go-to destination for
            fast, simple, and secure online shopping! We are more than just an
            eCommerce store — we are a team of passionate individuals committed
            to bringing you the best products with the convenience you deserve.
          </p>

          <p>
            At Quick-Mart, we believe online shopping should be easy,
            accessible, and stress-free for everyone. That’s why we’ve
            eliminated the barriers of user registration and login. With us,
            there’s no need to remember passwords or go through lengthy sign-up
            processes. Just browse our collection, fill in a quick form, and
            your order is on its way!
          </p>

          <p>
            Every order you place triggers an instant process in our admin
            dashboard. Once we receive your order, our team gives you a quick
            confirmation call to verify your details. After your confirmation,
            we begin the delivery process to your doorstep with full attention
            to speed and care.
          </p>

          <h3>Why Choose Quick-Mart?</h3>
          <ol>
            <li>
              ⚡ <strong>Fast Checkout:</strong> No account needed — place your
              order in under a minute.
            </li>
            <li>
              📞 <strong>Personal Confirmation:</strong> All orders are verified
              with a friendly confirmation call.
            </li>
            <li>
              🚚 <strong>Reliable Delivery:</strong> Prompt and accurate
              delivery right to your provided address.
            </li>
            <li>
              🔄 <strong>Real-Time Updates:</strong> Your order status is
              tracked and updated during processing in our admin system.
            </li>
          </ol>

          <p>
            Whether you're shopping for daily essentials, electronics, fashion,
            household items, or gifts — Quick-Mart ensures a quick, seamless,
            and delightful shopping journey.
          </p>

          <p>
            Our mission is simple: to provide a no-hassle, efficient online
            store that values your time and trust. With hundreds of satisfied
            customers and growing every day, we’re proud to offer an experience
            that stands out from traditional eCommerce platforms.
          </p>

          <p>
            So why wait? Discover the new way of shopping with Quick-Mart — it’s
            fast, secure, and tailored for your convenience. Your next favorite
            product is just a few clicks away!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
