// Part A: Core Node.js HTTP and FS modules
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// In-memory food data (no database is required).
const foods = [
  { id: 1, foodName: "Pizza", category: "Fast Food", price: 250, availability: true },
  { id: 2, foodName: "Burger", category: "Fast Food", price: 120, availability: true },
  { id: 3, foodName: "Pasta", category: "Italian", price: 180, availability: false }
];

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data, null, 2));
}

function sendHtml(res, statusCode, html) {
  res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 1e6) {
        reject(new Error("Request body is too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname;

  // GET /
  if (req.method === "GET" && pathname === "/") {
    return sendHtml(res, 200, `<!DOCTYPE html>
      <html><head><meta charset="UTF-8"><title>Food Ordering</title></head>
      <body><h1>Welcome to Online Food Ordering</h1>
      <p>Use /foods, /about or /menu to explore the application.</p></body></html>`);
  }

  // GET /foods - show only available food items.
  if (req.method === "GET" && pathname === "/foods") {
    const availableFoods = foods.filter(food => food.availability === true);
    return sendJson(res, 200, availableFoods);
  }

  // GET /about
  if (req.method === "GET" && pathname === "/about") {
    return sendHtml(res, 200, "<h1>About Us</h1><p>We serve fresh and delicious food.</p>");
  }

  // GET /menu - serve public/menu.html using the FS module.
  if (req.method === "GET" && pathname === "/menu") {
    const menuPath = path.join(__dirname, "public", "menu.html");
    return fs.readFile(menuPath, "utf8", (error, data) => {
      if (error) {
        return sendJson(res, 500, { error: "Unable to read the menu file." });
      }
      sendHtml(res, 200, data);
    });
  }

  // POST /add-food - accept a JSON food object.
  if (req.method === "POST" && pathname === "/add-food") {
    try {
      const food = await readRequestBody(req);
      const requiredFields = ["id", "foodName", "category", "price", "availability"];
      const missingFields = requiredFields.filter(field =>
        food[field] === undefined || food[field] === null || food[field] === ""
      );

      if (missingFields.length > 0) {
        return sendJson(res, 400, {
          error: "Missing required fields.",
          missingFields
        });
      }
      if (!Number.isFinite(Number(food.id)) || !Number.isFinite(Number(food.price)) || Number(food.price) <= 0 ||
          typeof food.foodName !== "string" || typeof food.category !== "string" ||
          typeof food.availability !== "boolean") {
        return sendJson(res, 400, { error: "Invalid food details. ID and price must be numbers, price must be positive, and availability must be boolean." });
      }
      if (foods.some(item => Number(item.id) === Number(food.id))) {
        return sendJson(res, 400, { error: "A food item with this ID already exists." });
      }

      const newFood = {
        id: Number(food.id),
        foodName: food.foodName,
        category: food.category,
        price: Number(food.price),
        availability: food.availability
      };
      foods.push(newFood);
      return sendJson(res, 201, { message: "Food item added successfully", food: newFood });
    } catch (error) {
      return sendJson(res, 400, { error: error.message });
    }
  }

  return sendJson(res, 404, { error: "Route not found." });
});

server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);
});