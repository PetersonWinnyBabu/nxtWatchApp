import Styled from 'styled-components'

export const LoginButton = Styled.button`
    width:100%;
    padding-top:10px;
    padding-bottom:10px;
    padding-left:25px;
    padding-right:25px;
    background-color:#3b82f6;
    color:#ffffff;
    border:none;
    border-radius:8px;
    font-size:16px;
    margin-bottom:20px;
    
    @media (max-width:576px){
    padding-top:6px;
    padding-bottom:6px;
    padding-left:12px;
    padding-right:12px;
    border-radius:6px;
    font-size:8px;
    margin-bottom:8px;
   
}
`

export const StyledButton = Styled.button`
    background:none;
    cursor:pointer;
    outline:none;
    margin-left:${props => props.marginLeft};
    margin-right:${props => props.marginRight};
    border :${props => props.border};
    background-color:${props => props.backgroundColor};
    color:${props => props.color};
    color:${props => props.color2};
    padding:${props => props.padding};
    border-radius:${props => props.borderRadius};
    font-size:16px;
    @media (max-width:576px){        
    cursor:pointer;
    outline:none;
    margin-left:8px;
    margin-right:8px;
    font-size:10px;
}
`

export const StyledInput = Styled.input`
    width:100%;
    padding:10px;
    font-size:16px;
    border:1px solid #909090;
    border-radius:8px;
    background-color:transparent;
    color:${props => props.color};
    margin-bottom:20px;
    outline:none;
    @media (max-width:576px){
        font-size:10px;
        width:100%;
        padding:6px;
        font-size:10px;
        border-radius:4px;
        margin-bottom:6px;
    }
`

export const StyledSearchInput = Styled.input`
    width:100%;
    padding:10px;
    font-size:16px;
    border:1px solid #909090;
    border-radius:8px;
    background-color:transparent;
    color:${props => props.color};
    outline:none;
    @media (max-width:576px){
        font-size:10px;
        width:100%;
        padding:6px;
        font-size:10px;
        border-radius:4px;
    }
`

export const StyledCheckbox = Styled.input`
    width:20px;
    height:20px;
    margin-right:16px;
    @media (max-width:576px){
        width:12px;
        height:12px;
        margin-right:8px;
    }
    
`

export const StyledDiv = Styled.div`
    display:flex;
    flex-direction:${props => props.flexDirection};
    align-items:${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    width:${props => props.width};
    height:${props => props.height};
    padding:${props => props.padding};
    border:${props => props.border};
    background-color:${props => props.backgroundColor};
    border-radius:${props => props.borderRadius};
    margin:${props => props.margin};
    margin-bottom:${props => props.marginBottom};
    margin-right:${props => props.marginRight};
    margin-top:${props => props.marginTop};
    box-shadow:${props => props.boxShadow};
    padding-left:${props => props.paddingLeft};
    background-image : url('${props => props.backgroundImage}');
    background-size:cover;
    overflow-y:${props => props.overflowY};
    flex-wrap:${props => props.flexWrap};
`

export const StyledBackground = Styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;  
    height:100vh;
    background-color:${props => props.backgroundColor};

`

export const StyledImage = Styled.img`
    width:${props => props.width};
    height:${props => props.height};
    margin-bottom:${props => props.marginBottom};
    margin-top:${props => props.marginTop};
    margin-left:${props => props.marginLeft};
    margin-right:${props => props.marginRight};
    border-radius:${props => props.borderRadius};
    border:none;
`
export const StyledLabel = Styled.label`
    font-size:16px;
    color:${props => props.color};
    margin-bottom:10px;
    @media (max-width:576px){
    font-size:8px;
    margin-bottom:5px;
}
`

export const StyledHeading = Styled.h1`
    font-size:${props => props.fontSize};
    color:${props => props.color};
    font-weight:500;
    margin-bottom:${props => props.marginBottom};
    font-family:'Roboto';
    padding:0px;
    margin:0px;
`

export const StyledUL = Styled.ul`
    list-style-type:none;
    display:flex;
    flex-direction:${props => props.flexDirection};
    align-items:${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    width:${props => props.width};
    height:${props => props.height};
    padding:${props => props.padding};
    border:${props => props.border};
    background-color:${props => props.backgroundColor};
    border-radius:${props => props.borderRadius};
    margin:${props => props.margin};
    margin-bottom:${props => props.marginBottom};
    margin-top:${props => props.marginTop};
    box-shadow:${props => props.boxShadow};
`

export const StyledPara = Styled.p`
    font-size:${props => props.fontSize};
    color:${props => props.color};
    color: ${props => props.color2};
    font-weight:500;
    font-family:'Roboto';
    margin-left:${props => props.marginLeft};
    margin-bottom:${props => props.marginBottom};
    @media(max-width:576px){
        font-size:8px;
    }
`
