import {HTMLProps, PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";

export const Text = (props: PropsWithChildren<HTMLProps<HTMLDivElement>>) => {
    const {children, className, ...rest} = props;
    const classes = twMerge(`text-font text-base ${className}`);

    return (
        <div className={classes} {...rest}>
            <span>
                {children}
            </span>
        </div>

    )
}