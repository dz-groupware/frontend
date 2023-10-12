import React from 'react'
import styled from 'styled-components'

export default function ActionButton({width, height, fontWeight, fontSize, name, onClick}) {
  return (
    <StyledButton 
      $width={width}
      $height={height} 
      $fontWeight={fontWeight} 
      $fontSize={fontSize} 
      onClick={onClick}
      name={name}
    >
      {name}
    </StyledButton>
  )
}


const StyledButton = styled.button`
  width: ${({$width}) => ($width? $width : 'fit-content')};
  height: ${({$height}) => ($height? $height : 'fit-content')};
  font-size: ${({$fontSize})=>($fontSize ? $fontSize : '1.0rem')};
  font-weight: ${({$fontWeight}) => ($fontWeight ? $fontWeight : '600')};
  background: ${({ name }) => 
  name === "저장"
    ? "linear-gradient(0deg, rgb(55,137,250) 0%, rgb(96,171,252) 100%)"
    : "linear-gradient(to bottom, #ffffff,#ffffff,#e4e4e4)"
};
  padding: 5px 7px 5px 7px; 
  margin-left: 3px;
  border: 1px solid #C9C9C9;
  border-radius: 5px;
  color: ${({ name }) => 
  name === "저장" ? "white" : "inherit"
};

  box-shadow: inset 1px 1px 1px 0px rgba(255,255,255,.3),
            3px 3px 3px 0px rgba(0,0,0,.1),
            1px 1px 3px 0px rgba(0,0,0,.1);
            outline: none;
`

