const mongoose = require("mongoose");
const UserID = require("../models/userProfile");

exports.getAllUserID = (req, res, next) => {
  UserID.find()
    .select("_id name playerTag  currentProfilePicture")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        UserProfiles: docs.map((doc) => {
          return {
            name: doc.name,
            playerTag: doc.playerTag,
            currentProfilePicture: doc.currentProfilePicture,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:8000/profile/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.getUserID = (req, res, next) => {
  UserID.findById(req.params.userID)
    .select("_id name playerTag  currentProfilePicture")
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          UserProfile: doc,
          request: {
            type: "GET",
            url: "http://localhost:8000/profile/",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided userID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.addUserID = (req, res, next) => {
  const UserProfile = new UserID({
    name: { firstName: req.body.firstName, lastName: req.body.lastName },
    sex: req.body.sex,
    dateOfBirth: new Date(req.body.dateOfBirth),
    playerTag: req.body.playerTag,
  });

  UserProfile.save()
    .then((result) => {
      res.status(201).json({
        message: "Successfully Created User Profile",
        createdUser: {
          _id: result._id,
          name: `${result.name.firstName} ${result.name.lastName}`,
          playerTag: result.playerTag,
          request: {
            type: "GET",
            url: "http://localhost:8000/profile/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateUserID = (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  UserID.update({ _id: req.params.userID }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User Profile Updated",
        request: {
          type: "GET",
          url: "http://localhost:8000/profile/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.removeUserID = (req, res, next) => {
  UserID.remove({ _id: req.params.userID })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User Profile deleted",
        request: {
          type: "POST",
          url: "http://localhost:8000/profile/",
          body: { name: "String", price: "Number" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
