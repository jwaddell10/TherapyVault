import Demographic from "./DemographicsBar/Demographic.jsx";
import Topic from "./TopicsBar/Topic.jsx";
import "./SideBar.css"

export default function SideBar() {
	return (
		<section className="sidebar-container">
			<Demographic></Demographic>
			<Topic></Topic>
		</section>
	);
}
