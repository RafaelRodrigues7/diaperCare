import { create } from 'apisauce';

const ibgeApi = create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/',
});

export default ibgeApi;