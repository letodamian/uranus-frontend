/* eslint-disable @typescript-eslint/no-unused-vars */
//import React from "react";
// Import Material Design Icons from react-icons
import { FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { useUserStatus } from "../hook/useUserStatus";

interface SocialButtonProps {
    label: string;
    link: string;
    content: string;
}
const SocialButton = ({ label, link, content }: SocialButtonProps) => {
    const {data, isLoading, refetch} = useUserStatus();
    console.log(data,"gggggggggg")
    // Handle button click to navigate to the link
    const handleButtonClick = () => {
        window.open(link, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="w-max-[400px] flex items-center bg-[#575757] rounded-lg my-2 p-3">
            <div className="bg-[rgba(255,255,255,0.3)] rounded-full h-10 w-10 flex justify-center items-center">
                {label === "twitter" ? (
                    <FaTwitter className="text-bg-white" size={20} />
                ) : (
                    <FaTelegramPlane className="text-bg-white" size={20} />
                )}
            </div>
            <div className="w-[calc(100%-40px)] p-2 flex justify-between items-center text-lg ">
                <div>{content}</div>
                <button
                    onClick={handleButtonClick}
                    className="flex items-center space-x-2 py-2 px-4 bg-[rgba(255,255,255,0.4)] text-white rounded-xl"
                >
                    {label === "twitter" ? (
                        <span>Follow</span>
                    ) : (
                        <span>Join</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default SocialButton;
