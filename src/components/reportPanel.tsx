import "./reportPanel.css";
import { IconParkOutlineSalesReport } from "../assets/icons";
import { ReportTable } from "./reportTable";
import { useState } from "preact/hooks";
import { DateTimeRangePicker } from "./dateTimeRange";

export const ReportForm = (props: ReportFormProps) => {
  const [isShow, setShowState] = useState<boolean>(false);
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
        </div>
      </div>
    </>
  );
};

export default ReportForm;
