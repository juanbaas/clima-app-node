const axios = require('axios');


const getLugarLatLng = async(dir) => {

    const encodeUrl = encodeURI(dir);

    const instance = axios.create({
        // baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeUrl}`,
        // headers: { 'x-rapidapi-key': 'cc3a635e60mshb764ed218080923p196ed0jsn0905f71c4159' }
        baseURL: "http://api.weatherapi.com/v1/current.json",
        params: {
            key: "1afa2d6a6c3f4ccdbc7174731210701",
            q: encodeUrl,
        },
    });

    const resp = await instance.get();

    if (resp.data.error) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    const data = resp.data.current;
    const direc = resp.data.location;
    const direccion = `${ direc.name }, ${ direc.region } - ${ direc.country }`;
    const lat = direc.lat;
    const lng = data.temp_c;

    // const respuesta = {
    //     lat: direccion.lat,
    //     lng: direccion.lon,
    //     direccion: `${ direccion.name }, ${ direccion.region } - ${ direccion.country }`,
    //     weather: data.temp_c,
    // }    

    return {
        direccion,
        lat,
        lng
    }
}

module.exports = {
    getLugarLatLng
}