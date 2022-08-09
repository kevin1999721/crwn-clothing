import './form-input.style.scss';

const FormInput = ({ labelValue, inputOptions }) => {
	return (
		<div className="form-input-container">
			<input className="form-input" {...inputOptions} />
			<label className="form-input-label">{labelValue}</label>
		</div>
	);
};

export default FormInput;
