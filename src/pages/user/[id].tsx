import { useParams } from "react-router";

export default function () {
	const { id } = useParams<{ id: string }>();
	return (
		<div>
			<h1>User Detail</h1>
			<p>User ID: {id}</p>
		</div>
	);
}
