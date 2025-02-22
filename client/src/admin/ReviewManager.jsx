import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ReviewManager() {
  const [Review, setReview] = useState([]);
  const [GameAccounts, setGameAccounts] = useState([]);
  const [user, setUser] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const [reviewId, setReviewId] = useState("");
  const [userId, setUserId] = useState("");
  const [GameAccountsId, setGameAccountsId] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [createdAt, setCreatedat] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/review").then((response) => {
      setReview(response.data);
    });
    Axios.get("http://localhost:3001/user").then((response) => {
      setUser(response.data);
    });
    Axios.get("http://localhost:3001/game_accounts").then((response) => {
      setGameAccounts(response.data);
    });
  }, []);

  const resetForm = () => {
    setReviewId("");
    setUserId("");
    setGameAccountsId("");
    setRating("");
    setComment("");
    setCreatedat("");
    setIsUpdating(false);
  };

  const addReview = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/create_review", {
      review_id: reviewId,
      user_id: userId,
      game_accounts_id: GameAccountsId,
      rating: rating,
      comment: comment,
      created_at: createdAt,
    })
      .then(() => {
        setAlertMessage("Payment added successfully!");
        setAlertType("success");
        resetForm();
      })
      .catch(() => {
        setAlertMessage("Failed to add payment.");
        setAlertType("danger");
      });
  };

  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/delete_review/${id}`)
      .then(() => {
        setPayments(Review.filter((review) => review.review_id !== id));
        setAlertMessage("Payment deleted successfully!");
        setAlertType("success");
      })
      .catch(() => {
        setAlertMessage("Failed to delete payment.");
        setAlertType("danger");
      });
  };

  const updateReview = (id) => {
    const selectedReview = Review.find((review) => review.review_id === id);
    if (selectedPayment) {
      setReviewId(selectedReview.review_id);
      setUserId(selectedReview.userId);
      setGameAccountsId(selectedReview.GameAccountsId);
      setRating(selectedReview.rating);
      setComment(selectedReview.comment);
      setCreatedat(selectedReview.createdAt);
      setIsUpdating(true); // Set status to update
    }
  };

  const sendUpdateReview = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/update_review", {
      review_id: reviewId,
      userId,
      GameAccountsId,
      rating,
      comment,
      createdAt,
    })
      .then(() => {
        setOrder(
          Review.map((review) =>
            review.review_id === review_id
              ? {
                  review_id: reviewId,
                  userId,
                  GameAccountsId,
                  rating,
                  comment,
                  createdAt,
                }
              : review
          )
        );
        setAlertMessage("User updated successfully!");
        setAlertType("success");
        resetForm(); // Reset form after updating user
      })
      .catch(() => {
        setAlertMessage("Failed to update user.");
        setAlertType("danger");
      });
  };

  return (
    <div className="container">
      <h1>Manage Review</h1>
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={alertMessage !== ""}
          onClose={() => setAlertMessage("")}
          bg={alertType}
        >
          <Toast.Body>{alertMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <form
        className="mb-3"
        onSubmit={isUpdating ? sendUpdateReview : addReview}
      >
        <FloatingLabel label="User:" className="mb-3">
          <Form.Select
            value={userId}
            onChange={(e) => setUserid(e.target.value)}
          >
            <option value="">-- Select User --</option>
            {user.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.user_name} ({user.user_id})
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel label="Game Id:" className="mb-3">
          <Form.Select
            value={GameAccountsId}
            onChange={(e) => setGameAccountsId(e.target.value)}
          >
            <option value="">-- Select Game Id --</option>
            {GameAccounts.map((game) => (
              <option key={game.game_accounts_id} value={game.game_accounts_id}>
                {game.game_accounts_id}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel label="Rating:" className="mb-3">
          <Form.Select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">-- Select Rating --</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel label="Comment :" className="mb-3">
          <Form.Control
            as="textarea"
            className="form-control"
            placeholder="Enter your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ height: "100px" }}
          />
        </FloatingLabel>

        <FloatingLabel label="Create At:" className="mb-3">
          <input
            type="datetime-local"
            className="form-control"
            value={createdAt}
            onChange={(e) => setCreatedat(e.target.value)}
          />
        </FloatingLabel>

        <button className="btn btn-success" type="submit">
          {isUpdating ? "Update Payment" : "Add Payment"}
        </button>
        <input
          type="reset"
          className="btn btn-danger"
          value="RESET"
          onClick={resetForm}
        />
      </form>

      <h2>Review List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Review ID</th>
            <th>Username</th>
            <th>Game Id</th>
            <th>rating</th>
            <th>comment</th>
            <th>Create At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Review.map((review) => (
            <tr key={review.review_id}>
              <td>{review.review_id}</td>
              <td>{review.user_name}</td>
              <td>{review.game_accounts_id}</td>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
              <td>{review.created_at}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => updateReview(review.review_id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteReview(review.review_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewManager;
