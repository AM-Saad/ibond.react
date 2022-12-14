import Meta from './Meta'
import User from './User'
interface UserContext {
    url: string
    server_url: string
    user: User | null
    meta: Meta
    currentStore: User | null,
    storeMeta: Meta
    setUserHandler: (user: User) => void
    get_me: (id: string) => void
    get_store: (id: string) => void
    login: (email: string) => void
    logout: () => void
    requiredAuth: boolean
    loginRequired: () => void
}


export default UserContext