const express = require("express");
const app = express();
const userRoutes = require("./routes/userRouter");

app.use(express.json());

app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
