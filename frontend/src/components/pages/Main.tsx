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
                    {events && events.slice(0).reverse().map((e) => (
                        <ObjectCard
                            {...e}
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