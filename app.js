const express = require("express");
const path = require("path");
const app = express();

const fb = require("./config");
const db = fb.firestore();
const auth = fb.auth();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "signup.html"));
});
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/donar",(req,res) =>{
  res.sendFile(path.join(__dirname,"views","donars.html"));
});

app.get("/registered", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "thank.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
});

app.post("/signup", async (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;
  

  await auth
    .createUser({
      email: email,
      emailVerified: false,
      password: password,
    })
    .then((response) => {
      console.log(response.uid);
      db.collection("users").doc(response.uid).set(req.body);
      
    });
    res.redirect("/registered");
});

app.post('/search', (req, res) => {
  const bloodGroup = req.body.bloodGroup;
  const location = req.body.location;


console.log(bloodGroup);
console.log(location);


  // Perform the Firestore query
  db.collection('users')
    .where('bloodGroup', '==', bloodGroup)
    .where('location', '==', location)
    .get()
    .then((querySnapshot) => {
      const results = [];
      querySnapshot.forEach((doc) => {
        const donorData = doc.data();
        console.log(donorData);
        results.push(donorData);
      });
      
        res.json(results); // Return the search results as JSON
 
    })
    .catch((error) => {
      console.error('Error searching donors:', error);
      res.status(500).send('An error occurred while searching donors.');
    });
});

const server = app.listen(3000, () => {
  console.log("running...");
});
