import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CompanyMgmtInfo from './CompanyMgmtInfo';
import { styled } from 'styled-components'

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
import { addCompanyMgmt, checkCEOSignUp, getCompanyMgmtList, getCompanyMgmtNameTreeList, modifyCompanyMgmt } from '../../api/companymgmt';
import { StyledButton } from '../Commons/StyledButton';
import { checkLoginId, checkSignUp, getEmployeeDetailsById } from '../../api/employeemgmt';

export default function CompanyMgmtForm({ pageId }) {
    const dispatch = useDispatch();
    const reduxCompanyInfo = useSelector(state => state.companyMgmt.companyInfo);
    const isVisible = useSelector(state => state.companyMgmt.isVisible);
    const idForForm = useSelector(state => state.companyMgmt.idForForm);
    const [companyOptions, setCompanyOptions] = useState([]); // 회사 옵션을 담을 상태
    const [info, setInfo] = useState(reduxCompanyInfo);
    const isDuplicated = useSelector(state => state.companyMgmt.isDuplicated);
    const isSignUpChecked = useSelector(state => state.companyMgmt.isSignUpChecked);
    const [privEmail1, setPrivEmail1] = useState('');
    const [privEmail2, setPrivEmail2] = useState('');

 

    useEffect(() => {
             
        if (reduxCompanyInfo && reduxCompanyInfo.privEmail) {
            const [email1, email2] = reduxCompanyInfo.privEmail.split('@');
            setPrivEmail1(email1);
            setPrivEmail2('@' + email2);
        } else {
            // 만약 privEmail이 없거나 null이라면, 초기값으로 설정
            setPrivEmail1('');
            setPrivEmail2('');
        }
        setInfo((prev)=>
        ({...prev,
        ...reduxCompanyInfo}));
    }, [reduxCompanyInfo, isVisible]);


    useEffect(() => {
        fetchCompanyOptions()
        .then(()=> {
            // dispatch(companyActions.updateInfo(info));
                })
    }, []);


    useEffect(() => {
        setInfo(prev => {
            const updatedInfo = {
                ...prev,
                privEmail: privEmail1 + privEmail2
            };
            return updatedInfo;
        });


    }, [privEmail1, privEmail2]);

    useEffect(() => {
        if (idForForm != null) {
            dispatch(companyActions.setDuplicated(true))
            dispatch(companyActions.setSignUpChecked(true))
        }
    }, [idForForm]);



    const fetchCompanyOptions = async () => {
        try {
            const companyList = await getCompanyMgmtNameTreeList(pageId);
            setCompanyOptions(companyList);
            if (companyList && companyList.length > 0) {
                setInfo(prev => ({
                    ...prev,
                    parId: companyList[0].id
                }));
            }
    
        } catch (error) {
            console.error("Error fetching company data:", error);
        }
    };
    
    

    if (!isVisible) return null;
    if (!info) {
        return <div>데이터를 가져오지 못했습니다.</div>;  // 에러 메시지
    }


    console.log("reduxCompanyInfo", reduxCompanyInfo);
    console.log("info", info);



    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue;

        if (name === "repName" && value.includes(" ")) {
            return; // 공백이 포함되면 아무것도 하지 않음
        }

        if (name === "enabledYn") {
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

        setInfo(prev => {
            const updatedInfo = {
                ...prev,
                [name]: finalValue,

            };

            return updatedInfo;

        });
    };


    const handleHyphenChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, '');

        console.log('일어나냐 제대로', value);
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
            const rawValue = formattedValue.replace(/\D/g, ''); // Remove all non-numeric characters

            if (rawValue.length <= 3) {
                formattedValue = rawValue;
            } else if (rawValue.length <= 5) {
                formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(3)}`;
            } else {
                formattedValue = `${rawValue.slice(0, 3)}-${rawValue.slice(3, 5)}-${rawValue.slice(5)}`;
            }

            setInfo(prev => ({
                ...prev,
                businessNum: formattedValue
            }));
        }



    };


    const handleEmailChange = (e) => {
        const { name, value } = e.target;

        if (name === 'privEmail1') {
            const regex = /^[a-zA-Z0-9_]{0,48}$/;
            if (!regex.test(value)) return;
            setPrivEmail1(value);

            setInfo(prev => {
                const updatedInfo = {
                    ...prev,
                    privEmail: value + (prev.privEmail2 || '')  // 여기 수정
                };

                return updatedInfo;
            });
        } else if (name === 'privEmail2') {
            setPrivEmail2(value);  // 이 부분 추가

            setInfo(prev => {
                const updatedInfo = {
                    ...prev,
                    privEmail: (prev.privEmail1 || '') + value  // 여기 수정
                };

                return updatedInfo;
            });
        };
    };


    const handleUpdate = async (e) => {
        if (idForForm) {
            try {
                await modifyCompanyMgmt(info, pageId);
                alert("회사 데이터가 수정되었습니다.");
                dispatch(companyActions.hideForm());
                window.location.reload();
            } catch (error) {
                if (error.message === "Circular reference detected") {
                    alert("자신의 하위회사를 상위회사로 지정할 수 없습니다.");
                    return;
                }
                console.error("Error updating company data:", error);
            }



        } else {
            try {
                const response = await addCompanyMgmt(info, pageId);
                if (response === 409) {
                    return;
                }
                else {
                    alert("회사 데이터가 저장되었습니다.");
                    dispatch(companyActions.hideForm());
                    window.location.reload();
                }
            } catch (error) {
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
        var selectElement = document.getElementById('parId');
        var selectedValue = selectElement.value;
        console.log("useffect로 확인하기",selectedValue);



        dispatch(companyActions.updateInfo({
                ...info,
                parId: selectedValue
        }));



        console.log("info 확인",info);
        if (!idForForm) {
            console.log("isSignUpChecked", isSignUpChecked);
            if (isSignUpChecked === false) {
                alert("가입확인을 해주세요.");
                return;
            }

            console.log("isDuplicated", isDuplicated);
            if (isDuplicated === false) {
                alert("아이디 중복확인을 해주세요.");
                return;
            }
        }

        const requiredFields = [
            'code', 'name', 'enabledYn',
            'repName', 'repIdNum', 'repTel',
            'businessNum', 'corpNum', 'establishmentDate',
            'openingDate', 'address', 'loginId', 'loginPw', 'gender', 'privEmail'
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
        if (info.privEmail && !info.privEmail.includes('@')) {
            console.log('privEmail:', info.privEmail);
            alert("이메일에 도메인이 포함되어야 합니다.");
            return;
        }

        const openingDate = new Date(info.openingDate);
        const closingDate = info.closingDate ? new Date(info.closingDate) : null;
        const establishmentDate = new Date(info.establishmentDate);
        if (establishmentDate > openingDate) {
            alert("개업일은 설립일 이후의 날짜여야 합니다.");
            return;
        }

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
        // if (closingDate != null) {
        //     const isConfirmed = window.confirm("폐업일 입력시 데이터가 삭제됩니다. 삭제하시겠습니까?");
        //     if (!isConfirmed) {
        //         return; // If user clicks "취소", exit the method
        //     }
        //     // If user clicks "확인", continue with the following logic
        // }


        dispatch(companyActions.updateInfo(info));

        handleUpdate(e);
        console.log(info);




    };


    const validateInput = (value, fieldName) => {
        if (!value || value.trim() === "") {
            return `${fieldName}을(를) 입력해주세요.`;
        }
        return null;
    };


    const handleSignUpCheck = async () => {
        const repNameError = validateInput(info.repName, '이름');
        const repIdNumError = validateInput(info.repIdNum, '주민등록번호');
        const privEmailError = validateInput(info.privEmail, '개인 이메일');
        const repTelError = validateInput(info.repTel, '휴대전화번호');

        const errors = [repNameError, repIdNumError, privEmailError, repTelError].filter(Boolean);
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }


        if (!info.privEmail || info.privEmail.includes('undefined') || !info.privEmail.includes('@')) {
            console.log('privEmail:', info.privEmail);
            alert("이메일에 도메인이 포함되어야 합니다.");
            return;
        }

        if (info.repIdNum && (info.repIdNum.length !== 14 || !info.repIdNum.includes('-'))) {
            alert("주민등록번호는 '-'를 포함한 14자리여야 합니다.");
            return;
        }


        if (!info.repName || info.repName.trim() === "" || !info.repIdNum || info.repIdNum.trim() === ""
            || !info.privEmail || info.privEmail.trim() === "" || !info.repTel || info.repTel.trim() === "") {
            alert('공백을 제거해주세요.');
            return;
        }


        // 중복된 정보가 있는지 확인


        const signUpInfo = {
            repName: info.repName,
            repIdNum: info.repIdNum,
            privEmail: info.privEmail,
            repTel: info.repTel
        };
        console.log("signUpInfo", signUpInfo);



        // 중복 확인 API 요청 로직 구현
        const response = await checkCEOSignUp(signUpInfo, pageId.pageId);
        console.log("사인업체크 제대로 되는지 아마 안될듯", response);
        if (response == null) {
            return;
        };



        if (response.data === "No data found") {

            dispatch(companyActions.setSignUpChecked(true)); // 중복 확인된 경우 리덕스 상태 업데이트
            return;
        } else if (response[0].id !== null) {

            alert('이미 가입된 유저 입니다.');
   
            // console.log("가입된 유저", response);
            // if (!response[0].id) {
            //     console.error("No data returned for employee ID:", response[0].id);
            //     return;
            // }
            dispatch(companyActions.setSignUpChecked(true));
            dispatch(companyActions.setDuplicated(true));

            // dispatch(companyActions.updateInfo(response[0]));
 
           setInfo((prev)=>({...prev, 
            employeeId: response[0].id,
            gender: response[0].gender,
            loginId: response[0].loginId,
            loginPw: response[0].loginPw,
        }));

        } else {
            console.error("Unexpected response:", response);
        }
        
    }

    const handleLoginIdCheck = async () => {
        // 공백 체크
        if (!info.loginId || info.loginId.trim() === "") {
            alert('아이디에 공백이 있습니다. 올바른 아이디를 입력해주세요.');
            return; // 여기서 함수를 종료하여 아래의 로직을 실행하지 않습니다.
        }

        console.log("알아보자 메뉴아이디 :", pageId.pageId);
        // 중복 확인 API 요청 로직 구현
        const response = await checkLoginId(info.loginId, pageId.pageId);

        if (response) {
            alert('중복된 아이디입니다. 다시 시도해주세요.');
            dispatch(companyActions.setDuplicated(false)); // 중복 확인되지 않은 경우 리덕스 상태 업데이트

        } else {
            alert('사용 가능한 아이디입니다.');
            console.log(isDuplicated);
            dispatch(companyActions.setDuplicated(true)); // 중복 확인된 경우 리덕스 상태 업데이트
        }
    }

    return (

        <Container>
            <CompanyMgmtInfo handleSubmit={handleSubmit} isCodeDisabled={!!idForForm} idForForm={idForForm} pageId={pageId} />
            <HalfInputContainer>
                <FormInput label="대표자명" name="repName" value={info.repName || ''} disabled={isSignUpChecked} onChange={handleChange} maxLength={19} />

                <HalfInputContainer>
                    <FormInput label="대표자주민등록번호" name="repIdNum" value={info.repIdNum || ''} disabled={isSignUpChecked} onChange={handleCombinedChange} placeholder="______-_______" />
                </HalfInputContainer>
            </HalfInputContainer>
            <HalfInputContainer style={{ borderBottom: "1px solid lightgrey" }}>
                <DoubleInputContainer>
                    <FormInput customStyle={{ border: "none" }}
                        label="대표자 이메일"
                        name="privEmail1"
                        value={privEmail1 || ''}
                        onChange={handleEmailChange}
                        disabled={isSignUpChecked} />

                    <Select style={{ width: "300px" }} name="privEmail2" value={privEmail2 || ''} onChange={handleEmailChange} disabled={isSignUpChecked}>

                        <option value="">선택</option>
                        <option value="@naver.com">@naver.com</option>
                        <option value="@daum.com">@daum.com</option>
                        <option value="@google.com">@google.com</option>
                        <option value="@email.com">@email.com</option>
                    </Select>
                </DoubleInputContainer>

            </HalfInputContainer>

            <HalfInputContainer style={{ borderBottom: "1px solid lightgrey" }}>
                <Label>대표자번호</Label>
                <PrefixSelect name="repTel1" value={info.repTel.split('-')[0] || "direct"} onChange={handleHyphenChange} disabled={isSignUpChecked}>
                    <option value="direct">선택</option>
                    <option value="010">010</option>
                    <option value="051">051</option>
                    <option value="031">031</option>
                </PrefixSelect>
                <Input
                    name="repTel2"
                    value={info.repTel.slice(4, info.repTel.length) || ''}
                    onChange={handleHyphenChange}
                    placeholder='______-_______'
                    maxLength={9}
                    disabled={info.repTel.split('-')[0] === 'direct' || isSignUpChecked}
                />
                <StyledButton name="signcheck" value="signcheck"
                    onClick={handleSignUpCheck}
                    disabled={isSignUpChecked || idForForm}
                >가입 확인</StyledButton>
            </HalfInputContainer>

            <InputContainer>
                <Label>대표자 성별</Label>
                <label>
                    <Input type="radio" name="gender" value="여성" checked={info.gender === "여성"} onChange={handleChange} disabled={info.employeeId !== null || idForForm} />여성
                </label>
                <label>
                    <Input type="radio" name="gender" value="남성" checked={info.gender === "남성"} 
                    onChange={handleChange} disabled={info.employeeId !== null || idForForm} />남성
                </label>
            </InputContainer>
            <HalfInputContainer style={{ borderBottom: "1px solid lightgrey" }}>
                <FormInput customStyle={{ border: "none" }} label="로그인ID" name="loginId" value={info.loginId || ''} onChange={handleChange} disabled={info.employeeId !== null || idForForm || isDuplicated  } />
                <StyledButton name="duplicatecheck" value="duplicatecheck"
                    onClick={handleLoginIdCheck}
                    disabled={ info.employeeId !== null || isDuplicated || idForForm  }>중복확인</StyledButton>
                <FormInput customStyle={{ border: "none" }} label="로그인PW" name="loginPw" type="password" value={info.loginPw || ''} onChange={handleChange} disabled={info.employeeId !== null || idForForm  }
                />
            </HalfInputContainer>

            <InputContainer>
                <Label>소속회사</Label>

                <Select name="parId" id="parId" value={info.parId!=''? info.parId : (companyOptions[0]?.id || '')} onChange={handleChange} disabled={!isSignUpChecked}>
                    <option value="direct">선택</option>
                    {companyOptions.map((company, index) => (
                        <option key={company.id} value={company.id}>{company.nameTree}
                        {console.log('company' , company.id)}
                        </option>
                    ))}
                </Select>
            </InputContainer>

            <HalfInputContainer>
                <FormInput label="회사코드" name="code" maxLength={6} value={info.code || ''} disabled={!!idForForm || !isSignUpChecked} onChange={handleChange} />
                <InputContainer>
                    <Label>사용여부</Label>
                    <label>
                        <Input type="radio" name="enabledYn" value="true" checked={info.enabledYn === true} onChange={handleChange} disabled={!isSignUpChecked} />사용
                    </label>
                    <label>
                        <Input type="radio" name="enabledYn" value="false" checked={info.enabledYn === false} onChange={handleChange} disabled={!isSignUpChecked} />미사용
                    </label>
                </InputContainer>
            </HalfInputContainer>

            <FormInput label="회사명" name="name" value={info.name || ''} onChange={handleChange} maxLength={99} disabled={!isSignUpChecked} />

            <FormInput label="회사약칭" name="abbr" value={info.abbr || ''} onChange={handleChange} maxLength={49} disabled={!isSignUpChecked} />
            <FormInput label="업태" name="businessType" value={info.businessType || ''} onChange={handleChange} maxLength={49} disabled={!isSignUpChecked} />



            <HalfInputContainer>
                <HalfInputContainer>
                    <FormInput label="사업자번호" name="businessNum" value={info.businessNum || ''} disabled={!!idForForm || !isSignUpChecked} onChange={handleCombinedChange} placeholder="___-__-_____" maxLength={12} />
                </HalfInputContainer>
                <HalfInputContainer>
                    <Label>법인등록번호</Label>
                    <PrefixSelect name="corpType" value={info.corpType || "direct"} disabled={!!idForForm || !isSignUpChecked} onChange={handleChange}>
                        <option value="direct">선택</option>
                        <option value="1">개인</option>
                        <option value="2">법인</option>
                    </PrefixSelect>
                    <Input name="corpNum" value={info.corpNum || ''} disabled={!!idForForm || !isSignUpChecked} onChange={handleCombinedChange} placeholder="______-_______" />
                    {/* // Limit to 9 characters including dash   */}
                </HalfInputContainer>
            </HalfInputContainer>

            <HalfInputContainer>
                <FormInput
                    label="설립일"
                    name="establishmentDate"
                    type="date"
                    value={info.establishmentDate || ''}
                    onChange={handleChange}
                    disabled={!isSignUpChecked}
                />

                <DoubleInputContainer>
                    <Label>개/폐업일</Label>
                    <Input
                        name="openingDate"
                        type="date"
                        value={info.openingDate || ''}
                        onChange={handleChange}
                        disabled={!isSignUpChecked}
                    />
                    <span>/</span>
                    <Input
                        name="closingDate"
                        type="date"
                        value={info.closingDate || ''}
                        onChange={handleChange}
                        disabled={!info.openingDate || !info.establishmentDate || !isSignUpChecked}
                    />
                </DoubleInputContainer>
            </HalfInputContainer>

            <FormInput label="주소" name="address" value={info.address || ''} onChange={handleChange} maxLength={199} disabled={!isSignUpChecked} />


        </Container>

    );
}



