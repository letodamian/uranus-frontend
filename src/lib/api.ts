import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchUserData = async (userName: string, userId: string) => {
    try{
        const res = await axios.post(`${apiUrl}/user/Data`,{userName, userId});
        if(res.data.success){return res.data}
        else{
            console.log(res.data.msg);
            return false;
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

export const sendGamePoint = async (userId: string | undefined, userName: string | undefined, point: number) => {
    try{
        const res = await axios.post(`${apiUrl}/user/game`, {userId, userName, point});
        if(res.data.success){
            return true;
        }
        else {
            console.log(res.data.msg);
            return false;
        }
    }catch(error){
        console.log(error);
        return error;
    }
}