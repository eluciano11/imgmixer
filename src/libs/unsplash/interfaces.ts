interface UnsplashProfileImage {
  small: string;
  medium: string;
  large: string;
}

interface UnsplashUser {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  total_likes: number;
  total_photos: number;
  username: string;
  profile_image: UnsplashProfileImage;
  instagram_username?: string;
  twitter_username?: string;
}

interface UnsplashLinks {
  download: string;
  download_location: string;
  html: string;
  self: string;
}

interface UnsplashUrls {
  small: string;
  raw: string;
  full: string;
  regular: string;
  thumb: string;
}

export interface UnsplashResponse {
  id: string;
  alt_description: string;
  user: UnsplashUser;
  links: UnsplashLinks;
  urls: UnsplashUrls;
}
