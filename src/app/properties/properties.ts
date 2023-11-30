import Property from "../shared/models/property.model";
import locations from "./locations";
import {environment} from "../../env/environment";

const imagesDir = environment.assetsDir + '/images/';

const properties: Property[] = [
  {
    id: 1,
    name: 'Italy old Castle',
    location: locations.at(0)!,
    description: '',
    photoUrls: [
      imagesDir + 'stock1.jpg'
    ],
    pricePerNight: 400,
    averageRating: 4.5
  },
  {
    id: 2,
    name: 'Summer Luxury Apartment',
    location: locations.at(1)!,
    description: '',
    photoUrls: [
      imagesDir + 'stock2.jpeg'
    ],
    pricePerNight: 600,
    averageRating: 5.0
  },
  {
    id: 3,
    name: 'Minimalist Premium',
    location: locations.at(2)!,
    description: '',
    photoUrls: [
      imagesDir + 'stock3.jpg'
    ],
    pricePerNight: 200,
    averageRating: 4.5
  },
  {
    id: 4,
    name: 'Beautiful White House',
    location: locations.at(5)!,
    description: '',
    photoUrls: [
      imagesDir + 'stock4.jpg'
    ],
    pricePerNight: 500,
    averageRating: 4.5
  },
  {
    id: 5,
    name: 'Mexico Big',
    location: locations.at(3)!,
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
