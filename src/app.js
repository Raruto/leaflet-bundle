    // import './app.css';

    import 'leaflet-transparency';

    import 'leaflet-ui';
    import 'leaflet-hash';
    import 'leaflet-kmz';
    import 'leaflet-transparency';

    var map = new L.Map('map', {
      center: [41.4583, 12.7059],
      zoom: 5,
      gestureHandling: true,
      mapTypeId: 'topo',
      mapTypeIds: ['osm', 'terrain', 'satellite', 'topo'],
    });

    map.once('idle', function() {

      var hash = new L.Hash(map);

      var layersOpacity = new L.Control.OpacitySlider(null, {
        sliderImageUrl: "https://unpkg.com/leaflet-transparency@0.0.3/images/opacity-slider2.png",
        backgroundColor: "rgba(229, 227, 223, 0.9)",
        position: 'topleft',
      }).addTo(map);

      // Instantiate KMZ parser (async)
      var kmzParser = new L.KMZParser({
        onKMZLoaded: onKMZLoaded,
        name: "ON / OFF"
      });

      kmzParser.load('regions.kmz');

    });


    function onKMZLoaded(layer, name) {

      layer.addTo(map);
      overlayControl(this.layer, this.name);
      opacitySlider(this.layer, this.gridlayer);
      keepFront(this.layer);

      function keepFront(layer) {
        layer.bringToFront();
        map.on('baselayerchange', function(e) {
          if (layer.bringToFront) layer.bringToFront();
        });
      }

      function overlayControl(layer, name) {
        var layersControl = new L.Control.Layers(null, null, {
          collapsed: false,
          position: 'topright'
        });
        layersControl.addOverlay(layer, name);
        layersControl.addTo(map);
      }

      function opacitySlider(layer, gridlayer) {
        var layersOpacity = new L.Control.OpacitySlider(gridlayer, {
          sliderImageUrl: "https://unpkg.com/leaflet-transparency@0.0.3/images/opacity-slider2.png",
          backgroundColor: "rgba(229, 227, 223, 0.9)",
          position: 'topright',
        });
        layersOpacity.addFeatureLayer(layer);
        layersOpacity.addTo(map);
      }
    }
