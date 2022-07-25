import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React";
import { AppDispatch, AppState } from "../index";
import {
  addPopup,
  ApplicationModal,
  PopupContent,
  removePopup,
  setOpenModal,
} from "./actions";

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React();

  return useSelector((state: AppState) =>
    state.application.blockNumber
      ? state.application.blockNumber[chainId ?? -1]
      : 0
  );
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useSelector(
    (state: AppState) => state.application.openModal
  );
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(
    () => dispatch(setOpenModal(open ? null : modal)),
    [dispatch, modal, open]
  );
}

export function useOpenModal(modal: ApplicationModal): () => void {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setOpenModal(modal)), [dispatch, modal]);
}

export function useCloseModals(): () => void {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(() => dispatch(setOpenModal(null)), [dispatch]);
}
export function useAuctionModal(): () => void {
  return useToggleModal(ApplicationModal.AUCTION);
}
export function useShareModal(): () => void {
  return useToggleModal(ApplicationModal.SHARE);
}
export function useFreeNftModal(): () => void {
  return useToggleModal(ApplicationModal.FREE_NFT);
}
export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
}

export function useHatchEggModal(): () => void {
  return useToggleModal(ApplicationModal.HATCH_EGG);
}
export function useHatchEggAnimationModal(): () => void {
  return useToggleModal(ApplicationModal.HATCH_EGG_ANIMATION);
}
export function useExpandNFTModal(): () => void {
  return useToggleModal(ApplicationModal.EXPAND_NFT);
}

export function useNetworkModalToggle(): () => void {
  return useToggleModal(ApplicationModal.NETWORK);
}

export function useToggleSettingsMenu(): () => void {
  return useToggleModal(ApplicationModal.SETTINGS);
}

export function useShowClaimPopup(): boolean {
  return useModalOpen(ApplicationModal.CLAIM_POPUP);
}

export function useToggleShowClaimPopup(): () => void {
  return useToggleModal(ApplicationModal.CLAIM_POPUP);
}

export function useToggleSelfClaimModal(): () => void {
  return useToggleModal(ApplicationModal.SELF_CLAIM);
}

export function useToggleDelegateModal(): () => void {
  return useToggleModal(ApplicationModal.DELEGATE);
}

export function useToggleVoteModal(): () => void {
  return useToggleModal(ApplicationModal.VOTE);
}

export function useBuyEggModalToggle(): () => void {
  return useToggleModal(ApplicationModal.BUYEGG);
}

export function useMyNftModalToggle(): () => void {
  return useToggleModal(ApplicationModal.MY_NFT);
}

export function useCountdownToggle(): () => void {
  return useToggleModal(ApplicationModal.COUNTDOWN);
}

export function useBuyZooModalToggle(): () => void {
  return useToggleModal(ApplicationModal.BUYZOO);
}
export function useCastVoteModalToggle(): () => void {
  return useToggleModal(ApplicationModal.CAST_VOTE);
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string) => void {
  const dispatch = useDispatch();

  return useCallback(
    (content: PopupContent, key?: string) => {
      dispatch(addPopup({ content, key }));
    },
    [dispatch]
  );
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }));
    },
    [dispatch]
  );
}

// get the list of active popups
export function useActivePopups(): AppState["application"]["popupList"] {
  const list = useSelector((state: AppState) => state.application.popupList);
  return useMemo(() => list.filter((item) => item.show), [list]);
}

export function useKashiApprovalPending(): string {
  return useSelector(
    (state: AppState) => state.application.kashiApprovalPending
  );
}

export function useEditAuctionModalToggle(): () => void {
  return useToggleModal(ApplicationModal.EDIT_AUCTION);
}

export function useIncreaseBidModalToggle(): () => void {
  return useToggleModal(ApplicationModal.INCREASE_BID);
}
