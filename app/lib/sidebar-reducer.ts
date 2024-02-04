import { Cashflow } from "@lib/definitions";
import { updateCashflows } from "@lib/actions";

type ReducerActions =
  | { type: "income_change"; income: string }
  | { type: "savings_change"; savings: string }
  | { type: "submit" };

export default function cashflowReducer(
  cashflowObj: Cashflow,
  action: ReducerActions,
) {
  switch (action.type) {
    case "savings_change": {
      const newCashflow = { ...cashflowObj, savings: action.savings };
      console.log("Updated savings input.");

      return newCashflow;
    }
    case "income_change": {
      const newCashflow = { ...cashflowObj, income: action.income };
      console.log("Updated income input.");

      return newCashflow;
    }
    case "submit": {
      try {
        updateCashflows(cashflowObj);
        return cashflowObj;
      } catch (error) {
        console.log("Failed to change cashflows.");
      }
    }
    default: {
      throw new Error("Failed to perform action");
    }
  }
}
