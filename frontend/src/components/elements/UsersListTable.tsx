import { ITgUser } from "../../models/IAuth";
import { IEventGetUsers } from "../../models/IEvent";
import TableSection from "./TableSection";
import UsersTableHeader from "./UsersTableHeader";


interface Props {
    data: IEventGetUsers[] | undefined
}

function UsersListTable(data : Props) {

    console.log(data);
    
    return ( 
        <div className="">
            <UsersTableHeader/>
            {data.data && data.data.map((e, index) => (
                e.user ? ( // Проверяем наличие e.user
                    <TableSection
                        key={index} // Не забудьте добавить ключ для каждого элемента списка
                        index={index}
                        username={e.user?.username} // Используем опциональную цепочку
                        firstName={e.user?.first_name} // Используем опциональную цепочку
                    />
                ) : null
            ))}

        </div>
    );
}

export default UsersListTable;