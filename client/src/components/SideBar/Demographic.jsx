import useFetchFilters from "../helpers/useFetchFilters";

export default function Demographic() {
	const { demographics } = useFetchFilters();

	return (
		<section className="demographic-section">
			<h1>Filter by Demographic</h1>
			{demographics &&
				demographics.map((item) => (
					<li key={item.id}>{item.demographics}</li>
				))}
		</section>
	);
}
