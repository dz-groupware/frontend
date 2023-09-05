import MgmtInfoMenu from '../Commons/MgmtInfoMenu';
import {
    Container,
    InputContainer,
    HalfInputContainer,
    Label,
    Input,
    DoubleInputContainer,
    PrefixSelect,
    FormInput,
    Select
} from '../Commons/StyledForm';
import EmployeeMgmtInfo from './EmployeeMgmtInfo';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideForm, updateInfo } from '../../App';
import { axiosInstance } from '../../utils/axiosInstance';
import { styled } from 'styled-components';


export default function EmployeeMgmtGroupForm() {
    const dispatch = useDispatch();
    const reduxCompanyInfo = useSelector(state => state.companyMgmt.companyInfo);
    const isVisible = useSelector(state => state.companyMgmt.isVisible);
    const [info, setInfo] = useState(reduxCompanyInfo);
    const [companyOptions, setCompanyOptions] = useState([]); 
    const [selectedOption, setSelectedOption] = useState("");

    
  useEffect(() => {
    // 회사 목록을 가져오는 함수
    const fetchCompanies = async () => {
      try {

        const response = await axiosInstance.get('/companies/');
        setCompanyOptions(response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchCompanies(); // 함수 실행
  }, []);



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
            <EmployeeMgmtGroupInputForm>
            <InputContainer>
                        <Label>회사</Label>
                        <Select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="" >선택</option>
        {companyOptions && companyOptions.map((company, index) => (
          <option key={index} value={company.code}>{company.name}</option>
        ))}
        
      </Select>
                    </InputContainer>

                <HalfInputContainer>

                    <InputContainer>
                        <Label>직급</Label>

                        <Select name="position" value={info.position} onChange={handleChange}>
                            <option value="direct">선택</option>
                            <option value="대표">대표</option>
                            <option value="팀장">팀장</option>
                            <option value="부장">부장</option>
                            <option value="대리">대리</option>
                            <option value="사원">사원</option>
                        </Select>
                    </InputContainer>
                    <FormInput label="부서" name="departmentName" value={info.departmentName || ''} onChange={handleChange} />
                </HalfInputContainer>



                <HalfInputContainer>
                    <FormInput label="사번" name="employeeId" value={info.employeeId || ''} onChange={handleChange} />

                    <InputContainer>
                        <Label>인사이동유무</Label>
                        <label>
                            <Input type="radio" name="transferredYn" value="1" checked={info.transferredYn === 1} onChange={handleChange} />사용
                        </label>
                        <label>
                            <Input type="radio" name="transferredYn" value="0" checked={info.transferredYn === 0} onChange={handleChange} />미사용
                        </label>
                    </InputContainer>
                </HalfInputContainer>




                <HalfInputContainer>
                    <FormInput label="부서 배정일" name="joinDate" type="date" value={info.joinDate || ''} onChange={handleChange} />
                    <FormInput label="부서 이동일" name="leftDate" type="date" value={info.leftDate || ''} onChange={handleChange} />

                </HalfInputContainer>


            </EmployeeMgmtGroupInputForm>


        </Container>

    );
}




const EmployeeMgmtGroupInputForm = styled.div`
  border-top : 2px solid black;
  margin-top : 10px;
  width : 105%;
  background-color: white;
`;