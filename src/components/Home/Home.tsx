import React from "react";
import styles from "./Home.module.css";
import SearchBar from "../SearchBar";
import VacancyCard from "../VacancyCard";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface HomeState {
  vacancies: Array<Vacancy>;
  location: string;
  fullTime: boolean;
  imagePlaceholder: string;
  cities: Cities;
  redirect: boolean;
  redirectId: string;
}

interface Cities {
  london: boolean;
  amsterdam: boolean;
  "new+york": boolean;
  berlin: boolean;
}

interface Vacancy {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
}

class Home extends React.Component<RouteComponentProps, HomeState> {
  state = {
    vacancies: [],
    location: "",
    fullTime: false,
    cities: {
      london: false,
      amsterdam: false,
      "new+york": false,
      berlin: false,
    },
    imagePlaceholder:
      "https://via.placeholder.com/250x250?text=Image+not+found",
    redirect: false,
    redirectId: "",
  };

  fetchData = (url: string): Promise<Array<Vacancy>> =>
    fetch(url).then((response) => response.json());

  getURL = (query: string): URL => {
    const { location, fullTime } = this.state;
    const url = new URL(
      "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json"
    );
    if (location.length) {
      url.searchParams.append("location", location);
    } else {
      Object.entries(this.state.cities).forEach(([city, checked]) =>
        checked ? url.searchParams.append("location", city) : null
      );
    }
    fullTime && url.searchParams.append("full_time", "true");
    url.searchParams.append("search", query);
    return url;
  };

  search = (query: string) => {
    const url: URL = this.getURL(query);
    this.fetchData(url.href)
      .then((vacancies) => this.setState({ vacancies }))
      .catch((error) => console.log("Something went wrong 😔\n", error));
  };

  onCardClick = (id: string) => {
    const [vacancyProps] = this.state.vacancies.filter(
      (vacancy: Vacancy) => vacancy.id === id
    );
    this.props.history.push({ pathname: "/vacancy", state: vacancyProps });
  };

  changeCity = (city: keyof Cities) => {
    this.setState((state) => ({
      cities: { ...state.cities, [city]: !state.cities[city] },
    }));
  };

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles["app-title"]}>
          Github <span className={styles["app-title_regular"]}>Jobs</span>
        </h1>
        <SearchBar search={this.search} />
        <main className={styles["main-section"]}>
          <div className={styles.controls}>
            <label htmlFor="full-time" className={styles["controls__label"]}>
              <input
                type="checkbox"
                id="full-time"
                onChange={() =>
                  this.setState((state) => ({
                    fullTime: !state.fullTime,
                  }))
                }
              />
              Full Time
            </label>
            <span className={styles.header}>Location</span>
            <input
              type="text"
              className={styles["controls__input"]}
              placeholder="City, state, zip code or country"
              onChange={(event) =>
                this.setState({ location: event.target.value })
              }
            />
            <label htmlFor="london" className={styles["controls__label"]}>
              <input
                type="checkbox"
                id="london"
                onChange={() => this.changeCity("london")}
              />
              London
            </label>
            <label htmlFor="amsterdam" className={styles["controls__label"]}>
              <input
                type="checkbox"
                id="amsterdam"
                onChange={() => this.changeCity("amsterdam")}
              />
              Amsterdam
            </label>
            <label htmlFor="new-york" className={styles["controls__label"]}>
              <input
                type="checkbox"
                id="new-york"
                onChange={() => this.changeCity("new+york")}
              />
              New York
            </label>
            <label htmlFor="berlin" className={styles["controls__label"]}>
              <input
                type="checkbox"
                id="berlin"
                onChange={() => this.changeCity("berlin")}
              />
              Berlin
            </label>
          </div>

          <ul className="vacancies">
            {this.state.vacancies.map(
              ({ id, company, company_logo, created_at, location, title }) => (
                <VacancyCard
                  key={id}
                  company={company}
                  company_logo={company_logo || this.state.imagePlaceholder}
                  created_at={created_at}
                  location={location}
                  title={title}
                  onclick={() => this.onCardClick(id)}
                />
              )
            )}
          </ul>
        </main>
      </div>
    );
  }
}

export default withRouter(Home);
