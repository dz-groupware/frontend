import {
    Container,
    InputContainer,
    HalfInputContainer,
    Label,
    Input,
    FormInput,
    Select,
    DoubleInputContainer,
    ImageContainer,
    ImageInput,
    ImageInputTag
} from '../Commons/StyledForm';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { employeeActions } from '../../utils/Slice';
import StyledButton from '../Commons/StyledButton';
import { MdOutlineAttachFile } from 'react-icons/md';
import { BsPersonBoundingBox } from 'react-icons/bs';


export default function EmployeeMgmtBasicForm() {
    const dispatch = useDispatch();
    const reduxEmployeeBasicInfo = useSelector(state => state.employeeMgmt.employeeBasicInfo);
    // const idForForm = useSelector(state => state.companyMgmt.idForForm);
    const [info, setInfo] = useState(reduxEmployeeBasicInfo);
    const isVisible = useSelector(state => state.employeeMgmt.isVisible);
    const [privEmail1, setPrivEmail1] = useState('');
    const [privEmail2, setPrivEmail2] = useState('');
    const [isSignUpChecked, setIsSignUpChecked] = useState(false);  // 가입 확인 상태
    const [isLoginIdChecked, setIsLoginIdChecked] = useState(false); // 로그인 ID 중복확인 상태
    const isDataFetched = useSelector(state => state.employeeMgmt.idForForm);
    const fileInput = React.useRef(null);

    useEffect(() => {


        if (reduxEmployeeBasicInfo && reduxEmployeeBasicInfo.privEmail) {
            const [email1, email2] = reduxEmployeeBasicInfo.privEmail.split('@');
            setPrivEmail1(email1);
            setPrivEmail2('@' + email2);
        } else {
            // 만약 privEmail이 없거나 null이라면, 초기값으로 설정
            setPrivEmail1('');
            setPrivEmail2('');
        }
        setInfo(reduxEmployeeBasicInfo);
    }, [reduxEmployeeBasicInfo, isVisible]);



    useEffect(() => {
        setInfo(prev => {
            const updatedInfo = {
                ...prev,
                privEmail: privEmail1 + privEmail2
            };
            return updatedInfo;
        });


    }, [privEmail1, privEmail2]);





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

        setInfo(prev => {
            const updatedInfo = {
                ...prev,
                [name]: finalValue,

            };
            console.log(updatedInfo);

            return updatedInfo;
        });
    };


    const handleHyphenChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value.replace(/\D/g, '');

        if (name === "empIdNum") {
            if (formattedValue.length === 6 && value.charAt(6) === '-') {
                formattedValue = formattedValue.slice(0, 6);
            } else if (formattedValue.length > 6) {
                formattedValue = `${formattedValue.slice(0, 6)}-${formattedValue.slice(6)}`;
            }
            formattedValue = formattedValue.slice(0, 14);
            setInfo(prev => {
                const updatedInfo = {
                    ...prev,
                    [name]: formattedValue,
                };

                return updatedInfo;
            });
        };


        if (name === "mobileNumber") {
            if (formattedValue.length === 4) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
            } else if (formattedValue.length > 4 && formattedValue.length <= 7) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 7)}`;
            } else if (formattedValue.length > 7) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 7)}-${formattedValue.slice(7)}`;
            }
            setInfo(prev => {
                const updatedInfo = {
                    ...prev,
                    mobileNumber: formattedValue,
                };

                return updatedInfo;
            });
        };


        if (name === "homeNumber") {
            if (formattedValue.length === 4) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
            } else if (formattedValue.length > 4 && formattedValue.length <= 7) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 7)}`;
            } else if (formattedValue.length > 7) {
                formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 7)}-${formattedValue.slice(7)}`;
            }
            setInfo(prev => {
                const updatedInfo = {
                    ...prev,
                    homeNumber: formattedValue,
                };

                return updatedInfo;
            });
        };
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

    const handleSignUpCheck = async () => {
    }

    // 로그인 ID 중복 확인 버튼 클릭 시 중복 확인 로직 후 상태 업데이트
    const handleLoginIdCheck = async () => {
        // TODO: 중복 확인 API 요청 로직 구현
        // 예: const response = await checkLoginId(info.loginId);
        // if (response.isAvailable) {
        //     setIsLoginIdChecked(true);
        // }
    }



    const handleButtonClick = e => {
        fileInput.current.click();
    };





    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setInfo(prev => ({ ...prev, imageUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };




    const handleBlur = (e) => {
        const { name } = e.target;
        const privEmail1Value = document.querySelector("[name='privEmail1']").value;
        const privEmail2Value = document.querySelector("[name='privEmail2']").value;

        if (name === "privEmail1") {
            if (privEmail2Value !== "direct" && privEmail2Value !== null && privEmail2Value !== "") {
                dispatch(employeeActions.updateBasicInfo(info));
            }
        } else if (name === "privEmail2") {
            if (privEmail1Value !== null && privEmail1Value !== "") {
                dispatch(employeeActions.updateBasicInfo(info));
            }
        } else {
            dispatch(employeeActions.updateBasicInfo(info));
        }
        
    };

    return (

        <Container>
            <EmployeeMgmtBasicInputForm>
                <HalfInputContainer>
                    <FormInput label="이름" name="name" value={info.name || ''} onChange={handleChange} onBlur={handleBlur} />

                    <FormInput label="주민등록번호" name="empIdNum" value={info.empIdNum || ''} onChange={handleHyphenChange} onBlur={handleBlur} />


                </HalfInputContainer>

                <HalfInputContainer style={{ borderBottom: "1px solid lightgrey" }}>
                    <DoubleInputContainer>
                        <FormInput customStyle={{ border: "none" }} label="개인 이메일" name="privEmail1" value={privEmail1 || ''} onChange={handleEmailChange} />

                        <Select style={{ width: "300px" }} name="privEmail2" value={privEmail2 || ''} onChange={handleEmailChange}>

                            <option value="">선택</option>
                            <option value="@naver.com">@naver.com</option>
                            <option value="@daum.com">@daum.com</option>
                            <option value="@google.com">@google.com</option>
                            <option value="@email.com">@email.com</option>
                        </Select>
                    </DoubleInputContainer>

                    <StyledButton name="signcheck" value="signcheck"
                        onClick={handleSignUpCheck}
                        disabled={isSignUpChecked || isDataFetched}
                        onBlur={handleBlur}
                    >가입 확인</StyledButton>
                </HalfInputContainer>


                <HalfInputContainer>
                    <ImageInputTag label="사진" name="imageUrl" readOnly onChange={handleChange} onBlur={handleBlur} />
                    <ImageContainer>
                        {
                            info.imageUrl
                                ? <img src={info.imageUrl} alt="Preview" style={{ width: '120px', height: '120px' }} />
                                : <BsPersonBoundingBox style={{ width: '110px', height: '110px', color: 'gray' }} />
                        }
                        <StyledButton onClick={handleButtonClick} style={{ width: "50px", height: "50px", margin: "10px" }}><MdOutlineAttachFile style={{ width: "30px", height: "30px" }} /></StyledButton>
                        <input type="file" ref={fileInput} onChange={handleFileChange} style={{ display: "none" }} />
                    </ImageContainer>
                </HalfInputContainer>
                <HalfInputContainer>

                    <InputContainer>
                        <Label>성별</Label>
                        <label>
                            <Input type="radio" name="gender" value="여성" checked={info.gender === "여성"} onChange={handleChange} onBlur={handleBlur} />여성
                        </label>
                        <label>
                            <Input type="radio" name="gender" value="남성" checked={info.gender === "남성"} onChange={handleChange} onBlur={handleBlur} />남성
                        </label>
                    </InputContainer>


                    <InputContainer>
                        <Label>계정 사용여부</Label>
                        <label>
                            <Input type="radio" name="accountYn" value="true" checked={info.accountYn === true} onChange={handleChange} onBlur={handleBlur} />사용
                        </label>
                        <label>
                            <Input type="radio" name="accountYn" value="false" checked={info.accountYn === false} onChange={handleChange} onBlur={handleBlur} />미사용
                        </label>
                    </InputContainer>

                </HalfInputContainer>






                <HalfInputContainer style={{ borderBottom: "1px solid lightgrey" }}>
                    <FormInput customStyle={{ border: "none" }} label="로그인ID" name="loginId" value={info.loginId || ''} onChange={handleChange} disabled={isDataFetched} onBlur={handleBlur} />
                    <StyledButton name="duplicatecheck" value="duplicatecheck"
                        onClick={handleLoginIdCheck}
                        disabled={isLoginIdChecked || isDataFetched}>중복확인</StyledButton>
                    <FormInput customStyle={{ border: "none" }} label="로그인PW" name="loginPw" type="password" value={info.loginPw || ''} onChange={handleChange} disabled={isDataFetched} onBlur={handleBlur} />
                </HalfInputContainer>



                <HalfInputContainer>
                    <FormInput label="휴대전화번호" name="mobileNumber" value={info.mobileNumber || ''} onChange={handleHyphenChange} onBlur={handleBlur} />
                    <FormInput label="전화번호(집)" name="homeNumber" value={info.homeNumber || ''} onChange={handleHyphenChange} onBlur={handleBlur} />

                </HalfInputContainer>


                <FormInput label="주소" name="address" value={info.address || ''} onChange={handleChange} onBlur={handleBlur} />


                <HalfInputContainer>
                    <FormInput label="입사일" name="joinDate" type="date" value={info.joinDate || ''} onChange={handleChange} onBlur={handleBlur} />
                    <FormInput label="퇴사일" name="resignationDate" type="date" value={info.resignationDate || ''} onChange={handleChange} onBlur={handleBlur} />

                </HalfInputContainer>


            </EmployeeMgmtBasicInputForm>


        </Container>

    );
}




const EmployeeMgmtBasicInputForm = styled.div`
  border-top : 2px solid black;
  margin-top : 10px;
  width : 100%;
`;