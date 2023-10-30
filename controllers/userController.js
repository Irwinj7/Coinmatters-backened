const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

class UserController {
  async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      await userModel.createUser(username, email, hashedPassword);

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

// class UserLogin {
//   async loginUser(req, res) {
//     try {
//       const { username, password } = req.body;

//       const user = await userModel.findUserByUsername(username);
//       if (!user) {
//         return res.status(401).json({ error: "Invalid credentials" });
//       }

//       const passwordMatch = await bcrypt.compare(password, user.password);
//       if (!passwordMatch) {
//         return res.status(401).json({ error: "Invalid credentials" });
//       }

//       const token = generateAuthToken(user);

//       res.status(200).json({ token });
//     } catch (error) {
//       console.error("Error logging in:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// }

(module.exports = new UserController());
