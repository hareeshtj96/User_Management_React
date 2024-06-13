import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
  useCreateUserMutation,
  useFetchUsersQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from '../Slices/adminApiSlice.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminDashboardScreen = () => {
  const { data: users = [], isLoading, error, refetch } = useFetchUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        password: '',
        confirmPassword: ''
      });
    } else {
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    }
  }, [selectedUser]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      if (selectedUser) {
        await updateUser({ id: selectedUser._id, data: formData }).unwrap();
        toast.success('User updated successfully');
        setSelectedUser(null);
      } else {
        await createUser(formData).unwrap();
        toast.success('User created successfully');
        setIsCreateMode(false);
      }
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success('User deleted successfully');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-neutral-100 dark:bg-neutral-700">
      
      <div className="container mx-auto p-4">
      
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-half p-2 mb-4 border rounded"
        />
        <button 
            onClick={() => { setIsCreateMode(true); setSelectedUser(null); }} 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
            Create User
        </button>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full shadow-2xl" style={{ border: '3px solid black' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => {setSelectedUser(user); setIsCreateMode(false);}}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {(selectedUser || isCreateMode) && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">{selectedUser ? 'Edit User' : 'Create User'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                {!selectedUser && (
                  <>
                    <label htmlFor="password" className="block font-bold mb-2">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                    />
                  </>
                )}
              </div>
              <div className="mb-4">
                {!selectedUser && (
                  <>
                    <label htmlFor="confirmPassword" className="block font-bold mb-2">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleFormChange}
                      className="w-full p-2 border rounded"
                    />
                  </>
                )}
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                {selectedUser ? 'Update' : 'Create'}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminDashboardScreen;
