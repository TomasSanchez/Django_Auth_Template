import { ComponentType } from "react";
import { RouteComponentProps } from "react-router-dom";

export type RoutePropType = {
	component: ComponentType<RouteComponentProps<any>> | ComponentType<any> | undefined;
	exact: boolean | undefined;
	computedMatch?: { path: string; url: string; isExact: boolean; params: {} };
	location?: { pathname: string; search: string; hash: string; state: string };
	path: string;
};
