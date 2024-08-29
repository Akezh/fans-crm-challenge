import React, { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { UserContext } from "./UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [retrievedUserData, setRetrievedUserData] = useState<any>(null);
  const { control, handleSubmit } = useForm();
  const userContext = React.useContext(UserContext);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const onSubmitSignIn = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/sign-in",
        data,
      );
      if (userContext && response?.data?.access_token) {
        userContext.setUser({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          token: response.data.access_token,
        });
        toast.success("Signed in successfully 🎉");
      }
    } catch (error) {
      toast.error("Error signing in. Please try again.");
      console.error("Sign In Error:", error);
    }
  };

  const onSubmitSignUp = async (data: any) => {
    try {
      await axios.post("http://localhost:8080/api/v1/add-user", {
        ...data,
        id: undefined,
      });
      toast.success("User account was created successfully. Please sign in.");
    } catch (error) {
      toast.error("Error creating user account. Please try again.");
      console.error("Sign Up Error:", error);
    }
  };

  const onSubmitGetUserById = async (data: any) => {
    try {
      if (!userContext?.user) {
        toast.error("Please sign in to get user by ID.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/v1/get-user/${data.id}`,
        {
          headers: {
            Authorization: `Bearer ${userContext?.user?.token}`,
          },
        },
      );
      setRetrievedUserData(response.data);
      console.log("User By ID:", response.data);
    } catch (error) {
      toast.error("Error getting user by ID. Please try again.");
      console.error("Get User By ID Error:", error);
    }
  };

  return (
    <>
      <Container style={{ marginTop: 32 }} maxWidth="sm">
        <Typography fontWeight="bold" variant="h4">
          Fans CRM challenge
        </Typography>
        <Typography variant="h6" gutterBottom>
          Auth status: {userContext?.user ? "Signed in" : "Not signed in"}
        </Typography>
        {userContext?.user && (
          <>
            <Typography variant="body1" gutterBottom>
              Id: {userContext.user.id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              User: {userContext.user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {userContext.user.email}
            </Typography>
          </>
        )}
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginTop: 4 }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="login tabs"
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>
        {tabIndex === 0 && (
          <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sign In
            </Typography>
            <form onSubmit={handleSubmit(onSubmitSignIn)}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    type="email"
                    required
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password"
                    margin="normal"
                    variant="outlined"
                    type="password"
                    required
                  />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Sign In
              </Button>
            </form>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmitSignUp)}>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    required
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    type="email"
                    required
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password"
                    margin="normal"
                    variant="outlined"
                    type="password"
                    required
                  />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Sign Up
              </Button>
            </form>
          </Box>
        )}
      </Container>
      <Divider style={{ marginTop: 32, marginBottom: 32 }} />
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmitGetUserById)}>
          <Controller
            name="id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="User ID"
                margin="normal"
                variant="outlined"
                type="number"
                required
              />
            )}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Get User By ID
          </Button>
        </form>

        {retrievedUserData && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Retrieved User Data:
            </Typography>
            <Typography variant="body1" gutterBottom>
              Id: {retrievedUserData.id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Username: {retrievedUserData.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {retrievedUserData.email}
            </Typography>
          </Box>
        )}
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
