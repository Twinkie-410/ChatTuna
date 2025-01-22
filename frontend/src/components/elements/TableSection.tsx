interface TableSectionProps {
    username: string;
    firstName: string;
    index: number;
    submission?: string
}

function TableSection({ username, firstName, index, submission = 'Нет работы' }: TableSectionProps) {
    return (
        <>
            <div className="table-row text-center h-[45px]">
                <div className="border-r-black border-r px-[9px] max-h-[6px] table-cell align-middle bg-[#D0DADF] rounded-l-md">
                    {index + 1}
                </div>
                <div className="border-r-black border-r px-[9px] max-h-[6px] table-cell align-middle bg-[#D0DADF] rounded-l-md">
                    {firstName}
                </div>
                <div className="border-r-black border-r max-w-[140px] px-[9px] max-h-[6px] table-cell align-middle bg-[#D0DADF] rounded-l-md">
                    <a href={submission} className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 cursor-pointer line-clamp-1">{submission}</a>
                </div>
                <div className="table-cell bg-[#D0DADF] align-middle rounded-md">
                    @{username}
                </div>
            </div>
        </>
    );
}

export default TableSection;