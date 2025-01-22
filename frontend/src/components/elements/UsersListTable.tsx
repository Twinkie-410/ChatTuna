import UsersTableHeader from "./UsersTableHeader";

function UsersListTable() {
    return ( 
        <div className="mx-auto w-[100%] table border-spacing-y-[3px] h-fit">
            <UsersTableHeader />
            {/* {section.sections.map(e => (
                <TableSectionRow
                section={e}
                />
            ))} */}
            
        </div>
    );
}

export default UsersListTable;