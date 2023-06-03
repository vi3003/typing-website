import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*{
    box-sizing: border-box;
}

body{
    background: ${({theme})=>theme.background};
    color: ${({theme})=>theme.textColor};
    margin: 0;
    padding: 0;
    transition: all 0.2s linear;
}   

.canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto ifr auto;
    gap: 0.5rem;
    padding: 2rem;][\/  ]
    width: 100vw;
    align-items: center;
    text-align: center;
}

.type-box{
    display: block;
    max-width: 1000px;
    height: 140px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}

.words{
    font-size: 32px;
    display: flex;
    flex-wrap: wrap;
    color: ${({theme})=>theme.typeBoxText};
}

.word{
    margin: 5px;
    padding-right: 2px;
}

.hidden-input{
    opacity: 0;
}

.current{
    border-left: 1px solid;
    animation: blinking 2s infinite;
    animation-timing-function: ease;
    @keyframes blinking{
        0% {border-left-color: ${({theme})=>theme.textColor};}
        25% {border-left-color: ${({theme})=>theme.background};}
        50% {border-left-color: ${({theme})=>theme.textColor};}
        75% {border-left-color: ${({theme})=>theme.background};}
        100% {border-left-color: ${({theme})=>theme.textColor};}
    }
}

.current-right{
    border-right: 2px solid;
    animation: blinkingRight 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingRight{
        0% {border-right-color: ${({theme})=>theme.textColor};}
        25% {border-right-color: ${({theme})=>theme.background};}
        50% {border-right-color: ${({theme})=>theme.textColor};}
        75% {border-rightt-color: ${({theme})=>theme.background};}
        100% {border-right-color: ${({theme})=>theme.textColor};}
    }
}

.correct{
    color: ${({theme})=>theme.correct};
}

.incorrect{
    color: ${({theme})=>theme.incorrect};
}

.upper-menu{
    display: flex;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.35rem;
    justify-content: space-between;
    padding: 0.5rem;
}

.modes{
    display: flex;
    gap: 0.4rem;
}

.time-mode:hover{
    color: ${({theme})=>theme.correct};
    cursor: pointer;
}

.footer{
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
}

.stat-box {
    display: flex;
    width: 1000px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}

.left-stats{
    width: 30%;
    padding: 30px;
}

.right-stats{
    width: 70%;
}

.title {
    font-size: 20px;
    color: ${({theme})=>theme.typeBoxText};
}

.subtitle {
    font-size: 28px;
}

.header {
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
}

.themeButton {
    display: flex;
    justify-content: space-between;
}

.user-profile {
    width: 1000px;
    margin: auto;
    display: flex;
    height: 15 rem;
    background: ${({theme})=>theme.typeBoxText};
    border-radius: 20px;
    padding: 1rem;
    justify-content: center;
    align-text: center;
}

 .user {
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-botton: 30px;
    font-size: 1.2rem;
    padding: 1rem;
    border-right: 2px solid;
}

.info {
    width: 60%;
    padding: 1rem;
    margin-top: 0.6rem;
}

.picture {
    width:40%
}

.totalTests {
    width: 50%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
}

.table, .graph-user-page {
    margin: auto;
    width: 1000px;
}

.center-of-screen {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    align-items: center;
}

.exit {
    align-items: right;
}

`