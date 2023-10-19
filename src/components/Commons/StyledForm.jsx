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

const isValidASCII = (str) => {
    return /^[\x00-\x7Fㄱ-힣]*$/.test(str);
};

export const FormInput = ({ customStyle, label, name, value, type = "text", maxLength, onChange, disabled, placeholder, onBlur }) => {

    const handleInputChange = (e) => {
        if (!isValidASCII(e.target.value)) {
            alert('한글 및 ASCII 문자만 입력할 수 있습니다.');
            e.target.value = e.target.value.replace(/[^\x00-\x7Fㄱ-힣]/g, "");  // 한글 및 ASCII 문자가 아닌 문자들을 제거
        }


        if (onChange) onChange(e);
    };

    return (
        <InputContainer style={customStyle}>
            <Label>{label}</Label>
            <Input name={name} type={type} value={value} maxLength={maxLength} onChange={handleInputChange} disabled={disabled} placeholder={placeholder} onBlur={onBlur} />
        </InputContainer>
    );
};


export const ImageContainer = styled.div`
    display:flex;
    border-bottom: 1px solid lightgrey;
    width: 100%;
    align-items: center;
    label {
        display: flex;
        align-items: center;
    }

`
export const ImageLabel = styled.div`
    width: 170px;
    padding: 10px 10px;
    background-color: #F9F9F9;
    font-weight: bold;
    height: 140px;
    display: flex;
    align-items: center;      // 이 속성은 세로 중앙 정렬을 위해 사용됩니다.
    justify-content: flex-end; // 이 속성은 오른쪽 정렬을 위해 사용됩니다.
`;



export const ImageInputTag = ({ customStyle, label }) => {
    return (
        <InputContainer style={customStyle}>
            <ImageLabel>{label}</ImageLabel>
        </InputContainer>
    );
};