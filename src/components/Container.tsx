import {PropsWithChildren} from "react";

export const Container = (props: PropsWithChildren<{className?: string}>) => {
    const {children, className} = props;
    return (
        <div className={`relative min-h-screen w-screen bg-cyan-50 bg-gradient-to-tr from-fuchsia-100 ${className ?? ''}`}>
            {children}
        </div>
    )
}
export default Container