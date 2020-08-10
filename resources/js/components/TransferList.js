import React from 'react'

const TransferList = ({transfers}) => {
    return (
        <div className="w-100">
            <table className="table table-bordered">
                <tbody>
                    { transfers.map((transfer) => (
                        <tr key={transfer.id}>
                            <td className="text-center">{transfer.description}</td>
                            <td className={"text-center " + (transfer.amount > 0 ? "alert-success": 'alert-danger')}>{transfer.amount}</td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default TransferList;
