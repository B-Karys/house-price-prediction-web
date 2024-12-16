export const BASE_URL = "http://localhost:5000";

interface ApartmentDetails {
    [key: string]: any;
}

export const healthcheck = async (): Promise<any> => {
    const response = await fetch(`${BASE_URL}/healthcheck`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
        const error = await response.text();
        console.log(error);
        throw new Error(error);
    }
    return response.json();
};

export const predict = async (data: ApartmentDetails, model: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/predict?model=${model}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.text();
        console.log(error);
        throw new Error(error);
    }
    return response.json();
};