import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useRouter } from 'next/router'

import Form from '../../components/Form';
import Layout from '../../components/Layout';
import { requestData } from '../../utils/request';


const formFields = [
    {
        label: 'Username',
        name: 'username',
        type: 'text',
        width: 12,
        defaultValue: '',
    },
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        width: 12,
        defaultValue: '',
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
  
    const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        // TODO: validate formData & error handling
        
        try {
            const {
                token,
                errorMessage
            } = await requestData('api/user/login', 'POST', formData);

            if (errorMessage) {
                setErrorMessage(errorMessage);
            }
            else {
                sessionStorage.setItem('fantastigToken', token);
                router.push(`/character`);
            }
        } catch (e) {
            setErrorMessage(e.message);
        }
    };
  
    return (
        <Layout title="FANTASTIG Tracking - Characters">
            <Container component="main" maxWidth="xs" className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Form 
                    formData={formData}
                    formFields={formFields}
                    submitButtonText="Login"
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    errorMessage={errorMessage}
                />
            </Container>
        </Layout>
    )
};

export default WithStaticProps

