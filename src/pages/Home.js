import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Home = () => {
    //store form list
    const [forms, setForms] = useState([]);

    useEffect(() => {
        //fetch all forms
        const fetchForms = async () => {
            await axios.get("https://frozen-river-29677.herokuapp.com/api/forms")
                .then(res => {
                    if (res.data) {
                        //set at forms state
                        setForms(res.data);
                    }
                })
                .catch(e => console.log(e.message))
        }
        fetchForms();
    }, [])

    return (
        <Container>
            <Table striped bordered hover className='mt-5'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Form Name</th>
                        <th>Reports</th>
                    </tr>
                </thead>
                <tbody>
                    {/* show all form in table */}
                    {
                        forms.map((form, i) =>
                            < tr key={i} >
                                <td>{i + 1}</td>
                                <td><NavLink to={`ViewForm/${form._id}`} className="text-decoration-none">{form.formName}</NavLink></td>
                                <td><Button as={NavLink} size="sm" to={`Reports/${form._id}`} className="text-decoration-none">Reports</Button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Container >
    );
};

export default Home;