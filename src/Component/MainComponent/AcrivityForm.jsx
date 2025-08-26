import NeklooForm from "../Form/NeklooForm";
import Input from "../Form/Input";
import Textarea from "../Form/Textarea";
import LogicForm from "../Hook/LogicForm";
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import ValidationButton from "../Form/ValidationButton";

export default function ActivityForm(){
    const [formData, setFormData] = useState({
        description: '',
        name: '',
    });

    const { submit, isLoading, message } = LogicForm({
        endpoint: 'activity/create',
        onSuccess: () => {
            console.log('Succès !');
        },
        method: 'POST',
        redirection: "/"
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        submit(formData);
    };
    return (
        <div className="row">
        <div className="col-12 vh-100 d-flex justify-content-center align-items-center overflow-hidden m-0">
        <div className="w-50">
        <NeklooForm title="Ajouet une activité">
            {message}
            <Input property="name"
              printer="Nom"
              value={formData.name}
              onChange={handleChange}
              required={true}/>


            <Textarea property="description"
              printer="Description"
                value={formData.description}
                onChange={handleChange}
                required={true}
            />

            <div className='d-flex justify-content-center align-items-center'>
                <ValidationButton props={{
                    onClick: handleSubmit,
                    disabled: isLoading,
                    content: isLoading ? "Let's go" : "Let's go",
                    id: 'validate'
                }} />
            </div>

            
        </NeklooForm>
        </div>
        </div>
        </div>
    );
}