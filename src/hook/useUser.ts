import { useRef } from "react";

function generateInviteCode(userName: string, userId: string): string {
    const data = `${userName} + ${userId}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }

    // Convert the hash to a positive number and encode it in base36
    const code = Math.abs(hash).toString(36).toUpperCase();
    return code;
}

// Define the structure of the Telegram WebApp User
interface TelegramUser {
    id: number;
    username: string;
    first_name?: string;
    last_name?: string;
}

interface InitDataUnsafe {
    user?: TelegramUser;
    query_id?: string;
    auth_date?: string;
    hash?: string;
}

declare global {
    interface Window {
        Telegram?: {
            WebApp?: {
                initData: string;
                initDataUnsafe: InitDataUnsafe;
            };
        };
    }
}

export const useUser = () => {
    const userName = useRef<string | null>(null);
    const userId = useRef<number | null>(null);

    if (window.Telegram && window.Telegram.WebApp) {
        // Get user data from Telegram WebApp if available
        const { initData, initDataUnsafe } = window.Telegram.WebApp;

        if (initData && initDataUnsafe.user) {
            console.log("User data from Telegram:", initDataUnsafe.user);
            console.log("userName:", initDataUnsafe.user.username);

            userName.current = initDataUnsafe.user.username;
            userId.current = initDataUnsafe.user.id;
            const code = generateInviteCode(
                userName.current,
                userId.current.toString()
            );
            console.log("userId:", initDataUnsafe.user.id);
            return { userName, userId, code };
        } else {
            console.log(
                "Telegram WebApp not found or user data is unavailable"
            );
            return null;
        }
    }
};
