import { FC } from "react";
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";
import { XCircleIcon } from "@heroicons/react/outline";

interface ExpertModePanelProps {
  active: boolean;
  onClose: () => void;
  children?;
}

const ExpertModePanel: FC<ExpertModePanelProps> = ({
  active,
  children,
  onClose,
}) => {
  const { i18n } = useLingui();
  if (!active) return <>{children}</>;

  return (
    <div className="">
      <div className="h-[34px] flex justify-end">
        <div className="relative flex items-center justify-between gap-6 pl-8 pr-3 -mb-2 rounded-tl-full rounded-tr bg-dark-800">
          <span className="mb-1 text-sm font-bold tracking-widest uppercase">
            {i18n._(t`Expert Mode`)}
          </span>
          <div onClick={onClose} className="mb-1 cursor-pointer">
            <XCircleIcon
              width={20}
              height={20}
              className="hover:text-high-emphesis"
            />
          </div>
        </div>
      </div>
      <div className="border border-[2px] border-gray-800 rounded bg-dark-900">
        {children}
      </div>
    </div>
  );
};

export default ExpertModePanel;
