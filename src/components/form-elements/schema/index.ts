import * as yup from "yup";

const baseSchema = {
    adv_type: yup.string().required(),
    service_type_id: yup.number().required(),
    note: yup.string().notRequired()
}

const deliverySchema = yup.object({

    from_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    to_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    details: yup.object({
        transportation_type_id: yup.number().required(),
        load_weight: yup.object({
            amount: yup.number().required().moreThan(0),
            name: yup.string().required()
        })
    }),
    ...baseSchema,

})

const passengerTrafficSchema = yup.object({
    shipment_date: yup.string().required(),
    from_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    to_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    details: yup.object({
        transportation_type_id: yup.number().required(),
        passenger_count: yup.number().required().moreThan(0)
    }),
    ...baseSchema,
})

const specialTechniqueSchema = yup.object({
    to_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    details: yup.object({
        from_date: yup.string().required(),
        to_date: yup.string().required(),
        transportation_type_id: yup.number().required(),

    }),
    ...baseSchema
})

const transportRentSchema = yup.object({
    details: yup.object({
        car_id: yup.number().required(),
        "characteristics": yup.object({
            "model_id": yup.number().required(), //Avtomobil model id si
            "vehicle_body_id": yup.number().required(), //Avtomobil kuzov turi id si
            "transmission": yup.number().required(), // Uzatmalar qutisi
            "engine_capacity": yup.string().required(), //Dvigatel hajmi
            "colour_id": yup.number().required(), //Rangi
            "trunk_capacity": yup.string().required(), //Bagaj hajmi
            "passenger_count": yup.number().required(), // maksimal yo'lovchi yoki o‘rindiqlar soni
            "has_air_conditioner": yup.bool().required(), //Konditsioner bor yoki yo'qligi
            "has_insurance": yup.bool().required(), //Sug‘urta bor yoki yo'qligi
            "daily_distance_limit": yup.string().required(), //Sutkalik km kimiti
            "deposit_amount": yup.number().required() //Depozit summasi
        }), // Texnik xarakteristikalar
        "tariffs": yup.array({
            day: yup.number().required(),
        })
    }),
    from_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),


    ...baseSchema,
})

const autoRepairPlaceSchema = yup.object({
    from_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    details: yup.object({
        repair_type_id: yup.number().required(),
        category: yup.array(yup.number()).required(),
        services: yup.array(yup.number()).required(),
        company_name: yup.string().required()
    }),
    ...baseSchema
})
const autoRepairSchema = yup.object({
    from_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    details: yup.object({
        repair_type_id: yup.number().required(),
        transport_specialist_id: yup.number().required(),
        services: yup.array(yup.number()).required(),
        specialist_first_name: yup.string().required(),
        specialist_last_name: yup.string().required()
    }),
    ...baseSchema
})

const transportTransferSchema = yup.object({
    shipment_date: yup.string().required(),
    from_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    to_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    details: yup.object({
        transportation_type_id: yup.number().required(),
        transport_count: yup.number().required().moreThan(0)
    }),
    ...baseSchema
})

const warehouseSchema = yup.object({
    to_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    service_name: yup.string().required(),
    details: {
        area: yup.string().required()
    },
    ...baseSchema
})

const oilTransfer = yup.object({
    shipment_date: yup.string().required(),
    to_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    details: yup.object({
        company_id: yup.number().required(),
        fuel_amount: yup.number().required().moreThan(0),
        fuel_type_id: yup.string().required(),
    }),
    ...baseSchema
})

const peregonSchema = yup.object({
    shipment_date: yup.string().required(),
    from_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    to_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    ...baseSchema
})
const shippingSchema = yup.object({
    shipment_date: yup.string().required(),

    from_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    to_location: yup.object({
        lat: yup.string().required(),
        lng: yup.string().required(),
        name: yup.string().required()
    }).nonNullable(),
    details: yup.object({
        transportation_type_id: yup.number().required(),
        load_weight: yup.object({
            amount: yup.number().required().moreThan(0),
            name: yup.string().required()
        }),
        load_type_id: yup.number().required(),
        load_service_id: yup.number().required()
    }),
    ...baseSchema
})

export {
    oilTransfer,
    peregonSchema,
    shippingSchema,
    warehouseSchema,
    autoRepairPlaceSchema,
    autoRepairSchema,
    specialTechniqueSchema,
    baseSchema,
    deliverySchema,
    passengerTrafficSchema,
    transportRentSchema,
    transportTransferSchema,
}
