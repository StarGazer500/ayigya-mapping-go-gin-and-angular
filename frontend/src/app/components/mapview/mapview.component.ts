import { Component, OnInit, AfterViewInit,input,SimpleChanges } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss']
})
export class MapviewComponent implements OnInit, AfterViewInit {
  displaymapdata = input<any>("");
  

  private map!: L.Map;
  markers: L.Marker[] = [
    L.marker([6.19293, -1.3342]) // Dhaka, Bangladesh
  ];

  private osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  private satelliteLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    attribution: '&copy; Google'
  });

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }

  private initMap() {
    this.map = L.map('map', {
      center: [6.6874, -1.6232], // Starting location (Dhaka, Bangladesh)
      zoom: 17, // Starting zoom level
      layers: [this.satelliteLayer] // Set satellite layer as the default
    });

    // Add a layer control (allows toggling between base maps)
    L.control.layers({
      'OpenStreetMap': this.osmLayer,
      'Satellite': this.satelliteLayer
    }).addTo(this.map);
  }

  private centerMap() {
    // Create a boundary based on the markers
    // const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));

    // Fit the map into the boundary
    // this.map.fitBounds(bounds);
  }

  ngOnChanges(changes: SimpleChanges) {   
    if (changes['displaymapdata']) {
      const currentValue = changes['displaymapdata'].currentValue;
      console.log("Data received in the Map view",currentValue)
      this.addDataToMap(currentValue)

    
  }
 }

 private addDataToMap(data: any) {
  const geoJsonLayerGroup = L.featureGroup();

 function formatKey(key: string): string {
      return key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    interface FormatMap {
      [key: string]: (value: any) => string;
    }
    
    function formatValue(key: string, value: any): any {
      const formatMap: FormatMap = {
        'shape__len': (val) => `${val} meters`,
        'shape__are': (val) => `${val} sq meters`,
        'creationda': (val) => val ? new Date(val).toLocaleDateString() : val
      };
    
      const formatter = formatMap[key];
      return formatter ? formatter(value) : value;
    }

  for(var i =0;i<data.length;i++){
    const geoJsonLayer = L.geoJSON(data[i].geom, {
      style: () => ({
        // Default style
        weight: 2,
        color: '#000',
        fillOpacity: 0.7
      }),
      onEachFeature: (feature, layer) => {
        var popupContent = '<div>';
                
                // Get all keys from the current data object
                Object.keys(data[i]).forEach(key => {
                    // Skip 'geom' key and keys with null/undefined/empty values
                    if (key !== 'geom' && data[i][key] != null && data[i][key] !== '') {
                        popupContent += `
                            <strong>${formatKey(key)}:</strong> ${formatValue(key, data[i][key])}<br>
                        `;
                    }
                });
                
        popupContent += '</div>';
        layer.bindPopup(popupContent);

        layer.on({
          mouseover: (e) => {
            // Type assertion to GeoJSON layer
            const geoLayer = layer as L.GeoJSON;
            geoLayer.setStyle({
              weight: 5,
              color: '#00b3b3',
              fillOpacity: 0.9,
              fillColor: '#4CAF50'
            });
          },
          mouseout: () => {
            // Reset to default style
            const geoLayer = layer as L.GeoJSON;
            geoLayer.setStyle({
              weight: 2,
              color: '#000',
              fillOpacity: 0.7
            });
          }
        });
      }
    });
    geoJsonLayerGroup.addLayer(geoJsonLayer);
    
    // this.map.addLayer(geoJsonLayer);
  }  
  geoJsonLayerGroup.addTo(this.map);
    if (geoJsonLayerGroup.getLayers().length > 0) {
      this.map.fitBounds(geoJsonLayerGroup.getBounds(), {
          padding: [50, 50],
          maxZoom: 15
      });
  }
 }
}
