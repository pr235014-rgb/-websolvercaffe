const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(__dirname));

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Contact form API
app.post("/api/contact", (req, res) => {
    const { name, email, company, service, message } = req.body;

    if (!name || !email || !service || !message) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });
    }

    console.log("New Contact Message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Company:", company || "Not provided");
    console.log("Service:", service);
    console.log("Message:", message);

    res.json({
        success: true,
        message: "Your message was received successfully!"
    });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});