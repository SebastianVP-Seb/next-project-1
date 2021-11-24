import axios from "axios";

export default async function (req, res) {

    if(req.method==='GET'){   
        const respuesta=await fetch('http://localhost:3001/api/resources');
        const data=await respuesta.json();
        
        return res.send(data);
    };

    //Para crear una tarea, para actualizarla

    if(req.method==='POST' || req.method==='PATCH') {
        console.log(req.body);//--> los datos que se envían del formulario
        const {title, description ,link, priority, timeToFinish, id}=req.body;

        if(!title || !description || !link || !priority || !timeToFinish) {
            return res.status(422).send('Data are missing');
        }else {

            //En función de si es tarea nueva o actualización
            const url=req.method==='POST'
                ? 'http://localhost:3001/api/resources'
                : `http://localhost:3001/api/resources/${id}`

            try {
                // const respuestaAxios=await axios.post(url, req.body); --> sólo con POST
                const respuestaAxios=await axios[req.method.toLowerCase()](url, req.body);
                return res.send(respuestaAxios.data);
            } catch (error) {
                return res.status(422).send('Los datos no se pueden almacenar, error: '+error);
            }            
            // return res.send('Data has been received');
        }
    };
};

// http://localhost:3000/api/resources

 