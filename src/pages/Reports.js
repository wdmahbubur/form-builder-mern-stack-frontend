import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Reports = () => {
    // collect  formId from url by useParams hooks
    const { formId } = useParams();
    //store form data for table heading
    const [form, setForm] = useState({});
    // store reports form database
    const [reports, setReports] = useState([]);
    useEffect(() => {
        //fetch form by form id
        const fetchForm = async () => {
            await axios.get(`http://localhost:5000/api/forms/${formId}`)
                .then(res => {
                    if (res.data) {
                        setForm(res.data);
                    }
                })
                .catch(err => console.log(err.message));
        }
        fetchForm();

        //fetch reports by form id
        const fetchReports = async () => {
            await axios.get(`http://localhost:5000/api/reports?formId=${formId}`)
                .then(res => {
                    if (res.data) {
                        setReports(res.data)
                    }
                })
                .catch(err => console.log(err.message));
        }
        fetchReports();

    }, [formId])

    console.log(reports);
    return (
        <Container>
            {/* check form data available or not */}
            {form?.formName ? <>
                <h2 className='text-center mt-5'>{form.formName}</h2>
                <Table striped bordered hover className='mt-5'>
                    <thead>
                        <tr>
                            <th>#</th>
                            {/* show table heading */}
                            {
                                form?.fields.map(field => <>
                                    <th>{field.label}</th>
                                </>
                                )
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {/* show reports */}
                        {
                            reports?.map((report, i) =>
                                < tr key={i} >
                                    <td>{i + 1}</td>
                                    {/* show data with heading serial */}
                                    {
                                        form.fields.map((field, i) => <td key={i}>{report.data[field.name]}</td>)
                                    }

                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </>
                // form is not available then show loading
                :
                <h1>Loading...</h1>
            }
        </Container >
    );
};

export default Reports;