import { Table, Container, Col, Form, Row, Button, Pagination } from 'react-bootstrap/';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function DashBoard() {
    const [records, setRecords] = useState([]);
    const [editID, setEditID] = useState();
    const [inputData, setInputData] = useState({
        id: '',
        title: '',
        body: ''
    });
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [postsPerPage] = useState(5); // Number of posts per page

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('https://jsonplaceholder.typicode.com/posts', inputData);
            setRecords([...records, res.data]);
            setInputData({
                id: '',
                title: '',
                body: ''
            });
            alert("Data Added successfully");
        } catch (error) {
            console.error("Error adding data:", error);
        }
    }

    const handleDelete = async (deleteID) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${deleteID}`);
            const updatedRecords = records.filter(record => record.id !== deleteID);
            setRecords(updatedRecords);
            alert("Data Deleted successfully");
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    }

    const handleEdit = async (eId) => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${eId}`);
            setInputData(res.data);
            setEditID(res.data.id);
        } catch (error) {
            console.error("Error fetching data for edit:", error);
        }
    }

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${editID}`, inputData);
            const updatedRecords = records.map(record =>
                record.id === editID ? res.data : record
            );
            setRecords(updatedRecords);
            setInputData({
                id: '',
                title: '',
                body: ''
            });
            setEditID(null);
            alert("Data Updated successfully");
        } catch (error) {
            console.error("Error updating data:", error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setRecords(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = records.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <Container id='con1'>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Control
                                value={inputData.id}
                                placeholder="id"
                                onChange={event => setInputData({ ...inputData, id: event.target.value })}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                value={inputData.title}
                                placeholder="title"
                                onChange={event => setInputData({ ...inputData, title: event.target.value })}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                value={inputData.body}
                                placeholder="body"
                                onChange={event => setInputData({ ...inputData, body: event.target.value })}
                            />
                        </Col>
                    </Row>
                    <Button variant="dark" type="submit">Add</Button>
                    <Button variant="dark" onClick={handleUpdate}>Update</Button>
                </Form>
            </Container>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>Description</th>
                        <th colSpan={2}>CRUD Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((record, index) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.title}</td>
                            <td>{record.body}</td>
                            <td>
                                <Button variant="light" onClick={() => {
                                    handleEdit(record.id);
                                    setEditID(record.id);
                                }}>
                                    Edit
                                </Button>
                            </td>
                            <td>
                                <Button variant="light" onClick={() => handleDelete(record.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(Math.ceil(records.length / postsPerPage)).keys()].map(number => (
                    <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)} active={number + 1 === currentPage}>
                        {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(records.length / postsPerPage)} />
            </Pagination>
        </>
    );
}
