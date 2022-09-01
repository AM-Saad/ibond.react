import styled from "styled-components";
import { useTranslation } from 'react-i18next'
import loading from '@/assets/loading.svg'
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
    background-color: ${({ color }) => color ? color : '#fff'};
    height: 45px;
    min-width: 120px;
    text-align: center;
    justify-content: center;
    color: #333 !important;
    font-weight: bold;
    font-size: ${({ disabled }) => disabled ? '0' : '17px'};
    opacity:${({ disabled }) => disabled ? '.8' : '1'};
  


  &:before{
    content: url(${loading});
    
    width: 100%;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    left: 0;
    z-index: ${({ disabled }) => disabled ? '999' : '-999'};
    height: 100%;
    color: #888;
    visibility: ${({ disabled }) => disabled ? 'visible' : 'hidden'};;
    cursor: pointer;
  }

  &:hover {
   opacity: .8;
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