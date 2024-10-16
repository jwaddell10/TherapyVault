import { useState, useRef } from "react";
import useFetchFilesFolders from "../helpers/FetchRequests/useFetchFilesFolders";
import useClickOnOutside from "../helpers/useClickOnOutside";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PopUpForm from "./PopUpForm";

export default function DisplayFilesFolders() {
	const { files, folders } = useFetchFilesFolders();
	const [y, setY] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const ref = useRef();

	useClickOnOutside(ref, () => setIsModalOpen(false));

	const data = (files?.files || []).concat(folders?.folders || []);

	return (
		<table style={{ width: "-webkit-fill-available" }}>
			<thead>
				<tr>
					<th scope="col">Name</th>
					<th scope="col">Size</th>
					<th scope="col">Created</th>
					<th scope="col">Last Updated</th>
					<th scope="col">Options</th>
				</tr>
			</thead>
			<tbody>
				{data?.map((item, id) => {
					return (
						<tr key={id}>
							<td>{item.title}</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>
								<MoreHorizIcon
									onClick={(event) => {
										setIsModalOpen(true);
										setY(event.pageY);
									}}
								/>
								{isModalOpen && (
									<div ref={ref}>
										<PopUpForm y={y} />
									</div>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
