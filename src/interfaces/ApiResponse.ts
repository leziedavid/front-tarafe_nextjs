// src/interfaces/ApiResponse.ts
export interface ApiResponse<T = any> {
    statusCode: number;
    message: string;
    data: T;  // Ici, T représente le type de données que tu veux stocker dans `data`
}
