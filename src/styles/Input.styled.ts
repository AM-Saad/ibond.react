import styled from "styled-components";

export const StyledInput = styled.div`
    display: grid;
    text-align: left;
    margin-bottom: 15px;
    input{
        padding: 10px;
        margin: 5px 0;
        border-radius: 5px;
        /* border: 2px solid black; */
        border: ${({ invalid }) => invalid ? '2px solid red' : '2px solid black'};
    }
    label{
        font-size: 19px;
        font-weight: bold;
        padding: 4px;

    }
    input:focus{
        outline: 'none';
    }
`