mapboxgl.accessToken = 'pk.eyJ1Ijoic3RhcnRzZXZkZXYiLCJhIjoiY2t0NGJzYTFvMHdrbzJucjFnN3I3czZpZSJ9.90wyuWzjUJGVVKDdS5FqdQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/startsevdev/cktjy3gu04gvl18wb2slmtse1',
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


    var markerCheck = document.getElementById("selected-marker");
        if (markerCheck) {
            markerCheck.remove();
    };

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }


    const popupOffsets = {
        'top': [20, 20],
        'bottom': [20, -20],
    };

    //фунция расположения popup
    function anchorCheck () {
        var clientClick = e.originalEvent.clientY;
        var clientWin = ((document.documentElement.clientHeight-72)/2);

        if (clientClick > (clientWin)) {
            return "bottom";
        } else {
            return "top";
        }
    }

    function checkStatus (status) {
        switch (status) {
            case "100% VEGAN":
                positions = "";
                return "#1B7340"
            case "ТОЛЬКО КУХНЯ":
                positions = "";
                return "#1A8B9D"
            case "БОЛЬШЕ ТРЁХ БЛЮД":
                positions = "";
                return "#2D73DB"
            case "ДО ТРЁХ БЛЮД":
                return "rgba(16, 16, 16, 0.5)"
            default:
                return "rgba(16, 16, 16, 0.5)"
        }
    }

    var popup = new mapboxgl.Popup({anchor: anchorCheck(), offset: popupOffsets, className: 'info-div'})
    .setLngLat(coordinates)
    .setHTML(

        `<div class="info">

            <div class="img">
                <img class="background"src=${'img/'+id+'.jpg'}></img>
            </div>

            <div class="card">
                <a class="link" href=${link}><img class ="instagram" src="icon/instagram.png"></img></a>
                <div class="status" style="color:${checkStatus(status)}">${status}</div>
                <div class="name"><a href="geo:${moveY},${moveX}">${name}</a></div>

                <div class="address">${address}</div>
                <div class="positions">${positions}</div>
            </div>

        </div>`
    
    )
    .addTo(map);
                // <div class="name"><a href=${link}>${name}</a></div>
    var marker = document.createElement('div');
    marker.id = 'selected-marker';
    new mapboxgl.Marker(marker)
        .setLngLat([moveX, moveY])
        .addTo(map); 

    $(function(){
        if ((window.innerWidth <= 820)) {
            updateContainer();
        };  
    });
    var currentZoom = map.getZoom();
    $(function(){
        map.on('zoom', () => {
            if (map.getZoom() > currentZoom + 10 || map.getZoom() < currentZoom - 3)
            popup.remove();
        })
    })
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

//функция listener size window
$(document).ready(function () {
    updateContainer();

    $(window).resize(function() {
        updateContainer();
    });
});

//функция позиционирования мобильного popup
function updateContainer(){  
    var mobilePopUp = $(".mapboxgl-popup");
    if (window.innerWidth <= 820) {
        mobilePopUp.attr('style', 'top: '+($(window).height() - ((mobilePopUp.height())) - 8 + ((mobilePopUp.height()/2)-60))+'px !important');
    } else if (window.innerWidth >= 820) {
        mobilePopUp.attr('style', 'top: 0 !important');
    }
};


// $(document).bind('mousewheel',function() {
//     console.log(map.getZoom());
// });