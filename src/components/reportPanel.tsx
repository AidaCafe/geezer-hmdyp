import "./reportPanel.css";
import { IconParkOutlineSalesReport, TablerTableDown } from "../assets/icons";
import { ReportTable } from "./reportTable";
import { useState } from "preact/hooks";
import { DateTimeRangePicker } from "./dateTimeRange";
import writeXlsxFile from "write-excel-file";

export const ReportForm = (props: ReportFormProps) => {
  const [isShow, setShowState] = useState<boolean>(false);

  const handleXlsx = () => {
    const schema = [
      {
        column: "时间",
        type: String,
        width: 16.8,
        value: (c: ChargeData) => c.time,
      },
      {
        column: "游戏",
        type: String,
        width: 10,
        value: (c: ChargeData) => c.game,
      },
      {
        column: "订单号",
        type: Number,
        width: 10,
        value: (c: ChargeData) => c.orderId,
      },
      {
        column: "价格",
        type: Number,
        value: (c: ChargeData) => c.price,
      },
      {
        column: "支付方式",
        type: String,
        value: (c: ChargeData) => c.paymentMethod,
      },
      {
        column: "支付状态",
        type: Boolean,
        value: (c: ChargeData) => c.status,
      },
    ];
    if (props.data) {
      writeXlsxFile(props.data, { schema, fileName: "pw.xlsx" });
    }
  };

  return (
    <>
      <button
        title="显示报表"
        type="button"
        className="reportTriggerBtn"
        onClick={() => {
          setShowState(!isShow);
        }}
      >
        <IconParkOutlineSalesReport />
      </button>
      <div className={`reportPanel${isShow ? "" : "-hide"}`}>
        <div className="reportPanelData">
          <DateTimeRangePicker start={new Date("2023-12-1")} />
          <ReportTable data={props.data} />
        </div>
        <div className="reportPanelStats">
          <h1>Title</h1>
        </div>
        <div className="statsPanel">
          <ul>
            <li>
              <strong>总计: </strong>
              {props.data?.reduce((j, k) => j + k.price, 0)}
            </li>
            <li>
              <strong>最贵一笔: </strong>
              {props.data?.reduce(
                (max, item) => (item.price > max ? item.price : max),
                0
              )}
            </li>
          </ul>
        </div>
        <div className="floatingButtons">
          <button type="button" title="下载表格" onClick={handleXlsx}>
            <TablerTableDown />
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportForm;
