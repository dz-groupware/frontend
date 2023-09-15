import {
    Container,
    InputContainer,
    HalfInputContainer,
    Label,
    Input,
    FormInput,
    Select,
    DoubleInputContainer
} from '../Commons/StyledForm';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { employeeActions } from '../../utils/Slice';
import StyledButton from '../Commons/StyledButton';


export default function EmployeeMgmtBasicForm({ handleUpdate }) {
    const dispatch = useDispatch();
    const reduxEmployeeBasicInfo = useSelector(state => state.employeeMgmt.employeeBasicInfo);
    // const idForForm = useSelector(state => state.companyMgmt.idForForm);
    const [info, setInfo] = useState(reduxEmployeeBasicInfo);
    const [privEmail1, setPrivEmail1] = useState('');
    const [privEmail2, setPrivEmail2] = useState('');


    useEffect(() => {
        dispatch(employeeActions.updateInfo(info));
    }, [info]);



    const handleChange = (e) => {
        const { name, value } = e.target;

        let finalValue;

        if (name === "accountYn") {
            finalValue = value === "true";
        } else if (name === "gender") {
            finalValue = value;
        } else {
            finalValue = value;
        }

        if (name === "loginId") {
            // 정규식을 활용하여 영어, 숫자 및 _ 외의 문자가 포함되었는지 확인
            const regex = /^[a-zA-Z0-9_]{0,48}$/;

            if (!regex.test(value)) return;
        }
        if (name === "loginPw") {
            const regex = /^[a-zA-Z0-9_]{0,98}$/;
            if (!regex.test(value))
                return console.log("비밀번호형식을지켜주세요");

        }

        setInfo(prev => ({
            ...prev,
            [name]: finalValue,
        }));
    };


    const handleHyphenChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, '');

        if (name === "IdNum") {
            if (formattedValue.length === 6 && value.charAt(6) === '-') {
                formattedValue = formattedValue.slice(0, 6);
            } else if (formattedValue.length > 6) {
                formattedValue = `${formattedValue.slice(0, 6)}-${formattedValue.slice(6)}`;
            }
            formattedValue = formattedValue.slice(0, 14);

            setInfo(prev => ({
                ...prev,
                [name]: formattedValue
            }));
        }

        if (name === "mobileNumber") {
            if (formattedValue.length === 4) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
            } else if (formattedValue.length > 4 && formattedValue.length <= 7) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 7)}`;
            } else if (formattedValue.length > 7) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 7)}-${formattedValue.slice(7)}`;
            }
            setInfo(prev => ({
                ...prev,
                mobileNumber: formattedValue
            }));
        }

        if (name === "homeNumber") {
            if (formattedValue.length === 4) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
            } else if (formattedValue.length > 4 && formattedValue.length <= 7) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 7)}`;
            } else if (formattedValue.length > 7) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 7)}-${formattedValue.slice(7)}`;
            }
            setInfo(prev => ({
                ...prev,
                homeNumber: formattedValue
            }));
        }






    };
    const handleEmailChange = (e) => {
        const { name, value } = e.target;

        // 정규식을 활용하여 영어, 숫자 및 _ 외의 문자가 포함되었는지 확인


        if (name === 'privEmail1') {
            const regex = /^[a-zA-Z0-9_]{0,48}$/;
            if (!regex.test(value)) return;
            setPrivEmail1(value);
            setInfo(prev => ({
                ...prev,
                privEmail: value + prev.privEmail2
            }));
        } else if (name === 'privEmail2') {
            setPrivEmail2(value);
            setInfo(prev => ({
                ...prev,
                privEmail: prev.privEmail1 + value

            }));
        }

    };






    return (

        <Container>
            <EmployeeMgmtBasicInputForm>
                <HalfInputContainer>
                    <FormInput label="이름" name="name" value={info.name || ''} onChange={handleChange} />

                    <FormInput label="주민등록번호" name="IdNum" value={info.IdNum || ''} onChange={handleHyphenChange} />


                </HalfInputContainer>

                <HalfInputContainer style={{ borderBottom: "1px solid lightgrey" }}>
                    <DoubleInputContainer>
                        <FormInput customStyle={{ border: "none" }} label="개인 이메일" name="privEmail1" value={privEmail1 || ''} onChange={handleEmailChange} />

                        <Select style={{ width: "300px" }} name="privEmail2" value={privEmail2 || ''} onChange={handleEmailChange}>

                            <option value="">선택</option>
                            <option value="@naver.com">@naver.com</option>
                            <option value="@daum.com">@daum.com</option>
                            <option value="@google.com">@google.com</option>
                        </Select>
                    </DoubleInputContainer>

                    <StyledButton name="signcheck" value="signcheck">가입 확인</StyledButton>
                </HalfInputContainer>



                <FormInput label="사진" name="imageUrl" value={info.imageUrl || ''} onChange={handleChange} />
                <HalfInputContainer>

                    <InputContainer>
                        <Label>성별</Label>
                        <label>
                            <Input type="radio" name="gender" value="여성" checked={info.gender === "여성"} onChange={handleChange} />여성
                        </label>
                        <label>
                            <Input type="radio" name="gender" value="남성" checked={info.gender === "남성"} onChange={handleChange} />남성
                        </label>
                    </InputContainer>


                    <InputContainer>
                        <Label>계정 사용여부</Label>
                        <label>
                            <Input type="radio" name="accountYn" value="true" checked={info.accountYn === true} onChange={handleChange} />사용
                        </label>
                        <label>
                            <Input type="radio" name="accountYn" value="false" checked={info.accountYn === false} onChange={handleChange} />미사용
                        </label>
                    </InputContainer>

                </HalfInputContainer>






                <HalfInputContainer style={{ borderBottom: "1px solid lightgrey" }}>
                    <FormInput customStyle={{ border: "none" }} label="로그인ID" name="loginId" value={info.loginId || ''} onChange={handleChange} />
                    <StyledButton name="duplicatecheck" value="duplicatecheck">중복확인</StyledButton>
                    <FormInput customStyle={{ border: "none" }} label="로그인PW" name="loginPw" type="password" value={info.loginPw || ''} onChange={handleChange} />
                </HalfInputContainer>



                <HalfInputContainer>
                    <FormInput label="휴대전화번호" name="mobileNumber" value={info.mobileNumber || ''} onChange={handleHyphenChange} />
                    <FormInput label="전화번호(집)" name="homeNumber" value={info.homeNumber || ''} onChange={handleHyphenChange} />

                </HalfInputContainer>


                <FormInput label="주소" name="address" value={info.address || ''} onChange={handleChange} />


                <HalfInputContainer>
                    <FormInput label="입사일" name="joinDate" type="date" value={info.joinDate || ''} onChange={handleChange} />
                    <FormInput label="퇴사일" name="resignationDate" type="date" value={info.resignationDate || ''} onChange={handleChange} />

                </HalfInputContainer>


            </EmployeeMgmtBasicInputForm>


        </Container>

    );
}




const EmployeeMgmtBasicInputForm = styled.div`
  border-top : 2px solid black;
  margin-top : 10px;
  width : 105%;

`;