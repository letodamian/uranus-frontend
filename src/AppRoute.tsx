import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import LeaderBoard from "./Leaderboard";
import Friends from "./Friends";

function AppRoute() {
    return (
        <div className="flex justify-center">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
                <Route path="/friends" element={<Friends />} />
            </Routes>
        </div>
    );
}

export default AppRoute;

