import { useNavigate } from "react-router-dom"
import { IEvent } from "../../models/IEvent";
import { formatDateISO } from "../../functions/formatISODate";

interface ObjectCardProps extends IEvent {}


function ObjectCard({name, datetime_start, address, organizer, free_places, places, id}: ObjectCardProps) {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/event/${id}`)
    }

    return (
        <>
            <div onClick={handleClick} className="max-w-[640px] w-[640px] bg-[#D0DADF] mt-[20px] rounded-md border-[2px] hover:border-[#454F55]">
                <div className="p-[12px]">
                    <div className="flex flex-row bg-[#FFFFFF] rounded-md text-xl px-1 gap-[10px] text-ellipsis">
                        <ul>
                            <li>
                                <span>Название:</span>
                            </li>
                            <li>
                                <span>Дата:</span>
                            </li>
                            <li>
                                <span>Адрес:</span>
                            </li>
                            <li>
                                <span>Организатор:</span>
                            </li>
                            <li>
                                <span>Количество мест:</span>
                            </li>
                        </ul>
                        <ul className="bg-[#FFFFFF] rounded-md px-1 max-w-[70%]">
                            <li>
                                <span className="line-clamp-1">{name? name: 'Нет данных'}</span>
                            </li>
                            <li>
                                <span className="line-clamp-1">{datetime_start? formatDateISO(datetime_start): 'Нет данных'}</span>
                            </li>
                            <li>
                                <span className="line-clamp-1">{address? address: 'Нет данных'}</span>
                            </li>
                            <li>
                                <span className="line-clamp-1">{organizer? organizer: 'Нет данных'}</span>
                            </li>
                            <li>
                                <span className="line-clamp-1">{free_places}/{places}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ObjectCard