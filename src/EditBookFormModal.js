import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditBookModal = ({ book, updateBook }) => {
    const [showModal, setShowModal] = useState(false);
    const [editedBookData, setEditedBookData] = useState({
        title: book.title,
        description: book.description,
        status: book.status,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedBookData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Construct the API URL for updating the book
            const API = `${process.env.REACT_APP_SERVER_URL}/books/${book._id}`;

            // Send a PUT request to update the book details
            const res = await axios.put(API, editedBookData);

            // Update the book with the updated data
            updateBook(res.data);
            console.log('Book updated:', res.data);

            // Close the modal
            setShowModal(false);
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleModalOpen = () => {
        // Open the modal
        setShowModal(true);
    };

    const handleModalClose = () => {
        // Close the modal
        setShowModal(false);
    };

    return (
        <>
            <Button variant="secondary" onClick={handleModalOpen}>
                Edit
            </Button>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={editedBookData.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                name="status"
                                value={editedBookData.status}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={editedBookData.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditBookModal;
