import styled from "styled-components";

export const StyledBills = styled.div`

    position: relative;
    display: flex;
    border: none;
    padding: 2px;
    border-radius: 5px;
    transition: transform 0.4s ease-out;
    min-width: 120px;
    text-align: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
  div{
    width: 200px;
    background-color: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 23px;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0 0 5px 3px lightgrey;
  }
  img{
    width: 100%;
  }
  
`