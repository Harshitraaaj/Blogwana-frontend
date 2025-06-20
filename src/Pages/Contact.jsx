import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Users, BookOpen } from 'lucide-react';
import Navbar from '../Components/Navbar';
import toast from 'react-hot-toast';
import { post } from '../services/Endpoint';
import { useSelector } from 'react-redux';

const Contact = () => {

  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    fullname: user ? user.FullName : "",
    email: user ? user.email : "",
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await post(`/contact/create`, formData);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setFormData({ fullname: user ? user.FullName : "", email: user ? user.email : "", subject: '', message: '' });
      } else {
        toast.error('Failed to create the contact.');
      }
    } catch (error) {
      toast.error('Something went wrong.');
      console.error('Contact Error:', error);
    }
  };

  const contactInfo = [
    { icon: Mail, title: 'Email Us', content: 'blogwana@bloghub.com', description: 'Send us an email anytime' },
    { icon: Phone, title: 'Call Us', content: '+1 (555) 123-4567', description: 'Mon-Fri from 8am to 5pm' },
    { icon: MapPin, title: 'Visit Us', content: 'xyz street', description: 'Come say hello at our office' }
  ];

  const reasons = [
    { icon: MessageCircle, title: 'General Inquiries', description: 'Questions about our content or platform' },
    { icon: Users, title: 'Collaboration', description: 'Partner with us or join our writing team' },
    { icon: BookOpen, title: 'Content Requests', description: "Suggest topics you'd like us to cover" }
  ];

  return (
    <div className=" min-vh-100">
      <Navbar />

      {/* Hero Section */}
      <div className="py-5 text-center  border-bottom">
        <h1 className="display-4 fw-bold">
          Get in <span style={{ color: "#67C9CF" }}>Touch</span>
        </h1>
        <p className="lead mx-auto w-75">
          Have a question, suggestion, or want to collaborate? We'd love to hear from you and will get back to you as soon as possible.
        </p>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card shadow-sm p-4">
              <h3 className="mb-4">Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="fullname" className="form-control" value={formData.fullname} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Subject</label>
                    <select name="subject" className="form-select" value={formData.subject} onChange={handleInputChange} required>
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="content">Content Request</option>
                      <option value="technical">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Message</label>
                    <textarea name="message" className="form-control" rows="5" value={formData.message} onChange={handleInputChange} required></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                      <Send size={16} /> Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info + Reasons */}
          <div className="col-lg-6">
            <div className="card mb-4 shadow-sm p-4">
              <h3 className="mb-4">Contact Information</h3>
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <div className="d-flex mb-3 align-items-start gap-3" key={i}>
                    <div className="bg-primary text-white p-2 rounded">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h6 className="mb-1 fw-semibold">{info.title}</h6>
                      <p className="mb-1 text-outline-primary fw-medium">{info.content}</p>
                      <small style={{ color: "gray" }}>{info.description}</small>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="card shadow-sm p-4">
              <h3 className="mb-4">Why Contact Us?</h3>
              {reasons.map((reason, i) => {
                const Icon = reason.icon;
                return (
                  <div className="d-flex mb-3 align-items-start gap-3" key={i}>
                    <Icon size={20} className="text-primary mt-1" />
                    <div>
                      <h6 className="fw-semibold mb-1">{reason.title}</h6>
                      <small style={{ color: "gray" }}>{reason.description}</small>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-primary text-white text-center p-4 mt-4 rounded">
              <h5 className="mb-2">Quick Response</h5>
              <p className="mb-0">We typically respond to all inquiries within 24 hours. For urgent matters, please call us directly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;