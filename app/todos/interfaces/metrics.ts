
export interface Metrics {
    generalAverage: string, 
    lowAverage: string, 
    mediumAverage: string, 
    highAverage: string
  }
  
  export interface MetricsState {
    metrics: Metrics;
  }