// baseUrl.ts
const BASE_URL_DEV = 'http://localhost:8000/api/v1';
const BASE_URL_PROD = 'https://ms.cloud.tarafe.com/api/v1';

const BASE_URL_IMGAE_DEV = 'http://localhost:8000';
const BASE_URL_IMGAE_PROD ='https://ms.cloud.tarafe.com';

const BASE_URL_SITE_PROD ='https://ms.cloud.tarafe.com/catalogue';
const BASE_URL_SITE ='https://tarafe.com/catalogue';

export const getBaseUrl = (): string => {
    return BASE_URL_DEV;
};

export const getBaseUrlImg = (): string => {
    return BASE_URL_IMGAE_DEV;
};
export const getBaseSiteUrl = (): string => {
    return BASE_URL_SITE;
};

