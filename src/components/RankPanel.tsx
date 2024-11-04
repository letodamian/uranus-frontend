import React from "react";

interface RankPanelProps {
    key: number;
    ranking: number;
    userName: string;
    points: number;
}

const RankPanel = ({  ranking, userName, points }: RankPanelProps) => {
    return (
        <div className="h-12 bg-[#d9d9d9] rounded-lg flex justify-between items-center my-3 skew-x-[-30deg] ">
            <div className=" bg-[#151416] text-white rounded-lg w-16 h-full flex items-center justify-center">
                <div className="skew-x-[30deg] text-4xl">{ranking}</div>
            </div>
            <div className="flex-1 flex justify-between text-center px-5 text-black">
                <div className="skew-x-[30deg] text-xl">{userName}</div>
                <div className="skew-x-[30deg] text-xl">{points}</div>
            </div>
        </div>
    );
};
export default RankPanel;
