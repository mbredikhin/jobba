import React, { FC } from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import styles from './VacanciesList.module.css';
import VacancyCard from '../VacancyCard';
import { Vacancy } from '../../types';

interface Props extends RouteComponentProps<Record<string, never>> {
  vacancies: Vacancy[];
}

const VacanciesList: FC<Props> = ({ vacancies }: { vacancies: Vacancy[] }) => {
  return (
    <>
      {vacancies.length > 0 ? (
        <ul className={styles['vacancies']}>
          {vacancies.map((vacancy: Vacancy) => (
            <Link
              style={{ textDecoration: 'none' }}
              to={{ pathname: `/vacancy/${vacancy.id}`, state: vacancy }}
              key={`vacancy-${vacancy.id}`}
            >
              <VacancyCard vacancy={vacancy} />
            </Link>
          ))}
        </ul>
      ) : (
        <span className={styles['no-results']}>No results found 👀</span>
      )}
    </>
  );
};

export default withRouter(VacanciesList);
