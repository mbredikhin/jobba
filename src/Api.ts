import axios, { AxiosInstance } from 'axios';
import { Vacancy, getVacancyParams } from './types';

class Api {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
  }

  public getVacancies = (params: getVacancyParams) =>
    this.instance
      .get<Vacancy[]>('/positions.json', { params })
      .then(({ data }) => data);

  public getVacancy = (id: string) =>
    this.instance
      .get<Vacancy>('/positions.json', { params: { id } })
      .then(({ data }) => data);
}

const baseURL = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com';
const api = new Api(baseURL);

export default api;
