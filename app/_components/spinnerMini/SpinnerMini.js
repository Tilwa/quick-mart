import { BiLoaderAlt } from "react-icons/bi";
import "./SpinnerMini.css"; // Import the external CSS file

const SpinnerMini = () => {
  return (
    <div className="spinner-container">
      <BiLoaderAlt className="spinner-icon" />
      <h1>Hellllo</h1>
    </div>
  );
};

export default SpinnerMini;
