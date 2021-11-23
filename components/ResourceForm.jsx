import React, {useState} from 'react';

function ResourceForm({onSubmitForm, initialData}) {

    const DEFAULT_DATA={
        title: '',
        description:'',
        link:'',
        priority: '2. Keep it in mind',
        timeToFinish: ''
    };

    //Si no hay datos iniciales, entonces carga los datos por default
    const [form, setForm]=useState(initialData || DEFAULT_DATA);

    //...form permite traer la demás info, ya que si no se pone, sólo guardará el título
    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const resetForm=()=>{
        setForm(DEFAULT_DATA);
    };

    const submitForm=()=>{
        onSubmitForm(form);//esta f viene como prop, y a ésta se le envían los datos del form
    };

    return (
        <div className='resource-form'>
            <h1 className='title'>Add New Resource</h1>
            <form>
                <div className="field">
                    <label className="label">Title</label>
                        <div className="control">
                            <input 
                                name='title'
                                onChange={handleChange}
                                value={form.title} className="input" type="text" placeholder="What you are doing to do?" />
                        </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea  
                            name='description'
                            onChange={handleChange}
                            value={form.description} className="textarea" placeholder="Add some details"></textarea>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Link</label>
                    <div className="control">
                        <input  
                            name='link'
                            onChange={handleChange}
                            value={form.link} className="input" type="text" placeholder="Do you have a link?" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Priority</label>
                    <div className="control">
                        <div className="select">
                            <select 
                                name='priority'
                                onChange={handleChange}
                                value={form.priority} >
                                <option>1. No much priority</option>
                                <option>2. Keep it in mind</option>
                                <option>3. You should do it right now</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Time to finish</label>
                    <div className="control">
                        <input 
                            name='timeToFinish'
                            onChange={handleChange}
                            value={form.timeToFinish} className="input" type="number" placeholder="How much minutes do you need to finish it?" />
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button 
                            type='button'
                            onClick={submitForm}
                            className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button 
                            onClick={resetForm}
                            className="button is-link is-light">Reset</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ResourceForm;
