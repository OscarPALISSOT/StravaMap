import {NextRequest, NextResponse} from 'next/server';

export function middleware(request: NextRequest) {

    const token = request.cookies.get('strava_bearer_token')?.value;

    if (request.nextUrl.pathname === '/api/auth/strava/token') {
        return NextResponse.next();
    }

    if (!token) {
        const url = new URL('/', request.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/map'],
};