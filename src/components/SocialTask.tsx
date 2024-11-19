/* eslint-disable @typescript-eslint/no-unused-vars */
//import React from "react";
// Import Material Design Icons from react-icons
import { FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { useUserStatus } from "../hook/useUserStatus";
import { useUser } from "../hook/useUser";
import { getSocialPoints } from "../lib/api";
import { useState } from "react";

interface SocialButtonProps {
    label: string;
    link: string;
    content: string;
}
const SocialButton = ({ label, link, content }: SocialButtonProps) => {
    const [state, setState] = useState<number>(0);
    const [text, setText] = useState<string>("Join");
    const user = useUser();
    const { data, isLoading, refetch } = useUserStatus();
    console.log(data?.data, "gggggggggg");
    // Handle button click to navigate to the link
    const handleButtonClick = () => {
        window.open(link, "_blank", "noopener,noreferrer");
    };
    const handleClaim = () => {
        if (user) {
            getSocialPoints(user.userId, label);
        }
    };
    const handleCompleted = () => {
        return true;
    };
    if (data) {
        if (label === "community") {
            if (data.data.joinedCommunity == false) {
                setText("Join");
                setState(0);
            } else if (data.data.claimCommunity == false) {
                setText("Claim");
                setState(1);
            } else {
                setText("Completed");
                setState(2);
            }
        }
        if (label === "channel") {
            if (data.data.joinedChannel == false) {
                setText("Join");
                setState(0);
            } else if (data.data.claimChannelPoints == false) {
                setText("Claim");
                setState(1);
            } else {
                setText("Completed");
                setState(2);
            }
        }
    }
    const getHandleClick = () => {
        if (state == 0) return handleButtonClick();
        if (state == 1) return handleClaim();
        if (state == 2) return handleCompleted();
    };
    return (
        <div className="w-max-[400px] flex items-center bg-[#575757] rounded-lg my-2 p-3">
            <div className="bg-[rgba(255,255,255,0.3)] rounded-full h-10 w-10 flex justify-center items-center">
                <FaTelegramPlane className="text-bg-white" size={20} />
            </div>
            <div className="w-[calc(100%-40px)] p-2 flex justify-between items-center text-lg ">
                <div>{content}</div>
                <button
                    onClick={getHandleClick}
                    className="flex items-center space-x-2 py-2 px-4 bg-[rgba(255,255,255,0.4)] text-white rounded-xl"
                >
                    <span>{text}</span>
                </button>
            </div>
        </div>
    );
};

export default SocialButton;
