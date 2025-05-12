import { setMetrics } from "@/redux/store";
import { getMetrics } from "../service/metrics";

export const fetchMetrics = async (dispatch: any) => {
    const data = await getMetrics();
    dispatch(setMetrics(data))
}