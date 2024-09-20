import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 3001;

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup (allow all origins)
app.use(cors());

// Endpoint to save user data (POST)
app.post("/api/saveUserData", (req, res) => {
  const dataFilePath = path.join("user_data.json");

  // Read existing user data
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading user data file:", err);
      return res.status(500).json({ error: "Failed to read user data" });
    }

    let userData = JSON.parse(data);
    const newUser = req.body; // Assuming the body contains username, email, and password

    // Add the new user to the data array
    userData.push(newUser);

    // Write updated user data back to file
    fs.writeFile(dataFilePath, JSON.stringify(userData, null, 2), (err) => {
      if (err) {
        console.error("Error writing user data file:", err);
        return res.status(500).json({ error: "Failed to save user data" });
      }

      // Respond with success message
      res.status(200).json({ message: "User data saved successfully" });
    });
  });
});

// Endpoint to fetch all user data (GET)
app.get("/api/getAllUserData", (req, res) => {
  const dataFilePath = path.join("user_data.json");

  // Read existing user data
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading user data file:", err);
      return res.status(500).json({ error: "Failed to read user data" });
    }

    const userData = JSON.parse(data);
    res.status(200).json(userData);
  });
});

// End Point to get the user data by email
app.get("/api/getUserDataByEmail", (req, res) => {
  const dataFilePath = path.join("user_data.json");
  const email = req.query.email;

  // Read existing user data
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading user data file:", err);
      return res.status(500).json({ error: "Failed to read user data" });
    }

    const userData = JSON.parse(data);
    const user = userData.find((user) => user.email === email);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

// Endpoint to update profile
app.put("/api/updateProfile", (req, res) => {
  const dataFilePath = path.join("user_data.json");
  const { email, firstName, lastName, profileImage } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Read existing user data
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading user data file:", err);
      return res.status(500).json({ error: "Failed to read user data" });
    }

    let userData;
    try {
      userData = JSON.parse(data);
    } catch (err) {
      console.error("Error parsing user data:", err);
      return res.status(500).json({ error: "Failed to parse user data" });
    }

    const user = userData.find((user) => user.email === email);

    if (user) {
      // Update user data
      user.firstName = firstName;
      user.lastName = lastName;
      user.profileImage = profileImage;

      // Write updated user data back to the file
      fs.writeFile(dataFilePath, JSON.stringify(userData, null, 2), (err) => {
        if (err) {
          console.error("Error writing user data file:", err);
          return res.status(500).json({ error: "Failed to update user data" });
        }

        // Respond with success message
        res
          .status(200)
          .json({ message: "User profile updated successfully", user });
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

// Endpoint to update password
app.put("/api/updatePassword", (req, res) => {
  const dataFilePath = path.join("user_data.json");
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ error: "Email, old password, and new password are required" });
  }

  // Read existing user data
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading user data file:", err);
      return res.status(500).json({ error: "Failed to read user data" });
    }

    let userData;
    try {
      userData = JSON.parse(data);
    } catch (err) {
      console.error("Error parsing user data:", err);
      return res.status(500).json({ error: "Failed to parse user data" });
    }

    const user = userData.find((user) => user.email === email);

    if (user) {
      // Check if old password matches
      if (user.password !== oldPassword) {
        return res.status(400).json({ error: "Old password is incorrect" });
      }

      // Update user password
      user.password = newPassword;

      // Write updated user data back to the file
      fs.writeFile(dataFilePath, JSON.stringify(userData, null, 2), (err) => {
        if (err) {
          console.error("Error writing user data file:", err);
          return res.status(500).json({ error: "Failed to update user data" });
        }

        // Respond with success message
        res.status(200).json({ message: "Password updated successfully" });
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

//Endpoint to post new review
// Endpoint to save reviews (POST)
app.post("/api/saveReview", (req, res) => {
  const reviewsFilePath = path.join("review.json");

  // Check if the reviews file exists, if not create an empty one
  if (!fs.existsSync(reviewsFilePath)) {
    fs.writeFileSync(reviewsFilePath, JSON.stringify([]));
  }

  // Read existing reviews
  fs.readFile(reviewsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading reviews file:", err);
      return res.status(500).json({ error: "Failed to read reviews" });
    }

    let reviews;
    try {
      reviews = data ? JSON.parse(data) : []; // Handle empty file
    } catch (err) {
      console.error("Error parsing reviews data:", err);
      return res.status(500).json({ error: "Failed to parse reviews" });
    }

    const newReview = req.body; // Assuming the body contains the review data

    // Add the new review to the reviews array
    reviews.push(newReview);

    // Write updated reviews back to file
    fs.writeFile(reviewsFilePath, JSON.stringify(reviews, null, 2), (err) => {
      if (err) {
        console.error("Error writing reviews file:", err);
        return res.status(500).json({ error: "Failed to save review" });
      }

      // Respond with success message
      res.status(200).json({ message: "Review saved successfully" });
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
