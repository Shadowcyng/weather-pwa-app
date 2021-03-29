import React, { useState } from 'react';
import { fetchWeather } from './API/fetchWeather';
import './App.css';

const App = () => {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});
	const onSearch = async (e) => {
		// e.preventDefault();

		if (e.key === 'Enter') {
			const data = await fetchWeather(query);
			setWeather(data);
			console.log(`data `, data);
			setQuery('');
		}
	};
	return (
		<div className='main-container'>
			<input
				type='text'
				className='search'
				placeholder='Search'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyPress={onSearch}
			/>
			{weather.main ? (
				<div className='city'>
					<h2 className='city-name'>
						<span>{weather.name}</span>
						<sup>{weather.sys.country}</sup>
					</h2>
					<div className='city-temp'>
						{Math.round(weather.main.temp)}
						<sup>&deg;c</sup>
					</div>
					<div className='info'>
						<img
							className='city-icon'
							src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
							alt={weather.weather[0].description}
						/>
						<p>{weather?.weather[0].description}</p>
					</div>
				</div>
			) : weather.message === 'Request failed with status code 404' ? (
				<div className='city'>City not found</div>
			) : (
				!navigator.onLine && (
					<div className='city'>
						Check your internet connection and try again
					</div>
				)
			)}
		</div>
	);
};

export default App;
