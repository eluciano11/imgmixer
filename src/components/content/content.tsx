import React, { useEffect, useRef, useState } from "react";

import { UnsplashResponse } from "../../libs/unsplash/interfaces";
import { Download, Refresh } from "../../icons/index";
import { Profile } from "../profile/index";
import { Loader } from "../loader/index";
import { parseData, ParsedResponse, IUser, Photo } from "./utils";
import { Card, CardTransitions } from "./card/index";
import { EmptyView } from "../empty-view/index";
import { Credits } from "./credits/index";
import { NotificationMode } from "../notification/index";
import styles from "./content.module.css";

enum ContentModes {
  LOADING = "LOADING",
  EMPTY = "EMPTY",
  LOADED = "LOADED"
}

const dataInitialState: ParsedResponse = {
  user: {} as IUser,
  photo: {} as Photo
};

type Props = {
  search: string;
};

function Content({ search }: Props) {
  const [contentMode, setContentMode] = useState(ContentModes.LOADING);
  const [transition, setTransition] = useState(CardTransitions.NONE);
  const [data, setData] = useState(dataInitialState);
  const [creditMode, setCreditMode] = useState(NotificationMode.NONE);
  const nextCard = useRef<ParsedResponse | null>(null);
  const getHasFoundData = (data: ParsedResponse) => {
    return (
      data &&
      data.user &&
      data.photo &&
      Object.keys(data.user).length > 0 &&
      Object.keys(data.photo).length > 0
    );
  };
  const getData = async (search: string) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/photos?search=${search}`
    );

    if (response.status >= 200 && response.status <= 299) {
      const data: UnsplashResponse = await response.json();
      const parsedData: ParsedResponse = parseData(data);

      return parsedData;
    }

    throw response;
  };
  const fetchPhoto = async () => {
    setContentMode(ContentModes.LOADING);
    setCreditMode(NotificationMode.NONE);

    try {
      const data: ParsedResponse = await getData(search);
      const hasFoundData = getHasFoundData(data);

      setData(data);
      setContentMode(hasFoundData ? ContentModes.LOADED : ContentModes.EMPTY);
    } catch (error) {
      console.log("Error ocurred while fetching", error);
      setCreditMode(NotificationMode.NONE);
      setContentMode(ContentModes.EMPTY);
      setData(dataInitialState);
    }
  };
  const refresh = async () => {
    if (creditMode === NotificationMode.SHOW) {
      setCreditMode(NotificationMode.HIDE);
    }

    try {
      const data = await getData(search);

      nextCard.current = data;
      setTransition(CardTransitions.SLIDE_OUT);
    } catch (error) {
      console.log("Error ocurred while fetching", error);
      setCreditMode(NotificationMode.NONE);
      setContentMode(ContentModes.EMPTY);
      setData(dataInitialState);
    }
  };
  const loadNext = async () => {
    if (nextCard.current) {
      setData(nextCard.current);
      setTransition(CardTransitions.STEP_IN);
    }
  };
  const handleDownload = async () => {
    await fetch(
      `${process.env.REACT_APP_SERVER_URL}/photos/download?location=${
        data.photo.downloadLocation
      }`,
      { method: "POST" }
    );
    setCreditMode(NotificationMode.SHOW);
  };

  useEffect(() => {
    fetchPhoto();
  }, [search]);

  switch (contentMode) {
    case ContentModes.LOADED: {
      const { user, photo } = data;

      return (
        <div className={styles.container}>
          <Profile {...user} transition={transition} />
          <div className={styles.main}>
            <Credits
              author={`${user.firstName} ${user.lastName}`}
              profileLink={user.profileUrl}
              imageLink={photo.link}
              creditMode={creditMode}
              changeCreditMode={(state: NotificationMode) =>
                setCreditMode(state)
              }
            />
            <Card
              key={photo.id}
              transition={transition}
              url={photo.url}
              alt={photo.alt}
              imageLink={photo.link}
              onFinishSlideOut={loadNext}
            />
            <div className={styles.buttons}>
              <a
                href={`${photo.download}?force=true`}
                className={`button circle button--icon button--secondary ${
                  styles.cardAction
                }`}
                onClick={handleDownload}
                download
              >
                <Download color="#007fff" height={20} width={20} />
              </a>
              <button
                className={`button circle button--icon button--primary ${
                  styles.cardAction
                }`}
                onClick={refresh}
              >
                <Refresh color="#111" height={20} width={20} />
              </button>
            </div>
          </div>
        </div>
      );
    }

    case ContentModes.LOADING:
      return (
        <section className={styles.containerEmpty}>
          <Loader />
        </section>
      );

    case ContentModes.EMPTY:
      return (
        <section className={styles.containerEmpty}>
          <EmptyView
            header="No photos found."
            message={
              search
                ? `We couldn't find photos that matched "${search}". Please try using another search term.`
                : "We couldn't find photos. Please try again."
            }
          />
        </section>
      );

    default:
      return null;
  }
}

export default Content;
