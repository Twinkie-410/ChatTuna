import { NavLink, useNavigate } from "react-router-dom"
import UnloggedHeader from "../base/UnloggedHeader"
import Footer from "../base/Footer"
import { SubmitHandler, useForm } from "react-hook-form"
import { useLogInUserMutation } from "../../store/apis/AuthAPI"
import { RootState } from "../../store/store"
import { connect } from "react-redux"

interface ILoginForm {
    username:'',
    password:''
}

function Login() {

    const [logIn, ] = useLogInUserMutation()
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors, isDirty, isValid }, resetField, setError} = useForm<ILoginForm>({mode:'onBlur'})

    const submit: SubmitHandler<ILoginForm> = async (data) => {
        const response =  await logIn(data)
        if(!response.error) {
            navigate('/')
        } else {
            resetField("password")
            setError('password', {
                type: 'server',
                message:'Неверный логин или пароль'
            })
        }
    }

    return (
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <UnloggedHeader  
                title="Вход"
                link="/login"
            />
            <div className="max-w-[850px] w-[850px] mx-auto flex-grow flex-shrink">
                <h1 className="text-[32px] ml-[53px] mt-[56px]">
                    Вход
                </h1>
                <form className="max-w-[820px] bg-[#D0DADF] mt-[20px] rounded-md border-[2px] border-[#454F55] mx-auto" onSubmit={handleSubmit(submit)}>
                    <div className="p-[15px]">
                        <div className="flex flex-col px-[38px] gap-[10px] pt-[41px] bg-[#FFFFFF] rounded-md">
                            <input {...register('username', {required:true})} type="text" placeholder="Логин или почта" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl"/>
                            <input {...register('password', {required:true})} type="password" placeholder="Пароль" className="py-[6px] px-[25px] flex-grow bg-[#EBEBEB] rounded-md text-xl mt-[19px]"/>
                            <div className="text-red-600">{errors.password && errors.password.message}</div>
                            <NavLink to={'/'} className="ml-auto text-[#454F55] hover:text-black">Забыли пароль?</NavLink>
                            <div className="flex justify-center pb-[40px] mt-[41px] items-center">
                                <button type="submit" disabled={!isDirty || !isValid} className="bg-[#9AA8B0] disabled:bg-[#bce4f0] px-[18px] py-[10px] rounded-md flex-grow max-w-[241px] text-center border-[1px] hover:border-gray-700">
                                    Войти                                
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

function mapStateToProps(state: RootState){
    return {
        isAuth: state.authReducer.isAuth,
    }
}

export default connect(mapStateToProps)(Login)