import {
    Container,
    InputContainer,
    HalfInputContainer,
    Label,
    Input,
    FormInput
} from '../Commons/StyledForm';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';


export default function EmployeeMgmtBasicForm() {
    const dispatch = useDispatch();
    const reduxEmployeeInfo = useSelector(state => state.employeeMgmt.employeeInfo);
    const isVisible = useSelector(state => state.companyMgmt.isVisible);
    const [info, setInfo] = useState(reduxEmployeeInfo);



    const handleChange = (e) => {
        const { name, value } = e.target;
        const finalValue = name === "accountYn" ? Number(value) : value;

        setInfo(prev => ({
            ...prev,
            [name]: finalValue,
        }));

    };


   



return (

    <Container>
        <EmployeeMgmtBasicInputForm>
            <FormInput label="사진" name="imageUrl" value={info.imageUrl || ''} onChange={handleChange} />

            <HalfInputContainer>
                <FormInput label="이름" name="name" value={info.name || ''} onChange={handleChange} />
                <FormInput label="주민등록번호" name="IdNum" value={info.IdNum || ''} onChange={handleChange} />
            </HalfInputContainer>

            <HalfInputContainer>

                <InputContainer>
                    <Label>성별</Label>
                    <label>
                        <Input type="radio" name="gender" value="여성" checked={info.gender === 1} onChange={handleChange} />여성
                    </label>
                    <label>
                        <Input type="radio" name="gender" value="남성" checked={info.gender === 0} onChange={handleChange} />남성
                    </label>
                </InputContainer>


                <InputContainer>
                    <Label>계정 사용여부</Label>
                    <label>
                        <Input type="radio" name="accountYn" value="1" checked={info.accountYn === 1} onChange={handleChange} />사용
                    </label>
                    <label>
                        <Input type="radio" name="accountYn" value="0" checked={info.accountYn === 0} onChange={handleChange} />미사용
                    </label>
                </InputContainer>

            </HalfInputContainer>






            <HalfInputContainer>
                <FormInput label="로그인ID" name="loginId" value={info.loginId || ''} onChange={handleChange} />
                <FormInput label="로그인PW" name="loginPw" value={info.loginPw || ''} onChange={handleChange} />
            </HalfInputContainer>
            <HalfInputContainer>
                <FormInput label="회사용 이메일" name="email" value={info.email || ''} onChange={handleChange} />
                <FormInput label="개인 이메일" name="privEmail" value={info.privEmail || ''} onChange={handleChange} />
            </HalfInputContainer>


            <HalfInputContainer>
                <FormInput label="휴대전화번호" name="mobileNumber" value={info.mobileNumber || ''} onChange={handleChange} />
                <FormInput label="전화번호(집)" name="homeNumber" value={info.homeNumber || ''} onChange={handleChange} />

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