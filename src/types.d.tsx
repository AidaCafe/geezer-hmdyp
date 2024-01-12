interface ChargeData {
  time: string;
  game: string;
  orderId: number;
  price: number;
  paymentMethod: string;
  status: boolean;
}

interface ReportFormProps {
  data?: ChargeData[];
}

interface ReportTableProps {
  data?: ChargeData[];
}

interface TableProps {
  maxWidth?: string | number;
  minWidth?: string | number;
  textColor?: string | number;
}

interface DateTimeRangeProps {
  start?: Date;
  end?: Date;
  setStart?: (s: Date) => void;
  setEnd?: (s: Date) => void;
}
