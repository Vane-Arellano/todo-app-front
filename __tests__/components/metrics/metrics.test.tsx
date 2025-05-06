import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { metricsSlice, setMetrics, todosSlice } from '@/redux/store';
import '@testing-library/jest-dom';
import { MetricsSection } from '@/app/todos/components/metrics/metrics';


describe('MetricsSection', () => {
  const metrics = {
    generalAverage: '5 days',
    lowAverage: '2 days',
    mediumAverage: '4 days',
    highAverage: '7 days',
  }
  const store = configureStore({
    reducer: {
      metrics: metricsSlice.reducer,
      todos: todosSlice.reducer,
    },
    preloadedState: {
      metrics: {
        metrics: metrics
      },
      todos: {
        todos: [],
        isTodoAdded: false,
      }
    }
  });
  beforeEach(() => {
    store.dispatch(setMetrics(metrics))
  })

  it('renders the metrics section and fetches data', async () => {
    render(
      <Provider store={store}>
        <MetricsSection />
      </Provider>
    );

    expect(screen.getByTestId('metrics-section')).toBeInTheDocument();

    await waitFor(() => {
      const state = store.getState().metrics.metrics;
      expect(state.generalAverage).toBe('5 days');
      expect(state.lowAverage).toBe('2 days');
      expect(state.mediumAverage).toBe('4 days');
      expect(state.highAverage).toBe('7 days');

    });

    // Check rendered text
    expect(await screen.getAllByText(/average time to finish tasks/i).length).toBeGreaterThan(0);
    expect(await screen.findByText(/2 days/i)).toBeInTheDocument();
    expect(await screen.findByText(/4 days/i)).toBeInTheDocument();
  });
});
