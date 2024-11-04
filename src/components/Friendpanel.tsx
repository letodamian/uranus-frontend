import React from "react";

interface FriendPanelProps {
    userName: string;
}

const FriendPanel = ({ userName}:FriendPanelProps) => {
    return (
       <div className="w-max-[400px] flex items-center bg-[#575757] rounded-lg my-2 p-3">
        <div className="bg-white opacity-30 rounded-full h-10 w-10"></div>
         <div className="w-[calc(100%-40px)] p-2 flex justify-between text-lg ">
            <span>{userName}</span>
            <span className="uppercase">+300points</span>
        </div>
       </div>
    );
};
export default FriendPanel;
