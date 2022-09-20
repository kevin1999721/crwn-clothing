import styled from 'styled-components';

import Button from '../button/button.component';
import { SpinnerContainer } from '../spinner/spinner.style';

export const PaymentFormContainer = styled.div`
	max-width: 350px;
	margin-left: auto;
	padding: 10px;
	border: 1px solid #aaa;
	border-radius: 5px;
`;

export const PaymentButton = styled(Button)`
	margin-top: 20px;
`;

export const PaymentSpinner = styled(SpinnerContainer)`
	width: 20px;
	height: 20px;
`;
