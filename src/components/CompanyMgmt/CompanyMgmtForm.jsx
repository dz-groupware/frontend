import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyMgmtInfo from './CompanyMgmtInfo';
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
import { companyActions } from '../../utils/Slice';
import { addCompanyMgmt, getAllCompanyMgmtParList, modifyCompanyMgmt } from '../../api/companymgmt';

export default function CompanyMgmtForm() {
    const dispatch = useDispatch();
    const reduxCompanyInfo = useSelector(state => state.companyMgmt.companyInfo);
    const isVisible = useSelector(state => state.companyMgmt.isVisible);
    const idForForm = useSelector(state => state.companyMgmt.idForForm);
    const [companyOptions, setCompanyOptions] = useState([]); // 회사 옵션을 담을 상태
    const [info, setInfo] = useState(reduxCompanyInfo);

    const fetchCompanyOptions = async () => {
        try {
            const companyList = await getAllCompanyMgmtParList();
            setCompanyOptions(companyList);
        } catch (error) {
            console.error("Error fetching company data:", error);
        }
    };
  
    useEffect(() => {
        setInfo(reduxCompanyInfo);
    }, [reduxCompanyInfo, isVisible]);

    useEffect(() => {
        fetchCompanyOptions();
    }, []);
    
    if (!isVisible) return null;



    const handleChange = (e) => {
        const { name, value } = e.target;
        const finalValue = name === "enabledYn" ? value === "true" : value;

        setInfo(prev => ({
            ...prev,
            [name]: finalValue,
        }));

    };


    const handleHyphenChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, '');


        if (name === "repTel1") {
            setInfo(prev => ({
                ...prev,
                repTel: `${value}-`
            }));
        } else if (name === "repTel2") {
            if (formattedValue.length === 7) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 7)}`;
            } else if (formattedValue.length === 8) {
                formattedValue = `${formattedValue.slice(0, 4)}-${formattedValue.slice(4, 8)}`;
            }

            const prefix = info.repTel.split('-')[0];
            const newRepTel = `${prefix}-${formattedValue}`;

            setInfo(prev => ({
                ...prev,
                repTel: newRepTel
            }));

        }


        else if (name === "repIdNum" || name === "corpNum") {
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

        else if (name === "businessNum") {
            // Add hyphen for businessNum
            if (formattedValue.length >= 3 && formattedValue.length <= 5) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
            } else if (formattedValue.length > 5) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 5)}-${formattedValue.slice(5)}`;
            }
            setInfo(prev => ({
                ...prev,
                businessNum: formattedValue
            }));
        }


    };

    const handleUpdate = async (e) => {
        if (idForForm) {
            try {
                await modifyCompanyMgmt(info);
                alert("회사 데이터가 수정되었습니다.");
                dispatch(companyActions.hideForm());
                window.location.reload();
            } catch (error) {
                console.error("Error updating company data:", error);
            }
    

            
        } else {
            try {
                await addCompanyMgmt(info);
                alert("회사 데이터가 저장되었습니다.");
                dispatch(companyActions.hideForm());
                window.location.reload();
            }catch (error) {
                console.error("Error adding company data:", error);
            }
        }
    };




    const handleCombinedChange = (e) => {
        handleChange(e);
        if (e.target.name === 'repTel' || e.target.name === 'repIdNum' || e.target.name === 'corpNum' || e.target.name === 'businessNum') {
            handleHyphenChange(e);
        }
    };


    const validateBusinessNum = (businessNum) => {
        const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5];

        // '-' 또는 공백 제거
        const formattedValue = businessNum.replace(/[-\s]/g, '');

        // 길이가 10인지 확인
        if (formattedValue.length !== 10) {
            console.log("Failed: Length is not 10");
            return false;
        }

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += Number(formattedValue[i]) * weights[i];
        }


        const lastCalc = Math.floor((Number(formattedValue[8]) * 5) / 10);

        sum += lastCalc;



        const lastDigit = (10 - (sum % 10)) % 10;  // 나머지 연산자를 한 번 더 사용하여 결과가 10일 경우 0으로 만듭니다.


        const isValid = lastDigit === Number(formattedValue[9]);


        return isValid;
    };



    const handleSubmit = async (e) => {
        const requiredFields = [
            'code', 'name','enabledYn',
            'repName', 'repIdNum', 'repTel',
            'businessNum', 'corpNum', 'establishmentDate',
            'openingDate', 'address'
        ]; // 필수 입력 필드 목록


        const isEmptyField = requiredFields.some(field => {
            const value = info[field];
            if (field === "enabledYn") {
                return value !== true && value !== false;
            }
            return !value || value === 'direct' || value === null;
        });

        const [prefix, repTel2] = info.repTel.split('-');

        if (isEmptyField ||
            prefix === "direct" || info.corpType === "direct" ||
            prefix === "" || info.corpType === "" ||
            !repTel2 || repTel2.trim() === "") {
            console.log(info);
            alert("모든 필드를 채워주세요.");
            console.log('isEmptyField: ', isEmptyField);
            return;
        }

        if (info.repIdNum.length !== 14 || !info.repIdNum.includes('-') ||
            info.corpNum.length !== 14 || !info.corpNum.includes('-')) {
            alert("대표자주민등록번호와 법인번호는 '-'를 포함한 14자리여야 합니다.");
            return;
        }

        const openingDate = new Date(info.openingDate);
        const closingDate = info.closingDate ? new Date(info.closingDate) : null;

        if (closingDate && openingDate > closingDate) {
            alert("폐업일은 개업일 이후의 날짜여야 합니다.");
            return;
        }

        if (info.businessNum) {
            if (!validateBusinessNum(info.businessNum)) {
                alert("사업자번호가 잘못되었습니다");
                return;
            }
        }
        if (isNaN(Number(info.code))) {
            alert("회사코드는 숫자만 입력할 수 있습니다");
            return;
        }

        
        dispatch(companyActions.updateInfo(info));
     
        handleUpdate(e);
        console.log(info);




    };


    return (
        <Container>

            <CompanyMgmtInfo handleSubmit={handleSubmit} isCodeDisabled={!!idForForm} idForForm={idForForm} />
            <InputContainer>
                <Label>소속회사</Label>
                <Select name="parId" value={info.parId ||''} onChange={handleChange}>
                    <option value="">없음</option>
                    {companyOptions.map((company, index) => (
                        <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                </Select>
            </InputContainer>

            <HalfInputContainer>
                <FormInput label="회사코드" name="code" maxLength={6} value={info.code || ''} disabled={!!idForForm} onChange={handleChange} />
                <InputContainer>
                    <Label>사용여부</Label>
                    <label>
                        <Input type="radio" name="enabledYn" value="true" checked={info.enabledYn === true} onChange={handleChange} />사용
                    </label>
                    <label>
                        <Input type="radio" name="enabledYn" value="false" checked={info.enabledYn === false} onChange={handleChange} />미사용
                    </label>
                </InputContainer>
            </HalfInputContainer>

            <FormInput label="회사명" name="name" value={info.name || ''} onChange={handleChange} />


            <FormInput label="회사약칭" name="abbr" value={info.abbr || ''} onChange={handleChange} />
            <FormInput label="업태" name="businessType" value={info.businessType || ''} onChange={handleChange} />
            <HalfInputContainer>
                <FormInput label="대표자명" name="repName" value={info.repName || ''} onChange={handleChange} />
                <HalfInputContainer>
                    <FormInput label="대표자주민등록번호" name="repIdNum" value={info.repIdNum || ''} onChange={handleCombinedChange} placeholder="______-_______" />
                </HalfInputContainer>
            </HalfInputContainer>

            <HalfInputContainer style={{ borderBottom: "1px solid lightgrey" }}>
                <Label>대표자번호</Label>
                <PrefixSelect name="repTel1" value={info.repTel.split('-')[0] || "direct"} onChange={handleHyphenChange}>
                    <option value="direct">선택</option>
                    <option value="010">010</option>
                    <option value="051">051</option>
                    <option value="02">02</option>
                </PrefixSelect>
                <Input
                    name="repTel2"
                    value={info.repTel.slice(4, info.repTel.length) || ''}
                    onChange={handleHyphenChange}
                    placeholder='-'
                    maxLength={9}
                    disabled={info.repTel.split('-')[0] === 'direct'}
                />
            </HalfInputContainer>

            <HalfInputContainer>
                <HalfInputContainer>
                    <FormInput label="사업자번호" name="businessNum" value={info.businessNum || ''} onChange={handleCombinedChange} placeholder="___-__-_____" maxLength={12} />
                </HalfInputContainer>
                <HalfInputContainer>
                    <Label>법인번호</Label>
                    <PrefixSelect name="corpType" value={info.corpType || "direct"} onChange={handleChange}>
                        <option value="direct">선택</option>
                        <option value="1">개인</option>
                        <option value="2">법인</option>
                    </PrefixSelect>
                    <Input name="corpNum" value={info.corpNum || ''} onChange={handleCombinedChange} placeholder="______-_______" />
                    {/* // Limit to 9 characters including dash   */}
                </HalfInputContainer>
            </HalfInputContainer>

            <HalfInputContainer>
                <FormInput label="설립일" name="establishmentDate" type="date" value={info.establishmentDate || ''} onChange={handleChange} />
                <DoubleInputContainer>
                    <Label>개/폐업일</Label>
                    <Input name="openingDate" type="date" value={info.openingDate || ''} onChange={handleChange} />
                    <span>/</span>
                    <Input name="closingDate" type="date" value={info.closingDate || ''} onChange={handleChange} />
                </DoubleInputContainer>
            </HalfInputContainer>

            <FormInput label="주소" name="address" value={info.address || ''} onChange={handleChange} />


        </Container>
    );
}