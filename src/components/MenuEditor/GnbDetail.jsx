import { useEffect, useState } from "react";

import styled from "styled-components";
import Swal from "sweetalert2";

import { AiOutlinePaperClip } from "react-icons/ai";
import { MdOutlineRefresh } from "react-icons/md";

import { saveMenuAPI, deleteMenuApi, saveIconAPI } from "../../api/menu";
import IconImageList from "./IconImageList";

import { ButtonBright, ButtonBlue } from "../../common/styles/Button";

export default function GnbDetail({ pageId, value, detailOff, on, setReRender, gnbList }) {
  const initValue = {
    id: "",
    parId: "",
    name: "",
    enabledYn: "",
    sortOrder: "",
    iconUrl: "",
  };
  const path = "https://dz-test-image.s3.ap-northeast-2.amazonaws.com/";
  const prefix = localStorage.getItem("compId")+"/";

  const [detail, setDetail] = useState(initValue);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newIconFile, setNewIconFile] = useState("");
  const [newIconUrl, setNewIconUrl] = useState(path+prefix+"default.png");
  const [iconRender, setIconRender] = useState(true);
  const [uploadImage, setUploadImage] = useState(false);

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };

  const readImage = (image) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      setNewIconUrl(e.target?.result);
    };
    reader.readAsDataURL(image);
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if ((e.dataTransfer.files[0] instanceof Blob)) {
      console.error("image is not a Blob");
      readImage(e.dataTransfer.files[0]);
      setNewIconFile(e.dataTransfer.files[0]);
      setDetail({ ...detail, iconUrl: path+prefix+e.dataTransfer.files[0]["name"]});
    };
  };
console.log(gnbList);
  const updateMenu = async () => {
    const usedName = gnbList.filter(gnb => gnb.name === detail.name);
    if (usedName.length === 0) {
      if (detail.name === "") {
        setErrorMessage("대메뉴 이름을 확인해 주세요");
      } else {
        
        const menu = new FormData();
        try {
          for (const key in detail) {
            if (detail.hasOwnProperty(key)) {
              if (key === "iconUrl" && detail["iconUrl"] === "default.png") {
                menu.set(key, path+prefix+"default.png");
              } else {
                menu.set(key, detail[key]);
              }
            }
          }
          await saveMenuAPI(pageId, menu, on).then((res) => {
            console.log(res)
            if (res.data === 1 || res.data === 10) {
              Swal.fire({
                text: "저장 되었습니다.",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: false,
              }); 
              setErrorMessage(null);
            } else {
              setErrorMessage("다시 시도해주세요. (메뉴 수정/저장 실패)");
            }
          }).catch((err) => {
            setErrorMessage("다시 시도해주세요. (메뉴 수정/저장 실패)");
          });
        } catch (error) {
          setErrorMessage("다시 시도해주세요. (메뉴 수정/저장 실패)");
        };
    
        try{
          if (newIconFile !== "") {
            setUploadImage(false);
            let formData = new FormData();
            formData.append("images", newIconFile);
            saveIconAPI(pageId, formData)
            .then(() => {
              setNewIconFile("");
              setNewIconUrl(path+prefix+"default.png");
              setErrorMessage(null);
            })
            .catch(() => {
              setErrorMessage("다시 시도해주세요. (이미지 추가 실패)");
            });
          }
        } catch (error) {
          setErrorMessage("다시 시도해주세요. (이미지 추가 실패)");
        } finally {
          setUploadImage(true);
        };
      };
    } else {
      Swal.fire({
        text: "이미 사용중인 대메뉴명입니다. ",
        icon: "cancle",
        showCancelButton: false,
        showConfirmButton: false,
      }); 
    }

  };

  const deleteMenu = () => {
    try{
      deleteMenuApi(pageId, detail.id).then(() => {
        setReRender(true);
      });
      detailOff();  
      Swal.fire({
        text: "완료되었습니다.",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: false,
      });        
    } catch (error) {
      Swal.fire({
        text: "삭제에 실패하였습니다.",
        icon: "cancle",
        showCancelButton: false,
        showConfirmButton: false,
      }); 
    };
  };

  const handleRadio = (e) => {
    setDetail({ ...detail, enabledYn: e.target.getAttribute("value") === "true"});
  };

  useEffect (() => {
    setDetail({ 
      id: value["id"], 
      parId: value["id"], 
      name: value["name"], 
      enabledYn: value["enabledYn"] === 1 || value["enabledYn"] === true, 
      sortOrder: value["sortOrder"], 
      iconUrl: value["iconUrl"], 
    });
  }, [value]);

  useEffect (() => {
    setUploadImage(false); 
    if(uploadImage) {
      setTimeout(() => setReRender(true), 1000);
    }
  }, [uploadImage]);

  return on && (
    <DetailDiv>
      <DetailTitle> 
        <p>• 대메뉴 정보</p> 
        {errorMessage && (
          <Error>
            {errorMessage}
          </Error>
        )} 
        <div>
          <ButtonBlue onClick={updateMenu}>저장</ButtonBlue>
          <ButtonBright onClick={deleteMenu}>삭제</ButtonBright>
          <Pipe />
          <span onClick={detailOff}>X</span>
        </div>
      </DetailTitle>
      <table>
        <tbody>
          <tr>
            <td>메뉴명</td>
            <td>
              <input 
                type="text" 
                value={detail.name} 
                placeholder="메뉴명을 입력해주세요"
                maxLength="15"
                onChange={(e) => {
                  setDetail({ ...detail, name: e.target.value });
                }}
              />
            </td>
          </tr>
          <tr>
            <td>사용여부</td>
            <td>
              <div value="true" onClick={(e) => {handleRadio(e)}}>
                <input 
                  className="radio" 
                  type="radio" 
                  value="true"
                  checked={detail.enabledYn === true}
                  onChange={() => {}}
                /> 
                사용
              </div>
              <div value="false" onClick={(e) => {handleRadio(e)}}>
                <input 
                  className="radio" 
                  type="radio" 
                  value="false"
                  checked={detail.enabledYn === false}
                  onClick={handleRadio}
                  onChange={() => {}}
                />
                미사용
              </div>
            </td>
          </tr>
          <tr>
            <td>정렬</td>
            <td>
              <input 
                type="number" 
                placeholder="숫자가 작을수록 위에 보입니다" 
                value={detail.sortOrder}
                maxLength="5"
                min="0"
                step="1"
                onInput={(e) => {
                  if (e.target.value.length > 5) {
                    e.target.value = e.target.value.slice(0, 5);
                  }
                }}
                onChange={(e) => setDetail({ ...detail, sortOrder: e.target.value })}
              />
            </td>
          </tr>
          <tr>
            <td>아이콘(48*44)<MdOutlineRefresh onClick={() => {setIconRender(true)}}/></td>
            <td className="dndBox">
              <DnDBox
                onDragEnter={onDragEnter} 
                onDragLeave={onDragLeave} 
                onDragOver={onDragOver} 
                onDrop={onDrop} 
                Dragging={isDragging}
              >
                <div>
                  <textarea 
                    name="iconUrl" 
                    value={detail.iconUrl && (
                      detail.iconUrl.length < path.length ? "default.png" : detail.iconUrl.replace(path, "").replace(prefix, ""))} 
                    onChange={() => {}} 
                    readOnly
                  ></textarea>
                  <label htmlFor="iconFile" className="iconFileInput">
                    <AiOutlinePaperClip/>
                    <input 
                      type="file" 
                      id="iconFile" 
                      onChange={(e) => {
                        readImage(e.target.files[0]);
                        setNewIconFile(e.target.files[0]);
                        setDetail({ ...detail, iconUrl: path+prefix+e.target.files[0]["name"]});
                        setNewIconUrl(path+prefix+e.target.files[0]["name"]);
                      }}
                    />
                  </label>
                </div>
                <IconImageList 
                  pageId={pageId}
                  newIconFile={newIconFile} 
                  newIconUrl={newIconUrl}
                  iconUrl={detail.iconUrl}
                  detail={detail} 
                  setDetail={setDetail}
                  iconRender={iconRender} 
                  setIconRender={setIconRender}
                />
              </DnDBox>
            </td>
          </tr>
        </tbody>
      </table> 
    </DetailDiv>
  );
}


const DetailDiv = styled.div`
margin: 10px 10px 15px 10px;
color: black;
min-width: 450px;
width: calc(100% - 710px);
height: calc(100% - 35px);
> table {
  width: 100%;
  height: calc(100% - 150px);
  border: 1px solid #1d2437;
  border-top: 3px solid #1d2437;
  border-collapse: collapse;
  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
  > tbody {
    > tr {     
      > td:nth-child(1) {
        width: 150px;
        height: 35px;
        padding-right: 10px;
        background-color: #f2f3f6;
        border-bottom: 1px solid #1d2437;
        font-weight: bold;
        text-align: right;
        vertical-align: middle;
        > svg {
          cursor: pointer;
          width: 22px;
          height: 22px;
          margin: 2px;
        }
      }
      > td:nth-child(2) {
        width: calc(100% - 20px);
        height: 35px;
        padding: 5px 5px 5px 15px;
        /* margin: 1px; */
        display: flex;
        background-color: white;
        border-bottom: 1px solid #1d2437;
        vertical-align: middle;
        > input {
          padding-left: 5px;
          width: 100%;
          height: 25px;
        }   
        > div {
          margin-right: 10px;

          > input {
            margin-right: 5px;
          }
        }
      }
    }
    > tr:nth-child(4) > td {
      height: 100%;
      border-bottom: 1px solid #1d2437;
      &.dndBox {
        border-bottom: 1px solid #ffffff;
      }
    }
  }
}
`;
const DetailTitle = styled.div`
display: flex;
justify-content: space-between;
font-weight: bold;
> p {
  margin-top: 5px;
  font-size: large;
  font-weight: 600;
}
> div {
  display: flex;
  height: 35px;
  > div {
    margin: 5px;
  }
  > span {
    font-size: 24px;
    margin-top: 5px;
  }
}
`;
const DnDBox = styled.div`
width: 100%;
height: 100%;
> div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  > textarea {
    padding-left: 5px;
    border: 1px solid #1d2437;
    width: calc(100% - 35px);
    height: 25px;
    color: #1d2437;
    font-weight: bold;
    font-size: small;
    padding-top: 4px;  
    resize: none;
  }
  > label {
    > svg {
      margin-left: 5px;
      width: 30px;
      height: 30px;
    }
    > input {
      display: none;
    }
  }
}
`;
const Pipe = styled.div`
width: 2px;
height: 70%;
background-color: black;
`;
const Error = styled.div`
color: #e64f25;
`;