import { useState } from "preact/hooks";
import "./dateTimeRange.css";

export const DateTimeRangePicker = (props: DateTimeRangeProps) => {
  const [timeStart, setTimeStart] = useState<Date>(props.start ?? new Date());
  const [timeEnd, setTimeEnd] = useState<Date>(props.end ?? new Date());

  return (
    <div className="dateTimeRange">
      <input
        type="datetime-local"
        max={
          props.end &&
          (timeEnd < props.end ? timeEnd : props.end).toISOString().slice(0, -8)
        }
        value={timeStart.toISOString().slice(0, -8)}
        onChange={(e) =>
          setTimeStart(new Date((e.target as HTMLInputElement).value))
        }
      />
      <input
        type="datetime-local"
        min={
          props.start &&
          (timeStart > props.start ? timeStart : props.start)
            .toISOString()
            .slice(0, -8)
        }
        value={timeEnd.toISOString().slice(0, -8)}
        onChange={(e) =>
          setTimeEnd(new Date((e.target as HTMLInputElement).value))
        }
      />
    </div>
  );
};
