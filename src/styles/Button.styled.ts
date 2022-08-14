import styled from "styled-components";

export const StyledButton: any = styled.button`

    position: relative;
    display: flex;
    align-items: center;
    border: none;
    padding: 2px 8px;
    border-radius: 5px;
    border: 1.5px solid #000;
    cursor: pointer;
    transition: transform 0.4s ease-out;
    background-color: ${({color}) => color ? color: '#fff'};
    height: 45px;
    min-width: 120px;
    text-align: center;
    justify-content: center;
    color: #333 !important;
    font-weight: bold;
    font-size: 17px;
    opacity:${({ disabled }) => disabled ? '.5' : '1'};


  &:hover {
   opacity: .5;
   color: #fff;
  }
  a{
    font-weight: bold;
    display: block;
    height: 100%;
    width: 100%;
    line-height: 40px;

  }
  a:visited{
    color: inherit;
  }
  a:hover{
    color: #000
  }
  
  
`