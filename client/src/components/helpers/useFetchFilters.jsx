import { useState, useEffect } from "react";

export default function useFetchFilters() {
	const [demographics, setDemographics] = useState(null);
	const [topics, setTopics] = useState(null);

	useEffect(() => {
		fetch(`${import.meta.env.VITE_API_URL}/demographics`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setDemographics(data);
			})
			.catch((error) => {
				throw error;
			});

		fetch(`${import.meta.env.VITE_API_URL}/topics`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setTopics(data);
			})
			.catch((error) => {
				throw error;
			});
	}, []);

	return { demographics, topics };
}
