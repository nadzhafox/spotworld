// import ol from 'openlayers'
import ol from 'openlayers/dist/ol-debug.js'

export default class Map {
    constructor(elem) {
        this.map = this.createMap(elem);
    }

    createMap(elemId) {
        //config map here
        return new ol.Map({
            view: new ol.View({
                center: [0,0],
                zoom: 1
            }),
            layers: [
                // new ol.layer.Tile({
                //     source: new ol.source.OSM()
                // }),
                new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFmb2VkIiwiYSI6ImNqMHA2MHk5ODAwMDgzMnFxamQyNmVha3IifQ.8r9fW0pPDrNW7iwBqkVhhg'
                        })
                }),
                new ol.layer.Vector({
                    source: new ol.source.Vector(),
                    name:'markers'
                })
            ],
            target: elemId,
        });
    }

    addMarker(coords, info) {
        var marker = this.createMarker(coords, info);

        var vectorLayer = this.getLayer("markers");

        var source = vectorLayer.getSource();

        source.addFeature(marker);
    }

    getLayer(name){
        var layers = this.map.getLayers().getArray();
        return layers.find(layer=>layer.getProperties().name === name)

    }

    createMarker(coords, data){
        var marker = new ol.Feature({
            geometry: new ol.geom.Point(this.coordsTransform(coords)),
            data: data
        });
        var markerStyle = new ol.style.Style({
            image: new ol.style.Icon(({
                src: 'img/icon.png',
                scale: 0.7
            }))
        });
        marker.setStyle(markerStyle);
        return marker;
    }

    setView(coords, zoom) {
        console.log(this.map);
        var view = this.map.getView();
        view.animate({
            center: this.coordsTransform(coords),
            zoom: zoom
        });
    }
    coordsTransform(coords){
        if ( coords[0]>180 ) return coords;
        return ol.proj.fromLonLat(coords);
    }

    on(name,cb){
        this.map.on(name, cb.bind(this, this.map));
    }

}