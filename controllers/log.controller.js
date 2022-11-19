const User = require("../models/userSchema.model");
const Credentials = require("../models/credentialSchema.model");
const OUdivision = require("../models/ouSchema.model")
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

//verify login details and send a JWT
exports.login = function (req, res) {
  const email = (req.body.email)
  const password = (req.body.password)

  User.where("email").equals(email).then(result => {
    if (result.length > 0 && (result[0].password === password)) {
      payload = {
        id: result[0].id,
        username: result[0].username,
        email: result[0].email,
        password: result[0].password,
        OUdivisionIDs: result[0].OUdivisionIDs,
        role: result[0].role
      }
      const token = jwt.sign(JSON.stringify(payload), 'jwt--secret',
        { algorithm: 'HS256' })
      res.send({ 'token': token })

    } else {
      res.status(403).send({ 'err': 'Your username or password is incorrect' })
    }
  }
  );


}

//create a new user
exports.createUser = function (req, res) {

  const email = (req.body.email);
  const password = (req.body.password);
  const role = "normal";
  const archived = "false";

  User.where("email").equals(email).then(result => {
    if (result.length > 0) {
      res.send("You are already registered")
    } else {
      const newUser = new User({
        username: email.slice(0, email.indexOf('@')),
        email: email,
        password: password,
        role: role,
        archived: archived,
        OUDivisionIDs: []
      })
      newUser.save(function (err, data) {
        if (err) {
          res.status(500).send({
            message: "could not create a new user."
          });
        } else {
          console.log('New user added');
          payload = {
            username: email.slice(0, email.indexOf('@')),
            email: email,
            password: password,
            role: role,
            archived: archived,
            OUDivisionIDs: []
          }
          const token = jwt.sign(JSON.stringify(payload), 'jwt--secret',
            { algorithm: 'HS256' })
          res.send({ 'token': token })
        }
      })
    }

  },
    (error) => {
      res.send(error.message);
    }
  );
}

//create new credentials
exports.createCredentials = function (req, res) {
  const OUdivision = (req.body.OUdivision);
  const website = (req.body.website);
  const username = (req.body.username);
  const password = (req.body.password);
  const archived = false;

  const newCredential = new Credentials({
    OUdivision: OUdivision,
    website: website,
    username: username,
    password: password,
    archived: archived
  })
  newCredential.save(function (err, data) {
    if (err) {
      res.status(500).send({
        message: "could not create new credentials."
      });
    } else {
      console.log('New credentials added');
      payload = {
        OUdivision: OUdivision,
        website: website,
        username: username,
        password: password,
        archived: archived
      }

    }
  })


}

//fetch credentials that the user has access to
exports.findUserCredentials = function (req, res) {
  const auth = req.headers['authorization']
  const token = auth.split(' ')[1]
  const decoded = jwt.verify(token, 'jwt--secret')

  if (decoded.role === "admin") {
    Credentials.where("archived").equals(false).then(result => {
      res.send(result);
    },
      (error) => {
        res.status(401).send({ 'err': 'Bad JWT!' })
      }
    );
  } else {

    Credentials.find({ archived: false }).where("OUDivisionID").in(decoded.OUdivisionIDs).then(result => {
      res.send(result);
    },
      (error) => {
        res.status(401).send({ 'err': 'Bad JWT!' })
      }
    );
  }

}

//find all OU divisions
exports.findOUdivision = function (req, res) {
  OUdivision.find({}).then(result => {
    res.send(result);
  },
    (error) => {
      res.status(500).send("could not fetch OU divisions")
    }
  );
}

//find OU divisions that the user has access to
exports.findUserOUdivision = function (req, res) {
  const input_data = (req.params.data);

  OUdivision.find({ _id: { $in: [input_data] } }).then(result => {
    res.send(result);
  },
    (error) => {
      res.status(401).send(error)
    }
  );
}

//find user access
exports.findUserAccess = function (req, res) {
  const auth = req.headers['authorization']
  const token = auth.split(' ')[1]
  const decoded = jwt.verify(token, 'jwt--secret')
  const id = (decoded.id);

  User.findById(id).then(result => {
    res.send(result);
  },
    (error) => {
      res.send(error.message);
    }
  );
}

//find all users
exports.findAllUsers = function (req, res) {

  User.find().then(result => {
    res.send(result);
  },
    (error) => {
      res.send(error.message);
    }
  );
}

//update credentials
exports.updateCredentials = function (req, res) {
  const id = (req.body._id)
  const OUdivision = (req.body.OUdivision)
  const website = (req.body.website)
  const username = (req.body.username)
  const password = (req.body.password)

  Credentials.findOneAndUpdate({ _id: id }, {
    $set: {
      OUdivision: OUdivision,
      website: website,
      username: username,
      password: password
    }
  }).then(result => {
    res.send(result);
  },
    (error) => {
      res.send(error.message);
    }
  );
}

//update a user role
exports.updateUserRole = function (req, res) {
  const id = (req.body._id)
  const OUdivision = (req.body.OUdivision)
  const role = (req.body.role)

  User.findOneAndUpdate({ _id: id }, {
    $set: {
      OUdivisionIDs: OUdivision,
      role: role,
    }
  }).then(result => {
    res.send(result);
  },
    (error) => {
      res.send(error.message);
    }
  );
}

//archive a credential
exports.archiveCredential = function (req, res) {
  const id = (req.body._id)
  Credentials.findByIdAndUpdate((id), {
    $set: {
      archived: true,
    }
  }).then(result => {
    res.send(result);
  },
    (error) => {
      res.send(error.message);
    }
  );
}

//connect to Atlas cluster
const uri =
  'mongodb+srv://tequential:tequential@cluster0.65fgeec.mongodb.net/cooltech?retryWrites=true&w=majority';

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});