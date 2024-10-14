import useFetchFilters from "../../helpers/FetchRequests/useFetchFilters";
import "./Demographic.css";
import styled from "styled-components";

export default function Demographic() {
	const { demographics } = useFetchFilters();

	return (
		<section className="demographics-container">
			<StyledTitle className="demographic-title">
				Filter by Demographic
			</StyledTitle>
			<StyledListItems>
				{demographics &&
					demographics.map((item) => (
						<li
							className="demographic-selections-container"
							key={item.id}
						>
							{item.demographics}
						</li>
					))}
			</StyledListItems>
		</section>
	);
}

const StyledTitle = styled.section`
	font-weight: bold;
	font-size: 1rem;
	display: flex;
	border: 2px solid #e8e8e8;
	padding: 10px;
`;

const StyledListItems = styled.section`
	display: flex;
	flex-direction: column;
	margin: 10px;
	gap: 10px;
`;
