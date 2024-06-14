import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Formik, Form, Field } from "formik";
import { CircularProgress } from "@mui/material";
import { firebaseError } from "./errors";
import { useDispatch } from "react-redux";
import { loginRequest } from '../../redux/userThunk'
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../utils/validations";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://linkedin.com/in/govind-singh-68196185"
      >
        Govind Singh
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.



export default function SignInSide() {
  const [errorCode, setErrorCode] = React.useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting }) => {

    setErrorCode(undefined);
    dispatch(loginRequest(values))
      .unwrap()
      .then((res) => {
        navigate('/')
      }).finally(() => {
        setSubmitting(false);
      })

  };

  return (

    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
            initialValues={{
              email: "demouser@demouser.com",
              password: "demouser",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  name="email"
                  margin="normal"
                  label="Email"
                  disable={isSubmitting}
                  fullWidth
                  error={errors.email && touched.email}
                  helperText={
                    errors.email && touched.email ? errors.email : ""
                  }
                />

                <Field
                  as={TextField}
                  margin="normal"
                  name="password"
                  label="Password"
                  disable={isSubmitting}
                  type="password"
                  fullWidth
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password
                      ? errors.password
                      : ""
                  }
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disable={isSubmitting}
                >

                  Sign In

                </Button>
                {isSubmitting && <div style={{ textAlign: 'center' }}><CircularProgress size={16} /></div>}
                {!!errorCode && <Typography
                  variant="body2"
                  color="error"
                  align="center"

                >{firebaseError[errorCode] || 'Woops! something went wrong'}
                </Typography>}
              </Form>
            )}
          </Formik>

          <Copyright sx={{ mt: 5 }} />
        </Box>

      </Grid>
    </Grid>

  );
}
