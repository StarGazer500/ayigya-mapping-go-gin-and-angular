import { Component, OnInit, AfterViewInit,input,SimpleChanges, signal } from '@angular/core';
import {SimplesearchService} from '../../service/simplesearch.service'
import * as L from 'leaflet';

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss']
})
export class MapviewComponent implements OnInit, AfterViewInit {
  displaymapdata = input<any>("");
  geoJsonLayerGroup:any

  simplesearchdata:any 

  isVisible = signal<boolean>(false)
  totalQueries = signal<string>('tested')

  queryValue:string = ''

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

  constructor(private simplesearchservice:SimplesearchService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
    // this.centerMap();
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
      this.totalQueries.set(`${currentValue.length}`)
      this.isVisible.set(true)

    
  }
 }

 private addDataToMap(data: any) {
  if (this.geoJsonLayerGroup) {
    this.map.removeLayer(this.geoJsonLayerGroup);
    // layerControl.removeLayer(geoJsonLayerGroup);
}
  this.geoJsonLayerGroup = L.featureGroup();

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
        weight: 1,
        color: 'yellow',
        fillOpacity: 0.1
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

     
      }
    });
    this.geoJsonLayerGroup.addLayer(geoJsonLayer);
    
    // this.map.addLayer(geoJsonLayer);
  }  
  this.geoJsonLayerGroup.addTo(this.map);
    if (this.geoJsonLayerGroup.getLayers().length > 0) {
      this.map.fitBounds(this.geoJsonLayerGroup.getBounds(), {
          padding: [50, 50],
          maxZoom: 20
      });
  }
 }

  onKey(event: KeyboardEvent) {
    this.queryValue = (event.target as HTMLInputElement).value;
    // console.log(inputValue);  // Log the input value to the console (optional)
  }

onEnterKey(event: KeyboardEvent): void {
  if (event.key === 'Enter') {  // Check if the pressed key is Enter
    this.querySimpleSearch(this.queryValue)
    this.addDataToMap(this.simplesearchdata)
    this.totalQueries.set(`${this.simplesearchdata.length}`)
    this.isVisible.set(true)
    // console.log('Enter key pressed!',this.queryValue);
    // console.log('Input Value:', this.inputValue);  // Log the value of the input
    // You can trigger other logic here, such as submitting the form
  }
}

private querySimpleSearch(seachvalue:string) {
  this.simplesearchservice.querySimpleSearchValue(seachvalue).subscribe({
    next: (data) => {
      this.simplesearchdata = data.data

      // console.log('Feature layers:', );
      // this.data1 = data
      // Process data here
      // this.selectorattributes.set(Object.values(data.data))
      // console.log("attributes signal data",this.selectorattributes())

    },
    error: (error) => {
      console.error('Error fetching layers', error);
    }
  });
}
}
