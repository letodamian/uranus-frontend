import React from "react";

interface PointPanelProps {
    label: string;
    points: number;
}

const PointPanel = ({ label, points }:PointPanelProps) => {
    return (
        <div className="bg-[#575757] rounded-lg p-2 flex justify-between text-xl">
            <span>{label}</span>
            <span className="text-[24px]">{points}</span>
        </div>
    );
};
export default PointPanel;
