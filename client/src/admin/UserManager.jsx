import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ManageUser() {
  const [userList, setUserList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/user").then((response) => {
      setUserList(response.data);
    });
  }, []);

  const resetForm = () => {
    setUserId("");
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("");
    setIsUpdating(false);
  };

  const addUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/create_user", {
      user_id: userId,
      username,
      email,
      password,
      role,
    })
      .then(() => {
        setUserList([
          ...userList,
          { user_id: userId, username, email, password, role },
        ]);
        setAlertMessage("User added successfully!");
        setAlertType("success");
        resetForm(true); // รีเซ็ตฟอร์มหลังจากเพิ่มผู้ใช้
      })
      .catch(() => {
        setAlertMessage("Failed to add user.");
        setAlertType("danger");
      });
  };

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/delete_user/${id}`)
      .then(() => {
        setUserList(
          userList.filter((user) => Number(user.user_id) !== Number(id))
        );
        setAlertMessage("User deleted successfully!");
        setAlertType("success");
      })
      .catch(() => {
        setAlertMessage("Failed to delete user.");
        setAlertType("danger");
      });
  };

  const updateUser = (id) => {
    const selectedUser = userList.find((user) => user.user_id === id);
    if (selectedUser) {
      setUserId(selectedUser.user_id);
      setUsername(selectedUser.username);
      setEmail(selectedUser.email);
      setPassword(selectedUser.password);
      setRole(selectedUser.role);
      setIsUpdating(true); // เปลี่ยนสถานะเป็นการอัปเดต
    }
  };

  const sendUpdateUser = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/update_user", {
      user_id: userId,
      username,
      email,
      password,
      role,
    })
      .then(() => {
        setUserList(
          userList.map((user) =>
            user.user_id === userId
              ? { user_id: userId, username, email, password, role }
              : user
          )
        );
        setAlertMessage("User updated successfully!");
        setAlertType("success");
        resetForm(); // รีเซ็ตฟอร์มหลังจากอัปเดตผู้ใช้
      })
      .catch(() => {
        setAlertMessage("Failed to update user.");
        setAlertType("danger");
      });
  };

  return (
    <div className="container">
      <h1>Manage Users</h1>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={alertMessage !== ""}
          onClose={() => setAlertMessage("")}
          bg={alertType}
        >
          <Toast.Body>{alertMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <form className="mb-3" onSubmit={isUpdating ? sendUpdateUser : addUser}>
        <FloatingLabel
          controlId="floatingUsername"
          label="Username:"
          className="mb-3"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPassword"
          label="Password:"
          className="mb-3"
        >
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingEmail"
          label="Email:"
          className="mb-3"
        >
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingRole" label="Role:" className="mb-3">
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">-- Select Role --</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </Form.Select>
        </FloatingLabel>

        <button className="btn btn-success" type="submit">
          {isUpdating ? "Update User" : "Add User"}
        </button>
        <input
      type="reset"
      className="btn btn-danger"
      value="RESET"
      onClick={resetForm} 
    />
      </form>

      <h2>Users List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.user_id}>
              {" "}
              <td>{user.user_id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => updateUser(user.user_id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.user_id)}
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

export default ManageUser;
