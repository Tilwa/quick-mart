"use client";
import { usePathname } from "next/navigation";
import { GiCardboardBox } from "react-icons/gi";
import { MdShoppingCart } from "react-icons/md";
import { HiUser } from "react-icons/hi2";
import { BiSolidMessageRoundedEdit } from "react-icons/bi";

import "./page.css";

function Page() {
  // Get the current pathname
  const pathname = usePathname();
  const formattedPath = pathname.slice(1).split("/").join(" > ");
  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-path">
          <p>{formattedPath}</p>
        </div>

        <div className="top-4-containers">
          <div className="top-containers-1">
            <p className="box-title">Orders</p>
            <div className="count-with-icon">
              <h5 className="box-count">50</h5>
              <GiCardboardBox className="order-icon" />
            </div>
          </div>{" "}
          <div className="top-containers-2">
            <p className="box-title">Products</p>
            <div className="count-with-icon">
              <h5 className="box-count">1500</h5>
              <MdShoppingCart className="order-icon" />
            </div>
          </div>{" "}
          <div className="top-containers-3">
            {" "}
            <p className="box-title">Customers</p>
            <div className="count-with-icon">
              <h5 className="box-count">560</h5>
              <HiUser className="order-icon" />
            </div>
          </div>{" "}
          <div className="top-containers-4">
            {" "}
            <p className="box-title">Reviews</p>
            <div className="count-with-icon">
              <h5 className="box-count">60</h5>
              <BiSolidMessageRoundedEdit className="order-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
