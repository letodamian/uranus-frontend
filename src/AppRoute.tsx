import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LeaderBoard from "./Leaderboard";
import Friends from "./Friends";

function AppRoute() {
    return (
        <div className="relative w-full h-full">
            <div className="aspect-9/16">
                <div className="absolute inset-0">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/leaderboard" element={<LeaderBoard />} />
                        <Route path="/friends" element={<Friends />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default AppRoute;
