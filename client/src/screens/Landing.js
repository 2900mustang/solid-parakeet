import React from 'react';
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 8)
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  }
}))

export default function Landing() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography variant="h1" component="h1" align="center" color="textPrimary" gutterBottom>
              Strangers' Bloggies.
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Write yourself a blog.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container className='landingContainer' spacing={1} justify="center">
                <Grid item>
                  <Link to="/signup">
                    <Button variant="contained" color="primary">
                      Sign Up
                    </Button>
                  </Link>
                </Grid>

                <Grid item>
                  <Link to="/login">
                    <Button variant="contained" color="default">
                      Login
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </>
  )
}