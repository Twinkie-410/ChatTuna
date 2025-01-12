import Footer from "../base/Footer";
import Header from "../base/Header";
import "react-datepicker/dist/react-datepicker.css";

function ConfigureBot() {
    
    return (  
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <Header/>
            <div className="max-w-[1320px] mx-auto mt-[20px] flex-grow">
                <h1 className="text-[24px] mt-[28px]">Создать мероприятие</h1>
                <div className="flex justify-between gap-[80px] mt-[60px]">
                    <div className="">
                        <ul className="flex flex-col gap-[20px] text-[20px]">
                            <li><b>Изменение шаблонов/скриптов</b></li>
                            <li>Настройка авто - рассылок</li>
                            <li>Настройка меню бота</li>
                            <li>Список отправленных работ</li>
                            <li>Статистика по мероприятиям</li>
                            <li>Ссылка на бот (проверка работы)</li>
                            <li>Деактивировать бот</li>
                            <li>Перезагрузить бот</li>
                        </ul>
                    </div>
                    <div className="">
                        <form action="">
                            <div className="flex flex-col gap-[9px]">
                                <input type="text" placeholder="Шаблон 1" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                                <input type="text" placeholder="Приветствие" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px] h-[126px]"/>
                                <input type="text" placeholder="Текст 1" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px] h-[126px]"/>
                                <input type="text" placeholder="Другие скрипты" className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]"/>
                                

                                <div className="flex justify-between pb-[40px] mt-[41px] items-center">
                                    <button className="bg-[#D0D4D9] disabled:bg-[#bce4f0] px-[18px] py-[10px] rounded-md flex-grow max-w-[134px] text-center border-[1px] hover:border-gray-700">
                                        Отмена
                                    </button>
                                    <button className="bg-[#9AA8B0] disabled:bg-[#bce4f0] px-[18px] py-[10px] rounded-md flex-grow max-w-[202px] text-center border-[1px] hover:border-gray-700">
                                        Сохранить
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                
            <Footer/>
        </div>
    );
}

export default ConfigureBot;