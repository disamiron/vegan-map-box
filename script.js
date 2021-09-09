mapboxgl.accessToken = 'pk.eyJ1Ijoic3RhcnRzZXZkZXYiLCJhIjoiY2t0NGJzYTFvMHdrbzJucjFnN3I3czZpZSJ9.90wyuWzjUJGVVKDdS5FqdQ';

const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/startsevdev/cktaa3f6s6p0v18qwp5yn8ejz',
center: [30.398653, 59.940737],
zoom: 9.75
});

map.on('click', () => {
    var markerCheck = document.getElementById("selected-marker");
    if (markerCheck) {
        markerCheck.remove();
    }
});

map.on('click', 'places', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    var moveX = e.features[0].geometry.coordinates[0];
    var moveY = e.features[0].geometry.coordinates[1];
    var shopProp = e.features[0].properties;
    var name = shopProp.name;
    var link = shopProp.link;
    var status = shopProp.status;
    var address = shopProp.address;
    var positions = shopProp.positions;
    var id = shopProp.id;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    const markerHeight = 10;
    const markerRadius = 10;
    const linearOffset = 10;
    const popupOffsets = {
        'top': [10, 10],
        'top-left': [10, 10],
        'top-right': [10, 10],
        'bottom': [10, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };

    new mapboxgl.Popup({offset: popupOffsets, className: 'info-div'})
    .setLngLat(coordinates)
    .setHTML(
        `<div class="info">

            <div class="img"><img class="background"src="img/${id}.jpg"></img></div>

            <div class="card">
            <a class="link" href=${link}><img class ="instagram" src="icon/instagram.png"></img></a>
                <div class="status">${status}</div>
                <div class="name">${name}</div>
                <div class="address">${address}</div>
                <div class="positions">${positions}</div>
            </div>

        </div>`
    
    )
    .addTo(map);
//Выбранный маркер
    var marker = document.createElement('div');
    marker.id = 'selected-marker';
    new mapboxgl.Marker(marker)
    .setLngLat(coordinates)
    .addTo(map);
//Анимация "полета" к маркеру
    map.flyTo({center: [moveX, moveY], zoom: 12});
});

// Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'places', () => {
    map.getCanvas().style.cursor = 'pointer';
    });

// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'places', () => {
    map.getCanvas().style.cursor = '';
    });

// Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true
        },
// When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
// Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
        })
);