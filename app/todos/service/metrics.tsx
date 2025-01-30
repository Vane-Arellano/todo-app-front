export const getMetrics = async () => {
    const api_url = process.env.NEXT_PUBLIC_API_URL
    const response = await fetch(`${api_url}/metrics`); 
    const metrics = await response.json()
    return metrics
}