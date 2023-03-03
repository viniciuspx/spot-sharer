import React from "react";

import UserList from "../components/UserList";

const Users = () => {
    const USERS = [
        {
            id: 'u1', 
            name: 'vini', 
            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/60/b0/bd/bora-bora.jpg?w=700&h=500&s=1', 
            places: 3
        }
    ];

    return <UserList items={USERS} />;
};

export default Users;