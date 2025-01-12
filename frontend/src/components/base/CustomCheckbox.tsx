import React, { useState } from 'react';

interface CustomCheckboxProps {
    label: string;
    id?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, id = 'custom-checkbox' }) => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleCheckboxChange = () => {
        setChecked(!checked);
    };

    return (
        <div className="flex items-center text-[20px] gap-[8px] py-[8px] px-[22px] ml-auto text-[#454F55] bg-[#EBEBEB] rounded-md w-[510px]">
            <input
                type="checkbox"
                id={id}
                className="hidden"
                checked={checked}
                onChange={handleCheckboxChange}
            />
            <label
                htmlFor={id}
                className="flex items-center cursor-pointer justify-between w-[100%]"
            >
                <span>{label}</span>
                <div className="">
                    <div className={`border-2 rounded mr-2 flex items-center justify-center ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="7" fill="#EBEBEB"/>
                        <rect width="27" height="26" rx="7" transform="matrix(-1 0 0 1 34 7)" fill="#9AA8B0"/>
                        <rect width="3.47813" height="20.1731" rx="1.73906" transform="matrix(-0.726941 -0.687207 -0.726941 0.687207 32.1996 15.3906)" fill="white"/>
                        <rect width="3.47813" height="11.6053" rx="1.73906" transform="matrix(0.726941 -0.687207 0.726941 0.687207 9.07764 21.2793)" fill="white"/>
                    </svg>
                </div>
                </div>
            </label>
        </div>
    );
};

export default CustomCheckbox;
