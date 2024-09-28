export default function Demographic() {
	const demographics = ["Children", "Adolescents", "Adults"];
	return (
		<div className="demographics-container">
			<h1>Filter by Demographic</h1>
			{demographics.map((demographic) => (
				<ul key={demographic}>
					<li>{demographic}</li>
				</ul>
			))}
		</div>
	);
}
