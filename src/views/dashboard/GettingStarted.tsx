import React from "react";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import AssignmentIcon from '@material-ui/icons/Assignment';
import SchoolIcon from '@material-ui/icons/School';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import WorkIcon from '@material-ui/icons/Work';
import CloudIcon from '@material-ui/icons/Cloud';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    header: {
        fontSize: '16px',
    },
}));

interface Link {
    name: string;
    url: string;
    img: React.ReactElement;
}

const links: Link[] = [
    {
        name: 'Quickstart',
        url: 'https://docs.odahu.org/tutorials_wine.html',
        img: <SchoolIcon/>,
    },
    {
        name: 'Connections',
        url: 'https://docs.odahu.org/ref_connections.html',
        img: <SettingsInputComponentIcon/>,
    },
    {
        name: 'Training',
        url: 'https://docs.odahu.org/ref_trainings.html',
        img: <FitnessCenterIcon/>,
    },
    {
        name: 'Packaging',
        url: 'https://docs.odahu.org/ref_packagers.html',
        img: <WorkIcon/>,
    },
    {
        name: 'Deployment',
        url: 'https://docs.odahu.org/ref_deployments.html',
        img: <CloudIcon/>,
    },
];

export const GettingStarted: React.FC = () => {
    const classes = useStyles();

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar variant="square" style={{color: 'black', backgroundColor: 'white'}}>
                        <AssignmentIcon/>
                    </Avatar>
                }
                title={<span className={classes.header}>Getting Started</span>}
            />
            <Divider/>
            <CardContent>
                <List>
                    {links.map(({img, name, url}) => (
                        <Link href={url}
                              key={name}
                              style={{color: 'inherit', textDecoration: 'none'}}
                              target="_blank">
                            <ListItem button>
                                <ListItemIcon>
                                    {img}
                                </ListItemIcon>
                                <ListItemText primary={name}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
