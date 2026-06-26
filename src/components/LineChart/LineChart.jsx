import { useEffect, useState } from "react";
import Chart from "react-google-charts";

const getCSSVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (historicalData?.prices) {
      historicalData.prices.forEach((item) => {
        dataCopy.push([
          new Date(item[0]).toLocaleDateString().slice(0, -5),
          item[1],
        ]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  if (data.length <= 1) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 rounded-full border-2 border-glass-border border-t-gold animate-spin" />
      </div>
    );
  }

  return (
    <Chart
      chartType="LineChart"
      data={data}
      height="100%"
      legendToggle
      options={{
        backgroundColor: "transparent",
        legend: { textStyle: { color: "#94a3b8" } },
        hAxis: {
          textStyle: { color: "#94a3b8" },
          gridlines: { color: getCSSVar("--color-gridline") || "rgba(255,255,255,0.05)" },
        },
        vAxis: {
          textStyle: { color: "#94a3b8" },
          gridlines: { color: getCSSVar("--color-gridline") || "rgba(255,255,255,0.05)" },
        },
        lineWidth: 2,
        colors: ["#10B981"],
        curveType: "function",
        chartArea: { width: "90%", height: "80%" },
      }}
    />
  );
};

export default LineChart;
