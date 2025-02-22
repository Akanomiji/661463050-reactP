import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function OrderManager() {
  const [OrderList, setOrder] = useState([]);
  const [gameAccounts, setGameaccounts] = useState([]); // To hold the list of games
  const [user, setUser] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userId, setUserid] = useState("");
  const [GameAccountsId, setGameAccountsId] = useState("");
  const [totalPrice, setTotalprice] = useState("");
  const [orderStatus, setOrderstatus] = useState("");
  const [createdAt, setCreatedat] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); // To manage update status

  useEffect(() => {
    Axios.get("http://localhost:3001/order").then((response) => {
      setOrder(response.data); // Fetch games data
    });
    Axios.get("http://localhost:3001/game_accounts").then((response) => {
      console.log(response.data);
      setGameaccounts(response.data);
    });
    Axios.get("http://localhost:3001/user").then((response) => {
      setUser(response.data); // Fetch games data
    });
  }, []);

  const resetForm = () => {
    setOrderId("");
    setUserid("");
    setGameAccountsId("");
    setTotalprice("");
    setOrderstatus("");
    setCreatedat("");
    setIsUpdating(false);
  };

  const addOrder = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/create_order", {
      order_id: orderId,
      userId,
      GameAccountsId,
      totalPrice,
      orderStatus,
      createdAt,
    })
      .then(() => {
        setOrder([
          ...OrderList,
          {
            order_id: orderId,
            userId,
            GameAccountsId,
            totalPrice,
            orderStatus,
            createdAt,
          },
        ]);
        setAlertMessage("GameAccounts added successfully!");
        setAlertType("success");
        resetForm(); // Reset form after adding user
      })
      .catch(() => {
        setAlertMessage("Failed to add GameAccounts.");
        setAlertType("danger");
      });
  };

  const deleteOrder = (id) => {
    Axios.delete(`http://localhost:3001/delete_order/${id}`)
      .then(() => {
        setOrder(
          OrderList.filter((order) => Number(order.order_id) !== Number(id))
        );
        setAlertMessage("GameAccounts deleted successfully!");
        setAlertType("success");
      })
      .catch(() => {
        setAlertMessage("Failed to delete GameAccounts.");
        setAlertType("danger");
      });
  };

  const updateOrder = (id) => {
    const selectedOrder = OrderList.find((order) => order.order_id === id);
    if (selectedOrder) {
      setOrderId(selectedOrder.order_id);
      setGameAccountsId(selectedOrder.GameAccountsId);
      setUserid(selectedOrder.userId);
      setTotalprice(selectedOrder.totalPrice);
      setOrderstatus(selectedOrder.orderStatus);
      setCreatedat(selectedOrder.createdAt);
      setIsUpdating(true); // Set status to update
    }
  };

  const sendUpdateOrder = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/update_order", {
      order_id: orderId,
      userId,
      GameAccountsId,
      totalPrice,
      orderStatus,
      createdAt,
    })
      .then(() => {
        setOrder(
          OrderList.map((order) =>
            order.order_id === orderId
              ? {
                  order_id: orderId,
                  userId,
                  GameAccountsId,
                  totalPrice,
                  orderStatus,
                  createdAt,
                }
              : order
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
      <h1>Manage Orders</h1>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={alertMessage !== ""}
          onClose={() => setAlertMessage("")}
          bg={alertType}
        >
          <Toast.Body>{alertMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <form className="mb-3" onSubmit={isUpdating ? sendUpdateOrder : addOrder}>
        <FloatingLabel label="User:" className="mb-3">
          <Form.Select
            value={userId}
            onChange={(e) => setUserid(e.target.value)}
          >
            <option value="">-- Select User --</option>
            {user.map((order) => (
              <option key={order.user_id} value={order.user_id}>
                {order.user_name} ({order.user_id})
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel label="Game Account:" className="mb-3">
          <Form.Select
            value={gameAccounts}
            onChange={(e) => setGameAccountsId(e.target.value)}
          >
            <option value="">-- Select Game Account --</option>
            {gameAccounts.map((order) => (
              <option
                key={order.game_accounts_id}
                value={order.game_accounts_id}
              >
                {order.game_accounts_id}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingTotalPrice"
          label="Total Price:"
          className="mb-3"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter Total Price"
            value={totalPrice}
            onChange={(e) => setTotalprice(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingOrderStatus"
          label="Order Status:"
          className="mb-3"
        >
          <Form.Select
            value={orderStatus}
            onChange={(e) => setOrderstatus(e.target.value)}
          >
            <option value="">-- Select Status --</option>
            {OrderList.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingCreatedAt"
          label="Date:"
          className="mb-3"
        >
          <input
            type="datetime-local"
            className="form-control"
            placeholder="Enter Date"
            value={createdAt}
            onChange={(e) => setCreatedat(e.target.value)}
          />
        </FloatingLabel>


        <button className="btn btn-success" type="submit">
          {isUpdating ? "Update Game Account" : "Add Game Account"}
        </button>
        <input
          type="reset"
          className="btn btn-danger"
          value="RESET"
          onClick={resetForm}
        />
      </form>

      <h2>Order List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Game Account</th>
            <th>Total Price</th>
            <th>Order Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {OrderList.map((order) => (
            <tr key={order.order_id}>
              <td>{order.user_name}</td>
              <td>{order.game_accounts_id}</td>
              <td>{order.total_price}</td>
              <td>{order.order_status}</td>
              <td>{order.created_at}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => updateOrder(order.order_id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteOrder(order.order_id)}
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

export default OrderManager;
