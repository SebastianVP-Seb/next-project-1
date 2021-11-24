import axios from "axios";


async function activeresource(req, res) {
    const axiosRespuesta=await axios.get(`${process.env.API_URL}/activeresource`);
    const resource=axiosRespuesta.data;

    return res.send(resource);
};

export default activeresource;
