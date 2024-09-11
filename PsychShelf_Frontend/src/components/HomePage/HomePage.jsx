import Button from "../helpers/Button";

export default function Home() {
	return (
		<div className="home-page-container">
			<div className="title">TherapyVault</div>
            <div className="instructions">{`These are the instructions. I'm writing them here`}</div>
            <Button />
		</div>
	);
}
