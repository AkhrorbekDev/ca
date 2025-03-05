import car from "@/assets/images/cars.svg"
import furgon from "@/assets/images/trucks/furgon.png"
import gazel from "@/assets/images/trucks/gazel.png"
import ochu from "@/assets/images/trucks/ochu.png"
import truck from "@/assets/images/trucks/truck.png"
import shalanda from "@/assets/images/trucks/shalanda.png"
import gaz from "@/assets/images/trucks/gaz.png"

import moto from '@/assets/images/icons/motobike.svg'
import rul from '@/assets/images/icons/rul.svg'
import truck2 from '@/assets/images/icons/labo.svg'
import pistol from '@/assets/images/icons/pistol.svg'
import carKey from '@/assets/images/icons/carKey.svg'
import exkavator from '@/assets/images/icons/exkovator.svg'
import evakvator from '@/assets/images/icons/evakvator.svg'
import home from '@/assets/images/icons/home.svg'
import settings from '@/assets/images/icons/settings.svg'

export const services = [
    {
        img: moto,
        "id": 9,
        title: 'Yetkazib berish',
        unique: "delivery",
        route: "service-detail"
    },
    {
        img: rul,
        "id": 10,
        title: 'Peregon xizmati',
        unique: "distillation",
        route: "service-detail"
    },
    {
        img: truck2,
        id: 1,
        title: 'Yuk tashish',
        unique: "shipping",
        route: "service-detail"
    },
    {
        img: pistol,
        id: 8,
        title: 'Yoqilg‘i yetkazish',
        unique: "oil",
        route: "service-detail"
    },
    {
        img: car,
        "id": 2,
        title: 'Yo\'lovchilarni tashish',
        unique: "passenger",
        route: "service-detail"
    },
    {
        img: carKey,
        "id": 4,
        title: 'Transport ijarasi',
        unique: "rent",
        route: "transport-rental"
    },
    {
        img: exkavator,
        "id": 3,
        title: 'Maxsus texnika',
        unique: "technical",
        route: "service-detail"
    },
    {
        img: evakvator,
        "id": 6,
        title: 'Transport transferi',
        unique: "transfer",
        route: "service-detail"
    },
    {
        img: home,
        "id": 7,
        title: 'Omborda saqlash',
        unique: "keeping",
        route: "service-keeping"
    },
    {
        img: settings,
        "id": 5,
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
        img: truck2,
        title: 'Yuk tashish',
        child: Truck
    },
    {
        img: car,
        title: 'Yo\'lovchilarni tashish',
        child: Truck
    },
    {
        img: exkavator,
        title: 'Maxsus texnika xizmatlari',
        child: Truck
    },
    {
        img: carKey,
        route: 'transport-rental',
        title: 'Transport ijarasi'
    },
    {
        img: evakvator,
        title: 'Transport transferi'
    },
]

