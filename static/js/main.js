function initMap() {
    let heatmapData = [];
    let vancouver = {
        lat: 49.25,
        lng: -123.10
    };
    let map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 12,
            center: vancouver,
            disableDefaultUI: true,
            zoomControl: true
        });
    initMarkers(map);
    initHeatMapLayer(heatmapData, map);
    // map.addListener('click', function (mapsMouseEvent) {
    //     let cardContent = document.getElementById('id11');
    //     cardContent.innerHTML = mapsMouseEvent.latLng.toString();
    //     console.log(mapsMouseEvent.latLng.toString());
    // })
}

function initMarkers(mapObject) {
    let infoPanel = document.getElementById('info-panel');
    let cardTitle = document.getElementById('card-title-left');
    let cardContent = document.getElementById('card-content-left');
    getData('https://test01-3aa00.firebaseio.com/data.json')
        .then(markers => {
            for (let i of markers) {
                let map = mapObject;
                let marker = new google.maps.Marker({
                    label: i.label,
                    position: i.coord,
                    map: map
                });
                marker.addListener('click', function () {
                    // Event of clicking a marker
                    // Get info later
                    infoPanel.style.display = 'block';
                    cardTitle.innerText = i.label;
                    cardContent.innerHTML = `<p style="font-weight: bold;">Live Traffic: ${i.traffic}</p><p>Address: ${i.addr}</p>`;
                });
            }
        });

}

function initHeatMapLayer(heatmapData, mapObject) {
    let map = mapObject;
    getData('https://test01-3aa00.firebaseio.com/heatmap.json')
        .then(coords => {
            for (let i of coords) {
                heatmapData.push(new google.maps.LatLng(i.lat, i.lng))
            }
            let heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
            });
            heatmap.setMap(map);
        })
}

async function getData(url) {
    let response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let data = await response.json();
    return data
}