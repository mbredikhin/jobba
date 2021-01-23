import React, { useState, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styles from './Home.module.css';
import SearchBar from '../SearchBar';
import VacanciesList from '../VacanciesList';
import { Vacancy, getVacancyParams } from '../../types';
import api from '../../Api';

const Home: FC<RouteComponentProps> = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [location, setLocation] = useState('');
  const [fullTime, setFullTime] = useState(true);
  const [cities, setCities] = useState([
    {
      name: 'london',
      title: 'London',
      checked: false,
    },
    {
      name: 'amsterdam',
      title: 'Amsterdam',
      checked: false,
    },
    {
      name: 'new york',
      title: 'New York',
      checked: false,
    },
    {
      name: 'berlin',
      title: 'Berlin',
      checked: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const changeCity = (name: string) => {
    const index = cities.findIndex((city) => city.name === name);
    setCities(
      cities.map((city, i) => (index === i ? { ...city, checked: !city.checked } : { ...city, checked: false }))
    );
  };

  const getVacancies = async (search: string): Promise<void> => {
    const params: getVacancyParams = {
      ...(location.length && { location }),
      cities: cities.filter(({ checked }) => checked === true).map(({ name }) => name),
      full_time: fullTime,
      search,
    };
    try {
      setIsLoading(true);
      const response: Vacancy[] = await api.getVacancies(params);
      setVacancies(response);
    } catch (error) {
      console.log('Something went wrong 😔\n', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles['app-title']}>
        Github <span className={styles['app-title_regular']}>Jobs</span>
      </h1>
      <SearchBar search={getVacancies} isLoading={isLoading} />
      <main className={styles['main-section']}>
        <div className={styles.controls}>
          <label htmlFor="full-time" className={styles['controls__label']}>
            <input
              type="checkbox"
              id="full-time"
              checked={fullTime}
              onChange={() => setFullTime((fullTime) => !fullTime)}
            />
            Only Full Time
          </label>
          <span className={styles.header}>Location</span>
          <input
            type="text"
            className={styles['controls__input']}
            placeholder="City, state, zip code or country"
            onChange={(e) => setLocation(e.target.value)}
          />
          {cities.map(({ name, title, checked }) => (
            <label htmlFor={name} className={styles['controls__label']} key={`city-${name}-checkbox`}>
              <input type="checkbox" checked={checked} id={name} onChange={() => changeCity(name)}></input>
              {title}
            </label>
          ))}
        </div>

        <div className={styles['vacancies-list']}>
          <VacanciesList vacancies={vacancies} />
        </div>
      </main>
    </div>
  );
};

export default Home;
