import { axiosInstance } from "../utils/axiosInstance";


export default function Test() {
  const newPrefix = () => {
    axiosInstance.get('s3/test?compId=1', {
      headers: {
        "Content-Type": "application/json",
        'menuId' : "0"
      }
    })

  };

  return(
    <>
    <div style={{backgroundColor: 'skyBlue'}} onClick={() => {newPrefix()}}>click</div>
    </>

  );
}