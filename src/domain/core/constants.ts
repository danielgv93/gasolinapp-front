export const Api = {
    baseUrl: (process.env.NODE_ENV === 'development')
        ? process.env.REACT_APP_API_URL
        : 'https://gasolinapp.chorizox.app:5000',

}
