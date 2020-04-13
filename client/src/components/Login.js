import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = ({ authObj, handleChange, handleSubmit, changingPassword, toggleNewPass }) => {
  const { username, password, newPassword } = authObj
  const classes = useStyles();

  const renderLogin = () => {

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handleChange}
                />
              </Grid>
              {changingPassword && <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="newPassword"
                  label="New Password"
                  type="password"
                  id="new-password"
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={handleChange}
                />
              </Grid>}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color={changingPassword ? "default" : "primary"}
              className={classes.submit}
              onClick={handleSubmit}
            >
              {changingPassword ? "update" : "Sign In"}
            </Button>
            <Grid item xs={12} onClick={toggleNewPass}>
              <Link>
              {changingPassword ? "Cancel" : "Change Password"}
              </Link>
            </Grid>
          </form>
        </div>
        <Box mt={5}>

        </Box>
      </Container>
    );
  }

  return renderLogin()

}

export default Login
