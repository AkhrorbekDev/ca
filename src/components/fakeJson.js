import car from "@/assets/images/cars.svg"
import furgon from "@/assets/images/trucks/furgon.png"
import gazel from "@/assets/images/trucks/gazel.png"
import ochu from "@/assets/images/trucks/ochu.png"
import truck from "@/assets/images/trucks/truck.png"
import shalanda from "@/assets/images/trucks/shalanda.png"
import gaz from "@/assets/images/trucks/gaz.png"

export const services = [
    {
        img: car,
        title: 'Yetkazib berish',
        unique: "delivery",
        route: "service-detail"
    },
    {
        img: car,
        title: 'Peregon xizmati',
        unique: "distillation",
        route: "service-detail"
    },
    {
        img: car,
        title: 'Yuk tashish',
        unique: "shipping",
        route: "service-detail"
    },
    {
        img: car,
        title: 'Yoqilg‘i yetkazish',
        unique: "oil"
    },
    {
        img: car,
        title: 'Yo\'lovchilarni tashish',
        unique: "passenger"
    },
    {
        img: car,
        title: 'Transport ijarasi',
        route: "transport-rental"
    },
    {
        img: car,
        title: 'Maxsus texnika xizmatlari',
        unique: "technical"
    },
    {
        img: car,
        title: 'Transport transferi',
        unique: "transfer"
    },
    {
        img: car,
        title: 'Saqlash xizmati',
        unique: "keeping"
    },
    {
        img: car,
        title: 'Avto ta\'mirlash',
        unique: "repair",
        route: 'transport-repair'
    },
]

export const Truck = [
    {
        id: 1,
        title: 'Furgon',
        subTitle: '4.8x2.05x1.92',
        img: furgon,
        route: '/transport'
    },
    {
        id: 2,
        title: 'Gazel',
        subTitle: '3.4x1.65x1.9',
        img: gazel,
        route: '/transport'
    },
    {
        id: 3,
        title: 'Bortovoy',
        subTitle: '7.0x2.4x2.6',
        img: ochu,
        route: '/transport'
    },
    {
        id: 4,
        title: 'Fura',
        subTitle: '13.6x2.45x2.7',
        img: truck,
        route: '/transport'
    },
    {
        id: 5,
        title: 'Amerika furasi',
        subTitle: '16.6x2.45x2.7',
        img: shalanda,
        route: '/transport'
    },
    {
        id: 6,
        title: 'Bitumovoz',
        subTitle: '13.6x2.45x2.7',
        img: gaz,
        route: '/transport'
    }
]

export const Menu = [
    {
        img: car,
        title: 'Yuk tashish',
        child: Truck
    },
    {
        img: car,
        title: 'Yo\'lovchilarni tashish',
        child: Truck
    },
    {
        img: car,
        title: 'Maxsus texnika xizmatlari',
        child: Truck
    },
    {
        img: car,
        route: 'transport-rental',
        title: 'Transport ijarasi'
    },
    {
        img: car,
        title: 'Transport transferi'
    },
]

