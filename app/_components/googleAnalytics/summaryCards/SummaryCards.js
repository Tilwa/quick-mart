import React from "react";
import SummaryCard from "../summaryCard/SummaryCard";

function SummaryCards({ stats }) {
  return (
    <div className="summary-cards">
      <SummaryCard icon="👁️" label="Sessions" value={stats.sessions} />
      <SummaryCard icon="🧑" label="Visitors" value={stats.visitors} />
      <SummaryCard icon="📄" label="Pageviews" value={stats.pageviews} />
      <SummaryCard
        icon="⚡"
        label="Bounce Rate"
        value={`${Math.round(stats.bounceRate)}%`}
      />
    </div>
  );
}

export default SummaryCards;
