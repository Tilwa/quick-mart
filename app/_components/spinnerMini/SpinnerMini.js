import { BiLoaderAlt } from "react-icons/bi";
import "./SpinnerMini.css"; // Import the external CSS file

const SpinnerMini = ({ height = 1 }) => {
  return (
    <div className="spinner-container">
      <BiLoaderAlt
        className="spinner-icon"
        style={{ margin: `${height}rem auto` }}
      />
    </div>
  );
};

export default SpinnerMini;
