import React from 'react';
import User from '../../../Backend/Models/userModel'

const UserList = () => {
    // Ensure users is an array, defaulting to an empty array if it's undefined or null
    const userList = User || [];

    return (
        <div>
            <h2>User List</h2>
            {userList.length > 0 ? (
                <ul>
                    {userList.map(user => (
                        <li key={user._id}>
                            {user.name} - {user.email}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>No users found.</div>
            )}
        </div>
    );
}

export default UserList;
