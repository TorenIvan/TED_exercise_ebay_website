export interface Product{
    id: number;
    creator: string;
    product: string;
    description: string;
    country: string;
    state: string;
    town: string;
    address: string;
    postcode: string;
    latitude: number;
    longitude: number;
    buy_price: number;
    currently: number;
    first_bid: number;
    number_of_bids: number;
    start_date: string;
    end_date: string;
}