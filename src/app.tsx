import { CalcButton } from "./components/calcButton";
import { ReportForm } from "./components/reportPanel";
import { CryptocurrencyColorBtc } from "./assets/icons";
import { useState } from "preact/hooks";
import "./app.css";

export function App() {
  const lastPage = parseInt(
    document.querySelector(".fansPage.mt30")?.lastChild?.previousSibling
      ?.textContent!
  );
  const [data, setData] = useState<ChargeData[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const fetchChargeHist = async () => {
    try {
      const fetchPromises = Array.from({ length: lastPage }, async (_, i) => {
        const response = await fetch(
          `https://${window.location.host}/billing/chargeDetailRecord/-1/-1/1/${
            i + 1
          }`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error(`请求数据出错: ${response.statusText}`);
        }

        const responseText = await response.text();
        const doc = new DOMParser().parseFromString(responseText, "text/html");
        const paidHistTable = Array.from(
          doc.querySelectorAll(
            "#mainWrap > div > div.fr.w705 > div.t.f12.mt30 > table > tbody tr"
          )
        );

        let currentPrice = 0;

        paidHistTable.forEach((row) => {
          const [time, game, orderIdStr, priceStr, paymentMethod, statusText] =
            Array.from(row.querySelectorAll("td")).map(
              (td) => td.textContent?.trim()!
            );

          console.log(
            time,
            game,
            orderIdStr,
            priceStr,
            paymentMethod,
            statusText
          );
          const orderId = parseInt(orderIdStr!);
          const price = parseInt(priceStr.slice(1));
          const status = statusText == "付款成功" ? true : false;
          data?.push({ time, game, orderId, price, paymentMethod, status });
          currentPrice += price;
        });

        console.log(`第${i + 1}页 爆了 ${currentPrice} 金币`);
      });

      await Promise.all(fetchPromises);
    } catch (error) {
      console.error("请求数据出错:", error);
      throw error;
    }
  };

  const getData = () => {};

  return (
    <div className="hmdyp">
      <CalcButton.Group>
        <CalcButton
          title="简单计算"
          onClick={async () => {
            if (data.length == 0) {
              setLoadingState(true);
              fetchChargeHist()
                .then(() => console.log(data))
                .then(() => setLoadingState(false));
            } else {
              console.log(data);
            }
          }}
          isLoading={loadingState}
        >
          <CryptocurrencyColorBtc />
        </CalcButton>
        <CalcButton isLoading={loadingState}>金币爆几何？</CalcButton>
      </CalcButton.Group>
      {data.length ? <ReportForm data={data} /> : undefined}
    </div>
  );
}
