import axios from "axios";


async function activeresource(req, res) {
    const axiosRespuesta=await axios.get('http://localhost:3001/api/activeresource');
    const resource=axiosRespuesta.data;

    return res.send(resource);
};

export default activeresource;
