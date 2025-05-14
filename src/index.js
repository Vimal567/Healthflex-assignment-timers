import ReactDOM from 'react-dom/client';
import App from './App';
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider
    maxSnack={1}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    autoHideDuration={1000}
  >
    <App />
  </SnackbarProvider>
);