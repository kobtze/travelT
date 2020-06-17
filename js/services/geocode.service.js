'use strict';

export const geoCodeService = {
    getGeoCode: getGeoCode
}

function getGeoCode(lat,lng) {

    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCZ1PFm02EfRxzWO8oe7LKgbRz1uEXmzIE`)
    .then(res => res.json())

}
