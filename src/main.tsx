import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import HotspotContextProvider from './context/hotspotContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HotspotContextProvider>
    <App />
  </HotspotContextProvider>
);
