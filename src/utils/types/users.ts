export type Users = {
    user_id: number,
    affinity: number,
}

export type UsersResponse = {
    user_affinities: Users[];
}