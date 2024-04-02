import React, { useState, useEffect } from "react";

const BarGraph = ({ data, color = "var(--primary-color)" }) => {
  const [barData, setBarData] = useState(data);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const formattedData = data.map((bar) => {
      return {
        label: bar.label,
        value: bar.value,
        percentage:
          (bar.value * 100) / data.reduce((acc, curr) => acc + curr.value, 0),
      };
    });
    setBarData(formattedData);
    setDataLoaded(true);
  }, [data]);

  if (!dataLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-full w-full mx-auto space-y-3">
      {barData.map((bar, index) => (
        <div key={index} className="flex space-x-4 w-full items-center h-5">
          <div className="w-1/6">
            <p className="text-sm italic text-gray-500">{bar.label}</p>
          </div>
          <div className="bg-gray-300 rounded-full w-full m-2 h-5">
            <div
              className="h-full py-1 text-white flex items-center justify-center rounded-full"
              style={{
                width: `${bar.percentage}%`,
                backgroundColor: color,
              }}
            ></div>
            <p className="text-sm relative -top-5 w-full text-center text-gray-600">
              {bar.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarGraph;
