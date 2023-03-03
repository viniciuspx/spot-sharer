const express = require("express");

const router = express.Router();

const placeholder = [
  {
    id: "p1",
    title: "Maldivas",
    description: "Beutiful beaches to enjoy.",
    imageUrl: "",
    address: "Malé, Maldivas",
    location: {
      lat: 4.197139,
      lng: 73.487448,
    },
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;

  const place = placeholder.find((p) => {
    return p.id === placeId;
  });

  res.json({place});
});

router.get("/user/:uid", (req, res, next) => {
    const userId = req.params.uid;

    const place = placeholder.find((p) => {
        return p.creator === userId;
    });

    res.json({place});
});

module.exports = router;
