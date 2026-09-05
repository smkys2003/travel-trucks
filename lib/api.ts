import axios from "axios";
import {
  BookingResponse,
  BookingValues,
  Camper,
  CamperFilters,
  CampersResponse,
  CamperReview,
} from "../types/camper";

const campersApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function fetchCampers(
  page: number,
  filters: CamperFilters,
): Promise<CampersResponse> {
  const response = await campersApi.get<CampersResponse>("/campers", {
    params: {
      page,
      perPage: 4,
      location: filters.location || undefined,
      form: filters.form || undefined,
      transmission: filters.transmission || undefined,
      engine: filters.engine || undefined,
    },
  });

  return response.data;
}

export async function fetchCamperById(camperId: string): Promise<Camper> {
  const response = await campersApi.get<Camper>(`/campers/${camperId}`);

  return response.data;
}

export async function fetchCamperReviews(
  camperId: string,
): Promise<CamperReview[]> {
  const response = await campersApi.get<CamperReview[]>(
    `/campers/${camperId}/reviews`,
  );

  return response.data;
}

export async function createBookingRequest(
  camperId: string,
  values: BookingValues,
): Promise<BookingResponse> {
  const response = await campersApi.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    values,
  );

  return response.data;
}
