import { useEffect, ReactNode } from "react";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Main from "../../components/Main";
import Popups from "../../components/Popups";
import { useActiveWeb3React } from "../../hooks";
import { updateGasPrice } from "../../state/network/actions";

const ModalLayout = ({
  children,
  banner = undefined,
  bg = "bg-[#111]",
  arrowBg,
}: {
  children: ReactNode;
  banner?: any;
  bg?: string;
  arrowBg?: string;
}) => {
  const { library } = useActiveWeb3React();
  useEffect(() => {
    updateGasPrice(library);
  }, [library]);
  return (
    <div className="z-0 flex flex-col items-center w-full h-screen pb-16 lg:pb-0">
      <Header />
      <Main isModal={true} bgColor={bg}>
        {children}
      </Main>
      <Popups />
    </div>
  );
};

export default ModalLayout;
