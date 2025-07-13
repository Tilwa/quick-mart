"use client";
import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import { GiCardboardBox } from "react-icons/gi";
import { MdShoppingCart } from "react-icons/md";
import { HiUser } from "react-icons/hi2";
import { BiSolidMessageRoundedEdit } from "react-icons/bi";

import "./page.css";
import SummaryCards from "../_components/googleAnalytics/summaryCards/SummaryCards";
import LineChart from "../_components/googleAnalytics/lineChart/LineChart";
import WorldMap from "../_components/googleAnalytics/worldMap/WorldMap";

function Page() {
  // Get the current pathname
  const pathname = usePathname();
  const formattedPath = pathname.slice(1).split("/").join(" > ");
  // const { data: session, status } = useSession();
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     fetch("/api/analytics")
  //       .then((res) => res.json())
  //       .then(setData);
  //   }
  // }, [status]);

  // if (status === "loading") return <p>Loading session...</p>;
  // if (status === "unauthenticated") {
  //   signIn(); // Redirect to login page
  //   return null;
  // }
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

        {/* top-4-containers ends here */}
        {/* <div className="dashboard-container">
          <h1>Site Analytics</h1>
          {!data ? (
            <p>Loading analytics...</p>
          ) : (
            <>
              <SummaryCards stats={data} />
              <LineChart hourlyStats={data.hourlyStats} />
              <WorldMap countryStats={data.countryStats} />
            </>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Page;
