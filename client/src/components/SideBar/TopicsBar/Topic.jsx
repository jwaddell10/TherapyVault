import useFetchFilters from "../../helpers/FetchRequests/useFetchFilters";
import "./Topic.css";
import styled from "styled-components";

export default function Demographic() {
	const { topics } = useFetchFilters();

	return (
		<div className="topics-container">
			<StyledTitle>Filter by Topic</StyledTitle>
			<StyledListItems>
				{topics &&
					topics.map((item) => <li key={item.id}>{item.topics}</li>)}
			</StyledListItems>
		</div>
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
