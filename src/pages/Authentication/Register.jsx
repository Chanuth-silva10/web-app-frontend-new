import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { registerUserAction } from "../../Redux/Auth/auth.action";
import { uploadToCloudinary } from "../../utils/uploadToCloudniry";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
  proImage: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const imageUrl = await uploadToCloudinary(selectedImage, "image");
      console.log(imageUrl);
      values.proImage = imageUrl;
      dispatch(registerUserAction({ data: values }));
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };

  const handleSelectImage = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-3">
          <Field
            as={TextField}
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
          />
          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-500"
          />

          <Field
            as={TextField}
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
          />
          <ErrorMessage
            name="lastName"
            component="div"
            className="text-red-500"
          />

          <Field
            as={TextField}
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />

          <Field
            as={TextField}
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />

          <RadioGroup row aria-label="gender" name="gender">
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>

          <div className="flex items-center">
            <label htmlFor="upload-photo" className="mr-4 cursor-pointer">
              {!selectedImage ? (
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <AccountCircleIcon sx={{ width: "3rem", height: "3rem" }} />
                </IconButton>
              ) : (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              )}
            </label>
            <div>
              <input
                style={{ display: "none" }}
                id="upload-photo"
                type="file"
                accept="image/*"
                onChange={handleSelectImage}
              />
              <label htmlFor="upload-photo" className="cursor-pointer">
                <span className="text-gray-600">Choose Profile Picture</span>
              </label>
              <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
            </div>
          </div>

          {isLoading && <p className="ml-4">Uploading...</p>}

          <Button fullWidth type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Form>
      </Formik>
      <div className="flex items-center justify-center gap-5 pt-5">
        if you have already account ?
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
    </>
  );
};

export default Register;
