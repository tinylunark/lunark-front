import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from './location.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit, OnInit {
  private map: any;
  private marker: L.Marker | null = null;
  searchControl = new FormControl();

  constructor(private mapService: LocationService) {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.registerOnClick();
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;

      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
        this.searchControl.setValue(res.display_name);
      });

      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );

      if (!this.marker) {
        this.marker = L.marker([lat, lng]).addTo(this.map);
      } else {
        this.marker.setLatLng([lat, lng]);
      }
    });
  }

  search(): void {
    this.mapService.search(this.searchControl.value).subscribe({
      next: (result) => {
        console.log(result);

        if (!this.marker) {
          this.marker = L.marker([result[0].lat, result[0].lon])
            .addTo(this.map)
            .openPopup();
        } else {
          this.marker.setLatLng([result[0].lat, result[0].lon]);
        }
      },
      error: () => {},
    });
  }

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });
  }

  handleInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchControl.setValue(value);
    this.search();
  }
}
