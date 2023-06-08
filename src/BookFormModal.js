import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const BookFormModal = ({ books, setBooks }) => {
    const [showModal, setShowModal] = useState(false);
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        description: '',
        status: '',
    });
    const { getAccessTokenSilently } = useAuth0();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBookData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const API = `${process.env.REACT_APP_SERVER_URL}/books`;
            const token = await getAccessTokenSilently();
            const response = await axios.post(API, bookData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const newBook = response.data;

            setBooks((prevBooks) => [...prevBooks, newBook]);
            console.log('New book:', newBook);
        } catch (error) {
            console.error('Error creating book:', error);
        }

        setBookData({
            title: '',
            author: '', // Reset author field
            description: '',
            status: '',
        });
        setShowModal(false);
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <Button variant="primary" onClick={handleModalOpen}>
                Add Book
            </Button>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                name="title"
                                value={bookData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter author"
                                name="author"
                                value={bookData.author}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                name="description"
                                value={bookData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create Book
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default BookFormModal;
