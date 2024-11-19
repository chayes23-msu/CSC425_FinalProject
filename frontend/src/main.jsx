import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './AuthProvider';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
);
