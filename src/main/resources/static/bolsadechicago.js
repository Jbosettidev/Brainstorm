const express = require("express");
const cors = require("cors");

const app = express();

console.log("APP CARREGADO");

const db = require("./config/database");
const usuariosRoutes = require("./routes/usuarios");
const cotacoesRoutes = require("./routes/cotacoes");

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/api", cotacoesRoutes);

app.get("/", (req, res) => {
    res.send("Backend do Brainstorm está funcionando!");
});

app.get("/teste", (req, res) => {
    res.send("Rota funcionando!");
});

module.exports = app;