const lugar = require('./lugar/lugar.js');
const clima = require('./clima/clima.js');
const { CLIENT_RENEG_LIMIT } = require('tls');
const { get } = require('lodash');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true
    }
}).argv;
//argv.direccion)
lugar.getLugarLatLng(argv.direccion)
    .then(console.log);

// clima.getClima(40.750000, -74.000000)
//     .then(console.log)
//     .catch(err => {
//         console.log(err);
//     })

const getInfo = async(direccion) => {

    try {
        const coords = await lugar.getLugarLatLng(direccion);
        const temp = await clima.getClima(coords.lat, coords.lng);

        const mensaje = `El clima de ${direccion} es de ${temp}`;
        return mensaje;
    } catch (e) {
        return `No se pudo determinar el clima de ${direccion} ` + e;
    }

}

getInfo(argv.direccion)
    .then(console.log)