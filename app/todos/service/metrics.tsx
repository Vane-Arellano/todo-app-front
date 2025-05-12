/**
 * Fetches metrics data from the API.
 *
 * @returns {Promise<any | null>} A promise that resolves to the metrics data
 * if the request is successful, or `null` if the request fails.
 *
 * @throws {Error} Throws an error if the response status is not OK (non-2xx).
 */
import { toast } from "sonner";

export const getMetrics = async () => {
    try {
        const api_url = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${api_url}/metrics`);
        if (!response.ok) {
            toast.error("Failed to fetch metrics");
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const metrics = await response.json();
        return metrics;
    } catch (error) {
        console.error("Failed to fetch metrics:", error);
        toast.error("Failed to fetch metrics");
        return null; 
    }
}