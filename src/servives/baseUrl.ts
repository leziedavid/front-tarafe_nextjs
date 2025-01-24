// baseUrl.ts
const BASE_URL_DEV = 'http://localhost:8000/api/v1';
const BASE_URL_PROD = 'tarafe.tarafe.com/api/v1';
const BASE_URL_IMGAE_DEV = 'http://localhost:8000';
const BASE_URL_IMGAE_PROD ='tarafe.tarafe.com';
const BASE_URL_SITE ='tarafe.com/catalogue';

export const getBaseUrl = (): string => {
    return BASE_URL_DEV;
};

export const getBaseUrlImg = (): string => {
    return BASE_URL_IMGAE_DEV;
};
export const getBaseSiteUrl = (): string => {
    return BASE_URL_SITE;
};

