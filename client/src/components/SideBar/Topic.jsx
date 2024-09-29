import useFetchFilters from "../helpers/useFetchFilters";

export default function Demographic() {
	const { topics } = useFetchFilters();

	return (
		<div className="demographics-container">
			<h1>Filter by Topic</h1>
			{topics &&
				topics.map((item) => <li key={item.id}>{item.topics}</li>)}
		</div>
	);
}
