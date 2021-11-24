import React, { useEffect, useState } from 'react';
import Link from 'next/dist/client/link';
import axios from 'axios';
import moment from 'moment';

function ActiveResource() {

    //Para traer el recurso activo:
    const [resource, setResource]=useState({});

    //Para mostrar los segundos que quedan:
    const [seconds, setSeconds]=useState();

    useEffect(()=>{
        async function fetchResource(){
            //crear su archivo dentro del folder api
            const axiosRespuesta=await axios.get('/api/activeresource');
            const resource=await axiosRespuesta.data;

            //Para establecer el t que queda para finalizar la tarea:, en sistema decimal
            const timeToFinish=parseInt(resource.timeToFinish, 10);
            //Se compara la fecha actual con la fecha en que el recurso fue activado (la diferencia en segundos)
            const elapsedTime=moment().diff(moment(resource.activationTime), 'seconds');
            //C/que se actualiza el navegador, muestra el t que ha transcurrido
            // alert(elpsedTime);
            //multiplicando por 60 para obtenerlo en segundos
            const cuentaRegresiva=(timeToFinish*60)-elapsedTime;
            // alert(`quedan ${cuentaRegresiva} segundos`);

            //Ppregunta si existe la cuenta regresiva:
            if(cuentaRegresiva>=0) {
                resource.timeToFinish=cuentaRegresiva;

                //Aquí se actualiza el state de los segundos
                setSeconds(cuentaRegresiva);
            }
            setResource(resource);
        }

        fetchResource();

    }, []);

    //para mostrar los segundos que quedan
    useEffect(()=>{
        const interval=setInterval(()=>{
            setSeconds(seconds-1);
        }, 1000);

        // Para limpiar el intervalo y detener la cuenta regresiva 
        if(interval<0) {
            clearInterval(interval);
        }

        return ()=>clearInterval(interval);

    }, [seconds]);

    return (
        <div className='active-resource' >
            <h1 className='resource-name'>Sebastian Palacios {resource.title}</h1>
            <div className="time-wrapper">
                <h2 className="elapsed-time">{`Quedan ${seconds} segundos para terminar la tarea.`}</h2>
            </div>
            <div>
                <Link href="/">
                    <a className='button is-primary is-outlined'>Ir al recurso</a>
                </Link>
            </div>
        </div>
    );
};

export default ActiveResource;
