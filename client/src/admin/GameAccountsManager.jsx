import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function GameAccountsManager() {
  const [gameAccountsList, setGameAccounts] = useState([]);
  const [games, setGames] = useState([]); // To hold the list of games
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [GameAccountsId, setGameAccountsId] = useState("");
  const [GameId, setGameId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [price, setPrice] = useState("");
  const [isUpdating, setIsUpdating] = useState(false); // To manage update status

  useEffect(() => {
    Axios.get("http://localhost:3001/game_accounts").then((response) => {
      console.log(response.data);
      setGameAccounts(response.data);
    });
    Axios.get("http://localhost:3001/games").then((response) => {
      setGames(response.data); // Fetch games data
    });
  }, []);

  const resetForm = () => {
    setGameAccountsId("");
    setGameId("");
    setUsername("");
    setPassword("");
    setDescriptions("");
    setPrice("");
    setIsUpdating(false);
  };

  const addGameAccounts = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/create_game_accounts", {
      game_accounts_id: GameAccountsId,
      game_id: GameId,
      account_username: username,
      account_password: password,
      descriptions: descriptions,
      price: price,
    })
      .then(() => {
        setGameAccounts([
          ...gameAccountsList,
          {
            game_accounts_id: GameAccountsId,
            game_id: GameId,
            account_username: username,
            account_password: password,
            descriptions: descriptions,
            price: price,
          },
        ]);
        setAlertMessage("GameAccounts added successfully!");
        setAlertType("success");
        resetForm(); // Reset form after adding user
        console.log(gameAccountsList);
      })
      .catch(() => {
        setAlertMessage("Failed to add GameAccounts.");
        setAlertType("danger");
      });
  };

  const deleteGameAccounts = (id) => {
    Axios.delete(`http://localhost:3001/delete_game_accounts/${id}`)
      .then(() => {
        setGameAccounts(
          gameAccountsList.filter(
            (game) => Number(game.game_accounts_id) !== Number(id)
          )
        );
        setAlertMessage("GameAccounts deleted successfully!");
        setAlertType("success");
      })
      .catch(() => {
        setAlertMessage("Failed to delete GameAccounts.");
        setAlertType("danger");
      });
  };

  const updateGameAccounts = (id) => {
    const selectedGameAccounts = gameAccountsList.find(
      (game) => game.game_accounts_id === id
    );
    if (selectedGameAccounts) {
      setGameAccountsId(selectedGameAccounts.game_accounts_id);
      setGameId(selectedGameAccounts.GameId);
      setUsername(selectedGameAccounts.account_username);
      setPassword(selectedGameAccounts.account_password);
      setDescriptions(selectedGameAccounts.descriptions);
      setPrice(selectedGameAccounts.price);
      setIsUpdating(true); // Set status to update
    }
  };

  const sendUpdateGameAccounts = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:3001/update_game_accounts", {
      game_accounts_id: GameAccountsId,
      GameId,
      username,
      password,
      descriptions,
      price,
    })
      .then(() => {
        setGameAccounts(
          gameAccountsList.map((game) =>
            game.game_accounts_id === GameAccountsId
              ? {
                  game_accounts_id: GameAccountsId,
                  game_id: GameId,
                  account_username: username,
                  account_password: password,
                  descriptions: descriptions,
                  price: price,
                }
              : game
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
      <h1>Manage Game Accounts</h1>

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
        onSubmit={isUpdating ? sendUpdateGameAccounts : addGameAccounts}
      >
        <FloatingLabel label="Game Name:" className="mb-3">
          <Form.Select
            value={GameId}
            onChange={(e) => setGameId(e.target.value)}
          >
            <option value="">-- Select Game --</option>
            {games.map((game) => (
              <option key={game.game_id} value={game.game_id}>
                {game.game_name} ({game.platform})
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

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
          controlId="floatingDescriptions"
          label="Descriptions:"
          className="mb-3"
        >
          <input
            type="text"
            className="form-control"
            placeholder="Enter descriptions"
            value={descriptions}
            onChange={(e) => setDescriptions(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingPrice"
          label="Price:"
          className="mb-3"
        >
          <input
            type="number"
            className="form-control"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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

      <h2>Game Accounts List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Game Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Descriptions</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gameAccountsList.map((game) => (
            <tr key={game.game_accounts_id}>
              <td>{game.game_accounts_id}</td>
              <td>{game.game_name}</td>
              <td>{game.account_username}</td>
              <td>{game.account_password}</td>
              <td>{game.descriptions}</td>
              <td>{game.price}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => updateGameAccounts(game.game_accounts_id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteGameAccounts(game.game_accounts_id)}
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

export default GameAccountsManager;
