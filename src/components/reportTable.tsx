import {
  RiAlipayFill,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiWechatPayFill,
  RiQuestionFill,
} from "../assets/icons";

import "./reportTable.css";

export const PaymentMethod = ({ method }: { method: string }) => {
  switch (method) {
    case "支付宝":
    case "支付宝扫码":
      return <RiAlipayFill title="支付宝" />;
    case "微信":
    case "微信扫码":
      return <RiWechatPayFill title="微信支付" />;
    default:
      return <RiQuestionFill title={method} />;
  }
};

export const ReportTable = (props: ReportFormProps) => {
  return (
    <div className="reportTable">
      <table>
        <thead>
          <tr>
            <th>时间</th>
            <th>游戏</th>
            <th>订单号</th>
            <th>价格</th>
            <th>支付状态</th>
          </tr>
        </thead>
        <tbody>
          {props.data?.map((charge) => (
            <tr key={charge.orderId}>
              <td>{charge.time}</td>
              <td>{charge.game}</td>
              <td>{charge.orderId}</td>
              <td>{charge.price}</td>
              <td>
                <PaymentMethod method={charge.paymentMethod} />
                &nbsp;
                {charge.status ? (
                  <RiCheckboxCircleFill />
                ) : (
                  <RiErrorWarningFill />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
