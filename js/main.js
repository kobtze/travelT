console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { geoCodeService } from './services/geocode.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    locService.getPosition()
        .then(pos => {
            mapService.initMap(pos.coords.latitude, pos.coords.longitude)
                .then(() => {
                    mapService.addMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                    geoCodeService.getGeoCode(pos.coords.latitude,pos.coords.longitude)
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

