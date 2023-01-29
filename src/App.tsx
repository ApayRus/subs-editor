import EditPage from './components/pages/EditPage'
import Menu from './components/pages/Menu'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllText from './components/pages/AllText'
import MainPage from './components/pages/Main'
import Import from './components/pages/Import'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainPage />}></Route>
				<Route path='material/:id*' element={<EditPage />}></Route>
				<Route path='menu' element={<Menu />}></Route>
				<Route path='all-text' element={<AllText />}></Route>
				<Route path='import' element={<Import />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
