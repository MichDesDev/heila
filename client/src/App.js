//Logic
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {useCookies} from 'react-cookie'
//Pages
import Home from './views/pages/Home/Home'
import Dashboard from './views/pages/Dashboard/Dashboard';
import OnBoarding from './views/pages/OnBoarding/OnBoarding';
import ChatContainer from './views/pages/ChatContainer/ChatContainer';
import Profile from './views/pages/Profile/Profile';


const App = () => {
	const [cookies, setCookie, removeCookie] = useCookies(['user'])

	const authToken = cookies.AuthToken;

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home/>}/>
				{authToken && <Route path="/dashboard" element={<Dashboard />}/>}
				{authToken && <Route path="/onboarding" element={<OnBoarding />}/>}
				{authToken && <Route path="/matches" element={<ChatContainer />}/>}
				{authToken && <Route path="/profile" element={<Profile />}/>}
			</Routes>
		</BrowserRouter>
	)
}

export default App
