export interface CamperImage {
  thumb: string;
  original: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  totalReviews: number;
  coverImage?: string;
  gallery?: CamperImage[];
}

export interface CampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}

export interface CamperFilters {
  location: string;
  form: string;
  transmission: string;
  engine: string;
}

export interface CamperReview {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface BookingValues {
  name: string;
  email: string;
}

export interface BookingResponse {
  message: string;
}
