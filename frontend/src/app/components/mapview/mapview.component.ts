import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss']
})
export class MapviewComponent implements OnInit, AfterViewInit {

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
}
