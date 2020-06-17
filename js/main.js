console.log('Main!');

import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { geoCodeService } from './services/geocode.service.js'


locService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    if (window.location.search.length !== 0) {
        // console.log(window.location.search);
        var paramsString = window.location.search;
        var searchParams = new URLSearchParams(paramsString);
        console.log('searchParams:', searchParams);

        // const url = `https://kobtze.github.io/travelT/?lat=${}&lng=${}`
        // var paramsString = `?lat=3.14&lng=1.63`;
        // var searchParams = new URLSearchParams(window.location.search);

        // //Iterate the search parameters.
        // for (let p of searchParams) {
        //     console.log(p);
        // }

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


            // console.log(window.location.);
        })
        .catch(err => console.log('ERROR:', err));


})
