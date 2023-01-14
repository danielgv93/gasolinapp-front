import {lazy, Suspense} from "react";
import {DefaultSkeleton} from "../../components";

const MainLayout = lazy(() => import('./MainLayout'));

export const MainPage = () => {
    return (
        <Suspense fallback={<DefaultSkeleton />}>
            <MainLayout />
        </Suspense>
    )
}
export default MainPage