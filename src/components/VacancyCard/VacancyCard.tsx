import React from "react";
import styles from "./VacancyCard.module.css";
import { Redirect } from "react-router-dom";

type VacancyCardProps = {
  company: string;
  company_logo: string;
  created_at: string;
  isFullTime: boolean;
  location: string;
  title: string;
  id: string;
  onclick: Function;
};

type VacancyCardState = {
  redirect: boolean;
}

export default class VacancyCard extends React.Component<VacancyCardProps, VacancyCardState> {
  state: VacancyCardState = { redirect: false };

  render() {
    if (this.state.redirect) return <Redirect to="/123" />;
    return (
        <li
          className={styles.card}
          onClick={() => this.props.onclick(this.props.id)}
        >
          <div className={styles.image}>
            <img
              className={styles["card__image"]}
              src={this.props.company_logo}
              alt={this.props.company}
            />
          </div>
          <div className={styles.content}>
            <span className={styles["card__company"]}>
              {this.props.company}
            </span>
            <span className={styles["card__title"]}>{this.props.title}</span>
            <div className={styles.footer}>
              {this.props.isFullTime && (
                <span className={styles["card__badge"]}>Full time</span>
              )}
              <div className={styles.extras}>
                <div className={styles["card__extra card__extra--location"]}>
                  <img
                    className={styles["card__icon"]}
                    alt="Location"
                    src={require("../../assets/world.svg")}
                  />
                  <span className={styles["card__extra-text"]}>
                    {this.props.location}
                  </span>
                </div>
                <div className={styles["card__extra card__extra--created"]}>
                  <img
                    className={styles["card__icon"]}
                    alt="Created at"
                    src={require("../../assets/clock.svg")}
                  />
                  <span className={styles["card__extra-text"]}>
                    {this.props.created_at}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
    );
  }
}
