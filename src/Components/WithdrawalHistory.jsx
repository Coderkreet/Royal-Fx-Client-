import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
// import { SectionHeading } from "../UI/HeadingAndPara";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slice/loadingSlice";
import { getWithdrawalHistory } from "../api/user-api";
import { formatDateTime, maskWalletAddress } from "../utils/additonalFunc";
import { NumberFormatCommas } from "../utils/FormatText";

const WithdrawalHistory = () => {
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  
  const fetchHistory = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getWithdrawalHistory();
      setHistory(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fetchHistory();
  }, []);
  const serialNumberTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };
  const statusTemplate = (rowData) => {
    if (rowData.status === "Pending") {
      return <Tag severity="warning">Pending</Tag>;
    } else if (rowData.status === "Completed") {
      return <Tag severity="success">Success</Tag>;
    }
  };
  return (
    <>
      <div className="WithdrawalHistory marTop">
        {/* <SectionHeading name={"Withdrawal History"} /> */}
        <div className=" card-shadow ss-dataTable ">
          <DataTable
            value={history?.history}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            filterDisplay="row"
          >
            <Column
              style={{ width: "10%" }}
              body={serialNumberTemplate}
              header="S.No"
              filter
              sortable
            />
            <Column
              field="transactionId"
              header="Transaction ID"
              filter
              sortable
            />
            <Column
              field="amount"
              header="Amount"
              filter
              body={(rowData) => <NumberFormatCommas value={rowData?.amount} />}
              sortable
            />
            <Column
              field="clientAddress"
              header="Wallet Address"
              body={(rowData) => maskWalletAddress(rowData?.clientAddress)}
              filter
              sortable
            />
            <Column
              field="status"
              body={statusTemplate}
              header="Status"
              filter
              sortable
            />
            <Column style={{ width: "20%" }} field="createdAt" header="Date" body={(rowData) => formatDateTime(rowData?.createdAt)} filter sortable />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default WithdrawalHistory;
