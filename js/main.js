console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { geoCodeService } from './services/geocode.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    if (window.location.search.length !== 0) {
        var paramsString = window.location.search;
        var searchParams = new URLSearchParams(paramsString);
        var latlng = []
        for (let p of searchParams) {
            latlng.push(...p)
        }
        var latlngObj = { lat: +latlng[1], lng: +latlng[3] }
        mapService.initMap(latlngObj.lat, latlngObj.lng)
            .then(() => {
                mapService.addMarker(latlngObj);
                geoCodeService.getGeoCode(latlngObj.lat, latlngObj.lng)
                    .then(res => {
                        document.querySelector('.user-loc').innerText = res.results[4].formatted_address
                    })
            })
            .catch(console.log('INIT MAP ERROR'));

    } else {
        locService.getPosition()
            .then(pos => {
                mapService.initMap(pos.coords.latitude, pos.coords.longitude)
                    .then(() => {
                        mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                        geoCodeService.getGeoCode(pos.coords.latitude, pos.coords.longitude)
                            .then(res => {
                                document.querySelector('.user-loc').innerText = res.results[4].formatted_address
                            })
                    })
                    .catch(console.log('INIT MAP ERROR'));
            })
            .catch(err => {
                mapService.initMap(35.6895, 139.6917)
                console.log('err!!!', err);
            })
    }
}
document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    locService.getPosition()
        .then(pos => {
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
                .then(() => {
                    mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                })
        })
        .catch(err => console.log(err, 'Could not retrieve location!'));
})

document.querySelector('.share-loc').addEventListener('click', ev => {
    locService.getPosition()
        .then(pos => {
            console.log('got position', pos.coords.latitude, pos.coords.longitude);
            var urlToClip = `https://kobtze.github.io/travelT/?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`;
            console.log(urlToClip);
            var promise = navigator.clipboard.writeText(urlToClip)
                .then(res => alert('Location copied to clipboard successfully!'))

        })
        .catch(err => console.log('ERROR:', err));


})
