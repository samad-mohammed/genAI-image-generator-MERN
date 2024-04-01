import axios from 'axios';

const API = axios.create({
    baseURL : "https://genai-image-generator-mern.onrender.com/api",

})

export const GetPosts = async () => await API.get("/post/");
export const CreatePost = async (data) => await API.get("/post/", data);

export const GenerateAIImage = async (data) => await API.post("/generateImage/", data);

