import { useNavigate } from "react-router-dom"

interface ObjectCardProps {
    date: string;
    name: string;
    address: string;
    organizer: string;
    places: number;
    free_places: number;
    index: number;
}


function ObjectCard({name, date, address, organizer, free_places, places}: ObjectCardProps) {

    const navigate = useNavigate()
    // const handleClick = () => {
    //     navigate(`/calculation/${id}`)
    // }

    return (
        <>
            <div className="max-w-[640px] w-[640px] bg-[#D0DADF] mt-[20px] rounded-md border-[2px] hover:border-[#454F55]">
                <div className="p-[12px]">
                    <div className="flex flex-row bg-[#FFFFFF] rounded-md text-xl px-1 gap-[10px]">
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
                        <ul className="bg-[#FFFFFF] rounded-md px-1">
                            <li>
                                <span>{name}</span>
                            </li>
                            <li>
                                <span>{date.toString()}</span>
                            </li>
                            <li>
                                <span>{address}</span>
                            </li>
                            <li>
                                <span>{organizer}</span>
                            </li>
                            <li>
                                <span>{free_places}/{places}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ObjectCard