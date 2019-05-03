import { UnsplashResponse } from "../../libs/unsplash/interfaces";

export enum networks {
  INSTAGRAM = "instagram",
  TWITTER = "twitter"
}

export interface ISocialNetwork {
  network: networks.INSTAGRAM | networks.TWITTER;
  username?: string;
}

export interface Stat {
  type: string;
  count: number;
}

function convertData<T>(
  data: { [key: string]: string | number },
  formatter: (arg: string) => T
): Array<T> {
  const filtered: Array<T> = [];

  Object.keys(data).forEach(current => {
    if (data[current]) {
      const formattedData: T = formatter(current);

      filtered.push(formattedData);
    }
  });

  return filtered;
}

function getStats(stats: { [type: string]: number }) {
  const formatStats: (arg: string) => Stat = (current: string) => {
    return {
      type: current,
      count: stats[current]
    };
  };

  return convertData<Stat>(stats, formatStats);
}

function getSocialNetworks(usernames: { [network: string]: string }) {
  const formatSocialNetwork: (arg: string) => ISocialNetwork = (
    current: string
  ) => {
    return {
      network: current === "instagram" ? networks.INSTAGRAM : networks.TWITTER,
      username: `https://${current}.com/${usernames[current]}`
    };
  };

  return convertData<ISocialNetwork>(usernames, formatSocialNetwork);
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  bio: string;
  username: string;
  avatar: string;
  profileUrl: string;
  socialNetworks?: Array<ISocialNetwork>;
  stats?: Array<Stat>;
}

export interface Photo {
  id: string;
  download: string;
  downloadLocation: string;
  alt: string;
  link: string;
  url: string;
}

export interface ParsedResponse {
  user: IUser;
  photo: Photo;
}

const utmParams = "?utm_source=playground&utm_medium=referral";

export function parseData(data: UnsplashResponse): ParsedResponse {
  const { user, links, urls } = data;

  const parsedUser: IUser = {
    id: user.id,
    firstName: user.first_name || "",
    lastName: user.last_name || "",
    bio: user.bio,
    username: user.username,
    avatar: user.profile_image.large,
    stats: getStats({
      photos: user.total_photos || 0,
      likes: user.total_likes || 0
    }),
    socialNetworks: getSocialNetworks({
      instagram: user.instagram_username || "",
      twitter: user.twitter_username || ""
    }),
    profileUrl: `https://unsplash.com/@${user.username}${utmParams}`
  };
  const photo = {
    id: data.id,
    download: links.download,
    downloadLocation: links.download_location,
    alt: data.alt_description,
    link: `${links.html}${utmParams}`,
    url: urls.small
  };

  return {
    user: parsedUser,
    photo
  };
}
