import {HoverCard as HoverMantine} from "@mantine/core";
import React, {PropsWithChildren, ReactNode} from "react";

interface HoverCardProps {
    content?: ReactNode | undefined
}
export const HoverCard = (props: PropsWithChildren<HoverCardProps>) => {
    return (
        <HoverMantine withArrow closeDelay={0} position={'top'} >
            <HoverMantine.Target>
                {props.children}
            </HoverMantine.Target>
            <HoverMantine.Dropdown>
                {props.content}
            </HoverMantine.Dropdown>
        </HoverMantine>
    )
}