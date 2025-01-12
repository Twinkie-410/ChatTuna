import { useNavigate } from "react-router-dom"
import Footer from "../base/Footer"
import Header from "../base/Header"
import { useLogOutUserMutation } from "../../store/apis/AuthAPI"
import { tokenService } from "../../services/TokenService"
import { RootState } from "../../store/store"
import { IAdmin } from "../../models/IAuth"
import { connect } from "react-redux"

interface ProfileProps{
    user: IAdmin 
}

function Profile({user}:ProfileProps) {

    const [logOut, {}] = useLogOutUserMutation()
    const navigate = useNavigate()
    const handleLogOut = () => {
        const refresh = tokenService.getLocalRefreshToken()
        if (refresh) {
            logOut(refresh)
        }
        navigate('/login')
    }

    return (
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <Header/>
            <div className="max-w-[850px] w-[850px] mx-auto flex-grow flex-shrink">
                <h1 className="text-[32px] ml-[53px] mt-[56px]">
                    Профиль
                </h1>
                <div className="max-w-[820px] bg-[#D0DADF] mt-[20px] rounded-md border-[2px] border-[#454F55] mx-auto">
                    <div className="p-[15px]">
                        <div className="flex flex-col px-[38px] gap-[30px] pt-[41px] bg-[#FFFFFF] rounded-md">
                            <div className="text-[24px] font-bold">
                                {user.first_name? user.first_name: 'Иван'} {user.last_name? user.last_name: 'Иванов'}
                            </div>
                            <div className="">
                                Почта: {user.email? user.email: 'example@gmail.com'}
                            </div> 
                            <div className="flex pb-[40px] mt-[41px] items-center gap-[90px]">
                                <div className="flex gap-[20px]">
                                    <button disabled className="bg-[#bce4f0] px-[18px] py-[10px] rounded-md text-center border-[1px] hover:border-gray-700">
                                        Сменить пароль                              
                                    </button>
                                    <button disabled className="bg-[#bce4f0] px-[18px] py-[10px] rounded-md text-center border-[1px] hover:border-gray-700 w-[190px]">
                                        Редактировать                              
                                    </button>
                                </div>
                                <button onClick={handleLogOut} className="bg-[#9AA8B0] px-[18px] py-[10px] rounded-md flex-grow max-w-[220px] text-center border-[1px] hover:border-gray-700">
                                    Выйти из аккаунта                                
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

function mapStateToProps (state: RootState) {
    return {
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps)(Profile)