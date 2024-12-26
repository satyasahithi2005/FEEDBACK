import React, { useState } from 'react';
import './App.css'; // Optional: For styling

// FeedbackManager Component
function FeedbackManager() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(1); // Rating will be a number (1-5)
  const [comment, setComment] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Function to add feedback
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && comment) {
      const newFeedback = {
        id: editIndex !== null ? feedbacks[editIndex].id : Date.now(),
        name,
        rating,
        comment,
      };

      if (editIndex !== null) {
        // Edit existing feedback
        const updatedFeedbacks = feedbacks.slice();
        updatedFeedbacks[editIndex] = newFeedback;
        setFeedbacks(updatedFeedbacks);
      } else {
        // Add new feedback
        setFeedbacks([...feedbacks, newFeedback]);
      }

      // Reset form
      resetForm();
    }
  };

  // Function to handle editing feedback
  const handleEdit = (index) => {
    const feedback = feedbacks[index];
    setName(feedback.name);
    setRating(feedback.rating);
    setComment(feedback.comment);
    setEditIndex(index); // Set the index of feedback being edited
  };

  // Function to handle deleting feedback
  const handleDelete = (id) => {
    const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== id);
    setFeedbacks(updatedFeedbacks);
  };

  // Function to reset form after submit or edit
  const resetForm = () => {
    setName('');
    setRating(1);
    setComment('');
    setEditIndex(null);
  };

  // Function to render stars based on the rating value
  const renderStars = (currentRating, isEditable = false) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star ${index < currentRating ? 'selected' : ''}`}
        onClick={() => isEditable && setRating(index + 1)} // Clickable stars
        style={{ cursor: isEditable ? 'pointer' : 'default' }} // Make stars clickable only in editable mode
      >
        &#9733; {/* Filled star */}
      </span>
    ));
  };

  return (
    <div className="container">
      <h1>Customer Feedback Manager</h1>

      {/* Feedback Form */}
      <div className="feedback-form">
        <h3>{editIndex !== null ? 'Edit Feedback' : 'Leave Feedback'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label>Rating:</label>
          <div className="star-rating">
            {renderStars(rating, true)} {/* Pass 'true' to make the stars clickable */}
          </div>
          <div>
          <br />
          
          <textarea
            placeholder="Your Comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          </div>
          <button type="submit">{editIndex !== null ? 'Save Changes' : 'Submit Feedback'}</button>
          
        </form>
      </div>

      {/* Feedback List */}
      <h3>Feedback List</h3>
      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p>No feedback yet. Be the first to leave one!</p>
        ) : (
          feedbacks.map((feedback, index) => (
            <div key={feedback.id} className="feedback-card">
              <strong>{feedback.name}</strong> 
              <div className="star-rating">
                {renderStars(feedback.rating)} {/* Display stars */}
              </div>
              <p>{feedback.comment}</p>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(feedback.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FeedbackManager;
