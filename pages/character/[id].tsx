import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router'
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

import Form from '../../components/Form';
import Layout from '../../components/Layout';
import { CharacterType } from '../../interfaces';
import { requestData } from '../../utils/request';


const formFields = [
    {
        label: 'Character Name',
        name: 'name',
        type: 'text',
        width: 12,
        defaultValue: '',
    },
    {
        type: 'header',
        label: 'What\'s your character\'s stats',
        defaultValue: 'Choose your stat for each category from 1 to 20',
        width: 12,
    },
    {
        label: 'Strength (STR)',
        name: 'strength',
        type: 'number',
        width: 6,
        defaultValue: 1,
        icon: null,
    },
    {
        label: 'Dexterity (DEX)',
        name: 'dexterity',
        type: 'number',
        width: 6,
        defaultValue: 1,
    },
    {
        label: 'Constitution (CON)',
        name: 'constitution',
        type: 'number',
        width: 6,
        defaultValue: 1,
    },
    {
        label: 'Intelligence (INT)',
        name: 'intelligence',
        type: 'number',
        width: 6,
        defaultValue: 1,
    },
    {
        label: 'Wisdom (WIS)',
        name: 'wisdom',
        type: 'number',
        width: 6,
        defaultValue: 1,
    },
    {
        label: 'Charisma (CHA)',
        name: 'charisma',
        type: 'number',
        width: 6,
        defaultValue: 1,
    },
];

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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type Props = {
    character: CharacterType,
}

const StaticPropsDetail = ({ character }: Props) => {
    const classes = useStyles();
    const router = useRouter();

    const [formData, setFormData] = React.useState({...character});
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            // Trimming any whitespace
            [event.target.name]: event.target.value.trim()
        });
    };
  
    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        // TODO: validate formData & error handling
        
        try {
            const token: string | null = sessionStorage.getItem('fantastigToken');

            if (token) {
                const { errorMessage } = await requestData(`api/character/${character._id}`, 'PUT', formData, {
                    'Authorization': 'Basic ' + token,
                });
                if (errorMessage) {
                    setErrorMessage(errorMessage);
                } else {
                    router.push(`/character`);
                }
            } else {
                router.push('/user/login');
            }
            // TODO: error message
        } catch (e) {
            // TODO: error message
        }
    };

    const handleDelete = async () => {
        const token: string | null = sessionStorage.getItem('fantastigToken');

        if (token) {
            const {errorMessage} = await requestData(`api/character/${character._id}`, 'DELETE', undefined, {
                'Authorization': 'Basic ' + token,
            });
            if (!errorMessage) {
                router.push('/character');
            }
        } else {
            router.push('/user/login');
        }
    }
  
    return (
        <Layout title="FANTASTIG Tracking - Characters">
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <FaceIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update your charater
                    </Typography>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Fab color="secondary" aria-label="edit" onClick={handleDelete}>
                                <DeleteIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                    <Form
                        formData={formData}
                        // @ts-ignore: Unreachable code error
                        formFields={formFields}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        submitButtonText="Update"
                        errorMessage={errorMessage}
                    />
                </div>
            </Container>
        </Layout>
    )
}

export default StaticPropsDetail

export const getStaticPaths: GetStaticPaths = async () => {
    // Get the paths we want to pre-render based on users
    const { characters }:{ characters: CharacterType[] } = await requestData(`api/character`, 'GET');

    // Get the paths we want to pre-render based on posts
    const paths = characters.map((character) => ({
        params: { id: character._id },
    }))


    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: true }
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const id = params?.id;
        const { character }:{ character: CharacterType } = await requestData(`api/character/${id}`, 'GET');
        // By returning { props: item }, the StaticPropsDetail component
        // will receive `item` as a prop at build time
        return { props: { character } }
    } catch (err) {
        return { props: { errors: err.message } }
    }
}
