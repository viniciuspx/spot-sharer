import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const maldivasUrl = 'https://blogger.googleusercontent.com/img/a/AVvXsEhr1qqm7d3AflCKr-9BwDyRlut5rIRNjhTzzZgB-WBkAzSG32ZYUfV87eda4wai9T3c0PzLzXSSx-tkWqiONMtndLdx3dz7BWQ0EMX3TfxM2kEqgjTXKWbLiAKr2H7u1kPO1xjzzMpArl6OKZgH3P7fk8wZ-45qpnuri22aAuLBKxa8N-1km41VpNC-zA=s16000';

const placeholder = [
    {
        id: 'p1',
        title: 'Maldivas',
        description: 'Beutiful beaches to enjoy.',
        imageUrl: maldivasUrl,
        address: 'Malé, Maldivas',
        location: {
            lat: 4.197139, 
            lng: 73.487448
        },
        creator: 'u1'

    },
    {
        id: 'p2',
        title: 'Maldivas',
        description: 'Beutiful beaches to enjoy.',
        imageUrl: maldivasUrl,
        address: 'Malé, Maldivas',
        location: {
            lat: 4.197139, 
            lng: 73.487448
        },
        creator: 'u2'

    }
];

const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = placeholder.filter(place => place.creator === userId)
    return <PlaceList items={loadedPlaces}/>
};

export default UserPlaces;