'use strict';

export const geoCodeService = {
    getGeoCode: getGeoCode
}

function getGeoCode() {
    return new Promise((resolve, reject) => {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCZ1PFm02EfRxzWO8oe7LKgbRz1uEXmzIE`)
    })
}

// export const locService = {
//     getLocs: getLocs,
//     getPosition: getPosition
// }