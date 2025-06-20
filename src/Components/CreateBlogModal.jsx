import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { post } from '../services/Endpoint';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';


const CreateBlogModal = ({ show, handleClose, onPostCreated }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const handleImageClick = () => fileInputRef.current.click();
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) formData.append('post-image', image);
      formData.append('title', title);
      formData.append('desc', description);
      formData.append('FullName', user.FullName);

      const response = await post('/blog/create', formData);
      const data = response.data;


      if (data.success) {

        if (onPostCreated && data.blog) {
          onPostCreated(data.blog);
        }


        toast.success(data.message);
        setTitle('');
        setImage(null);
        setDescription('');
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      dialogClassName="custom-blog-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create new blog</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="d-flex flex-column flex-md-row gap-4">
            {/* Left side: Title & Description */}
            <div className="flex-fill">
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  placeholder="Write your post description here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
            </div>

            {/* Right side: Image Upload */}
            <div className="text-center" style={{ width: '200px' }}>
              <div
                className=" border rounded-circle d-flex align-items-center justify-content-center mx-auto"
                style={{ width: 100, height: 100, cursor: 'pointer' }}
                onClick={handleImageClick}
              >
                📷
              </div>
              <div className="mt-2 small fw-light">
                Upload image<br />
               
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
                accept="image/*"
              />
              {image && (
                <div className="mt-2 text-muted small">{image.name}</div>
              )}
            </div>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => {
            setImage(null);
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBlogModal;
