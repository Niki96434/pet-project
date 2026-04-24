import axios from 'axios';
import type { FormDataType } from '../model/types';

export default async function postTask(data: FormDataType) {
    try {
        const postData = await axios.post('http://localhost:3000/api/tasks', data);
        return postData.data
    } catch (error) {
        console.log(error);
    }
}