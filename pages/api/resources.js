import axios from "axios";

export default async function (req, res) {

    if(req.method==='GET'){   
        const respuesta=await fetch('http://localhost:3001/api/resources');
        const data=await respuesta.json();
        
        return res.send(data);
    };

    if(req.method==='POST') {
        console.log(req.body);//--> los datos que se envían del formulario
        const {title,description,link,priority,timeToFinish}=req.body;

        if(!title || !description || !link || !priority || !timeToFinish) {
            return res.status(422).send('Data are missing');
        }else {

            try {
                const respuestaAxios=await axios.post('http://localhost:3001/api/resources', req.body);
                return res.send(respuestaAxios.data);
            } catch (error) {
                return res.status(422).send('Los datos no se pueden almacenar, error: '+error);
            }            
            // return res.send('Data has been received');
        }
    };
};

// http://localhost:3000/api/resources

 