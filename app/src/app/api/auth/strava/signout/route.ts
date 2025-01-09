import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ message: 'Successfully signed out' });

    response.cookies.set('strava_bearer_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0),
    });

    return response;
}