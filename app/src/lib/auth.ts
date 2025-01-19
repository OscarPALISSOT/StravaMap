import {NextAuthOptions} from "next-auth"
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {prisma} from "@/lib/prisma";
import StravaProvider from "next-auth/providers/strava";

export const authOptions : NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        StravaProvider({
            clientId: process.env.STRAVA_CLIENT_ID as string,
            clientSecret: process.env.STRAVA_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: "activity:read_all,read_all",
                },
            },
            token: {
                async request({ client, params, checks, provider }) {
                    const { token_type, expires_at, refresh_token, access_token } = await client.oauthCallback(provider.callbackUrl, params, checks)
                    return {
                        tokens: { token_type, expires_at, refresh_token, access_token },
                    }
                },
            },
        })
    ],
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token = Object.assign({}, token, { access_token: account.access_token }, {expires_at: account.expires_at});
            }
            return token
        },
        async session({session, token}) {
            if(session) {
                session = Object.assign({}, session, {access_token: token.access_token}, {expires_at: token.expires_at})
            }
            return session
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 6 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
}