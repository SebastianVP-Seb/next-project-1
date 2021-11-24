import Link from 'next/dist/client/link';
import ResourceLabel from './ResourceLabel';
import moment from 'moment';

function ResourceHighLight(props) {
    return (
        <section className="hero ">
            <div className="hero-body">
                <div className="container">
                    
                    {
                        props.RESOURCES.map(resource=>{
                            return (
                                <section key={resource.id} className="section">
                                    <div className="columns">
                                        <div className="column is-8 is-offset-2">
                                            <div className="content is-medium">
                                                <h2 className="subtitle is-4">{moment(resource.createdAt).format('LLLL')}</h2>
                                                <h1 className="title">{resource.title}</h1>

                                                <ResourceLabel resource={resource} />
                                               
                                                <p>{resource.description}</p>
                                                <Link href={`/resources/${resource.id}`} >
                                                    <a className='button is-link' >
                                                        See more details
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            );
                        })
                    }
            
                </div>
            </div>
        </section>
    );
};

export default ResourceHighLight;
