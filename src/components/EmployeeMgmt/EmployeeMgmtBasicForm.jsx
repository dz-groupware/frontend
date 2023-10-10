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
import { MdOutlineAttachFile } from 'react-icons/md';
import { BsPersonBoundingBox } from 'react-icons/bs';
import { checkDuplicates, checkLoginId, checkSignUp, getEmployeeDetailsById } from '../../api/employeemgmt';
import { StyledButton } from '../Commons/StyledButton';


export default function EmployeeMgmtBasicForm({ pageId }) {
    const dispatch = useDispatch();
    const reduxEmployeeBasicInfo = useSelector(state => state.employeeMgmt.employeeBasicInfo);
    // const idForForm = useSelector(state => state.companyMgmt.idForForm);
    const [info, setInfo] = useState(reduxEmployeeBasicInfo);
    const isVisible = useSelector(state => state.employeeMgmt.isVisible);
    const [privEmail1, setPrivEmail1] = useState('');
    const [privEmail2, setPrivEmail2] = useState('');
    const isDataFetched = useSelector(state => state.employeeMgmt.idForForm);
    const isDuplicated = useSelector(state => state.employeeMgmt.isDuplicated);
    const isSignUpChecked = useSelector(state => state.employeeMgmt.isSignUpChecked);
    const fileInput = React.useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const DEFAULT_IMAGE_URL = "https://yourdomain.com/path-to-default-image.jpg"; // 여기에 기본 이미지 URL을 지정하세요.






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

    useEffect(() => {
        if (isDataFetched != null) {
            dispatch(employeeActions.setDuplicated(true))
            dispatch(employeeActions.setSignUpChecked(true))
        }
    }, [isDataFetched]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        let finalValue;


        if (name === "name" && value.includes(" ")) {
            return; // 공백이 포함되면 아무것도 하지 않음
        }

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




    const validateInput = (value, fieldName) => {
        if (!value || value.trim() === "") {
            return `${fieldName}을(를) 입력해주세요.`;
        }
        return null;
    };



    const handleSignUpCheck = async () => {
        const nameError = validateInput(info.name, '이름');
        const empIdNumError = validateInput(info.empIdNum, '주민등록번호');
        const privEmailError = validateInput(info.privEmail, '개인 이메일');
        const mobileNumberError = validateInput(info.mobileNumber, '휴대전화번호');

        const errors = [nameError, empIdNumError, privEmailError, mobileNumberError].filter(Boolean);
        if (errors.length > 0) {
            alert(errors.join('\n'));
            return;
        }


        if (!info.privEmail || info.privEmail.includes('undefined') || !info.privEmail.includes('@')) {
            console.log('privEmail:', info.privEmail);
            alert("이메일에 도메인이 포함되어야 합니다.");
            return;
        }

        if (info.empIdNum && (info.empIdNum.length !== 14 || !info.empIdNum.includes('-'))) {
            alert("주민등록번호는 '-'를 포함한 14자리여야 합니다.");
            return;
        }


        if (!info.name || info.name.trim() === "" || !info.empIdNum || info.empIdNum.trim() === ""
            || !info.privEmail || info.privEmail.trim() === "" || !info.mobileNumber || info.mobileNumber.trim() === "") {
            alert('공백을 제거해주세요.');
            return;
        }


        // 중복된 정보가 있는지 확인


        const signUpInfo = {
            name: info.name,
            empIdNum: info.empIdNum,
            privEmail: info.privEmail,
            mobileNumber: info.mobileNumber
        };
        console.log("signUpInfo", signUpInfo);


        console.log("이이이이이이잉빕", pageId.pageId);

        // 중복 확인 API 요청 로직 구현
        const response = await checkSignUp(signUpInfo, pageId.pageId);
        console.log("사인업체크 제대로 되는지 아마 안될듯", response);
        if (response == null) {
            return;
        };



        if (response.data === "No data found") {

            dispatch(employeeActions.setSignUpChecked(true)); // 중복 확인된 경우 리덕스 상태 업데이트
            return;
        } else if (response[0].id !== null) {

            alert('이미 가입된 유저 입니다.');
            dispatch(employeeActions.setSignUpChecked(true));
            try {


                const fetchedEmployeeData = await getEmployeeDetailsById(response[0].id, pageId);
                if (!fetchedEmployeeData) {
                    console.error("No data returned for employee ID:", response[0].id);
                    return;
                }

                const fetchedEmployeeArray = Object.values(fetchedEmployeeData);
                const firstEmployee = fetchedEmployeeArray[0];

                const employeeBasicInfo = {
                    id: firstEmployee.id,
                    imageUrl: firstEmployee.imageUrl,
                    name: firstEmployee.name,
                    empIdNum: firstEmployee.empIdNum,
                    gender: firstEmployee.gender,
                    accountYn: firstEmployee.accountYn,
                    loginId: firstEmployee.loginId,
                    loginPw: firstEmployee.loginPw,
                    privEmail: firstEmployee.privEmail,
                    mobileNumber: firstEmployee.mobileNumber,
                    homeNumber: firstEmployee.homeNumber,
                    address: firstEmployee.address,
                    joinDate: firstEmployee.joinDate,
                    resignationDate: firstEmployee.resignationDate
                };

                const employeeGroupInfo = fetchedEmployeeArray.map(employee => {
                    if (employee.leftDate) {
                        return {
                            departmentId: null,
                            position: null,
                            deptId: null,
                            transferredYn: null,
                            edjoinDate: null,
                            leftDate: employee.leftDate,
                            deletedYn: employee.deletedYn,
                            compId: employee.compId
                        };
                    } else {
                        return {
                            departmentId: employee.departmentId,
                            position: employee.position,
                            compId: employee.compId,
                            deptId: employee.deptId,
                            transferredYn: employee.transferredYn,
                            edjoinDate: employee.edjoinDate,
                            leftDate: employee.leftDate,
                            deletedYn: employee.deletedYn
                        };
                    }
                });

                dispatch(employeeActions.updateBasicInfo(employeeBasicInfo));
                dispatch(employeeActions.updateGroupInfo(employeeGroupInfo));

                dispatch(employeeActions.showForm({
                    employeeBasicInfo,
                    employeeGroupInfo,
                    id: employeeBasicInfo.id
                }));
            } catch (error) {
                console.error("Error fetching employee data by code:", error);
            }

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
            dispatch(employeeActions.setDuplicated(false)); // 중복 확인되지 않은 경우 리덕스 상태 업데이트

        } else {
            alert('사용 가능한 아이디입니다.');
            console.log(isDuplicated);
            dispatch(employeeActions.setDuplicated(true)); // 중복 확인된 경우 리덕스 상태 업데이트
        }
    }




    const handleButtonClick = e => {
        fileInput.current.click();
    };


    const handleFileChange = async (e) => {
        const originalImageUrl = info.imageUrl;  // 원래의 이미지 URL을 백업
        const file = e.target.files[0];
        if (file) {
            // Read the selected file using FileReader
            const MAX_FILE_SIZE = 9 * 1024 * 1024;  // 9MB
            if (file.size > MAX_FILE_SIZE) {
                alert("파일 크기가 9MB를 초과하였습니다. 다른 파일을 선택해주세요.");
                return;  // 함수를 종료
            }
            const reader = new FileReader();
            reader.onloadend = function () {
                // Use the result as the source for the preview image
                setPreviewImage(reader.result);
            }
            reader.readAsDataURL(file);
            try {
                const uploadUrl = await dispatch({
                    type: 'UPLOAD_TO_S3',
                    payload: {
                        file: file,
                        pageId: pageId.pageId
                    }
                });
                setInfo(prev => {
                    const updatedInfo = {
                        ...prev,
                        imageUrl: uploadUrl,
                    };

                    return updatedInfo;
                });
                dispatch(employeeActions.updateUploadedFile(uploadUrl));
            } catch (error) {
                console.error("Failed to upload image:", error);
                setInfo(prev => {
                    return {
                        ...prev,
                        imageUrl: originalImageUrl,  // 원래의 이미지로 되돌림
                    };
                });

            }
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

        <StyledContainer>
            <EmployeeMgmtBasicInputForm>
                <HalfInputContainer>
                    <FormInput label="이름" name="name"
                        value={info.name || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSignUpChecked}
                        maxLength={19} />


                    <FormInput label="주민등록번호"
                        name="empIdNum"
                        value={info.empIdNum || ''}
                        onChange={handleHyphenChange}
                        onBlur={handleBlur}
                        disabled={isSignUpChecked} />


                </HalfInputContainer>

                <HalfInputContainer style={{ borderBottom: "1px solid lightgrey" }}>
                    <DoubleInputContainer>
                        <FormInput customStyle={{ border: "none" }}
                            label="개인 이메일"
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

                <HalfInputContainer>
                    <FormInput label="휴대전화번호" name="mobileNumber"
                        value={info.mobileNumber || ''}
                        onChange={handleHyphenChange}
                        onBlur={handleBlur}
                        disabled={isSignUpChecked}
                        maxLength={13} />


                    <StyledButton name="signcheck" value="signcheck"
                        onClick={handleSignUpCheck}
                        disabled={isSignUpChecked || isDataFetched}
                        onBlur={handleBlur}
                    >가입 확인</StyledButton>

                    <FormInput label="전화번호(집)" name="homeNumber"
                        value={info.homeNumber || ''}
                        onChange={handleHyphenChange}
                        onBlur={handleBlur}
                        disabled={!isSignUpChecked}
                        maxLength={13} />


                </HalfInputContainer>

                <HalfInputContainer>
                    <ImageInputTag label="사진" name="imageUrl" readOnly onChange={handleChange} onBlur={handleBlur}
                        disabled={!isSignUpChecked} />
                    <ImageContainer>
                        {
                            info.imageUrl
                                ? <img src={info.imageUrl} alt="Existing" style={{ width: '120px', height: '120px' }} />
                                : previewImage
                                    ? <img src={previewImage} alt="Preview" style={{ width: '120px', height: '120px' }} />
                                    : <BsPersonBoundingBox style={{ width: '110px', height: '110px', color: 'gray' }} />
                        }
                        <StyledButton onClick={handleButtonClick} style={{ width: "50px", height: "50px", margin: "10px" }} disabled={!isSignUpChecked}><MdOutlineAttachFile style={{ width: "30px", height: "30px" }} /></StyledButton>
                        <input type="file" ref={fileInput} onChange={handleFileChange} style={{ display: "none" }} disabled={!isSignUpChecked} />
                    </ImageContainer>

                </HalfInputContainer>

                <HalfInputContainer>

                    <InputContainer>
                        <Label>성별</Label>
                        <label>
                            <Input type="radio" name="gender" value="여성" checked={info.gender === "여성"} onChange={handleChange} onBlur={handleBlur}
                                disabled={!isSignUpChecked} />여성
                        </label>
                        <label>
                            <Input type="radio" name="gender" value="남성" checked={info.gender === "남성"} onChange={handleChange} onBlur={handleBlur}
                                disabled={!isSignUpChecked} />남성
                        </label>
                    </InputContainer>


                    <InputContainer>
                        <Label>계정 사용여부</Label>
                        <label>
                            <Input type="radio" name="accountYn" value="true" checked={info.accountYn === true} onChange={handleChange} onBlur={handleBlur}
                                disabled={!isSignUpChecked} />사용
                        </label>
                        <label>
                            <Input type="radio" name="accountYn" value="false" checked={info.accountYn === false} onChange={handleChange} onBlur={handleBlur}
                                disabled={!isSignUpChecked} />미사용
                        </label>
                    </InputContainer>

                </HalfInputContainer>




                <HalfInputContainer style={{ borderBottom: "1px solid lightgrey" }}>
                    <FormInput customStyle={{ border: "none" }} label="로그인ID" name="loginId" value={info.loginId || ''} onChange={handleChange} disabled={isDataFetched || isDuplicated || !isSignUpChecked} onBlur={handleBlur} />
                    <StyledButton name="duplicatecheck" value="duplicatecheck"
                        onClick={handleLoginIdCheck}
                        disabled={isDuplicated || isDataFetched || !isSignUpChecked}>중복확인</StyledButton>
                    <FormInput customStyle={{ border: "none" }} label="로그인PW" name="loginPw" type="password" value={info.loginPw || ''} onChange={handleChange} disabled={isDataFetched || !isSignUpChecked} onBlur={handleBlur}
                    />
                </HalfInputContainer>



                <FormInput label="주소" name="address"
                    value={info.address || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!isSignUpChecked}
                    maxLength={99} />



                <HalfInputContainer>
                    <FormInput label="입사일" name="joinDate" type="date" value={info.joinDate || ''} onChange={handleChange} onBlur={handleBlur}
                        disabled={!isSignUpChecked} />
                    <FormInput label="퇴사일" name="resignationDate" type="date" value={info.resignationDate || ''} onChange={handleChange} onBlur={handleBlur}
                        disabled={!isSignUpChecked} />

                </HalfInputContainer>


            </EmployeeMgmtBasicInputForm>


        </StyledContainer>

    );
}




const EmployeeMgmtBasicInputForm = styled.div`
  border-top : 2px solid black;
  margin-top : 10px;
  width : 99%;
`;

const StyledContainer = styled.div`
    width:100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    // overflow-y: auto;
   height:  300px;
`;