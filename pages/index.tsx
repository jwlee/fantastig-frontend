import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import CharacterCard from '../components/CharacterCard';
import Layout from '../components/Layout';
import { requestData } from '../utils/request';

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


const IndexPage = () => {
    const classes = useStyles();

    const [characters, setCharacters] = React.useState([]);


    const fetchCharacters = async () => {
        const { characters } = await requestData('api/character', 'GET');
        setCharacters(characters);
    };

    React.useEffect(() => {
        fetchCharacters();
    }, []);
  
    return (
        <Layout title="FANTASTIG Tracking - Characters">
            <Container component="main" maxWidth="lg" className={classes.paper}>
                <Grid container spacing={2}>
                    {characters.map((character, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <CharacterCard character={character}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Layout>
    )
}
export default IndexPage
