const { v4: uuid } = require("uuid");

const HttpError = require("../models/http-error");

let placeholder = [
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

const getPlaceByID = (req, res, next) => {
  const placeId = req.params.pid;

  const place = placeholder.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError(
      "Could not find a place for the provided id=" + placeId,
      404
    );
  }

  res.json({ place });
};

const getPlacesByUserID = (req, res, next) => {
  const userId = req.params.uid;

  const places = placeholder.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError(
        "Could not find a place for the provided user id=" + userId,
        404
      )
    );
  }

  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  placeholder.push(createdPlace);

  res.status(201).json(createdPlace);
};

const updatePlace = (req, res, next) => {
  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...placeholder.find((p) => p.id === placeId) };
  const placeIndex = placeholder.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  placeholder[placeIndex] = updatedPlace;

  res.status(200).json({place: updatedPlace});
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  placeholder = placeholder.filter(p => p.id !== placeId);
  res.status(200).json({message: 'Deleted place.'})
};

exports.getPlaceByID = getPlaceByID;
exports.getPlacesByUserID = getPlacesByUserID;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
