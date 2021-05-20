import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Box } from '@material-ui/core';

import CharacterCard from '../../components/CharacterCard';
import Layout from '../../components/Layout';
import { requestData } from '../../utils/request';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    addButton: {
        height: '100%'
    }
}));

const WithStaticProps = () => {
    const classes = useStyles();
    const router = useRouter();

    const [characters, setCharacters] = React.useState([]);

    const fetchCharacters = async () => {
        const token: string | null = sessionStorage.getItem('fantastigToken');

        if (token) {
            const { characters } = await requestData('api/user/characters', 'GET', undefined, {
                'Authorization': 'Basic ' + token,
            });
            setCharacters(characters);
        } else {
            router.push('/user/login');
        }
    };

    React.useEffect(() => {
        fetchCharacters();
    }, [])

    const handleAdd = () => {
        router.push('/character/create');
    }
  
    return (
        <Layout title="FANTASTIG Tracking - Characters">
            <Container component="main" maxWidth="lg" className={classes.paper}>
            <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Box mt={2} mb={2}>
                        <Fab color="primary" aria-label="add" onClick={handleAdd}>
                            <AddIcon />
                        </Fab>
                    </Box>
                </Grid>
                <Grid container spacing={2}>
                    {characters.map((character,index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <CharacterCard character={character} editEnabled={true}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Layout>
    )
};

export default WithStaticProps

