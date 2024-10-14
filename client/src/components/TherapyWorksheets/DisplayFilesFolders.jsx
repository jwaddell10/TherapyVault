import useFetchFilesFolders from "../helpers/FetchRequests/useFetchFilesFolders";

export default function DisplayFilesFolders() {
	const { files, folders } = useFetchFilesFolders();

	const data = (files?.files || []).concat(folders?.folders || []);
	console.log(data, "data");

	return (
		<>
			{data?.map((item, id) => {
				return <li key={id}>{item.title}</li>;
			})}
		</>
	);
}
