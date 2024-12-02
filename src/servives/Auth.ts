
import { ApiResponse } from "@/interfaces/ApiResponse";
import { getBaseUrl } from "./baseUrl";
interface DecodedToken {
    id: string;
    exp: number;
}

export const signIn = async (email: string, password: string): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ email, password }),
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
};



