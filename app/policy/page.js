import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";
import "./page.css";

function App() {
  return (
    <div>
      <Header />

      <div className="policy-container">
        <div className="policy">
          <h1 id="policy-title">Our Policies</h1>
          <p>
            At <strong>Quick-Mart</strong>, we are committed to providing a
            shopping experience that is simple, transparent, and centered around
            your convenience. We understand that trust is the foundation of any
            good online store, which is why our policies are crafted with your
            rights and expectations in mind.
          </p>
          <p>
            Please take a moment to review our store policies below. These
            outline how we manage your orders, deliveries, data, and support to
            make your journey with us smooth and secure.
          </p>

          <h2>1. Ordering Policy</h2>
          <p>
            At Quick-Mart, we’ve removed the need for account creation to speed
            up your shopping process. You can place an order easily by filling
            out a short form with your name, contact number, and delivery
            address. Once your order is submitted, our system sends it directly
            to our admin dashboard where it is reviewed by our team.
          </p>
          <p>
            You will then receive a confirmation call from us to verify your
            order details. This personal step ensures the accuracy of your
            delivery and helps us avoid mistakes. Once confirmed, your order is
            marked as “Processing” and moves to the next stage in our system.
          </p>

          <h2>2. Delivery Policy</h2>
          <p>
            We aim to deliver your products in a timely and professional manner.
            Delivery time may vary based on your location and the availability
            of the product, but our goal is always to process and dispatch
            orders quickly after confirmation.
          </p>
          <p>
            During this time, our admin system is regularly updated with the
            latest status of your order — from packaging to dispatch to
            out-for-delivery. This ensures that our team stays on top of every
            shipment until it reaches your door.
          </p>

          <h2>3. Cancellation Policy</h2>
          <p>
            If you wish to cancel your order, you must do so before the
            confirmation call is completed. Once your order has been confirmed
            and processing has started, we may not be able to cancel it as it
            moves into preparation and logistics.
          </p>
          <p>
            We always encourage customers to double-check their order and
            address details before submitting to help avoid the need for
            cancellation.
          </p>

          <h2>4. Return & Refund Policy</h2>
          <p>
            Customer satisfaction is important to us. If you receive a product
            that is damaged, faulty, or significantly different from what was
            described, you are eligible to request a return within{" "}
            <strong>3 days</strong> of receiving your order.
          </p>
          <p>
            To initiate a return, please reach out to our support team with your
            order number, pictures of the item (if applicable), and a brief
            explanation. Once approved, we’ll arrange a return process. Refunds
            will be issued after the item is received and inspected by our team.
          </p>
          <p>
            Refunds are not applicable for products that have been used, opened
            (where hygiene is a concern), or returned after the return window
            closes.
          </p>

          <h2>5. Privacy Policy</h2>
          <p>
            We take your privacy seriously. Quick-Mart only collects essential
            information required to complete your order — including your name,
            delivery address, and phone number. We do not collect payment
            details on our platform since orders are processed manually after
            confirmation.
          </p>
          <p>
            Your personal data is stored securely and is never shared with
            third-party marketers or unauthorized individuals. We use this data
            solely for order communication, delivery coordination, and customer
            service follow-up.
          </p>

          <h2>6. Customer Support Policy</h2>
          <p>
            We aim to respond to all customer inquiries within{" "}
            <strong>24 hours</strong> during business days. Our support team is
            friendly, professional, and trained to handle everything from order
            tracking to issue resolution.
          </p>
          <p>
            You can contact us at any time using the information on our{" "}
            <a href="/contact-us">Contact Us</a> page. We’re happy to assist
            with any concerns or questions you may have.
          </p>

          <p>
            Thank you for choosing Quick-Mart. We appreciate your trust and look
            forward to serving you with excellence!
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
