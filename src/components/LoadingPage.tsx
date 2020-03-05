import React from 'react';
import {Skeleton} from "@material-ui/lab";

export const LoadingPage: React.FC = () => (
    <Skeleton variant="rect" width={"100%"} height={400}/>
);
