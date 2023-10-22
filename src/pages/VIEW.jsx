import { useNavigate } from "react-router";
import { useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

export function EmptyPage(props){
  return(
    <div style={{display:"block"}}>
      <div style={{fontSize: "xx-large", margin: "20px"}}>빈페이지 입니다.</div>

      <div style={{fontSize: "large", margin: "30px"}}>{props.menuName}</div>
    </div>
  )
}

export function UNAUTHORIZED(){
  useEffect(() => {
    setTimeout(() => window.location.href="/", 3000);
  }, []);

  return(
    <div style={{display:"block", backgroundColor:"white", color:"black"}}>
      <div style={{fontSize: "xx-large", margin: "20px"}}>로그인 정보가 없습니다</div>
      <div style={{fontSize: "large", margin: "30px"}}> 잠시 후 로그인 페이지로 이동합니다 ..</div>
    </div>
  )
}

export function Error(){
  useEffect(() => {
    setTimeout(() => window.location.href="/home", 3000);
  }, []);

  return(
    <div style={{display:"block", backgroundColor:"white", color:"black"}}>
      <div style={{fontSize: "xx-large", margin: "20px"}}>잘못된 접근입니다.</div>
      <div style={{fontSize: "large", margin: "30px"}}> 잠시 후 메인 페이지로 이동합니다 ..</div>
    </div>
  )
}

export function Test(){

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

  useEffect(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          )
        }
      });
  }, []);
  return (
    <>
    <h1>테스트 페이지 </h1>
    </>
  )

}
export function Error404(){
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/"), 3000);
  }, []);

  return(
    <div style={{display:"block", backgroundColor:"white", color:"black"}}>
      <div style={{fontSize: "xx-large", margin: "20px"}}>없는 페이지 입니다.</div>
      <div style={{fontSize: "large", margin: "30px"}}> 잠시 후 메인 페이지로 이동합니다 ..</div>
    </div>
  )
}
