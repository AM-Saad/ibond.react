import styled from "styled-components";


export const StyleErrorBox = styled.div`

    justify-content: center;
    display: grid;
    justify-items: center;
    div{
 
        width: 95%;
        margin: auto;
        border-radius:5px
    }
    button{
        justify-self: end;
    }
    p.message{
        text-align: left;
        background: #fff;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid #ff9292;
    }
`