import React, { useState, FunctionComponent, ReactFragment } from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import styles from "./Home.module.css";
import SearchBar from "../SearchBar";
import VacancyCard from "../VacancyCard";
import { Vacancy, getVacancyParams } from "../../types";
import api from "../../Api";

interface City {
  name: string;
  title: string;
  selected: boolean;
}

const Home: FunctionComponent<RouteComponentProps> = (props) => {
  const history = useHistory();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [location, setLocation] = useState("");
  const [fullTime, setFullTime] = useState(false);
  const [cities, setCities] = useState([
    {
      name: "london",
      title: "London",
      selected: false,
    },
    {
      name: "amsterdam",
      title: "Amsterdam",
      selected: false,
    },
    {
      name: "new york",
      title: "New York",
      selected: false,
    },
    {
      name: "berlin",
      title: "Berlin",
      selected: false,
    },
  ]);
  const [redirect, setRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState("");

  const getVacancies = async (search: string): Promise<void> => {
    const selectedCities: string[] = cities.reduce(
      (acc: string[], city: City) =>
        city.selected ? [...acc, city.name] : acc,
      []
    );
    const params: getVacancyParams = {
      ...(location.length && { location }),
      cities: selectedCities,
      full_time: fullTime,
      search,
    };
    try {
      const vacancies: Vacancy[] = await api.getVacancies(params);
      setVacancies(vacancies);
    } catch (error) {
      console.log("Something went wrong 😔\n", error);
    }
  };

  const openVacancy = (id: string): void => {
    const vacancy: Vacancy[] = vacancies.filter(
      (vacancy: Vacancy) => vacancy.id === id
    );
    history.push({ pathname: "/vacancy", state: vacancy });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles["app-title"]}>
        Github <span className={styles["app-title_regular"]}>Jobs</span>
      </h1>
      <SearchBar search={getVacancies} />
      <main className={styles["main-section"]}>
        <div className={styles.controls}>
          <label htmlFor="full-time" className={styles["controls__label"]}>
            <input
              type="checkbox"
              id="full-time"
              onChange={() => setFullTime((fullTime) => !fullTime)}
            />
            Full Time
          </label>
          <span className={styles.header}>Location</span>
          <input
            type="text"
            className={styles["controls__input"]}
            placeholder="City, state, zip code or country"
            onChange={(e) => setLocation(e.target.value)}
          />
          {cities.map(({ name, title, selected }) => (
            <label htmlFor={name} className={styles["controls__label"]}>
              <input
                type="checkbox"
                id={name}
                onChange={() =>
                  setCities((cities) => [
                    ...cities.filter((city) => city.name !== name),
                    { name, title, selected },
                  ])
                }
              ></input>
              {title}
            </label>
          ))}
        </div>

        <ul className="vacancies">
          {/* company_logo={vacancy.company_logo} */}
          {vacancies.map(
            (vacancy: Vacancy) => 
              <VacancyCard
                key={vacancy.id}
                company={vacancy.company}
                created_at={vacancy.created_at}
                location={vacancy.location}
                title={vacancy.title}
                openVacancy={() => openVacancy(vacancy.id)}
              />
          )}
        </ul>
      </main>
    </div>
  );
};

export default withRouter(Home);
