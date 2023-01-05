import { ReactElement, useEffect, useState } from 'react';

function PhotoForm({
	editForm,
	setPhoto,
	preview,
}: {
	editForm: boolean;
	setPhoto: (any) => void;
	preview: any;
}): ReactElement {
	const [image, setImage] = useState<File | null>();

	const [editModeStart, setEditModeStart] = useState(false);

	function handleImage(event) {
		const file = event.target.files[0];
		if (file && file.type.substr(0, 5) == 'image') {
			setImage(file);
		} else {
			setImage(null);
		}
	}

	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				let pr = reader.result as string;
				//		setPreview(pr);

				setPhoto(pr);
			};

			reader.readAsDataURL(image);
		} else if (editForm) {
			const reader = new FileReader();
			reader.onloadend = () => {
				let pr = reader.result as string;
				//	setPreview(pr);

				setPhoto(pr);
			};
		} else {
			//	setPreview(undefined);
		}
	}, [image]);

	return (
		<div className="shadow">
			<input
				style={{ borderRadius: 0 }}
				type={'file'}
				accept={'image/*'}
				onChange={handleImage}
				className="form-control border-0"
			/>

			<div
				className="card card-body"
				style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
			>
				<div className="card-title">
					<h5>Zdjęcie profilowe</h5>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="row justify-content-center">
							<div className="col-10"></div>
						</div>
						<div className="row justify-content-center">
							<div className="col-10">
								<img width="300px" height="300px " src={preview} className="" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PhotoForm;
