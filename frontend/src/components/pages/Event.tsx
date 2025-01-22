import React, { useEffect, useState } from "react";
import Footer from "../base/Footer";
import Header from "../base/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetEventDetailQuery } from "../../store/apis/EventAPI";

interface ICalculationsForm {
    costumer: string
    annotation: string
}

function Event() {

    const {id} = useParams()
    const {state} = useLocation()
    const navigate = useNavigate()

    if (id === undefined || !id) {
        navigate ('/')
        return
    } 
    const {data, isError} = useGetEventDetailQuery(Number(id))
    // const [distributeInputs] = useDistributeInputsMutation()

    useEffect(() =>{
        getData(id)
    }, [])

    if (data === undefined && isError ) {
        return (<>Ошибка</>)
    }
        
    const [objectOpen, setObjectOpen] = useState(false)
    const [consumerModalActive, setConsumerModalActive] = useState(false)
    const [sectionModalActive, setSectionModalActive] = useState(state)
    const [inputsError, setInputsError] = useState('')
    
    const {register} = useForm<ICalculationsForm>({mode:"onBlur"})

    function handleClick(e: React.MouseEvent<HTMLButtonElement>, option: boolean, setOption: React.Dispatch<React.SetStateAction<boolean>>) {
        e.preventDefault()
        setOption(!option)
    }
    
    async function getData(id: string) {
        const response = await useGetEventDetailQuery(Number(id))
        return response
    }

    return (data) && ( 
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <Header/>
            <form className="max-w-[1740px] w-[100%] mx-auto mt-[20px] flex-grow flex flex-col gap-[14px]">
                <h1 className="my-0 ">Создание расчета мощности</h1>
                <div className="flex gap-[24px] ">
                    <button className="bg-[#9AA8B0] px-[50px] py-[8px] rounded-md border-[1px] hover:border-gray-700" type="button" onClick={() => navigate('/')}>
                        Сохранить
                    </button>
                    <button className="bg-[#D0D4D9] px-[40px] rounded-md border-[1px] hover:border-gray-700" onClick={() => navigate('/')}>
                        Назад
                    </button>
                </div>
                <div className="flex flex-row gap-[17px]">
                    <div className="">
                        {/* <button className="flex items-center text-[20px] gap-[8px] ml-auto bg-[#EBEBEB] rounded-md px-[7px] w-[510px] justify-between"
                        onClick={(e) => handleClick(e, objectOpen, setObjectOpen)}>
                            <div className="py-[8px] px-[15px] text-left text-[#454F55]">{data.object? data.object.name : 'Объект'}</div>
                        </button> */}
                    </div>
                    <div className="">
                    {/* <DatePicker
                        selected={data.date}
                        onChange={() => {}}
                        className="bg-[#EBEBEB] rounded-md w-[510px]"
                    /> */}
                    </div>
                </div>
                <div className="flex flex-row gap-[17px]">
                    {/* <div className="">
                        <input {...register('costumer')} type="text" placeholder={data?.costumer} value={data?.costumer? data.costumer : 'Заказчик'} className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                    </div>
                    <div className="">
                        <input {...register('annotation')} type="text" placeholder={data?.annotation} value={data?.annotation? data.annotation : 'Примечание'} className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                    </div> */}
                </div>
                <div className="flex flex-row gap-[17px] justify-between">
                    <div className="flex gap-[19px]">
                        <button className="bg-[#D0D4D9] px-[40px] py-[8px] rounded-md disabled:bg-slate-200 border-[1px] hover:border-gray-700" onClick={(e) => handleClick(e, consumerModalActive, setConsumerModalActive)}>
                            Добавить потребителя
                        </button>
                        <button className="bg-[#D0D4D9] px-[40px] rounded-md border-[1px] hover:border-gray-700" type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            setSectionModalActive(!sectionModalActive)
                        }}
                        >
                            Добавить ВРУ
                        </button>
                        <button type="button" onClick={async () => {
                            // if((await distributeInputs(id)).error) {
                            //         setInputsError('Не удалось распределить потребителей')
                            // }
                        }} 
                        className="bg-[#D0D4D9] px-[40px] rounded-md disabled:bg-slate-200 border-[1px] hover:border-gray-700">
                            Распеределить по ВРУ
                        </button>
                    </div>
                    <div className="">
                        <button className="bg-[#bce4f0] px-[40px] py-[8px] rounded-md" disabled>
                            Предварительный просмотр
                        </button>
                    </div>
                </div>
                {<p className="text-red-600">{inputsError}</p>}
                
            </form>
            <Footer/>
        </div>
    );
}

export default Event;