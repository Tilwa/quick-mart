// "use client"; // ✅ Mark as a Client Component

// import { Provider } from "react-redux";
// import store from "@/app/redux/store";
// import Vocabulary from "../_components/Vocabulary";

// export default function Page() {
//   return (
//     <Provider store={store}>
//       <Vocabulary />
//     </Provider>
//   );
// }
"use client";
import { usePathname } from "next/navigation";

import "./page.css";
function Page() {
  const pathname = usePathname();

  return <div className="dashboard-home">dashboard main</div>;
}

export default Page;
