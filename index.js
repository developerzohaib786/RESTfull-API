
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8000;
let users = require("./MOCK_DATA.json"); // Import users from the JSON file
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add JSON parsing middleware

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) return res.status(500).json({ error: "Error saving data" });
      return res.json({ status: "Success", updatedUser });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Removing the user from the list
    users = users.filter((user) => user.id !== id);

    // Updating the database
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) return res.status(500).json({ error: "Error saving data" });
      return res.json({ status: "Success", message: `User with id ${id} deleted!` });
    });
  });

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  const newUser = { ...body, id: users.length + 1 };
  users.push(newUser);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) return res.status(500).json({ error: "Error saving data" });
    return res.json({ status: "Success", id: newUser.id });
  });
});

app.listen(PORT, () => {
  console.log(`Server has started listening on the port: ${PORT}`);
});
