import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid, {GridSize} from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

type FormFieldType = {
    label: string,
    subLabel?: string,
    name: string,
    type: string,
    width: GridSize,
    defaultValue: number,
    icon?: ReactNode,
};

type FormType = {
    formData: object,
    formFields: FormFieldType[]
    submitButtonText: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (event: React.MouseEvent) => void,
    errorMessage: string,
};

const Form = ({formData, formFields, submitButtonText, handleChange, handleSubmit, errorMessage=''}:FormType) => {
    const classes = useStyles();
  
    return (
        <form className={classes.form} noValidate>
            { errorMessage && (
                <Box mt={2} mb={3}>
                    <Alert severity="error">{errorMessage}</Alert>
                </Box>
            )}
            <Grid container spacing={2}>
                {formFields.map(formField => {
                    if (formField.type === 'header') {
                        return (
                            // @ts-ignore: Unreachable code error
                            <Grid item xs={12} sm={formField.width} key={formField.name}>
                                <Box mt={2}>
                                    <Typography variant="subtitle1">
                                        {formField.label}
                                    </Typography>
                                    <br/>
                                    <Typography variant="body1">
                                        {formField.defaultValue}
                                    </Typography>
                                </Box>
                            </Grid>
                        )
                    }
                    else {
                        return (
                            <Grid item xs={12} sm={formField.width} id={formField.name}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id={formField.name}
                                    label={formField.label}
                                    name={formField.name}
                                    type={formField.type}
                                    // @ts-ignore: Unreachable code error
                                    value={formData[formField?.name]}
                                    onChange={handleChange}
                                    autoFocus
                                    InputProps={{
                                        startAdornment: formField.icon && (
                                        <InputAdornment position="start">
                                            {formField.icon}
                                        </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        )
                    }
                })}
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
            >
                {submitButtonText}
            </Button>
        </form>
    )
};

export default Form

