import "./Spinner.css";
import Loader from "@/app/assets/loader.png";
import Image from "next/image";
function Spinner({ height }) {
  return (
    <div className="spinner-container">
      <Image
        className="spinner"
        src={Loader}
        alt="loading img"
        style={{ margin: `${height}rem auto` }}
      />
    </div>
  );
}

export default Spinner;
