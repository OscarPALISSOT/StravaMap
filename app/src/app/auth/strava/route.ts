import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
    }

    try {
        const response = await axios.post('https://www.strava.com/oauth/token', {
            client_id: process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
            client_secret: process.env.STRAVA_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
        });

        const { access_token, expires_in } = response.data;
        const maxAge = expires_in || 604800;

        console.log('token', access_token);

        const responseWithCookie = NextResponse.redirect(new URL('/', request.url));
        responseWithCookie.cookies.set('strava_bearer_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge,
        });

        return responseWithCookie;
    } catch (error) {
        console.error('Failed to retrieve access token :', error);
        return NextResponse.json({ error: 'Failed to retrieve access token' }, { status: 500 });
    }
}