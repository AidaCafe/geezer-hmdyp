import { JSX, toChildArray, isValidElement } from "preact";
import { SvgSpinners180RingWithBg } from "../assets/icons";
import "./calcButton.css";

interface CalcButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const CalcButton = (props: CalcButtonProps) => {
  let childs = toChildArray(props.children);
  if (props.isLoading) {
    if (childs.length > 0 && isValidElement(childs[0])) {
      childs = [<SvgSpinners180RingWithBg />];
    } else {
      childs.unshift(<SvgSpinners180RingWithBg />);
    }
  }

  return <button {...props}>{childs}</button>;
};

CalcButton.Group = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  return <div className="calcBtnGroup" {...props} />;
};

export default CalcButton;
