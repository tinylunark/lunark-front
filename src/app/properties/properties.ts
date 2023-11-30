import Property from "../shared/models/property.model";
import locations from "./locations";
import {environment} from "../../env/environment";

const imagesDir = environment.assetsDir + '/images/';

const properties: Property[] = [
  {
    id: 1,
    name: 'Modern Urban Oasis',
    location: locations.at(2)!,
    description: '',
    photoUrls: [
      imagesDir + 'stock1.jpg'
    ],
    pricePerNight: 100,
    averageRating: 4.5
  },
  {
    id: 2,
    name: 'Cozy Bohemian Hideaway',
    location: locations.at(1)!,
    description: '',
    photoUrls: [
      imagesDir + 'stock2.jpg'
    ],
    pricePerNight: 150,
    averageRating: 5.0
  },
  {
    id: 3,
    name: 'Seaside Serenity with Panoramic Views',
    location: locations.at(0)!,
    description: '',
    photoUrls: [
      imagesDir + 'stock3.webp'
    ],
    pricePerNight: 170,
    averageRating: 4.5
  },
  {
    id: 4,
    name: 'Luxury Loft in the Sky',
    location: locations.at(2)!,
    description: '',
    photoUrls: [
      imagesDir + 'stock4.jpg'
    ],
    pricePerNight: 100,
    averageRating: 4.5
  },
  {
    id: 5,
    name: 'Historic Elegance in the Heart of Old Town',
    location: locations.at(1)!,
    description: '',
    photoUrls: [
      imagesDir + 'stock5.jpg'
    ],
    pricePerNight: 150,
    averageRating: 5.0
  },
  {
    id: 6,
    name: 'Family-Friendly Haven with Park Views',
    location: locations.at(0)!,
    description: '',
    photoUrls: [
      imagesDir + 'stock6.webp'
    ],
    pricePerNight: 170,
    averageRating: 4.5
  },
];

export default properties;
