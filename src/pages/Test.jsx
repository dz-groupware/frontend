import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";


export default function Test() {
  const [list, setList] = useState([]);
  const newPrefix = () => {
    axiosInstance.get('s3/test?compId=1', {
      headers: {
        "Content-Type": "application/json",
        'menuId' : "0"
      }
    });
  };

  // const imageList = () => {

  // }

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

  console.log(list)
  return(
    <>
      <div style={{backgroundColor: 'skyBlue'}} onClick={() => {newPrefix()}}>click</div>
      <div>---</div>
      <div style={{backgroundColor: 'skyBlue'}}>
        {list && list.length > 0 && 
        list.map((a, i) => (
          <div key={i}>{a.key}</div>
        ))
        }
      </div>
    </>
  );
}