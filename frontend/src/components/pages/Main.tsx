import { useGetEventsListQuery } from "../../store/apis/EventAPI";
import { useLoadMyProfileQuery } from "../../store/apis/UserAPI";
import Footer from "../base/Footer";
import Header from "../base/Header";
import Search from "../base/Search";
import ObjectCard from "../elements/ObjectCard";

function Main() {

    useLoadMyProfileQuery()
    const events = useGetEventsListQuery().data
    
    return (
        <div className="min-h-[100vh] h-[100vh] flex flex-col">
            <Header/>
            <div className="max-w-[1320px] mx-auto mt-[20px] flex-grow">
                <div className="flex flex-row">
                    <div className="flex-grow"></div>
                    <Search/>
                </div>
                <div className="flex flex-row flex-wrap justify-between">
                    {/* <ObjectCard
                        date={'01.01.2025'}
                        name="Фестиваль талантов"
                        address="г. Екатеринбург, ул. Мира, д. 19"
                        organizer={'УКНО'}
                        places={150}
                        free_places={30}
                        index={1}
                    />
                    <ObjectCard
                        date={'01.01.2025'}
                        name="Фестиваль талантов"
                        address="г. Екатеринбург, ул. Мира, д. 19"
                        organizer={'УКНО'}
                        places={150}
                        free_places={30}
                        index={1}
                    />
                    <ObjectCard
                        date={'01.01.2025'}
                        name="Фестиваль талантов"
                        address="г. Екатеринбург, ул. Мира, д. 19"
                        organizer={'УКНО'}
                        places={150}
                        free_places={30}
                        index={1}
                    /> */}
                    {events && events.slice(0).reverse().map((e, index) => (
                        <ObjectCard
                            {...e}
                            // index={index}
                            key={e.id}
                            />                        
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Main