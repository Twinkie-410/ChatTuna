import React from 'react';

interface TableSectionProps {
    username: string;
    firstName: string;
    index: number
}

function TableSection({ username, firstName, index }: TableSectionProps) {
    return (
        <>
            <div className="table-row text-center h-[45px]">
                <div className="border-r-black border-r px-[9px] max-h-[6px] table-cell align-middle bg-[#D0DADF] rounded-l-md">
                    {index + 1}
                </div>
                <div className="border-r-black border-r px-[9px] max-h-[6px] table-cell align-middle bg-[#D0DADF] rounded-l-md">
                    {firstName}
                </div>
                <div className="table-cell bg-[#D0DADF] align-middle rounded-md">
                    @{username}
                </div>
            </div>
        </>
    );
}

export default TableSection;