import "leaflet-pegman/leaflet-pegman.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import '@raruto/leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import css from './app.css';

import * as G from 'google-maps'; // async

import JSZip from 'jszip';
import toGeoJSON from '@tmcw/togeojson';
import geojsonvt from 'geojson-vt';

import 'leaflet-hash';
import 'leaflet.gridlayer.googlemutant';
import 'leaflet.locatecontrol';
import 'leaflet.fullscreen';
import 'leaflet-pegman';
import 'leaflet-transparency';
import '@raruto/leaflet-gesture-handling';
import 'leaflet-kmz';

window.JSZip = JSZip;
window.toGeoJSON = toGeoJSON;
window.geojsonvt = geojsonvt;

if (!window.google)
  G.load(function(google) {
    window.google = google;
    initMap();
  });
else
  initMap();

function initMap() {
  var map, hash;
  var layers = {};
  var controls = {};

  map = new L.Map('map', {
    center: [41.4583, 12.7059],
    zoom: 5,
    zoomControl: false,
    gestureHandling: true,
  });

  hash = new L.Hash(map);

  layers.osm = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  });

  layers.otm = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  });

  layers.google = {};

  layers.google.terrain = new L.GridLayer.GoogleMutant({
    type: 'terrain',
    maxZoom: 24,
  });

  layers.google.satellite = new L.GridLayer.GoogleMutant({
    type: 'satellite',
    maxZoom: 24,
  });

  var baseMaps = {
    "OSM": layers.osm,
    "Terrain": layers.google.terrain,
    "Satellite": layers.google.satellite,
    "Topo": layers.otm,
  };

  controls.baseLayers = new L.Control.Layers(baseMaps, null, {
    collapsed: false,
    position: 'topleft'
  });

  controls.layers = new L.Control.Layers(null, null, {
    collapsed: false,
    position: 'topright'
  });

  controls.zoom = new L.Control.Zoom({
    position: 'bottomright',
  });

  controls.pegman = new L.Control.Pegman({
    position: 'bottomright',
    theme: "leaflet-pegman-v3-small",
  });

  controls.locate = new L.Control.Locate({
    position: "bottomright"
  });

  controls.fullscreen = new L.Control.FullScreen({
    position: 'topright',
    title: 'Enter Fullscreen',
    titleCancel: 'Exit Fullscreen',
    forceSeparateButton: true,
  });

  controls.opacity = new L.Control.OpacitySlider(null, {
    sliderImageUrl: "https://unpkg.com/leaflet-transparency@0.0.3/images/opacity-slider2.png",
    backgroundColor: "rgba(229, 227, 223, 0.9)",
    position: 'topleft',
  });

  var leafletAttribution = map.attributionControl.options.prefix;
  map.on('baselayerchange', updateLeafletAttribution);
  map.on('baselayerchange', updateBaseLayers);

  for (var i in controls) {
    if (controls[i].addTo) {
      controls[i].addTo(map);
    }
  }

  layers.otm.addTo(map);

  // Instantiate KMZ parser (async)
  var kmzParser = new L.KMZParser({
    onKMZLoaded: function(layer, name) {
      controls.layers.addOverlay(layer, name);
      layer.addTo(map);
      layer.bringToFront();
      map.on('baselayerchange', function(e) {
        layer.bringToFront();
      });

      var layersOpacity = new L.Control.OpacitySlider(this.gridlayer, {
        sliderImageUrl: "https://unpkg.com/leaflet-transparency@0.0.3/images/opacity-slider2.png",
        backgroundColor: "rgba(229, 227, 223, 0.9)",
        position: 'topright',
      });
      layersOpacity.addFeatureLayer(this.layer);
      layersOpacity.addTo(map);
    },
    name: "ON / OFF"
  });
  kmzParser.load('regions.kmz');

  function updateBaseLayers(e) {
    L.DomUtil.addClass(controls.baseLayers._container, "inline-control-layers");

    var inputs = controls.baseLayers._layerControlInputs;
    for (var i = 0; i < inputs.length; i++) {
      var span = inputs[i].nextElementSibling;
      if (inputs[i].checked) {
        span.style.fontWeight = 700;
        span.style.color = "";
      } else {
        span.style.fontWeight = "";
        span.style.color = "#565656";
      }
    }
  }

  function updateLeafletAttribution(e) {
    map.attributionControl.setPrefix((e.name == "Satellite" || e.name == "Terrain") ? false : leafletAttribution);
  }

}
