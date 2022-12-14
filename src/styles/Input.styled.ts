import styled from "styled-components";

export const StyledInput: any = styled.div`
    display: grid;
    margin-bottom: 15px;
    input{
        padding: 10px;
        margin: 5px 0;
        border-radius: 5px;
        border: ${({ invalid }: any) => invalid ? '2px solid red' : '2px solid black'};
        height: 50px;
        font-size: 15px;
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