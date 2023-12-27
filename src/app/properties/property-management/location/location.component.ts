import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import { LocationService } from './location.service';
import { FormControl, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { SharedService } from '../../../shared/shared.service';

const unknownStreet = 'Unnamed street';
const unknownNumber = 'N/A';
const unknownCity = 'Somewhere';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit {
  private map: any;
  private marker: L.Marker | null = null;
  searchControl = new FormControl('', Validators.required);
  private readonly addressChangeDelay = 1000;
  private addressChanged: Subject<string> = new Subject<string>();

  @Output()
  change: EventEmitter<string> = new EventEmitter<string>()

  @Input()
  latitude: number = 0;

  @Output()
  latitudeChange: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  longitude: number = 0;

  @Output()
  longitudeChange: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  address: string = "";

  @Output()
  addressChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  city: string = "";

  @Output()
  cityChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  country: string = "";

  @Output()
  countryChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private mapService: LocationService, private sharedService: SharedService) {}

  private initMap(): void {
    const container = L.DomUtil.get('map');
    if (container != null) {
      this.map = L.map('map', {
        ...(this.longitude && this.latitude ? {center: [this.latitude, this.longitude], } : {center: [45.2396, 19.8227]}),
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

    if (this.latitude && this.longitude) {
      setTimeout(() => this.reverseSearch(this.latitude, this.longitude), 100);
    }
  }

  private emitLatitudeLongitude(lat: number, lng: number) {
    this.latitude = lat;
    this.longitude = lng;
    this.latitudeChange.emit(this.latitude);
    this.longitudeChange.emit(this.longitude);
    this.change.emit();
  }

  private emitFullAddress(address: string, city: string, country: string) {
    this.address = address;
    this.city = city || unknownCity;
    this.country = country;
    this.addressChange.emit(this.address);
    this.cityChange.emit(this.city);
    this.countryChange.emit(this.country);
    this.change.emit();
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;

      this.reverseSearch(lat, lng);
    });
  }

  reverseSearch(lat: number, lng: number): void {
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
        this.searchControl.setValue(res.display_name);
        this.emitFullAddress(`${res.address.road || unknownStreet} ${res.address.house_number || unknownNumber}`, res.address.city || res.address.town || res.address.city_district || unknownCity, res.address.country);
      });

      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );

      if (!this.marker) {
        this.marker = L.marker([lat, lng]).addTo(this.map);
      } else {
        this.marker.setLatLng([lat, lng]);
      }
      this.emitLatitudeLongitude(lat, lng);
    }

  search(address: string): void {
    this.mapService.search(address).subscribe({
      next: (result) => {
        console.log(result);
        if (result.length === 0) {
          this.sharedService.openSnack('Address not found');
          return;
        }

        const lat = result[0].lat;
        const lng = result[0].lon

        if (!this.marker) {
          this.marker = L.marker([lat, lng])
            .addTo(this.map)
            .openPopup();
        } else {
          this.marker.setLatLng([lat, lng]);
        }
        this.map.panTo([lat, lng]);

        this.emitFullAddress(`${result[0].address.road || unknownStreet} ${result[0].address.house_number || unknownNumber}`, result[0].address.city || result[0].address.town || result[0].address.city_district || unknownCity, result[0].address.country);
        this.emitLatitudeLongitude(lat, lng);
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
    const addressText = (event.target as HTMLInputElement).value;
    this.addressChanged.next(addressText);
  }

}
