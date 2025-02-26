import { useParams } from "react-router";
import { mainTemplate } from "./Router";
import EditServerContextProvider from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import { lazy } from "react";
const EditVm = lazy(() => import("src/pages/vm/EditVm"));

export const EditVmWrapper = () => {
    const { projectId } = useParams();
    const backUrl = `/vm/${projectId}/list`;
    
    return mainTemplate(
      EditVm,
      {
        link: {
          text: "بازگشت به مدیریت سرور ابری",
          url: backUrl,
        },
        hideSidebar: false,
      },
      EditServerContextProvider
    );
};