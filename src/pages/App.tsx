import {lazy} from "react";

const MainPage = lazy(() => import('./main/MainPage'));
export const App = () => {
    return (
        <MainPage />
    )
}

export default App;
