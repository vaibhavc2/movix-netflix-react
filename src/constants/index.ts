export const API_BASE_URL = "https://api.themoviedb.org/3";

export const GITHUB_PROFILE = "https://github.com/vaibhavc2";

export const TWITTER_PROFILE = "https://twitter.com/VaibhavChopra19";

export const LINKEDIN_PROFILE = "https://www.linkedin.com/in/vc72/";

export const INITIAL_SEARCH_DATA = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const SORT_BY_DATA = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

export const BASE_TITLE = "Movix - Movies & Shows";
