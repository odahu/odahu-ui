import React from 'react';
import {AppBar, Box, makeStyles, Tab, Tabs, Theme, Typography} from "@material-ui/core";
import {NotFoundPage} from "./NotFoundView";
import {LoadingPage} from "./LoadingPage";
import {Link, Switch, Route, useLocation, Redirect} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box height="100%" p={3}>{children}</Box>
        </Typography>
    );
}

export interface ViewPageProps {
    loading: boolean;
    notFound: boolean;
    tabHeaders: string[];
    tabValues: React.ReactElement[];
    baseUrl?: string;
}

export const ViewPage: React.FC<ViewPageProps> = (props) => {
    const classes = useStyles();

    const baseUrl = props.baseUrl as string;
    const location = useLocation();


    if (props.loading) {
        return <LoadingPage/>
    }

    if (props.notFound) {
        return <NotFoundPage/>
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={location.pathname}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    centered
                >
                    {
                        props.tabHeaders.map(header => (
                            <Tab
                                key={header}
                                label={header}
                                value={`${baseUrl}/${header}`}
                                component={Link}
                                to={`${baseUrl}/${header}`}
                            />
                        ))
                    }
                </Tabs>
            </AppBar>
            <Switch>
                <Route exact path={baseUrl}>
                    <Redirect to={`${baseUrl}/${props.tabHeaders[0]}`}/>
                </Route>
                {
                    props.tabValues.map((tab, index) => (
                        <Route key={props.tabHeaders[index]} path={`${baseUrl}/${props.tabHeaders[index]}`}>
                            <TabPanel
                                index={index}
                            >
                                {tab}
                            </TabPanel>
                        </Route>
                    ))
                }
            </Switch>
        </div>
    )
};
