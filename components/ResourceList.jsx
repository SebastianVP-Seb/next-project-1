import React from 'react';
import Link from 'next/dist/client/link';

function ResourceList(props) {
    return (
        <section className="hero ">
            <div className="hero-body">
                <div className="container">
                    <section className="section">
                        <div className="is-multiline columns is-variable is-8">
                            {
                                props.RESOURCES.map(resource=>{
                                    return (
                                        <div key={resource.id} className="column is-5 is-offset-1 ">
                                            <div className="content is-medium">
                                                <h2 className="subtitle is-5 has-text-grey">{resource.createdAt}</h2>
                                                <h1 className="title has-text-black is-3">{resource.title}</h1>
                                                <p className="has-text-dark">{resource.description}</p>
                                                <Link href={`/resources/${resource.id}`} >
                                                    <a className='button is-primary' >See more details</a>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                    </div>
                </section>
            
                </div>
            </div>
        </section>
    );
};

export default ResourceList;
