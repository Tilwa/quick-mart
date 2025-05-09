import Navigation from "@/app/_components/navigation/Navigation";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <span id="quick-title">Quick</span>
          <span id="mart-title">Mart</span>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
          <button id="search-btn">Search</button>
        </div>
      </div>
      <hr id="header-line" />
      <Navigation />
    </header>
  );
}

export default Header;
