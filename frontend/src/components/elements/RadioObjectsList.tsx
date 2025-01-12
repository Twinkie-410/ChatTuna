import React from "react";
import { IObject } from "../../models/IObject";

interface RadioListProps {
    array: IObject[]
    stateFunc: React.Dispatch<React.SetStateAction<string>>
    state: string
}

function RadioObjectsList({array, state, stateFunc} : RadioListProps) {

    function handleChange(e: string) {
        stateFunc(e)
    }

    return (
        <div className="relative bg-white last:border-b-[1px] border-black">
            {array.map(e => (
            <div className="flex text-[16px] hover:bg-[#D0DADF] border-black border-[1px] border-b-[0px] py-[6px] px-[15px]" key={e.id}>
                <label htmlFor={e.name} className="select-none grow">{e.name}</label>
                <input type="radio" id={e.name} name='objects' value={e.name} className="w-[19px]"
                onChange={() => handleChange(e.name)}
                checked={state === e.name? true : false}
                />
            </div> 
            ))}                                
        </div>
    )
}

export default RadioObjectsList;