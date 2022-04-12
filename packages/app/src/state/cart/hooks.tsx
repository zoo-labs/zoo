import { AppDispatch, AppState } from "../index";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {} from "./actions";
import { formatError } from "functions/format";
import {
  collection,
  getDocs,
  orderBy,
  limit,
  query,
  where,
  startAfter,
} from "firebase/firestore";
import { db } from "config/firebase";
import axios from "axios";
import { toast } from "react-toastify";

const notify = (message: string, type: string) => {
  switch (type) {
    case "error":
      toast.error(message);
      break;
    case "success":
      toast.success(message);
      break;
    default:
      toast.info(message);
  }
};

// export function useTransactionAdder(): (
//   response: TransactionResponseLight
// ) => void {
//   const dispatch = useAppDispatch();

//   return useCallback(
//     (response: TransactionResponseLight) => {
//       const { hash } = response;
//       if (!hash) {
//         throw Error("No transaction hash found.");
//       }
//       dispatch();
//       // addTransaction({
//       //   id: "",
//       //   hash: "",
//       // })
//     },
//     [dispatch]
//   );
// }

// returns all the transactions for the active organization
//export function useAllTransactions(): (
//   startDate?: string,
//   endDate?: string,
//   noLimit?: boolean,
//   callback?: (val: Array<Transaction>) => void
// ) => void {
//   const { activeOrganization } = useAppSelector((state) => state.organization);
//   const dispatch = useDispatch();
//   const getRefunds = useAllRefunds();
//   const [apiMode, toggleSetApiMode] = useApiModeManager();

//   return useCallback(
//     async (startDate, endDate, noLimit, callback) => {
//       const transactions: Array<Transaction> = [];
//       const transactionsRef = collection(
//         db,
//         apiMode ? "transactions" : "transactions_test"
//       );
//       if (!startDate && !endDate) {
//         if (activeOrganization) {
//           // console.log("getting transactions");

//           const transactionsQuery = query(
//             transactionsRef,
//             where("owner.clientName", "==", activeOrganization.name),
//             orderBy("created"),
//             limit(100)
//           );
//           const transactionsQuerySnapshot = await getDocs(transactionsQuery);
//           // // Get the last visible document
//           // const lastVisible =
//           //   transactionsQuerySnapshot.docs[
//           //     transactionsQuerySnapshot.docs.length - 1
//           //   ];
//           // console.log("last", lastVisible);

//           // // Construct a new query starting at this document,
//           // // get the next 25 cities.
//           // const next = query(
//           //   transactionsRef,
//           //   where("owner.clientName", "==", activeOrganization.name),
//           //   orderBy("created"),
//           //   startAfter(lastVisible),
//           //   limit(25)
//           // );

//           transactionsQuerySnapshot.forEach((doc) => {
//             const data = doc.data() as Transaction;
//             transactions.push(data);
//           });
//         }
//       } else {
//         const first = noLimit
//           ? query(
//               transactionsRef,
//               orderBy("created"),
//               where("owner.clientName", "==", activeOrganization.name),
//               where("created", ">=", new Date(startDate)),
//               where("created", "<=", new Date(endDate))
//             )
//           : query(
//               transactionsRef,
//               orderBy("created"),
//               where("owner.clientName", "==", activeOrganization.name),
//               where("created", ">=", new Date(startDate)),
//               where("created", "<=", new Date(endDate)),
//               limit(100)
//             );

//         const documentSnapshots = await getDocs(first);

//         documentSnapshots.forEach((doc) => {
//           const data = doc.data() as Transaction;
//           transactions.push(data);
//         });
//       }

//       console.log("transactions here", transactions.length);
//       if (callback) {
//         callback(transactions);
//       } else {
//         dispatch(getTransactions(transactions));
//         getRefunds(transactions);
//       }
//     },
//     [activeOrganization, apiMode]
//   );
// }

// // returns all the transactions for the current chain
// export function useAllRefunds(): (
//   transactions: Transaction[],
//   startDate?: string,
//   endDate?: string
// ) => void {
//   const apiMode = useSelector((state: AppState) => state.application.apiMode);

//   const { activeOrganization } = useAppSelector((state) => state.organization);

//   const dispatch = useDispatch();
//   return useCallback(
//     async (transactions, startDate, endDate) => {
//       const refunds: Array<Refund> = [];
//       const refundsRef = collection(
//         db,
//         apiMode === ApiMode.TEST ? "refunds_test" : "refunds"
//       );

//       if (activeOrganization) {
//         if (!startDate && !endDate) {
//           const refundsQuery = query(refundsRef);

//           const refundsQuerySnapshot = await getDocs(refundsQuery);
//           refundsQuerySnapshot.forEach((doc) => {
//             const data = doc.data() as Refund;
//             refunds.push(data);
//           });
//         } else {
//           const refundsQuery = query(refundsRef);

//           const first = query(
//             refundsQuery,
//             orderBy("created"),
//             where("created", ">=", new Date(startDate)),
//             where("created", "<=", new Date(endDate)),
//             limit(25)
//           );
//           const refundsQuerySnapshot = await getDocs(first);
//           refundsQuerySnapshot.forEach((doc) => {
//             const data = doc.data() as Refund;
//             refunds.push(data);
//           });
//         }
//       }
//       const results: Refund[] = refunds.filter(({ transactionId }) =>
//         transactions.some((x) => x.id == transactionId)
//       );

//       dispatch(getRefunds(results));
//     },
//     [activeOrganization]
//   );
// }

// export function useRefundAdder(): (
//   transaction: Transaction,
//   reason: string
// ) => void {
//   const [apiMode, toggleSetApiMode] = useApiModeManager();
//   const { activeOrganization } = useAppSelector((state) => state.organization);
//   return useCallback(async (transaction, reason) => {
//     console.log("REFUND REQUESTED for " + JSON.stringify(transaction, null, 2));
//     if (transaction?.orderSummary?.currency) {
//       const refundParams: RefundParams = {
//         transactionId: transaction.id,
//         reason,
//         amount: String(transaction.orderSummary.total),
//         currency: transaction.orderSummary.currency,
//         sendNotification: false,
//       };
//       try {
//         const refunded = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/refund`,
//           refundParams,
//           {
//             headers: {
//               "payminto-client-key":
//                 apiMode === ApiMode.TEST
//                   ? activeOrganization?.apiKeyTest
//                   : activeOrganization?.apiKeyProd,
//             },
//           }
//         );
//         console.log("refunded", refunded);
//         notify("You have successfully made a refund request", "success");
//       } catch (error) {
//         notify("An error occured while making your refund request", "success");
//         console.log("error refunding", error);
//       }
//     } else {
//       notify("Transaction is not valid", "error");
//     }
//   }, []);
// }
