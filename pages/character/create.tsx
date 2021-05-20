import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouter } from 'next/router'

import Form from '../../components/Form';
import Layout from '../../components/Layout';
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

const WithStaticProps = () => {
    const classes = useStyles();
    const router = useRouter();

    const initialFormData = Object.freeze(formFields.reduce((initialFormData, formField) => {
        if (formField.name) {
            return {...initialFormData, [formField.name]: formField.defaultValue};
        }
        else {
            return initialFormData;
        }
    }, {}));

    const [formData, setFormData] = React.useState(initialFormData);
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
                const { errorMessage } = await requestData('api/character', 'POST', formData, {
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
  
    return (
        <Layout title="FANTASTIG Tracking - Characters">
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <FaceIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create your charater
                    </Typography>
                    <Form
                        formData={formData}
                        // @ts-ignore: Unreachable code error
                        formFields={formFields}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        submitButtonText="Create Character"
                        errorMessage={errorMessage}
                    />
                </div>
            </Container>
        </Layout>
    )
};

export default WithStaticProps

