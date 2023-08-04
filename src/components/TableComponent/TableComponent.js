import { Table } from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import { useMemo, useState } from 'react';

import Button from '~/components/Button';

function TableComponent(props) {
    const { selectionType = 'checkbox', data: dataSource = [], columns = [], handleDeleteMany } = props;
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    const newColumnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action');
        return arr;
    }, [columns]);

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

    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet('test')
            .addColumns(newColumnExport)
            .addDataSource(dataSource, {
                str2Percent: true,
            })
            .saveAs('Excel.xlsx');
    };
    return (
        <div>
            {rowSelectedKeys.length > 0 && (
                <Button onClick={handleDeleteAll} outline>
                    Xoá
                </Button>
            )}
            <Button outline onClick={exportExcel}>
                Xuất file Excel
            </Button>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </div>
    );
}

export default TableComponent;
