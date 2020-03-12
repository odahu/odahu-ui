import React from "react";
import {Avatar, Card, CardContent, CardHeader, Divider,} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useDashboardPanelStyles = makeStyles(() => ({
    header: {
        fontSize: '16px',
    },
}));


export interface DashboardPanelProps {
    icon: any;
    header: string;
}

export const DashboardPanel: React.FC<DashboardPanelProps> = ({icon, header, children}) => {
    const classes = useDashboardPanelStyles();

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar variant="square" style={{color: 'black', backgroundColor: 'white'}}>
                        {icon}
                    </Avatar>
                }
                title={<span className={classes.header}>{header}</span>}
            />
            <Divider/>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};
