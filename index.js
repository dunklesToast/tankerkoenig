const axios = require('axios').create({
    baseURL: `https://creativecommons.tankerkoenig.de/json/`,
    maxRedirects: 0,
    validateStatus: function (status) {
        return status >= 200 && status < 303;
    },
});

let key;

function init(apikey) {
    key = apikey;
}

/**
 * Sucht Tankstellen in der Nähe der angegebenen Koordinaten
 * @param {number} latitude - geographische Breite des Standortes
 * @param {number} longitude - geographische Länge
 * @param {number} radius - Suchradius in km, maximal 25
 * @param {String} type - Spritsorte
 * @param {String} sort - Sortierung
 * @returns {Promise<Object>}
 */
async function listInRadius(latitude, longitude, radius, type, sort) {
    const resp = await axios({
        url: 'list.php',
        params: {
            lat: latitude,
            lng: longitude,
            rad: radius,
            type: type,
            sort: sort,
            apikey: key
        }
    });
    return resp.data;
}

/**
 * Preisabfrage
 * @param {Object} stationIDs - IDs der Tankstellen als Objekt
 * @returns {Promise<Object>}
 */
async function getPriceByStationIDs(stationIDs) {
    stationIDs = stationIDs.join();
    const resp = await axios({
        url: 'prices.php',
        params: {
            ids: stationIDs,
            apikey: key
        }
    });
    return resp.data;
}

/**
 *
 * @param stationID - ID der Tankstelle
 * @returns {Promise<Object>}
 */
async function getDetailByStationID(stationID) {
    const resp = await axios({
        url: 'detail.php',
        params: {
            ids: stationID,
            apikey: key
        }
    });
    return resp.data;
}

/**
 *
 * @param {String} stationID - ID der Tankstelle
 * @param {String} type - Fehlertyp
 * @param {*} correction - korrigierter Wert
 * @param {?number} ts - Unix-Sekunden, OPTIONAL
 * @returns {Promise<*>}
 */
async function complain(stationID, type, correction, ts) {
    const resp = await axios({
        method: "POST",
        url: 'complaint.php',
        params: {
            ids: stationID,
            type: type,
            correction: correction,
            apikey: key
        }
    });
    return resp.data;
}

module.exports = init;
module.exports.listInRadius = listInRadius;
module.exports.getPricesByStationIDs = getPriceByStationIDs;
module.exports.getDetailByStationID = getDetailByStationID;
module.exports.complain = complain;
