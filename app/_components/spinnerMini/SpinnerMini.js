import { BiLoaderAlt } from "react-icons/bi";
import "./SpinnerMini.css"; // Import the external CSS file

const SpinnerMini = () => {
  return (
    <div className="spinner-container">
      <BiLoaderAlt className="spinner-icon" />
    </div>
  );
};

export default SpinnerMini;
