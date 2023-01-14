import {PropsWithChildren} from "react";

export const Container = (props: PropsWithChildren) => {
    const {children} = props;
    return (
        <div className={'flex justify-center items-center w-screen h-screen bg-cyan-50 bg-gradient-to-tr from-fuchsia-100'}>
            {children}
        </div>
    )
}
export default Container