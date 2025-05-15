import "./Spinner.css";
import Loader from "@/app/assets/loader.png";
import Image from "next/image";
function Spinner() {
  return (
    <div className="spinner-container">
      <Image className="spinner" src={Loader} alt="loading img" />
    </div>
  );
}

export default Spinner;
