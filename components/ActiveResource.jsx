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

    const completeResource=()=>{
        //Para activar el recurso        
        axios.patch('/api/resources', {...resource, status: 'complete'})
            .then(()=>{alert('Rsource has been activated')
                       location.reload()})
            .catch(()=>alert('Cannot complete this resource'))
    };

    //Para que al cambiar de pág, no se muestre vacío el contendor de los segundos restantes:
    const hasResource=resource && resource.id;

    return (
        <div className='active-resource' >
            <h1 className='resource-name'>
                {hasResource ? resource.title : 'There is not any resource active'}</h1>
            <div className="time-wrapper">
                {
                    hasResource && 
                    (
                        seconds>0
                        ? <h2 className="elapsed-time">{` ${seconds} left`}</h2>
                        : <h2 className="elapsed-time">
                            <button className='button is-success is-outlined'
                                    onClick={completeResource}
                            >Click and Done</button>
                        </h2>
                    )
                }
                
            </div>
            {
                hasResource 
                ? <Link href={`/resources/${resource.id}`}>
                    <a className='button is-primary is-outlined'>Ir al recurso</a>
                </Link>
                : <Link href="/">
                    <a className='button is-primary is-outlined'>Ir a los recursos</a>
                </Link>
            }
        </div>
    );
};

export default ActiveResource;
