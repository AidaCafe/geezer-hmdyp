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
          <h1>Hello World</h1>
          <div className="statsPanel">
            <ul>
              <li>
                <strong>总计: </strong>114514
              </li>
              <li>
                <strong>总计: </strong>114514
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportForm;
