import { CustomerRow } from './cusrow'

export const CustomerTable = ({ rowDatas }) =>
    <table>
        <thead>
            <tr>
                <th>STT</th>
                <th>Nghề</th>
                <th>Tên</th>
                <th>Số Điện Thoại</th>
            </tr>
        </thead>
        <tbody>
            {
                rowDatas.map(function (x, i) {
                    return (
                        <CustomerRow
                            key={i + 1}
                            data={x}
                        />
                    )

                })
            }
        </tbody>
    </table>


