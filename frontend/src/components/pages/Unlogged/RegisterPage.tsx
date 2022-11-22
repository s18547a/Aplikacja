import OwnerRegister from "../Owner/OwnerRegister"

function RegisterPage(props){


    function changeTab(e){
        props.changeTab(e)
    }
    return <OwnerRegister changeTab={changeTab}/>
}

export default  RegisterPage