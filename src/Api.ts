import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Vacancy, getVacancyParams } from "./types";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

class Api {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
  }

  public getVacancies = (params: getVacancyParams) =>
    this.instance.get<Vacancy[]>("/positions.json", { params });

  public getVacancy = (id: string) =>
    this.instance.get<Vacancy>("/positions.json");
}

const api = new Api("https://cors-anywhere.herokuapp.com/https://jobs.github.com");

export default api;
