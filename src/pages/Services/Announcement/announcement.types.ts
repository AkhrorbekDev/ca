export interface AnnouncementType {
    id: number,
    adv_type: string,
    shipment_date: string | null,
    status: string,
    service_type_id: number,
    service_name: string,
    from_location: LocationType | null,
    to_location: LocationType | null,
    price: number,
    details: DetailsType,
    images: string[] | null,
    note: string,
    comments: string[] | null,
    transport_name: string,
    transport_icon: string,
    created_by_name: string | null,
    created_by_phone: string,
    created_by_tg_link: string | null,
    workshop_services: string[] | null,
    workshop_categories: string[] | null,
    car_name: string | null
}

interface LocationType {
    lat: number,
    lng: number,
    name: string
}

interface DetailsType {
    transportation_type_id: number,
    from_date: string,
    to_date: string
}