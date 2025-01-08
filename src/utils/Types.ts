export interface Address {
  address1: string | null;
  address2: string | null;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface Animal {
  id: number;
  organization_id: string;
  url: string;
  type: string;
  species: string;
  breeds: Breeds;
  colors: Colors;
  age: string;
  gender: string;
  size: string;
  coat: string;
  attributes: Attributes;
  environment: Environment;
  tags: string[];
  name: string;
  description: string;
  organization_animal_id: string | null;
  photos: Photo[];
  primary_photo_cropped: PrimaryPhotoCropped;
  videos: string[];
  status: string;
  status_changed_at: string;
  published_at: string;
  distance: number | null;
  contact: Contact;
  _links: Links;
}

export interface AnimalCard {
  id: number;
  name: string;
  description: string;
}

export interface Attributes {
  spayed_neutered: boolean;
  house_trained: boolean;
  declawed: boolean | null;
  special_needs: boolean;
  shots_current: boolean;
}

export interface Breeds {
  primary: string;
  secondary?: string;
  mixed: boolean;
  unknown: boolean;
}

export interface Colors {
  primary: string;
  secondary: string;
  tertiary?: string;
}

export interface Contact {
  email: string;
  phone: string | null;
  address: Address;
}

export interface Environment {
  children: boolean;
  dogs: boolean;
  cats: boolean | null;
}

export interface FavoritesProps {
  favoritePets: Pet[];
}

export interface FormProps {
  getAnimals: () => Promise<void>;
}

export interface GetAllAnimalsApiResponse {
  animals: Animal[];
  pagination: Pagination; 
}

export interface Links {
  self: { href: string };
  type: { href: string };
  organization: { href: string };
}

export interface Pagination {
  count: number;     // The number of animals returned in this response
  total_count: number; // The total number of animals available (across all pages)
  offset: number;    // The offset, or starting point for the next page
  limit: number;     // The number of items per page (limit)
}

export interface Pet {
  id: number;
  name: string;
}

export interface Photo {
  small: string;
  medium: string;
  large: string;
  full: string;
}

export interface PrimaryPhotoCropped {
  small: string;
  medium: string;
  large: string;
  full: string;
}

export interface ResultsProps {
  finalResults: Animal[];
}
