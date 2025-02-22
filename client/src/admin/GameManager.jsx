import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function GameManager() {
  const [gamesList, setGamesList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [gameId, setGameId] = useState("");
  const [gamename, setGamename] = useState("");
  const [platform, setPlatform] = useState("");
  const [Gameimage, setGameimage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); // เพื่อจัดการสถานะการอัปเดต

  useEffect(() => {
    Axios.get("http://localhost:3001/games").then((response) => {
      setGamesList(response.data);
    });
  }, []);

  const resetForm = () => {
    setGameId("");
    setGamename("");
    setGameimage("");
    setPlatform("");
    setIsUpdating(false);
  };

  const addGames = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/create_games", {
      game_id: gameId,
      gamename,
      Gameimage,
      platform,
    })
      .then(() => {
        setGamesList([
          ...gamesList,
          { game_id: gameId, gamename, Gameimage, platform },
        ]);
        setAlertMessage("games added successfully!");
        setAlertType("success");
        resetForm(); // รีเซ็ตฟอร์มหลังจากเพิ่มผู้ใช้
      })
      .catch(() => {
        setAlertMessage("Failed to add games.");
        setAlertType("danger");
      });
  };

  const deleteGames = (id) => {
    Axios.delete(`http://localhost:3001/delete_games/${id}`)
      .then(() => {
        setGamesList(
          gamesList.filter((games) => Number(games.game_id) !== Number(id))
        );
        setAlertMessage("games deleted successfully!");
        setAlertType("success");
      })
      .catch(() => {
        setAlertMessage("Failed to delete games.");
        setAlertType("danger");
      });
  };

  const updateGames = (id) => {
    const selectedUser = gamesList.find((games) => games.game_id === id);
    if (selectedUser) {
      setGameId(selectedUser.game_id);
      setGamename(selectedUser.gamename);
      setGameimage(selectedUser.Gameimage);
      setPlatform(selectedUser.platform);
      setIsUpdating(true); // เปลี่ยนสถานะเป็นการอัปเดต
    }
  };

  const sendUpdateGames = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/update_games", {
      game_id: gameId,
      gamename,
      Gameimage,
      platform,
    })
      .then(() => {
        setGamesList(
          gamesList.map((games) =>
            games.game_id === gameId
              ? { game_id: gameId, gamename, Gameimage, password, platform }
              : games
          )
        );
        setAlertMessage("games updated successfully!");
        setAlertType("success");
        resetForm(); // รีเซ็ตฟอร์มหลังจากอัปเดตผู้ใช้
      })
      .catch(() => {
        setAlertMessage("Failed to update games.");
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

      <form className="mb-3" onSubmit={isUpdating ? sendUpdateGames : addGames}>
        <FloatingLabel
          controlId="floatinggamename"
          label="gamename:"
          className="mb-3"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter gamename"
            value={gamename}
            onChange={(e) => setGamename(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingplatform"
          label="platform:"
          className="mb-3"
        >
          <Form.Select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="">-- Select platform --</option>
            <option value="PC">PC</option>
            <option value="Mobile">Mobile</option>
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingGameimage"
          label="Gameimage:"
          className="mb-3"
        >
          <input
            type="file"
            className="form-control"
            placeholder="Enter Gameimage"
            onChange={(e) => setGameimage(e.target.files[0])}
          />
        </FloatingLabel>

        <button className="btn btn-success" type="submit">
          {isUpdating ? "Update Games" : "Add Games"}
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
            <th>Game name</th>
            <th>Image</th>
            <th>platform</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gamesList.map((games) => (
            <tr key={games.game_id}>
              <td>{games.game_id}</td>
              <td>{games.game_name}</td>
              <td>
                <img
                  src={games.Gameimage}
                  alt={games.gamename}
                  width="50"
                  height="50"
                />
              </td>
              <td>{games.platform}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => updateGames(games.game_id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteGames(games.game_id)}
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

export default GameManager;
