const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "gameshopdb",
});

app.get("/games", (req, res) => {
  db.query("SELECT * FROM game", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create_games", (req, res) => {
  const game_id = req.body.game_id;
  const game_name = req.body.game_name;
  const platform = req.body.platform;
  const game_image = req.body.game_image;
  db.query(
    "INSERT INTO game (game_id, game_name, platform, game_image) VALUES (?,?,?,?)",
    [game_id, game_name, platform, game_image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/delete_games/:game_id", (req, res) => {
  const game_id = req.params.game_id;
  db.query("DELETE FROM game WHERE game_id = ?", game_id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting game");
    } else {
      res.send(result);
      res.send("Game deleted successfully");
    }
  });
});

app.put("/update_games", (req, res) => {
  const game_id = req.body.game_id;
  const game_name = req.body.game_name;
  const platform = req.body.platform;
  const game_image = req.body.game_image;
  db.query(
    "UPDATE game set game_name = ?, platform = ?, game_image = ? where game_id = ?",
    [game_id, game_name, platform, game_image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/game_accounts", (req, res) => {
  db.query("SELECT ga.game_accounts_id,g.game_name,ga.account_username,ga.account_password,ga.descriptions,ga.price FROM game_accounts ga JOIN game g ON ga.game_id = g.game_id;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create_game_accounts", (req, res) => {
  const game_accounts_id = req.body.game_accounts_id;
  const game_id = req.body.game_id;
  const account_username = req.body.account_username;
  const account_password = req.body.account_password;
  const descriptions = req.body.descriptions;
  const price = req.body.price;
  db.query(
    "INSERT INTO game_accounts (game_accounts_id,game_id, account_username, account_password, descriptions,price) VALUES (?,?,?,?,?,?)",
    [game_accounts_id,game_id, account_username, account_password, descriptions,price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


// app.delete("/delete_game_accounts/:id", (req, res) => {
//   const { id } = req.params;
//   const query = `DELETE FROM game_accounts WHERE game_accounts_id = ?`;  // คำสั่งลบที่ถูกต้อง
//   db.query(query, [id], (err, result) => {
//     if (err) throw err;
//     res.send("Game account deleted.");
//   });
// });


app.delete("/delete_game_accounts/:game_accounts_id", (req, res) => {
  const game_accounts_id = req.params.game_accounts_id;
  db.query("DELETE FROM game_accounts WHERE game_accounts_id = ?", game_accounts_id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting game account");
    } else {
      res.send(result);
      res.send("Game account deleted successfully");
    }
  });
});

app.put("/update_game_accounts", (req, res) => {
  const game_accounts_id = req.body.game_accounts_id;
  const game_id = req.body.game_id;
  const account_username = req.body.account_username;
  const account_password = req.body.account_password;
  const descriptions = req.body.descriptions;
  const price = req.body.price;
  db.query(
    "UPDATE game_accounts set game_id= ?, account_username = ?, account_password = ?, descriptions = ?, price = ? where game_accounts_id = ?",
    [game_accounts_id,game_id, account_username, account_password, descriptions,price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/order", (req, res) => {
  db.query("SELECT o.order_id, o.user_id, g.game_name, o.total_price, o.order_status, o.created_at FROM `order` o JOIN game_accounts ga ON o.game_accounts_id = ga.game_accounts_id JOIN game g ON ga.game_id = g.game_id;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create_order", (req, res) => {
  const order_id = req.body.order_id;
  const user_id = req.body.user_id;
  const game_accounts_id = req.body.game_accounts_id;
  const total_price = req.body.total_price;
  const order_status = req.body.order_status;
  const created_at = req.body.created_at;
  db.query(
    "INSERT INTO order (order_id,user_id,game_accounts_id,total_price,order_status,created_at) VALUES (?,?,?,?,?,?)",
    [order_id,user_id,game_accounts_id,total_price,order_status,created_at],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.delete("/delete_order/:order_id", (req, res) => {
  const order_id = req.params.order_id;
  db.query("DELETE FROM order WHERE order_id = ?", order_id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting order");
    } else {
      res.send(result);
      res.send("order deleted successfully");
    }
  });
});

app.put("/update_order", (req, res) => {
  const order_id = req.body.order_id;
  const user_id = req.body.user_id;
  const game_accounts_id = req.body.game_accounts_id;
  const total_price = req.body.total_price;
  const order_status = req.body.order_status;
  const created_at = req.body.created_at;

  db.query(
    "UPDATE order set user_id= ?, game_accounts_id = ?, total_price = ?, order_status = ?, created_at = ? where order_id = ?",
    [order_id,user_id,game_accounts_id,total_price,order_status,created_at],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/payment", (req, res) => {
  db.query("SELECT p.payment_id, u.username, o.order_id, p.payment_method, p.payment_status, p.transaction_id, p.paid_at FROM payment p JOIN `order` o ON p.order_id = o.order_id JOIN user u ON o.user_id = u.user_id;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create_payment", (req, res) => {
  const payment_id = req.body.payment_id;
  const order_id = req.body.order_id;
  const user_id = req.body.user_id;
  const payment_method = req.body.payment_method;
  const payment_status = req.body.payment_status;
  const transaction_id = req.body.transaction_id;
  const paid_at = req.body.paid_at;
  db.query(
    "INSERT INTO payment (payment_id,order_id,user_id,payment_method,payment_status,transaction_id,paid_at) VALUES (?,?,?,?,?,?,?)",
    [payment_id,order_id,user_id,payment_method,payment_status,transaction_id,paid_at],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/delete_payment/:payment_id", (req, res) => {
  const payment_id = req.params.payment_id;
  db.query("DELETE FROM order WHERE payment_id = ?", payment_id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting order");
    } else {
      res.send(result);
      res.send("order deleted successfully");
    }
  });
});

app.put("/update_payment", (req, res) => {
  const payment_id = req.body.payment_id;
  const order_id = req.body.order_id;
  const user_id = req.body.user_id;
  const payment_method = req.body.payment_method;
  const payment_status = req.body.payment_status;
  const transaction_id = req.body.transaction_id;
  const paid_at = req.body.paid_at;
  db.query(
    "UPDATE payment set order_id= ?, user_id= ?, payment_method = ?, payment_status = ?, transaction_id = ?, paid_at = ? where payment_id = ?",
    [payment_id,order_id,user_id,payment_method,payment_status,transaction_id,paid_at],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.get("/review", (req, res) => {
  db.query("SELECT r.review_id, u.username, g.game_name, r.rating, r.comment, r.created_at FROM review r JOIN user u ON r.user_id = u.user_id JOIN game_accounts ga ON r.game_accounts_id = ga.game_accounts_id JOIN game g ON ga.game_id = g.game_id;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create_review", (req, res) => {
  const review_id  = req.body.review_id;
  const user_id  = req.body.user_id ;
  const game_accounts_id  = req.body.game_accounts_id ;
  const rating = req.body.rating;
  const comment = req.body.comment;
  const created_at = req.body.created_at;
  db.query(
    "INSERT INTO review (review_id,user_id,game_accounts_id,rating,comment,created_at) VALUES (?,?,?,?,?,?)",
    [review_id,user_id,game_accounts_id,rating,comment,created_at],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.delete("/delete_review/:review_id", (req, res) => {
  const review_id = req.params.review_id;
  db.query("DELETE FROM review WHERE review_id = ?", review_id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting order");
    } else {
      res.send(result);
      res.send("order deleted successfully");
    }
  });
});

app.put("/update_review", (req, res) => {
  const review_id = req.body.review_id;
  const user_id = req.body.user_id;
  const game_accounts_id = req.body.game_accounts_id;
  const rating = req.body.rating;
  const comment = req.body.comment;
  const created_at = req.body.created_at;
  db.query(
    "UPDATE review set user_id= ?, game_accounts_id= ?, rating = ?, comment = ?, created_at = ? where review_id = ?",
    [review_id,user_id,game_accounts_id,rating,comment,created_at],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.get("/user", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create_user", (req, res) => {
  const user_id = req.body.user_id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  db.query(
    "INSERT INTO user (user_id,username,email,password,role) VALUES (?,?,?,?,?)",
    [user_id,username,email,password,role],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete_user/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  db.query("DELETE FROM user WHERE user_id = ?", user_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update_user", (req, res) => {
  const user_id = req.body.user_id;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  db.query(
    "UPDATE user set username= ?, email= ?, password = ?, role = ? where user_id = ?",
    [user_id,username,email,password,role],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

