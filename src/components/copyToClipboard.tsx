//import React, { useState } from "react";
//import { MdCheck, MdContentCopy } from "react-icons/md";

interface CopyToClipboardProps {
    text: string | undefined;
}

export default function CopyToClipboard({ text }: CopyToClipboardProps) {
    // const [isClicked, setIsClicked] = useState<boolean>(false);
    // const handleCopy = async () => {
    //   try {
    //     if (text !== undefined) {
    //       await navigator.clipboard.writeText(text);
    //       setIsClicked(true);
    //       setTimeout(() => setIsClicked(false), 2000);
    //     }
    //   } catch (err) {
    //     console.error("Failed to copy: ", err);
    //   }
    // };

    // return (
    //   <div className="flex gap-1 mt-[3px]">
    //     <button onClick={handleCopy}>
    //       {isClicked ? <MdCheck className="text-green-500"/> : <MdContentCopy />}
    //     </button>
    //   </div>
    // );
    return (
        <div className="flex flex-col mt-3">
            <span className="bg-gray-100 p-2 rounded select-text cursor-text">
                {text || "No text available"}
            </span>
            <p className="text-sm text-gray-500 mt-2">
                Long press or highlight the text to copy it manually.
            </p>
        </div>
    );
}
