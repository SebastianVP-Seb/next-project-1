import Layout from 'components/Layout';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import ResourceForm from 'components/ResourceForm';

const ResourceCreate=()=> {

    const router=useRouter();//--> permite con .push navegar a la pág que queramos una vez que la promesa se haya cumplido

    const createResource=(form)=>{//los datos del form los recibe de ResourceForm, ahí, al ejecutar la f submitForm
        // alert(JSON.stringify(form));
        //no es necesario poner toda la url
        //en dónde, qué...
        axios.post('/api/resources', form)
            .then((_)=>{
                router.push('/')
                // alert(res?.data)
            })
            .catch(err=>{
                alert(err?.response?.data) //-->los signos permiten que, si los datos vienen como undefined, no se lance error
            })
        // e.target.reset();
    };

    return (
        <Layout>

            <div className='container'>
                <div className='columns'>
                    <div className='column is-8 is-offset-2'>
                       <ResourceForm 
                            onSubmitForm={createResource}
                       />
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default ResourceCreate;
