type AuthorDetails = {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number;
};

export type Review = {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string; // ISO 8601 string date
  id: string;
  updated_at: string; // ISO 8601 string date
  url: string;
};

export type ReviewAPIResponse = {
  id: number;
  page: number;
  results: Array<Review>;
  total_pages: number;
  total_results: number;
};
