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
  background: linear-gradient(to bottom, #ffffff,#ffffff,#e4e4e4); 
  padding: 7px;
  margin-left: 3px;
  border: 1px solid #C9C9C9;
  border-radius: 5px;
`

