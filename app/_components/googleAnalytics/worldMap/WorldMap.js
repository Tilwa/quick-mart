import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function WorldMap({ countryStats }) {
  return (
    <div className="map-container">
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const iso = geo.properties.ISO_A2;
              const count = countryStats[iso] || 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={`rgba(30,144,255, ${Math.min(count / 50, 1)})`}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default WorldMap;
