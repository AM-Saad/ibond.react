import Loyalty from "./Loyalty"
import Customers from "./Customers"

interface User{
    _id: string
    first_name: string
    last_name: string
    store_name: string
    to_buy_number:number
    email: string
    image: string
    loyalty:Loyalty[]
    customers:Customers[]
}
export default User