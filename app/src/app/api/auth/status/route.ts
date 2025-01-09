import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const token = req.cookies.get('strava_bearer_token')?.value;

    if (token) {
        return NextResponse.json({ isAuthenticated: true });
    }

    return NextResponse.json({ isAuthenticated: false });
}