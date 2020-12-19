import React, { FunctionComponent, useState } from "react";
import styles from "./VacancyCard.module.css";
import { Redirect } from "react-router-dom";
import { Vacancy } from "../../types";
interface Props {
  company: string;
  company_logo: string;
  created_at: string;
  isFullTime: boolean;
  location: string;
  title: string;
  id: string;
  onclick: Function;
}

const VacancyCard: FunctionComponent<Props> = (props: Vacancy) => {
  const {
    company,
    company_logo = "https://via.placeholder.com/250x250?text=Image+not+found",
    created_at,
    isFullTime,
    location,
    title,
    id,
    onclick,
  } = props;
  const [redirect] = useState(false);
  if (redirect) return <Redirect to="/123" />;
  return (
    <li className={styles.card} onClick={() => onclick(id)}>
      <div className={styles.image}>
        <img
          className={styles["card__image"]}
          src={company_logo}
          alt={company}
        />
      </div>
      <div className={styles.content}>
        <span className={styles["card__company"]}>{company}</span>
        <span className={styles["card__title"]}>{title}</span>
        <div className={styles.footer}>
          {isFullTime && (
            <span className={styles["card__badge"]}>Full time</span>
          )}
          <div className={styles.extras}>
            <div className={styles["card__extra card__extra--location"]}>
              <img
                className={styles["card__icon"]}
                alt="Location"
                src={require("../../assets/world.svg")}
              />
              <span className={styles["card__extra-text"]}>{location}</span>
            </div>
            <div className={styles["card__extra card__extra--created"]}>
              <img
                className={styles["card__icon"]}
                alt="Created at"
                src={require("../../assets/clock.svg")}
              />
              <span className={styles["card__extra-text"]}>{created_at}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default VacancyCard;
