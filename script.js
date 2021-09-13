mapboxgl.accessToken = 'pk.eyJ1Ijoic3RhcnRzZXZkZXYiLCJhIjoiY2t0NGJzYTFvMHdrbzJucjFnN3I3czZpZSJ9.90wyuWzjUJGVVKDdS5FqdQ';

const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/startsevdev/cktaa3f6s6p0v18qwp5yn8ejz',
center: [30.308653, 59.939737],
zoom: 12
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
    // console.log("coordinates="+coordinates);
    // console.log("moveX="+moveX);
    // console.log("moveY="+moveY);
    // console.log(shopProp);
    var windowWidth = (window.innerWidth >= 820) ? (0.015) : 0.001;
// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.


var markerCheck = document.getElementById("selected-marker");
if (markerCheck) {
    markerCheck.remove();
};

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    const markerHeight = 18;
    const markerRadius = 18;
    const linearOffset = 18;
    const popupOffsets = {
        'top': [18, 18],
        'top-left': [18, 18],
        'top-right': [18, 18],
        'bottom': [18, -markerHeight],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };

function checkImages (id) {
    var src = "img/"+id+".jpg";
    src.onerror = function() {
        src = "img/"+id+".png";
    };
    return src;
}

    new mapboxgl.Popup({offset: popupOffsets, className: 'info-div'})
    .setLngLat(coordinates)
    .setHTML(
        `<div class="info">

            <div class="img"><img class="background"src=${checkImages(id)}></img></div>

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
    .setLngLat([moveX, moveY])
    .addTo(map);    
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

