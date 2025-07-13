import React from "react";
import "./SummaryCard.css";

function SummaryCard({ icon, label, value }) {
  return (
    <div className="summary-card">
      <div>{icon}</div>
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  );
}

export default SummaryCard;
