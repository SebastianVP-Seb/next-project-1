import Layout from 'components/Layout';
import Link from 'next/dist/client/link';
import axios from 'axios';

function ResourceDetail({resourceId, resource}) {

    console.log(resourceId); //-> se comprueba que se recibe el id
    //resource es el obj con todos los datos del post

    const activateResource=()=>{
        //Para activar el recurso        
        axios.patch('/api/resources', {...resource, status: 'active'})
            .then(()=>alert('Rsource has been activated'))
            .catch(()=>alert('Cannot active this resource'))
    };

    return (
        <Layout>
            <section className="hero ">
                <div className="hero-body">
                    <div className="container">
                        <section className="section">
                            <div className="columns">
                                <div className="column is-8 is-offset-2">
                                    <div className="content is-medium">
                                        <h2 className="subtitle is-4">{resource.createdAt}</h2>
                                        <h1 className="title">{resource.title}</h1>
                                        <p>{resource.description}</p>
                                        <p>Time to finish: {resource.timeToFinish} minutes</p>
                                        <Link href={`/resources/${resourceId}/edit`} >
                                            <a className='button is-warning' >Edit</a>
                                        </Link>
                                        <button className='button is-primary ml-2'
                                                onClick={activateResource}>
                                            Activar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>            
        </Layout>
    );
};

export default ResourceDetail;

//El nombre de "id", debe coincidir con el nombre del archivo [id].js
export async function getServerSideProps(context) {

    const dataRespuesta=await fetch(`http://localhost:3001/api/resources/${context.params.id}`);
    const data=await dataRespuesta.json();

    return {
        props: {
            resourceId:context.params.id, //esto mismo se regresa a esta misma función, esto es para probar 
            resource: data
        }
    }
};

/*resourceId funcionaría también con context.query.id. Con query se pueden obtener todos los parámetros, con params
sólo el id */
