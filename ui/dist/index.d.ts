import React, { FC, ReactNode, ComponentPropsWithoutRef, Dispatch, ReactElement, SetStateAction, CSSProperties, VideoHTMLAttributes, AudioHTMLAttributes, IframeHTMLAttributes, ComponentPropsWithRef } from "react";
import { ZooClientOptions, paths, Execute, ZooChain, ZooClientActions } from "@zoolabs/sdk";
import { SWRConfig, SWRConfiguration } from "swr";
import { SWRInfiniteConfiguration } from "swr/infinite";
import * as Popover from "@radix-ui/react-popover";
import * as DialogPrimitive from "@radix-ui/react-dialog";
export interface Theme {
    radii: {
        borderRadius: string;
    };
    fonts: {
        body: string;
        button: string;
        headline: string;
    };
    colors: ThemeColors;
    assets: {
        ethIcon: 'glyph' | 'gray' | 'purple';
    };
}
interface ThemeColors {
    accentBase: string;
    accentBgSubtle: string;
    accentBg: string;
    accentBgHover: string;
    accentBgActive: string;
    accentLine: string;
    accentBorder: string;
    accentBorderHover: string;
    accentSolid: string;
    accentSolidHover: string;
    accentText: string;
    accentTextContrast: string;
    neutralBase: string;
    neutralBgSubtle: string;
    neutralBg: string;
    neutralBgHover: string;
    neutralBgActive: string;
    neutalLine: string;
    neutralBorder: string;
    neutralBorderHover: string;
    neutralSolid: string;
    neutralSolidHover: string;
    neutralText: string;
    neutralTextContrast: string;
    secondaryBase: string;
    secondaryBgSubtle: string;
    secondaryBg: string;
    secondaryBgHover: string;
    secondaryBgActive: string;
    secondaryLine: string;
    secondaryBorder: string;
    secondaryBorderHover: string;
    secondarySolid: string;
    secondarySolidHover: string;
    secondaryText: string;
    secondaryTextContrast: string;
    borderColor: string;
    textColor: string;
    focusColor: string;
    errorText: string;
    errorAccent: string;
    successAccent: string;
    reservoirLogoColor: string;
    inputBackground: string;
    buttonTextColor: string;
    buttonTextHoverColor: string;
    overlayBackground: string;
    headerBackground: string;
    footerBackground: string;
    contentBackground: string;
    wellBackground: string;
    popoverBackground: string;
}
type ThemeOverrides = {
    borderRadius?: string;
    font?: string;
    buttonFont?: string;
    buttonTextColor?: string;
    buttonTextHoverColor?: string;
    headlineFont?: string;
    primaryColor?: string;
    primaryHoverColor?: string;
    wellBackground?: string;
    textColor?: string;
    headerBackground?: string;
    contentBackground?: string;
    footerBackground?: string;
    overlayBackground?: string;
    popoverBackground?: string;
    borderColor?: string;
    ethIcon?: Theme['assets']['ethIcon'];
};
export function lightTheme(overrides?: ThemeOverrides): Theme;
export function darkTheme(overrides?: ThemeOverrides): Theme;
interface ZooClientProviderProps {
    children: ReactNode;
    options: ZooClientOptions;
}
export const ZooClientProvider: FC<ZooClientProviderProps>;
type ZooProviderOptions = {
    disablePoweredByZoo?: boolean;
};
interface ZooProviderProps {
    children: ReactNode;
    options?: ZooClientOptions & ZooProviderOptions;
    theme?: Theme;
    swrOptions?: ComponentPropsWithoutRef<typeof SWRConfig>['value'];
}
export const ZooProvider: FC<ZooProviderProps>;
type CollectionsQuery = paths['/collections/v5']['get']['parameters']['query'];
export function useCollections(options?: CollectionsQuery | false, swrOptions?: SWRInfiniteConfiguration, chainId?: number): {
    data: {
        id?: string | undefined;
        slug?: string | undefined;
        createdAt?: string | undefined;
        name?: string | undefined;
        image?: string | undefined;
        banner?: string | undefined;
        discordUrl?: string | undefined;
        externalUrl?: string | undefined;
        twitterUsername?: string | undefined;
        openseaVerificationStatus?: string | undefined;
        description?: string | undefined;
        sampleImages?: string[] | undefined;
        tokenCount?: string | undefined;
        onSaleCount?: string | undefined;
        primaryContract?: string | undefined;
        tokenSetId?: string | undefined;
        royalties?: {
            recipient?: string | undefined;
            breakdown?: {
                recipient?: string | undefined;
                bps?: number | undefined;
            }[] | undefined;
            bps?: number | undefined;
        } | undefined;
        allRoyalties?: {
            [key: string]: unknown;
        } | undefined;
        lastBuy?: {
            value?: number | undefined;
            timestamp?: number | undefined;
        } | undefined;
        floorAsk?: {
            id?: string | undefined;
            sourceDomain?: string | undefined;
            price?: {
                currency?: {
                    contract?: string | undefined;
                    name?: string | undefined;
                    symbol?: string | undefined;
                    decimals?: number | undefined;
                } | undefined;
                amount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
                netAmount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
            } | undefined;
            maker?: string | undefined;
            validFrom?: number | undefined;
            validUntil?: number | undefined;
            token?: {
                contract?: string | undefined;
                tokenId?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
            } | undefined;
        } | undefined;
        topBid?: {
            id?: string | undefined;
            sourceDomain?: string | undefined;
            price?: {
                currency?: {
                    contract?: string | undefined;
                    name?: string | undefined;
                    symbol?: string | undefined;
                    decimals?: number | undefined;
                } | undefined;
                amount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
                netAmount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
            } | undefined;
            maker?: string | undefined;
            validFrom?: number | undefined;
            validUntil?: number | undefined;
        } | undefined;
        rank?: {
            "1day"?: number | undefined;
            "7day"?: number | undefined;
            "30day"?: number | undefined;
            allTime?: number | undefined;
        } | undefined;
        volume?: {
            "1day"?: number | undefined;
            "7day"?: number | undefined;
            "30day"?: number | undefined;
            allTime?: number | undefined;
        } | undefined;
        volumeChange?: {
            "1day"?: number | undefined;
            "7day"?: number | undefined;
            "30day"?: number | undefined;
        } | undefined;
        floorSale?: {
            "1day"?: number | undefined;
            "7day"?: number | undefined;
            "30day"?: number | undefined;
        } | undefined;
        floorSaleChange?: {
            "1day"?: number | undefined;
            "7day"?: number | undefined;
            "30day"?: number | undefined;
        } | undefined;
        salesCount?: {
            "1day"?: number | undefined;
            "7day"?: number | undefined;
            "30day"?: number | undefined;
            allTime?: number | undefined;
        } | undefined;
        collectionBidSupported?: boolean | undefined;
        ownerCount?: number | undefined;
        attributes?: {
            key?: string | undefined;
            kind?: string | undefined;
            count?: number | undefined;
        }[] | undefined;
    }[];
    hasNextPage: boolean;
    isFetchingInitialData: boolean;
    isFetchingPage: any;
    resetCache: () => Promise<void>;
    fetchNextPage: () => void;
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<{
        continuation?: string | undefined;
        collections?: {
            id?: string | undefined;
            slug?: string | undefined;
            createdAt?: string | undefined;
            name?: string | undefined;
            image?: string | undefined;
            banner?: string | undefined;
            discordUrl?: string | undefined;
            externalUrl?: string | undefined;
            twitterUsername?: string | undefined;
            openseaVerificationStatus?: string | undefined;
            description?: string | undefined;
            sampleImages?: string[] | undefined;
            tokenCount?: string | undefined;
            onSaleCount?: string | undefined;
            primaryContract?: string | undefined;
            tokenSetId?: string | undefined;
            royalties?: {
                recipient?: string | undefined;
                breakdown?: {
                    recipient?: string | undefined;
                    bps?: number | undefined;
                }[] | undefined;
                bps?: number | undefined;
            } | undefined;
            allRoyalties?: {
                [key: string]: unknown;
            } | undefined;
            lastBuy?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            floorAsk?: {
                id?: string | undefined;
                sourceDomain?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                maker?: string | undefined;
                validFrom?: number | undefined;
                validUntil?: number | undefined;
                token?: {
                    contract?: string | undefined;
                    tokenId?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                } | undefined;
            } | undefined;
            topBid?: {
                id?: string | undefined;
                sourceDomain?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                maker?: string | undefined;
                validFrom?: number | undefined;
                validUntil?: number | undefined;
            } | undefined;
            rank?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
                allTime?: number | undefined;
            } | undefined;
            volume?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
                allTime?: number | undefined;
            } | undefined;
            volumeChange?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
            } | undefined;
            floorSale?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
            } | undefined;
            floorSaleChange?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
            } | undefined;
            salesCount?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
                allTime?: number | undefined;
            } | undefined;
            collectionBidSupported?: boolean | undefined;
            ownerCount?: number | undefined;
            attributes?: {
                key?: string | undefined;
                kind?: string | undefined;
                count?: number | undefined;
            }[] | undefined;
        }[] | undefined;
    }[] | undefined>;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<{
        continuation?: string | undefined;
        collections?: {
            id?: string | undefined;
            slug?: string | undefined;
            createdAt?: string | undefined;
            name?: string | undefined;
            image?: string | undefined;
            banner?: string | undefined;
            discordUrl?: string | undefined;
            externalUrl?: string | undefined;
            twitterUsername?: string | undefined;
            openseaVerificationStatus?: string | undefined;
            description?: string | undefined;
            sampleImages?: string[] | undefined;
            tokenCount?: string | undefined;
            onSaleCount?: string | undefined;
            primaryContract?: string | undefined;
            tokenSetId?: string | undefined;
            royalties?: {
                recipient?: string | undefined;
                breakdown?: {
                    recipient?: string | undefined;
                    bps?: number | undefined;
                }[] | undefined;
                bps?: number | undefined;
            } | undefined;
            allRoyalties?: {
                [key: string]: unknown;
            } | undefined;
            lastBuy?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            floorAsk?: {
                id?: string | undefined;
                sourceDomain?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                maker?: string | undefined;
                validFrom?: number | undefined;
                validUntil?: number | undefined;
                token?: {
                    contract?: string | undefined;
                    tokenId?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                } | undefined;
            } | undefined;
            topBid?: {
                id?: string | undefined;
                sourceDomain?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                maker?: string | undefined;
                validFrom?: number | undefined;
                validUntil?: number | undefined;
            } | undefined;
            rank?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
                allTime?: number | undefined;
            } | undefined;
            volume?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
                allTime?: number | undefined;
            } | undefined;
            volumeChange?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
            } | undefined;
            floorSale?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
            } | undefined;
            floorSaleChange?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
            } | undefined;
            salesCount?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
                allTime?: number | undefined;
            } | undefined;
            collectionBidSupported?: boolean | undefined;
            ownerCount?: number | undefined;
            attributes?: {
                key?: string | undefined;
                kind?: string | undefined;
                count?: number | undefined;
            }[] | undefined;
        }[] | undefined;
    }[]>;
    isValidating: boolean;
    isLoading: boolean;
};
type CollectionActivityQuery = paths['/collections/activity/v5']['get']['parameters']['query'];
export function useCollectionActivity(options?: CollectionActivityQuery | false, swrOptions?: SWRInfiniteConfiguration, chainId?: number): {
    data: ({
        type?: string | undefined;
        fromAddress?: string | undefined;
        toAddress?: string | undefined;
        price?: number | undefined;
        amount?: number | undefined;
        timestamp?: number | undefined;
        createdAt?: string | undefined;
        contract?: string | undefined;
        token?: {
            tokenId?: string | undefined;
            tokenName?: string | undefined;
            tokenImage?: string | undefined;
        } | undefined;
        collection?: {
            collectionId?: string | undefined;
            collectionName?: string | undefined;
            collectionImage?: string | undefined;
        } | undefined;
        txHash?: string | undefined;
        logIndex?: number | undefined;
        batchIndex?: number | undefined;
        order?: {
            id?: string | undefined;
            side?: "ask" | "bid" | undefined;
            source?: {
                [key: string]: unknown;
            } | undefined;
            criteria?: {
                kind?: "token" | undefined;
                data?: {
                    token?: {
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
    } | undefined)[];
    hasNextPage: boolean;
    isFetchingInitialData: boolean;
    isFetchingPage: any;
    resetCache: () => Promise<void>;
    fetchNextPage: () => void;
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<{
        continuation?: string | undefined;
        activities?: {
            type?: string | undefined;
            fromAddress?: string | undefined;
            toAddress?: string | undefined;
            price?: number | undefined;
            amount?: number | undefined;
            timestamp?: number | undefined;
            createdAt?: string | undefined;
            contract?: string | undefined;
            token?: {
                tokenId?: string | undefined;
                tokenName?: string | undefined;
                tokenImage?: string | undefined;
            } | undefined;
            collection?: {
                collectionId?: string | undefined;
                collectionName?: string | undefined;
                collectionImage?: string | undefined;
            } | undefined;
            txHash?: string | undefined;
            logIndex?: number | undefined;
            batchIndex?: number | undefined;
            order?: {
                id?: string | undefined;
                side?: "ask" | "bid" | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
                criteria?: {
                    kind?: "token" | undefined;
                    data?: {
                        token?: {
                            tokenId?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                        collection?: {
                            id?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        }[] | undefined;
    }[] | undefined>;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<{
        continuation?: string | undefined;
        activities?: {
            type?: string | undefined;
            fromAddress?: string | undefined;
            toAddress?: string | undefined;
            price?: number | undefined;
            amount?: number | undefined;
            timestamp?: number | undefined;
            createdAt?: string | undefined;
            contract?: string | undefined;
            token?: {
                tokenId?: string | undefined;
                tokenName?: string | undefined;
                tokenImage?: string | undefined;
            } | undefined;
            collection?: {
                collectionId?: string | undefined;
                collectionName?: string | undefined;
                collectionImage?: string | undefined;
            } | undefined;
            txHash?: string | undefined;
            logIndex?: number | undefined;
            batchIndex?: number | undefined;
            order?: {
                id?: string | undefined;
                side?: "ask" | "bid" | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
                criteria?: {
                    kind?: "token" | undefined;
                    data?: {
                        token?: {
                            tokenId?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                        collection?: {
                            id?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        }[] | undefined;
    }[]>;
    isValidating: boolean;
    isLoading: boolean;
};
type UsersActivityBaseQuery = paths['/users/activity/v5']['get']['parameters']['query'];
type UsersQuery = UsersActivityBaseQuery['users'] | undefined;
type UsersActivityQuery = Omit<UsersActivityBaseQuery, 'users'>;
export function useUsersActivity(users?: UsersQuery, options?: UsersActivityQuery | false, swrOptions?: SWRInfiniteConfiguration, chainId?: number): {
    data: ({
        type?: string | undefined;
        fromAddress?: string | undefined;
        toAddress?: string | undefined;
        price?: number | undefined;
        amount?: number | undefined;
        timestamp?: number | undefined;
        contract?: string | undefined;
        token?: {
            tokenId?: string | undefined;
            tokenName?: string | undefined;
            tokenImage?: string | undefined;
            lastBuy?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            lastSell?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            tokenRarityScore?: number | undefined;
            tokenRarityRank?: number | undefined;
            tokenMedia?: string | undefined;
        } | undefined;
        collection?: {
            collectionId?: string | undefined;
            collectionName?: string | undefined;
            collectionImage?: string | undefined;
        } | undefined;
        txHash?: string | undefined;
        logIndex?: number | undefined;
        batchIndex?: number | undefined;
        order?: {
            id?: string | undefined;
            side?: "ask" | "bid" | undefined;
            source?: {
                [key: string]: unknown;
            } | undefined;
            criteria?: {
                kind?: "token" | undefined;
                data?: {
                    token?: {
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        createdAt?: string | undefined;
    } | undefined)[];
    hasNextPage: boolean;
    isFetchingInitialData: boolean;
    isFetchingPage: any;
    resetCache: () => Promise<void>;
    fetchNextPage: () => void;
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<{
        continuation?: string | undefined;
        activities?: {
            type?: string | undefined;
            fromAddress?: string | undefined;
            toAddress?: string | undefined;
            price?: number | undefined;
            amount?: number | undefined;
            timestamp?: number | undefined;
            contract?: string | undefined;
            token?: {
                tokenId?: string | undefined;
                tokenName?: string | undefined;
                tokenImage?: string | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                lastSell?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                tokenRarityScore?: number | undefined;
                tokenRarityRank?: number | undefined;
                tokenMedia?: string | undefined;
            } | undefined;
            collection?: {
                collectionId?: string | undefined;
                collectionName?: string | undefined;
                collectionImage?: string | undefined;
            } | undefined;
            txHash?: string | undefined;
            logIndex?: number | undefined;
            batchIndex?: number | undefined;
            order?: {
                id?: string | undefined;
                side?: "ask" | "bid" | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
                criteria?: {
                    kind?: "token" | undefined;
                    data?: {
                        token?: {
                            tokenId?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                        collection?: {
                            id?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            createdAt?: string | undefined;
        }[] | undefined;
    }[] | undefined>;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<{
        continuation?: string | undefined;
        activities?: {
            type?: string | undefined;
            fromAddress?: string | undefined;
            toAddress?: string | undefined;
            price?: number | undefined;
            amount?: number | undefined;
            timestamp?: number | undefined;
            contract?: string | undefined;
            token?: {
                tokenId?: string | undefined;
                tokenName?: string | undefined;
                tokenImage?: string | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                lastSell?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                tokenRarityScore?: number | undefined;
                tokenRarityRank?: number | undefined;
                tokenMedia?: string | undefined;
            } | undefined;
            collection?: {
                collectionId?: string | undefined;
                collectionName?: string | undefined;
                collectionImage?: string | undefined;
            } | undefined;
            txHash?: string | undefined;
            logIndex?: number | undefined;
            batchIndex?: number | undefined;
            order?: {
                id?: string | undefined;
                side?: "ask" | "bid" | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
                criteria?: {
                    kind?: "token" | undefined;
                    data?: {
                        token?: {
                            tokenId?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                        collection?: {
                            id?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            createdAt?: string | undefined;
        }[] | undefined;
    }[]>;
    isValidating: boolean;
    isLoading: boolean;
};
type TokensQuery = paths['/tokens/v5']['get']['parameters']['query'];
export function useTokens(options?: TokensQuery | false, swrOptions?: SWRInfiniteConfiguration, chainId?: number): {
    data: ({
        token?: {
            contract: string;
            tokenId: string;
            name?: string | undefined;
            description?: string | undefined;
            image?: string | undefined;
            media?: string | undefined;
            kind?: string | undefined;
            isFlagged?: boolean | undefined;
            lastFlagUpdate?: string | undefined;
            lastFlagChange?: string | undefined;
            rarity?: number | undefined;
            rarityRank?: number | undefined;
            collection?: {
                id?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                slug?: string | undefined;
            } | undefined;
            lastBuy?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            lastSell?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            owner?: string | undefined;
            attributes?: {
                key?: string | undefined;
                kind?: string | undefined;
                value: string;
                tokenCount?: number | undefined;
                onSaleCount?: number | undefined;
                floorAskPrice?: number | undefined;
                topBidValue?: number | undefined;
                createdAt?: string | undefined;
            }[] | undefined;
        } | undefined;
        market?: {
            floorAsk?: {
                id?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                maker?: string | undefined;
                validFrom?: number | undefined;
                validUntil?: number | undefined;
                quantityFilled?: number | undefined;
                quantityRemaining?: number | undefined;
                dynamicPricing?: {
                    kind?: "dutch" | "pool" | undefined;
                    data?: {
                        [key: string]: unknown;
                    } | undefined;
                } | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
            } | undefined;
            topBid?: {
                id?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                maker?: string | undefined;
                validFrom?: number | undefined;
                validUntil?: number | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
                feeBreakdown?: {
                    kind?: string | undefined;
                    recipient?: string | undefined;
                    bps?: number | undefined;
                }[] | undefined;
            } | undefined;
        } | undefined;
    } | undefined)[];
    hasNextPage: boolean;
    isFetchingInitialData: boolean;
    isFetchingPage: any;
    resetCache: () => Promise<void>;
    fetchNextPage: () => void;
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<{
        tokens?: {
            token?: {
                contract: string;
                tokenId: string;
                name?: string | undefined;
                description?: string | undefined;
                image?: string | undefined;
                media?: string | undefined;
                kind?: string | undefined;
                isFlagged?: boolean | undefined;
                lastFlagUpdate?: string | undefined;
                lastFlagChange?: string | undefined;
                rarity?: number | undefined;
                rarityRank?: number | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                    slug?: string | undefined;
                } | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                lastSell?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                owner?: string | undefined;
                attributes?: {
                    key?: string | undefined;
                    kind?: string | undefined;
                    value: string;
                    tokenCount?: number | undefined;
                    onSaleCount?: number | undefined;
                    floorAskPrice?: number | undefined;
                    topBidValue?: number | undefined;
                    createdAt?: string | undefined;
                }[] | undefined;
            } | undefined;
            market?: {
                floorAsk?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    quantityFilled?: number | undefined;
                    quantityRemaining?: number | undefined;
                    dynamicPricing?: {
                        kind?: "dutch" | "pool" | undefined;
                        data?: {
                            [key: string]: unknown;
                        } | undefined;
                    } | undefined;
                    source?: {
                        [key: string]: unknown;
                    } | undefined;
                } | undefined;
                topBid?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    source?: {
                        [key: string]: unknown;
                    } | undefined;
                    feeBreakdown?: {
                        kind?: string | undefined;
                        recipient?: string | undefined;
                        bps?: number | undefined;
                    }[] | undefined;
                } | undefined;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[] | undefined>;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<{
        tokens?: {
            token?: {
                contract: string;
                tokenId: string;
                name?: string | undefined;
                description?: string | undefined;
                image?: string | undefined;
                media?: string | undefined;
                kind?: string | undefined;
                isFlagged?: boolean | undefined;
                lastFlagUpdate?: string | undefined;
                lastFlagChange?: string | undefined;
                rarity?: number | undefined;
                rarityRank?: number | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                    slug?: string | undefined;
                } | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                lastSell?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                owner?: string | undefined;
                attributes?: {
                    key?: string | undefined;
                    kind?: string | undefined;
                    value: string;
                    tokenCount?: number | undefined;
                    onSaleCount?: number | undefined;
                    floorAskPrice?: number | undefined;
                    topBidValue?: number | undefined;
                    createdAt?: string | undefined;
                }[] | undefined;
            } | undefined;
            market?: {
                floorAsk?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    quantityFilled?: number | undefined;
                    quantityRemaining?: number | undefined;
                    dynamicPricing?: {
                        kind?: "dutch" | "pool" | undefined;
                        data?: {
                            [key: string]: unknown;
                        } | undefined;
                    } | undefined;
                    source?: {
                        [key: string]: unknown;
                    } | undefined;
                } | undefined;
                topBid?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    source?: {
                        [key: string]: unknown;
                    } | undefined;
                    feeBreakdown?: {
                        kind?: string | undefined;
                        recipient?: string | undefined;
                        bps?: number | undefined;
                    }[] | undefined;
                } | undefined;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[]>;
    isValidating: boolean;
    isLoading: boolean;
};
export function useZooClient(): import("@zoolabs/sdk").ZooClient | null;
export function useTokenOpenseaBanned(contract?: string, tokenId?: number | string): boolean;
type AsksQuery = paths['/orders/asks/v4']['get']['parameters']['query'];
export function useListings(options: AsksQuery, swrOptions?: SWRInfiniteConfiguration, enabled?: boolean, chainId?: number): {
    data: ({
        id: string;
        kind: string;
        side: "buy" | "sell";
        tokenSetId: string;
        tokenSetSchemaHash: string;
        contract?: string | undefined;
        maker: string;
        taker: string;
        price?: {
            currency?: {
                contract?: string | undefined;
                name?: string | undefined;
                symbol?: string | undefined;
                decimals?: number | undefined;
            } | undefined;
            amount?: {
                raw?: string | undefined;
                decimal?: number | undefined;
                usd?: number | undefined;
                native?: number | undefined;
            } | undefined;
            netAmount?: {
                raw?: string | undefined;
                decimal?: number | undefined;
                usd?: number | undefined;
                native?: number | undefined;
            } | undefined;
        } | undefined;
        validFrom: number;
        validUntil: number;
        quantityFilled?: number | undefined;
        quantityRemaining?: number | undefined;
        criteria?: {
            kind?: "token" | undefined;
            data?: {
                token?: {
                    tokenId?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                } | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        status?: string | undefined;
        source?: {
            [key: string]: unknown;
        } | undefined;
        feeBps?: number | undefined;
        feeBreakdown?: {
            kind?: string | undefined;
            recipient?: string | undefined;
            bps?: number | undefined;
        }[] | undefined;
        expiration: number;
        isZoo?: boolean | undefined;
        isDynamic?: boolean | undefined;
        createdAt: string;
        updatedAt: string;
        rawData?: {
            [key: string]: unknown;
        } | undefined;
    } | undefined)[];
    hasNextPage: boolean;
    isFetchingInitialData: boolean;
    isFetchingPage: any;
    resetCache: () => Promise<void>;
    fetchNextPage: () => void;
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<{
        orders?: {
            id: string;
            kind: string;
            side: "buy" | "sell";
            tokenSetId: string;
            tokenSetSchemaHash: string;
            contract?: string | undefined;
            maker: string;
            taker: string;
            price?: {
                currency?: {
                    contract?: string | undefined;
                    name?: string | undefined;
                    symbol?: string | undefined;
                    decimals?: number | undefined;
                } | undefined;
                amount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
                netAmount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
            } | undefined;
            validFrom: number;
            validUntil: number;
            quantityFilled?: number | undefined;
            quantityRemaining?: number | undefined;
            criteria?: {
                kind?: "token" | undefined;
                data?: {
                    token?: {
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            status?: string | undefined;
            source?: {
                [key: string]: unknown;
            } | undefined;
            feeBps?: number | undefined;
            feeBreakdown?: {
                kind?: string | undefined;
                recipient?: string | undefined;
                bps?: number | undefined;
            }[] | undefined;
            expiration: number;
            isZoo?: boolean | undefined;
            isDynamic?: boolean | undefined;
            createdAt: string;
            updatedAt: string;
            rawData?: {
                [key: string]: unknown;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[] | undefined>;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<{
        orders?: {
            id: string;
            kind: string;
            side: "buy" | "sell";
            tokenSetId: string;
            tokenSetSchemaHash: string;
            contract?: string | undefined;
            maker: string;
            taker: string;
            price?: {
                currency?: {
                    contract?: string | undefined;
                    name?: string | undefined;
                    symbol?: string | undefined;
                    decimals?: number | undefined;
                } | undefined;
                amount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
                netAmount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
            } | undefined;
            validFrom: number;
            validUntil: number;
            quantityFilled?: number | undefined;
            quantityRemaining?: number | undefined;
            criteria?: {
                kind?: "token" | undefined;
                data?: {
                    token?: {
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            status?: string | undefined;
            source?: {
                [key: string]: unknown;
            } | undefined;
            feeBps?: number | undefined;
            feeBreakdown?: {
                kind?: string | undefined;
                recipient?: string | undefined;
                bps?: number | undefined;
            }[] | undefined;
            expiration: number;
            isZoo?: boolean | undefined;
            isDynamic?: boolean | undefined;
            createdAt: string;
            updatedAt: string;
            rawData?: {
                [key: string]: unknown;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[]>;
    isValidating: boolean;
    isLoading: boolean;
};
export function useOwnerListings(query?: paths['/orders/asks/v4']['get']['parameters']['query'] | false, swrOptions?: SWRConfiguration, chainId?: number): {
    data: ({
        id: string;
        kind: string;
        side: "buy" | "sell";
        tokenSetId: string;
        tokenSetSchemaHash: string;
        contract?: string | undefined;
        maker: string;
        taker: string;
        price?: {
            currency?: {
                contract?: string | undefined;
                name?: string | undefined;
                symbol?: string | undefined;
                decimals?: number | undefined;
            } | undefined;
            amount?: {
                raw?: string | undefined;
                decimal?: number | undefined;
                usd?: number | undefined;
                native?: number | undefined;
            } | undefined;
            netAmount?: {
                raw?: string | undefined;
                decimal?: number | undefined;
                usd?: number | undefined;
                native?: number | undefined;
            } | undefined;
        } | undefined;
        validFrom: number;
        validUntil: number;
        quantityFilled?: number | undefined;
        quantityRemaining?: number | undefined;
        criteria?: {
            kind?: "token" | undefined;
            data?: {
                token?: {
                    tokenId?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                } | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        status?: string | undefined;
        source?: {
            [key: string]: unknown;
        } | undefined;
        feeBps?: number | undefined;
        feeBreakdown?: {
            kind?: string | undefined;
            recipient?: string | undefined;
            bps?: number | undefined;
        }[] | undefined;
        expiration: number;
        isZoo?: boolean | undefined;
        isDynamic?: boolean | undefined;
        createdAt: string;
        updatedAt: string;
        rawData?: {
            [key: string]: unknown;
        } | undefined;
    } | undefined)[];
    hasNextPage: boolean;
    isFetchingInitialData: boolean;
    isFetchingPage: any;
    resetCache: () => Promise<void>;
    fetchNextPage: () => void;
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<{
        orders?: {
            id: string;
            kind: string;
            side: "buy" | "sell";
            tokenSetId: string;
            tokenSetSchemaHash: string;
            contract?: string | undefined;
            maker: string;
            taker: string;
            price?: {
                currency?: {
                    contract?: string | undefined;
                    name?: string | undefined;
                    symbol?: string | undefined;
                    decimals?: number | undefined;
                } | undefined;
                amount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
                netAmount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
            } | undefined;
            validFrom: number;
            validUntil: number;
            quantityFilled?: number | undefined;
            quantityRemaining?: number | undefined;
            criteria?: {
                kind?: "token" | undefined;
                data?: {
                    token?: {
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            status?: string | undefined;
            source?: {
                [key: string]: unknown;
            } | undefined;
            feeBps?: number | undefined;
            feeBreakdown?: {
                kind?: string | undefined;
                recipient?: string | undefined;
                bps?: number | undefined;
            }[] | undefined;
            expiration: number;
            isZoo?: boolean | undefined;
            isDynamic?: boolean | undefined;
            createdAt: string;
            updatedAt: string;
            rawData?: {
                [key: string]: unknown;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[] | undefined>;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<{
        orders?: {
            id: string;
            kind: string;
            side: "buy" | "sell";
            tokenSetId: string;
            tokenSetSchemaHash: string;
            contract?: string | undefined;
            maker: string;
            taker: string;
            price?: {
                currency?: {
                    contract?: string | undefined;
                    name?: string | undefined;
                    symbol?: string | undefined;
                    decimals?: number | undefined;
                } | undefined;
                amount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
                netAmount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
            } | undefined;
            validFrom: number;
            validUntil: number;
            quantityFilled?: number | undefined;
            quantityRemaining?: number | undefined;
            criteria?: {
                kind?: "token" | undefined;
                data?: {
                    token?: {
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            status?: string | undefined;
            source?: {
                [key: string]: unknown;
            } | undefined;
            feeBps?: number | undefined;
            feeBreakdown?: {
                kind?: string | undefined;
                recipient?: string | undefined;
                bps?: number | undefined;
            }[] | undefined;
            expiration: number;
            isZoo?: boolean | undefined;
            isDynamic?: boolean | undefined;
            createdAt: string;
            updatedAt: string;
            rawData?: {
                [key: string]: unknown;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[]>;
    isValidating: boolean;
    isLoading: boolean;
};
type BidsQuery = paths['/orders/bids/v5']['get']['parameters']['query'];
export function useBids(options: BidsQuery, swrOptions?: SWRInfiniteConfiguration, enabled?: boolean, chainId?: number): {
    data: ({
        id: string;
        kind: string;
        side: "buy" | "sell";
        status?: string | undefined;
        tokenSetId: string;
        tokenSetSchemaHash: string;
        contract?: string | undefined;
        maker: string;
        taker: string;
        price?: {
            currency?: {
                contract?: string | undefined;
                name?: string | undefined;
                symbol?: string | undefined;
                decimals?: number | undefined;
            } | undefined;
            amount?: {
                raw?: string | undefined;
                decimal?: number | undefined;
                usd?: number | undefined;
                native?: number | undefined;
            } | undefined;
            netAmount?: {
                raw?: string | undefined;
                decimal?: number | undefined;
                usd?: number | undefined;
                native?: number | undefined;
            } | undefined;
        } | undefined;
        validFrom: number;
        validUntil: number;
        quantityFilled?: number | undefined;
        quantityRemaining?: number | undefined;
        criteria?: {
            kind?: "token" | undefined;
            data?: {
                token?: {
                    tokenId?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                } | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        source?: {
            [key: string]: unknown;
        } | undefined;
        feeBps?: number | undefined;
        feeBreakdown?: {
            kind?: string | undefined;
            recipient?: string | undefined;
            bps?: number | undefined;
        }[] | undefined;
        expiration: number;
        isZoo?: boolean | undefined;
        createdAt: string;
        updatedAt: string;
        rawData?: {
            [key: string]: unknown;
        } | undefined;
    } | undefined)[];
    hasNextPage: boolean;
    isFetchingInitialData: boolean;
    isFetchingPage: any;
    resetCache: () => Promise<void>;
    fetchNextPage: () => void;
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<{
        orders?: {
            id: string;
            kind: string;
            side: "buy" | "sell";
            status?: string | undefined;
            tokenSetId: string;
            tokenSetSchemaHash: string;
            contract?: string | undefined;
            maker: string;
            taker: string;
            price?: {
                currency?: {
                    contract?: string | undefined;
                    name?: string | undefined;
                    symbol?: string | undefined;
                    decimals?: number | undefined;
                } | undefined;
                amount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
                netAmount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
            } | undefined;
            validFrom: number;
            validUntil: number;
            quantityFilled?: number | undefined;
            quantityRemaining?: number | undefined;
            criteria?: {
                kind?: "token" | undefined;
                data?: {
                    token?: {
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            source?: {
                [key: string]: unknown;
            } | undefined;
            feeBps?: number | undefined;
            feeBreakdown?: {
                kind?: string | undefined;
                recipient?: string | undefined;
                bps?: number | undefined;
            }[] | undefined;
            expiration: number;
            isZoo?: boolean | undefined;
            createdAt: string;
            updatedAt: string;
            rawData?: {
                [key: string]: unknown;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[] | undefined>;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<{
        orders?: {
            id: string;
            kind: string;
            side: "buy" | "sell";
            status?: string | undefined;
            tokenSetId: string;
            tokenSetSchemaHash: string;
            contract?: string | undefined;
            maker: string;
            taker: string;
            price?: {
                currency?: {
                    contract?: string | undefined;
                    name?: string | undefined;
                    symbol?: string | undefined;
                    decimals?: number | undefined;
                } | undefined;
                amount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
                netAmount?: {
                    raw?: string | undefined;
                    decimal?: number | undefined;
                    usd?: number | undefined;
                    native?: number | undefined;
                } | undefined;
            } | undefined;
            validFrom: number;
            validUntil: number;
            quantityFilled?: number | undefined;
            quantityRemaining?: number | undefined;
            criteria?: {
                kind?: "token" | undefined;
                data?: {
                    token?: {
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            source?: {
                [key: string]: unknown;
            } | undefined;
            feeBps?: number | undefined;
            feeBreakdown?: {
                kind?: string | undefined;
                recipient?: string | undefined;
                bps?: number | undefined;
            }[] | undefined;
            expiration: number;
            isZoo?: boolean | undefined;
            createdAt: string;
            updatedAt: string;
            rawData?: {
                [key: string]: unknown;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[]>;
    isValidating: boolean;
    isLoading: boolean;
};
export function useAttributes(collection?: string | undefined, chainId?: number, swrOptions?: SWRConfiguration): {
    response: {
        attributes?: {
            key: string;
            attributeCount?: number | undefined;
            kind: "string" | "number" | "date" | "range";
            minRange?: number | undefined;
            maxRange?: number | undefined;
            values?: {
                value: string;
                count?: number | undefined;
                floorAskPrice?: number | undefined;
            }[] | undefined;
        }[] | undefined;
    } | undefined;
    data: {
        key: string;
        attributeCount?: number | undefined;
        kind: "string" | "number" | "date" | "range";
        minRange?: number | undefined;
        maxRange?: number | undefined;
        values?: {
            value: string;
            count?: number | undefined;
            floorAskPrice?: number | undefined;
        }[] | undefined;
    }[] | null;
    mutate: import("swr/_internal").KeyedMutator<{
        attributes?: {
            key: string;
            attributeCount?: number | undefined;
            kind: "string" | "number" | "date" | "range";
            minRange?: number | undefined;
            maxRange?: number | undefined;
            values?: {
                value: string;
                count?: number | undefined;
                floorAskPrice?: number | undefined;
            }[] | undefined;
        }[] | undefined;
    }>;
    error: any;
    isValidating: boolean;
};
type UserTokenQuery = paths['/users/{user}/tokens/v6']['get']['parameters']['query'];
export function useUserTokens(user?: string | undefined, options?: UserTokenQuery | false, swrOptions?: SWRInfiniteConfiguration, chainId?: number): {
    data: ({
        token?: {
            contract?: string | undefined;
            tokenId?: string | undefined;
            kind?: string | undefined;
            name?: string | undefined;
            image?: string | undefined;
            lastBuy?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            lastSell?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            rarityScore?: number | undefined;
            rarityRank?: number | undefined;
            media?: string | undefined;
            collection?: {
                id?: string | undefined;
                name?: string | undefined;
                imageUrl?: string | undefined;
                floorAskPrice?: number | undefined;
            } | undefined;
            topBid?: {
                id?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        ownership?: {
            tokenCount?: string | undefined;
            onSaleCount?: string | undefined;
            floorAsk?: {
                id?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                maker?: string | undefined;
                validFrom?: number | undefined;
                validUntil?: number | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
            } | undefined;
            acquiredAt?: string | undefined;
        } | undefined;
    } | undefined)[];
    hasNextPage: boolean;
    isFetchingInitialData: boolean;
    isFetchingPage: any;
    resetCache: () => Promise<void>;
    fetchNextPage: () => void;
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<{
        tokens?: {
            token?: {
                contract?: string | undefined;
                tokenId?: string | undefined;
                kind?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                lastSell?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                rarityScore?: number | undefined;
                rarityRank?: number | undefined;
                media?: string | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    imageUrl?: string | undefined;
                    floorAskPrice?: number | undefined;
                } | undefined;
                topBid?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            ownership?: {
                tokenCount?: string | undefined;
                onSaleCount?: string | undefined;
                floorAsk?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    source?: {
                        [key: string]: unknown;
                    } | undefined;
                } | undefined;
                acquiredAt?: string | undefined;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[] | undefined>;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<{
        tokens?: {
            token?: {
                contract?: string | undefined;
                tokenId?: string | undefined;
                kind?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                lastSell?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                rarityScore?: number | undefined;
                rarityRank?: number | undefined;
                media?: string | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    imageUrl?: string | undefined;
                    floorAskPrice?: number | undefined;
                } | undefined;
                topBid?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            ownership?: {
                tokenCount?: string | undefined;
                onSaleCount?: string | undefined;
                floorAsk?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    source?: {
                        [key: string]: unknown;
                    } | undefined;
                } | undefined;
                acquiredAt?: string | undefined;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[]>;
    isValidating: boolean;
    isLoading: boolean;
};
type _BidsQuery1 = paths['/orders/users/{user}/top-bids/v2']['get']['parameters']['query'];
export function useUserTopBids(user?: string, options?: _BidsQuery1, swrOptions?: SWRInfiniteConfiguration, chainId?: number): {
    data: ({
        id?: string | undefined;
        price?: number | undefined;
        value?: number | undefined;
        maker?: string | undefined;
        createdAt?: string | undefined;
        validFrom?: number | undefined;
        validUntil?: number | undefined;
        floorDifferencePercentage?: number | undefined;
        source?: {
            [key: string]: unknown;
        } | undefined;
        feeBreakdown?: {
            kind?: string | undefined;
            recipient?: string | undefined;
            bps?: number | undefined;
        }[] | undefined;
        criteria?: {
            kind?: "token" | undefined;
            data?: {
                token?: {
                    tokenId?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                } | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        token?: {
            contract?: string | undefined;
            tokenId?: string | undefined;
            name?: string | undefined;
            image?: string | undefined;
            floorAskPrice?: number | undefined;
            lastSalePrice?: number | undefined;
            collection?: {
                id?: string | undefined;
                name?: string | undefined;
                imageUrl?: string | undefined;
                floorAskPrice?: number | undefined;
            } | undefined;
        } | undefined;
    } | undefined)[];
    hasNextPage: boolean;
    isFetchingInitialData: boolean;
    isFetchingPage: any;
    resetCache: () => Promise<void>;
    fetchNextPage: () => void;
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<{
        totalTokensWithBids?: number | undefined;
        topBids?: {
            id?: string | undefined;
            price?: number | undefined;
            value?: number | undefined;
            maker?: string | undefined;
            createdAt?: string | undefined;
            validFrom?: number | undefined;
            validUntil?: number | undefined;
            floorDifferencePercentage?: number | undefined;
            source?: {
                [key: string]: unknown;
            } | undefined;
            feeBreakdown?: {
                kind?: string | undefined;
                recipient?: string | undefined;
                bps?: number | undefined;
            }[] | undefined;
            criteria?: {
                kind?: "token" | undefined;
                data?: {
                    token?: {
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            token?: {
                contract?: string | undefined;
                tokenId?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                floorAskPrice?: number | undefined;
                lastSalePrice?: number | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    imageUrl?: string | undefined;
                    floorAskPrice?: number | undefined;
                } | undefined;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[] | undefined>;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<{
        totalTokensWithBids?: number | undefined;
        topBids?: {
            id?: string | undefined;
            price?: number | undefined;
            value?: number | undefined;
            maker?: string | undefined;
            createdAt?: string | undefined;
            validFrom?: number | undefined;
            validUntil?: number | undefined;
            floorDifferencePercentage?: number | undefined;
            source?: {
                [key: string]: unknown;
            } | undefined;
            feeBreakdown?: {
                kind?: string | undefined;
                recipient?: string | undefined;
                bps?: number | undefined;
            }[] | undefined;
            criteria?: {
                kind?: "token" | undefined;
                data?: {
                    token?: {
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            token?: {
                contract?: string | undefined;
                tokenId?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                floorAskPrice?: number | undefined;
                lastSalePrice?: number | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    imageUrl?: string | undefined;
                    floorAskPrice?: number | undefined;
                } | undefined;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[]>;
    isValidating: boolean;
    isLoading: boolean;
};
type UserCollectionsQuery = paths['/users/{user}/collections/v2']['get']['parameters']['query'];
export function useUserCollections(user?: string, options?: UserCollectionsQuery, swrOptions?: SWRInfiniteConfiguration, chainId?: number): {
    data: ({
        collection?: {
            id?: string | undefined;
            slug?: string | undefined;
            name?: string | undefined;
            image?: string | undefined;
            banner?: string | undefined;
            discordUrl?: string | undefined;
            externalUrl?: string | undefined;
            twitterUsername?: string | undefined;
            description?: string | undefined;
            sampleImages?: string[] | undefined;
            tokenCount?: string | undefined;
            tokenSetId?: string | undefined;
            primaryContract?: string | undefined;
            floorAskPrice?: number | undefined;
            topBidValue?: number | undefined;
            topBidMaker?: string | undefined;
            topBidSourceDomain?: string | undefined;
            rank?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
                allTime?: number | undefined;
            } | undefined;
            volume?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
                allTime?: number | undefined;
            } | undefined;
            volumeChange?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
            } | undefined;
            floorSale?: {
                "1day"?: number | undefined;
                "7day"?: number | undefined;
                "30day"?: number | undefined;
            } | undefined;
        } | undefined;
        ownership?: {
            tokenCount?: string | undefined;
            onSaleCount?: string | undefined;
            liquidCount?: string | undefined;
        } | undefined;
    } | undefined)[];
    hasNextPage: boolean;
    isFetchingInitialData: boolean;
    isFetchingPage: any;
    resetCache: () => Promise<void>;
    fetchNextPage: () => void;
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<{
        collections?: {
            collection?: {
                id?: string | undefined;
                slug?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                banner?: string | undefined;
                discordUrl?: string | undefined;
                externalUrl?: string | undefined;
                twitterUsername?: string | undefined;
                description?: string | undefined;
                sampleImages?: string[] | undefined;
                tokenCount?: string | undefined;
                tokenSetId?: string | undefined;
                primaryContract?: string | undefined;
                floorAskPrice?: number | undefined;
                topBidValue?: number | undefined;
                topBidMaker?: string | undefined;
                topBidSourceDomain?: string | undefined;
                rank?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volume?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volumeChange?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                floorSale?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
            } | undefined;
            ownership?: {
                tokenCount?: string | undefined;
                onSaleCount?: string | undefined;
                liquidCount?: string | undefined;
            } | undefined;
        }[] | undefined;
    }[] | undefined>;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<{
        collections?: {
            collection?: {
                id?: string | undefined;
                slug?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                banner?: string | undefined;
                discordUrl?: string | undefined;
                externalUrl?: string | undefined;
                twitterUsername?: string | undefined;
                description?: string | undefined;
                sampleImages?: string[] | undefined;
                tokenCount?: string | undefined;
                tokenSetId?: string | undefined;
                primaryContract?: string | undefined;
                floorAskPrice?: number | undefined;
                topBidValue?: number | undefined;
                topBidMaker?: string | undefined;
                topBidSourceDomain?: string | undefined;
                rank?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volume?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volumeChange?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                floorSale?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
            } | undefined;
            ownership?: {
                tokenCount?: string | undefined;
                onSaleCount?: string | undefined;
                liquidCount?: string | undefined;
            } | undefined;
        }[] | undefined;
    }[]>;
    isValidating: boolean;
    isLoading: boolean;
};
type Token = NonNullable<ReturnType<typeof useTokens>['data'][0]>;
type FloorAsk = NonNullable<NonNullable<Token['market']>['floorAsk']>;
type CartItemPrice = FloorAsk['price'];
export enum CheckoutStatus {
    Idle = 0,
    Approving = 1,
    Finalizing = 2,
    Complete = 3
}
export enum CheckoutTransactionError {
    Unknown = 0,
    PiceMismatch = 1,
    InsufficientBalance = 2,
    UserDenied = 3
}
type CartItem = {
    token: {
        id: string;
        name: string;
    };
    collection: {
        id: string;
        name: string;
    };
    price: CartItemPrice;
    poolId?: string;
    poolPrices?: CartItemPrice[];
    previousPrice?: CartItemPrice;
    isBannedOnOpensea?: boolean;
};
export type Cart = {
    totalPrice: number;
    currency?: NonNullable<CartItemPrice>['currency'];
    referrer?: string;
    referrerFeeBps?: number;
    referrerFee?: number;
    items: CartItem[];
    pools: Record<string, {
        prices: CartItemPrice[];
        itemCount: number;
    }>;
    isValidating: boolean;
    chain?: ZooChain;
    pendingTransactionId?: string;
    transaction: {
        id?: string;
        txHash?: string;
        chain: ZooChain;
        items: CartItem[];
        error?: Error;
        errorType?: CheckoutTransactionError;
        status: CheckoutStatus;
        steps?: Execute['steps'];
    } | null;
};
type CartProviderProps = {
    children: ReactNode;
    referrer?: string;
    referrerFeeBps?: number;
    persist?: boolean;
};
export const CartProvider: FC<CartProviderProps>;
export function useCart<SelectorOutput>(selector: (store: Cart) => SelectorOutput): {
    data: SelectorOutput;
    clear: () => void;
    clearTransaction: () => void;
    remove: (ids: string[]) => void;
    add: (items: ({
        token?: {
            contract: string;
            tokenId: string;
            name?: string | undefined;
            description?: string | undefined;
            image?: string | undefined;
            media?: string | undefined;
            kind?: string | undefined;
            isFlagged?: boolean | undefined;
            lastFlagUpdate?: string | undefined;
            lastFlagChange?: string | undefined;
            rarity?: number | undefined;
            rarityRank?: number | undefined;
            collection?: {
                id?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                slug?: string | undefined;
            } | undefined;
            lastBuy?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            lastSell?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            owner?: string | undefined;
            attributes?: {
                key?: string | undefined;
                kind?: string | undefined;
                value: string;
                tokenCount?: number | undefined;
                onSaleCount?: number | undefined;
                floorAskPrice?: number | undefined;
                topBidValue?: number | undefined;
                createdAt?: string | undefined;
            }[] | undefined;
        } | undefined;
        market?: {
            floorAsk?: {
                id?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                maker?: string | undefined;
                validFrom?: number | undefined;
                validUntil?: number | undefined;
                quantityFilled?: number | undefined;
                quantityRemaining?: number | undefined;
                dynamicPricing?: {
                    kind?: "dutch" | "pool" | undefined;
                    data?: {
                        [key: string]: unknown;
                    } | undefined;
                } | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
            } | undefined;
            topBid?: {
                id?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                maker?: string | undefined;
                validFrom?: number | undefined;
                validUntil?: number | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
                feeBreakdown?: {
                    kind?: string | undefined;
                    recipient?: string | undefined;
                    bps?: number | undefined;
                }[] | undefined;
            } | undefined;
        } | undefined;
    } | {
        id: string;
    })[], chainId: number) => Promise<void>;
    validate: () => Promise<boolean>;
    checkout: (options?: Partial<Omit<{
        orderIds?: string[] | undefined;
        rawOrders?: {
            kind: "opensea" | "looks-rare" | "zeroex-v4" | "seaport" | "x2y2" | "universe" | "infinity" | "flow" | "rarible" | "sudoswap" | "nftx";
            data: {
                [key: string]: unknown;
            };
        }[] | undefined;
        tokens?: string[] | undefined;
        quantity?: number | undefined;
        taker: string;
        relayer?: string | undefined;
        onlyPath?: boolean | undefined;
        forceRouter?: boolean | undefined;
        currency?: "0x0000000000000000000000000000000000000000" | undefined;
        normalizeRoyalties?: boolean | undefined;
        preferredOrderSource?: string | undefined;
        source?: string | undefined;
        feesOnTop?: string[] | undefined;
        partial?: boolean | undefined;
        maxFeePerGas?: string | undefined;
        maxPriorityFeePerGas?: string | undefined;
        skipBalanceCheck?: boolean | undefined;
        allowInactiveOrderIds?: boolean | undefined;
        x2y2ApiKey?: string | undefined;
    }, "source" | "tokens" | "orderIds" | "rawOrders">> | undefined) => Promise<void>;
    set: (value: Partial<Cart>) => void;
};
type DynamicTokens = (ReturnType<typeof useTokens>['data'][0] & {
    isInCart?: boolean;
})[];
export function useDynamicTokens(options?: Parameters<typeof useTokens>['0'], swrOptions?: SWRInfiniteConfiguration, chainId?: number): {
    clear: () => void;
    clearTransaction: () => void;
    remove: (ids: string[]) => void;
    add: (items: ({
        token?: {
            contract: string;
            tokenId: string;
            name?: string | undefined;
            description?: string | undefined;
            image?: string | undefined;
            media?: string | undefined;
            kind?: string | undefined;
            isFlagged?: boolean | undefined;
            lastFlagUpdate?: string | undefined;
            lastFlagChange?: string | undefined;
            rarity?: number | undefined;
            rarityRank?: number | undefined;
            collection?: {
                id?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                slug?: string | undefined;
            } | undefined;
            lastBuy?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            lastSell?: {
                value?: number | undefined;
                timestamp?: number | undefined;
            } | undefined;
            owner?: string | undefined;
            attributes?: {
                key?: string | undefined;
                kind?: string | undefined;
                value: string;
                tokenCount?: number | undefined;
                onSaleCount?: number | undefined;
                floorAskPrice?: number | undefined;
                topBidValue?: number | undefined;
                createdAt?: string | undefined;
            }[] | undefined;
        } | undefined;
        market?: {
            floorAsk?: {
                id?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                maker?: string | undefined;
                validFrom?: number | undefined;
                validUntil?: number | undefined;
                quantityFilled?: number | undefined;
                quantityRemaining?: number | undefined;
                dynamicPricing?: {
                    kind?: "dutch" | "pool" | undefined;
                    data?: {
                        [key: string]: unknown;
                    } | undefined;
                } | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
            } | undefined;
            topBid?: {
                id?: string | undefined;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                maker?: string | undefined;
                validFrom?: number | undefined;
                validUntil?: number | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
                feeBreakdown?: {
                    kind?: string | undefined;
                    recipient?: string | undefined;
                    bps?: number | undefined;
                }[] | undefined;
            } | undefined;
        } | undefined;
    } | {
        id: string;
    })[], chainId: number) => Promise<void>;
    validate: () => Promise<boolean>;
    checkout: (options?: Partial<Omit<{
        orderIds?: string[] | undefined;
        rawOrders?: {
            kind: "opensea" | "looks-rare" | "zeroex-v4" | "seaport" | "x2y2" | "universe" | "infinity" | "flow" | "rarible" | "sudoswap" | "nftx";
            data: {
                [key: string]: unknown;
            };
        }[] | undefined;
        tokens?: string[] | undefined;
        quantity?: number | undefined;
        taker: string;
        relayer?: string | undefined;
        onlyPath?: boolean | undefined;
        forceRouter?: boolean | undefined;
        currency?: "0x0000000000000000000000000000000000000000" | undefined;
        normalizeRoyalties?: boolean | undefined;
        preferredOrderSource?: string | undefined;
        source?: string | undefined;
        feesOnTop?: string[] | undefined;
        partial?: boolean | undefined;
        maxFeePerGas?: string | undefined;
        maxPriorityFeePerGas?: string | undefined;
        skipBalanceCheck?: boolean | undefined;
        allowInactiveOrderIds?: boolean | undefined;
        x2y2ApiKey?: string | undefined;
    }, "source" | "tokens" | "orderIds" | "rawOrders">> | undefined) => Promise<void>;
    set: (value: Partial<Cart>) => void;
    data: DynamicTokens;
    hasNextPage: boolean;
    isFetchingInitialData: boolean;
    isFetchingPage: any;
    resetCache: () => Promise<void>;
    fetchNextPage: () => void;
    size: number;
    setSize: (size: number | ((_size: number) => number)) => Promise<{
        tokens?: {
            token?: {
                contract: string;
                tokenId: string;
                name?: string | undefined;
                description?: string | undefined;
                image?: string | undefined;
                media?: string | undefined;
                kind?: string | undefined;
                isFlagged?: boolean | undefined;
                lastFlagUpdate?: string | undefined;
                lastFlagChange?: string | undefined;
                rarity?: number | undefined;
                rarityRank?: number | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                    slug?: string | undefined;
                } | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                lastSell?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                owner?: string | undefined;
                attributes?: {
                    key?: string | undefined;
                    kind?: string | undefined;
                    value: string;
                    tokenCount?: number | undefined;
                    onSaleCount?: number | undefined;
                    floorAskPrice?: number | undefined;
                    topBidValue?: number | undefined;
                    createdAt?: string | undefined;
                }[] | undefined;
            } | undefined;
            market?: {
                floorAsk?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    quantityFilled?: number | undefined;
                    quantityRemaining?: number | undefined;
                    dynamicPricing?: {
                        kind?: "dutch" | "pool" | undefined;
                        data?: {
                            [key: string]: unknown;
                        } | undefined;
                    } | undefined;
                    source?: {
                        [key: string]: unknown;
                    } | undefined;
                } | undefined;
                topBid?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    source?: {
                        [key: string]: unknown;
                    } | undefined;
                    feeBreakdown?: {
                        kind?: string | undefined;
                        recipient?: string | undefined;
                        bps?: number | undefined;
                    }[] | undefined;
                } | undefined;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[] | undefined>;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<{
        tokens?: {
            token?: {
                contract: string;
                tokenId: string;
                name?: string | undefined;
                description?: string | undefined;
                image?: string | undefined;
                media?: string | undefined;
                kind?: string | undefined;
                isFlagged?: boolean | undefined;
                lastFlagUpdate?: string | undefined;
                lastFlagChange?: string | undefined;
                rarity?: number | undefined;
                rarityRank?: number | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                    slug?: string | undefined;
                } | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                lastSell?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                owner?: string | undefined;
                attributes?: {
                    key?: string | undefined;
                    kind?: string | undefined;
                    value: string;
                    tokenCount?: number | undefined;
                    onSaleCount?: number | undefined;
                    floorAskPrice?: number | undefined;
                    topBidValue?: number | undefined;
                    createdAt?: string | undefined;
                }[] | undefined;
            } | undefined;
            market?: {
                floorAsk?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    quantityFilled?: number | undefined;
                    quantityRemaining?: number | undefined;
                    dynamicPricing?: {
                        kind?: "dutch" | "pool" | undefined;
                        data?: {
                            [key: string]: unknown;
                        } | undefined;
                    } | undefined;
                    source?: {
                        [key: string]: unknown;
                    } | undefined;
                } | undefined;
                topBid?: {
                    id?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    source?: {
                        [key: string]: unknown;
                    } | undefined;
                    feeBreakdown?: {
                        kind?: string | undefined;
                        recipient?: string | undefined;
                        bps?: number | undefined;
                    }[] | undefined;
                } | undefined;
            } | undefined;
        }[] | undefined;
        continuation?: string | undefined;
    }[]>;
    isValidating: boolean;
    isLoading: boolean;
};
type Marketplace = NonNullable<paths['/admin/get-marketplaces']['get']['responses']['200']['schema']['marketplaces']>[0] & {
    isSelected: boolean;
    price: number | string;
    truePrice: number | string;
};
type Currency = {
    contract: string;
    symbol: string;
    decimals?: number;
};
export enum ListStep {
    SelectMarkets = 0,
    SetPrice = 1,
    ListItem = 2,
    Complete = 3
}
type Listings = Parameters<ZooClientActions['listToken']>['0']['listings'];
type ListingData = {
    listing: Listings[0];
    marketplace: Marketplace;
};
type StepData = {
    totalSteps: number;
    stepProgress: number;
    currentStep: Execute['steps'][0];
    listingData: ListingData;
};
type Props = {
    content?: ReactNode;
    side?: any;
    width?: any;
} & Popover.PopoverProps;
declare const RKPopover: {
    ({ children, content, side, width, ...props }: Props): JSX.Element;
    Root: React.FC<Popover.PopoverProps>;
    Portal: React.FC<Popover.PopoverPortalProps>;
    Trigger: React.ForwardRefExoticComponent<Popover.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
    Arrow: import("@stitches/react/types/styled-component").StyledComponent<React.ForwardRefExoticComponent<Popover.PopoverArrowProps & React.RefAttributes<SVGSVGElement>>, {}, {
        bp1: "(min-width: 600px)";
        bp2: "(min-width: 905px)";
        bp3: "(min-width: 1240px)";
        bp4: "(min-width: 1440px)";
        motion: "(prefers-reduced-motion)";
        hover: "(any-hover: hover)";
        dark: "(prefers-color-scheme: dark)";
        light: "(prefers-color-scheme: light)";
    }, import("@stitches/react/types/css-util").CSS<{
        bp1: "(min-width: 600px)";
        bp2: "(min-width: 905px)";
        bp3: "(min-width: 1240px)";
        bp4: "(min-width: 1440px)";
        motion: "(prefers-reduced-motion)";
        hover: "(any-hover: hover)";
        dark: "(prefers-color-scheme: dark)";
        light: "(prefers-color-scheme: light)";
    }, {
        space: {
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
        };
        fontSizes: unknown;
        fontWeights: unknown;
        fonts: {
            body: string;
            button: string;
        };
        lineHeights: unknown;
        letterSpacings: unknown;
        sizes: unknown;
        radii: {
            borderRadius: number;
        };
        shadows: unknown;
        transitions: unknown;
    }, import("@stitches/react/types/config").DefaultThemeMap, {
        m: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            margin: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        mx: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginLeft: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
            marginRight: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        my: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginTop: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
            marginBottom: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        mt: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginTop: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        mb: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginBottom: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        ml: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginLeft: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        mr: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginRight: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        p: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            padding: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        px: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingLeft: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
            paddingRight: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        py: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingTop: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
            paddingBottom: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        pt: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingTop: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        pb: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingBottom: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        pl: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingLeft: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        pr: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingRight: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        w: (value: import("@stitches/react/types/css-util").WithPropertyValue<"width">) => {
            width: import("@stitches/react/types/css-util").WithPropertyValue<"width">;
        };
        h: (value: import("@stitches/react/types/css-util").WithPropertyValue<"height">) => {
            height: import("@stitches/react/types/css-util").WithPropertyValue<"height">;
        };
        size: (value: import("@stitches/react/types/css-util").WithPropertyValue<"width">) => {
            width: import("@stitches/react/types/css-util").WithPropertyValue<"width">;
            height: import("@stitches/react/types/css-util").WithPropertyValue<"width">;
        };
    }>>;
    Content: import("@stitches/react/types/styled-component").StyledComponent<React.ForwardRefExoticComponent<Popover.PopoverContentProps & React.RefAttributes<HTMLDivElement>>, {}, {
        bp1: "(min-width: 600px)";
        bp2: "(min-width: 905px)";
        bp3: "(min-width: 1240px)";
        bp4: "(min-width: 1440px)";
        motion: "(prefers-reduced-motion)";
        hover: "(any-hover: hover)";
        dark: "(prefers-color-scheme: dark)";
        light: "(prefers-color-scheme: light)";
    }, import("@stitches/react/types/css-util").CSS<{
        bp1: "(min-width: 600px)";
        bp2: "(min-width: 905px)";
        bp3: "(min-width: 1240px)";
        bp4: "(min-width: 1440px)";
        motion: "(prefers-reduced-motion)";
        hover: "(any-hover: hover)";
        dark: "(prefers-color-scheme: dark)";
        light: "(prefers-color-scheme: light)";
    }, {
        space: {
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
        };
        fontSizes: unknown;
        fontWeights: unknown;
        fonts: {
            body: string;
            button: string;
        };
        lineHeights: unknown;
        letterSpacings: unknown;
        sizes: unknown;
        radii: {
            borderRadius: number;
        };
        shadows: unknown;
        transitions: unknown;
    }, import("@stitches/react/types/config").DefaultThemeMap, {
        m: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            margin: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        mx: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginLeft: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
            marginRight: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        my: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginTop: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
            marginBottom: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        mt: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginTop: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        mb: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginBottom: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        ml: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginLeft: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        mr: (value: import("@stitches/react/types/css-util").WithPropertyValue<"margin">) => {
            marginRight: import("@stitches/react/types/css-util").WithPropertyValue<"margin">;
        };
        p: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            padding: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        px: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingLeft: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
            paddingRight: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        py: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingTop: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
            paddingBottom: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        pt: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingTop: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        pb: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingBottom: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        pl: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingLeft: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        pr: (value: import("@stitches/react/types/css-util").WithPropertyValue<"padding">) => {
            paddingRight: import("@stitches/react/types/css-util").WithPropertyValue<"padding">;
        };
        w: (value: import("@stitches/react/types/css-util").WithPropertyValue<"width">) => {
            width: import("@stitches/react/types/css-util").WithPropertyValue<"width">;
        };
        h: (value: import("@stitches/react/types/css-util").WithPropertyValue<"height">) => {
            height: import("@stitches/react/types/css-util").WithPropertyValue<"height">;
        };
        size: (value: import("@stitches/react/types/css-util").WithPropertyValue<"width">) => {
            width: import("@stitches/react/types/css-util").WithPropertyValue<"width">;
            height: import("@stitches/react/types/css-util").WithPropertyValue<"width">;
        };
    }>>;
};
enum ModalSize {
    MD = 0,
    LG = 1
}
declare const Modal: React.ForwardRefExoticComponent<{
    title: string;
    children: ReactNode;
    size?: ModalSize | undefined;
    onBack?: (() => void) | null | undefined;
    loading?: boolean | undefined;
} & Pick<Omit<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    trigger: React.ReactNode;
    portalProps?: Omit<import("@radix-ui/react-portal").PortalProps & React.RefAttributes<HTMLDivElement>, "ref"> | undefined;
    onOpenChange?: ((open: boolean) => void) | undefined;
    open?: boolean | undefined;
    size?: ModalSize | undefined;
} & React.RefAttributes<HTMLDivElement>, "ref">, "open" | "onFocusCapture" | "onOpenChange" | "trigger" | "onPointerDownOutside"> & React.RefAttributes<HTMLDivElement>>;
export enum BuyStep {
    Checkout = 0,
    Approving = 1,
    AddFunds = 2,
    Complete = 3,
    Unavailable = 4
}
type _StepData1 = {
    totalSteps: number;
    stepProgress: number;
    currentStep: Execute['steps'][0];
    currentStepItem: NonNullable<Execute['steps'][0]['items']>[0];
};
type PurchaseData = {
    tokenId?: string;
    collectionId?: string;
    maker?: string;
    steps?: Execute['steps'];
};
type _Props1 = Pick<Parameters<typeof Modal>['0'], 'trigger'> & {
    openState?: [boolean, Dispatch<SetStateAction<boolean>>];
    tokenId?: string;
    collectionId?: string;
    orderId?: string;
    referrerFeeBps?: number | null;
    referrer?: string | null;
    normalizeRoyalties?: boolean;
    onGoToToken?: () => any;
    onPurchaseComplete?: (data: PurchaseData) => void;
    onPurchaseError?: (error: Error, data: PurchaseData) => void;
    onClose?: (data: PurchaseData, stepData: _StepData1 | null, currentStep: BuyStep) => void;
};
export function BuyModal({ openState, trigger, tokenId, collectionId, orderId, referrer, referrerFeeBps, normalizeRoyalties, onPurchaseComplete, onPurchaseError, onClose, onGoToToken, }: _Props1): ReactElement;
export declare namespace BuyModal {
    var Custom: React.FC<{
        open: boolean;
        tokenId?: string | undefined;
        collectionId?: string | undefined;
        orderId?: string | undefined;
        referrerFeeBps?: number | null | undefined;
        referrer?: string | null | undefined;
        normalizeRoyalties?: boolean | undefined;
        children: (props: {
            loading: boolean;
            token?: {
                token?: {
                    contract: string;
                    tokenId: string;
                    name?: string | undefined;
                    description?: string | undefined;
                    image?: string | undefined;
                    media?: string | undefined;
                    kind?: string | undefined;
                    isFlagged?: boolean | undefined;
                    lastFlagUpdate?: string | undefined;
                    lastFlagChange?: string | undefined;
                    rarity?: number | undefined;
                    rarityRank?: number | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                        slug?: string | undefined;
                    } | undefined;
                    lastBuy?: {
                        value?: number | undefined;
                        timestamp?: number | undefined;
                    } | undefined;
                    lastSell?: {
                        value?: number | undefined;
                        timestamp?: number | undefined;
                    } | undefined;
                    owner?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        kind?: string | undefined;
                        value: string;
                        tokenCount?: number | undefined;
                        onSaleCount?: number | undefined;
                        floorAskPrice?: number | undefined;
                        topBidValue?: number | undefined;
                        createdAt?: string | undefined;
                    }[] | undefined;
                } | undefined;
                market?: {
                    floorAsk?: {
                        id?: string | undefined;
                        price?: {
                            currency?: {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                            } | undefined;
                            amount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                            netAmount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                        } | undefined;
                        maker?: string | undefined;
                        validFrom?: number | undefined;
                        validUntil?: number | undefined;
                        quantityFilled?: number | undefined;
                        quantityRemaining?: number | undefined;
                        dynamicPricing?: {
                            kind?: "dutch" | "pool" | undefined;
                            data?: {
                                [key: string]: unknown;
                            } | undefined;
                        } | undefined;
                        source?: {
                            [key: string]: unknown;
                        } | undefined;
                    } | undefined;
                    topBid?: {
                        id?: string | undefined;
                        price?: {
                            currency?: {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                            } | undefined;
                            amount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                            netAmount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                        } | undefined;
                        maker?: string | undefined;
                        validFrom?: number | undefined;
                        validUntil?: number | undefined;
                        source?: {
                            [key: string]: unknown;
                        } | undefined;
                        feeBreakdown?: {
                            kind?: string | undefined;
                            recipient?: string | undefined;
                            bps?: number | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            collection?: {
                id?: string | undefined;
                slug?: string | undefined;
                createdAt?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                banner?: string | undefined;
                discordUrl?: string | undefined;
                externalUrl?: string | undefined;
                twitterUsername?: string | undefined;
                openseaVerificationStatus?: string | undefined;
                description?: string | undefined;
                sampleImages?: string[] | undefined;
                tokenCount?: string | undefined;
                onSaleCount?: string | undefined;
                primaryContract?: string | undefined;
                tokenSetId?: string | undefined;
                royalties?: {
                    recipient?: string | undefined;
                    breakdown?: {
                        recipient?: string | undefined;
                        bps?: number | undefined;
                    }[] | undefined;
                    bps?: number | undefined;
                } | undefined;
                allRoyalties?: {
                    [key: string]: unknown;
                } | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                floorAsk?: {
                    id?: string | undefined;
                    sourceDomain?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    token?: {
                        contract?: string | undefined;
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
                topBid?: {
                    id?: string | undefined;
                    sourceDomain?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                } | undefined;
                rank?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volume?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volumeChange?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                floorSale?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                floorSaleChange?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                salesCount?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                collectionBidSupported?: boolean | undefined;
                ownerCount?: number | undefined;
                attributes?: {
                    key?: string | undefined;
                    kind?: string | undefined;
                    count?: number | undefined;
                }[] | undefined;
            } | undefined;
            listing?: {
                id: string;
                kind: string;
                side: "buy" | "sell";
                tokenSetId: string;
                tokenSetSchemaHash: string;
                contract?: string | undefined;
                maker: string;
                taker: string;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                validFrom: number;
                validUntil: number;
                quantityFilled?: number | undefined;
                quantityRemaining?: number | undefined;
                criteria?: {
                    kind?: "token" | undefined;
                    data?: {
                        token?: {
                            tokenId?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                        collection?: {
                            id?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                status?: string | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
                feeBps?: number | undefined;
                feeBreakdown?: {
                    kind?: string | undefined;
                    recipient?: string | undefined;
                    bps?: number | undefined;
                }[] | undefined;
                expiration: number;
                isZoo?: boolean | undefined;
                isDynamic?: boolean | undefined;
                createdAt: string;
                updatedAt: string;
                rawData?: {
                    [key: string]: unknown;
                } | undefined;
            } | undefined;
            quantityAvailable: number;
            currency?: {
                contract?: string | undefined;
                name?: string | undefined;
                symbol?: string | undefined;
                decimals?: number | undefined;
            } | undefined;
            totalPrice: number;
            referrerFee: number;
            buyStep: BuyStep;
            transactionError?: Error | null | undefined;
            hasEnoughCurrency: boolean;
            feeUsd: number;
            totalUsd: number;
            usdPrice: any;
            isBanned: boolean;
            balance?: import("ethers").BigNumber | undefined;
            address?: string | undefined;
            blockExplorerBaseUrl: string;
            steps: {
                message?: string | undefined;
                error?: string | undefined;
                errorData?: any;
                action: string;
                description: string;
                kind: "signature" | "transaction";
                items?: {
                    status: "complete" | "incomplete";
                    data?: any;
                    txHash?: string | undefined;
                    orderId?: string | undefined;
                    orderIndex?: number | undefined;
                }[] | undefined;
            }[] | null;
            stepData: StepData | null;
            quantity: number;
            setBuyStep: React.Dispatch<React.SetStateAction<BuyStep>>;
            setQuantity: React.Dispatch<React.SetStateAction<number>>;
            buyToken: () => void;
        }) => React.ReactNode;
    }>;
}
type ListingCallbackData = {
    listings?: ListingData[];
    tokenId?: string;
    collectionId?: string;
};
type _Props2 = Pick<Parameters<typeof Modal>['0'], 'trigger'> & {
    openState?: [boolean, Dispatch<SetStateAction<boolean>>];
    tokenId?: string;
    collectionId?: string;
    currencies?: Currency[];
    nativeOnly?: boolean;
    normalizeRoyalties?: boolean;
    onGoToToken?: () => any;
    onListingComplete?: (data: ListingCallbackData) => void;
    onListingError?: (error: Error, data: ListingCallbackData) => void;
    onClose?: (data: ListingCallbackData, stepData: StepData | null, currentStep: ListStep) => void;
};
export function ListModal({ openState, trigger, tokenId, collectionId, currencies, nativeOnly, normalizeRoyalties, onGoToToken, onListingComplete, onListingError, onClose, }: _Props2): ReactElement;
export declare namespace ListModal {
    var Custom: React.FC<{
        open: boolean;
        tokenId?: string | undefined;
        collectionId?: string | undefined;
        currencies?: Currency[] | undefined;
        normalizeRoyalties?: boolean | undefined;
        children: (props: {
            token?: {
                token?: {
                    contract: string;
                    tokenId: string;
                    name?: string | undefined;
                    description?: string | undefined;
                    image?: string | undefined;
                    media?: string | undefined;
                    kind?: string | undefined;
                    isFlagged?: boolean | undefined;
                    lastFlagUpdate?: string | undefined;
                    lastFlagChange?: string | undefined;
                    rarity?: number | undefined;
                    rarityRank?: number | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                        slug?: string | undefined;
                    } | undefined;
                    lastBuy?: {
                        value?: number | undefined;
                        timestamp?: number | undefined;
                    } | undefined;
                    lastSell?: {
                        value?: number | undefined;
                        timestamp?: number | undefined;
                    } | undefined;
                    owner?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        kind?: string | undefined;
                        value: string;
                        tokenCount?: number | undefined;
                        onSaleCount?: number | undefined;
                        floorAskPrice?: number | undefined;
                        topBidValue?: number | undefined;
                        createdAt?: string | undefined;
                    }[] | undefined;
                } | undefined;
                market?: {
                    floorAsk?: {
                        id?: string | undefined;
                        price?: {
                            currency?: {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                            } | undefined;
                            amount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                            netAmount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                        } | undefined;
                        maker?: string | undefined;
                        validFrom?: number | undefined;
                        validUntil?: number | undefined;
                        quantityFilled?: number | undefined;
                        quantityRemaining?: number | undefined;
                        dynamicPricing?: {
                            kind?: "dutch" | "pool" | undefined;
                            data?: {
                                [key: string]: unknown;
                            } | undefined;
                        } | undefined;
                        source?: {
                            [key: string]: unknown;
                        } | undefined;
                    } | undefined;
                    topBid?: {
                        id?: string | undefined;
                        price?: {
                            currency?: {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                            } | undefined;
                            amount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                            netAmount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                        } | undefined;
                        maker?: string | undefined;
                        validFrom?: number | undefined;
                        validUntil?: number | undefined;
                        source?: {
                            [key: string]: unknown;
                        } | undefined;
                        feeBreakdown?: {
                            kind?: string | undefined;
                            recipient?: string | undefined;
                            bps?: number | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            quantityAvailable: number;
            collection?: {
                id?: string | undefined;
                slug?: string | undefined;
                createdAt?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                banner?: string | undefined;
                discordUrl?: string | undefined;
                externalUrl?: string | undefined;
                twitterUsername?: string | undefined;
                openseaVerificationStatus?: string | undefined;
                description?: string | undefined;
                sampleImages?: string[] | undefined;
                tokenCount?: string | undefined;
                onSaleCount?: string | undefined;
                primaryContract?: string | undefined;
                tokenSetId?: string | undefined;
                royalties?: {
                    recipient?: string | undefined;
                    breakdown?: {
                        recipient?: string | undefined;
                        bps?: number | undefined;
                    }[] | undefined;
                    bps?: number | undefined;
                } | undefined;
                allRoyalties?: {
                    [key: string]: unknown;
                } | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                floorAsk?: {
                    id?: string | undefined;
                    sourceDomain?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    token?: {
                        contract?: string | undefined;
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
                topBid?: {
                    id?: string | undefined;
                    sourceDomain?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                } | undefined;
                rank?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volume?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volumeChange?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                floorSale?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                floorSaleChange?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                salesCount?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                collectionBidSupported?: boolean | undefined;
                ownerCount?: number | undefined;
                attributes?: {
                    key?: string | undefined;
                    kind?: string | undefined;
                    count?: number | undefined;
                }[] | undefined;
            } | undefined;
            listStep: ListStep;
            usdPrice: any;
            expirationOptions: import("~/src/types/ExpirationOption").ExpirationOption[];
            expirationOption: import("~/src/types/ExpirationOption").ExpirationOption;
            marketplaces: Marketplace[];
            unapprovedMarketplaces: Marketplace[];
            isFetchingUnapprovedMarketplaces: boolean;
            localMarketplace: Marketplace | null;
            listingData: ListingData[];
            transactionError?: Error | null | undefined;
            stepData: StepData | null;
            currencies: Currency[];
            currency: Currency;
            quantity: number;
            setListStep: React.Dispatch<React.SetStateAction<ListStep>>;
            toggleMarketplace: (marketplace: Marketplace) => void;
            setExpirationOption: React.Dispatch<React.SetStateAction<import("~/src/types/ExpirationOption").ExpirationOption>>;
            setMarketPrice: (price: number, market: Marketplace) => void;
            setCurrency: (currency: Currency) => void;
            setQuantity: React.Dispatch<React.SetStateAction<number>>;
            listToken: () => void;
        }) => React.ReactNode;
    }>;
}
export enum BidStep {
    SetPrice = 0,
    Offering = 1,
    Complete = 2
}
type Trait = {
    key: string;
    value: string;
    floorAskPrice?: number;
} | undefined;
type BidData = Parameters<ZooClientActions['placeBid']>['0']['bids'][0];
type _StepData2 = {
    totalSteps: number;
    stepProgress: number;
    currentStep: Execute['steps'][0];
};
type BidCallbackData = {
    tokenId?: string;
    collectionId?: string;
    bidData: BidData | null;
};
type _Props3 = Pick<Parameters<typeof Modal>['0'], 'trigger'> & {
    openState?: [boolean, Dispatch<SetStateAction<boolean>>];
    tokenId?: string;
    collectionId?: string;
    attribute?: Trait;
    normalizeRoyalties?: boolean;
    onViewOffers?: () => void;
    onClose?: (data: BidCallbackData, stepData: _StepData2 | null, currentStep: BidStep) => void;
    onBidComplete?: (data: any) => void;
    onBidError?: (error: Error, data: any) => void;
};
export function BidModal({ openState, trigger, tokenId, collectionId, attribute, normalizeRoyalties, onViewOffers, onClose, onBidComplete, onBidError, }: _Props3): ReactElement;
export declare namespace BidModal {
    var Custom: React.FC<{
        open: boolean;
        tokenId?: string | undefined;
        collectionId?: string | undefined;
        attribute?: Trait;
        normalizeRoyalties?: boolean | undefined;
        children: (props: {
            token?: {
                token?: {
                    contract: string;
                    tokenId: string;
                    name?: string | undefined;
                    description?: string | undefined;
                    image?: string | undefined;
                    media?: string | undefined;
                    kind?: string | undefined;
                    isFlagged?: boolean | undefined;
                    lastFlagUpdate?: string | undefined;
                    lastFlagChange?: string | undefined;
                    rarity?: number | undefined;
                    rarityRank?: number | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                        slug?: string | undefined;
                    } | undefined;
                    lastBuy?: {
                        value?: number | undefined;
                        timestamp?: number | undefined;
                    } | undefined;
                    lastSell?: {
                        value?: number | undefined;
                        timestamp?: number | undefined;
                    } | undefined;
                    owner?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        kind?: string | undefined;
                        value: string;
                        tokenCount?: number | undefined;
                        onSaleCount?: number | undefined;
                        floorAskPrice?: number | undefined;
                        topBidValue?: number | undefined;
                        createdAt?: string | undefined;
                    }[] | undefined;
                } | undefined;
                market?: {
                    floorAsk?: {
                        id?: string | undefined;
                        price?: {
                            currency?: {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                            } | undefined;
                            amount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                            netAmount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                        } | undefined;
                        maker?: string | undefined;
                        validFrom?: number | undefined;
                        validUntil?: number | undefined;
                        quantityFilled?: number | undefined;
                        quantityRemaining?: number | undefined;
                        dynamicPricing?: {
                            kind?: "dutch" | "pool" | undefined;
                            data?: {
                                [key: string]: unknown;
                            } | undefined;
                        } | undefined;
                        source?: {
                            [key: string]: unknown;
                        } | undefined;
                    } | undefined;
                    topBid?: {
                        id?: string | undefined;
                        price?: {
                            currency?: {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                            } | undefined;
                            amount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                            netAmount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                        } | undefined;
                        maker?: string | undefined;
                        validFrom?: number | undefined;
                        validUntil?: number | undefined;
                        source?: {
                            [key: string]: unknown;
                        } | undefined;
                        feeBreakdown?: {
                            kind?: string | undefined;
                            recipient?: string | undefined;
                            bps?: number | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            collection?: {
                id?: string | undefined;
                slug?: string | undefined;
                createdAt?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                banner?: string | undefined;
                discordUrl?: string | undefined;
                externalUrl?: string | undefined;
                twitterUsername?: string | undefined;
                openseaVerificationStatus?: string | undefined;
                description?: string | undefined;
                sampleImages?: string[] | undefined;
                tokenCount?: string | undefined;
                onSaleCount?: string | undefined;
                primaryContract?: string | undefined;
                tokenSetId?: string | undefined;
                royalties?: {
                    recipient?: string | undefined;
                    breakdown?: {
                        recipient?: string | undefined;
                        bps?: number | undefined;
                    }[] | undefined;
                    bps?: number | undefined;
                } | undefined;
                allRoyalties?: {
                    [key: string]: unknown;
                } | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                floorAsk?: {
                    id?: string | undefined;
                    sourceDomain?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    token?: {
                        contract?: string | undefined;
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
                topBid?: {
                    id?: string | undefined;
                    sourceDomain?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                } | undefined;
                rank?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volume?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volumeChange?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                floorSale?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                floorSaleChange?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                salesCount?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                collectionBidSupported?: boolean | undefined;
                ownerCount?: number | undefined;
                attributes?: {
                    key?: string | undefined;
                    kind?: string | undefined;
                    count?: number | undefined;
                }[] | undefined;
            } | undefined;
            attributes?: import("~/src/modal/bid/BidModalRenderer").Traits;
            bidAmount: string;
            bidData: {
                token?: string | undefined;
                tokenSetId?: string | undefined;
                collection?: string | undefined;
                attributeKey?: string | undefined;
                attributeValue?: string | undefined;
                quantity?: number | undefined;
                weiPrice: string;
                orderKind?: "looks-rare" | "zeroex-v4" | "seaport" | "x2y2" | "universe" | "forward" | "infinity" | "flow" | undefined;
                orderbook?: "opensea" | "looks-rare" | "x2y2" | "reservoir" | "universe" | "infinity" | "flow" | undefined;
                orderbookApiKey?: string | undefined;
                automatedRoyalties?: boolean | undefined;
                fees?: string[] | undefined;
                excludeFlaggedTokens?: boolean | undefined;
                listingTime?: string | undefined;
                expirationTime?: string | undefined;
                salt?: string | undefined;
                nonce?: string | undefined;
                currency?: string | undefined;
            } | null;
            bidAmountUsd: number;
            bidStep: BidStep;
            hasEnoughNativeCurrency: boolean;
            hasEnoughWrappedCurrency: boolean;
            amountToWrap: string;
            usdPrice: any;
            isBanned: boolean;
            balance?: import("@wagmi/core").FetchBalanceResult | undefined;
            wrappedBalance?: import("@wagmi/core").FetchBalanceResult | undefined;
            wrappedContractName: string;
            wrappedContractAddress: string;
            uniswapConvertLink: string;
            transactionError?: Error | null | undefined;
            expirationOptions: import("~/src/types/ExpirationOption").ExpirationOption[];
            expirationOption: import("~/src/types/ExpirationOption").ExpirationOption;
            stepData: StepData | null;
            setBidStep: React.Dispatch<React.SetStateAction<BidStep>>;
            setBidAmount: React.Dispatch<React.SetStateAction<string>>;
            setExpirationOption: React.Dispatch<React.SetStateAction<import("~/src/types/ExpirationOption").ExpirationOption>>;
            setTrait: React.Dispatch<React.SetStateAction<Trait>>;
            trait: Trait;
            placeBid: () => void;
        }) => React.ReactNode;
    }>;
}
export enum AcceptBidStep {
    Checkout = 0,
    ApproveMarketplace = 1,
    Confirming = 2,
    Finalizing = 3,
    Complete = 4,
    Unavailable = 5
}
type _StepData3 = {
    totalSteps: number;
    currentStep: Execute['steps'][0];
    currentStepItem?: NonNullable<Execute['steps'][0]['items']>[0];
};
type _BidData1 = {
    tokenId?: string;
    collectionId?: string;
    txHash?: string;
    maker?: string;
};
type _Props4 = Pick<Parameters<typeof Modal>['0'], 'trigger'> & {
    openState?: [boolean, Dispatch<SetStateAction<boolean>>];
    tokenId?: string;
    collectionId?: string;
    bidId?: string;
    normalizeRoyalties?: boolean;
    onBidAccepted?: (data: _BidData1) => void;
    onClose?: (data: _BidData1, stepData: _StepData3 | null, currentStep: AcceptBidStep) => void;
    onBidAcceptError?: (error: Error, data: _BidData1) => void;
    onCurrentStepUpdate?: (data: _StepData3) => void;
};
export function AcceptBidModal({ openState, trigger, tokenId, collectionId, bidId, normalizeRoyalties, onBidAccepted, onClose, onBidAcceptError, onCurrentStepUpdate, }: _Props4): ReactElement;
export declare namespace AcceptBidModal {
    var Custom: React.FC<{
        open: boolean;
        tokenId?: string | undefined;
        collectionId?: string | undefined;
        bidId?: string | undefined;
        normalizeRoyalties?: boolean | undefined;
        children: (props: {
            loading: boolean;
            token?: {
                token?: {
                    contract: string;
                    tokenId: string;
                    name?: string | undefined;
                    description?: string | undefined;
                    image?: string | undefined;
                    media?: string | undefined;
                    kind?: string | undefined;
                    isFlagged?: boolean | undefined;
                    lastFlagUpdate?: string | undefined;
                    lastFlagChange?: string | undefined;
                    rarity?: number | undefined;
                    rarityRank?: number | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                        slug?: string | undefined;
                    } | undefined;
                    lastBuy?: {
                        value?: number | undefined;
                        timestamp?: number | undefined;
                    } | undefined;
                    lastSell?: {
                        value?: number | undefined;
                        timestamp?: number | undefined;
                    } | undefined;
                    owner?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        kind?: string | undefined;
                        value: string;
                        tokenCount?: number | undefined;
                        onSaleCount?: number | undefined;
                        floorAskPrice?: number | undefined;
                        topBidValue?: number | undefined;
                        createdAt?: string | undefined;
                    }[] | undefined;
                } | undefined;
                market?: {
                    floorAsk?: {
                        id?: string | undefined;
                        price?: {
                            currency?: {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                            } | undefined;
                            amount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                            netAmount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                        } | undefined;
                        maker?: string | undefined;
                        validFrom?: number | undefined;
                        validUntil?: number | undefined;
                        quantityFilled?: number | undefined;
                        quantityRemaining?: number | undefined;
                        dynamicPricing?: {
                            kind?: "dutch" | "pool" | undefined;
                            data?: {
                                [key: string]: unknown;
                            } | undefined;
                        } | undefined;
                        source?: {
                            [key: string]: unknown;
                        } | undefined;
                    } | undefined;
                    topBid?: {
                        id?: string | undefined;
                        price?: {
                            currency?: {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                            } | undefined;
                            amount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                            netAmount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                        } | undefined;
                        maker?: string | undefined;
                        validFrom?: number | undefined;
                        validUntil?: number | undefined;
                        source?: {
                            [key: string]: unknown;
                        } | undefined;
                        feeBreakdown?: {
                            kind?: string | undefined;
                            recipient?: string | undefined;
                            bps?: number | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
            } | undefined;
            collection?: {
                id?: string | undefined;
                slug?: string | undefined;
                createdAt?: string | undefined;
                name?: string | undefined;
                image?: string | undefined;
                banner?: string | undefined;
                discordUrl?: string | undefined;
                externalUrl?: string | undefined;
                twitterUsername?: string | undefined;
                openseaVerificationStatus?: string | undefined;
                description?: string | undefined;
                sampleImages?: string[] | undefined;
                tokenCount?: string | undefined;
                onSaleCount?: string | undefined;
                primaryContract?: string | undefined;
                tokenSetId?: string | undefined;
                royalties?: {
                    recipient?: string | undefined;
                    breakdown?: {
                        recipient?: string | undefined;
                        bps?: number | undefined;
                    }[] | undefined;
                    bps?: number | undefined;
                } | undefined;
                allRoyalties?: {
                    [key: string]: unknown;
                } | undefined;
                lastBuy?: {
                    value?: number | undefined;
                    timestamp?: number | undefined;
                } | undefined;
                floorAsk?: {
                    id?: string | undefined;
                    sourceDomain?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                    token?: {
                        contract?: string | undefined;
                        tokenId?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                    } | undefined;
                } | undefined;
                topBid?: {
                    id?: string | undefined;
                    sourceDomain?: string | undefined;
                    price?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    maker?: string | undefined;
                    validFrom?: number | undefined;
                    validUntil?: number | undefined;
                } | undefined;
                rank?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volume?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                volumeChange?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                floorSale?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                floorSaleChange?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                } | undefined;
                salesCount?: {
                    "1day"?: number | undefined;
                    "7day"?: number | undefined;
                    "30day"?: number | undefined;
                    allTime?: number | undefined;
                } | undefined;
                collectionBidSupported?: boolean | undefined;
                ownerCount?: number | undefined;
                attributes?: {
                    key?: string | undefined;
                    kind?: string | undefined;
                    count?: number | undefined;
                }[] | undefined;
            } | undefined;
            source?: {
                [key: string]: unknown;
            } | undefined;
            expiration?: number | undefined;
            totalPrice: number;
            bidAmount: number;
            bidAmountCurrency?: {
                contract?: string | undefined;
                decimals?: number | undefined;
            } | undefined;
            ethBidAmount?: number | undefined;
            acceptBidStep: AcceptBidStep;
            fees: {
                feeBreakdown?: {
                    kind?: string | undefined;
                    recipient?: string | undefined;
                    bps?: number | undefined;
                }[] | undefined;
            };
            transactionError?: Error | null | undefined;
            txHash: string | null;
            totalUsd: number;
            usdPrice: any;
            address?: string | undefined;
            etherscanBaseUrl: string;
            stepData: StepData | null;
            acceptBid: () => void;
            setAcceptBidStep: React.Dispatch<React.SetStateAction<AcceptBidStep>>;
        }) => React.ReactNode;
    }>;
}
export enum CancelBidStep {
    Cancel = 0,
    Approving = 1,
    Complete = 2
}
type _Props5 = Pick<Parameters<typeof Modal>['0'], 'trigger'> & {
    openState?: [boolean, Dispatch<SetStateAction<boolean>>];
    bidId?: string;
    normalizeRoyalties?: boolean;
    onClose?: (data: any, currentStep: CancelBidStep) => void;
    onCancelComplete?: (data: any) => void;
    onCancelError?: (error: Error, data: any) => void;
};
export function CancelBidModal({ openState, bidId, trigger, normalizeRoyalties, onClose, onCancelComplete, onCancelError, }: _Props5): ReactElement;
export declare namespace CancelBidModal {
    var Custom: React.FC<{
        open: boolean;
        bidId?: string | undefined;
        normalizeRoyalties?: boolean | undefined;
        children: (props: {
            loading: boolean;
            bid?: {
                id: string;
                kind: string;
                side: "buy" | "sell";
                status?: string | undefined;
                tokenSetId: string;
                tokenSetSchemaHash: string;
                contract?: string | undefined;
                maker: string;
                taker: string;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                validFrom: number;
                validUntil: number;
                quantityFilled?: number | undefined;
                quantityRemaining?: number | undefined;
                criteria?: {
                    kind?: "token" | undefined;
                    data?: {
                        token?: {
                            tokenId?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                        collection?: {
                            id?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
                feeBps?: number | undefined;
                feeBreakdown?: {
                    kind?: string | undefined;
                    recipient?: string | undefined;
                    bps?: number | undefined;
                }[] | undefined;
                expiration: number;
                isZoo?: boolean | undefined;
                createdAt: string;
                updatedAt: string;
                rawData?: {
                    [key: string]: unknown;
                } | undefined;
            } | undefined;
            tokenId?: string | undefined;
            cancelStep: CancelStep;
            transactionError?: Error | null | undefined;
            totalUsd: number;
            usdPrice: any;
            blockExplorerBaseUrl: string;
            steps: {
                message?: string | undefined;
                error?: string | undefined;
                errorData?: any;
                action: string;
                description: string;
                kind: "signature" | "transaction";
                items?: {
                    status: "complete" | "incomplete";
                    data?: any;
                    txHash?: string | undefined;
                    orderId?: string | undefined;
                    orderIndex?: number | undefined;
                }[] | undefined;
            }[] | null;
            stepData: import("~/src/modal/cancelBid/CancelBidModalRenderer").StepData | null;
            setCancelStep: React.Dispatch<React.SetStateAction<CancelStep>>;
            cancelOrder: () => void;
        }) => React.ReactNode;
    }>;
}
export enum CancelListingStep {
    Cancel = 0,
    Approving = 1,
    Complete = 2
}
type _Props6 = Pick<Parameters<typeof Modal>['0'], 'trigger'> & {
    openState?: [boolean, Dispatch<SetStateAction<boolean>>];
    listingId?: string;
    normalizeRoyalties?: boolean;
    onClose?: (data: any, currentStep: CancelListingStep) => void;
    onCancelComplete?: (data: any) => void;
    onCancelError?: (error: Error, data: any) => void;
};
export function CancelListingModal({ openState, listingId, trigger, normalizeRoyalties, onClose, onCancelComplete, onCancelError, }: _Props6): ReactElement;
export declare namespace CancelListingModal {
    var Custom: React.FC<{
        open: boolean;
        listingId?: string | undefined;
        normalizeRoyalties?: boolean | undefined;
        children: (props: {
            loading: boolean;
            listing?: {
                id: string;
                kind: string;
                side: "buy" | "sell";
                tokenSetId: string;
                tokenSetSchemaHash: string;
                contract?: string | undefined;
                maker: string;
                taker: string;
                price?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                validFrom: number;
                validUntil: number;
                quantityFilled?: number | undefined;
                quantityRemaining?: number | undefined;
                criteria?: {
                    kind?: "token" | undefined;
                    data?: {
                        token?: {
                            tokenId?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                        collection?: {
                            id?: string | undefined;
                            name?: string | undefined;
                            image?: string | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                status?: string | undefined;
                source?: {
                    [key: string]: unknown;
                } | undefined;
                feeBps?: number | undefined;
                feeBreakdown?: {
                    kind?: string | undefined;
                    recipient?: string | undefined;
                    bps?: number | undefined;
                }[] | undefined;
                expiration: number;
                isZoo?: boolean | undefined;
                isDynamic?: boolean | undefined;
                createdAt: string;
                updatedAt: string;
                rawData?: {
                    [key: string]: unknown;
                } | undefined;
            } | undefined;
            tokenId?: string | undefined;
            contract?: string | undefined;
            cancelStep: CancelStep;
            transactionError?: Error | null | undefined;
            totalUsd: number;
            usdPrice: any;
            blockExplorerBaseUrl: string;
            steps: {
                message?: string | undefined;
                error?: string | undefined;
                errorData?: any;
                action: string;
                description: string;
                kind: "signature" | "transaction";
                items?: {
                    status: "complete" | "incomplete";
                    data?: any;
                    txHash?: string | undefined;
                    orderId?: string | undefined;
                    orderIndex?: number | undefined;
                }[] | undefined;
            }[] | null;
            stepData: import("~/src/modal/cancelListing/CancelListingModalRenderer").StepData | null;
            setCancelStep: React.Dispatch<React.SetStateAction<CancelStep>>;
            cancelOrder: () => void;
        }) => React.ReactNode;
    }>;
}
type MediaType = 'mp4' | 'mp3' | 'wav' | 'gltf' | 'glb' | 'png' | 'jpeg' | 'jpg' | 'svg' | 'gif' | 'html' | 'other' | undefined;
export const extractMediaType: (token?: RequiredTokenProps) => MediaType | null;
type _Token1 = NonNullable<NonNullable<ReturnType<typeof useTokens>['data']>['0']>['token'];
type RequiredTokenProps = Pick<NonNullable<_Token1>, 'image' | 'media' | 'collection' | 'tokenId'>;
type _Props7 = {
    token?: RequiredTokenProps;
    preview?: boolean;
    style?: CSSProperties;
    className?: string;
    modelViewerOptions?: any;
    videoOptions?: VideoHTMLAttributes<HTMLVideoElement>;
    audioOptions?: AudioHTMLAttributes<HTMLAudioElement>;
    iframeOptions?: IframeHTMLAttributes<HTMLIFrameElement>;
    fallback?: (mediaType: MediaType | null) => ReactElement | null;
    onError?: (e: Event) => void;
    onRefreshToken?: () => void;
};
export const TokenMedia: FC<_Props7>;
type _Props8 = {
    trigger: ReactNode;
    side?: ComponentPropsWithRef<typeof Popover>['side'];
    openState?: [boolean, Dispatch<SetStateAction<boolean>>];
    tokenUrl?: string;
};
export function CartPopover({ trigger, side, openState, tokenUrl, }: _Props8): ReactElement;
export declare namespace CartPopover {
    var Custom: React.FC<{
        open: boolean;
        children: (props: {
            loading: boolean;
            currency?: {
                contract?: string | undefined;
                name?: string | undefined;
                symbol?: string | undefined;
                decimals?: number | undefined;
            } | undefined;
            totalPrice: number;
            referrerFee?: number | undefined;
            usdPrice: any;
            balance?: import("ethers").BigNumber | undefined;
            hasEnoughCurrency: boolean;
            items: {
                token: {
                    id: string;
                    name: string;
                };
                collection: {
                    id: string;
                    name: string;
                };
                price: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                poolId?: string | undefined;
                poolPrices?: ({
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined)[] | undefined;
                previousPrice?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                isBannedOnOpensea?: boolean | undefined;
            }[];
            flaggedItems: {
                token: {
                    id: string;
                    name: string;
                };
                collection: {
                    id: string;
                    name: string;
                };
                price: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                poolId?: string | undefined;
                poolPrices?: ({
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined)[] | undefined;
                previousPrice?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                isBannedOnOpensea?: boolean | undefined;
            }[];
            unavailableItems: {
                token: {
                    id: string;
                    name: string;
                };
                collection: {
                    id: string;
                    name: string;
                };
                price: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                poolId?: string | undefined;
                poolPrices?: ({
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined)[] | undefined;
                previousPrice?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                isBannedOnOpensea?: boolean | undefined;
            }[];
            priceChangeItems: {
                token: {
                    id: string;
                    name: string;
                };
                collection: {
                    id: string;
                    name: string;
                };
                price: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                poolId?: string | undefined;
                poolPrices?: ({
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined)[] | undefined;
                previousPrice?: {
                    currency?: {
                        contract?: string | undefined;
                        name?: string | undefined;
                        symbol?: string | undefined;
                        decimals?: number | undefined;
                    } | undefined;
                    amount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                    netAmount?: {
                        raw?: string | undefined;
                        decimal?: number | undefined;
                        usd?: number | undefined;
                        native?: number | undefined;
                    } | undefined;
                } | undefined;
                isBannedOnOpensea?: boolean | undefined;
            }[];
            transaction?: {
                id?: string | undefined;
                txHash?: string | undefined;
                chain: import("@zoolabs/sdk").ZooChain;
                items: {
                    token: {
                        id: string;
                        name: string;
                    };
                    collection: {
                        id: string;
                        name: string;
                    };
                    price: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    poolId?: string | undefined;
                    poolPrices?: ({
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined)[] | undefined;
                    previousPrice?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    isBannedOnOpensea?: boolean | undefined;
                }[];
                error?: Error | undefined;
                errorType?: CheckoutTransactionError | undefined;
                status: CheckoutStatus;
                steps?: {
                    message?: string | undefined;
                    error?: string | undefined;
                    errorData?: any;
                    action: string;
                    description: string;
                    kind: "signature" | "transaction";
                    items?: {
                        status: "complete" | "incomplete";
                        data?: any;
                        txHash?: string | undefined;
                        orderId?: string | undefined;
                        orderIndex?: number | undefined;
                    }[] | undefined;
                }[] | undefined;
            } | null | undefined;
            blockExplorerBaseUrl: string;
            cartChain: import("@zoolabs/sdk").ZooChain | undefined;
            checkout: (options?: Partial<Omit<{
                orderIds?: string[] | undefined;
                rawOrders?: {
                    kind: "opensea" | "looks-rare" | "zeroex-v4" | "seaport" | "x2y2" | "universe" | "infinity" | "flow" | "rarible" | "sudoswap" | "nftx";
                    data: {
                        [key: string]: unknown;
                    };
                }[] | undefined;
                tokens?: string[] | undefined;
                quantity?: number | undefined;
                taker: string;
                relayer?: string | undefined;
                onlyPath?: boolean | undefined;
                forceRouter?: boolean | undefined;
                currency?: "0x0000000000000000000000000000000000000000" | undefined;
                normalizeRoyalties?: boolean | undefined;
                preferredOrderSource?: string | undefined;
                source?: string | undefined;
                feesOnTop?: string[] | undefined;
                partial?: boolean | undefined;
                maxFeePerGas?: string | undefined;
                maxPriorityFeePerGas?: string | undefined;
                skipBalanceCheck?: boolean | undefined;
                allowInactiveOrderIds?: boolean | undefined;
                x2y2ApiKey?: string | undefined;
            }, "source" | "tokens" | "orderIds" | "rawOrders">> | undefined) => Promise<void>;
            clear: () => void;
            remove: (ids: string[]) => void;
            add: (items: ({
                token?: {
                    contract: string;
                    tokenId: string;
                    name?: string | undefined;
                    description?: string | undefined;
                    image?: string | undefined;
                    media?: string | undefined;
                    kind?: string | undefined;
                    isFlagged?: boolean | undefined;
                    lastFlagUpdate?: string | undefined;
                    lastFlagChange?: string | undefined;
                    rarity?: number | undefined;
                    rarityRank?: number | undefined;
                    collection?: {
                        id?: string | undefined;
                        name?: string | undefined;
                        image?: string | undefined;
                        slug?: string | undefined;
                    } | undefined;
                    lastBuy?: {
                        value?: number | undefined;
                        timestamp?: number | undefined;
                    } | undefined;
                    lastSell?: {
                        value?: number | undefined;
                        timestamp?: number | undefined;
                    } | undefined;
                    owner?: string | undefined;
                    attributes?: {
                        key?: string | undefined;
                        kind?: string | undefined;
                        value: string;
                        tokenCount?: number | undefined;
                        onSaleCount?: number | undefined;
                        floorAskPrice?: number | undefined;
                        topBidValue?: number | undefined;
                        createdAt?: string | undefined;
                    }[] | undefined;
                } | undefined;
                market?: {
                    floorAsk?: {
                        id?: string | undefined;
                        price?: {
                            currency?: {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                            } | undefined;
                            amount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                            netAmount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                        } | undefined;
                        maker?: string | undefined;
                        validFrom?: number | undefined;
                        validUntil?: number | undefined;
                        quantityFilled?: number | undefined;
                        quantityRemaining?: number | undefined;
                        dynamicPricing?: {
                            kind?: "dutch" | "pool" | undefined;
                            data?: {
                                [key: string]: unknown;
                            } | undefined;
                        } | undefined;
                        source?: {
                            [key: string]: unknown;
                        } | undefined;
                    } | undefined;
                    topBid?: {
                        id?: string | undefined;
                        price?: {
                            currency?: {
                                contract?: string | undefined;
                                name?: string | undefined;
                                symbol?: string | undefined;
                                decimals?: number | undefined;
                            } | undefined;
                            amount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                            netAmount?: {
                                raw?: string | undefined;
                                decimal?: number | undefined;
                                usd?: number | undefined;
                                native?: number | undefined;
                            } | undefined;
                        } | undefined;
                        maker?: string | undefined;
                        validFrom?: number | undefined;
                        validUntil?: number | undefined;
                        source?: {
                            [key: string]: unknown;
                        } | undefined;
                        feeBreakdown?: {
                            kind?: string | undefined;
                            recipient?: string | undefined;
                            bps?: number | undefined;
                        }[] | undefined;
                    } | undefined;
                } | undefined;
            } | {
                id: string;
            })[], chainId: number) => Promise<void>;
            validate: () => Promise<boolean>;
        }) => React.ReactNode;
    }>;
}

//# sourceMappingURL=index.d.ts.map
