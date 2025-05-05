'use client'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchMetrics } from "../../handlers/metricsHandlers";
import { metricsAverage, metricsAverageByPriority, metricsHigh, metricsLow, metricsMedium } from "@/const/todo-constants";

export const MetricsSection = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos);
    const metrics = useSelector((state: RootState) => state.metrics.metrics);
    useEffect(() => {
        fetchMetrics(dispatch);
      }, [todos, dispatch]);

    return (
        <div 
        data-testid="metrics-section"
        className="w-full h-full flex items-center justify-between border-2 border-dashed border-primary p-8 px-16"
        >
            <div className="flex flex-col">
                <p className="font-bold">{metricsAverage}</p>
                <p>{metrics.generalAverage}</p>
            </div>
            <div className="">
                <p className="font-bold">{metricsAverageByPriority}</p>
                <div>
                    <p>{metricsLow}: {metrics.lowAverage}</p>
                    <p>{metricsMedium}: {metrics.mediumAverage}</p>
                    <p>{metricsHigh}: {metrics.highAverage}</p>
                </div>
            </div>
        </div>
    )
}