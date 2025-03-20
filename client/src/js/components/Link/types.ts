import * as React from "react";

export interface LinkTypes {
    className?: string;
    dataCy?: string;
    type?: string;
    target?: string;
    to?: string;
    children: React.ReactNode;
    active?: boolean;
    tag?: string;
    href?: string;
    state?: any;
    onClick?: React.MouseEventHandler<HTMLElement> | undefined;
    dataTag?: string;
}
