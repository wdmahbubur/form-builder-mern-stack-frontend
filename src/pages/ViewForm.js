import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ViewForm = () => {
    // collect id from url by useParams hooks
    const { id } = useParams();
    //use navigate for after success then go reports page
    const navigate = useNavigate();

    // store form info get by form id
    const [form, setForm] = useState();

    // store user input data
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchForm = async () => {
            await axios.get(`https://frozen-river-29677.herokuapp.com/api/forms/${id}`)
                .then(res => {
                    if (res.data) {
                        setForm(res.data);
                    }
                })
                .catch(e => console.log(e.message));
        }
        fetchForm();
    }, [id])

    // store user input in data state
    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const newData = { ...data };
        newData[field] = value;
        setData(newData);
    }

    // save user input data in database through api
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        //make a document object for pass data by api
        const doc = {
            formId: id,
            formName: form.formName,
            data
        }

        await axios.post("https://frozen-river-29677.herokuapp.com/api/reports/", {
            data: doc
        })
            .then(res => {
                if (res.data.data) {
                    // after successfully save user data in database then goto reports
                    navigate(`/Reports/${id}`, { replace: true })
                }
            })
            .catch(err => console.log(err.message))
    }

    return (
        <Container>
            {/* if form data are available then show the form, it check it by formName property */}
            {form?.formName ? <>
                <h2 className='text-center mt-5'>{form.formName}</h2>
                <Form onSubmit={handleSubmitForm}>

                    {/* show form fields */}
                    {
                        form.fields.map((field, i) => {
                            return (
                                field.type === "textarea" ?
                                    <Form.Group className="mb-3" key={i}>
                                        <Form.Label>{field.label}</Form.Label>
                                        <Form.Control as="textarea" id={`${i}`} name={field.name} onChange={handleInput} required={field.required} rows={3} />
                                    </Form.Group>
                                    :
                                    <Form.Group className="mb-3" key={i}>
                                        <Form.Label>{field.label}</Form.Label>
                                        <Form.Control type={field.type} id={`${i}`} name={field.name} onChange={handleInput} required={field.required} />
                                    </Form.Group>
                            )
                        })
                    }
                    <Button type="submit">Submit</Button>
                </Form>
            </>
                :
                // or form is not available then show loading
                <h1>Loading...</h1>
            }

        </Container >
    );
};

export default ViewForm;