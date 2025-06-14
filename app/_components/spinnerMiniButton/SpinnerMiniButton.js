import { BiLoaderAlt } from "react-icons/bi";
import "./SpinnerMiniButton.css"; // Import the external CSS file

const SpinnerMiniButton = () => {
  return (
    <div className="spinner-container">
      <BiLoaderAlt className="spinner-icon" />
    </div>
  );
};

export default SpinnerMiniButton;
