import {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";

export const Container = (props: PropsWithChildren<{className?: string}>) => {
    const {children, className} = props;
    const classes = twMerge(`relative min-h-screen w-screen bg-cyan-50 bg-gradient-to-tr from-fuchsia-100 ${className ?? ''}`)
    return (
        <div className={classes}>
            {children}
        </div>
    )
}
export default Container