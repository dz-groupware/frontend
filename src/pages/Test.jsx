import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";


export default function Test() {
  const [list, setList] = useState([]);
  const [status, setStatus] = useState([]);

  const newPrefix = (compId) => {
    axiosInstance.get(`s3/test?compId=${compId}`, {
      headers: {
        "Content-Type": "application/json",
        'menuId' : "0"
      }
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setStatus("created prefix : ", compId);
      } else {
        setStatus("fail...");
      }
    }).catch((err) => {
      setStatus("fail...")
    });  
  };

  useEffect(() => {
    // imageList
    axiosInstance.get('s3/imgList', {
      headers: {
        "Content-Type": "application/json",
        'menuId' : "0"
      }
    })
    .then((res) => {
      setList(res.data);
    })
  }, []);

  return(
    <>
    <div style={{display: 'flex'}}>
      <div>
        <div style={{fontSize: 'xxLarge'}}>create prefix</div>
        <div style={{fontSize: 'large'}}>prefix : value must be number ||  key "Enter" is submit</div>
        <input 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('input : ', e.target.value)
              newPrefix(e.target.value);
            }
          }} 
        />
      </div>
      <div style={{width: '200px', height: '200px'}}>{status}</div>
      <div>
        <div>company id : {localStorage.getItem("compId")} ||  icon list</div>
        <div style={{backgroundColor: 'skyBlue'}}>
          {list && list.length > 0 && 
          list.map((a, i) => (
            <div key={i}>{a.key}</div>
          ))
          }
        </div>
      </div>
    </div>
    </>
  );
}