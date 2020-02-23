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
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import WorkIcon from '@material-ui/icons/Work';
import CloudIcon from '@material-ui/icons/Cloud';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

interface Link {
    name: string;
    url: string;
    img: React.ReactElement;
}

const links: Link[] = [
    {
        name: 'QuickStart',
        url: 'https://docs.odahu.org/tutorials_wine.html',
        img: <AddPhotoAlternateIcon/>,
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

export const GettingStarted: React.FC = () => (
    <Card>
        <CardHeader
            avatar={
                <Avatar variant="square" style={{color: 'black', backgroundColor: 'white'}}>
                    <AssignmentIcon/>
                </Avatar>
            }
            title="Getting Started"
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
