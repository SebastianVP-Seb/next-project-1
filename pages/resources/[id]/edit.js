import Layout from 'components/Layout';
import ResourceForm from 'components/ResourceForm';
import axios from 'axios';

function edit({resource}) {
    //El prop initial data tendrá los datos del recurso que se quiere editar
    console.log(resource);

    const updateForm=(form)=>{
        alert(JSON.stringify(form));
    };

    const updateResource=(form)=>{
        axios.patch('/api/resources', form)
            .then(()=>alert('Data has been updated'))
            .catch(err=>alert(err?.response?.data))
    };

    return (
        <Layout>
            <div className='container'>
                <div className='columns'>
                    <div className='column is-8 is-offset-2'>
                        Esta es la pág Edit de {`${resource.title}`}
                        <ResourceForm 
                            initialData={resource}
                            onSubmitForm={updateResource}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getServerSideProps= async (context)=>{
    const respuesta=await fetch(`${process.env.API_URL}/resources/${context.params.id}`);
    const resultado=await respuesta.json();

    return {
        props: {
            resource:resultado
        }
    };
};

export default edit;
