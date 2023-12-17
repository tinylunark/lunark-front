import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from './location.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit {
  private map: any;
  private marker: L.Marker | null = null;
  searchControl = new FormControl();
  private readonly addressChangeDelay = 1000;
  private addressChanged: Subject<string> = new Subject<string>();

  constructor(private mapService: LocationService, private sharedService: SharedService) {}

  private initMap(): void {
    const container = L.DomUtil.get('map');
    if (container != null) {
      this.map = L.map('map', {
        center: [45.2396, 19.8227],
        zoom: 16,
      });
    }

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

  search(address: string): void {
    this.mapService.search(address).subscribe({
      next: (result) => {
        console.log(result);
        if (result.length === 0) {
          this.sharedService.openSnack('Address not found');
          return;
        }

        if (!this.marker) {
          this.marker = L.marker([result[0].lat, result[0].lon])
            .addTo(this.map)
            .openPopup();
        } else {
          this.marker.setLatLng([result[0].lat, result[0].lon]);
        }
        this.map.panTo([result[0].lat, result[0].lon]);
      },
      error: () => {},
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });
    this.subsrcibeAndDebounceAddressChanged();
  }

  subsrcibeAndDebounceAddressChanged() {
    this.addressChanged
      .asObservable()
      .pipe(debounceTime(this.addressChangeDelay), distinctUntilChanged())
      .subscribe((address) => this.search(address));
  }

  onAddressChanged(event: Event): void {
    console.log('address changed');
    const addressText = (event.target as HTMLInputElement).value;
    this.addressChanged.next(addressText);
  }
}
