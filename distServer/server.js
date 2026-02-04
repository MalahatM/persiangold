import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/exempel", (req, res) => {
    res.json({ ok: true });
});
const port = Number(process.env.PORT) || 1337;
app.listen(port, () => console.log(`Server running on ${port}`));
//# sourceMappingURL=server.js.map