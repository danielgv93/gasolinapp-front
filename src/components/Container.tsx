import {PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";

export const Container = (props: PropsWithChildren<{className?: string}>) => {
    const {children, className} = props;
    const classes = twMerge(`relative min-h-screen w-full bg-primary-1 bg-gradient-to-tr from-[#E8E8E8FF] ${className ?? ''}`)
    return (
        <div className={classes}>
            {children}
        </div>
    )
}
export default Container