import { useSession, signIn } from "next-auth/react"
import { useEffect } from "react";
import spotifyApi from '../lib/spotify';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRERT,
});

const useSpotify = () => {

    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            // If refresh access token attempt failed, redirect usert to login
            if (session.error === 'RefreshAccessTokenError') {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.setAccessToken);
        }
    }, [session]);

    return spotifyApi;

}

export default useSpotify;