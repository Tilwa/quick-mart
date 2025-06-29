import Header from "./_components/header/Header";
import Slider from "./_components/slider/Slider";
import "./page.css";

function page() {
  return (
    <div>
      <Header />
      <div className="home">
        <Slider />
        <h2 className="recommended">Recommended items</h2>

        <div className="grid-container">
          <div className="grid-item">
            <div className="product-card">
              <div className="discount-badge">25% OFF</div>
              <img
                src="./img1.png"
                alt="Storage Tin Set"
                className="product-img"
              />

              <div className="brand-logo">TINIFY</div>

              <div className="product-info">
                <span className="delivery-badge">Free Shipping</span>
                <p className="category">Storage Tins</p>
                <h3 className="title">Classic Tin Container Set</h3>
                <p className="price">49 AED</p>
                <p className="vat">51 AED - VAT Included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
