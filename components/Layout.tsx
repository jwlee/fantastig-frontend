import React, { ReactNode } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router'
import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Head from 'next/head'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

type LayoutType = {
    children?: ReactNode,
    title?: string,
};

const Layout = ({ children, title = 'FANTASTIG Tracking' }: LayoutType) => {
    const classes = useStyles();
    const [isLogin, setIsLogin] = React.useState(null);


    React.useEffect(() => {
        const token: string | null = sessionStorage.getItem('fantastigToken');
        setIsLogin(token);
    }, []);



    const handleLogout = () => {
        sessionStorage.removeItem('fantastigToken');
        window.location.reload();
    }

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <Container component="main" maxWidth="lg" className={classes.paper}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Typography variant="h5" component="h2" color="primary">
                        <Link href="/">
                            <a>{"All"}</a>
                        </Link>
                        {isLogin && (
                            
                            <Link href="/character">
                                <a>{" / Your characters"}</a>
                            </Link>
                        )}
                    </Typography>

                    <Box mt={2} mb={2}>
                        { !isLogin ? (
                                <>
                                    <Button color="inherit" href="/user/login">Login</Button>
                                    <Button color="inherit" href="/user/register">Create Account</Button>
                                </>
                        ) : (
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>

                        )}
                    </Box>

                </Grid>
            </Container>
            {children}
        </div>
    )
};

export default Layout
