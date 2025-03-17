const mapApiKey = 'e2ccea34-8a53-46ce-8fba-d8bd74a44d3b'
const mapApiKeySuggest = '729d5bb1-edf2-47ab-8e9f-448083da65d2'
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

export async function getSuggest(options: {
    address: string
}) {
    const httpApiUrl = 'https://suggest-maps.yandex.ru/v1/suggest';
    const {cord, address} = options
    const query = {
        format: 'json'
    }
    if (cord) {
        query.geocode = cord
    } else {
        query.text = address
    }
    const queryString = new URLSearchParams({
        apikey: mapApiKeySuggest,
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
    console.log(data)
    const geoSuggests = data.results;
    if (!geoSuggests) {
        return Promise.reject({
            error: new Error('GeoSuggests not found')
        })
    }

    return Promise.resolve({
        data: geoSuggests
    });
}

