export interface Announcement {
    adv_type: "PROVIDE" | "RECEIVE";
    service_type_id: number;
    from_location: {
        lat: number;
        lng: number;
        name: string;
    };
    price: number;
    details: {
        repair_type_id: number;
        category: number[];
        services: number[];
        company_name: string;
    };
    note: string;
}