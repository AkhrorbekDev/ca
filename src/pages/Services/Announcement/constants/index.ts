import car from "@/assets/images/cars.svg"
import furgon from "@/assets/images/trucks/furgon.png"
import gazel from "@/assets/images/trucks/gazel.png"
import ochu from "@/assets/images/trucks/ochu.png"
import truck from "@/assets/images/trucks/truck.png"
import shalanda from "@/assets/images/trucks/shalanda.png"
import gaz from "@/assets/images/trucks/gaz.png"
import ekskavator from "@/assets/images/ekskavator.png"
import ustaxona from "@/assets/images/ustaxona.png"
import usta from "@/assets/images/usta.png"


export const announcement = [
    {
        name: "Yetkazib\n" +
            "berish",
        image: car,
        unique: "delivery",
        child: [
            {
                name: "Velosiped",
                volute: "3 kg gacha",
                image: furgon,
                unique: "delivery",
            },
            {
                name: "Skuter",
                volute: "5 kg gacha",
                image: gazel,
                unique: "delivery",
            },
            {
                name: "Sedan",
                volute: "20 kg gacha",
                image: ochu,
                unique: "delivery",
            },

        ]
    },

    {
        name: "Peregon xizmati",
        image: car,
        unique: "distillation",
    },

    {
        name: "Yuk tashish",
        image: car,
        id: 1,
        child: [
            // {
            //     title: "Furgon",
            //     info: "4.8x2.05x1.92",
            //     image: furgon,
            //     unique: "shipping",
            // },
            // {
            //     title: "Gazel",
            //     info: "3.4x1.65x1.9",
            //     image: gazel,
            //     unique: "shipping",
            // },
            // {
            //     title: "Bortovoy",
            //     info: "7.0x2.4x2.6",
            //     image: ochu,
            //     unique: "shipping",
            // },
            // {
            //     title: "Fura",
            //     info: "7.0x2.4x2.6",
            //     image: truck,
            //     unique: "shipping",
            // },
            //
            // {
            //     title: "Amerika furasi",
            //     info: "16.6x2.45x2.7",
            //     image: shalanda,
            //     unique: "shipping",
            // },
            //
            // {
            //     title: "Bitumovoz",
            //     info: "13.6x2.45x2.7",
            //     image: gaz,
            //     unique: "shipping",
            // }
        ],
        unique: "shipping",
    },

    {
        name: "Yoqilg‘i\n" +
            "yetkazish",
        image: car,
        unique: "oil",
    },

    {
        name: "Yo'lovchilarni\n" +
            "tashish",
        image: car,
        unique: "passenger",
        id: 2,
        child: [

            // {
            //     title: "Avto",
            //     info: "5 o‘rindiqli",
            //     image: furgon,
            //     unique: "passenger",
            // },
            // {
            //     title: "Miniven",
            //     info: "8 o‘rindiqli",
            //     image: gazel,
            //     unique: "passenger",
            // },
            // {
            //     title: "Mikroavtobus",
            //     info: "20 o‘rindiqli",
            //     image: ochu,
            //     unique: "passenger",
            // },
            // {
            //     title: "Avtobus",
            //     info: "30 o‘rindiqli",
            //     image: truck,
            //     unique: "passenger",
            // },
            //
            // {
            //     title: "Avtobus",
            //     info: "50 o‘rindiqli",
            //     image: shalanda,
            //     unique: "passenger",
            // }
        ]
    },

    {
        name: "Transport\n" +
            "ijarasi",
        image: car,
        unique: "rent",
    },

    {
        name: "Maxsus texnika\n" +
            "xizmatlari",
        image: car,
        unique: "technical",
        id: 3,
        child: [
            // {
            //     title: "Ekskavator",
            //     info: "Qazish ishlari uchun",
            //     image: ekskavator,
            //     unique: "technical",
            // },
            // {
            //     title: "Miniven",
            //     info: "8 o‘rindiqli",
            //     image: ekskavator,
            //     unique: "technical",
            // },
            // {
            //     title: "Mikroavtobus",
            //     info: "20 o‘rindiqli",
            //     image: ekskavator,
            //     unique: "technical",
            // },
            // {
            //     title: "Avtobus",
            //     info: "30 o‘rindiqli",
            //     image: ekskavator,
            //     unique: "technical",
            // },
            //
            // {
            //     title: "Avtobus",
            //     info: "50 o‘rindiqli",
            //     image: ekskavator,
            //     unique: "technical",
            // }
        ]
    },

    {
        name: "Transport\n" +
            "transferi",
        image: car,
        unique: "transfer",
        child: [
            {
                name: "Avtovozlar",
                volute: "Maxsus yuk mashinalari",
                image: '',
                unique: "transfer",
            },
            {
                name: "Evakuator",
                volute: "Maxsus yuk mashinalari",
                image: '',
                unique: "transfer",
            },
            {
                name: "Maxsus texnika\n" +
                    "transferi",
                volute: "Maxsus yuk mashinalari",
                image: '',
                unique: "transfer",
            },
            {
                name: "Yaxtalar va qayiqlar",
                volute: "Maxsus yuk mashinalari",
                image: '',
                unique: "transfer",
            }
        ]
    },

    {
        name: "Saqlash\n" +
            "xizmati",
        image: car,
        unique: "keeping",
    },

    {
        name: "Avto\n" +
            "ta'mirlash",
        image: car,
        unique: "repair",
        child: [
            {
                name: "Ustaxonalar",
                volute: "Xizmat ko’rsatish",
                image: ustaxona,
                unique: "repair",
            },
            {
                name: "Ustalar",
                volute: "Bir turdagi xizmat",
                image: usta,
                unique: "master",
                child: [
                    {
                        name: "Kuzov ustasi",
                        volute: "Polirovka, bo‘yoq, qirilish,\n" +
                            "buklanish",
                        image: '',
                        unique: "master",
                    },
                    {
                        name: "Avtoelektrik",
                        volute: "Elektrga oid barcha ishlar, fara, tablo",
                        image: '',
                        unique: "master",
                    },
                    {
                        name: "Mator ustasi",
                        volute: "Dvigitel motor ishlari",
                        image: '',
                        unique: "master",
                    },

                ]
            },
        ]
    },

]