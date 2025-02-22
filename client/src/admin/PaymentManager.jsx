import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function PaymentManager() {
  const [payments, setPayments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userId, setUserId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paidAt, setPaidAt] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/payment").then((response) => {
      setPayments(response.data);
    });
    Axios.get("http://localhost:3001/order").then((response) => {
      setOrders(response.data);
    });
    Axios.get("http://localhost:3001/user").then((response) => {
      setUser(response.data);
    });
  }, []);

  const resetForm = () => {
    setPaymentId("");
    setOrderId("");
    setUserId("");
    setPaymentMethod("");
    setPaymentStatus("");
    setTransactionId("");
    setPaidAt("");
    setIsUpdating(false);
  };

  const addPayment = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/create_payment", {
      payment_id: paymentId,
      order_id: orderId,
      user_id: userId,
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      transaction_id: transactionId,
      paid_at: paidAt,
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

  const deletePayment = (id) => {
    Axios.delete(`http://localhost:3001/delete_payment/${id}`)
      .then(() => {
        setPayments(payments.filter((payment) => payment.payment_id !== id));
        setAlertMessage("Payment deleted successfully!");
        setAlertType("success");
      })
      .catch(() => {
        setAlertMessage("Failed to delete payment.");
        setAlertType("danger");
      });
  };

  const updatePayment = (id) => {
    const selectedPayment = payments.find(
      (payment) => payment.payment_id === id
    );
    if (selectedPayment) {
      setPaymentId(selectedPayment.payment_id);
      setOrderId(selectedPayment.orderId);
      setUserId(selectedPayment.userId);
      setPaymentMethod(selectedPayment.paymentMethod);
      setPaymentStatus(selectedPayment.paymentStatus);
      setTransactionId(selectedPayment.transactionId);
      setPaidAt(selectedPayment.paidAt);
      setIsUpdating(true); // Set status to update
    }
  };

  const sendUpdatePayment = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/update_payment", {
      payment_id: paymentId,
      orderId,
      userId,
      paymentMethod,
      paymentStatus,
      transactionId,
      paidAt,
    })
      .then(() => {
        setOrder(
            payments.map((payment) =>
            payment.payment_id === payment_id
              ? {
                payment_id: paymentId,
                orderId,
                userId,
                paymentMethod,
                paymentStatus,
                transactionId,
                paidAt,
                }
              : payment
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
      <h1>Manage Payments</h1>
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
        onSubmit={isUpdating ? sendUpdatePayment : addPayment}
      >
        <FloatingLabel label="Order:" className="mb-3">
          <Form.Select
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          >
            <option value="">-- Select Order --</option>
            {orders.map((order) => (
              <option key={order.order_id} value={order.order_id}>
                {order.order_id}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>


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

        <FloatingLabel label="Payment Method:" className="mb-3">
          <Form.Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">-- Select Method --</option>
            <option value="Master Card">Master Card</option>
            <option value="paypal">Paypal</option>
            <option value="promptpay">PromptPay</option>
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel label="Payment Status:" className="mb-3">
          <Form.Select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="">-- Select Status --</option>
            <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
            <option value="สำเร็จ">สำเร็จ</option>
            <option value="ไม่สำเร็จ">ไม่สำเร็จ</option>
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel label="Transaction ID:" className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel label="Paid At:" className="mb-3">
          <input
            type="datetime-local"
            className="form-control"
            value={paidAt}
            onChange={(e) => setPaidAt(e.target.value)}
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

      <h2>Payment List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>Username</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Transaction ID</th>
            <th>Paid At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.payment_id}>
              <td>{payment.payment_id}</td>
              <td>{payment.order_id}</td>
              <td>{payment.user_name}</td>
              <td>{payment.payment_method}</td>
              <td>{payment.payment_status}</td>
              <td>{payment.transaction_id}</td>
              <td>{payment.paid_at}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => updatePayment(payment.payment_id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePayment(payment.payment_id)}
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

export default PaymentManager;
