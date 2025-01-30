'use client'
import { useEffect } from "react";
import { getMetrics } from "../../service/metrics"
import { useDispatch, useSelector } from "react-redux";
import { RootState, setMetrics } from "@/redux/store";

export const MetricsSection = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos);
    const metrics = useSelector((state: RootState) => state.metrics.metrics);
    useEffect(() => {
        const fetchMetrics = async () => {
            const data = await getMetrics();
            dispatch(setMetrics(data))
        };
    
        fetchMetrics();
      }, [todos, dispatch]);

    return (
        <div className="w-full h-full flex items-center justify-between border-2 border-dashed border-primary p-8 px-16">
            <div className="flex flex-col">
                <p className="font-bold">Average time to finish tasks</p>
                <p>{metrics.generalAverage}</p>
            </div>
            <div className="">
                <p className="font-bold">Average time to finish tasks by priority</p>
                <div>
                    <p>Low: {metrics.lowAverage}</p>
                    <p>Medium: {metrics.mediumAverage}</p>
                    <p>High: {metrics.highAverage}</p>
                </div>
            </div>
        </div>
    )
}