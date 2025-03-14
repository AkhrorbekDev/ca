const mapApiKey = 'e2ccea34-8a53-46ce-8fba-d8bd74a44d3b'
export default async function getGeoObject(options: {
    cord: Array<number>,
    address: string
}) {
    const httpApiUrl = 'https://geocode-maps.yandex.ru/1.x';
    const {cord, address} = options
    const query = {
        format: 'json'
    }
    if (cord) {
        query.geocode = cord
    } else {
        query.geocode = address
    }
    const queryString = new URLSearchParams({
        apikey: mapApiKey,
        ...query
    }).toString();
    const fullUrl = `${httpApiUrl}?${queryString}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
        return Promise.reject({
            error: new Error(`GeoCode HTTP error! Status: ${response.status}`)
        })
    }

    const data = await response.json();

    const foundGeoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;
    if (!foundGeoObject) {
        return Promise.reject({
            error: new Error('GeoObject not found')
        })
    }

    return Promise.resolve({
        data: foundGeoObject
    });
}

