export const MetricsSection = () => {
    return (
        <div className="w-full h-full flex items-center justify-between border-2 border-dashed border-primary p-8 px-16">
            <div className="flex flex-col">
                <p className="font-bold">Average time to finish tasks</p>
                <p>put:time:here 'HH:MM minutes'</p>
            </div>
            <div className="">
                <p className="font-bold">Average time to finish tasks by priority</p>
                <div>
                    <p>Low: 10:25 min</p>
                    <p>Medium: 10:25 min</p>
                    <p>High: 10:25 min</p>
                </div>
            </div>
        </div>
    )
}