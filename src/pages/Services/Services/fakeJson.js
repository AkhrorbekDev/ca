import moto from '@/assets/images/icons/motobike.svg'
import rul from '@/assets/images/icons/rul.svg'
import truck from '@/assets/images/icons/labo.svg'
import pistol from '@/assets/images/icons/pistol.svg'
import car from '@/assets/images/icons/car.svg'
import carKey from '@/assets/images/icons/carKey.svg'
import exkavator from '@/assets/images/icons/exkovator.svg'
import evakvator from '@/assets/images/icons/evakvator.svg'
import home from '@/assets/images/icons/home.svg'
import settings from '@/assets/images/icons/settings.svg'

import gazel from "@/assets/images/icons/gazel.png"
import aspalt from "@/assets/images/icons/aspalt.png"
import hyundai from "@/assets/images/icons/hyundai.png"
import skuter from "@/assets/images/icons/skuter.png"

export const services = [
    {
        title: 'Yetkazib berish',
        subTitle: 'Tovar va mahsulotlarni tez va xavfsiz manzilga yetkazib berish xizmati',
        img: moto,
        unique: "delivery",
        route: "service-detail"
    },
    {
        title: 'Peregon',
        subTitle: 'Malakali haydovchilar tomonidan avtomobilingizni kerakli manzilga yetkazib berish xizmati',
        img: rul,
        unique: "distillation",
        route: "service-detail"
    },
    {
        title: 'Yuk tashish',
        subTitle: 'Barcha turdagi kichikdan kattagacha yuklarni tashish uchun samarali yechim',
        img: truck,
        unique: "shipping",
        route: "service-detail"
    },
    {
        title: 'Yoqilg’i yetkazish',
        subTitle: 'Avtomobilingiz uchun yoqilg‘ini tez va sifatli belgilangan manzilga yetkazish',
        img: pistol,
        unique: "oil",
        route: "service-detail"
    },
    {
        title: 'Yo‘lovchi tashish',
        subTitle: 'Shaxsiy, oilaviy yoki guruh bo‘lib sayohat qilish uchun transport xizmati',
        img: car,
        unique: "passenger",
        route: "service-detail"
    },
    {
        title: 'Transport ijarasi',
        subTitle: 'Bu transport vositalarini vaqtinchalik foydalanish uchun to\'lov asosida berish xizmati',
        img: carKey,
        route: "transport-rental"
    },
    {
        title: 'Maxsus texnika',
        subTitle: 'Qurilish yoki maxsus ishlarni bajarish uchun zarur bo‘lgan texnikalar xizmati',
        img: exkavator,
        unique: "technical",
        route: "service-detail"
    },
    {
        title: 'Transport transferi',
        subTitle: 'Transportlarni manzilga xavfsiz va vaqtida yetkazib berish xizmati',
        img: evakvator,
        unique: "transfer",
        route: "service-detail"
    },
    {
        title: 'Saqlash xizmati',
        subTitle: 'Yuklaringizni xavfsiz va qulay saqlash uchun omborxona xizmatlari',
        img: home,
        unique: "keeping",
        route: "service-keeping"
    },
    {
        title: 'Avto ta’mirlash',
        subTitle: 'Texnik ko‘rik va boshqa zarur bo‘lgan avtoservis xizmatlarini ko‘rsatish',
        img: settings,
        unique: "repair",
        route: 'transport-repair'
    },
]

export const transportAdvertising = [
    {
        title: 'Yuk tashish',
        id: 1,
        subTitle: 'Barcha turdagi kichikdan kattagacha yuklarni tashish uchun samarali yechim',
        img: truck
    },
    {
        title: 'Yo‘lovchi tashish',
        id: 2,
        subTitle: 'Shaxsiy, oilaviy yoki guruh bo‘lib sayohat qilish uchun transport xizmati',
        img: car
    },
    {
        title: 'Maxsus texnika',
        id: 3,
        subTitle: 'Qurilish yoki maxsus ishlarni bajarish uchun zarur bo‘lgan texnikalar xizmati',
        img: exkavator
    },
    {
        title: 'Transport ijarasi',
        subTitle: 'Bu transport vositalarini vaqtinchalik foydalanish uchun to\'lov asosida berish xizmati',
        img: carKey
    },
    {
        id: 6,
        title: 'Transport transferi',
        subTitle: 'Transportlarni manzilga xavfsiz va vaqtida yetkazib berish xizmati',
        img: evakvator
    },
]

export const advertising = [
    {
        title: 'Yuk tashish',
        date: '16.08.2024',
        img: gazel
    },
    {
        title: 'Maxsus texnika',
        date: '16.08.2024',
        img: aspalt
    },
    {
        title: 'Yo‘lovchi tashish',
        date: '16.08.2024',
        img: hyundai
    },
    {
        title: 'Yetkazib berish',
        date: '16.08.2024',
        img: skuter
    },
    {
        title: 'Yuk tashish',
        date: '16.08.2024',
        img: gazel
    },
    {
        title: 'Maxsus texnika',
        date: '16.08.2024',
        img: aspalt
    },
    {
        title: 'Yo‘lovchi tashish',
        date: '16.08.2024',
        img: hyundai
    },
    {
        title: 'Yuk tashish',
        date: '16.08.2024',
        img: gazel
    },
]
