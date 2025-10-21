import React from "react";
import "../styles/ScreenMain.css";

export default function ChartAtendimentos() {
    return (
        <div className="chart-box">
            <div className="bar" style={{ height: "60%" }}></div>
            <div className="bar" style={{ height: "80%" }}></div>
            <div className="bar" style={{ height: "40%" }}></div>
            <div className="bar" style={{ height: "70%" }}></div>
            <div className="bar" style={{ height: "90%" }}></div>
        </div>
    );
}
