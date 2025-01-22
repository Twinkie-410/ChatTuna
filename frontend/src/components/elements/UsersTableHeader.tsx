function UsersTableHeader() {
    return <>
        <div className="table-row text-center rounded-md align-middle" style={{ height: '60px', overflow: 'hidden' }}>
            <div className="border-r-black border-r px-[9px] max-h-[6px] table-cell align-middle bg-[#9AA8B0] rounded-l-md">
                №
            </div>
            <div className="border-r-black border-r px-[150px] table-cell align-middle bg-[#9AA8B0] max-h-[6px] whitespace-nowrap">Имя участника</div>
            <div className=" px-[100px] table-cell align-middle bg-[#9AA8B0] rounded-r-md max-h-[6px] whitespace-nowrap">
                <div className="">
                    Номер телефона /
                </div>
                <div className="">
                    ник в телеграм
                </div>
            </div>
        </div> 
    </>
}

export default UsersTableHeader