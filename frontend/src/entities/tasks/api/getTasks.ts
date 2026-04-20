import axios from 'axios';

export const getTasks = async () => {
    const baseUrl = 'http://localhost:3000/api/tasks';
    try {
        const response = await axios.get(baseUrl);
        return response.data.data
    } catch (e) {
        console.log(e);
        return []
    }
}