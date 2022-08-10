import styled from "styled-components";

export const StyledNotification: any = styled.div`
position: absolute;
    max-height: 200px;
    min-height: 50px;
    min-width: 250px;
    background-color: #fff;
    background-color: ${({ type }) => type === 'danger' ? '#ff8787' : '#87ff87'};
    border-radius: 5px;
    color: #333;
    padding: 0.25rem;
    border: ${({ type }) => type === 'danger' ? '1.5px solid red' : '1.5px solid green'};

    /* line-height: 50px; */
    right: 1rem;
    top: 2rem;
    transition: 1s;
    transform: ${({ isActive }) => isActive ? 'translateX(0)' : 'translateX(300px)'};
    .close{
     display: block;
    text-align: right;
    padding-right: 1rem;
    color: #333;
    color: ${({ type }) => type === 'danger' ? 'red' : 'green'};

    cursor: pointer;
    height: 14px;
    }
`