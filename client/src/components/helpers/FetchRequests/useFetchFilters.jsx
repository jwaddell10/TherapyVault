import { useState, useEffect } from "react";

export default function useFetchFilters() {
	const [demographics, setDemographics] = useState(null);
	const [topics, setTopics] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [demographicsResponse, topicsResponse] =
					await Promise.all([
						fetch(
							`${
								import.meta.env.VITE_API_URL
							}/worksheet/demographics`
						),
						fetch(
							`${import.meta.env.VITE_API_URL}/worksheet/topics`
						),
					]);

				if (!demographicsResponse.ok)
					throw new Error("Failed to fetch demographics");
				if (!topicsResponse.ok)
					throw new Error("Failed to fetch topics");

				const demographicsData = await demographicsResponse.json();
				const topicsData = await topicsResponse.json();

				setDemographics(demographicsData);
				setTopics(topicsData);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, []); // Empty dependency array

	return { demographics, topics, error };
}
