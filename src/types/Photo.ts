export interface Photo {
  id: string;
  description: string;
  urls: {
    small: string;
    full: string;
  };
  user: {
    name: string;
    profile_image: {
      small: string;
    };
  };
}