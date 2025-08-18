type SessionType = {
    user: {
        name: string,
        email?: string,
        image: string,
    },
    access_token: string,
    expires_at: number,
}

export default SessionType;