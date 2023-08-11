import React, { useState, useEffect } from "react";
import axios from "axios";
import "./comment.css"


const CommentsSection = ({ productId,newComment, setNewComment }) => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({});
  const [displayedComments, setDisplayedComments] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/product/${productId}`);
        const productData = response.data;

        setComments(productData.comments);
        setTotalComments(productData.comments.length); // Set total comments
        fetchUsers(productData.comments.map(comment => comment.userId));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [productId]);

  const fetchUsers = async (userIds) => {
    try {
      const response = await axios.get(`http://localhost:4000/users?ids=${userIds.join(',')}`);
      const usersData = response.data;
      
      const usersMap = {};
      usersData.forEach(user => {
        usersMap[user._id] = user;
      });
  
      setUsers(usersMap);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSeeMore = () => {
    setDisplayedComments(displayedComments + 3);
  };

  const handleAddComment = async (comment) => {
    if (comment.trim() !== "") {
      try {
        // Retrieve the userId from localStorage
        const userId = localStorage.getItem(`userid`);
        
        // Check if userId is available
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }
  
        const response = await axios.post(`http://localhost:4000/product/${productId}/addcomment`, {
          userId,
          text: newComment,
        });
        
        // Update the comments state and increment totalComments
        setComments([...comments, { text: comment }]);
        setTotalComments(totalComments + 1);
        
        // Clear the newComment input
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <div className="comment-section">
    <h2>Comments</h2>
    {isLoading ? (
        <p>Loading comments...</p>
      )  : (
      <ul>
        {comments.slice(0, displayedComments).map((comment, index) => (
          <li key={index}>
            <div className="comment-container">
              {comment.userId && users[comment.userId] && (
                <div className="comment-user">
                  <img
                    src={
                      users[comment.userId]?.pic
                        ? `http://localhost:4000/${users[comment.userId].pic.replace("\\", "/")}`
                        : "default-profile-picture-url"
                    }
                    alt={users[comment.userId]?.username}
                    className="user-profile-picture"
                  />
                  <div className="user-details">
                    <p className="username">{users[comment.userId]?.username}</p>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    )}

    {comments.length > displayedComments && (
      <button className="btn btn-primary see-more-button" onClick={handleSeeMore}>
        See More
      </button>
    )}
      <div className="comment-input">
        <textarea
          rows="3"
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button className="btn btn-primary add-comment-button" onClick={() => handleAddComment(newComment)}>
          Add Comment
        </button>
      </div>
      <p>Total Comments: {totalComments}</p>
    </div>
  );
};

export default CommentsSection;
