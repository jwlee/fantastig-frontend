import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Radar } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { useRouter } from 'next/router'
import { Box } from '@material-ui/core';

import { CharacterType } from '../interfaces';

type CharaterCardType = {
    character: CharacterType,
    editEnabled?: boolean
};

const CharaterCard = ({character, editEnabled=false}: CharaterCardType) => {
    const router = useRouter();

    const data = {
        labels: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
        datasets: [
            {
                label: 'Charater Stats',
                data: [character.strength, character.dexterity, character.constitution, character.intelligence, character.wisdom, character.charisma],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scale: {
            ticks: { beginAtZero: true },
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 0,
                suggestedMax: 20
            }
        },
    };

    const handleEdit = () => {
        router.push(`/character/${character._id}`)
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h5" component="h2">
                            {character.name}
                        </Typography>
                        {editEnabled && (
                            <IconButton aria-label="edit">
                                <EditIcon onClick={handleEdit} />
                            </IconButton>
                        )}
                    </Grid>
                    <Radar type="radar" data={data} options={options}/>
                    <Box mt={2} mb={2}>
                        <Grid container spacing={0}>
                            <Grid item xs={6} sm={6} md={6}>
                                {`Strength (STR): ${character.strength}`}
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                {`Dexterity (DEX): ${character.dexterity}`}
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                {`Constitution (CON): ${character.constitution}`}
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                {`Intelligence (INT): ${character.intelligence}`}
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                {`Wisdom (WIS): ${character.wisdom}`}
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}>
                                {`Charisma (CHA): ${character.charisma}`}
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                    >
                        <Typography color="textSecondary" gutterBottom>
                            {`username - ${character.username}`}
                        </Typography>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

export default CharaterCard;