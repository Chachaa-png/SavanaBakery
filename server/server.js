const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoint menerima order
app.post('/api/order', (req, res) => {
    const order = req.body;
    const ordersFile = path.join(__dirname, 'orders.json');
    let orders = [];
    if (fs.existsSync(ordersFile)) {
        orders = JSON.parse(fs.readFileSync(ordersFile));
    }
    orders.push({ ...order, createdAt: new Date().toISOString() });
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
    res.status(201).json({ message: 'Order received', order });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 