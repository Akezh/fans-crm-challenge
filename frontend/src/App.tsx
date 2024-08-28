import React, { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const { control, handleSubmit } = useForm();

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const onSubmitSignIn = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/sign-in",
        data,
      );
    } catch (error) {
      console.error("Sign In Error:", error);
    }
  };

  const onSubmitSignUp = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/add-user",
        data,
      );
    } catch (error) {
      console.error("Sign Up Error:", error);
    }
  };

  return (
    <Container style={{ marginTop: 32 }} maxWidth="sm">
      <Typography variant="h2">Fans CRM challenge</Typography>
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
            <Button variant="contained" color="primary" type="submit" fullWidth>
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
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Sign Up
            </Button>
          </form>
        </Box>
      )}
    </Container>
  );
}

export default App;
