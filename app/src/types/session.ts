type SessionType = {
    user: {
        name: string,
        email?: string,
        image: string,
    },
    access_token: string,
}

export default SessionType;