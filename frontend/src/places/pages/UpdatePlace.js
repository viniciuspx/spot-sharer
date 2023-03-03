import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.css";

const maldivasUrl =
  "https://blogger.googleusercontent.com/img/a/AVvXsEhr1qqm7d3AflCKr-9BwDyRlut5rIRNjhTzzZgB-WBkAzSG32ZYUfV87eda4wai9T3c0PzLzXSSx-tkWqiONMtndLdx3dz7BWQ0EMX3TfxM2kEqgjTXKWbLiAKr2H7u1kPO1xjzzMpArl6OKZgH3P7fk8wZ-45qpnuri22aAuLBKxa8N-1km41VpNC-zA=s16000";

const placeholder = [
  {
    id: "p1",
    title: "Maldivas",
    description: "Beutiful beaches to enjoy.",
    imageUrl: maldivasUrl,
    address: "Malé, Maldivas",
    location: {
      lat: 4.197139,
      lng: 73.487448,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Maldivas",
    description: "Beutiful beaches to relax.",
    imageUrl: maldivasUrl,
    address: "Malé, Maldivas",
    location: {
      lat: 4.197139,
      lng: 73.487448,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = placeholder.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Title."
        onInput={inputHandler}
        value={formState.inputs.title.value}
        isValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 char)."
        onInput={inputHandler}
        value={formState.inputs.description.value}
        isValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
