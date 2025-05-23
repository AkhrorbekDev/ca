import car from '@/assets/images/cars.svg'
import furgon from '@/assets/images/trucks/furgon.png'
import gazel from '@/assets/images/trucks/gazel.png'
import ochu from '@/assets/images/trucks/ochu.png'
import truck from '@/assets/images/trucks/truck.png'
import shalanda from '@/assets/images/trucks/shalanda.png'
import gaz from '@/assets/images/trucks/gaz.png'

import moto from '@/assets/images/icons/motobike.svg'
import rul from '@/assets/images/icons/rul.svg'
import truck2 from '@/assets/images/icons/labo.svg'
import pistol from '@/assets/images/icons/pistol.svg'
import carKey from '@/assets/images/icons/carKey.svg'
import exkavator from '@/assets/images/icons/exkovator.svg'
import evakvator from '@/assets/images/icons/evakvator.svg'
import home from '@/assets/images/icons/home.svg'
import settings from '@/assets/images/icons/settings.svg'

export const services = [{
    img: truck2, id: 1, title: 'shipping', unique: 'shipping', route: 'service-detail'
}, {
    img: moto, 'id': 9, title: 'delivery', unique: 'delivery', route: 'service-detail'
}, {
    img: rul, 'id': 10, title: 'peregonService', unique: 'distillation', route: 'service-detail'
},

    {
        img: pistol, id: 8, title: 'fuelDelivery', unique: 'oil', route: 'service-detail'
    }, {
        img: car, 'id': 2, title: 'passengerTransport', unique: 'passenger', route: 'service-detail'
    }, {
        img: carKey, 'id': 4, title: 'carRental', unique: 'transport-rental', route: 'service-detail'
    }, {
        img: exkavator, 'id': 3, title: 'specialTechServices', unique: 'technical', route: 'service-detail'
    }, {
        img: evakvator, 'id': 6, title: 'transportTransfer', unique: 'transfer', route: 'service-detail'
    }, {
        img: home, 'id': 7, title: 'warehouseStorage', unique: 'keeping', route: 'service-keeping'
    }, {
        img: settings, 'id': 5, title: 'autoRepair', unique: 'repair',
    },]

export const Truck = [{
    id: 1, title: 'Furgon', subTitle: '4.8x2.05x1.92', img: furgon, route: '/transport'
}, {
    id: 2, title: 'Gazel', subTitle: '3.4x1.65x1.9', img: gazel, route: '/transport'
}, {
    id: 3, title: 'Bortovoy', subTitle: '7.0x2.4x2.6', img: ochu, route: '/transport'
}, {
    id: 4, title: 'Fura', subTitle: '13.6x2.45x2.7', img: truck, route: '/transport'
}, {
    id: 5, title: 'Amerika furasi', subTitle: '16.6x2.45x2.7', img: shalanda, route: '/transport'
}, {
    id: 6, title: 'Bitumovoz', subTitle: '13.6x2.45x2.7', img: gaz, route: '/transport'
}]

export const Menu = [{
    img: truck2, id: 1, title: 'shipping', // child: Truck
}, {
    img: car, id: 2, title: 'passengerTransport', // child: Truck
}, {
    img: exkavator, id: 3, title: 'specialTechServices', // child: Truck
}, {
    img: rul, 'id': 10, title: 'peregonService',
}, {
    img: evakvator, id: 6, title: 'transportTransfer',
},]

export const Announcements = [{
    img: moto, id: 1, title: 'Yetkazib berish', // child: Truck
}, {
    img: rul, id: 2, title: 'Peregon xizmati', // child: Truck
}, {
    img: truck2, id: 3, title: 'Yuk tashish', // child: Truck
}, {
    img: pistol, id: 4, title: 'Yoqilg‘i yetkazish',
}, {
    img: car, id: 5, title: 'Yo\'lovchilarni tashish'
}, {
    img: carKey, id: 6, title: 'Transport ijarasi', // child: Truck
}, {
    img: exkavator, id: 7, title: 'Maxsus texnika xizmatlari', // child: Truck
}, {
    img: evakvator, id: 8, title: 'Transport transferi', // child: Truck
}, {
    img: home, id: 9, title: 'Saqlash xizmati',
}, {
    img: settings, id: 10, title: 'Avto ta\'mirlash'
},]
