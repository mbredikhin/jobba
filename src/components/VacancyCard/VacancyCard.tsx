import React, { FC } from 'react';
import styles from './VacancyCard.module.css';
import { RouteComponentProps } from 'react-router-dom';
import { Vacancy } from '../../types';

interface Props extends RouteComponentProps {
  vacancy: Vacancy;
}

const VacancyCard: FC<Props> = (props: Props) => {
  const {
    type,
    created_at,
    company,
    location,
    title,
    company_logo = 'https://via.placeholder.com/250x250?text=Image+not+found',
  } = props.vacancy;

  return (
    <li className={styles.card}>
      <div className={styles['image-container']}>
        <img className={styles['card__image']} src={company_logo} alt={company} />
      </div>
      <div className={styles.content}>
        <div className={styles['content-header']}>
          <span className={styles['card__company']}>{company}</span>
          <span className={styles['card__title']}>{title}</span>
        </div>
        <div className={styles['content-footer']}>
          {type === 'Full Time' && <span className={styles['card__badge']}>Full time</span>}
          <div className={styles.extras}>
            <div className={styles['card__extra card__extra--location']}>
              <img className={styles['card__icon']} alt="Location" src={require('../../assets/world.svg')} />
              <span className={styles['card__extra-text']}>{location}</span>
            </div>
            <div className={styles['card__extra card__extra--created']}>
              <img className={styles['card__icon']} alt="Created at" src={require('../../assets/clock.svg')} />
              <span className={styles['card__extra-text']}>{created_at}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default VacancyCard;
