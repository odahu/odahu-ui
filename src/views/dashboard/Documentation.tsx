import React from "react";
import {Link, List, ListItem, ListItemIcon, ListItemText,} from "@material-ui/core";
import SchoolIcon from '@material-ui/icons/School';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import WorkIcon from '@material-ui/icons/Work';
import CloudIcon from '@material-ui/icons/Cloud';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

interface Link {
    id: string;
    name: string;
    url: string;
    img: React.ReactElement;
}

const links: Link[] = [
    {
        id: "quickStartLink",
        name: 'Quickstart',
        url: 'https://docs.odahu.org/tutorials_wine.html',
        img: <SchoolIcon/>,
    },
    {
        id: "connectionsLink",
        name: 'Connections',
        url: 'https://docs.odahu.org/ref_connections.html',
        img: <SettingsInputComponentIcon/>,
    },
    {
        id: "trainingsLink",
        name: 'Trainings',
        url: 'https://docs.odahu.org/ref_trainings.html',
        img: <FitnessCenterIcon/>,
    },
    {
        id: "packagingsLink",
        name: 'Packagings',
        url: 'https://docs.odahu.org/ref_packagers.html',
        img: <WorkIcon/>,
    },
    {
        id: "deploymentsLink",
        name: 'Deployments',
        url: 'https://docs.odahu.org/ref_deployments.html',
        img: <CloudIcon/>,
    },
];

export const Documentation: React.FC = () => {
    return (
        <div style={{backgroundColor:'#fff'}}
        >
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
        </div>
    );
};
