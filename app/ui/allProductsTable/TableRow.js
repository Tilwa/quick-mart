import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";

function TableRow({ product }) {
  const {
    id,
    title,
    description,
    brand,
    category,
    offerPrice,
    originalPrice,
    inStock,
    image1,
    image2,
    image3,
    image4,
    image5,
  } = product;
  return (
    <tr className="all-products-table-row">
      <td className="all-products-table-data">
        <input type="checkbox" />
      </td>
      <td className="all-products-table-data">{id}</td>
      <td className="all-products-table-data">{title}</td>
      <td className="all-products-table-data">{description}</td>
      <td className="all-products-table-data">{brand}</td>
      <td className="all-products-table-data">{category}</td>
      <td className="all-products-table-data">{offerPrice}</td>
      <td className="all-products-table-data">{originalPrice}</td>
      <td className="all-products-table-data">{inStock}</td>
      <td className="all-products-table-data">
        <img src={image1} alt="image1" width={20} height={20} />
      </td>
      <td className="all-products-table-data">
        {" "}
        <img src={image2} alt="image2" width={20} height={20} />
      </td>
      <td className="all-products-table-data">
        {" "}
        <img src={image3} alt="image3" width={20} height={20} />
      </td>
      <td className="all-products-table-data">
        {" "}
        <img src={image4} alt="image4" width={20} height={20} />
      </td>
      <td className="all-products-table-data">
        {" "}
        <img src={image5} alt="image5" width={20} height={20} />
      </td>
      <td className="all-products-table-data">
        <HiDotsHorizontal />
      </td>
    </tr>
  );
}

export default TableRow;
