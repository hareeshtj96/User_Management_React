import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Image } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";
import { toast } from 'react-toastify';
import Loader from "./Loader";
import { setCredentials } from "../Slices/authSlice";
import { useUpdateUserMutation } from "../Slices/usersApiSlice";
import axios from 'axios';
import './ProfileScreen.css'




const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, {isLoading}] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setProfileImage(userInfo.profileImage || "");
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
            _id: userInfo._id,
            name,
            email,
            password,
            profileImage,
        }).unwrap();
        dispatch(setCredentials({...res}));
        toast.success('Profile updated');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
        setProfileImage(data.path);
        setUploading(false);

    } catch (error) {
        toast.error('Error uploading image');
        setUploading(false);
    }
  }

  console.log(profileImage);

  return (
    <FormContainer>

      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="image">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler}></Form.Control>
            {uploading && <Loader />}
        </Form.Group>



       


        {/* Display the profile image */}
        {profileImage && (
          <div className="profile-container">
            <div className="profile-image-container">
            <Image src={`../../public/uploads/${profileImage}`} alt="Profile" fluid />
            </div>
          </div>
        )}

        

        { isLoading && <Loader /> }

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
