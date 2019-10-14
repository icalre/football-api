import axios from 'axios';
import {apiUrl, apiKey} from "../api.config";

const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {'X-Auth-Token': apiKey}
});

const getData = async (url)=>{
    try {
        const response = await axiosInstance.get(url);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

const getCompetitions = () =>{
    return getData('competitions');
};

const getCompetitionById = (id) =>{
    return getData(`competitions/${id}`);
}

const getTeams = (id) =>{
    return getData(`competitions/${id}/teams`);
}

const getTeam = (id)=>{
    return getData(`teams/${id}`);
}

export {getCompetitions, getCompetitionById,getTeams, getTeam}