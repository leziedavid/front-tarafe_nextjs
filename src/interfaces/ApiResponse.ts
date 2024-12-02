// src/interfaces/ApiResponse.ts
export interface ApiResponse<T = any> {
    statusCode: number;
    statusMessage: string;
    data: T;  // Ici, T représente le type de données que tu veux stocker dans `data`
}
