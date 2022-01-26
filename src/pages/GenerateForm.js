import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GenerateForm = () => {
    //use navigate for after success save then go home page
    const navigate = useNavigate();

    // store all selected field
    const [inputFields, setInputFields] = useState([]);

    //set field in the state
    const addInputField = (type) => {
        const newInputFiled = [...inputFields, { type: type, value: "", name: "", label: "", required: false }]
        setInputFields(newInputFiled);
    }

    //remove field from state
    const removeInputField = (index) => {
        const newArr = inputFields.filter((field, i) => i !== index);
        setInputFields(newArr)
    }

    // handle field is required or not
    const handleRequired = (e) => {
        const index = e.target.id;
        inputFields[index].required = e.target.checked;
        console.log(inputFields)
    }

    // handle selected field name
    const handleFieldName = (e) => {
        const index = parseInt(e.target.id);
        const label = e.target.value;
        //divide the field name in a array for set label Capitalization and set name as camelcase
        const nameArr = label.split(" ");
        let name = nameArr[0].toLowerCase();
        if (nameArr.length > 1) {
            for (let i = 1; nameArr.length > i; i++) {
                name = name + nameArr[i].charAt(0).toUpperCase() + nameArr[i].slice(1);
            }
        }

        //set the label and name at inputFields
        setInputFields(fields => {
            const newArr = fields.slice()
            newArr[index].name = name;
            newArr[index].label = label;
            return newArr
        })
    }

    // save form in database through the api
    const saveForm = async (e) => {
        e.preventDefault();

        const data = {
            formName: e.target.formName.value,
            fields: inputFields,
        }
        await axios.post("https://frozen-river-29677.herokuapp.com/api/forms", {
            data: data
        })
            .then(res => {
                if (res.data) {
                    alert("Form Save Success")
                    //after success goto home
                    navigate("/", { replace: true })
                }
            })
            .catch(e => console.log(e.message))
    }
    return (
        <Container>
            <Row className='mt-4'>
                <h2 className='text-center'>Create New Form</h2>
                <Col md={8}>
                    <Form onSubmit={saveForm}>
                        <Form.Group className="mb-3">
                            <Form.Label>Form Name</Form.Label>
                            <Form.Control type="text" name="formName" placeholder="Enter your form name" required />
                        </Form.Group>
                        {/* user choice any field then show it */}
                        {inputFields.length > 0 &&
                            <div className='border border-2 p-4 mb-2'>
                                {/* show selected fields */}
                                {
                                    inputFields.map((field, i) => {
                                        return (
                                            <Form.Group className="mb-3" key={i}>
                                                <div className="d-flex align-items-center gap-2">
                                                    <Form.Label className="flex-grow-1">
                                                        {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                                                    </Form.Label>
                                                    <span className="">
                                                        Required?
                                                    </span>
                                                    <input type="checkbox" id={i} onChange={handleRequired} />
                                                    <Button size="sm" className="bg-danger border-0 me-2 mb-1" title='Remove Field' onClick={() => removeInputField(i)}>X</Button>
                                                </div>

                                                <Form.Control type="text" placeholder="Enter field name" id={`${i}`} onChange={handleFieldName} required />
                                            </Form.Group>
                                        )
                                    }
                                    )
                                }
                            </div>
                        }
                        <Button type="submit" disabled={inputFields.length > 0 ? false : true}>Save Form</Button>
                    </Form>

                </Col>
                <Col md={4}>
                    <h5 className='mt-2'>Choice field here:</h5>
                    <Button onClick={() => addInputField("text")} className='d-block mb-2'>Text Field</Button>
                    <Button onClick={() => addInputField("number")} className='d-block mb-2'>Number Field</Button>
                    <Button onClick={() => addInputField("date")} className='d-block mb-2'>Date Field</Button>
                    <Button onClick={() => addInputField("textarea")} className='d-block mb-2'>Textarea</Button>
                </Col>
            </Row>
        </Container >
    );
};

export default GenerateForm;