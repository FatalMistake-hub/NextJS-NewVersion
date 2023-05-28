import { HeaderHosting } from "@components/layouts/common/HeaderHosting";
import { ReactElement } from "react";

const Performance = () => {
  return ( <div className=""></div> );
}
 
export default Performance;
Performance.requireAuth = true;
Performance.getLayout = function (page: ReactElement) {
    return (
        <>
            <HeaderHosting />
            {page}
        </>
    );
};
