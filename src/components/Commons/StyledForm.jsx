import { styled } from "styled-components";

export const Container = styled.div`
    max-width: 95%;
    min-width: 95%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const InputContainer = styled.div`
    display: flex;
    border-bottom: 1px solid lightgrey;
    width: 100%;
    align-items: center;
    label {
        display: flex;
        align-items: center;
    }
`;

export const HalfInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: none;

`;

export const Label = styled.div`
    width: 170px;
    padding: 10px 10px;
    background-color: #F9F9F9;
    font-weight: bold;
    text-align: right;
    height:40px;
    
`;

export const Input = styled.input`
    flex: 1;
    margin: 5px;
    border: 1px solid lightgrey;
    height:30px;
    align-items: center;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
`;
export const Select = styled.select`
    flex: 1;
    width: 100%;
    margin: 5px;
    border: 1px solid lightgrey;
    height:30px;
`;

export const DoubleInputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: none;
`;

export const PrefixSelect = styled.select`
    flex: 0.3;
    margin: 5px;
    border: 1px solid lightgrey;
`;

export const FormInput = ({ customStyle,label, name, value, type = "text", maxLength, onChange, disabled, placeholder }) => (
    <InputContainer style={customStyle}>
        <Label>{label}</Label>
        <Input name={name} type={type} value={value} maxLength={maxLength} onChange={onChange} disabled={disabled} placeholder={placeholder} />
    </InputContainer>
);
