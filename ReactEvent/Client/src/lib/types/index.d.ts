declare type TActivity = {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  isCancelled: boolean;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
};

declare type TUser = {
  id: string;
  email: string;
  displayName: string;
  imageUrl?: string;
};

declare type TLocationIQSuggestion = {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: TLocationIQAddress;
};

declare type TLocationIQAddress = {
  name: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  city?: string;
  town?: string;
  village?: string;
  county: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
  house_number?: string;
};
