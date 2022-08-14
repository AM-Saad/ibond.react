interface Loyalty {
    store_id: string;
    points: number
    bills_images: string[]
    last_redeem_date:string
    history:{id:number, done:boolean, date:string}[]
}


export default Loyalty