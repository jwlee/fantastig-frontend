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
        label: 'Username',
        name: 'username',
        type: 'text',
        width: 12,
        defaultValue: '',
    },
    {
        label: 'First Name',
        name: 'firstName',
        type: 'text',
        width: 6,
        defaultValue: '',
    },
    {
        label: 'Last Name',
        name: 'lastName',
        type: 'text',
        width: 6,
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
            const {errorMessage} = await requestData('api/user/register', 'POST', formData);

            if (errorMessage) {
                setErrorMessage(errorMessage);
            }
            else {
                router.push(`/user/login`)
            }
        } catch (e) {
            setErrorMessage(e.message);
        }
    };
  
    return (
        <Layout title="FANTASTIG Tracking - Characters">
            <Container component="main" maxWidth="xs" className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <FaceIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create your account
                </Typography>
                <Form 
                    formData={formData}
                    formFields={formFields}
                    submitButtonText="Create Account"
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    errorMessage={errorMessage}
                />
            </Container>
        </Layout>
    )
};

export default WithStaticProps

