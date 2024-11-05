import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchUserData = async (userName: string| undefined) => {
    try{
        const res = await axios.post(`${apiUrl}/userData`,{userName});
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