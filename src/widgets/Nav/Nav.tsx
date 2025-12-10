// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Tab, Tabs } from "@mui/material";
import getUserRole from "entities/User/model/selectors/getRole.ts";
import { getIsAuthenticated } from "entities/User/model/selectors/getUser.ts";
import { E_UserRole } from "entities/User/model/types/User.ts";
import * as React from "react";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "src/app/providers/StoreProvider/hooks/hooks.ts";
import { useRouteMatch } from "src/app/Router/AppRouter.tsx";

export type T_Tab = {
    id: number;
    path: string;
    label: string;
    needAuth?: boolean;
    roles?: E_UserRole[];
    icon?: React.ReactElement;
    testId: string;
};

type Props = {
    tabs: T_Tab[];
    extraTabs: T_Tab[];
};

const Nav: FC<Props & PropsWithChildren> = ({
    tabs,
    extraTabs = [],
    children,
}) => {
    const isAuthenticated = useAppSelector(getIsAuthenticated);
    const role = useAppSelector(getUserRole);

    const routeMatch = useRouteMatch([
        ...extraTabs,
        ...tabs.flatMap((tab: T_Tab) => [tab.path, ...(tab.extraPaths || [])]),
    ]);

    let currentTab = routeMatch ? routeMatch.pattern?.path : false;

    const foundTab = tabs.find((tab: T_Tab) =>
        tab.extraPaths?.includes(currentTab)
    );
    if (foundTab) {
        currentTab = foundTab.path;
    }

    const isHidden = (tab: T_Tab) =>
        (tab.needAuth !== undefined && tab.needAuth !== isAuthenticated) ||
        (tab.roles && !tab.roles.includes(role));

    return (
        <Tabs value={currentTab}>
            {tabs.map((tab: T_Tab) => (
                <Tab
                    key={tab.id}
                    label={tab.label}
                    value={tab.path}
                    to={tab.path}
                    component={Link}
                    icon={tab.icon}
                    iconPosition="start"
                    hidden={isHidden(tab)}
                    data-test-id={tab.testId}
                />
            ))}
            {children}
        </Tabs>
    );
};

export default Nav;
