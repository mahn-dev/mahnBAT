import { Table } from 'antd';
import { useState } from 'react';

import Button from '~/components/Button';

function TableComponent(props) {
    const { selectionType = 'checkbox', data = [], columns = [], handleDeleteMany } = props;
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys);
    };
    return (
        <div>
            {rowSelectedKeys.length > 0 && (
                <Button onClick={handleDeleteAll} outline>
                    Xoá
                </Button>
            )}
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </div>
    );
}

export default TableComponent;
