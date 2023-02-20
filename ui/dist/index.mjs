import {jsx as $bNXjM$jsx, jsxs as $bNXjM$jsxs, Fragment as $bNXjM$Fragment} from "react/jsx-runtime";
import {createContext as $bNXjM$createContext, useState as $bNXjM$useState, useRef as $bNXjM$useRef, useCallback as $bNXjM$useCallback, useEffect as $bNXjM$useEffect, useContext as $bNXjM$useContext, useSyncExternalStore as $bNXjM$useSyncExternalStore, useMemo as $bNXjM$useMemo, forwardRef as $bNXjM$forwardRef} from "react";
import $bNXjM$swr, {SWRConfig as $bNXjM$SWRConfig, useSWRConfig as $bNXjM$useSWRConfig} from "swr";
import {redDark as $bNXjM$redDark, indigoDark as $bNXjM$indigoDark, indigoDarkA as $bNXjM$indigoDarkA, slateDark as $bNXjM$slateDark, blackA as $bNXjM$blackA, green as $bNXjM$green, indigo as $bNXjM$indigo, indigoA as $bNXjM$indigoA, red as $bNXjM$red, gray as $bNXjM$gray, whiteA as $bNXjM$whiteA} from "@radix-ui/colors";
import {createClient as $bNXjM$createClient, setParams as $bNXjM$setParams, isOpenSeaBanned as $bNXjM$isOpenSeaBanned, getClient as $bNXjM$getClient} from "@zoolabs/sdk";
import {createStitches as $bNXjM$createStitches} from "@stitches/react";
import $bNXjM$swrinfinite from "swr/infinite";
import {useNetwork as $bNXjM$useNetwork, useSwitchNetwork as $bNXjM$useSwitchNetwork, mainnet as $bNXjM$mainnet, goerli as $bNXjM$goerli, useAccount as $bNXjM$useAccount, useSigner as $bNXjM$useSigner, useBalance as $bNXjM$useBalance} from "wagmi";
import {constants as $bNXjM$constants, utils as $bNXjM$utils} from "ethers";
import {formatUnits as $bNXjM$formatUnits, parseUnits as $bNXjM$parseUnits, parseEther as $bNXjM$parseEther, formatEther as $bNXjM$formatEther} from "ethers/lib/utils.js";
import {getNetwork as $bNXjM$getNetwork, fetchSigner as $bNXjM$fetchSigner} from "wagmi/actions";
import {faCircleExclamation as $bNXjM$faCircleExclamation, faCheckCircle as $bNXjM$faCheckCircle, faExchange as $bNXjM$faExchange, faCopy as $bNXjM$faCopy, faSpinner as $bNXjM$faSpinner, faChevronDown as $bNXjM$faChevronDown, faCube as $bNXjM$faCube, faWallet as $bNXjM$faWallet, faChevronLeft as $bNXjM$faChevronLeft, faClose as $bNXjM$faClose, faInfoCircle as $bNXjM$faInfoCircle, faCalendar as $bNXjM$faCalendar, faMagnifyingGlass as $bNXjM$faMagnifyingGlass, faPause as $bNXjM$faPause, faPlay as $bNXjM$faPlay, faShoppingCart as $bNXjM$faShoppingCart, faRefresh as $bNXjM$faRefresh, faArrowUp as $bNXjM$faArrowUp, faArrowDown as $bNXjM$faArrowDown, faCircleCheck as $bNXjM$faCircleCheck, faTriangleExclamation as $bNXjM$faTriangleExclamation, faCircleInfo as $bNXjM$faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon as $bNXjM$FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {motion as $bNXjM$motion, AnimatePresence as $bNXjM$AnimatePresence} from "framer-motion";
import {Trigger as $bNXjM$Trigger, Content as $bNXjM$Content, ItemText as $bNXjM$ItemText, Value as $bNXjM$Value, Icon as $bNXjM$Icon, Root as $bNXjM$Root, Portal as $bNXjM$Portal, ScrollUpButton as $bNXjM$ScrollUpButton, Viewport as $bNXjM$Viewport, ScrollDownButton as $bNXjM$ScrollDownButton, Item as $bNXjM$Item} from "@radix-ui/react-select";
import {Arrow as $bNXjM$Arrow, Content as $bNXjM$Content1, Root as $bNXjM$Root1, Trigger as $bNXjM$Trigger1, Portal as $bNXjM$Portal1} from "@radix-ui/react-popover";
import {Title as $bNXjM$Title, Close as $bNXjM$Close, Overlay as $bNXjM$Overlay, Content as $bNXjM$Content2, Root as $bNXjM$Root2, DialogTrigger as $bNXjM$DialogTrigger, DialogPortal as $bNXjM$DialogPortal} from "@radix-ui/react-dialog";
import $bNXjM$dayjs from "dayjs";
import $bNXjM$swrimmutable from "swr/immutable";
import {Root as $bNXjM$Root3, Thumb as $bNXjM$Thumb} from "@radix-ui/react-switch";
import $bNXjM$dayjspluginrelativeTimejs from "dayjs/plugin/relativeTime.js";
import $bNXjM$reactflatpickr from "react-flatpickr";
import {Root as $bNXjM$Root4, Viewport as $bNXjM$Viewport1, Scrollbar as $bNXjM$Scrollbar, Thumb as $bNXjM$Thumb1, Corner as $bNXjM$Corner} from "@radix-ui/react-scroll-area";
import {useMeasure as $bNXjM$useMeasure} from "@react-hookz/web";
import * as $bNXjM$wagmichains from "wagmi/chains";

/// <reference path="./types/parcel.d.ts" />
//Providers



const $35e7883cc4a3f817$export$8e9bfb060b52dac8 = (overrides)=>{
    return {
        radii: {
            borderRadius: overrides?.borderRadius || "4px"
        },
        fonts: {
            body: overrides?.font || "sans-serif",
            button: overrides?.buttonFont || overrides?.font || "sans-serif",
            headline: overrides?.headlineFont || overrides?.font || "sans-serif"
        }
    };
};


function $1b804d6c5a50513c$export$2e2bcd8739ae039(overrides) {
    let sharedTheme = (0, $35e7883cc4a3f817$export$8e9bfb060b52dac8)(overrides);
    return {
        colors: {
            ...(0, $bNXjM$redDark),
            ...(0, $bNXjM$indigoDark),
            ...(0, $bNXjM$indigoDarkA),
            ...(0, $bNXjM$slateDark),
            ...(0, $bNXjM$blackA),
            ...(0, $bNXjM$green),
            // accent colors
            accentBase: "$indigo1",
            accentBgSubtle: "$indigo2",
            accentBg: "$indigo3",
            accentBgHover: "$indigo4",
            accentBgActive: "$indigo5",
            accentLine: "$indigo6",
            accentBorder: "$indigo7",
            accentBorderHover: overrides?.primaryColor || "$indigo8",
            accentSolid: overrides?.primaryColor || "$indigo9",
            accentSolidHover: overrides?.primaryHoverColor || overrides?.primaryColor || "$indigo10",
            accentText: "$indigo11",
            accentTextContrast: "$indigo12",
            // neutral colors
            neutralBase: "$slate1",
            neutralBgSubtle: "$slate2",
            neutralBg: "$slate3",
            neutralBgHover: "$slate4",
            neutralBgActive: "$slate5",
            neutalLine: "$slate6",
            neutralBorder: "$slate7",
            neutralBorderHover: "$slate8",
            neutralSolid: "$slate9",
            neutralSolidHover: "$slate10",
            neutralText: "$slate11",
            neutralTextContrast: "$slate12",
            // secondary colors
            secondaryBase: "$indigoA1",
            secondaryBgSubtle: "$indigoA2",
            secondaryBg: "$indigoA3",
            secondaryBgHover: "$indigoA4",
            secondaryBgActive: "$indigoA5",
            secondaryLine: "$indigoA6",
            secondaryBorder: "$indigoA7",
            secondaryBorderHover: "$indigoA8",
            secondarySolid: "$indigoA9",
            secondarySolidHover: "$indigoA10",
            secondaryText: "$indigoA11",
            secondaryTextContrast: "$indigoA12",
            // general colors
            borderColor: overrides?.borderColor || "$neutralBorder",
            textColor: overrides?.textColor || "$neutralTextContrast",
            focusColor: "$neutralTextContrast",
            errorText: "$red12",
            errorAccent: "$red10",
            successAccent: "$green10",
            // component colors
            reservoirLogoColor: "#ECEDEE",
            inputBackground: "$neutralBgHover",
            buttonTextColor: overrides?.buttonTextColor || "white",
            buttonTextHoverColor: overrides?.buttonTextHoverColor || "white",
            overlayBackground: overrides?.overlayBackground || "$blackA10",
            headerBackground: overrides?.headerBackground || "$neutralBgHover",
            footerBackground: overrides?.footerBackground || "$neutralBg",
            contentBackground: overrides?.contentBackground || "$neutralBgSubtle",
            wellBackground: overrides?.wellBackground || "$neutralBase",
            popoverBackground: overrides?.popoverBackground || "$neutralBgActive"
        },
        assets: {
            ethIcon: overrides?.ethIcon || "purple"
        },
        ...sharedTheme
    };
}





var $70ec4a103fdcb416$exports = {};
$70ec4a103fdcb416$exports = JSON.parse('{"name":"@zoolabs/ui","description":"ZDK is the official frontend kit to get you building dApps with the Zoo Protocol.","version":"5.9.5","author":"Zoo Labs Foundation","license":"MIT","source":"src/index.ts","exports":"./dist/index.mjs","module":"dist/index.mjs","types":"dist/index.d.ts","type":"module","files":["dist"],"keywords":["nft","zoo","zoolabs","protocol","sdk"],"sideEffects":false,"scripts":{"clean":"rm -rf dist","version":"yarn version","version:package":"sh ../../scripts/package-version.sh","version:update":"yarn version ${0}; PACKAGE_VERSION=$(yarn version:package); git add -A; git commit -m \\"\uD83C\uDF89 Release ui package v$PACKAGE_VERSION\\"; git push","version:prerelease":"yarn version prerelease; RC_VERSION=$(yarn version:package); git add -A; git commit -m \\"✨ Prerelease ui package v$RC_VERSION\\"; git push;","changelog":"node ../../scripts/generate-changelog.js package=ui"},"dependencies":{"@fortawesome/fontawesome-svg-core":"^6.3.0","@fortawesome/free-solid-svg-icons":"^6.3.0","@fortawesome/react-fontawesome":"^0.2.0","@radix-ui/colors":"^0.1.8","@radix-ui/react-dialog":"1.0.2","@radix-ui/react-popover":"1.0.3","@radix-ui/react-scroll-area":"1.0.2","@radix-ui/react-select":"1.2.0","@radix-ui/react-switch":"1.0.1","@radix-ui/react-toggle-group":"^1.0.2","@react-hookz/web":"^22.0.0","@stitches/react":"^1.3.1-1","@types/react-flatpickr":"^3.8.8","@zoolabs/sdk":"5.4.3","dayjs":"^1.11.7","flatpickr":"^4.6.13","framer-motion":"^9.0.4","react-flatpickr":"^3.10.13","swr":"2.0.3"},"peerDependencies":{"ethers":"^5.7.2","react":"^18.0","react-dom":"^18.0","wagmi":"^0.11.0"},"repository":{"type":"git","url":"https://github.com/zoolabs/zdk"}}');


const $c216485f70235e8a$export$c2432d5cebe1723e = /*#__PURE__*/ (0, $bNXjM$createContext)(null);
const $c216485f70235e8a$export$bf730ab0ed25211d = function({ children: children , options: options  }) {
    const [clientContext, _] = (0, $bNXjM$useState)((0, $bNXjM$createClient)({
        ...options,
        uiVersion: (0, $70ec4a103fdcb416$exports.version)
    }));
    return /*#__PURE__*/ (0, $bNXjM$jsx)($c216485f70235e8a$export$c2432d5cebe1723e.Provider, {
        value: clientContext,
        children: children
    });
};




const { createTheme: $fcefeedae0fec8b6$export$25d302a5b900a763 , keyframes: $fcefeedae0fec8b6$export$d25ddfdf17c3ad3e , styled: $fcefeedae0fec8b6$export$3817b7a54a07cec7 , globalCss: $fcefeedae0fec8b6$export$db53682eef82cc11 , getCssText: $fcefeedae0fec8b6$export$681e449128971c74 , theme: $fcefeedae0fec8b6$export$bca14c5b3b88a9c9 , config: $fcefeedae0fec8b6$export$e506a1d27d1eaa20  } = (0, $bNXjM$createStitches)({
    theme: {
        space: {
            1: "4px",
            2: "8px",
            3: "12px",
            4: "16px",
            5: "32px",
            6: "64px"
        },
        fontSizes: {},
        fontWeights: {},
        fonts: {
            body: "sans-serif",
            button: "$body"
        },
        lineHeights: {},
        letterSpacings: {},
        sizes: {},
        radii: {
            borderRadius: 0
        },
        shadows: {},
        transitions: {}
    },
    utils: {
        // MARGIN
        m: (value)=>({
                margin: value
            }),
        mx: (value)=>({
                marginLeft: value,
                marginRight: value
            }),
        my: (value)=>({
                marginTop: value,
                marginBottom: value
            }),
        mt: (value)=>({
                marginTop: value
            }),
        mb: (value)=>({
                marginBottom: value
            }),
        ml: (value)=>({
                marginLeft: value
            }),
        mr: (value)=>({
                marginRight: value
            }),
        // PADDING
        p: (value)=>({
                padding: value
            }),
        px: (value)=>({
                paddingLeft: value,
                paddingRight: value
            }),
        py: (value)=>({
                paddingTop: value,
                paddingBottom: value
            }),
        pt: (value)=>({
                paddingTop: value
            }),
        pb: (value)=>({
                paddingBottom: value
            }),
        pl: (value)=>({
                paddingLeft: value
            }),
        pr: (value)=>({
                paddingRight: value
            }),
        // DIMENSIONS
        w: (value)=>({
                width: value
            }),
        h: (value)=>({
                height: value
            }),
        size: (value)=>({
                width: value,
                height: value
            })
    },
    media: {
        bp1: "(min-width: 600px)",
        bp2: "(min-width: 905px)",
        bp3: "(min-width: 1240px)",
        bp4: "(min-width: 1440px)",
        motion: "(prefers-reduced-motion)",
        hover: "(any-hover: hover)",
        dark: "(prefers-color-scheme: dark)",
        light: "(prefers-color-scheme: light)"
    },
    prefix: "rk"
});



const $0a64ae8247e4abb5$export$a6f1ecf08e412113 = (apiKey, clientVersion)=>{
    const headers = {
        "x-rkui-version": (0, $70ec4a103fdcb416$exports.version)
    };
    if (apiKey) headers["x-api-key"] = apiKey;
    if (clientVersion) headers["x-rkc-version"] = clientVersion;
    return headers;
};
const $0a64ae8247e4abb5$export$77754e0ac9f8aba3 = (params)=>{
    let resource;
    let apiKey;
    let clientVersion;
    if (Array.isArray(params)) {
        resource = params[0];
        apiKey = params[1];
        clientVersion = params[2];
    } else resource = params;
    const headers = $0a64ae8247e4abb5$export$a6f1ecf08e412113(apiKey, clientVersion);
    return fetch(resource, {
        headers: headers
    }).then((res)=>res.json()).catch((e)=>{
        throw e;
    });
};
const $0a64ae8247e4abb5$export$6f9d915eee0c027b = {
    fetcher: $0a64ae8247e4abb5$export$77754e0ac9f8aba3,
    revalidateOnFocus: false
};



const $99462434649fe8bd$var$fpFadeInDown = (0, $fcefeedae0fec8b6$export$d25ddfdf17c3ad3e)({
    "0%": {
        opacity: 0,
        transform: "translate3d(0, -20px, 0)"
    },
    "100%": {
        opacity: 1,
        transform: "translate3d(0, 0, 0)"
    }
});
const $99462434649fe8bd$var$calendarCss = (0, $fcefeedae0fec8b6$export$db53682eef82cc11)({
    ".flatpickr-calendar": {
        opacity: 0,
        display: "none",
        textAlign: "center",
        visibility: "hidden",
        padding: 20,
        animation: "none",
        direction: "ltr",
        fontSize: 14,
        lineHeight: "24px",
        borderRadius: 5,
        position: "absolute",
        width: 307.875,
        boxSizing: "border-box",
        touchAction: "manipulation",
        backgroundColor: "$contentBackground",
        boxShadow: "1px 0 0 #20222c, -1px 0 0 #20222c, 0 1px 0 #20222c, 0 -1px 0 #20222c, 0 3px 13px rgba(0,0,0,0.08)",
        border: "1px solid $borderColor",
        fontFamily: "$body"
    },
    ".flatpickr-calendar.open": {
        opacity: 1,
        maxHeight: 640,
        visibility: "visible",
        display: "inline-block",
        zIndex: 99999,
        pointerEvents: "all"
    },
    ".flatpickr-calendar.inline": {
        opacity: 1,
        maxHeight: 640,
        visibility: "visible",
        display: "block",
        position: "relative",
        top: 2
    },
    ".flatpickr-calendar.animate.open": {
        animation: `${$99462434649fe8bd$var$fpFadeInDown} 300ms cubic-bezier(0.23, 1, 0.32, 1)`
    },
    ".flatpickr-calendar.static": {
        position: "absolute",
        top: "calc(100% + 2px)"
    },
    ".flatpickr-calendar.static.open": {
        zIndex: 999,
        display: "block"
    },
    ".flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7)": {
        boxShadow: "none !important"
    },
    ".flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1)": {
        boxShadow: "-2px 0 0 #e6e6e6, 5px 0 0 #e6e6e6"
    },
    ".flatpickr-calendar .hasWeeks .dayContainer": {
        borderBottom: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeft: 0
    },
    ".flatpickr-calendar .hasTime .dayContainer": {
        borderBottom: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
    },
    ".flatpickr-calendar.hasTime .flatpickr-time": {
        height: 40
    },
    ".flatpickr-calendar.noCalendar.hasTime .flatpickr-time": {
        height: "auto"
    },
    ".flatpickr-calendar:before": {
        position: "absolute",
        display: "block",
        pointerEvents: "none",
        border: "solid transparent",
        content: "",
        height: 0,
        width: 0,
        left: 22,
        borderWidth: 5,
        margin: "0 -5px"
    },
    ".flatpickr-calendar:after": {
        position: "absolute",
        display: "block",
        pointerEvents: "none",
        border: "solid transparent",
        content: "",
        height: 0,
        width: 0,
        left: 22,
        borderWidth: 4,
        margin: "0 -4px"
    },
    ".flatpickr-calendar.rightMost:before, .flatpickr-calendar.arrowRight:before, .flatpickr-calendar.rightMost:after, .flatpickr-calendar.arrowRight:after": {
        left: "auto",
        right: 22
    },
    ".flatpickr-calendar.arrowCenter:before, .flatpickr-calendar.arrowCenter:after": {
        left: "50%",
        right: "50%"
    },
    ".flatpickr-calendar.arrowTop:before, .flatpickr-calendar.arrowTop:after": {
        bottom: "100%"
    },
    ".flatpickr-calendar.arrowTop:before": {
        display: "none"
    },
    ".flatpickr-calendar.arrowTop:after": {
        display: "none"
    },
    ".flatpickr-calendar.arrowBottom:before, .flatpickr-calendar.arrowBottom:after": {
        top: "100%"
    },
    ".flatpickr-calendar.arrowBottom:before": {
        display: "none"
    },
    ".flatpickr-calendar.arrowBottom:after": {
        display: "none"
    },
    ".flatpickr-calendar:focus": {
        outline: 0
    },
    ".flatpickr-wrapper": {
        position: "relative",
        display: "inline-block"
    },
    ".flatpickr-months": {
        display: "flex"
    },
    ".flatpickr-months .flatpickr-month": {
        backgroundColor: "$contentBackground",
        color: "$neutralTextContrast",
        fill: "$neutralTextContrast",
        height: 34,
        lineHeight: "1px",
        textAlign: "center",
        position: "relative",
        userSelect: "none",
        overflow: "hidden",
        flex: 1,
        marginBottom: 8
    },
    ".flatpickr-months .flatpickr-prev-month, .flatpickr-months .flatpickr-next-month": {
        userSelect: "none",
        textDecoration: "none",
        cursor: "pointer",
        position: "absolute",
        top: 20,
        height: 34,
        padding: 10,
        zIndex: 3,
        color: "$neutralText",
        fill: "$neutralText"
    },
    ".flatpickr-months .flatpickr-prev-month.flatpickr-disabled, .flatpickr-months .flatpickr-next-month.flatpickr-disabled": {
        display: "none"
    },
    ".flatpickr-months .flatpickr-prev-month i, .flatpickr-months .flatpickr-next-month i": {
        position: "relative"
    },
    ".flatpickr-months .flatpickr-prev-month.flatpickr-prev-month, .flatpickr-months .flatpickr-next-month.flatpickr-prev-month": {
        left: 0
    },
    ".flatpickr-months .flatpickr-prev-month.flatpickr-next-month, .flatpickr-months .flatpickr-next-month.flatpickr-next-month": {
        right: 0
    },
    ".flatpickr-months .flatpickr-prev-month:hover, .flatpickr-months .flatpickr-next-month:hover": {
        color: "$neutralText"
    },
    ".flatpickr-months .flatpickr-prev-month:hover svg, .flatpickr-months .flatpickr-next-month:hover svg": {
        fill: "$neutralTextContrast"
    },
    ".flatpickr-months .flatpickr-prev-month svg, .flatpickr-months .flatpickr-next-month svg": {
        width: 14,
        height: 14
    },
    ".flatpickr-months .flatpickr-prev-month svg path, .flatpickr-months .flatpickr-next-month svg path": {
        transition: "fill 0.1s",
        fill: "inherit"
    },
    ".numInputWrapper": {
        position: "relative",
        height: "auto"
    },
    ".numInputWrapper input, .numInputWrapper span": {
        display: "inline-block"
    },
    ".numInputWrapper input": {
        width: "100%"
    },
    ".numInputWrapper input::-ms-clear": {
        display: "none"
    },
    ".numInputWrapper input::-webkit-outer-spin-button, .numInputWrapper input::-webkit-inner-spin-button": {
        margin: 0,
        "-webkit-appearance": "none"
    },
    ".numInputWrapper span": {
        position: "absolute",
        right: 0,
        width: 14,
        padding: "0 4px 0 2px",
        height: "50%",
        lineHeight: "50%",
        opacity: 0,
        cursor: "pointer",
        boxSizing: "border-box"
    },
    ".numInputWrapper span:hover": {
        background: "$neutralBgHover"
    },
    ".numInputWrapper span:active": {
        background: "$neutralBgActive"
    },
    ".numInputWrapper span:after": {
        display: "block",
        content: "",
        position: "absolute"
    },
    ".numInputWrapper span.arrowUp": {
        top: 0,
        borderBottom: 0
    },
    ".numInputWrapper span.arrowUp:after": {
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        borderBottom: "4px solid $neutralText",
        top: "26%"
    },
    ".numInputWrapper span.arrowDown": {
        top: "50%"
    },
    ".numInputWrapper span.arrowDown:after": {
        borderLeft: "4px solid transparent",
        borderRight: "4px solid transparent",
        borderTop: "4px solid $neutralText",
        top: "40%"
    },
    ".numInputWrapper span svg": {
        width: "inherit",
        height: "auto"
    },
    ".numInputWrapper span svg path": {
        fill: "$neutralBgHover"
    },
    ".numInputWrapper:hover": {
        background: "$neutralBgHover"
    },
    ".numInputWrapper:hover span": {
        opacity: 1
    },
    ".flatpickr-current-month": {
        fontSize: "135%",
        fontWeight: 300,
        color: "$neutralText",
        position: "absolute",
        width: "83%",
        left: "12.5%",
        lineHeight: "1px",
        height: 34,
        display: "flex",
        alignItems: "center",
        gap: 12,
        textAlign: "center",
        transform: "translate3d(0px, 0px, 0px)"
    },
    ".flatpickr-current-month span.cur-month": {
        fontFamily: "inherit",
        fontWeight: 700,
        color: "$neutralText",
        display: "inline-block",
        marginLeft: "0.5ch",
        padding: 0
    },
    ".flatpickr-current-month span.cur-month:hover": {
        background: "rgba(192,187,167,0.05)"
    },
    ".flatpickr-current-month .numInputWrapper": {
        width: "7ch\0",
        display: "inline-block"
    },
    ".flatpickr-current-month .numInputWrapper span.arrowUp:after": {
        borderBottomColor: "$neutralText"
    },
    ".flatpickr-current-month .numInputWrapper span.arrowDown:after": {
        borderTopColor: "$neutralText"
    },
    ".flatpickr-current-month input.cur-year": {
        backgroundColor: "transparent",
        boxSizing: "border-box",
        color: "$neutralText",
        cursor: "text",
        margin: 0,
        display: "inline-block",
        fontSize: "inherit",
        fontFamily: "inherit",
        lineHeight: "inherit",
        height: "auto",
        border: 0,
        borderRadius: 0,
        verticalAlign: "initial",
        appearance: "textfield",
        padding: "4px 0px"
    },
    ".flatpickr-current-month input.cur-year:focus": {
        outline: 0
    },
    ".flatpickr-current-month input.cur-year[disabled], .flatpickr-current-month input.cur-year[disabled]:hover": {
        fontSize: "100%",
        color: "$neutralText",
        background: "transparent",
        pointerEvents: "none"
    },
    ".flatpickr-current-month .flatpickr-monthDropdown-months": {
        appearance: "menulist",
        backgroundColor: "transparent",
        border: "none",
        borderRadius: 0,
        boxSizing: "border-box",
        color: "$neutralText",
        cursor: "pointer",
        fontSize: "inherit",
        fontFamily: "inherit",
        height: "auto",
        lineHeight: "inherit",
        outline: "none",
        position: "relative",
        verticalAlign: "initial",
        width: "auto",
        padding: "4px 8px"
    },
    ".flatpickr-current-month .flatpickr-monthDropdown-months:focus, .flatpickr-current-month .flatpickr-monthDropdown-months:active": {
        outline: "none"
    },
    ".flatpickr-current-month .flatpickr-monthDropdown-months:hover": {
        backgroundColor: "$neutralBgHover"
    },
    ".flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month": {
        backgroundColor: "$neutralBg",
        outline: "none",
        padding: 0
    },
    ".flatpickr-weekdays": {
        backgroundColor: "transparent",
        color: "$neutralText",
        textAlign: "center",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: 28,
        border: "transparent",
        marginBottom: 8
    },
    ".flatpickr-weekdays .flatpickr-weekdaycontainer": {
        display: "flex",
        flex: 1
    },
    "span.flatpickr-weekday": {
        cursor: "default",
        fontSize: "90%",
        background: "transparent",
        color: "$neutralText",
        lineHeight: "1px",
        margin: 0,
        textAlign: "center",
        display: "block",
        flex: 1,
        fontWeight: "bolder"
    },
    ".dayContainer, .flatpickr-weeks": {
        padding: "1px 0 0 0"
    },
    ".flatpickr-days": {
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-start",
        width: 307.875,
        marginBottom: 12
    },
    ".flatpickr-days:focus": {
        outline: 0
    },
    ".dayContainer": {
        padding: 0,
        outline: 0,
        textAlign: "left",
        width: 307.875,
        minWidth: 307.875,
        maxWidth: 307.875,
        boxSizing: "border-box",
        display: "flex",
        flexWrap: "wrap",
        "-ms-flex-pack": "justify",
        justifyContent: "space-around",
        transform: "translate3d(0px, 0px, 0px)",
        opacity: 1
    },
    ".dayContainer + .dayContainer": {
        boxShadow: "-1px 0 0 #20222c"
    },
    ".flatpickr-day": {
        background: "none",
        border: "1px solid transparent",
        borderRadius: 150,
        boxSizing: "border-box",
        color: "$neutralText",
        cursor: "pointer",
        fontWeight: 400,
        width: "14.2857143%",
        flexBasis: "14.2857143%",
        maxWidth: 39,
        height: 39,
        lineHeight: "39px",
        margin: 0,
        display: "inline-block",
        position: "relative",
        "-webkit-box-pack": "center",
        "-ms-flex-pack": "center",
        justifyContent: "center",
        textAlign: "center"
    },
    ".flatpickr-day.inRange, .flatpickr-day.prevMonthDay.inRange, .flatpickr-day.nextMonthDay.inRange, .flatpickr-day.today.inRange, .flatpickr-day.prevMonthDay.today.inRange, .flatpickr-day.nextMonthDay.today.inRange, .flatpickr-day:hover, .flatpickr-day.prevMonthDay:hover, .flatpickr-day.nextMonthDay:hover, .flatpickr-day:focus, .flatpickr-day.prevMonthDay:focus, .flatpickr-day.nextMonthDay:focus": {
        cursor: "pointer",
        outline: 0,
        backgroundColor: "$accentBg",
        borderColor: "$neutralBorder"
    },
    ".flatpickr-day.today": {
        borderColor: "$neutralBorder"
    },
    ".flatpickr-day.today:hover, .flatpickr-day.today:focus": {
        borderColor: "$neutralBorder",
        backgroundColor: "$neutralBg",
        color: "$buttonTextColor"
    },
    ".flatpickr-day.selected, .flatpickr-day.startRange, .flatpickr-day.endRange, .flatpickr-day.selected.inRange, .flatpickr-day.startRange.inRange, .flatpickr-day.endRange.inRange, .flatpickr-day.selected:focus, .flatpickr-day.startRange:focus, .flatpickr-day.endRange:focus, .flatpickr-day.selected:hover, .flatpickr-day.startRange:hover, .flatpickr-day.endRange:hover, .flatpickr-day.selected.prevMonthDay, .flatpickr-day.startRange.prevMonthDay, .flatpickr-day.endRange.prevMonthDay, .flatpickr-day.selected.nextMonthDay, .flatpickr-day.startRange.nextMonthDay, .flatpickr-day.endRange.nextMonthDay": {
        backgroundColor: "$accentBg",
        boxShadow: "none",
        color: "$neutralTextContrast",
        borderColor: "$borderColor"
    },
    ".flatpickr-day.selected.startRange, .flatpickr-day.startRange.startRange, .flatpickr-day.endRange.startRange": {
        borderRadius: "50px 0 0 50px"
    },
    ".flatpickr-day.selected.endRange, .flatpickr-day.startRange.endRange, .flatpickr-day.endRange.endRange": {
        borderRadius: "0 50px 50px 0"
    },
    ".flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)), .flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)), .flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1))": {
        boxShadow: "-10px 0 0 #80cbc4"
    },
    ".flatpickr-day.selected.startRange.endRange, .flatpickr-day.startRange.startRange.endRange, .flatpickr-day.endRange.startRange.endRange": {
        borderRadius: 50
    },
    ".flatpickr-day.inRange": {
        borderRadius: 0,
        boxShadow: "-5px 0 0 #646c8c, 5px 0 0 #646c8c"
    },
    ".flatpickr-day.flatpickr-disabled, .flatpickr-day.flatpickr-disabled:hover, .flatpickr-day.prevMonthDay, .flatpickr-day.nextMonthDay, .flatpickr-day.notAllowed, .flatpickr-day.notAllowed.prevMonthDay, .flatpickr-day.notAllowed.nextMonthDay": {
        color: "$neutralText",
        background: "transparent",
        borderColor: "transparent",
        cursor: "default"
    },
    ".flatpickr-day.flatpickr-disabled, .flatpickr-day.flatpickr-disabled:hover": {
        cursor: "not-allowed",
        color: "$neutralText",
        opacity: 0.5
    },
    ".flatpickr-day.week.selected": {
        borderRadius: 0,
        boxShadow: "-5px 0 0 #80cbc4, 5px 0 0 #80cbc4"
    },
    ".flatpickr-day.hidden": {
        visibility: "hidden"
    },
    ".rangeMode .flatpickr-day": {
        marginTop: 1
    },
    ".flatpickr-weekwrapper": {
        float: "left"
    },
    ".flatpickr-weekwrapper .flatpickr-weeks": {
        padding: "0 12px",
        boxShadow: "1px 0 0 #20222c"
    },
    ".flatpickr-weekwrapper .flatpickr-weekday": {
        float: "none",
        width: "100%",
        lineHeight: "28px"
    },
    ".flatpickr-weekwrapper span.flatpickr-day, .flatpickr-weekwrapper span.flatpickr-day:hover": {
        display: "block",
        width: "100%",
        maxWidth: "none",
        color: "$neutralText",
        background: "transparent",
        cursor: "default",
        border: "none"
    },
    ".flatpickr-innerContainer": {
        display: "flex",
        boxSizing: "border-box",
        overflow: "hidden"
    },
    ".flatpickr-rContainer": {
        display: "inline-block",
        padding: 0,
        boxSizing: "border-box"
    },
    ".flatpickr-time": {
        textAlign: "center",
        outline: 0,
        height: 0,
        lineHeight: "40px",
        maxHeight: 40,
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex"
    },
    ".flatpickr-time:after": {
        content: "",
        display: "table",
        clear: "both"
    },
    ".flatpickr-time .numInputWrapper": {
        flex: 1,
        width: "40%",
        height: 40,
        float: "left"
    },
    ".flatpickr-time .numInputWrapper span.arrowUp:after": {
        borderBottomColor: "$neutralText"
    },
    ".flatpickr-time .numInputWrapper span.arrowDown:after": {
        borderTopColor: "$neutralText"
    },
    ".flatpickr-time.hasSeconds .numInputWrapper": {
        width: "26%"
    },
    ".flatpickr-time.time24hr .numInputWrapper": {
        width: "49%"
    },
    ".flatpickr-time input": {
        background: "transparent",
        boxShadow: "none",
        border: 0,
        borderRadius: 0,
        textAlign: "center",
        margin: 0,
        padding: 0,
        height: "inherit",
        lineHeight: "inherit",
        color: "$neutralText",
        fontSize: 14,
        position: "relative",
        boxSizing: "border-box",
        appearance: "textfield"
    },
    ".flatpickr-time input.flatpickr-hour": {},
    ".flatpickr-time input.flatpickr-minute, .flatpickr-time input.flatpickr-second": {
        fontWeight: 400
    },
    ".flatpickr-time input:focus": {
        outline: 0,
        border: 0
    },
    ".flatpickr-time .flatpickr-time-separator, .flatpickr-time .flatpickr-am-pm": {
        height: "inherit",
        float: "left",
        lineHeight: "inherit",
        color: "$neutralText",
        fontWeight: "bold",
        width: "2%",
        userSelect: "none",
        "-ms-flex-item-align": "center",
        alignSelf: "center"
    },
    ".flatpickr-time .flatpickr-am-pm": {
        outline: 0,
        width: "18%",
        cursor: "pointer",
        textAlign: "center",
        fontWeight: 400
    },
    ".flatpickr-time input:hover, .flatpickr-time .flatpickr-am-pm:hover, .flatpickr-time input:focus, .flatpickr-time .flatpickr-am-pm:focus": {
        background: "$neutralBgHover"
    },
    ".flatpickr-input[readonly]": {
        cursor: "pointer"
    },
    ".flatpickr-input.flatpickr-mobile": {
        "&::-webkit-inner-spin-button": {
            display: "none",
            "-webkit-appearance": "none"
        },
        "&::-webkit-calendar-picker-indicator": {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "none"
        },
        "&::-webkit-datetime-edit": {
            display: "none",
            "-webkit-appearance": "none"
        },
        "&::-webkit-date-and-time-value": {
            display: "none",
            "-webkit-appearance": "none"
        }
    },
    "@-moz-document url-prefix()": {
        "@media only screen and (max-width: 600px)": {
            '.flatpickr-input[type="text"]': {
                color: "transparent"
            }
        }
    }
});
var $99462434649fe8bd$export$2e2bcd8739ae039 = $99462434649fe8bd$var$calendarCss;



const $a541419cb138b974$var$useMutationObservable = (callback, el, options)=>{
    const [observer, setObserver] = (0, $bNXjM$useState)(null);
    (0, $bNXjM$useEffect)(()=>{
        if (observer) observer.disconnect();
        if (!el || typeof window === "undefined" || !("MutationObserver" in window)) return;
        const obs = new MutationObserver(callback);
        obs.observe(el, options);
        setObserver(obs);
        return ()=>{
            obs.disconnect();
        };
    }, [
        el,
        callback,
        options
    ]);
    return observer;
};
var $a541419cb138b974$export$2e2bcd8739ae039 = $a541419cb138b974$var$useMutationObservable;


const $b15843e937ac72b8$export$2c657da244d00bd6 = /*#__PURE__*/ (0, $bNXjM$createContext)(undefined);
const $b15843e937ac72b8$export$f66a1c3c9465af21 = /*#__PURE__*/ (0, $bNXjM$createContext)({});
const $b15843e937ac72b8$var$defaultOptions = {
    chains: [
        {
            baseApiUrl: "https://api.reservoir.tools",
            id: 1,
            default: true
        }
    ]
};
const $b15843e937ac72b8$var$classNameObserverOptions = {
    attributeFilter: [
        "class"
    ]
};
const $b15843e937ac72b8$export$e400fd05a10fd94a = function({ children: children , options: options = $b15843e937ac72b8$var$defaultOptions , theme: theme , swrOptions: swrOptions = {}  }) {
    const [globalTheme, setGlobalTheme] = (0, $bNXjM$useState)();
    const [providerOptions, setProviderOptions] = (0, $bNXjM$useState)({});
    const currentTheme = (0, $bNXjM$useRef)(null);
    const classNameCallback = (0, $bNXjM$useCallback)((mutationList)=>{
        mutationList.forEach((mutation)=>{
            const body = mutation.target;
            if (mutation.attributeName === "class" && body && !body.className.includes(currentTheme.current)) document.body.classList.add(currentTheme.current);
        });
    }, [
        currentTheme
    ]);
    (0, $a541419cb138b974$export$2e2bcd8739ae039)(classNameCallback, typeof window !== "undefined" ? document.body : null, $b15843e937ac72b8$var$classNameObserverOptions);
    (0, $99462434649fe8bd$export$2e2bcd8739ae039)();
    (0, $bNXjM$useEffect)(()=>{
        let newTheme = (0, $fcefeedae0fec8b6$export$25d302a5b900a763)(theme ? theme : (0, $1b804d6c5a50513c$export$2e2bcd8739ae039)());
        let oldTheme = currentTheme.current;
        currentTheme.current = newTheme;
        document.body.classList.add(newTheme);
        if (oldTheme) document.body.classList.remove(oldTheme);
        setGlobalTheme(newTheme);
    }, [
        JSON.stringify(theme)
    ]);
    (0, $bNXjM$useEffect)(()=>{
        setProviderOptions(options);
    }, [
        options
    ]);
    return /*#__PURE__*/ (0, $bNXjM$jsx)($b15843e937ac72b8$export$2c657da244d00bd6.Provider, {
        value: globalTheme,
        children: /*#__PURE__*/ (0, $bNXjM$jsx)($b15843e937ac72b8$export$f66a1c3c9465af21.Provider, {
            value: providerOptions,
            children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c216485f70235e8a$export$bf730ab0ed25211d), {
                options: options,
                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$SWRConfig), {
                    value: {
                        ...(0, $0a64ae8247e4abb5$export$6f9d915eee0c027b),
                        ...swrOptions
                    },
                    children: children
                })
            })
        })
    });
};






function $c6195489119ab58a$export$2e2bcd8739ae039() {
    return (0, $bNXjM$useContext)((0, $c216485f70235e8a$export$c2432d5cebe1723e));
}


function $a77f332d243f1426$export$2e2bcd8739ae039(collection, chainId, swrOptions = {}) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chain = chainId !== undefined ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
    const pathname = `${chain?.baseApiUrl}/collections/${collection}/attributes/all/v2`;
    const path = collection ? new URL(pathname) : null;
    const { data: data , mutate: mutate , error: error , isValidating: isValidating  } = (0, $bNXjM$swr)(path ? [
        path.href,
        chain?.apiKey,
        client?.version
    ] : null, null, {
        revalidateOnMount: true,
        ...swrOptions
    });
    const collections = data && data.attributes ? data.attributes : null;
    return {
        response: data,
        data: collections,
        mutate: mutate,
        error: error,
        isValidating: isValidating
    };
}





function $3da80fe4336107c2$export$2e2bcd8739ae039(getKey, options, limit) {
    const { mutate: globalMutate  } = (0, $bNXjM$useSWRConfig)();
    const [keys, setKeys] = (0, $bNXjM$useState)([]);
    const response = (0, $bNXjM$swrinfinite)((pageIndex, previousPageData)=>{
        const params = getKey(pageIndex, previousPageData);
        const key = params && params[0] ? params[0] : null;
        if (key && !keys.includes(key)) setKeys([
            ...keys,
            key
        ]);
        return params;
    }, null, options);
    const { size: size , error: error , setSize: setSize , mutate: mutate  } = response;
    const data = response.data;
    let hasNextPage;
    if (limit !== undefined) hasNextPage = size === 0 || Boolean(data?.[size - 1]?.collections?.length === limit);
    else hasNextPage = size === 0 || Boolean(data?.[size - 1]?.continuation);
    const isFetchingInitialData = !data && !error && size > 0;
    const isFetchingPage = size > 0 && (isFetchingInitialData || data && typeof data[size - 1] === "undefined");
    const fetchNextPage = ()=>{
        if (!isFetchingPage && hasNextPage) setSize((size)=>size + 1);
    };
    const resetCache = ()=>{
        setSize(0);
        return mutate(undefined, {
            revalidate: false
        }).then(()=>{
            globalMutate((key)=>{
                const url = key && key[0] ? key[0] : null;
                if (url) return keys.includes(url);
                return false;
            }, undefined, false).then(()=>{
                setKeys([]);
            });
        });
    };
    return {
        ...response,
        hasNextPage: hasNextPage,
        isFetchingInitialData: isFetchingInitialData,
        isFetchingPage: isFetchingPage,
        resetCache: resetCache,
        fetchNextPage: fetchNextPage
    };
}


function $ed463f024c26b3ca$export$2e2bcd8739ae039(options, swrOptions = {}, enabled = true, chainId) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const response = (0, $3da80fe4336107c2$export$2e2bcd8739ae039)((pageIndex, previousPageData)=>{
        if (!enabled) return null;
        const chain = chainId !== undefined ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
        const url = new URL(`${chain?.baseApiUrl || ""}/orders/bids/v5`);
        let query = options || {};
        if (query.normalizeRoyalties === undefined && client?.normalizeRoyalties !== undefined) query.normalizeRoyalties = client?.normalizeRoyalties;
        if (previousPageData && !previousPageData.continuation) return null;
        else if (previousPageData && pageIndex > 0) query.continuation = previousPageData.continuation;
        (0, $bNXjM$setParams)(url, query);
        return [
            url.href,
            chain?.apiKey,
            client?.version
        ];
    }, {
        revalidateOnMount: true,
        revalidateFirstPage: false,
        ...swrOptions
    });
    const bids = response.data?.flatMap((page)=>page.orders) ?? [];
    return {
        ...response,
        data: bids
    };
}







function $16fcb794e07c5eb8$export$2e2bcd8739ae039(chainId) {
    const { chains: chains  } = (0, $bNXjM$useNetwork)();
    return $16fcb794e07c5eb8$export$de76f26780462518(chains, chainId);
}
const $16fcb794e07c5eb8$export$de76f26780462518 = (chains, chainId)=>{
    const client = (0, $bNXjM$getClient)();
    const reservoirChain = chainId ? client.chains.find((chain)=>chain.id === chainId) : client.currentChain();
    let chain = chains.find((chain)=>reservoirChain?.id === chain.id);
    if (!chain && chains.length > 0) chain = chains[0];
    const ETHChains = [
        (0, $bNXjM$mainnet).id,
        (0, $bNXjM$goerli).id
    ];
    if (!chain || !chain.nativeCurrency || ETHChains.includes(chain.id)) return {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
        address: (0, $bNXjM$constants).AddressZero,
        chainId: chain?.id || (0, $bNXjM$mainnet).id
    };
    else return {
        ...chain.nativeCurrency,
        address: (0, $bNXjM$constants).AddressZero,
        chainId: chain.id
    };
};







const $e70e85f6f4e64430$var$isSafariBrowser = ()=>typeof window !== "undefined" && navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") <= -1;
function $e70e85f6f4e64430$export$a81f732198733497(num, fixed) {
    const re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
    const fixedNum = num.toString().match(re);
    return fixedNum ? fixedNum[0] : num;
}
function $e70e85f6f4e64430$export$f5dd818bff069720(amount, maximumFractionDigits = 2) {
    const { format: format  } = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: maximumFractionDigits
    });
    if (!amount) return "-";
    return format(amount);
}
const $e70e85f6f4e64430$var$truncateFractionAndFormat = (parts, digits)=>{
    return parts.map(({ type: type , value: value  })=>{
        if (type !== "fraction" || !value || value.length < digits) return value;
        let formattedValue = "";
        for(let idx = 0; idx < value.length && idx < digits; idx++)formattedValue += value[idx];
        return formattedValue;
    }).reduce((string, part)=>string + part);
};
/**
 *  Convert ETH values to human readable formats
 * @param amount An ETH amount
 * @param maximumFractionDigits Number of decimal digits
 * @returns returns the ETH value as a `string` or `-` if the amount is `null` or `undefined`
 */ function $e70e85f6f4e64430$export$87710fd8420713d9(amount, maximumFractionDigits, decimals = 18) {
    if (typeof amount === "undefined" || amount === null) return "-";
    const amountToFormat = typeof amount === "number" ? amount : +(0, $bNXjM$utils).formatUnits(amount, decimals);
    const amountFraction = `${amount}`.split(".")[1];
    const isSafari = $e70e85f6f4e64430$var$isSafariBrowser();
    const formatOptions = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 20,
        useGrouping: true,
        notation: "compact",
        compactDisplay: "short"
    };
    // New issue introduced in Safari v16 causes a regression and now need lessPrecision flagged in format options
    if (isSafari) //@ts-ignore
    formatOptions.roundingPriority = "lessPrecision";
    const parts = new Intl.NumberFormat("en-US", formatOptions).formatToParts(amountToFormat);
    // Safari has a few bugs with the fraction part of formatToParts, sometimes rounding when unnecessary and
    // when amount is in the thousands not properly representing the value in compact display. Until the bug is fixed
    // this workaround should help. bugzilla bug report: https://bugs.webkit.org/show_bug.cgi?id=249231
    // Update: this has been fixed, but still applied for >v15.3 and <v16
    if (isSafari) {
        const partTypes = parts.map((part)=>part.type);
        const partsIncludesFraction = partTypes.includes("fraction");
        const partsIncludeCompactIdentifier = partTypes.includes("compact");
        if (amountFraction) {
            if (!partsIncludesFraction && !partsIncludeCompactIdentifier) {
                const integerIndex = parts.findIndex((part)=>part.type === "integer");
                parts.splice(integerIndex + 1, 0, {
                    type: "decimal",
                    value: "."
                }, {
                    type: "fraction",
                    value: amountFraction
                });
            }
        } else if (!partsIncludesFraction && partsIncludeCompactIdentifier) {
            const compactIdentifier = parts.find((part)=>part.type === "compact");
            const integerIndex = parts.findIndex((part)=>part.type === "integer");
            const integer = parts[integerIndex];
            if (compactIdentifier?.value === "K" && integer) {
                const fraction = `${amount}`.replace(integer.value, "")[0];
                if (fraction && Number(fraction) > 0) parts.splice(integerIndex + 1, 0, {
                    type: "decimal",
                    value: "."
                }, {
                    type: "fraction",
                    value: fraction
                });
            }
        }
    }
    if (parts && parts.length > 0) {
        const lowestValue = Number(`0.${new Array(maximumFractionDigits).join("0")}1`);
        if (amountToFormat > 1000) return $e70e85f6f4e64430$var$truncateFractionAndFormat(parts, 1);
        else if (amountToFormat < 1 && amountToFormat < lowestValue) return `< ${lowestValue}`;
        else return $e70e85f6f4e64430$var$truncateFractionAndFormat(parts, maximumFractionDigits);
    } else return typeof amount === "string" || typeof amount === "number" ? `${amount}` : "";
}





let $588062ced050a0db$export$de7bcda3c490bf18;
(function(CheckoutStatus) {
    CheckoutStatus[CheckoutStatus["Idle"] = 0] = "Idle";
    CheckoutStatus[CheckoutStatus["Approving"] = 1] = "Approving";
    CheckoutStatus[CheckoutStatus["Finalizing"] = 2] = "Finalizing";
    CheckoutStatus[CheckoutStatus["Complete"] = 3] = "Complete";
})($588062ced050a0db$export$de7bcda3c490bf18 || ($588062ced050a0db$export$de7bcda3c490bf18 = {}));
let $588062ced050a0db$export$6adf53dcf2d42374;
(function(CheckoutTransactionError) {
    CheckoutTransactionError[CheckoutTransactionError["Unknown"] = 0] = "Unknown";
    CheckoutTransactionError[CheckoutTransactionError["PiceMismatch"] = 1] = "PiceMismatch";
    CheckoutTransactionError[CheckoutTransactionError["InsufficientBalance"] = 2] = "InsufficientBalance";
    CheckoutTransactionError[CheckoutTransactionError["UserDenied"] = 3] = "UserDenied";
})($588062ced050a0db$export$6adf53dcf2d42374 || ($588062ced050a0db$export$6adf53dcf2d42374 = {}));
const $588062ced050a0db$var$CartStorageKey = `reservoirkit.cart.${(0, $70ec4a103fdcb416$exports.version)}`;
function $588062ced050a0db$var$cartStore({ referrer: referrer , referrerFeeBps: referrerFeeBps , persist: persist = true  }) {
    const { chains: chains  } = (0, $bNXjM$useNetwork)();
    const { switchNetworkAsync: switchNetworkAsync  } = (0, $bNXjM$useSwitchNetwork)();
    const cartData = (0, $bNXjM$useRef)({
        totalPrice: 0,
        referrerFee: 0,
        items: [],
        pools: {},
        isValidating: false,
        transaction: null
    });
    const subscribers = (0, $bNXjM$useRef)(new Set());
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    (0, $bNXjM$useEffect)(()=>{
        if (persist && typeof window !== "undefined" && window.localStorage) {
            const storedCart = window.localStorage.getItem($588062ced050a0db$var$CartStorageKey);
            if (storedCart) {
                const rehydratedCart = JSON.parse(storedCart);
                const currency = getCartCurrency(rehydratedCart.items, rehydratedCart.chain?.id || 1);
                const pools = calculatePools(rehydratedCart.items);
                const { totalPrice: totalPrice , referrerFee: referrerFee  } = calculatePricing(rehydratedCart.items, currency, cartData.current.referrerFeeBps);
                cartData.current = {
                    ...cartData.current,
                    chain: rehydratedCart.items.length > 0 ? rehydratedCart.chain : undefined,
                    items: rehydratedCart.items,
                    pools: pools,
                    totalPrice: totalPrice,
                    referrerFee: referrerFee,
                    currency: currency
                };
                subscribers.current.forEach((callback)=>callback());
                validate();
            }
        }
    }, []);
    (0, $bNXjM$useEffect)(()=>{
        const feeBps = referrer !== undefined && referrerFeeBps !== undefined ? referrerFeeBps : undefined;
        const referrerAddress = referrer !== undefined && referrerFeeBps !== undefined ? referrer : undefined;
        const currency = getCartCurrency(cartData.current.items, cartData.current.chain?.id || 1);
        const pools = calculatePools(cartData.current.items);
        const { totalPrice: totalPrice , referrerFee: referrerFee  } = calculatePricing(cartData.current.items, currency, feeBps);
        cartData.current = {
            ...cartData.current,
            pools: pools,
            totalPrice: totalPrice,
            referrerFee: referrerFee,
            currency: currency,
            referrer: referrerAddress,
            referrerFeeBps: feeBps
        };
        commit();
    }, [
        referrer,
        referrerFeeBps
    ]);
    const get = (0, $bNXjM$useCallback)(()=>cartData.current, []);
    const set = (0, $bNXjM$useCallback)((value)=>{
        cartData.current = {
            ...cartData.current,
            ...value
        };
        commit();
    }, []);
    const subscribe = (0, $bNXjM$useCallback)((callback)=>{
        subscribers.current.add(callback);
        return ()=>subscribers.current.delete(callback);
    }, []);
    const commit = (0, $bNXjM$useCallback)(()=>{
        subscribers.current.forEach((callback)=>callback());
        if (persist && typeof window !== "undefined" && window.localStorage) window.localStorage.setItem($588062ced050a0db$var$CartStorageKey, JSON.stringify(cartData.current));
    }, [
        persist
    ]);
    const calculatePools = (0, $bNXjM$useCallback)((items)=>{
        const pools = {};
        items.forEach((item)=>{
            if (item.poolId) {
                if (!pools[item.poolId] && item.poolPrices) {
                    pools[item.poolId] = {
                        prices: item.poolPrices,
                        itemCount: 1
                    };
                    item.price = item.poolPrices[0];
                } else if (item.poolPrices) {
                    item.price = item.poolPrices[pools[item.poolId].itemCount];
                    pools[item.poolId].itemCount += 1;
                }
            }
        });
        return pools;
    }, []);
    const calculatePricing = (0, $bNXjM$useCallback)((items, currency, referrerFeeBps)=>{
        let referrerFee = 0;
        let subtotal = items.reduce((total, { price: price  })=>{
            let amount = price?.amount?.decimal;
            if (price?.currency?.contract !== currency?.contract) amount = price?.amount?.native;
            return total += amount || 0;
        }, 0);
        if (referrerFeeBps) {
            referrerFee = referrerFeeBps / 10000 * subtotal;
            subtotal = subtotal + referrerFee;
        }
        return {
            totalPrice: subtotal,
            referrerFee: referrerFee
        };
    }, []);
    const getCartCurrency = (0, $bNXjM$useCallback)((items, chainId)=>{
        let currencies = new Set();
        let currenciesData = {};
        for(let i = 0; i < items.length; i++){
            const currency = items[i].price?.currency;
            if (currency?.contract) {
                currencies.add(currency.contract);
                currenciesData[currency.contract] = currency;
            }
            if (currencies.size > 1) break;
        }
        if (currencies.size > 1) return (0, $16fcb794e07c5eb8$export$de76f26780462518)(chains, chainId);
        else if (currencies.size > 0) return Object.values(currenciesData)[0];
    }, [
        chains
    ]);
    const fetchTokens = (0, $bNXjM$useCallback)(async (tokenIds)=>{
        if (!tokenIds || tokenIds.length === 0) return {
            tokens: [],
            flaggedStatuses: {}
        };
        const reservoirChain = client?.chains.find((chain)=>chain.id === cartData.current.chain?.id);
        const url = new URL(`${reservoirChain?.baseApiUrl}/tokens/v5`);
        const query = {
            tokens: tokenIds,
            limit: 100,
            includeDynamicPricing: true
        };
        if (client?.normalizeRoyalties !== undefined) query.normalizeRoyalties = client?.normalizeRoyalties;
        (0, $bNXjM$setParams)(url, query);
        const params = [
            url.href
        ];
        if (reservoirChain?.apiKey) params.push(reservoirChain.apiKey);
        if (client?.version) params.push(client.version);
        const promises = await Promise.allSettled([
            (0, $0a64ae8247e4abb5$export$77754e0ac9f8aba3)(params),
            (0, $bNXjM$isOpenSeaBanned)(tokenIds)
        ]);
        const response = promises[0].status === "fulfilled" ? promises[0].value : {};
        const flaggedStatuses = promises[1].status === "fulfilled" ? promises[1].value : {};
        return {
            tokens: response.tokens,
            flaggedStatuses: flaggedStatuses
        };
    }, [
        client
    ]);
    const convertTokenToItem = (0, $bNXjM$useCallback)((tokenData)=>{
        const token = tokenData.token;
        const market = tokenData.market;
        if (!token?.tokenId || !token.collection?.id) return;
        const dynamicPricing = market?.floorAsk?.dynamicPricing;
        return {
            token: {
                id: token.tokenId,
                name: token.name || ""
            },
            collection: {
                id: token.collection.id,
                name: token.collection.name || ""
            },
            price: dynamicPricing?.kind === "pool" ? undefined : market?.floorAsk?.price,
            poolId: dynamicPricing?.kind === "pool" ? dynamicPricing.data?.pool : undefined,
            poolPrices: dynamicPricing?.kind === "pool" ? dynamicPricing.data?.prices : undefined,
            isBannedOnOpensea: token.isFlagged
        };
    }, []);
    const clear = (0, $bNXjM$useCallback)(()=>{
        cartData.current = {
            ...cartData.current,
            items: [],
            pools: {},
            totalPrice: 0,
            referrerFee: 0,
            chain: undefined
        };
        commit();
    }, [
        commit
    ]);
    const clearTransaction = (0, $bNXjM$useCallback)(()=>{
        cartData.current = {
            ...cartData.current,
            transaction: null,
            pendingTransactionId: undefined
        };
        commit();
    }, [
        commit
    ]);
    const add = (0, $bNXjM$useCallback)(async (items, chainId)=>{
        try {
            if (cartData.current.chain && chainId != cartData.current.chain?.id) throw `ChainId: ${chainId}, is different than the cart chainId (${cartData.current.chain?.id})`;
            if (cartData.current.isValidating) throw "Currently validating, adding items temporarily disabled";
            const updatedItems = [
                ...cartData.current.items
            ];
            const currentIds = cartData.current.items.map((item)=>`${item.collection.id}:${item.token.id}`);
            const tokensToFetch = [];
            const tokens = [];
            items.forEach((item)=>{
                const token = item;
                const asyncToken = item;
                if (token.token) {
                    if (!currentIds.includes(`${token.token?.collection?.id}:${token.token?.tokenId}`)) tokens.push(token);
                } else if (asyncToken && asyncToken.id && !currentIds.includes(asyncToken.id)) tokensToFetch.push(asyncToken.id);
            });
            if (tokensToFetch.length > 0) {
                cartData.current.isValidating = true;
                subscribers.current.forEach((callback)=>callback());
                const { tokens: fetchedTokens , flaggedStatuses: flaggedStatuses  } = await fetchTokens(tokensToFetch);
                fetchedTokens?.forEach((tokenData)=>{
                    const item = convertTokenToItem(tokenData);
                    if (item) {
                        const id = `${item.collection.id}:${item.token.id}`;
                        item.isBannedOnOpensea = flaggedStatuses[id] ? flaggedStatuses[id] : item.isBannedOnOpensea;
                        updatedItems.push(item);
                    }
                });
            }
            if (tokens.length > 0) tokens.forEach((token)=>{
                const item = convertTokenToItem(token);
                if (item) updatedItems.push(item);
            });
            const pools = calculatePools(updatedItems);
            const currency = getCartCurrency(updatedItems, chainId);
            const { totalPrice: totalPrice , referrerFee: referrerFee  } = calculatePricing(updatedItems, currency, cartData.current.referrerFeeBps);
            cartData.current = {
                ...cartData.current,
                isValidating: false,
                items: updatedItems,
                totalPrice: totalPrice,
                referrerFee: referrerFee,
                currency: currency,
                pools: pools
            };
            if (!cartData.current.chain) cartData.current.chain = client?.chains.find((chain)=>chain.id === chainId) || client?.currentChain() || undefined;
            commit();
        } catch (e) {
            if (cartData.current.isValidating) {
                cartData.current.isValidating = false;
                commit();
            }
            throw e;
        }
    }, [
        fetchTokens,
        commit
    ]);
    const remove = (0, $bNXjM$useCallback)((ids)=>{
        if (cartData.current.isValidating) {
            console.warn("Currently validating, removing items temporarily disabled");
            return;
        }
        const updatedItems = cartData.current.items.filter(({ token: token , collection: collection  })=>{
            const key = `${collection.id}:${token.id}`;
            return !ids.includes(key);
        });
        const pools = calculatePools(updatedItems);
        const currency = getCartCurrency(updatedItems, cartData.current.chain?.id || 1);
        const { totalPrice: totalPrice , referrerFee: referrerFee  } = calculatePricing(updatedItems, currency, cartData.current.referrerFeeBps);
        cartData.current = {
            ...cartData.current,
            items: updatedItems,
            pools: pools,
            totalPrice: totalPrice,
            referrerFee: referrerFee,
            currency: currency
        };
        if (updatedItems.length === 0) cartData.current.chain = undefined;
        commit();
    }, []);
    const validate = (0, $bNXjM$useCallback)(async ()=>{
        try {
            if (cartData.current.items.length === 0) return false;
            cartData.current = {
                ...cartData.current,
                isValidating: true
            };
            commit();
            const tokenIds = cartData.current.items.reduce((tokens, item)=>{
                const contract = item.collection.id.split(":")[0];
                tokens.push(`${contract}:${item.token.id}`);
                return tokens;
            }, []);
            const { tokens: tokens , flaggedStatuses: flaggedStatuses  } = await fetchTokens(tokenIds);
            const tokenMap = tokens?.reduce((tokens, token)=>{
                if (token.token?.tokenId && token.token.collection?.id) tokens[`${token.token.collection.id}:${token.token.tokenId}`] = token;
                return tokens;
            }, {}) || {};
            const items = cartData.current.items.map((item)=>{
                const token = tokenMap[`${item.collection.id}:${item.token.id}`];
                const flaggedStatus = flaggedStatuses ? flaggedStatuses[`${item.collection.id}:${item.token.id}`] : undefined;
                if (token) {
                    const dynamicPricing = token.market?.floorAsk?.dynamicPricing;
                    const updatedItem = {
                        ...item,
                        previousPrice: item.price,
                        price: token.market?.floorAsk?.price,
                        poolId: dynamicPricing?.kind === "pool" ? dynamicPricing.data?.pool : undefined,
                        poolPrices: dynamicPricing?.kind === "pool" ? dynamicPricing.data?.prices : undefined
                    };
                    if (token.token?.name) updatedItem.token.name = token.token.name;
                    if (token.token?.collection?.name) updatedItem.collection.name = token.token.collection.name;
                    if (flaggedStatus !== undefined) updatedItem.isBannedOnOpensea = flaggedStatus;
                    return updatedItem;
                }
                return item;
            });
            const pools = calculatePools(items);
            const currency = getCartCurrency(items, cartData.current.chain?.id || 1);
            const { totalPrice: totalPrice , referrerFee: referrerFee  } = calculatePricing(items, currency, cartData.current.referrerFeeBps);
            cartData.current = {
                ...cartData.current,
                items: items,
                pools: pools,
                isValidating: false,
                totalPrice: totalPrice,
                referrerFee: referrerFee,
                currency: currency
            };
            commit();
            return true;
        } catch (e) {
            if (cartData.current.isValidating) {
                cartData.current.isValidating = false;
                commit();
            }
            throw e;
        }
    }, [
        fetchTokens
    ]);
    const checkout = (0, $bNXjM$useCallback)(async (options = {})=>{
        if (!client) throw "Zoo SDK not initialized";
        const { chain: activeChain  } = await (0, $bNXjM$getNetwork)();
        if (cartData.current.chain && cartData.current.chain?.id !== activeChain?.id) {
            const chain = await switchNetworkAsync?.(cartData.current.chain.id);
            if (chain?.id !== cartData.current.chain.id) throw "Active chain does not match cart chain";
        }
        const signer = await (0, $bNXjM$fetchSigner)({
            chainId: cartData.current.chain?.id
        });
        if (!signer) throw "Signer not available";
        let isMixedCurrency = false;
        const tokens = cartData.current.items.reduce((items, { token: token , collection: collection , price: price  })=>{
            if (price) {
                const contract = collection.id.split(":")[0];
                items?.push({
                    tokenId: token.id,
                    contract: contract
                });
                if (price.currency?.contract != cartData.current.currency?.contract) isMixedCurrency = true;
            }
            return items;
        }, []);
        if (!tokens || tokens.length === 0) throw "Cart is empty";
        const chainCurrency = (0, $16fcb794e07c5eb8$export$de76f26780462518)(chains, cartData.current.chain?.id || 1);
        const currencyChain = client.chains.find((chain)=>chainCurrency.chainId = chain.id);
        const expectedPrice = cartData.current.totalPrice;
        if (isMixedCurrency) options.currency = (0, $bNXjM$constants).AddressZero;
        if (cartData.current.referrer && cartData.current.referrerFeeBps) {
            const price = (0, $e70e85f6f4e64430$export$a81f732198733497)(expectedPrice, cartData.current.currency?.decimals || 18);
            const fee = (0, $bNXjM$utils).parseUnits(`${price}`, cartData.current.currency?.decimals).mul(cartData.current.referrerFeeBps).div(10000);
            const atomicUnitsFee = (0, $bNXjM$formatUnits)(fee, 0);
            options.feesOnTop = [
                `${cartData.current.referrer}:${atomicUnitsFee}`
            ];
        }
        if (options.partial === undefined) options.partial = true;
        const transactionId = `${new Date().getTime()}`;
        cartData.current = {
            ...cartData.current,
            pendingTransactionId: transactionId,
            transaction: {
                id: transactionId,
                chain: cartData.current.chain || currencyChain || client.chains[0],
                items: cartData.current.items,
                status: $588062ced050a0db$export$de7bcda3c490bf18.Approving
            }
        };
        commit();
        client.actions.buyToken({
            expectedPrice: expectedPrice,
            signer: signer,
            tokens: tokens,
            options: options,
            onProgress: (steps)=>{
                if (!steps) return;
                if (transactionId != cartData.current.pendingTransactionId) return;
                let status = cartData.current.transaction?.status || $588062ced050a0db$export$de7bcda3c490bf18.Approving;
                const executableSteps = steps.filter((step)=>step.items && step.items.length > 0);
                let currentStepItem;
                executableSteps.findIndex((step)=>{
                    currentStepItem = step.items?.find((item)=>item.status === "incomplete");
                    return currentStepItem;
                });
                if (currentStepItem) {
                    if (currentStepItem.txHash) {
                        status = $588062ced050a0db$export$de7bcda3c490bf18.Finalizing;
                        if (cartData.current.items.length > 0) {
                            cartData.current.items = [];
                            cartData.current.pools = {};
                            cartData.current.totalPrice = 0;
                            cartData.current.currency = undefined;
                            cartData.current.chain = undefined;
                        }
                    }
                } else if (steps.every((step)=>!step.items || step.items.length == 0 || step.items?.every((item)=>item.status === "complete"))) status = $588062ced050a0db$export$de7bcda3c490bf18.Complete;
                if (cartData.current.transaction?.status != status && (status === $588062ced050a0db$export$de7bcda3c490bf18.Finalizing || status === $588062ced050a0db$export$de7bcda3c490bf18.Complete)) {
                    cartData.current.items = [];
                    cartData.current.pools = {};
                    cartData.current.totalPrice = 0;
                    cartData.current.currency = undefined;
                    cartData.current.chain = undefined;
                }
                if (cartData.current.transaction) {
                    cartData.current.transaction.status = status;
                    if (currentStepItem) {
                        cartData.current.transaction.txHash = currentStepItem?.txHash;
                        cartData.current.transaction.steps = steps;
                    }
                }
                commit();
            }
        }).catch((e)=>{
            if (transactionId != cartData.current.pendingTransactionId) return;
            let error = e;
            let errorType = $588062ced050a0db$export$6adf53dcf2d42374.Unknown;
            if (error?.message && error?.message.includes("ETH balance")) errorType = $588062ced050a0db$export$6adf53dcf2d42374.InsufficientBalance;
            else if (error?.code && error?.code == 4001) errorType = $588062ced050a0db$export$6adf53dcf2d42374.UserDenied;
            else {
                let message = "Oops, something went wrong. Please try again.";
                if (error?.type && error?.type === "price mismatch") {
                    errorType = $588062ced050a0db$export$6adf53dcf2d42374.PiceMismatch;
                    message = error.message;
                }
                //@ts-ignore: Should be fixed in an update to typescript
                error = new Error(message, {
                    cause: error
                });
            }
            if (cartData.current.transaction) {
                cartData.current.transaction.status = $588062ced050a0db$export$de7bcda3c490bf18.Idle;
                cartData.current.transaction.error = error;
                cartData.current.transaction.errorType = errorType;
                if (cartData.current.chain?.id == cartData.current.transaction.chain.id) {
                    const items = [
                        ...cartData.current.transaction.items
                    ];
                    const pools = calculatePools(items);
                    const currency = getCartCurrency(items, cartData.current.transaction.chain.id);
                    const { totalPrice: totalPrice , referrerFee: referrerFee  } = calculatePricing(items, currency, cartData.current.referrerFeeBps);
                    cartData.current.items = items;
                    cartData.current.pools = pools;
                    cartData.current.currency = currency;
                    cartData.current.totalPrice = totalPrice;
                    cartData.current.referrerFee = referrerFee;
                    cartData.current.chain = cartData.current.transaction.chain;
                }
                commit();
                validate();
            }
        });
    }, [
        client,
        switchNetworkAsync
    ]);
    return {
        get: get,
        set: set,
        subscribe: subscribe,
        add: add,
        remove: remove,
        clear: clear,
        clearTransaction: clearTransaction,
        validate: validate,
        checkout: checkout
    };
}
const $588062ced050a0db$export$5558332cef65f159 = /*#__PURE__*/ (0, $bNXjM$createContext)(null);
const $588062ced050a0db$export$9081b9c87ee4e12e = function({ children: children , referrer: referrer , referrerFeeBps: referrerFeeBps , persist: persist  }) {
    return /*#__PURE__*/ (0, $bNXjM$jsx)($588062ced050a0db$export$5558332cef65f159.Provider, {
        value: $588062ced050a0db$var$cartStore({
            referrer: referrer,
            referrerFeeBps: referrerFeeBps,
            persist: persist
        }),
        children: children
    });
};



function $50bacb8bed3891ec$export$2e2bcd8739ae039(selector) {
    const cart = (0, $bNXjM$useContext)((0, $588062ced050a0db$export$5558332cef65f159));
    if (!cart) throw new Error("Cart not found");
    const data = (0, $bNXjM$useSyncExternalStore)(cart.subscribe, ()=>selector(cart.get()), ()=>selector(cart.get()));
    const { clear: clear , remove: remove , add: add , validate: validate , checkout: checkout , clearTransaction: clearTransaction  } = cart;
    return {
        data: data,
        clear: clear,
        clearTransaction: clearTransaction,
        remove: remove,
        add: add,
        validate: validate,
        checkout: checkout,
        set: cart.set
    };
}



function $6006670c0a098975$export$2e2bcd8739ae039(options, swrOptions = {}, chainId) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chain = chainId !== undefined ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
    const response = (0, $3da80fe4336107c2$export$2e2bcd8739ae039)((pageIndex, previousPageData)=>{
        if (!options || !options.collection && !options.collectionsSetId && !options.community) return null;
        const url = new URL(`${chain?.baseApiUrl}/collections/activity/v5`);
        let query = {
            ...options
        };
        if (previousPageData && !previousPageData.continuation) return null;
        else if (previousPageData && pageIndex > 0) query.continuation = previousPageData.continuation;
        (0, $bNXjM$setParams)(url, query);
        return [
            url.href,
            chain?.apiKey,
            client?.version
        ];
    }, {
        revalidateOnMount: true,
        revalidateFirstPage: false,
        ...swrOptions
    });
    const activities = response.data?.flatMap((page)=>page.activities) ?? [];
    return {
        ...response,
        data: activities
    };
}



function $38f38860f7db3263$export$2e2bcd8739ae039(options, swrOptions = {}, chainId) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chain = chainId !== undefined ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
    const response = (0, $3da80fe4336107c2$export$2e2bcd8739ae039)((pageIndex, previousPageData)=>{
        if (!options) return null;
        const url = new URL(`${chain?.baseApiUrl}/collections/v5`);
        let query = {
            ...options
        };
        if (previousPageData && !previousPageData.continuation) return null;
        else if (previousPageData && pageIndex > 0) query.continuation = previousPageData.continuation;
        if (query.normalizeRoyalties === undefined && client?.normalizeRoyalties !== undefined) query.normalizeRoyalties = client.normalizeRoyalties;
        (0, $bNXjM$setParams)(url, query);
        return [
            url.href,
            chain?.apiKey,
            client?.version
        ];
    }, {
        revalidateOnMount: true,
        revalidateFirstPage: false,
        ...swrOptions
    });
    const collections = response.data?.flatMap((page)=>page?.collections || []) ?? [];
    return {
        ...response,
        data: collections
    };
}




function $54bf018b076821f1$export$2e2bcd8739ae039(options, swrOptions = {}, chainId) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chain = chainId !== undefined ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
    const response = (0, $3da80fe4336107c2$export$2e2bcd8739ae039)((pageIndex, previousPageData)=>{
        if (!options) return null;
        const url = new URL(`${chain?.baseApiUrl}/tokens/v5`);
        let query = {
            ...options
        };
        if (previousPageData && !previousPageData.continuation) return null;
        else if (previousPageData && pageIndex > 0) query.continuation = previousPageData.continuation;
        if (query.normalizeRoyalties === undefined && client?.normalizeRoyalties !== undefined) query.normalizeRoyalties = client.normalizeRoyalties;
        (0, $bNXjM$setParams)(url, query);
        return [
            url.href,
            chain?.apiKey,
            client?.version
        ];
    }, {
        revalidateOnMount: true,
        revalidateFirstPage: false,
        ...swrOptions
    });
    const tokens = response.data?.flatMap((page)=>page.tokens) ?? [];
    return {
        ...response,
        data: tokens
    };
}


function $75e58b92a1baee06$export$2e2bcd8739ae039(options = {}, swrOptions = {}, chainId) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const tokensResponse = (0, $54bf018b076821f1$export$2e2bcd8739ae039)({
        includeDynamicPricing: true,
        ...options
    }, swrOptions, chainId);
    const { data: cartItems , ...cartActions } = (0, $50bacb8bed3891ec$export$2e2bcd8739ae039)((cart)=>cart.items);
    const { data: cartPools  } = (0, $50bacb8bed3891ec$export$2e2bcd8739ae039)((cart)=>cart.pools);
    const { data: cartChain  } = (0, $50bacb8bed3891ec$export$2e2bcd8739ae039)((cart)=>cart.chain);
    const cartRequiresReordering = (0, $bNXjM$useMemo)(()=>Object.values(cartPools).some((pool)=>pool.itemCount > 1), [
        cartPools
    ]);
    const itemsMap = (0, $bNXjM$useMemo)(()=>{
        return cartItems.reduce((itemMap, item)=>{
            itemMap[`${item.collection.id}:${item.token.id}`] = item;
            return itemMap;
        }, {});
    }, [
        cartItems
    ]);
    let dynamicTokens;
    if (cartChain && (chainId === cartChain?.id || chainId === undefined && client?.currentChain()?.id === cartChain?.id)) {
        dynamicTokens = tokensResponse.data.map((tokenData)=>{
            const id = `${tokenData?.token?.collection?.id}:${tokenData?.token?.tokenId}`;
            const cartItem = itemsMap[id];
            const dynamicTokenData = {
                ...tokenData,
                isInCart: cartItem !== undefined
            };
            const floorAsk = tokenData?.market?.floorAsk;
            const isInPool = floorAsk?.dynamicPricing?.kind === "pool";
            const poolId = isInPool ? floorAsk?.dynamicPricing?.data?.pool : undefined;
            const poolPrices = isInPool ? floorAsk?.dynamicPricing?.data?.prices : undefined;
            if (cartItem) {
                if (dynamicTokenData.market?.floorAsk && cartItem.poolId && cartItem.price && cartItem.price.amount?.decimal != dynamicTokenData.market?.floorAsk?.price) dynamicTokenData.market.floorAsk.price = cartItem.price;
            } else if (isInPool && poolId && poolPrices && floorAsk && dynamicTokenData.market?.floorAsk) {
                const nextPoolCartIndex = cartPools[poolId] ? cartPools[poolId].itemCount : 0;
                if (poolPrices && poolPrices[nextPoolCartIndex]) dynamicTokenData.market.floorAsk.price = poolPrices[nextPoolCartIndex];
            }
            return dynamicTokenData;
        });
        if (cartRequiresReordering && (!options || !options.sortBy || options.sortBy === "floorAskPrice")) dynamicTokens.sort((a, b)=>{
            const aPrice = a.market?.floorAsk?.price?.amount?.decimal || 0;
            const bPrice = b.market?.floorAsk?.price?.amount?.decimal || 0;
            if (!options || !options.sortDirection || options.sortDirection === "asc") return aPrice - bPrice;
            else return aPrice + bPrice;
        });
    } else dynamicTokens = tokensResponse.data;
    return {
        ...tokensResponse,
        data: dynamicTokens,
        ...cartActions
    };
}




function $40f16bae928ea461$export$2e2bcd8739ae039(options, swrOptions = {}, enabled = true, chainId) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chain = chainId !== undefined ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
    const response = (0, $3da80fe4336107c2$export$2e2bcd8739ae039)((pageIndex, previousPageData)=>{
        if (!enabled) return null;
        const url = new URL(`${chain?.baseApiUrl || ""}/orders/asks/v4`);
        let query = options || {};
        if (query.normalizeRoyalties === undefined && client?.normalizeRoyalties !== undefined) query.normalizeRoyalties = client.normalizeRoyalties;
        if (previousPageData && !previousPageData.continuation) return null;
        else if (previousPageData && pageIndex > 0) query.continuation = previousPageData.continuation;
        (0, $bNXjM$setParams)(url, query);
        return [
            url.href,
            chain?.apiKey,
            client?.version
        ];
    }, {
        revalidateOnMount: true,
        revalidateFirstPage: false,
        ...swrOptions
    });
    const listings = response.data?.flatMap((page)=>page.orders) ?? [];
    return {
        ...response,
        data: listings
    };
}



function $2503c60624d9b72b$export$2e2bcd8739ae039(query, swrOptions, chainId) {
    const { address: address  } = (0, $bNXjM$useAccount)();
    let queryOptions = {
        maker: address
    };
    if (query) queryOptions = {
        ...queryOptions,
        ...query
    };
    return (0, $40f16bae928ea461$export$2e2bcd8739ae039)(queryOptions, swrOptions, address !== undefined, chainId);
}



function $9898620691963117$export$2e2bcd8739ae039(contract, tokenId) {
    const [isBanned, setIsBanned] = (0, $bNXjM$useState)(false);
    (0, $bNXjM$useEffect)(()=>{
        if (contract && tokenId) {
            const token = `${contract}:${tokenId}`;
            (0, $bNXjM$isOpenSeaBanned)([
                token
            ]).then((statuses)=>{
                setIsBanned(statuses[token]);
            }).catch((e)=>{
                console.error(e);
                setIsBanned(false);
            });
        } else setIsBanned(false);
    }, [
        contract,
        tokenId
    ]);
    return isBanned;
}



function $fdff2793179dd2d0$export$2e2bcd8739ae039(user, options, swrOptions = {}, chainId) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chain = chainId !== undefined ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
    let defaultLimit = 20;
    const response = (0, $3da80fe4336107c2$export$2e2bcd8739ae039)((pageIndex, previousPageData)=>{
        if (!user) return null;
        const url = new URL(`${chain?.baseApiUrl || ""}/users/${user}/collections/v2`);
        let query = {
            offset: pageIndex * (options?.limit || defaultLimit),
            limit: options?.limit || defaultLimit,
            ...options
        };
        if (previousPageData?.collections && previousPageData?.collections?.length === 0) return null;
        (0, $bNXjM$setParams)(url, query);
        return [
            url.href,
            chain?.apiKey,
            client?.version
        ];
    }, {
        revalidateOnMount: true,
        revalidateFirstPage: false,
        ...swrOptions
    }, options?.limit || defaultLimit);
    const collections = response.data?.flatMap((page)=>page.collections) ?? [];
    return {
        ...response,
        data: collections
    };
}



function $a977118e24599639$export$2e2bcd8739ae039(users, options, swrOptions = {}, chainId) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chain = chainId !== undefined ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
    const response = (0, $3da80fe4336107c2$export$2e2bcd8739ae039)((pageIndex, previousPageData)=>{
        if (!users) return null;
        const url = new URL(`${chain?.baseApiUrl}/users/activity/v5`);
        let query = {
            ...options,
            users: users
        };
        if (previousPageData && !previousPageData.continuation) return null;
        else if (previousPageData && pageIndex > 0) query.continuation = previousPageData.continuation;
        (0, $bNXjM$setParams)(url, query);
        return [
            url.href,
            chain?.apiKey,
            client?.version
        ];
    }, {
        revalidateOnMount: true,
        revalidateFirstPage: false,
        ...swrOptions
    });
    const activities = response.data?.flatMap((page)=>page.activities) ?? [];
    return {
        ...response,
        data: activities
    };
}



function $7ef173c8b4177008$export$2e2bcd8739ae039(user, options, swrOptions = {}, chainId) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chain = chainId !== undefined ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
    const response = (0, $3da80fe4336107c2$export$2e2bcd8739ae039)((pageIndex, previousPageData)=>{
        if (!user) return null;
        const url = new URL(`${chain?.baseApiUrl}/users/${user}/tokens/v6`);
        let query = {
            ...options
        };
        if (previousPageData && !previousPageData.continuation) return null;
        else if (previousPageData && pageIndex > 0) query.continuation = previousPageData.continuation;
        if (query.normalizeRoyalties === undefined && client?.normalizeRoyalties !== undefined) query.normalizeRoyalties = client.normalizeRoyalties;
        (0, $bNXjM$setParams)(url, query);
        return [
            url.href,
            chain?.apiKey,
            client?.version
        ];
    }, {
        revalidateOnMount: true,
        revalidateFirstPage: false,
        ...swrOptions
    });
    const tokens = response.data?.flatMap((page)=>page.tokens) ?? [];
    return {
        ...response,
        data: tokens
    };
}



function $b3db166a82febb11$export$2e2bcd8739ae039(user, options, swrOptions = {}, chainId) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chain = chainId !== undefined ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
    const response = (0, $3da80fe4336107c2$export$2e2bcd8739ae039)((pageIndex, previousPageData)=>{
        if (!user) return null;
        const url = new URL(`${chain?.baseApiUrl || ""}/orders/users/${user}/top-bids/v2`);
        let query = options || {};
        if (previousPageData && !previousPageData.continuation) return null;
        else if (previousPageData && pageIndex > 0) query.continuation = previousPageData.continuation;
        if (query.normalizeRoyalties === undefined && client?.normalizeRoyalties !== undefined) query.normalizeRoyalties = client.normalizeRoyalties;
        (0, $bNXjM$setParams)(url, query);
        return [
            url.href,
            chain?.apiKey,
            client?.version
        ];
    }, {
        revalidateOnMount: true,
        revalidateFirstPage: false,
        ...swrOptions
    });
    const bids = response.data?.flatMap((page)=>page.topBids) ?? [];
    return {
        ...response,
        data: bids
    };
}




function $5ca18e7553dfd06e$export$2e2bcd8739ae039(overrides) {
    let sharedTheme = (0, $35e7883cc4a3f817$export$8e9bfb060b52dac8)(overrides);
    return {
        colors: {
            ...(0, $bNXjM$indigo),
            ...(0, $bNXjM$indigoA),
            ...(0, $bNXjM$red),
            ...(0, $bNXjM$gray),
            ...(0, $bNXjM$blackA),
            ...(0, $bNXjM$whiteA),
            ...(0, $bNXjM$green),
            // accent colors
            accentBase: "$indigo1",
            accentBgSubtle: "$indigo2",
            accentBg: "$indigo3",
            accentBgHover: "$indigo4",
            accentBgActive: "$indigo5",
            accentLine: "$indigo6",
            accentBorder: "$indigo7",
            accentBorderHover: overrides?.primaryColor || "$indigo8",
            accentSolid: overrides?.primaryColor || "$indigo9",
            accentSolidHover: overrides?.primaryHoverColor || overrides?.primaryColor || "$indigo10",
            accentText: "$indigo11",
            accentTextContrast: "$indigo12",
            // neutral colors
            neutralBase: "$gray1",
            neutralBgSubtle: "white",
            neutralBg: "$gray3",
            neutralBgHover: "$gray2",
            neutralBgActive: "$gray5",
            neutalLine: "$gray6",
            neutralBorder: "$gray7",
            neutralBorderHover: "$gray8",
            neutralSolid: "$gray9",
            neutralSolidHover: "$gray10",
            neutralText: "$gray11",
            neutralTextContrast: "$gray12",
            // secondary colors
            secondaryBase: "$indigoA1",
            secondaryBgSubtle: "$indigoA2",
            secondaryBg: "$indigoA3",
            secondaryBgHover: "$indigoA4",
            secondaryBgActive: "$indigoA5",
            secondaryLine: "$indigoA6",
            secondaryBorder: "$indigoA7",
            secondaryBorderHover: "$indigoA8",
            secondarySolid: "$indigoA9",
            secondarySolidHover: "$indigoA10",
            secondaryText: "$indigoA11",
            secondaryTextContrast: "$indigoA12",
            // general colors
            borderColor: overrides?.borderColor || "$neutralBorder",
            textColor: overrides?.textColor || "$neutralTextContrast",
            focusColor: "$neutralTextContrast",
            errorText: "$red12",
            errorAccent: "$red10",
            successAccent: "$green10",
            // component colors
            reservoirLogoColor: "#11181C",
            buttonTextColor: overrides?.buttonTextColor || "white",
            buttonTextHoverColor: overrides?.buttonTextHoverColor || "white",
            inputBackground: "$neutralBgHover",
            overlayBackground: overrides?.overlayBackground || "$blackA10",
            headerBackground: overrides?.headerBackground || "$neutralBgHover",
            footerBackground: overrides?.footerBackground || "$neutralBgHover",
            contentBackground: overrides?.contentBackground || "$neutralBgSubtle",
            wellBackground: overrides?.wellBackground || "$gray3",
            popoverBackground: overrides?.popoverBackground || "$neutralBase"
        },
        assets: {
            ethIcon: overrides?.ethIcon || "gray"
        },
        ...sharedTheme
    };
}





const $2663f1ccb598096e$var$useCopyToClipboard = (successTime = 1000)=>{
    const [copied, setCopied] = (0, $bNXjM$useState)(false);
    const copy = (content)=>{
        navigator.clipboard.writeText(content ? content : "");
        if (!copied) {
            setCopied(true);
            setTimeout(()=>{
                setCopied(false);
            }, successTime);
        }
    };
    return {
        copy: copy,
        copied: copied
    };
};
var $2663f1ccb598096e$export$2e2bcd8739ae039 = $2663f1ccb598096e$var$useCopyToClipboard;


const $d115e0b00eaf4565$var$useFallbackState = (defaultValue, state)=>{
    const _state = (0, $bNXjM$useState)(defaultValue);
    if (state) return state;
    return _state;
};
var $d115e0b00eaf4565$export$2e2bcd8739ae039 = $d115e0b00eaf4565$var$useFallbackState;





const $31d3f3a80135a993$export$ec39d0bf2d6d1efb = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("a", {
    backgroundColor: "transparent",
    cursor: "pointer",
    fontFamily: "$body",
    fontSize: 16,
    color: "inherit",
    textDecoration: "inherit",
    $$focusColor: "$colors$neutralTextContrast",
    "&:focus-visible": {
        color: "$neutralTextContrast",
        outline: "none",
        borderRadius: 4,
        boxShadow: "0 0 0 2px $$focusColor"
    },
    variants: {
        color: {
            primary: {
                color: "$accentText",
                "&:hover": {
                    color: "$accentSolidHover"
                }
            },
            gray: {
                color: "$neutralText",
                "&:hover": {
                    color: "$accentText"
                }
            },
            error: {
                color: "$errorAccent"
            }
        },
        weight: {
            heavy: {
                fontWeight: 700
            },
            medium: {
                fontWeight: 500
            }
        }
    },
    defaultVariants: {
        color: "gray",
        weight: "heavy"
    }
});
var $31d3f3a80135a993$export$2e2bcd8739ae039 = /*#__PURE__*/ (0, $bNXjM$forwardRef)(({ children: children , ...props }, forwardedRef)=>/*#__PURE__*/ (0, $bNXjM$jsx)($31d3f3a80135a993$export$ec39d0bf2d6d1efb, {
        ref: forwardedRef,
        ...props,
        tabIndex: 0,
        children: children
    }));


var $e779e4a6b41db55c$export$2e2bcd8739ae039 = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("div", {
    boxSizing: "border-box",
    borderStyle: "solid",
    borderWidth: 0
});


const $f8f1c7bd1550c954$var$Button = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("button", {
    backgroundColor: "transparent",
    backgroundImage: "none",
    outline: "none",
    fontWeight: 700,
    fontSize: 16,
    fontFamily: "$button",
    transition: "background-color 250ms linear",
    gap: "$space$2",
    display: "inline-flex",
    justifyContent: "center",
    color: "$buttonTextColor",
    alignItems: "center",
    lineHeight: "20px",
    $$focusColor: "$colors$focusColor",
    cursor: "pointer",
    border: 0,
    borderWidth: 0,
    "&:focus-visible": {
        boxShadow: "0 0 0 2px $$focusColor"
    },
    "&:disabled": {
        backgroundColor: "$neutralBorder",
        color: "$neutralText",
        cursor: "default"
    },
    "&:disabled:hover": {
        backgroundColor: "$neutralBorderHover",
        color: "$neutralText",
        cursor: "default"
    },
    variants: {
        color: {
            primary: {
                backgroundColor: "$accentSolid",
                color: "$buttonTextColor",
                "&:hover": {
                    backgroundColor: "$accentSolidHover",
                    color: "$buttonTextHoverColor"
                }
            },
            secondary: {
                backgroundColor: "$neutralBgHover",
                color: "$textColor",
                "&:hover": {
                    backgroundColor: "$neutralBgActive"
                }
            },
            ghost: {
                backgroundColor: "transparent",
                p: 0
            }
        },
        corners: {
            rounded: {
                borderRadius: "$borderRadius"
            },
            pill: {
                borderRadius: 99999
            },
            circle: {
                borderRadius: "99999px",
                alignItems: "center",
                justifyContent: "center"
            }
        },
        size: {
            none: {},
            xs: {
                p: "$space$3",
                lineHeight: "16px",
                minHeight: 40
            },
            small: {
                px: "$space$3",
                py: "$space$4",
                lineHeight: "12px",
                minHeight: 44
            },
            medium: {
                px: "$space$5",
                py: "$space$3",
                minHeight: 44
            },
            large: {
                px: "$space$5",
                py: "$space$4",
                minHeight: 52
            }
        }
    },
    compoundVariants: [
        {
            size: "xs",
            corners: "circle",
            css: {
                height: 40,
                width: 40,
                p: 0
            }
        },
        {
            size: "small",
            corners: "circle",
            css: {
                height: 44,
                width: 44,
                p: 0
            }
        },
        {
            size: "medium",
            corners: "circle",
            css: {
                height: 44,
                width: 44,
                p: 0
            }
        },
        {
            size: "large",
            corners: "circle",
            css: {
                height: 52,
                width: 52,
                p: 0
            }
        }
    ],
    defaultVariants: {
        color: "primary",
        corners: "rounded",
        size: "medium"
    }
});
var $f8f1c7bd1550c954$export$2e2bcd8739ae039 = $f8f1c7bd1550c954$var$Button;



const $a08469b1b360d6cf$var$flexCss = {
    display: "flex",
    boxSizing: "border-box",
    borderStyle: "solid",
    borderWidth: 0,
    variants: {
        align: {
            start: {
                alignItems: "flex-start"
            },
            center: {
                alignItems: "center"
            },
            end: {
                alignItems: "flex-end"
            },
            stretch: {
                alignItems: "stretch"
            },
            baseline: {
                alignItems: "baseline"
            }
        },
        justify: {
            start: {
                justifyContent: "flex-start"
            },
            center: {
                justifyContent: "center"
            },
            end: {
                justifyContent: "flex-end"
            },
            between: {
                justifyContent: "space-between"
            }
        },
        direction: {
            row: {
                flexDirection: "row"
            },
            column: {
                flexDirection: "column"
            },
            rowReverse: {
                flexDirection: "row-reverse"
            },
            columnReverse: {
                flexDirection: "column-reverse"
            }
        },
        wrap: {
            noWrap: {
                flexWrap: "nowrap"
            },
            wrap: {
                flexWrap: "wrap"
            },
            wrapReverse: {
                flexWrap: "wrap-reverse"
            }
        }
    }
};
var $a08469b1b360d6cf$export$2e2bcd8739ae039 = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("div", $a08469b1b360d6cf$var$flexCss);
const $a08469b1b360d6cf$export$d31dc64e78f336f = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)((0, $bNXjM$motion).div, $a08469b1b360d6cf$var$flexCss);






var $3d59341a2d8e6cce$export$2e2bcd8739ae039 = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("span", {
    color: "$textColor",
    fontFamily: "$body",
    letterSpacing: 0,
    margin: 0,
    variants: {
        color: {
            base: {
                color: "$textColor"
            },
            subtle: {
                color: "$neutralText"
            },
            error: {
                color: "$errorAccent"
            },
            errorLight: {
                color: "$errorText"
            },
            accent: {
                color: "$accentText"
            },
            success: {
                color: "$successAccent"
            },
            button: {
                color: "$buttonTextColor"
            }
        },
        style: {
            h2: {
                fontWeight: 700,
                fontSize: 48,
                fontFamily: "$headline"
            },
            h3: {
                fontWeight: 700,
                fontSize: 32,
                fontFamily: "$headline"
            },
            h4: {
                fontWeight: 700,
                fontSize: 24,
                fontFamily: "$headline"
            },
            h5: {
                fontWeight: 700,
                fontSize: 20,
                fontFamily: "$headline"
            },
            h6: {
                fontWeight: 700,
                fontSize: 16,
                fontFamily: "$headline"
            },
            subtitle1: {
                fontWeight: 500,
                fontSize: 16
            },
            subtitle2: {
                fontWeight: 500,
                fontSize: 12
            },
            body1: {
                fontWeight: 400,
                fontSize: 16
            },
            body2: {
                fontWeight: 400,
                fontSize: 12
            },
            body3: {
                fontWeight: 400,
                fontSize: 14
            },
            tiny: {
                fontWeight: 500,
                fontSize: 10,
                color: "$neutralSolidHover"
            }
        },
        italic: {
            true: {
                fontStyle: "italic"
            }
        },
        ellipsify: {
            true: {
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
            }
        }
    },
    defaultVariants: {
        style: "body1",
        color: "base"
    }
});


const $bf339e6c548bf9af$var$FormatCrypto = ({ amount: amount , maximumFractionDigits: maximumFractionDigits = 4 , decimals: decimals = 18 , css: css , textStyle: textStyle = "subtitle2" , textColor: textColor = "base" , children: children  })=>{
    const value = (0, $e70e85f6f4e64430$export$87710fd8420713d9)(amount, maximumFractionDigits, decimals);
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        align: "center",
        css: {
            gap: "$1"
        },
        children: [
            value !== "-" ? children : null,
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: textStyle,
                color: textColor,
                css: css,
                as: "p",
                children: value
            })
        ]
    });
};
var $bf339e6c548bf9af$export$2e2bcd8739ae039 = $bf339e6c548bf9af$var$FormatCrypto;










var $58d8f754e898a64f$export$2e2bcd8739ae039 = ()=>/*#__PURE__*/ (0, $bNXjM$jsx)("svg", {
        width: "auto",
        height: "100%",
        viewBox: "5 0 15 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
            d: "M11.9441 17.97L4.58008 13.62L11.9431 24L19.3131 13.62L11.9411 17.97H11.9441V17.97ZM12.0561 0L4.69008 12.223L12.0551 16.577L19.4201 12.227L12.0561 0Z",
            fill: "black"
        })
    });




var $81efeccddbef40a5$export$2e2bcd8739ae039 = ()=>/*#__PURE__*/ (0, $bNXjM$jsxs)("svg", {
        width: "auto",
        height: "100%",
        viewBox: "5 0 15 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsxs)("g", {
                clipPath: "url(#clip0_2127_56739)",
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                        d: "M11.9979 0L11.8369 0.546928V16.4161L11.9979 16.5767L19.3641 12.2225L11.9979 0Z",
                        fill: "#343434"
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                        d: "M11.9979 0L4.63159 12.2225L11.9979 16.5767V8.87428V0Z",
                        fill: "#8C8C8C"
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                        d: "M11.998 17.9714L11.9072 18.0821V23.7349L11.998 23.9999L19.3686 13.6195L11.998 17.9714Z",
                        fill: "#3C3C3B"
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                        d: "M11.9979 23.9999V17.9714L4.63159 13.6195L11.9979 23.9999Z",
                        fill: "#8C8C8C"
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                        d: "M11.998 16.5767L19.3642 12.2225L11.998 8.87427V16.5767Z",
                        fill: "#141414"
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                        d: "M4.63159 12.2225L11.9979 16.5767V8.87427L4.63159 12.2225Z",
                        fill: "#393939"
                    })
                ]
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)("defs", {
                children: /*#__PURE__*/ (0, $bNXjM$jsx)("clipPath", {
                    id: "clip0_2127_56739",
                    children: /*#__PURE__*/ (0, $bNXjM$jsx)("rect", {
                        width: "24",
                        height: "24",
                        fill: "white"
                    })
                })
            })
        ]
    });




var $760403efeeaf3296$export$2e2bcd8739ae039 = ()=>/*#__PURE__*/ (0, $bNXjM$jsxs)("svg", {
        width: "auto",
        height: "100%",
        viewBox: "5 0 15 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                d: "M12.3654 8.87477V0L5 12.2224L12.3654 8.87477Z",
                fill: "#8A92B2"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                d: "M12.3654 16.5772V8.87477L5 12.2224L12.3654 16.5772ZM12.3654 8.87477L19.7322 12.2224L12.3654 0V8.87477Z",
                fill: "#62688F"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                d: "M12.3655 8.87476V16.5772L19.7322 12.2224L12.3655 8.87476Z",
                fill: "#454A75"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                d: "M12.3654 17.972L5 13.6199L12.3654 23.9999V17.972Z",
                fill: "#8A92B2"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                d: "M19.7363 13.6199L12.3655 17.972V23.9999L19.7363 13.6199Z",
                fill: "#62688F"
            })
        ]
    });


const $94f006d5638f6dfb$var$EthLogo = ()=>{
    const themeContext = (0, $bNXjM$useContext)((0, $b15843e937ac72b8$export$2c657da244d00bd6));
    const ethIcon = themeContext && themeContext ? themeContext["assets"]["ethIcon"]["value"] : "glyph";
    switch(ethIcon){
        case "glyph":
            return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $58d8f754e898a64f$export$2e2bcd8739ae039), {});
        case "gray":
            return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $81efeccddbef40a5$export$2e2bcd8739ae039), {});
        case "purple":
            return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $760403efeeaf3296$export$2e2bcd8739ae039), {});
    }
};
var $94f006d5638f6dfb$export$2e2bcd8739ae039 = $94f006d5638f6dfb$var$EthLogo;







const $412f709ff46d543e$var$wrappedContracts = {
    1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    5: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    137: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
};
var $412f709ff46d543e$export$2e2bcd8739ae039 = $412f709ff46d543e$var$wrappedContracts;




var $ce1f74d0add013e9$export$2e2bcd8739ae039 = ()=>/*#__PURE__*/ (0, $bNXjM$jsxs)("svg", {
        width: "auto",
        height: "100%",
        viewBox: "0 0 15 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                d: "M7.49721 0L0 12.4432L7.49721 9.03511V0Z",
                fill: "#AE1955"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                d: "M7.49721 9.03506L0 12.4432L7.49721 16.8767V9.03506Z",
                fill: "#801D45"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                d: "M14.9959 12.4433L7.49731 0V9.03511L14.9959 12.4433Z",
                fill: "#801D45"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                d: "M7.49731 16.8767L14.9959 12.4432L11.2466 10.7391L7.49731 9.03506V16.8767Z",
                fill: "#641D3B"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                d: "M0 13.8661L7.49721 24.4337V18.2968L0 13.8661Z",
                fill: "#AE1955"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)("path", {
                d: "M7.49731 18.2968V24.4337L15.0001 13.8661L7.49731 18.2968Z",
                fill: "#801D45"
            })
        ]
    });


const $bb13850b05622906$var$StyledImg = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("img", {});
const $bb13850b05622906$var$CryptoCurrencyIcon = ({ address: address = (0, $bNXjM$constants).AddressZero , chainId: chainId , css: css  })=>{
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chainCurrency = (0, $16fcb794e07c5eb8$export$2e2bcd8739ae039)(chainId);
    const chain = client?.chains.find((chain)=>chain.id === chainCurrency.chainId);
    if (chainCurrency.symbol === "ETH") {
        if ((0, $bNXjM$constants).AddressZero === address) return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
            css: {
                display: "flex",
                ...css
            },
            children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $94f006d5638f6dfb$export$2e2bcd8739ae039), {})
        });
        if ((0, $412f709ff46d543e$export$2e2bcd8739ae039)[chainCurrency.chainId] === address) return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
            css: {
                display: "flex",
                ...css
            },
            children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $ce1f74d0add013e9$export$2e2bcd8739ae039), {})
        });
    }
    return /*#__PURE__*/ (0, $bNXjM$jsx)($bb13850b05622906$var$StyledImg, {
        src: `${chain?.baseApiUrl}/redirect/currency/${address}/icon/v1`,
        css: css
    });
};
var $bb13850b05622906$export$2e2bcd8739ae039 = $bb13850b05622906$var$CryptoCurrencyIcon;


const $c370900a6d71021a$var$FormatCryptoCurrency = ({ amount: amount , address: address = (0, $bNXjM$constants).AddressZero , maximumFractionDigits: maximumFractionDigits , logoWidth: logoWidth = 14 , textStyle: textStyle , css: css , textColor: textColor , decimals: decimals , chainId: chainId  })=>{
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bf339e6c548bf9af$export$2e2bcd8739ae039), {
        css: css,
        textColor: textColor,
        textStyle: textStyle,
        amount: amount,
        maximumFractionDigits: maximumFractionDigits,
        decimals: decimals,
        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bb13850b05622906$export$2e2bcd8739ae039), {
            css: {
                height: logoWidth
            },
            address: address,
            chainId: chainId
        })
    });
};
var $c370900a6d71021a$export$2e2bcd8739ae039 = $c370900a6d71021a$var$FormatCryptoCurrency;




const $208ab5b0155991db$var$FormatCurrency = ({ amount: amount , maximumFractionDigits: maximumFractionDigits = 2 , currency: currency = "USD" , ...props })=>{
    const [formattedValue, setFormattedValue] = (0, $bNXjM$useState)("");
    (0, $bNXjM$useEffect)(()=>{
        if (amount) {
            const lowestValue = Number(`0.${new Array(maximumFractionDigits).join("0")}1`);
            const tooLow = +amount < lowestValue;
            const formatted = new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: currency
            }).format(tooLow ? lowestValue : +amount);
            setFormattedValue(tooLow ? `< ${formatted}` : formatted);
        } else setFormattedValue("");
    }, [
        amount,
        maximumFractionDigits
    ]);
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
        ...props,
        style: props.style || "subtitle2",
        color: props.color || "base",
        children: formattedValue
    });
};
var $208ab5b0155991db$export$2e2bcd8739ae039 = $208ab5b0155991db$var$FormatCurrency;






const $a235eda53948b6ff$var$StyledInput = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("input", {
    all: "unset",
    width: "100%",
    px: 16,
    py: 12,
    borderRadius: 8,
    fontFamily: "$body",
    fontSize: 16,
    color: "$neutralTextContrast",
    backgroundColor: "$inputBackground",
    $$focusColor: "$colors$accentBorderHover",
    "&:placeholder": {
        color: "$neutralText"
    },
    "&:focus": {
        boxShadow: "0 0 0 2px $$focusColor"
    },
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0
    },
    "&[type=number]": {
        "-moz-appearance": "textfield"
    }
});
const $a235eda53948b6ff$export$f5b8910cec6cf069 = /*#__PURE__*/ (0, $bNXjM$forwardRef)(({ children: children , icon: icon , containerCss: containerCss , iconCss: iconCss , ...props }, forwardedRef)=>/*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        css: {
            ...containerCss,
            position: "relative"
        },
        children: [
            icon && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                css: {
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: 16,
                    color: "$neutralTextContrast",
                    pointerEvents: "none",
                    ...iconCss
                },
                children: icon
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)($a235eda53948b6ff$var$StyledInput, {
                css: {
                    pl: icon ? 48 : 16,
                    ...props.css
                },
                ref: forwardedRef,
                ...props
            })
        ]
    }));
var $a235eda53948b6ff$export$2e2bcd8739ae039 = $a235eda53948b6ff$export$f5b8910cec6cf069;







const $0ff8966798df47ad$var$LoaderContainer = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "$neutralText"
});
function $0ff8966798df47ad$export$2e2bcd8739ae039(props) {
    return /*#__PURE__*/ (0, $bNXjM$jsx)($0ff8966798df47ad$var$LoaderContainer, {
        ...props,
        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$motion).div, {
            initial: {
                rotate: 0
            },
            transition: {
                repeat: Infinity,
                duration: 1,
                ease: "linear"
            },
            animate: {
                rotate: 360
            },
            children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                icon: (0, $bNXjM$faSpinner),
                width: 20,
                height: 20
            })
        })
    });
}








const $f6c56793b47f1e35$var$StyledTrigger = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Trigger, {
    boxSizing: "border-box",
    borderWidth: 0,
    width: "100%",
    px: "$4",
    py: "$3",
    borderRadius: "$borderRadius",
    fontfamily: "$body",
    fontSize: 16,
    display: "flex",
    justifyContent: "space-between",
    color: "$neutralTextContrast",
    backgroundColor: "$inputBackground",
    $$focusColor: "$colors$accentBorderHover",
    "&:placeholder": {
        color: "$neutralText"
    },
    "&:focus": {
        boxShadow: "0 0 0 2px $$focusColor"
    }
});
const $f6c56793b47f1e35$var$StyledContent = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Content, {
    backgroundColor: "$inputBackground",
    color: "$textColor",
    borderRadius: "$borderRadius",
    overflow: "hidden",
    $$focusColor: "$colors$accentBorderHover",
    boxShadow: "0 0 0 2px $$focusColor"
});
const $f6c56793b47f1e35$var$textCss = {
    color: "$textColor",
    fontFamily: "$body",
    letterSpacing: 0
};
const $f6c56793b47f1e35$var$StyledItemText = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$ItemText, $f6c56793b47f1e35$var$textCss);
const $f6c56793b47f1e35$var$StyledValue = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Value, $f6c56793b47f1e35$var$textCss);
const $f6c56793b47f1e35$var$SelectDownIcon = /*#__PURE__*/ (0, $bNXjM$forwardRef)(({ ...props }, forwardedRef)=>/*#__PURE__*/ (0, $bNXjM$jsx)($bNXjM$Icon, {
        asChild: true,
        ref: forwardedRef,
        ...props,
        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
            css: {
                color: "$neutralSolidHover"
            },
            children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                icon: (0, $bNXjM$faChevronDown),
                width: "14",
                color: ""
            })
        })
    }));
const $f6c56793b47f1e35$export$863d5f18a1f54f2d = ({ children: children , trigger: trigger , css: css , ...props })=>/*#__PURE__*/ (0, $bNXjM$jsxs)($bNXjM$Root, {
        ...props,
        children: [
            trigger ? trigger : /*#__PURE__*/ (0, $bNXjM$jsxs)($f6c56793b47f1e35$var$StyledTrigger, {
                css: {
                    ...$f6c56793b47f1e35$var$textCss,
                    ...css
                },
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)($f6c56793b47f1e35$var$StyledValue, {
                        placeholder: props.placeholder,
                        children: props.value
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)($f6c56793b47f1e35$var$SelectDownIcon, {})
                ]
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)($bNXjM$Portal, {
                style: {
                    zIndex: 1000000
                },
                children: /*#__PURE__*/ (0, $bNXjM$jsxs)($f6c56793b47f1e35$var$StyledContent, {
                    children: [
                        /*#__PURE__*/ (0, $bNXjM$jsx)($bNXjM$ScrollUpButton, {}),
                        /*#__PURE__*/ (0, $bNXjM$jsx)($bNXjM$Viewport, {
                            children: children
                        }),
                        /*#__PURE__*/ (0, $bNXjM$jsx)($bNXjM$ScrollDownButton, {})
                    ]
                })
            })
        ]
    });
const $f6c56793b47f1e35$var$StyledItem = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Item, {
    cursor: "pointer",
    py: "$3",
    px: "$4",
    color: "$textColor",
    fontFamily: "$body",
    letterSpacing: 0,
    "&:hover": {
        background: "$neutralBgActive"
    }
});
$f6c56793b47f1e35$export$863d5f18a1f54f2d.Item = $f6c56793b47f1e35$var$StyledItem;
$f6c56793b47f1e35$export$863d5f18a1f54f2d.ItemText = $f6c56793b47f1e35$var$StyledItemText;
$f6c56793b47f1e35$export$863d5f18a1f54f2d.Trigger = $f6c56793b47f1e35$var$StyledTrigger;
$f6c56793b47f1e35$export$863d5f18a1f54f2d.Value = $f6c56793b47f1e35$var$StyledValue;
$f6c56793b47f1e35$export$863d5f18a1f54f2d.DownIcon = $f6c56793b47f1e35$var$SelectDownIcon;
var $f6c56793b47f1e35$export$2e2bcd8739ae039 = $f6c56793b47f1e35$export$863d5f18a1f54f2d;








const $168bea4f9c9e5bd1$var$Progress = ({ title: title , txHash: txHash , blockExplorerBaseUrl: blockExplorerBaseUrl  })=>{
    const { chain: activeChain  } = (0, $bNXjM$useNetwork)();
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        direction: "column",
        css: {
            alignItems: "center",
            gap: "$4",
            mt: "$5",
            mb: "$3"
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "h6",
                children: title
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                css: {
                    color: "$neutralText"
                },
                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                    icon: txHash ? (0, $bNXjM$faCube) : (0, $bNXjM$faWallet),
                    style: {
                        width: "32px",
                        height: "32px",
                        marginTop: "12px 0px"
                    }
                })
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $31d3f3a80135a993$export$2e2bcd8739ae039), {
                color: "primary",
                weight: "medium",
                css: {
                    fontSize: 12,
                    visibility: txHash ? "visible" : "hidden"
                },
                href: blockExplorerBaseUrl,
                target: "_blank",
                children: [
                    "View on ",
                    activeChain?.blockExplorers?.default.name || "Etherscan"
                ]
            })
        ]
    });
};
var $168bea4f9c9e5bd1$export$2e2bcd8739ae039 = $168bea4f9c9e5bd1$var$Progress;







const $364926f073e51b94$var$Arrow = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Arrow, {
    width: 15,
    height: 7,
    fill: "$popoverBackground"
});
const $364926f073e51b94$var$Content = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Content1, {
    filter: "drop-shadow(0px 2px 16px rgba(0, 0, 0, 0.75))",
    zIndex: 1000
});
const $364926f073e51b94$var$RKPopover = ({ children: children , content: content , side: side = "bottom" , width: width = "100%" , ...props })=>{
    return /*#__PURE__*/ (0, $bNXjM$jsxs)($bNXjM$Root1, {
        ...props,
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)($bNXjM$Trigger1, {
                style: {
                    backgroundColor: "transparent",
                    borderWidth: 0,
                    cursor: "pointer",
                    padding: 0
                },
                children: children
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)($364926f073e51b94$var$Content, {
                side: side,
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)($364926f073e51b94$var$Arrow, {}),
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                        css: {
                            p: "$3",
                            maxWidth: 320,
                            overflowY: "auto",
                            maxHeight: 322,
                            width: width,
                            borderRadius: 8,
                            backgroundColor: "$popoverBackground"
                        },
                        children: content
                    })
                ]
            })
        ]
    });
};
$364926f073e51b94$var$RKPopover.Root = $bNXjM$Root1;
$364926f073e51b94$var$RKPopover.Portal = $bNXjM$Portal1;
$364926f073e51b94$var$RKPopover.Trigger = $bNXjM$Trigger1;
$364926f073e51b94$var$RKPopover.Arrow = $364926f073e51b94$var$Arrow;
$364926f073e51b94$var$RKPopover.Content = $364926f073e51b94$var$Content;
var $364926f073e51b94$export$2e2bcd8739ae039 = $364926f073e51b94$var$RKPopover;
















const $53071302e811b792$var$useMediaQuery = (query)=>{
    const [matches, setMatches] = (0, $bNXjM$useState)(false);
    (0, $bNXjM$useEffect)(()=>{
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = ()=>{
            setMatches(media.matches);
        };
        media.addEventListener("change", listener);
        return ()=>media.removeEventListener("change", listener);
    }, [
        matches,
        query
    ]);
    return matches;
};
var $53071302e811b792$export$2e2bcd8739ae039 = $53071302e811b792$var$useMediaQuery;


const $f631ed2def755485$export$c6fdb837b070b4ff = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Overlay, {
    backgroundColor: "$overlayBackground",
    position: "fixed",
    inset: 0,
    zIndex: 1000
});
const $f631ed2def755485$export$a14718312a4275d3 = /*#__PURE__*/ (0, $bNXjM$forwardRef)(({ ...props }, forwardedRef)=>/*#__PURE__*/ (0, $bNXjM$jsx)($f631ed2def755485$export$c6fdb837b070b4ff, {
        ...props,
        forceMount: true,
        asChild: true,
        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$motion).div, {
            ref: forwardedRef,
            transition: {
                duration: 0.5
            },
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            }
        })
    }));
const $f631ed2def755485$export$7c6e2c02157bb7d2 = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Content2, {
    backgroundColor: "$contentBackground",
    borderRadius: "$borderRadius",
    $$shadowColor: "$colors$gray7",
    boxShadow: "box-shadow: 0px 2px 16px $$shadowColor",
    border: "1px solid $borderColor",
    position: "fixed",
    left: "50%",
    maxWidth: 516,
    top: "100%",
    width: "100%",
    zIndex: 1000,
    "&:focus": {
        outline: "none"
    },
    "@media(max-width: 520px)": {
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        border: 0
    }
});
const $f631ed2def755485$export$43a7eb3180015c73 = /*#__PURE__*/ (0, $bNXjM$forwardRef)(({ children: children , ...props }, forwardedRef)=>{
    const isMobile = (0, $53071302e811b792$export$2e2bcd8739ae039)("(max-width: 520px)");
    const animation = isMobile ? {
        initial: {
            opacity: 0,
            bottom: "-100%",
            top: "auto",
            left: 0
        },
        animate: {
            opacity: 1,
            bottom: 0,
            top: "auto",
            left: 0
        },
        exit: {
            opacity: 0,
            bottom: "-100%",
            top: "auto",
            left: 0
        }
    } : {
        initial: {
            opacity: 0,
            top: "14%",
            transform: "translateX(-50%)"
        },
        animate: {
            opacity: 1,
            top: "9%",
            transform: "translateX(-50%)"
        },
        exit: {
            opacity: 0,
            top: "14%",
            transform: "translateX(-50%)"
        }
    };
    return /*#__PURE__*/ (0, $bNXjM$jsx)($f631ed2def755485$export$7c6e2c02157bb7d2, {
        forceMount: true,
        asChild: true,
        ...props,
        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$motion).div, {
            ref: forwardedRef,
            transition: {
                type: isMobile ? "tween" : "spring",
                duration: 0.5
            },
            ...animation,
            children: children
        }, isMobile + "modal")
    });
});
const $f631ed2def755485$var$StyledAnimatedContent = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($f631ed2def755485$export$43a7eb3180015c73, {});
const $f631ed2def755485$export$3ddf2d174ce01153 = /*#__PURE__*/ (0, $bNXjM$forwardRef)(({ children: children , trigger: trigger , portalProps: portalProps , onOpenChange: onOpenChange , open: open , size: size , ...props }, forwardedRef)=>{
    const [dialogOpen, setDialogOpen] = (0, $bNXjM$useState)(false);
    (0, $bNXjM$useEffect)(()=>{
        if (open !== undefined && open !== dialogOpen) {
            setDialogOpen(open);
            if (onOpenChange) onOpenChange(open);
        }
    }, [
        open
    ]);
    return /*#__PURE__*/ (0, $bNXjM$jsxs)($bNXjM$Root2, {
        onOpenChange: (open)=>{
            setDialogOpen(open);
            if (onOpenChange) onOpenChange(open);
        },
        open: dialogOpen,
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)($bNXjM$DialogTrigger, {
                asChild: true,
                children: trigger
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$AnimatePresence), {
                children: dialogOpen && /*#__PURE__*/ (0, $bNXjM$jsxs)($bNXjM$DialogPortal, {
                    forceMount: true,
                    ...portalProps,
                    children: [
                        /*#__PURE__*/ (0, $bNXjM$jsx)($f631ed2def755485$export$a14718312a4275d3, {}),
                        /*#__PURE__*/ (0, $bNXjM$jsx)($f631ed2def755485$var$StyledAnimatedContent, {
                            ref: forwardedRef,
                            ...props,
                            forceMount: true,
                            css: {
                                maxWidth: size === (0, $b86bf9f1e9f1a187$export$e8598848ef5f29c0).MD ? 516 : 750
                            },
                            children: children
                        })
                    ]
                })
            })
        ]
    });
});


// import { ProviderOptionsContext } from '../ZooProvider'
const $b86bf9f1e9f1a187$var$Title = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Title, {
    margin: 0
});
let $b86bf9f1e9f1a187$export$e8598848ef5f29c0;
(function(ModalSize) {
    ModalSize[ModalSize["MD"] = 0] = "MD";
    ModalSize[ModalSize["LG"] = 1] = "LG";
})($b86bf9f1e9f1a187$export$e8598848ef5f29c0 || ($b86bf9f1e9f1a187$export$e8598848ef5f29c0 = {}));
const $b86bf9f1e9f1a187$export$2b77a92f1a5ad772 = /*#__PURE__*/ (0, $bNXjM$forwardRef)(({ title: title , children: children , trigger: trigger , onBack: onBack , open: open , size: size = $b86bf9f1e9f1a187$export$e8598848ef5f29c0.MD , onOpenChange: onOpenChange , loading: loading , onPointerDownOutside: onPointerDownOutside , onFocusCapture: onFocusCapture  }, forwardedRef)=>{
    // const providerOptionsContext = useContext(ProviderOptionsContext)
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $f631ed2def755485$export$3ddf2d174ce01153), {
        ref: forwardedRef,
        trigger: trigger,
        open: open,
        onOpenChange: onOpenChange,
        size: size,
        onPointerDownOutside: onPointerDownOutside,
        onFocusCapture: onFocusCapture,
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                css: {
                    p: 16,
                    backgroundColor: "$headerBackground",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTopRightRadius: "$borderRadius",
                    borderTopLeftRadius: "$borderRadius"
                },
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsxs)($b86bf9f1e9f1a187$var$Title, {
                        css: {
                            alignItems: "center",
                            display: "flex"
                        },
                        children: [
                            onBack && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                color: "ghost",
                                size: "none",
                                css: {
                                    mr: "$2",
                                    color: "$neutralText"
                                },
                                onClick: onBack,
                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                    icon: (0, $bNXjM$faChevronLeft),
                                    width: 16,
                                    height: 16
                                })
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                style: "h6",
                                children: title
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)($bNXjM$Close, {
                        asChild: true,
                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                            color: "ghost",
                            size: "none",
                            css: {
                                color: "$neutralText"
                            },
                            children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                icon: (0, $bNXjM$faClose),
                                width: 16,
                                height: 16
                            })
                        })
                    })
                ]
            }),
            loading && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {
                css: {
                    minHeight: 242,
                    backgroundColor: "$contentBackground"
                }
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                css: {
                    maxHeight: "85vh",
                    overflowY: "auto"
                },
                children: children
            })
        ]
    });
});












function $4c76c4b4e6d5247c$export$2e2bcd8739ae039({ message: message , css: css  }) {
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        css: {
            color: "$errorAccent",
            p: "$4",
            gap: "$2",
            background: "$wellBackground",
            ...css
        },
        align: "center",
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                icon: (0, $bNXjM$faCircleExclamation),
                width: 16,
                height: 16
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "body2",
                color: "errorLight",
                children: message || "Oops, something went wrong. Please try again."
            })
        ]
    });
}






var $72bd45ddbf898068$export$2e2bcd8739ae039 = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("div", {
    display: "grid",
    variants: {
        align: {
            start: {
                alignItems: "start"
            },
            center: {
                alignItems: "center"
            },
            end: {
                alignItems: "end"
            },
            stretch: {
                alignItems: "stretch"
            },
            baseline: {
                alignItems: "baseline"
            }
        },
        justify: {
            start: {
                justifyContent: "start"
            },
            center: {
                justifyContent: "center"
            },
            end: {
                justifyContent: "end"
            },
            between: {
                justifyContent: "space-between"
            }
        },
        flow: {
            row: {
                gridAutoFlow: "row"
            },
            column: {
                gridAutoFlow: "column"
            },
            dense: {
                gridAutoFlow: "dense"
            },
            rowDense: {
                gridAutoFlow: "row dense"
            },
            columnDense: {
                gridAutoFlow: "column dense"
            }
        }
    }
});


const $bd031fc677b64fb0$var$Img = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("img", {
    height: 56,
    width: 56
});
const $bd031fc677b64fb0$var$TokenPrimitive = ({ img: img , name: name , collection: collection , currencyContract: currencyContract , currencyDecimals: currencyDecimals , expires: expires , warning: warning , isOffer: isOffer , source: source , usdPrice: usdPrice , price: price , isUnavailable: isUnavailable  })=>{
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                css: {
                    justifyContent: "space-between",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                        style: "subtitle2",
                        color: "subtle",
                        css: {
                            mb: 10,
                            display: "block"
                        },
                        children: name ? "Item" : "Collection"
                    }),
                    isOffer && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                        style: "subtitle2",
                        color: "subtle",
                        css: {
                            mb: 10,
                            display: "block"
                        },
                        children: "Offer"
                    })
                ]
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                css: {
                    justifyContent: "space-between"
                },
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        css: {
                            alignItems: "center",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)($bd031fc677b64fb0$var$Img, {
                                src: img,
                                alt: name,
                                css: {
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    visibility: !img || img.length === 0 ? "hidden" : "visible",
                                    flexShrink: 0,
                                    objectFit: "cover"
                                }
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $72bd45ddbf898068$export$2e2bcd8739ae039), {
                                css: {
                                    rowGap: 2
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "h6",
                                        ellipsify: true,
                                        color: isUnavailable ? "subtle" : "base",
                                        children: name ? name : collection
                                    }),
                                    name && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "body2",
                                        color: isUnavailable ? "subtle" : "base",
                                        children: collection
                                    }),
                                    !!expires && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "tiny",
                                        children: [
                                            "Expires ",
                                            expires
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $72bd45ddbf898068$export$2e2bcd8739ae039), {
                        css: {
                            justifyItems: "end",
                            alignContent: "start",
                            rowGap: 4
                        },
                        children: [
                            source && /*#__PURE__*/ (0, $bNXjM$jsx)($bd031fc677b64fb0$var$Img, {
                                src: source,
                                alt: "Source Icon",
                                css: {
                                    w: 17,
                                    h: 17,
                                    borderRadius: 99999,
                                    overflow: "hidden"
                                }
                            }),
                            price ? /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                                amount: price,
                                textColor: isUnavailable ? "subtle" : "base",
                                address: currencyContract,
                                decimals: currencyDecimals,
                                logoWidth: 14.5
                            }) : /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                style: "subtitle2",
                                color: isUnavailable ? "subtle" : "base",
                                children: "--"
                            }),
                            usdPrice ? /*#__PURE__*/ (0, $bNXjM$jsx)((0, $208ab5b0155991db$export$2e2bcd8739ae039), {
                                amount: usdPrice,
                                style: "tiny",
                                color: "subtle"
                            }) : null,
                            warning && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                style: "subtitle2",
                                color: "error",
                                children: warning
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
var $bd031fc677b64fb0$export$2e2bcd8739ae039 = $bd031fc677b64fb0$var$TokenPrimitive;


const $c5f5dee31b69b8f3$var$TokenLineItem = ({ tokenDetails: tokenDetails , collection: collection , usdConversion: usdConversion = 0 , isSuspicious: isSuspicious , isUnavailable: isUnavailable , price: price , warning: warning , currency: currency , expires: expires , isOffer: isOffer , sourceImg: sourceImg  })=>{
    if (!tokenDetails) return null;
    const usdPrice = price * usdConversion;
    const name = tokenDetails?.token?.name || `#${tokenDetails?.token?.tokenId}`;
    const collectionName = tokenDetails?.token?.collection?.name || collection?.name || "";
    const img = tokenDetails?.token?.image ? tokenDetails.token.image : collection?.image;
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
        css: {
            p: "$4",
            borderBottom: "1px solid $borderColor"
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bd031fc677b64fb0$export$2e2bcd8739ae039), {
                img: img,
                name: name,
                price: price,
                usdPrice: usdPrice,
                collection: collectionName,
                currencyContract: currency?.contract,
                currencyDecimals: currency?.decimals,
                expires: expires,
                warning: warning,
                source: sourceImg || "",
                isUnavailable: isUnavailable,
                isOffer: isOffer
            }),
            !!isSuspicious && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $4c76c4b4e6d5247c$export$2e2bcd8739ae039), {
                css: {
                    p: "$3",
                    mt: "$3",
                    borderRadius: 4
                },
                message: "Token is not tradable on OpenSea"
            })
        ]
    });
};
var $c5f5dee31b69b8f3$export$2e2bcd8739ae039 = $c5f5dee31b69b8f3$var$TokenLineItem;





function $742accbc1cb453a5$export$2e2bcd8739ae039(vs_currency, symbols = "eth") {
    const { data: data  } = (0, $bNXjM$swr)(vs_currency ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&symbols=${symbols}` : null, null, {
        refreshInterval: 300000
    });
    if (data && data[0] && data[0].current_price) return data[0].current_price;
    return null;
}







let $537a8475c59a6e21$export$b41ddf00b39567e8;
(function(BuyStep) {
    BuyStep[BuyStep["Checkout"] = 0] = "Checkout";
    BuyStep[BuyStep["Approving"] = 1] = "Approving";
    BuyStep[BuyStep["AddFunds"] = 2] = "AddFunds";
    BuyStep[BuyStep["Complete"] = 3] = "Complete";
    BuyStep[BuyStep["Unavailable"] = 4] = "Unavailable";
})($537a8475c59a6e21$export$b41ddf00b39567e8 || ($537a8475c59a6e21$export$b41ddf00b39567e8 = {}));
const $537a8475c59a6e21$export$8913f774683cde87 = ({ open: open , tokenId: tokenId , collectionId: collectionId , orderId: orderId , referrer: referrer , referrerFeeBps: referrerFeeBps , normalizeRoyalties: normalizeRoyalties , children: children  })=>{
    const { data: signer  } = (0, $bNXjM$useSigner)();
    const [totalPrice, setTotalPrice] = (0, $bNXjM$useState)(0);
    const [referrerFee, setReferrerFee] = (0, $bNXjM$useState)(0);
    const [buyStep, setBuyStep] = (0, $bNXjM$useState)($537a8475c59a6e21$export$b41ddf00b39567e8.Checkout);
    const [transactionError, setTransactionError] = (0, $bNXjM$useState)();
    const [hasEnoughCurrency, setHasEnoughCurrency] = (0, $bNXjM$useState)(true);
    const [stepData, setStepData] = (0, $bNXjM$useState)(null);
    const [steps, setSteps] = (0, $bNXjM$useState)(null);
    const [quantity, setQuantity] = (0, $bNXjM$useState)(1);
    const { chain: activeChain  } = (0, $bNXjM$useNetwork)();
    const blockExplorerBaseUrl = activeChain?.blockExplorers?.default?.url || "https://etherscan.io";
    const contract = collectionId ? collectionId?.split(":")[0] : undefined;
    const { data: tokens , mutate: mutateTokens  } = (0, $54bf018b076821f1$export$2e2bcd8739ae039)(open && {
        tokens: [
            `${contract}:${tokenId}`
        ],
        normalizeRoyalties: normalizeRoyalties
    }, {
        revalidateFirstPage: true
    });
    const { data: collections , mutate: mutateCollection  } = (0, $38f38860f7db3263$export$2e2bcd8739ae039)(open && {
        id: collectionId,
        normalizeRoyalties: normalizeRoyalties
    });
    const collection = collections && collections[0] ? collections[0] : undefined;
    const token = tokens && tokens.length > 0 ? tokens[0] : undefined;
    const { data: listings , mutate: mutateListings , isValidating: isValidatingListing  } = (0, $40f16bae928ea461$export$2e2bcd8739ae039)({
        token: `${contract}:${tokenId}`,
        ids: orderId ? orderId : token?.market?.floorAsk?.id,
        normalizeRoyalties: normalizeRoyalties,
        status: "active"
    }, {
        revalidateFirstPage: true
    }, open && (token?.market?.floorAsk?.id !== undefined || orderId) ? true : false);
    const listing = listings && listings[0] && listings[0].status === "active" ? listings[0] : undefined;
    const currency = listing?.price?.currency;
    const usdPrice = (0, $742accbc1cb453a5$export$2e2bcd8739ae039)(open && token ? "USD" : undefined, currency?.symbol);
    const feeUsd = referrerFee * (usdPrice || 0);
    const totalUsd = totalPrice * (usdPrice || 0);
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const buyToken = (0, $bNXjM$useCallback)(()=>{
        if (!signer) {
            const error = new Error("Missing a signer");
            setTransactionError(error);
            throw error;
        }
        if (!tokenId || !collectionId) {
            const error = new Error("Missing tokenId or collectionId");
            setTransactionError(error);
            throw error;
        }
        if (!client) {
            const error = new Error("ZooClient was not initialized");
            setTransactionError(error);
            throw error;
        }
        const contract = collectionId?.split(":")[0];
        let options = {};
        if (referrer && referrerFeeBps) {
            const price = (0, $e70e85f6f4e64430$export$a81f732198733497)(totalPrice, currency?.decimals || 18);
            const fee = (0, $bNXjM$utils).parseUnits(`${price}`, currency?.decimals).mul(referrerFeeBps).div(10000);
            const atomicUnitsFee = (0, $bNXjM$formatUnits)(fee, 0);
            options.feesOnTop = [
                `${referrer}:${atomicUnitsFee}`
            ];
        } else if (referrer === null && referrerFeeBps === null) delete options.feesOnTop;
        if (quantity > 1) options.quantity = quantity;
        if (normalizeRoyalties !== undefined) options.normalizeRoyalties = normalizeRoyalties;
        setBuyStep($537a8475c59a6e21$export$b41ddf00b39567e8.Approving);
        let orderIds = orderId ? [
            orderId
        ] : undefined;
        let tokens = orderId ? undefined : [
            {
                tokenId: tokenId,
                contract: contract
            }
        ];
        client.actions.buyToken({
            orderIds: orderIds,
            expectedPrice: totalPrice,
            signer: signer,
            tokens: tokens,
            onProgress: (steps)=>{
                if (!steps) return;
                setSteps(steps);
                const executableSteps = steps.filter((step)=>step.items && step.items.length > 0);
                let stepCount = executableSteps.length;
                let currentStepItem;
                const currentStepIndex = executableSteps.findIndex((step)=>{
                    currentStepItem = step.items?.find((item)=>item.status === "incomplete");
                    return currentStepItem;
                });
                const currentStep = currentStepIndex > -1 ? executableSteps[currentStepIndex] : executableSteps[stepCount - 1];
                if (currentStepItem) setStepData({
                    totalSteps: stepCount,
                    stepProgress: currentStepIndex,
                    currentStep: currentStep,
                    currentStepItem: currentStepItem
                });
                else if (steps.every((step)=>!step.items || step.items.length == 0 || step.items?.every((item)=>item.status === "complete"))) setBuyStep($537a8475c59a6e21$export$b41ddf00b39567e8.Complete);
            },
            options: options
        }).catch((e)=>{
            const error = e;
            if (error && error?.message && error?.message.includes("ETH balance")) setHasEnoughCurrency(false);
            else {
                const errorType = error?.type;
                let message = "Oops, something went wrong. Please try again.";
                if (errorType && errorType === "price mismatch") message = error.message;
                const transactionError = new Error(message, {
                    cause: error
                });
                setTransactionError(transactionError);
                if (orderId) mutateListings();
                mutateCollection();
                mutateTokens();
            }
            setBuyStep($537a8475c59a6e21$export$b41ddf00b39567e8.Checkout);
            setStepData(null);
            setSteps(null);
        });
    }, [
        tokenId,
        collectionId,
        orderId,
        referrer,
        referrerFeeBps,
        quantity,
        normalizeRoyalties,
        client,
        signer,
        currency,
        totalPrice,
        mutateListings,
        mutateTokens,
        mutateCollection
    ]);
    (0, $bNXjM$useEffect)(()=>{
        if (listing) {
            if (listing.price?.amount?.decimal) {
                let floorPrice = listing.price?.amount?.decimal;
                if (referrerFeeBps && referrer) {
                    const fee = referrerFeeBps / 10000 * floorPrice;
                    floorPrice = floorPrice + fee;
                    setReferrerFee(fee);
                }
                setTotalPrice(floorPrice * quantity);
                setBuyStep($537a8475c59a6e21$export$b41ddf00b39567e8.Checkout);
            } else {
                setBuyStep($537a8475c59a6e21$export$b41ddf00b39567e8.Unavailable);
                setTotalPrice(0);
            }
        } else if (!listing && !isValidatingListing && token) {
            setBuyStep($537a8475c59a6e21$export$b41ddf00b39567e8.Unavailable);
            setTotalPrice(0);
        }
    }, [
        listing,
        isValidatingListing,
        referrerFeeBps,
        referrer,
        client,
        quantity,
        token
    ]);
    const { address: address  } = (0, $bNXjM$useAccount)();
    const { data: balance  } = (0, $bNXjM$useBalance)({
        address: address,
        token: currency?.contract !== (0, $bNXjM$constants).AddressZero ? currency?.contract : undefined,
        watch: open,
        formatUnits: currency?.decimals
    });
    (0, $bNXjM$useEffect)(()=>{
        if (balance) {
            const totalPriceTruncated = (0, $e70e85f6f4e64430$export$a81f732198733497)(totalPrice, currency?.decimals || 18);
            if (!balance.value) setHasEnoughCurrency(false);
            else if (balance.value.lt((0, $bNXjM$utils).parseUnits(`${totalPriceTruncated}`, currency?.decimals))) setHasEnoughCurrency(false);
            else setHasEnoughCurrency(true);
        }
    }, [
        totalPrice,
        balance,
        currency
    ]);
    (0, $bNXjM$useEffect)(()=>{
        if (!open) {
            setBuyStep($537a8475c59a6e21$export$b41ddf00b39567e8.Checkout);
            setTransactionError(null);
            setStepData(null);
            setSteps(null);
            setQuantity(1);
        }
    }, [
        open
    ]);
    const isBanned = (0, $9898620691963117$export$2e2bcd8739ae039)(open ? contract : undefined, tokenId);
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$Fragment), {
        children: children({
            loading: !listing && isValidatingListing || !token,
            token: token,
            collection: collection,
            listing: listing,
            quantityAvailable: listing?.quantityRemaining || 1,
            currency: currency,
            totalPrice: totalPrice,
            referrerFee: referrerFee,
            buyStep: buyStep,
            transactionError: transactionError,
            hasEnoughCurrency: hasEnoughCurrency,
            feeUsd: feeUsd,
            totalUsd: totalUsd,
            usdPrice: usdPrice,
            isBanned: isBanned,
            balance: balance?.value,
            address: address,
            blockExplorerBaseUrl: blockExplorerBaseUrl,
            steps: steps,
            stepData: stepData,
            quantity: quantity,
            setQuantity: setQuantity,
            setBuyStep: setBuyStep,
            buyToken: buyToken
        })
    });
};





const $fe4973a3dd519dab$var$ProgressBar = ({ value: value , max: max , ...props })=>{
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        ...props,
        css: {
            width: "100%",
            gap: "$2",
            ...props.css
        },
        children: [
            ...Array(max)
        ].map((_item, i)=>/*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                css: {
                    height: 4,
                    borderRadius: 99999,
                    flex: 1,
                    background: "linear-gradient(to left, $neutralBorderHover 50%, $accentSolid 50%) right",
                    backgroundSize: "200% 100%",
                    backgroundPosition: i + 1 <= value ? "left" : "right",
                    transition: "all 0.5s ease"
                }
            }, i))
    });
};
var $fe4973a3dd519dab$export$2e2bcd8739ae039 = $fe4973a3dd519dab$var$ProgressBar;



function $ad2cbb1f5242b499$var$titleForStep(step) {
    switch(step){
        case (0, $537a8475c59a6e21$export$b41ddf00b39567e8).AddFunds:
            return "Add Funds";
        case (0, $537a8475c59a6e21$export$b41ddf00b39567e8).Unavailable:
            return "Selected item is no longer Available";
        default:
            return "Complete Checkout";
    }
}
function $ad2cbb1f5242b499$export$7055e49b90860ae6({ openState: openState , trigger: trigger , tokenId: tokenId , collectionId: collectionId , orderId: orderId , referrer: referrer , referrerFeeBps: referrerFeeBps , normalizeRoyalties: normalizeRoyalties , onPurchaseComplete: onPurchaseComplete , onPurchaseError: onPurchaseError , onClose: onClose , onGoToToken: onGoToToken  }) {
    const [open, setOpen] = (0, $d115e0b00eaf4565$export$2e2bcd8739ae039)(openState ? openState[0] : false, openState);
    const { copy: copyToClipboard , copied: copied  } = (0, $2663f1ccb598096e$export$2e2bcd8739ae039)();
    const { chain: activeChain  } = (0, $bNXjM$useNetwork)();
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $537a8475c59a6e21$export$8913f774683cde87), {
        open: open,
        tokenId: tokenId,
        collectionId: collectionId,
        orderId: orderId,
        referrer: referrer,
        referrerFeeBps: referrerFeeBps,
        normalizeRoyalties: normalizeRoyalties,
        children: ({ loading: loading , token: token , collection: collection , listing: listing , quantityAvailable: quantityAvailable , quantity: quantity , currency: currency , totalPrice: totalPrice , referrerFee: referrerFee , buyStep: buyStep , transactionError: transactionError , hasEnoughCurrency: hasEnoughCurrency , steps: steps , stepData: stepData , feeUsd: feeUsd , totalUsd: totalUsd , usdPrice: usdPrice , isBanned: isBanned , balance: balance , address: address , blockExplorerBaseUrl: blockExplorerBaseUrl , setQuantity: setQuantity , setBuyStep: setBuyStep , buyToken: buyToken  })=>{
            const title = $ad2cbb1f5242b499$var$titleForStep(buyStep);
            (0, $bNXjM$useEffect)(()=>{
                if (buyStep === (0, $537a8475c59a6e21$export$b41ddf00b39567e8).Complete && onPurchaseComplete) {
                    const data = {
                        tokenId: tokenId,
                        collectionId: collectionId,
                        maker: address
                    };
                    if (steps) data.steps = steps;
                    onPurchaseComplete(data);
                }
            }, [
                buyStep
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (transactionError && onPurchaseError) {
                    const data = {
                        tokenId: tokenId,
                        collectionId: collectionId,
                        maker: address
                    };
                    onPurchaseError(transactionError, data);
                }
            }, [
                transactionError
            ]);
            const executableSteps = steps?.filter((step)=>step.items && step.items.length > 0) || [];
            const lastStepItems = executableSteps[executableSteps.length - 1]?.items || [];
            let finalTxHash = lastStepItems[lastStepItems.length - 1]?.txHash;
            let price = (listing?.price?.amount?.decimal || 0) * quantity;
            if (!price && token?.token?.lastSell?.value) price = token?.token.lastSell.value;
            const sourceImg = listing?.source ? listing?.source["icon"] : undefined;
            return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $b86bf9f1e9f1a187$export$2b77a92f1a5ad772), {
                trigger: trigger,
                title: title,
                onBack: buyStep == (0, $537a8475c59a6e21$export$b41ddf00b39567e8).AddFunds ? ()=>{
                    setBuyStep((0, $537a8475c59a6e21$export$b41ddf00b39567e8).Checkout);
                } : null,
                open: open,
                onOpenChange: (open)=>{
                    if (!open && onClose) {
                        const data = {
                            tokenId: tokenId,
                            collectionId: collectionId,
                            maker: address
                        };
                        onClose(data, stepData, buyStep);
                    }
                    setOpen(open);
                },
                loading: loading,
                children: [
                    buyStep === (0, $537a8475c59a6e21$export$b41ddf00b39567e8).Unavailable && !loading && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c5f5dee31b69b8f3$export$2e2bcd8739ae039), {
                                tokenDetails: token,
                                collection: collection,
                                isSuspicious: isBanned,
                                usdConversion: usdPrice || 0,
                                isUnavailable: true,
                                price: price,
                                currency: currency,
                                sourceImg: sourceImg
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                onClick: ()=>{
                                    setOpen(false);
                                },
                                css: {
                                    m: "$4"
                                },
                                children: "Close"
                            })
                        ]
                    }),
                    buyStep === (0, $537a8475c59a6e21$export$b41ddf00b39567e8).Checkout && !loading && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            transactionError && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    color: "$errorAccent",
                                    p: "$4",
                                    gap: "$2",
                                    background: "$wellBackground"
                                },
                                align: "center",
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                        icon: (0, $bNXjM$faCircleExclamation),
                                        width: 16,
                                        height: 16
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "body2",
                                        color: "errorLight",
                                        children: transactionError.message
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c5f5dee31b69b8f3$export$2e2bcd8739ae039), {
                                tokenDetails: token,
                                collection: collection,
                                usdConversion: usdPrice || 0,
                                isSuspicious: isBanned,
                                price: price,
                                currency: currency,
                                sourceImg: sourceImg
                            }),
                            quantityAvailable > 1 && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    pt: "$4",
                                    px: "$4"
                                },
                                align: "center",
                                justify: "between",
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "body2",
                                        color: "subtle",
                                        children: [
                                            quantityAvailable,
                                            " listings are available at this price"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039), {
                                        css: {
                                            minWidth: 77,
                                            width: "auto",
                                            flexGrow: 0
                                        },
                                        value: `${quantity}`,
                                        onValueChange: (value)=>{
                                            setQuantity(Number(value));
                                        },
                                        children: [
                                            ...Array(quantityAvailable)
                                        ].map((_a, i)=>/*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).Item, {
                                                value: `${i + 1}`,
                                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).ItemText, {
                                                    children: i + 1
                                                })
                                            }, i))
                                    })
                                ]
                            }),
                            referrerFee > 0 && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        align: "center",
                                        justify: "between",
                                        css: {
                                            pt: "$4",
                                            px: "$4"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "subtitle2",
                                                children: "Referral Fee"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                                                amount: referrerFee,
                                                address: currency?.contract,
                                                decimals: currency?.decimals
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        justify: "end",
                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $208ab5b0155991db$export$2e2bcd8739ae039), {
                                            amount: feeUsd,
                                            color: "subtle",
                                            css: {
                                                pr: "$4"
                                            }
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                align: "center",
                                justify: "between",
                                css: {
                                    pt: "$4",
                                    px: "$4"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "h6",
                                        children: "Total"
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                                        textStyle: "h6",
                                        amount: totalPrice,
                                        address: currency?.contract,
                                        decimals: currency?.decimals
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                justify: "end",
                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $208ab5b0155991db$export$2e2bcd8739ae039), {
                                    amount: totalUsd,
                                    color: "subtle",
                                    css: {
                                        mr: "$4"
                                    }
                                })
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    width: "100%"
                                },
                                children: hasEnoughCurrency ? /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                    onClick: buyToken,
                                    css: {
                                        width: "100%"
                                    },
                                    color: "primary",
                                    children: "Checkout"
                                }) : /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                    direction: "column",
                                    align: "center",
                                    children: [
                                        /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                            align: "center",
                                            css: {
                                                mb: "$3"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                    css: {
                                                        mr: "$3"
                                                    },
                                                    color: "error",
                                                    style: "body2",
                                                    children: "Insufficient Balance"
                                                }),
                                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                                                    amount: balance,
                                                    address: currency?.contract,
                                                    decimals: currency?.decimals,
                                                    textStyle: "body2"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                            onClick: ()=>{
                                                setBuyStep((0, $537a8475c59a6e21$export$b41ddf00b39567e8).AddFunds);
                                            },
                                            css: {
                                                width: "100%"
                                            },
                                            children: "Add Funds"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    buyStep === (0, $537a8475c59a6e21$export$b41ddf00b39567e8).Approving && token && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c5f5dee31b69b8f3$export$2e2bcd8739ae039), {
                                tokenDetails: token,
                                collection: collection,
                                usdConversion: usdPrice || 0,
                                isSuspicious: isBanned,
                                price: price,
                                currency: currency,
                                sourceImg: sourceImg
                            }),
                            stepData && stepData.totalSteps > 1 && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $fe4973a3dd519dab$export$2e2bcd8739ae039), {
                                css: {
                                    px: "$4",
                                    mt: "$3"
                                },
                                value: stepData?.stepProgress || 0,
                                max: stepData?.totalSteps || 0
                            }),
                            !stepData && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {
                                css: {
                                    height: 206
                                }
                            }),
                            stepData && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $168bea4f9c9e5bd1$export$2e2bcd8739ae039), {
                                title: stepData?.currentStep.action || "",
                                txHash: stepData?.currentStepItem.txHash,
                                blockExplorerBaseUrl: `${blockExplorerBaseUrl}/tx/${stepData?.currentStepItem.txHash}`
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                disabled: true,
                                css: {
                                    m: "$4"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {}),
                                    stepData?.currentStepItem.txHash ? "Waiting for transaction to be validated" : "Waiting for approval..."
                                ]
                            })
                        ]
                    }),
                    buyStep === (0, $537a8475c59a6e21$export$b41ddf00b39567e8).Complete && token && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    py: "$5",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "h5",
                                        css: {
                                            mb: 24
                                        },
                                        children: "Congratulations!"
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)("img", {
                                        src: token?.token?.image,
                                        style: {
                                            width: 100,
                                            height: 100
                                        }
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            mb: 24,
                                            mt: "$2",
                                            maxWidth: "100%"
                                        },
                                        align: "center",
                                        justify: "center",
                                        children: [
                                            !!token.token?.collection?.image && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                css: {
                                                    mr: "$1"
                                                },
                                                children: /*#__PURE__*/ (0, $bNXjM$jsx)("img", {
                                                    src: token.token?.collection?.image,
                                                    style: {
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: "50%"
                                                    }
                                                })
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "subtitle2",
                                                css: {
                                                    maxWidth: "100%"
                                                },
                                                ellipsify: true,
                                                children: token?.token?.name ? token?.token?.name : `#${token?.token?.tokenId}`
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            mb: "$2"
                                        },
                                        align: "center",
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                css: {
                                                    color: "$successAccent",
                                                    mr: "$2"
                                                },
                                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                                    icon: (0, $bNXjM$faCheckCircle)
                                                })
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "body1",
                                                children: "Your transaction went through successfully"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $31d3f3a80135a993$export$2e2bcd8739ae039), {
                                        color: "primary",
                                        weight: "medium",
                                        css: {
                                            fontSize: 12
                                        },
                                        href: `${blockExplorerBaseUrl}/tx/${finalTxHash}`,
                                        target: "_blank",
                                        children: [
                                            "View on",
                                            " ",
                                            activeChain?.blockExplorers?.default.name || "Etherscan"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    flexDirection: "column",
                                    gap: "$3",
                                    "@bp1": {
                                        flexDirection: "row"
                                    }
                                },
                                children: !!onGoToToken ? /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                    children: [
                                        /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                            onClick: ()=>{
                                                setOpen(false);
                                            },
                                            css: {
                                                flex: 1
                                            },
                                            color: "ghost",
                                            children: "Close"
                                        }),
                                        /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                            style: {
                                                flex: 1
                                            },
                                            color: "primary",
                                            onClick: ()=>{
                                                onGoToToken();
                                            },
                                            children: "Go to Token"
                                        })
                                    ]
                                }) : /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                    onClick: ()=>{
                                        setOpen(false);
                                    },
                                    style: {
                                        flex: 1
                                    },
                                    color: "primary",
                                    children: "Close"
                                })
                            })
                        ]
                    }),
                    buyStep === (0, $537a8475c59a6e21$export$b41ddf00b39567e8).AddFunds && token && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    py: "$5",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                        css: {
                                            color: "$neutralText"
                                        },
                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                            icon: (0, $bNXjM$faExchange),
                                            style: {
                                                width: "32px",
                                                height: "32px",
                                                margin: "12px 0px"
                                            }
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "subtitle1",
                                        css: {
                                            my: 24
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $364926f073e51b94$export$2e2bcd8739ae039), {
                                                content: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                    style: "body2",
                                                    children: [
                                                        "Trade one crypto for another on a crypto exchange. Popular decentralized exchanges include",
                                                        " ",
                                                        /*#__PURE__*/ (0, $bNXjM$jsx)((0, $31d3f3a80135a993$export$2e2bcd8739ae039), {
                                                            css: {
                                                                fontSize: 12
                                                            },
                                                            href: "https://app.uniswap.org/",
                                                            target: "_blank",
                                                            color: "primary",
                                                            children: "Uniswap"
                                                        }),
                                                        ",",
                                                        " ",
                                                        /*#__PURE__*/ (0, $bNXjM$jsx)((0, $31d3f3a80135a993$export$2e2bcd8739ae039), {
                                                            css: {
                                                                fontSize: 12
                                                            },
                                                            href: "https://app.sushi.com/",
                                                            target: "_blank",
                                                            color: "primary",
                                                            children: "SushiSwap"
                                                        }),
                                                        " ",
                                                        "and many others."
                                                    ]
                                                }),
                                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                    as: "span",
                                                    color: "accent",
                                                    children: "Exchange currencies"
                                                })
                                            }),
                                            " ",
                                            "or transfer funds to your",
                                            /*#__PURE__*/ (0, $bNXjM$jsx)("br", {}),
                                            " wallet address below:"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                        css: {
                                            width: "100%",
                                            position: "relative"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                css: {
                                                    pointerEvents: "none",
                                                    opacity: copied ? 1 : 0,
                                                    position: "absolute",
                                                    inset: 0,
                                                    borderRadius: 8,
                                                    transition: "all 200ms ease-in-out",
                                                    pl: "$4",
                                                    alignItems: "center",
                                                    zIndex: 3,
                                                    textAlign: "left",
                                                    background: "$neutralBg"
                                                },
                                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                    style: "body1",
                                                    children: "Copied Address!"
                                                })
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a235eda53948b6ff$export$2e2bcd8739ae039), {
                                                readOnly: true,
                                                onClick: ()=>copyToClipboard(address),
                                                value: address || "",
                                                css: {
                                                    color: "$neutralText",
                                                    textAlign: "left"
                                                }
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                css: {
                                                    position: "absolute",
                                                    right: "$3",
                                                    top: "50%",
                                                    touchEvents: "none",
                                                    transform: "translateY(-50%)",
                                                    color: "$neutralText",
                                                    pointerEvents: "none"
                                                },
                                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                                    icon: (0, $bNXjM$faCopy),
                                                    width: 16,
                                                    height: 16
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                css: {
                                    m: "$4"
                                },
                                color: "primary",
                                onClick: ()=>copyToClipboard(address),
                                children: "Copy Wallet Address"
                            })
                        ]
                    })
                ]
            });
        }
    });
}
$ad2cbb1f5242b499$export$7055e49b90860ae6.Custom = (0, $537a8475c59a6e21$export$8913f774683cde87);














function $4b83afa1b914556e$export$2e2bcd8739ae039(marketplaces, tokenId, collectionId) {
    const [unapprovedMarketplaces, setUnapprovedMarketplaces] = (0, $bNXjM$useState)([]);
    const [isFetching, setIsFetching] = (0, $bNXjM$useState)(false);
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const { data: signer  } = (0, $bNXjM$useSigner)();
    (0, $bNXjM$useEffect)(()=>{
        if (signer && client && tokenId && collectionId && marketplaces.length > 0) {
            const listings = marketplaces.map((market)=>{
                const listing = {
                    token: `${collectionId}:${tokenId}`,
                    weiPrice: "100000000000000000",
                    //@ts-ignore
                    orderbook: market.orderbook,
                    //@ts-ignore
                    orderKind: market.orderKind
                };
                return listing;
            });
            setIsFetching(true);
            client.actions.listToken({
                listings: listings,
                signer: signer,
                precheck: true
            }).then((data)=>{
                const steps = data;
                const approvalStep = steps.find((step)=>step.kind === "transaction" && step.items && step.items.length > 0);
                if (approvalStep && approvalStep.items) setUnapprovedMarketplaces(approvalStep.items.reduce((unapproved, item)=>{
                    if (item.status === "incomplete" && item.orderIndex !== undefined) {
                        const listing = listings[item.orderIndex];
                        marketplaces.forEach((marketplace)=>{
                            if (marketplace.orderKind === listing.orderKind) unapproved.push(marketplace);
                        });
                    }
                    return unapproved;
                }, []));
                else if (unapprovedMarketplaces.length > 0) setUnapprovedMarketplaces([]);
                setIsFetching(false);
            }).catch(()=>{
                setIsFetching(false);
            });
        } else if (unapprovedMarketplaces.length > 0) setUnapprovedMarketplaces([]);
    }, [
        client,
        signer,
        tokenId,
        collectionId,
        marketplaces.length
    ]);
    return {
        data: unapprovedMarketplaces,
        isFetching: isFetching
    };
}


var $c07b724742ae0148$export$2e2bcd8739ae039 = ()=>{
    const client = (0, $bNXjM$getClient)();
    let reservoirTitleEl = document.querySelector("meta[property='reservoir:title']");
    let title = null;
    if (reservoirTitleEl) title = reservoirTitleEl.getAttribute("content");
    if (!title && client && client.source) title = client.source;
    else if (!title) title = location ? location.hostname.replace("www.", "") : "";
    const reservoirIconEl = document.querySelector("meta[property='reservoir:icon']");
    let icon = null;
    if (reservoirIconEl) icon = reservoirIconEl.getAttribute("content");
    if (!icon) {
        const favicon = document.querySelector("link[rel*='icon']");
        if (favicon) icon = favicon.getAttribute("href");
    }
    return {
        title: title,
        icon: icon
    };
};





function $f34980509523d2a6$export$2e2bcd8739ae039(listingEnabledOnly, chainId) {
    const [marketplaces, setMarketplaces] = (0, $bNXjM$useState)([]);
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chain = chainId !== undefined ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
    const path = new URL(`${chain?.baseApiUrl}/admin/get-marketplaces`);
    const { data: data  } = (0, $bNXjM$swrimmutable)([
        path.href,
        chain?.apiKey,
        client?.version
    ], null);
    (0, $bNXjM$useEffect)(()=>{
        if (data && data.marketplaces) {
            let updatedMarketplaces = data.marketplaces;
            if (listingEnabledOnly) updatedMarketplaces = updatedMarketplaces.filter((marketplace)=>marketplace.listingEnabled && marketplace.orderbook !== "x2y2");
            updatedMarketplaces.forEach((marketplace)=>{
                if (marketplace.orderbook === "reservoir") {
                    const data = (0, $c07b724742ae0148$export$2e2bcd8739ae039)();
                    marketplace.name = data.title;
                    marketplace.feeBps = client?.marketplaceFee ? client.marketplaceFee : 0;
                    marketplace.fee = {
                        bps: client?.marketplaceFee || 0,
                        percent: (client?.marketplaceFee || 0) / 100
                    };
                    if (data.icon) marketplace.imageUrl = data.icon;
                }
                marketplace.price = 0;
                marketplace.truePrice = 0;
                marketplace.isSelected = marketplace.orderbook === "reservoir" ? true : false;
            });
            setMarketplaces(updatedMarketplaces);
        }
    }, [
        data,
        listingEnabledOnly
    ]);
    return [
        marketplaces,
        setMarketplaces
    ];
}


function $3abd2be8eb42ad0c$export$2e2bcd8739ae039(contract, tokenId, swrOptions = {}) {
    const path = new URL(`https://api.opensea.io/api/v1/asset/${contract}/${tokenId}`);
    const { data: data , mutate: mutate , error: error , isValidating: isValidating  } = (0, $bNXjM$swr)(contract && tokenId ? [
        path.href
    ] : null, (resource)=>{
        return fetch(resource).then((res)=>res.json()).catch((e)=>{
            throw e;
        });
    }, {
        revalidateOnMount: true,
        ...swrOptions
    });
    return {
        response: data,
        mutate: mutate,
        error: error,
        isValidating: isValidating
    };
}





const $abb5dec08fcac72e$var$expirationOptions = [
    {
        text: "1 Hour",
        value: "hour",
        relativeTime: 1,
        relativeTimeUnit: "h"
    },
    {
        text: "12 Hours",
        value: "12 hours",
        relativeTime: 12,
        relativeTimeUnit: "h"
    },
    {
        text: "1 Day",
        value: "1 day",
        relativeTime: 1,
        relativeTimeUnit: "d"
    },
    {
        text: "3 Day",
        value: "3 days",
        relativeTime: 3,
        relativeTimeUnit: "d"
    },
    {
        text: "1 Week",
        value: "week",
        relativeTime: 1,
        relativeTimeUnit: "w"
    },
    {
        text: "1 Month",
        value: "month",
        relativeTime: 1,
        relativeTimeUnit: "M"
    },
    {
        text: "3 Months",
        value: "3 months",
        relativeTime: 3,
        relativeTimeUnit: "M"
    },
    {
        text: "6 Months",
        value: "6 months",
        relativeTime: 6,
        relativeTimeUnit: "M"
    }
];
var $abb5dec08fcac72e$export$2e2bcd8739ae039 = $abb5dec08fcac72e$var$expirationOptions;



let $052d60b4fc42e2f9$export$7f4afd65e1e67072;
(function(ListStep) {
    ListStep[ListStep["SelectMarkets"] = 0] = "SelectMarkets";
    ListStep[ListStep["SetPrice"] = 1] = "SetPrice";
    ListStep[ListStep["ListItem"] = 2] = "ListItem";
    ListStep[ListStep["Complete"] = 3] = "Complete";
})($052d60b4fc42e2f9$export$7f4afd65e1e67072 || ($052d60b4fc42e2f9$export$7f4afd65e1e67072 = {}));
const $052d60b4fc42e2f9$var$isCurrencyAllowed = (currency, marketplace, openseaPaymentTokens)=>{
    if (marketplace.listingEnabled) {
        if (currency.contract === (0, $bNXjM$constants).AddressZero) return true;
        switch(marketplace.orderbook){
            case "reservoir":
                return true;
            case "opensea":
                return openseaPaymentTokens.some((token)=>token.address === currency.contract);
        }
    }
    return false;
};
const $052d60b4fc42e2f9$export$5cb91f178b51ac3 = ({ open: open , tokenId: tokenId , collectionId: collectionId , currencies: currencies , normalizeRoyalties: normalizeRoyalties , children: children  })=>{
    const { data: signer  } = (0, $bNXjM$useSigner)();
    const account = (0, $bNXjM$useAccount)();
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const [listStep, setListStep] = (0, $bNXjM$useState)($052d60b4fc42e2f9$export$7f4afd65e1e67072.SelectMarkets);
    const [listingData, setListingData] = (0, $bNXjM$useState)([]);
    const [allMarketplaces] = (0, $f34980509523d2a6$export$2e2bcd8739ae039)(true);
    const [marketplaces, setMarketplaces] = (0, $f34980509523d2a6$export$2e2bcd8739ae039)(true);
    const [loadedInitalPrice, setLoadedInitalPrice] = (0, $bNXjM$useState)(false);
    const [transactionError, setTransactionError] = (0, $bNXjM$useState)();
    const [stepData, setStepData] = (0, $bNXjM$useState)(null);
    const [localMarketplace, setLocalMarketplace] = (0, $bNXjM$useState)(null);
    const chainCurrency = (0, $16fcb794e07c5eb8$export$2e2bcd8739ae039)();
    const defaultCurrency = {
        contract: chainCurrency.address,
        symbol: chainCurrency.symbol
    };
    const [currency, setCurrency] = (0, $bNXjM$useState)(currencies && currencies[0] ? currencies[0] : defaultCurrency);
    const [quantity, setQuantity] = (0, $bNXjM$useState)(1);
    const contract = collectionId ? collectionId?.split(":")[0] : undefined;
    const { data: unapprovedMarketplaces , isFetching: isFetchingUnapprovedMarketplaces  } = (0, $4b83afa1b914556e$export$2e2bcd8739ae039)(marketplaces, open ? tokenId : undefined, open ? contract : undefined);
    const [expirationOption, setExpirationOption] = (0, $bNXjM$useState)((0, $abb5dec08fcac72e$export$2e2bcd8739ae039)[5]);
    const { data: tokens  } = (0, $54bf018b076821f1$export$2e2bcd8739ae039)(open && {
        tokens: [
            `${contract}:${tokenId}`
        ],
        includeAttributes: true,
        normalizeRoyalties: normalizeRoyalties
    }, {
        revalidateFirstPage: true
    });
    const { data: collections  } = (0, $38f38860f7db3263$export$2e2bcd8739ae039)(open && {
        id: collectionId,
        normalizeRoyalties: normalizeRoyalties
    });
    const { response: openSeaToken  } = (0, $3abd2be8eb42ad0c$export$2e2bcd8739ae039)(open ? contract : undefined, open ? tokenId : undefined);
    const paymentTokens = openSeaToken?.collection?.payment_tokens;
    const collection = collections && collections[0] ? collections[0] : undefined;
    const token = tokens && tokens.length > 0 ? tokens[0] : undefined;
    const is1155 = token?.token?.kind === "erc1155";
    const { data: userTokens  } = (0, $7ef173c8b4177008$export$2e2bcd8739ae039)(open && is1155 ? account.address : undefined, {
        tokens: [
            `${contract}:${tokenId}`
        ]
    });
    const quantityAvailable = is1155 && userTokens[0] ? Number(userTokens[0].ownership?.tokenCount || 1) : 1;
    const usdPrice = (0, $742accbc1cb453a5$export$2e2bcd8739ae039)(open ? "USD" : undefined, currency.symbol);
    const toggleMarketplace = (marketplace)=>{
        const updatedMarketplaces = marketplaces.map((market)=>{
            if (market.name == marketplace.name) return {
                ...market,
                isSelected: !market.isSelected
            };
            else return market;
        });
        const hasNonNativeMarketplace = updatedMarketplaces.find((marketplace)=>marketplace.isSelected && marketplace.orderbook !== "reservoir");
        if (hasNonNativeMarketplace) setQuantity(1);
        setMarketplaces(updatedMarketplaces);
    };
    const setMarketPrice = (price, market)=>{
        let updatedMarketplaces = marketplaces.map((marketplace)=>{
            if (marketplace.name == market.name) return {
                ...marketplace,
                price: price,
                truePrice: price
            };
            return marketplace;
        });
        setMarketplaces(updatedMarketplaces);
    };
    (0, $bNXjM$useEffect)(()=>{
        if (open && token && collection && !loadedInitalPrice && allMarketplaces.length > 0) {
            let updatedMarketplaces = allMarketplaces.map((marketplace)=>{
                const listingEnabled = $052d60b4fc42e2f9$var$isCurrencyAllowed(currency, marketplace, paymentTokens || [
                    chainCurrency
                ]);
                return {
                    ...marketplace,
                    price: "",
                    truePrice: "",
                    listingEnabled: listingEnabled,
                    isSelected: listingEnabled ? marketplace.isSelected : false
                };
            });
            setMarketplaces(updatedMarketplaces);
            setLoadedInitalPrice(true);
        }
    }, [
        token,
        collection,
        loadedInitalPrice,
        open,
        marketplaces.length
    ]);
    (0, $bNXjM$useEffect)(()=>{
        if (open && loadedInitalPrice) {
            let updatedMarketplaces = allMarketplaces.map((marketplace)=>{
                const listingEnabled = $052d60b4fc42e2f9$var$isCurrencyAllowed(currency, marketplace, paymentTokens || [
                    chainCurrency
                ]);
                return {
                    ...marketplace,
                    listingEnabled: listingEnabled,
                    isSelected: listingEnabled ? marketplace.isSelected : false
                };
            });
            setMarketplaces(updatedMarketplaces);
        }
    }, [
        open,
        currency,
        paymentTokens
    ]);
    (0, $bNXjM$useEffect)(()=>{
        if (marketplaces) setLocalMarketplace(marketplaces.find((marketplace)=>marketplace.orderbook === "reservoir") || null);
        else setLocalMarketplace(null);
    }, [
        marketplaces
    ]);
    (0, $bNXjM$useEffect)(()=>{
        if (!open) {
            setListStep($052d60b4fc42e2f9$export$7f4afd65e1e67072.SelectMarkets);
            setTransactionError(null);
            if (marketplaces.length > 0) setMarketplaces(marketplaces.map((marketplace)=>{
                return {
                    ...marketplace,
                    isSelected: marketplace.orderbook === "reservoir"
                };
            }));
            setLoadedInitalPrice(false);
            setStepData(null);
            setExpirationOption((0, $abb5dec08fcac72e$export$2e2bcd8739ae039)[5]);
            setQuantity(1);
        }
        setCurrency(currencies && currencies[0] ? currencies[0] : defaultCurrency);
    }, [
        open
    ]);
    (0, $bNXjM$useEffect)(()=>{
        if (currencies && currencies.length > 5) console.warn("The ListModal UI was designed to have a maximum of 5 currencies, going above 5 may degrade the user experience.");
    }, [
        currencies
    ]);
    const listToken = (0, $bNXjM$useCallback)(()=>{
        if (!signer) {
            const error = new Error("Missing a signer");
            setTransactionError(error);
            throw error;
        }
        if (!client) {
            const error = new Error("ZooClient was not initialized");
            setTransactionError(error);
            throw error;
        }
        setTransactionError(null);
        const listingData = [];
        let expirationTime = null;
        if (expirationOption.relativeTime && expirationOption.relativeTimeUnit) expirationTime = (0, $bNXjM$dayjs)().add(expirationOption.relativeTime, expirationOption.relativeTimeUnit).unix().toString();
        const contract = collectionId ? collectionId?.split(":")[0] : undefined;
        marketplaces.forEach((market)=>{
            if (market.isSelected) {
                const listing = {
                    token: `${contract}:${tokenId}`,
                    weiPrice: (0, $bNXjM$parseUnits)(`${+market.price}`, currency.decimals).mul(quantity).toString(),
                    //@ts-ignore
                    orderbook: market.orderbook,
                    //@ts-ignore
                    orderKind: market.orderKind
                };
                if (quantity > 1) listing.quantity = quantity;
                if (expirationTime) listing.expirationTime = expirationTime;
                if (currency && currency.contract != (0, $bNXjM$constants).AddressZero) listing.currency = currency.contract;
                listingData.push({
                    listing: listing,
                    marketplace: market
                });
            }
        });
        setListingData(listingData);
        setListStep($052d60b4fc42e2f9$export$7f4afd65e1e67072.ListItem);
        client.actions.listToken({
            listings: listingData.map((data)=>data.listing),
            signer: signer,
            onProgress: (steps)=>{
                const executableSteps = steps.filter((step)=>step.items && step.items.length > 0);
                let stepCount = executableSteps.length;
                let incompleteStepItemIndex = null;
                let incompleteStepIndex = null;
                executableSteps.find((step, i)=>{
                    if (!step.items) return false;
                    incompleteStepItemIndex = step.items.findIndex((item)=>item.status == "incomplete");
                    if (incompleteStepItemIndex !== -1) {
                        incompleteStepIndex = i;
                        return true;
                    }
                });
                if (incompleteStepIndex === null || incompleteStepItemIndex === null) {
                    const currentStep = executableSteps[executableSteps.length - 1];
                    const currentStepItem = currentStep.items ? currentStep.items[currentStep.items.length] : null;
                    setListStep($052d60b4fc42e2f9$export$7f4afd65e1e67072.Complete);
                    setStepData({
                        totalSteps: stepCount,
                        stepProgress: stepCount,
                        currentStep: currentStep,
                        listingData: currentStepItem && currentStepItem.orderIndex !== undefined ? listingData[currentStepItem.orderIndex] : listingData[listingData.length - 1]
                    });
                } else {
                    const currentStep = executableSteps[incompleteStepIndex];
                    const currentStepItem = currentStep.items ? currentStep.items[incompleteStepItemIndex] : null;
                    const listings = currentStepItem?.orderIndex !== undefined ? listingData[currentStepItem.orderIndex] : listingData[listingData.length - 1];
                    setStepData({
                        totalSteps: stepCount,
                        stepProgress: incompleteStepIndex,
                        currentStep: executableSteps[incompleteStepIndex],
                        listingData: listings
                    });
                }
            }
        }).catch((e)=>{
            const error = e;
            const transactionError = new Error(error?.message || "", {
                cause: error
            });
            setTransactionError(transactionError);
        });
    }, [
        client,
        marketplaces,
        signer,
        collectionId,
        tokenId,
        expirationOption,
        currency,
        quantity
    ]);
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$Fragment), {
        children: children({
            token: token,
            quantityAvailable: quantityAvailable,
            collection: collection,
            listStep: listStep,
            usdPrice: usdPrice,
            expirationOption: expirationOption,
            expirationOptions: $abb5dec08fcac72e$export$2e2bcd8739ae039,
            marketplaces: marketplaces,
            unapprovedMarketplaces: unapprovedMarketplaces,
            isFetchingUnapprovedMarketplaces: isFetchingUnapprovedMarketplaces,
            localMarketplace: localMarketplace,
            listingData: listingData,
            transactionError: transactionError,
            stepData: stepData,
            currencies: currencies || [
                defaultCurrency
            ],
            currency: currency,
            quantity: quantity,
            setListStep: setListStep,
            toggleMarketplace: toggleMarketplace,
            setMarketPrice: setMarketPrice,
            setCurrency: setCurrency,
            setExpirationOption: setExpirationOption,
            setQuantity: setQuantity,
            listToken: listToken
        })
    });
};
$052d60b4fc42e2f9$export$5cb91f178b51ac3.displayName = "ListModalRenderer";











const $f9fd95002ef41b13$var$optimizeImage = (imageHref, width)=>{
    if (!imageHref) return "";
    let url = new URL(imageHref);
    if (url.host === "lh3.googleusercontent.com") {
        if (imageHref.includes("=s") || imageHref.includes("=w")) {
            let newImage = imageHref.split("=");
            return `${newImage[0]}=w${width}`;
        }
        return `${imageHref}=w${width}`;
    }
    return imageHref;
};
var $f9fd95002ef41b13$export$2e2bcd8739ae039 = $f9fd95002ef41b13$var$optimizeImage;


const $80495cdca85acd8c$var$Img = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("img", {
    width: "100%",
    "@bp1": {
        height: 150,
        width: 150
    },
    borderRadius: "$borderRadius"
});
const $80495cdca85acd8c$var$Token = ({ token: token , collection: collection  })=>{
    const img = (0, $f9fd95002ef41b13$export$2e2bcd8739ae039)(token?.token?.image ? token.token.image : collection?.image, 600);
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
        css: {
            mr: "$4",
            width: 120,
            "@bp1": {
                mr: 0,
                width: "100%"
            }
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "subtitle2",
                color: "subtle",
                css: {
                    mb: "$1",
                    display: "block"
                },
                children: "Item"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)($80495cdca85acd8c$var$Img, {
                src: img,
                css: {
                    mb: "$2",
                    visibility: !img || img.length === 0 ? "hidden" : "visible",
                    objectFit: "cover"
                }
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "h6",
                css: {
                    flex: 1
                },
                as: "h6",
                ellipsify: true,
                children: token?.token?.name || `#${token?.token?.tokenId}`
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                    style: "subtitle2",
                    color: "subtle",
                    as: "p",
                    ellipsify: true,
                    children: token?.token?.collection?.name
                })
            })
        ]
    });
};
var $80495cdca85acd8c$export$2e2bcd8739ae039 = $80495cdca85acd8c$var$Token;









const $39af25d905d8680a$var$FormatWrappedCurrency = ({ logoWidth: logoWidth , ...props })=>{
    const { chain: activeChain , chains: chains  } = (0, $bNXjM$useNetwork)();
    let chain = chains.find((chain)=>activeChain?.id === chain.id);
    if (!chain && chains.length > 0) chain = chains[0];
    else chain = activeChain;
    const contractAddress = chain?.id !== undefined && chain.id in (0, $412f709ff46d543e$export$2e2bcd8739ae039) ? (0, $412f709ff46d543e$export$2e2bcd8739ae039)[chain.id] : (0, $412f709ff46d543e$export$2e2bcd8739ae039)[1];
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
        ...props,
        address: contractAddress
    });
};
var $39af25d905d8680a$export$2e2bcd8739ae039 = $39af25d905d8680a$var$FormatWrappedCurrency;


const $54a2afd53a200e25$var$Stat = ({ label: label , value: value , asNative: asNative = false , asWrapped: asWrapped = false , ...props })=>/*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        align: "center",
        justify: "between",
        className: "rk-stat-well",
        css: {
            backgroundColor: "$wellBackground",
            p: "$2",
            borderRadius: "$borderRadius",
            overflow: "hidden"
        },
        ...props,
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                css: {
                    flex: 1,
                    minWidth: "0",
                    alignItems: "center",
                    gap: "$2",
                    mr: "$1"
                },
                children: label
            }),
            asNative && !asWrapped && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                amount: value,
                textStyle: "subtitle2"
            }),
            asWrapped && !asNative && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $39af25d905d8680a$export$2e2bcd8739ae039), {
                amount: value,
                textStyle: "subtitle2"
            }),
            !asNative && !asWrapped && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "subtitle2",
                as: "p",
                css: {
                    marginLeft: "$2"
                },
                ellipsify: true,
                children: value ? value : "-"
            })
        ]
    });
$54a2afd53a200e25$var$Stat.toString = ()=>".rk-stat-well";
var $54a2afd53a200e25$export$2e2bcd8739ae039 = $54a2afd53a200e25$var$Stat;







const $f1a77cb69cf0ff83$var$InfoTooltip = ({ side: side , content: content , width: width , kind: kind = "info"  })=>{
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $364926f073e51b94$export$2e2bcd8739ae039), {
        side: side,
        width: width,
        content: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
            style: "body2",
            as: "p",
            children: content
        }),
        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
            css: {
                color: kind === "error" ? "$errorAccent" : "$neutralText"
            },
            children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                icon: (0, $bNXjM$faInfoCircle)
            })
        })
    });
};
var $f1a77cb69cf0ff83$export$2e2bcd8739ae039 = $f1a77cb69cf0ff83$var$InfoTooltip;


const $519a41638a8ab3e1$var$TokenStats = ({ token: token , collection: collection  })=>{
    let attributeFloor = token?.token?.attributes ? Math.max(...token.token.attributes.map((attr)=>Number(attr.floorAskPrice)), 0) : 0;
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        css: {
            width: "100%",
            flexDirection: "row",
            "@bp1": {
                width: 220,
                flexDirection: "column"
            },
            p: "$4"
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $80495cdca85acd8c$export$2e2bcd8739ae039), {
                collection: collection,
                token: token
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                css: {
                    flex: 1,
                    mt: "$4",
                    [`& ${0, $54a2afd53a200e25$export$2e2bcd8739ae039}:not(:last-child)`]: {
                        mb: "$1"
                    },
                    mb: "$3"
                },
                children: [
                    {
                        id: 0,
                        label: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                            children: [
                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                    style: "subtitle2",
                                    color: "subtle",
                                    css: {
                                        minWidth: "0"
                                    },
                                    ellipsify: true,
                                    children: "Creator Royalties"
                                }),
                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f1a77cb69cf0ff83$export$2e2bcd8739ae039), {
                                    side: "right",
                                    width: 200,
                                    content: "A fee on every order that goes to the collection creator."
                                })
                            ]
                        }),
                        value: (collection?.royalties?.bps || 0) * 0.01 + "%"
                    },
                    {
                        id: 1,
                        label: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                            style: "subtitle2",
                            color: "subtle",
                            css: {
                                minWidth: "0"
                            },
                            ellipsify: true,
                            children: "Last Sale"
                        }),
                        value: token?.token?.lastSell?.value || null,
                        asNative: true
                    },
                    {
                        id: 2,
                        label: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                            style: "subtitle2",
                            color: "subtle",
                            css: {
                                minWidth: "0"
                            },
                            ellipsify: true,
                            children: "Collection Floor"
                        }),
                        value: collection?.floorAsk?.price?.amount?.native || 0,
                        asNative: true
                    },
                    {
                        id: 3,
                        label: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                            children: [
                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                    style: "subtitle2",
                                    color: "subtle",
                                    css: {
                                        minWidth: "0"
                                    },
                                    ellipsify: true,
                                    children: "Highest Trait Floor"
                                }),
                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f1a77cb69cf0ff83$export$2e2bcd8739ae039), {
                                    side: "right",
                                    width: 200,
                                    content: "The floor price of the most valuable trait of a token."
                                })
                            ]
                        }),
                        value: attributeFloor || collection?.floorAsk?.price?.amount?.native || 0,
                        asNative: true
                    }
                ].map((stat)=>/*#__PURE__*/ (0, $bNXjM$jsx)((0, $54a2afd53a200e25$export$2e2bcd8739ae039), {
                        ...stat
                    }, stat.id))
            })
        ]
    });
};
var $519a41638a8ab3e1$export$2e2bcd8739ae039 = $519a41638a8ab3e1$var$TokenStats;








const $fb67612d0e69ecfd$var$StyledSwitch = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Root3, {
    all: "unset",
    cursor: "pointer",
    width: 46,
    height: 24,
    backgroundColor: "$neutralBgActive",
    borderRadius: "9999px",
    position: "relative",
    transition: "background-color 250ms linear",
    $$focusColor: "$colors$accentBorder",
    '&[data-state="checked"]': {
        backgroundColor: "$accentSolid"
    },
    "&:focus-visible": {
        boxShadow: "0 0 0 2px $$focusColor"
    }
});
const $fb67612d0e69ecfd$var$Thumb = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Thumb, {
    display: "block",
    width: 20,
    height: 20,
    backgroundColor: "$buttonTextColor",
    borderRadius: "9999px",
    transition: "transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transform: "translateX(4px)",
    willChange: "transform",
    $$borderColor: "$borderColor",
    //boxShadow: '0 0 0 1px $$borderColor',
    '&[data-state="checked"]': {
        transform: "translateX(22px)"
    }
});
const $fb67612d0e69ecfd$var$Switch = (props)=>/*#__PURE__*/ (0, $bNXjM$jsx)($fb67612d0e69ecfd$var$StyledSwitch, {
        ...props,
        children: /*#__PURE__*/ (0, $bNXjM$jsx)($fb67612d0e69ecfd$var$Thumb, {})
    });
var $fb67612d0e69ecfd$export$2e2bcd8739ae039 = $fb67612d0e69ecfd$var$Switch;


const $5c16ecaec8679bd8$var$MarketplaceToggle = ({ marketplace: marketplace , onSelection: onSelection , ...props })=>/*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        ...props,
        align: "center",
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                css: {
                    mr: "$2"
                },
                children: /*#__PURE__*/ (0, $bNXjM$jsx)("img", {
                    src: marketplace.imageUrl,
                    style: {
                        height: 32,
                        width: 32,
                        borderRadius: 4
                    }
                })
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "body3",
                css: {
                    flex: 1
                },
                children: marketplace.name
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "subtitle2",
                color: "subtle",
                css: {
                    mr: "$2"
                },
                children: [
                    "Marketplace fee: ",
                    (marketplace.feeBps || 0) * 100,
                    "%"
                ]
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $fb67612d0e69ecfd$export$2e2bcd8739ae039), {
                checked: marketplace.isSelected,
                onCheckedChange: onSelection
            })
        ]
    });
var $5c16ecaec8679bd8$export$2e2bcd8739ae039 = $5c16ecaec8679bd8$var$MarketplaceToggle;






const $ddb0bb2694bbe877$var$MarketplacePriceInput = ({ marketplace: marketplace , collection: collection , currency: currency , usdPrice: usdPrice , quantity: quantity = 1 , onChange: onChange , onBlur: onBlur , ...props })=>{
    let profit = (1 - (marketplace.fee?.percent || 0) / 100 - (collection?.royalties?.bps || 0) * 0.0001) * Number(marketplace.truePrice) * quantity;
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        ...props,
        align: "center",
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                css: {
                    mr: "$2"
                },
                children: /*#__PURE__*/ (0, $bNXjM$jsx)("img", {
                    src: marketplace.imageUrl,
                    style: {
                        height: 32,
                        width: 32,
                        borderRadius: 4
                    }
                })
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                align: "center",
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                        css: {
                            width: "auto",
                            height: 20
                        },
                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bb13850b05622906$export$2e2bcd8739ae039), {
                            css: {
                                height: 18
                            },
                            address: currency.contract
                        })
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                        style: "body1",
                        color: "subtle",
                        css: {
                            ml: "$1",
                            mr: "$4"
                        },
                        as: "p",
                        children: currency.symbol
                    })
                ]
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                css: {
                    flex: 1
                },
                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a235eda53948b6ff$export$2e2bcd8739ae039), {
                    type: "number",
                    value: marketplace.price,
                    onChange: onChange,
                    onBlur: onBlur,
                    placeholder: "Enter a listing price"
                })
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                direction: "column",
                align: "end",
                css: {
                    ml: "$3"
                },
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                        amount: profit,
                        address: currency.contract,
                        decimals: currency.decimals,
                        textStyle: "h6",
                        logoWidth: 18
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $208ab5b0155991db$export$2e2bcd8739ae039), {
                        amount: profit * (usdPrice || 0),
                        style: "subtitle2",
                        color: "subtle"
                    })
                ]
            })
        ]
    });
};
var $ddb0bb2694bbe877$export$2e2bcd8739ae039 = $ddb0bb2694bbe877$var$MarketplacePriceInput;














(0, $bNXjM$dayjs).extend((0, $bNXjM$dayjspluginrelativeTimejs));
function $c952bf73c842abfc$export$2e2bcd8739ae039(timestamp) {
    const [timeSince, setTimeSince] = (0, $bNXjM$useState)("");
    (0, $bNXjM$useEffect)(()=>{
        if (timestamp) setTimeSince((0, $bNXjM$dayjs).unix(timestamp).fromNow());
        else setTimeSince("");
    }, [
        timestamp
    ]);
    return timeSince;
}


const $795f98f363cfb9c9$var$Img = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("img", {
    width: 16,
    height: 16
});
const $795f98f363cfb9c9$var$ListingStat = ({ listing: listing , marketImg: marketImg , currency: currency , ...props })=>{
    const timeSince = (0, $c952bf73c842abfc$export$2e2bcd8739ae039)(listing.expirationTime ? +listing.expirationTime : 0);
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        direction: "column",
        className: "rk-stat-well",
        css: {
            backgroundColor: "$wellBackground",
            p: "$2",
            borderRadius: "$borderRadius",
            gap: "$1"
        },
        ...props,
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                justify: "between",
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                        amount: listing.weiPrice,
                        textStyle: "subtitle2",
                        address: currency.contract,
                        decimals: currency.decimals
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)($795f98f363cfb9c9$var$Img, {
                        src: marketImg
                    })
                ]
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "subtitle2",
                color: "subtle",
                as: "p",
                css: {
                    flex: 1
                },
                children: listing.expirationTime ? `Expires ${timeSince}` : "No Expiration"
            })
        ]
    });
};
$795f98f363cfb9c9$var$ListingStat.toString = ()=>".rk-stat-well";
var $795f98f363cfb9c9$export$2e2bcd8739ae039 = $795f98f363cfb9c9$var$ListingStat;


const $f13a27bb3fdcaf1d$var$TokenListingDetails = ({ token: token , collection: collection , listingData: listingData , currency: currency  })=>/*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        css: {
            width: "100%",
            flexDirection: "row",
            "@bp1": {
                width: 220,
                flexDirection: "column"
            },
            p: "$4"
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $80495cdca85acd8c$export$2e2bcd8739ae039), {
                collection: collection,
                token: token
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                css: {
                    flex: 1,
                    mt: "$4",
                    [`& ${0, $54a2afd53a200e25$export$2e2bcd8739ae039}:not(:last-child)`]: {
                        mb: "$1"
                    },
                    mb: "$3"
                },
                children: listingData.map((data, i)=>/*#__PURE__*/ (0, $bNXjM$jsx)((0, $795f98f363cfb9c9$export$2e2bcd8739ae039), {
                        listing: data.listing,
                        marketImg: data.marketplace.imageUrl || "",
                        currency: currency
                    }, i))
            })
        ]
    });
var $f13a27bb3fdcaf1d$export$2e2bcd8739ae039 = $f13a27bb3fdcaf1d$var$TokenListingDetails;







const $10061c592b503910$var$Img = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("img", {
    width: 56,
    height: 56,
    borderRadius: 4,
    objectFit: "cover"
});
const $10061c592b503910$var$ProgressDot = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
    borderRadius: "50%",
    width: 5,
    height: 5
});
const $10061c592b503910$var$loadingStart = (0, $fcefeedae0fec8b6$export$d25ddfdf17c3ad3e)({
    "0%": {
        transform: "scale(0.8)",
        backgroundColor: "$neutralSolid"
    },
    "20%": {
        transform: "scale(1)",
        backgroundColor: "$accentText"
    },
    "100%": {
        transform: "scale(0.8)",
        backgroundColor: "$neutralSolid"
    }
});
const $10061c592b503910$var$loadingMiddle = (0, $fcefeedae0fec8b6$export$d25ddfdf17c3ad3e)({
    "0%": {
        transform: "scale(0.8)",
        backgroundColor: "$neutralSolid"
    },
    "20%": {
        transform: "scale(0.8)",
        backgroundColor: "$neutralSolid"
    },
    "40%": {
        transform: "scale(1)",
        backgroundColor: "$accentText"
    },
    "100%": {
        transform: "scale(0.8)",
        backgroundColor: "$neutralSolid"
    }
});
const $10061c592b503910$var$loadingEnd = (0, $fcefeedae0fec8b6$export$d25ddfdf17c3ad3e)({
    "0%": {
        transform: "scale(0.8)",
        backgroundColor: "$neutralSolid"
    },
    "40%": {
        transform: "scale(0.8)",
        backgroundColor: "$neutralSolid"
    },
    "60%": {
        transform: "scale(1)",
        backgroundColor: "$accentText"
    },
    "100%": {
        transform: "scale(0.8)",
        backgroundColor: "$neutralSolid"
    }
});
const $10061c592b503910$var$TransactionProgress = ({ fromImg: fromImg , toImg: toImg , ...props })=>{
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        ...props,
        align: "center",
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)($10061c592b503910$var$Img, {
                src: fromImg
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                css: {
                    gap: "$1",
                    mx: 23
                },
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)($10061c592b503910$var$ProgressDot, {
                        css: {
                            animation: `${$10061c592b503910$var$loadingStart} 1s ease-in-out infinite`
                        }
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)($10061c592b503910$var$ProgressDot, {
                        css: {
                            animation: `${$10061c592b503910$var$loadingMiddle} 1s ease-in-out infinite`
                        }
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)($10061c592b503910$var$ProgressDot, {
                        css: {
                            animation: `${$10061c592b503910$var$loadingEnd} 1s ease-in-out infinite`
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)($10061c592b503910$var$Img, {
                src: toImg
            })
        ]
    });
};
var $10061c592b503910$export$2e2bcd8739ae039 = $10061c592b503910$var$TransactionProgress;





const $a93b26d073373c23$var$Image = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("img", {});
const $a93b26d073373c23$var$Span = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("span", {});
const $a93b26d073373c23$var$ContentContainer = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
    width: "100%",
    flexDirection: "column",
    "@bp1": {
        flexDirection: "row"
    }
});
const $a93b26d073373c23$var$MainContainer = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
    flex: 1,
    borderColor: "$borderColor",
    borderTopWidth: 1,
    borderLeftWidth: 0,
    "@bp1": {
        borderTopWidth: 0,
        borderLeftWidth: 1
    },
    defaultVariants: {
        direction: "column"
    }
});
const $a93b26d073373c23$var$MINIMUM_AMOUNT = 0.000001;
function $a93b26d073373c23$export$d23efc006864db2f({ openState: openState , trigger: trigger , tokenId: tokenId , collectionId: collectionId , currencies: currencies , nativeOnly: nativeOnly , normalizeRoyalties: normalizeRoyalties , onGoToToken: onGoToToken , onListingComplete: onListingComplete , onListingError: onListingError , onClose: onClose  }) {
    const [open, setOpen] = (0, $d115e0b00eaf4565$export$2e2bcd8739ae039)(openState ? openState[0] : false, openState);
    const [stepTitle, setStepTitle] = (0, $bNXjM$useState)("");
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const reservoirChain = client?.currentChain();
    const [marketplacesToApprove, setMarketplacesToApprove] = (0, $bNXjM$useState)([]);
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $052d60b4fc42e2f9$export$5cb91f178b51ac3), {
        open: open,
        tokenId: tokenId,
        collectionId: collectionId,
        currencies: currencies,
        normalizeRoyalties: normalizeRoyalties,
        children: ({ token: token , quantityAvailable: quantityAvailable , collection: collection , usdPrice: usdPrice , listStep: listStep , expirationOption: expirationOption , expirationOptions: expirationOptions , marketplaces: marketplaces , unapprovedMarketplaces: unapprovedMarketplaces , localMarketplace: localMarketplace , listingData: listingData , transactionError: transactionError , stepData: stepData , currencies: currencies , currency: currency , quantity: quantity , setListStep: setListStep , listToken: listToken , setMarketPrice: setMarketPrice , setCurrency: setCurrency , toggleMarketplace: toggleMarketplace , setExpirationOption: setExpirationOption , setQuantity: setQuantity  })=>{
            const tokenImage = token && token.token?.image ? token.token.image : collection?.image;
            (0, $bNXjM$useEffect)(()=>{
                if (stepData) {
                    const isNativeOrder = stepData.listingData.marketplace.orderbook === "reservoir";
                    const isSeaportOrder = stepData.listingData.marketplace.orderKind === "seaport";
                    const marketplaceName = isNativeOrder && isSeaportOrder ? `${stepData.listingData.marketplace.name} (on Seaport)` : stepData.listingData.marketplace.name;
                    switch(stepData.currentStep.kind){
                        case "transaction":
                            setStepTitle(`Approve ${marketplaceName} to access item\nin your wallet`);
                            break;
                        case "signature":
                            setStepTitle(`Confirm listing on ${marketplaceName}\nin your wallet`);
                            break;
                    }
                }
            }, [
                stepData
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (unapprovedMarketplaces.length > 0) {
                    const unapprovedNames = unapprovedMarketplaces.reduce((names, marketplace)=>{
                        if (marketplace.name && localMarketplace?.orderKind !== marketplace.orderKind) names.push(marketplace.name);
                        return names;
                    }, []);
                    setMarketplacesToApprove(marketplaces.filter((marketplace)=>marketplace.isSelected && marketplace.name && unapprovedNames.includes(marketplace.name)));
                } else setMarketplacesToApprove([]);
            }, [
                unapprovedMarketplaces,
                marketplaces,
                localMarketplace
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (listStep === (0, $052d60b4fc42e2f9$export$7f4afd65e1e67072).Complete && onListingComplete) {
                    const data = {
                        tokenId: tokenId,
                        collectionId: collectionId,
                        listings: listingData
                    };
                    onListingComplete(data);
                }
            }, [
                listStep
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (transactionError && onListingError) {
                    const data = {
                        tokenId: tokenId,
                        collectionId: collectionId,
                        listings: listingData
                    };
                    onListingError(transactionError, data);
                }
            }, [
                transactionError
            ]);
            const availableMarketplaces = marketplaces.filter((market)=>{
                const isNative = market.orderbook === "reservoir";
                return nativeOnly ? market.listingEnabled && isNative : market.listingEnabled;
            });
            const selectedMarketplaces = availableMarketplaces.filter((marketplace)=>marketplace.isSelected);
            const quantitySelectionAvailable = selectedMarketplaces.every((marketplace)=>marketplace.orderbook === "reservoir" || marketplace.orderbook === "opensea");
            return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $b86bf9f1e9f1a187$export$2b77a92f1a5ad772), {
                trigger: trigger,
                size: (0, $b86bf9f1e9f1a187$export$e8598848ef5f29c0).LG,
                title: "List Item for sale",
                open: open,
                onOpenChange: (open)=>{
                    if (!open && onClose) {
                        const data = {
                            tokenId: tokenId,
                            collectionId: collectionId,
                            listings: listingData
                        };
                        onClose(data, stepData, listStep);
                    }
                    setOpen(open);
                },
                loading: !token,
                children: [
                    token && listStep == (0, $052d60b4fc42e2f9$export$7f4afd65e1e67072).SelectMarkets && /*#__PURE__*/ (0, $bNXjM$jsxs)($a93b26d073373c23$var$ContentContainer, {
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $519a41638a8ab3e1$export$2e2bcd8739ae039), {
                                token: token,
                                collection: collection
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)($a93b26d073373c23$var$MainContainer, {
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                        css: {
                                            p: "$4",
                                            flex: 1
                                        },
                                        children: [
                                            currencies.length > 1 ? /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "subtitle1",
                                                as: (0, $a08469b1b360d6cf$export$2e2bcd8739ae039),
                                                css: {
                                                    mb: "$4",
                                                    gap: "$2",
                                                    alignItems: "center"
                                                },
                                                children: [
                                                    "List item in",
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039), {
                                                        trigger: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).Trigger, {
                                                            css: {
                                                                width: "auto",
                                                                p: 0,
                                                                backgroundColor: "transparent"
                                                            },
                                                            children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).Value, {
                                                                asChild: true,
                                                                children: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                                    align: "center",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bb13850b05622906$export$2e2bcd8739ae039), {
                                                                            address: currency.contract,
                                                                            css: {
                                                                                height: 18
                                                                            }
                                                                        }),
                                                                        /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                                            style: "subtitle1",
                                                                            color: "subtle",
                                                                            css: {
                                                                                ml: "$1"
                                                                            },
                                                                            children: currency.symbol
                                                                        }),
                                                                        /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).DownIcon, {
                                                                            style: {
                                                                                marginLeft: 6
                                                                            }
                                                                        })
                                                                    ]
                                                                })
                                                            })
                                                        }),
                                                        value: currency.contract,
                                                        onValueChange: (value)=>{
                                                            const option = currencies.find((option)=>option.contract == value);
                                                            if (option) setCurrency(option);
                                                        },
                                                        children: currencies.map((option)=>/*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).Item, {
                                                                value: option.contract,
                                                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).ItemText, {
                                                                    children: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                                        align: "center",
                                                                        css: {
                                                                            gap: "$1"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bb13850b05622906$export$2e2bcd8739ae039), {
                                                                                address: option.contract,
                                                                                css: {
                                                                                    height: 18
                                                                                }
                                                                            }),
                                                                            option.symbol
                                                                        ]
                                                                    })
                                                                })
                                                            }, option.contract))
                                                    })
                                                ]
                                            }) : /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "subtitle1",
                                                as: "h3",
                                                css: {
                                                    mb: "$4"
                                                },
                                                children: availableMarketplaces.length > 1 ? "Select Marketplaces" : "Available Marketplace"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "subtitle2",
                                                as: "p",
                                                color: "subtle",
                                                children: "Default"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                align: "center",
                                                css: {
                                                    mb: "$4",
                                                    mt: "$2"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                        css: {
                                                            mr: "$2"
                                                        },
                                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)("img", {
                                                            src: localMarketplace?.imageUrl || "",
                                                            style: {
                                                                height: 32,
                                                                width: 32,
                                                                borderRadius: 4,
                                                                visibility: localMarketplace?.imageUrl ? "visible" : "hidden"
                                                            }
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                        css: {
                                                            mr: "$2",
                                                            flex: 1
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                                style: "body3",
                                                                children: localMarketplace?.name
                                                            }),
                                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                                css: {
                                                                    alignItems: "center",
                                                                    gap: 8
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                                        style: "body3",
                                                                        color: "subtle",
                                                                        as: "div",
                                                                        children: "on Zoo"
                                                                    }),
                                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f1a77cb69cf0ff83$export$2e2bcd8739ae039), {
                                                                        side: "bottom",
                                                                        width: 200,
                                                                        content: "Listings made on this marketplace will be distributed across the reservoir ecosystem"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                        style: "subtitle2",
                                                        color: "subtle",
                                                        css: {
                                                            mr: "$2"
                                                        },
                                                        children: [
                                                            "Marketplace fee:",
                                                            " ",
                                                            (localMarketplace?.fee?.bps || 0) / 10000 * 100,
                                                            "%"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            availableMarketplaces.length > 1 && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "subtitle2",
                                                color: "subtle",
                                                as: "p",
                                                css: {
                                                    mb: "$2"
                                                },
                                                children: "Select other marketplaces to list on"
                                            }),
                                            availableMarketplaces.filter((marketplace)=>marketplace.orderbook !== "reservoir").map((marketplace)=>/*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                    css: {
                                                        mb: "$3"
                                                    },
                                                    children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $5c16ecaec8679bd8$export$2e2bcd8739ae039), {
                                                        marketplace: marketplace,
                                                        onSelection: ()=>{
                                                            toggleMarketplace(marketplace);
                                                        }
                                                    })
                                                }, marketplace.name))
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                        css: {
                                            p: "$4",
                                            width: "100%"
                                        },
                                        children: [
                                            marketplacesToApprove.length > 0 && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                color: "accent",
                                                style: "subtitle2",
                                                css: {
                                                    my: 10,
                                                    width: "100%",
                                                    textAlign: "center",
                                                    display: "block"
                                                },
                                                children: `Additional Gas fee required to approve listing (${marketplacesToApprove.map((marketplace)=>marketplace.name).join(", ")})`
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                                onClick: ()=>setListStep((0, $052d60b4fc42e2f9$export$7f4afd65e1e67072).SetPrice),
                                                css: {
                                                    width: "100%"
                                                },
                                                children: "Set your price"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    token && listStep == (0, $052d60b4fc42e2f9$export$7f4afd65e1e67072).SetPrice && /*#__PURE__*/ (0, $bNXjM$jsxs)($a93b26d073373c23$var$ContentContainer, {
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $519a41638a8ab3e1$export$2e2bcd8739ae039), {
                                token: token,
                                collection: collection
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)($a93b26d073373c23$var$MainContainer, {
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                        css: {
                                            p: "$4",
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                align: "center",
                                                css: {
                                                    mb: "$4"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                                        color: "ghost",
                                                        size: "none",
                                                        css: {
                                                            mr: "$2",
                                                            color: "$neutralText"
                                                        },
                                                        onClick: ()=>setListStep((0, $052d60b4fc42e2f9$export$7f4afd65e1e67072).SelectMarkets),
                                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                                            icon: (0, $bNXjM$faChevronLeft),
                                                            width: 16,
                                                            height: 16
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                        style: "subtitle1",
                                                        as: "h3",
                                                        children: "Set Your Price"
                                                    })
                                                ]
                                            }),
                                            quantityAvailable > 1 && quantitySelectionAvailable && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                        css: {
                                                            mb: "$2"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                                as: "div",
                                                                css: {
                                                                    mb: "$2"
                                                                },
                                                                style: "subtitle2",
                                                                color: "subtle",
                                                                children: "Quantity"
                                                            }),
                                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039), {
                                                                value: `${quantity}`,
                                                                onValueChange: (value)=>{
                                                                    setQuantity(Number(value));
                                                                },
                                                                children: [
                                                                    ...Array(quantityAvailable)
                                                                ].map((_a, i)=>/*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).Item, {
                                                                        value: `${i + 1}`,
                                                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).ItemText, {
                                                                            children: i + 1
                                                                        })
                                                                    }, i))
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                        style: "body2",
                                                        css: {
                                                            mb: 24,
                                                            display: "inline-block"
                                                        },
                                                        children: [
                                                            quantityAvailable,
                                                            " items available"
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                css: {
                                                    mb: "$2"
                                                },
                                                justify: "between",
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                        style: "subtitle2",
                                                        color: "subtle",
                                                        as: "p",
                                                        children: quantityAvailable > 1 && quantitySelectionAvailable ? "Unit Price" : "Price"
                                                    }),
                                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                        css: {
                                                            alignItems: "center",
                                                            gap: 8
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                                style: "subtitle2",
                                                                color: "subtle",
                                                                as: "p",
                                                                children: quantityAvailable > 1 && quantitySelectionAvailable ? "Total Profit" : "Profit"
                                                            }),
                                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f1a77cb69cf0ff83$export$2e2bcd8739ae039), {
                                                                side: "left",
                                                                width: 200,
                                                                content: `How much ${currency.symbol} you will receive after marketplace fees and creator royalties are subtracted.`
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            selectedMarketplaces.map((marketplace)=>/*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                    css: {
                                                        mb: "$3"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, $bNXjM$jsx)((0, $ddb0bb2694bbe877$export$2e2bcd8739ae039), {
                                                            marketplace: marketplace,
                                                            collection: collection,
                                                            currency: currency,
                                                            usdPrice: usdPrice,
                                                            quantity: quantity,
                                                            onChange: (e)=>{
                                                                setMarketPrice(e.target.value, marketplace);
                                                            },
                                                            onBlur: ()=>{
                                                                if (marketplace.price === "") setMarketPrice(0, marketplace);
                                                            }
                                                        }),
                                                        marketplace.truePrice !== "" && marketplace.truePrice !== null && Number(marketplace.truePrice) !== 0 && Number(marketplace.truePrice) < $a93b26d073373c23$var$MINIMUM_AMOUNT && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                            children: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                                style: "body2",
                                                                color: "error",
                                                                children: [
                                                                    "Amount must be higher than ",
                                                                    $a93b26d073373c23$var$MINIMUM_AMOUNT
                                                                ]
                                                            })
                                                        }),
                                                        collection && collection?.floorAsk?.price?.amount?.native !== undefined && marketplace.truePrice !== "" && marketplace.truePrice !== null && Number(marketplace.truePrice) !== 0 && Number(marketplace.truePrice) >= $a93b26d073373c23$var$MINIMUM_AMOUNT && currency.contract === (0, $bNXjM$constants).AddressZero && Number(marketplace.truePrice) < collection?.floorAsk?.price.amount.native && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                            children: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                                style: "body2",
                                                                color: "error",
                                                                children: [
                                                                    "Price is",
                                                                    " ",
                                                                    Math.round((collection.floorAsk.price.amount.native - +marketplace.truePrice) / ((collection.floorAsk.price.amount.native + +marketplace.truePrice) / 2) * 100000) / 1000,
                                                                    "% below the floor"
                                                                ]
                                                            })
                                                        })
                                                    ]
                                                }, marketplace.name)),
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                css: {
                                                    mb: "$3",
                                                    mt: "$4"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                        as: "div",
                                                        css: {
                                                            mb: "$2"
                                                        },
                                                        style: "subtitle2",
                                                        color: "subtle",
                                                        children: "Expiration Date"
                                                    }),
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039), {
                                                        value: expirationOption?.text || "",
                                                        onValueChange: (value)=>{
                                                            const option = expirationOptions.find((option)=>option.value == value);
                                                            if (option) setExpirationOption(option);
                                                        },
                                                        children: expirationOptions.map((option)=>/*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).Item, {
                                                                value: option.value,
                                                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).ItemText, {
                                                                    children: option.text
                                                                })
                                                            }, option.text))
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                        css: {
                                            p: "$4",
                                            width: "100%"
                                        },
                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                            disabled: selectedMarketplaces.some((marketplace)=>marketplace.price === "" || marketplace.price == 0 || Number(marketplace.price) < $a93b26d073373c23$var$MINIMUM_AMOUNT),
                                            onClick: listToken,
                                            css: {
                                                width: "100%"
                                            },
                                            children: "List for sale"
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    token && listStep == (0, $052d60b4fc42e2f9$export$7f4afd65e1e67072).ListItem && /*#__PURE__*/ (0, $bNXjM$jsxs)($a93b26d073373c23$var$ContentContainer, {
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f13a27bb3fdcaf1d$export$2e2bcd8739ae039), {
                                token: token,
                                collection: collection,
                                listingData: listingData,
                                currency: currency
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)($a93b26d073373c23$var$MainContainer, {
                                css: {
                                    p: "$4"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $fe4973a3dd519dab$export$2e2bcd8739ae039), {
                                        value: stepData?.stepProgress || 0,
                                        max: stepData?.totalSteps || 0
                                    }),
                                    transactionError && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $4c76c4b4e6d5247c$export$2e2bcd8739ae039), {
                                        css: {
                                            mt: 24
                                        }
                                    }),
                                    stepData && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                css: {
                                                    textAlign: "center",
                                                    mt: 48,
                                                    mb: 28
                                                },
                                                style: "subtitle1",
                                                children: stepTitle
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $10061c592b503910$export$2e2bcd8739ae039), {
                                                justify: "center",
                                                fromImg: tokenImage,
                                                toImg: stepData?.listingData.marketplace.imageUrl || ""
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                css: {
                                                    textAlign: "center",
                                                    mt: 24,
                                                    maxWidth: 395,
                                                    mx: "auto",
                                                    mb: "$4"
                                                },
                                                style: "body3",
                                                color: "subtle",
                                                children: stepData?.currentStep.description
                                            })
                                        ]
                                    }),
                                    !stepData && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            height: "100%"
                                        },
                                        justify: "center",
                                        align: "center",
                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {})
                                    }),
                                    !transactionError && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                        css: {
                                            width: "100%",
                                            mt: "auto"
                                        },
                                        disabled: true,
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {}),
                                            "Waiting for Approval"
                                        ]
                                    }),
                                    transactionError && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            mt: "auto",
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                                color: "secondary",
                                                css: {
                                                    flex: 1
                                                },
                                                onClick: ()=>setListStep((0, $052d60b4fc42e2f9$export$7f4afd65e1e67072).SetPrice),
                                                children: "Edit Listing"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                                css: {
                                                    flex: 1
                                                },
                                                onClick: ()=>listToken(),
                                                children: "Retry"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    token && listStep == (0, $052d60b4fc42e2f9$export$7f4afd65e1e67072).Complete && /*#__PURE__*/ (0, $bNXjM$jsxs)($a93b26d073373c23$var$ContentContainer, {
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f13a27bb3fdcaf1d$export$2e2bcd8739ae039), {
                                token: token,
                                collection: collection,
                                listingData: listingData,
                                currency: currency
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)($a93b26d073373c23$var$MainContainer, {
                                css: {
                                    p: "$4"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $fe4973a3dd519dab$export$2e2bcd8739ae039), {
                                        value: stepData?.totalSteps || 0,
                                        max: stepData?.totalSteps || 0
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        align: "center",
                                        justify: "center",
                                        direction: "column",
                                        css: {
                                            flex: 1,
                                            textAlign: "center",
                                            py: "$5"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                css: {
                                                    color: "$successAccent",
                                                    mb: 24
                                                },
                                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                                    icon: (0, $bNXjM$faCheckCircle),
                                                    size: "3x"
                                                })
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "h5",
                                                css: {
                                                    mb: "$2"
                                                },
                                                as: "h5",
                                                children: "Your item has been listed!"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "body3",
                                                color: "subtle",
                                                as: "p",
                                                css: {
                                                    mb: 24,
                                                    maxWidth: 300,
                                                    overflow: "hidden"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                        color: "accent",
                                                        ellipsify: true,
                                                        style: "body3",
                                                        children: token?.token?.name ? token?.token?.name : `#${token?.token?.tokenId}`
                                                    }),
                                                    " ",
                                                    "from",
                                                    " ",
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)($a93b26d073373c23$var$Span, {
                                                        css: {
                                                            color: "$accentText"
                                                        },
                                                        children: token?.token?.collection?.name
                                                    }),
                                                    " ",
                                                    "has been listed for sale"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "subtitle2",
                                                as: "p",
                                                css: {
                                                    mb: "$3"
                                                },
                                                children: "View Listing on"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                css: {
                                                    gap: "$3"
                                                },
                                                children: listingData.map((data)=>{
                                                    const source = data.listing.orderbook === "reservoir" && client?.source ? client?.source : data.marketplace.name;
                                                    return /*#__PURE__*/ (0, $bNXjM$jsx)("a", {
                                                        target: "_blank",
                                                        href: `${reservoirChain?.baseApiUrl}/redirect/sources/${source}/tokens/${token.token?.contract}:${token?.token?.tokenId}/link/v2`,
                                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)($a93b26d073373c23$var$Image, {
                                                            css: {
                                                                width: 24
                                                            },
                                                            src: data.marketplace.imageUrl
                                                        })
                                                    }, data.listing.orderbook);
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            flexDirection: "column",
                                            gap: "$3",
                                            "@bp1": {
                                                flexDirection: "row"
                                            }
                                        },
                                        children: !!onGoToToken ? /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                            children: [
                                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                                    onClick: ()=>{
                                                        setOpen(false);
                                                    },
                                                    css: {
                                                        flex: 1
                                                    },
                                                    color: "secondary",
                                                    children: "Close"
                                                }),
                                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                                    style: {
                                                        flex: 1
                                                    },
                                                    color: "primary",
                                                    onClick: ()=>{
                                                        onGoToToken();
                                                    },
                                                    children: "Go to Token"
                                                })
                                            ]
                                        }) : /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                            onClick: ()=>{
                                                setOpen(false);
                                            },
                                            style: {
                                                flex: 1
                                            },
                                            color: "primary",
                                            children: "Close"
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            });
        }
    });
}
$a93b26d073373c23$export$d23efc006864db2f.Custom = (0, $052d60b4fc42e2f9$export$5cb91f178b51ac3);










//@ts-ignore
const $6b118f5ec5d1b565$var$Flatpickr = (0, $bNXjM$reactflatpickr).default;
var $6b118f5ec5d1b565$export$2e2bcd8739ae039 = /*#__PURE__*/ (0, $bNXjM$forwardRef)(({ options: options , onChange: onChange , value: value , defaultValue: defaultValue , ...inputProps }, forwardedRef)=>{
    return /*#__PURE__*/ (0, $bNXjM$jsx)($6b118f5ec5d1b565$var$Flatpickr, {
        ref: forwardedRef,
        value: value,
        options: {
            dateFormat: "m/d/Y h:i K",
            ...options
        },
        onChange: onChange,
        defaultValue: defaultValue,
        render: ({ defaultValue: defaultValue  }, ref)=>{
            return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a235eda53948b6ff$export$2e2bcd8739ae039), {
                ...inputProps,
                ref: ref,
                defaultValue: defaultValue
            });
        }
    });
});








function $f3391f204d4b73fa$export$2e2bcd8739ae039(params) {
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const chain = client?.currentChain();
    const contractAddress = chain?.id !== undefined && chain.id in (0, $412f709ff46d543e$export$2e2bcd8739ae039) ? (0, $412f709ff46d543e$export$2e2bcd8739ae039)[chain.id] : (0, $412f709ff46d543e$export$2e2bcd8739ae039)[(0, $bNXjM$mainnet).id];
    const balance = (0, $bNXjM$useBalance)({
        ...params,
        token: contractAddress
    });
    return {
        balance: balance,
        contractAddress: contractAddress
    };
}








const $88f0697a4443230c$var$wrappedContractNames = {
    1: "WETH",
    5: "WETH",
    137: "WMATIC"
};
var $88f0697a4443230c$export$2e2bcd8739ae039 = $88f0697a4443230c$var$wrappedContractNames;



const $97f9e638db55049c$var$expirationOptions = [
    ...(0, $abb5dec08fcac72e$export$2e2bcd8739ae039),
    {
        text: "Custom",
        value: "custom",
        relativeTime: null,
        relativeTimeUnit: null
    }
];
let $97f9e638db55049c$export$7a92ddb9e11f37f7;
(function(BidStep) {
    BidStep[BidStep["SetPrice"] = 0] = "SetPrice";
    BidStep[BidStep["Offering"] = 1] = "Offering";
    BidStep[BidStep["Complete"] = 2] = "Complete";
})($97f9e638db55049c$export$7a92ddb9e11f37f7 || ($97f9e638db55049c$export$7a92ddb9e11f37f7 = {}));
const $97f9e638db55049c$export$89d91658eb2b6698 = ({ open: open , tokenId: tokenId , collectionId: collectionId , attribute: attribute , normalizeRoyalties: normalizeRoyalties , children: children  })=>{
    const { data: signer  } = (0, $bNXjM$useSigner)();
    const [bidStep, setBidStep] = (0, $bNXjM$useState)($97f9e638db55049c$export$7a92ddb9e11f37f7.SetPrice);
    const [transactionError, setTransactionError] = (0, $bNXjM$useState)();
    const [bidAmount, setBidAmount] = (0, $bNXjM$useState)("");
    const [expirationOption, setExpirationOption] = (0, $bNXjM$useState)($97f9e638db55049c$var$expirationOptions[3]);
    const [hasEnoughNativeCurrency, setHasEnoughNativeCurrency] = (0, $bNXjM$useState)(false);
    const [hasEnoughWrappedCurrency, setHasEnoughWrappedCurrency] = (0, $bNXjM$useState)(false);
    const [amountToWrap, setAmountToWrap] = (0, $bNXjM$useState)("");
    const [stepData, setStepData] = (0, $bNXjM$useState)(null);
    const [bidData, setBidData] = (0, $bNXjM$useState)(null);
    const contract = collectionId ? collectionId?.split(":")[0] : undefined;
    const [trait, setTrait] = (0, $bNXjM$useState)(attribute);
    const [attributes, setAttributes] = (0, $bNXjM$useState)();
    const chainCurrency = (0, $16fcb794e07c5eb8$export$2e2bcd8739ae039)();
    const wrappedContractAddress = chainCurrency.chainId in (0, $412f709ff46d543e$export$2e2bcd8739ae039) ? (0, $412f709ff46d543e$export$2e2bcd8739ae039)[chainCurrency.chainId] : (0, $412f709ff46d543e$export$2e2bcd8739ae039)[1];
    const wrappedContractName = chainCurrency.chainId in (0, $88f0697a4443230c$export$2e2bcd8739ae039) ? (0, $88f0697a4443230c$export$2e2bcd8739ae039)[chainCurrency.chainId] : (0, $88f0697a4443230c$export$2e2bcd8739ae039)[1];
    const { data: tokens  } = (0, $54bf018b076821f1$export$2e2bcd8739ae039)(open && tokenId !== undefined && {
        tokens: [
            `${contract}:${tokenId}`
        ],
        includeTopBid: true,
        normalizeRoyalties: normalizeRoyalties
    }, {
        revalidateFirstPage: true
    });
    const { data: traits  } = (0, $a77f332d243f1426$export$2e2bcd8739ae039)(open && !tokenId ? collectionId : undefined);
    const { data: collections  } = (0, $38f38860f7db3263$export$2e2bcd8739ae039)(open && {
        id: collectionId,
        includeTopBid: true,
        normalizeRoyalties: normalizeRoyalties
    });
    const collection = collections && collections[0] ? collections[0] : undefined;
    const token = tokens && tokens.length > 0 ? tokens[0] : undefined;
    const usdPrice = (0, $742accbc1cb453a5$export$2e2bcd8739ae039)(open ? "USD" : undefined, wrappedContractName);
    const bidAmountUsd = +bidAmount * (usdPrice || 0);
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const { address: address  } = (0, $bNXjM$useAccount)();
    const { data: balance  } = (0, $bNXjM$useBalance)({
        address: address,
        watch: open
    });
    const { balance: { data: wrappedBalance  } , contractAddress: contractAddress  } = (0, $f3391f204d4b73fa$export$2e2bcd8739ae039)({
        address: address,
        watch: open
    });
    const { chain: chain  } = (0, $bNXjM$useNetwork)();
    const uniswapConvertLink = chain?.id === (0, $bNXjM$mainnet).id || chain?.id === (0, $bNXjM$goerli).id ? `https://app.uniswap.org/#/swap?theme=dark&exactAmount=${amountToWrap}&chain=${chain?.network || "mainnet"}&inputCurrency=eth&outputCurrency=${contractAddress}` : `https://app.uniswap.org/#/swap?theme=dark&exactAmount=${amountToWrap}`;
    (0, $bNXjM$useEffect)(()=>{
        if (bidAmount !== "") {
            const bid = (0, $bNXjM$parseEther)(bidAmount);
            if (!wrappedBalance?.value || wrappedBalance?.value.lt(bid)) {
                setHasEnoughWrappedCurrency(false);
                const wrappedAmount = wrappedBalance?.value || (0, $bNXjM$constants).Zero;
                const amountToWrap = bid.sub(wrappedAmount);
                setAmountToWrap((0, $e70e85f6f4e64430$export$87710fd8420713d9)(bid.sub(wrappedAmount), 5));
                if (!balance?.value || balance.value.lt(amountToWrap)) setHasEnoughNativeCurrency(false);
                else setHasEnoughNativeCurrency(true);
            } else {
                setHasEnoughWrappedCurrency(true);
                setHasEnoughNativeCurrency(true);
                setAmountToWrap("");
            }
        } else {
            setHasEnoughNativeCurrency(true);
            setHasEnoughWrappedCurrency(true);
            setAmountToWrap("");
        }
    }, [
        bidAmount,
        balance,
        wrappedBalance
    ]);
    (0, $bNXjM$useEffect)(()=>{
        const validAttributes = traits ? traits.filter((attribute)=>attribute.values && attribute.values.length > 0) : undefined;
        setAttributes(validAttributes);
    }, [
        traits
    ]);
    (0, $bNXjM$useEffect)(()=>{
        if (!open) {
            setBidStep($97f9e638db55049c$export$7a92ddb9e11f37f7.SetPrice);
            setExpirationOption($97f9e638db55049c$var$expirationOptions[3]);
            setHasEnoughNativeCurrency(false);
            setHasEnoughWrappedCurrency(false);
            setAmountToWrap("");
            setBidAmount("");
            setStepData(null);
            setBidData(null);
            setTransactionError(null);
            setTrait(undefined);
        } else setTrait(attribute);
    }, [
        open
    ]);
    const isBanned = (0, $9898620691963117$export$2e2bcd8739ae039)(open ? contract : undefined, tokenId);
    const placeBid = (0, $bNXjM$useCallback)(()=>{
        if (!signer) {
            const error = new Error("Missing a signer");
            setTransactionError(error);
            throw error;
        }
        if (!tokenId && !collectionId) {
            const error = new Error("Missing tokenId and collectionId");
            setTransactionError(error);
            throw error;
        }
        if (!client) {
            const error = new Error("ZooClient was not initialized");
            setTransactionError(error);
            throw error;
        }
        setBidStep($97f9e638db55049c$export$7a92ddb9e11f37f7.Offering);
        setTransactionError(null);
        setBidData(null);
        const bid = {
            weiPrice: (0, $bNXjM$parseEther)(`${bidAmount}`).toString(),
            orderbook: "reservoir",
            orderKind: "seaport",
            attributeKey: trait?.key,
            attributeValue: trait?.value
        };
        if (tokenId && collectionId) {
            const contract = collectionId ? collectionId?.split(":")[0] : undefined;
            bid.token = `${contract}:${tokenId}`;
        } else if (collectionId) bid.collection = collectionId;
        if (expirationOption.relativeTime) {
            if (expirationOption.relativeTimeUnit) bid.expirationTime = (0, $bNXjM$dayjs)().add(expirationOption.relativeTime, expirationOption.relativeTimeUnit).unix().toString();
            else bid.expirationTime = `${expirationOption.relativeTime}`;
        }
        setBidData(bid);
        client.actions.placeBid({
            signer: signer,
            bids: [
                bid
            ],
            onProgress: (steps)=>{
                const executableSteps = steps.filter((step)=>step.items && step.items.length > 0);
                let stepCount = executableSteps.length;
                let incompleteStepItemIndex = null;
                let incompleteStepIndex = null;
                executableSteps.find((step, i)=>{
                    if (!step.items) return false;
                    incompleteStepItemIndex = step.items.findIndex((item)=>item.status == "incomplete");
                    if (incompleteStepItemIndex !== -1) {
                        incompleteStepIndex = i;
                        return true;
                    }
                });
                if (incompleteStepIndex !== null) setStepData({
                    totalSteps: stepCount,
                    stepProgress: incompleteStepIndex,
                    currentStep: executableSteps[incompleteStepIndex]
                });
                else setBidStep($97f9e638db55049c$export$7a92ddb9e11f37f7.Complete);
            }
        }).catch((e)=>{
            const transactionError = new Error(e?.message || "", {
                cause: e
            });
            setTransactionError(transactionError);
        });
    }, [
        tokenId,
        collectionId,
        client,
        signer,
        bidAmount,
        expirationOption,
        trait
    ]);
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$Fragment), {
        children: children({
            token: token,
            collection: collection,
            attributes: attributes,
            usdPrice: usdPrice,
            isBanned: isBanned,
            balance: balance,
            wrappedBalance: wrappedBalance,
            wrappedContractName: wrappedContractName,
            wrappedContractAddress: wrappedContractAddress,
            uniswapConvertLink: uniswapConvertLink,
            bidAmount: bidAmount,
            bidData: bidData,
            bidAmountUsd: bidAmountUsd,
            bidStep: bidStep,
            hasEnoughNativeCurrency: hasEnoughNativeCurrency,
            hasEnoughWrappedCurrency: hasEnoughWrappedCurrency,
            amountToWrap: amountToWrap,
            transactionError: transactionError,
            expirationOption: expirationOption,
            expirationOptions: $97f9e638db55049c$var$expirationOptions,
            stepData: stepData,
            setBidStep: setBidStep,
            setBidAmount: setBidAmount,
            setExpirationOption: setExpirationOption,
            setTrait: setTrait,
            trait: trait,
            placeBid: placeBid
        })
    });
};










const $41951e97176ed3db$var$Img = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("img", {
    width: "100%",
    "@bp1": {
        height: 100,
        width: 100
    },
    borderRadius: "$borderRadius"
});
const $41951e97176ed3db$var$TokenStatsHeader = ({ token: token , collection: collection  })=>{
    const img = (0, $f9fd95002ef41b13$export$2e2bcd8739ae039)(token?.token?.image ? token.token.image : collection?.image, 600);
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
        css: {
            mr: "$4",
            marginBottom: "$4",
            width: 120,
            "@bp1": {
                mr: 0,
                width: "100%"
            }
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "subtitle2",
                color: "subtle",
                css: {
                    mb: "$1",
                    display: "block"
                },
                children: token ? "Item" : "Collection"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)($41951e97176ed3db$var$Img, {
                src: img,
                css: {
                    mb: "$2",
                    visibility: !img || img.length === 0 ? "hidden" : "visible",
                    objectFit: "cover"
                }
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "h6",
                css: {
                    flex: 1
                },
                as: "h6",
                ellipsify: true,
                children: token?.token ? token.token.name || `#${token.token.tokenId}` : collection?.name
            }),
            token && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                    style: "subtitle2",
                    color: "subtle",
                    as: "p",
                    ellipsify: true,
                    children: token?.token?.collection?.name
                })
            })
        ]
    });
};
var $41951e97176ed3db$export$2e2bcd8739ae039 = $41951e97176ed3db$var$TokenStatsHeader;








const $51656bc7b25f7d5f$var$SelectedAttribute = ({ attributeKey: attributeKey , attributeValue: attributeValue  })=>{
    const isMobile = (0, $53071302e811b792$export$2e2bcd8739ae039)("(max-width: 520px)");
    if (!attributeKey || !attributeValue) return null;
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        css: {
            padding: "$2",
            borderRadius: 4,
            backgroundColor: "$neutralBgHover",
            marginBottom: "$4",
            overflow: "hidden",
            gap: "$1",
            justifyContent: "space-between",
            maxWidth: "100%",
            "@bp1": {
                justifyContent: "start",
                width: "fit-content"
            }
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                color: "accent",
                style: "subtitle2",
                children: [
                    attributeKey,
                    `${isMobile ? "" : ":"}`
                ]
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "subtitle2",
                css: {
                    maxWidth: 200,
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                },
                children: attributeValue
            })
        ]
    });
};
var $51656bc7b25f7d5f$export$2e2bcd8739ae039 = $51656bc7b25f7d5f$var$SelectedAttribute;


const $8a5afc850b23a4a7$var$TokenStats = ({ token: token , collection: collection , trait: trait  })=>{
    let stats = [];
    stats.push({
        id: 0,
        label: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
            children: [
                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                    style: "subtitle2",
                    color: "subtle",
                    css: {
                        minWidth: "0"
                    },
                    ellipsify: true,
                    children: "Creator Royalties"
                }),
                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f1a77cb69cf0ff83$export$2e2bcd8739ae039), {
                    side: "right",
                    width: 200,
                    content: "A fee on every order that goes to the collection creator."
                })
            ]
        }),
        value: (collection?.royalties?.bps || 0) * 0.01 + "%"
    }, {
        id: 1,
        label: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
            style: "subtitle2",
            color: "subtle",
            css: {
                minWidth: "0"
            },
            ellipsify: true,
            children: "Highest Offer"
        }),
        value: token ? token.market?.topBid?.price?.amount?.native || null : collection?.topBid?.price?.amount?.native || null,
        asWrapped: true
    });
    if (token) stats.push({
        id: 2,
        label: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
            style: "subtitle2",
            color: "subtle",
            css: {
                minWidth: "0"
            },
            ellipsify: true,
            children: "List Price"
        }),
        value: token.market?.floorAsk?.price?.amount?.native || null,
        asNative: true
    });
    else if (!token && collection) stats.push({
        id: 2,
        label: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
            style: "subtitle2",
            color: "subtle",
            css: {
                minWidth: "0"
            },
            ellipsify: true,
            children: "Floor"
        }),
        value: collection?.floorAsk?.price?.amount?.native || null,
        asNative: true
    });
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        css: {
            width: "100%",
            flexDirection: "row",
            "@bp1": {
                width: 220,
                flexDirection: "column"
            },
            p: "$4"
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $41951e97176ed3db$export$2e2bcd8739ae039), {
                collection: collection,
                token: token
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $72bd45ddbf898068$export$2e2bcd8739ae039), {
                css: {
                    flex: 1,
                    alignContent: "start",
                    width: "100%",
                    gridTemplateColumns: "repeat(1, minmax(0, 1fr))"
                },
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $51656bc7b25f7d5f$export$2e2bcd8739ae039), {
                        attributeKey: trait?.key,
                        attributeValue: trait?.value
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                        css: {
                            flex: 1,
                            [`& ${0, $54a2afd53a200e25$export$2e2bcd8739ae039}:not(:last-child)`]: {
                                mb: "$1"
                            }
                        },
                        children: stats.map((stat)=>/*#__PURE__*/ (0, $bNXjM$jsx)((0, $54a2afd53a200e25$export$2e2bcd8739ae039), {
                                ...stat
                            }, stat.id))
                    })
                ]
            })
        ]
    });
};
var $8a5afc850b23a4a7$export$2e2bcd8739ae039 = $8a5afc850b23a4a7$var$TokenStats;















const $9f138a5099b04af6$var$TransactionBidDetails = ({ token: token , collection: collection , bidData: bidData  })=>{
    const [value, setValue] = (0, $bNXjM$useState)("");
    const timeSince = (0, $c952bf73c842abfc$export$2e2bcd8739ae039)(bidData?.expirationTime ? +bidData.expirationTime : 0);
    (0, $bNXjM$useEffect)(()=>{
        setValue(bidData ? (0, $bNXjM$formatEther)(bidData.weiPrice) : "");
    }, [
        bidData
    ]);
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        css: {
            width: "100%",
            flexDirection: "row",
            "@bp1": {
                width: 220,
                flexDirection: "column"
            },
            p: "$4"
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $41951e97176ed3db$export$2e2bcd8739ae039), {
                collection: collection,
                token: token
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                css: {
                    flex: 1,
                    mb: "$3"
                },
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $51656bc7b25f7d5f$export$2e2bcd8739ae039), {
                        attributeKey: bidData?.attributeKey,
                        attributeValue: bidData?.attributeValue
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        className: "rk-stat-well",
                        css: {
                            backgroundColor: "$wellBackground",
                            p: "$2",
                            borderRadius: "$borderRadius",
                            gap: "$1"
                        },
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                justify: "between",
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "subtitle2",
                                        children: "Offer Price"
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $39af25d905d8680a$export$2e2bcd8739ae039), {
                                        amount: +value,
                                        textStyle: "subtitle2"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                style: "subtitle2",
                                color: "subtle",
                                as: "p",
                                css: {
                                    flex: 1
                                },
                                children: bidData?.expirationTime ? `Expires ${timeSince}` : "No Expiration"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
var $9f138a5099b04af6$export$2e2bcd8739ae039 = $9f138a5099b04af6$var$TransactionBidDetails;










const $cc145f97c30ab30a$var$SCROLLBAR_SIZE = 10;
const $cc145f97c30ab30a$var$ScrollArea = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Root4, {
    height: 322,
    borderRadius: "$space$2",
    overflow: "hidden",
    boxShadow: `0 2px 10px $inputBackground`
});
const $cc145f97c30ab30a$var$ScrollAreaViewport = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Viewport1, {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    borderRadius: "inherit"
});
const $cc145f97c30ab30a$var$ScrollAreaScrollbar = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Scrollbar, {
    display: "flex",
    // ensures no selection
    userSelect: "none",
    // disable browser handling of all panning and zooming gestures on touch devices
    touchAction: "none",
    padding: 2,
    background: "$inputBackground",
    transition: "background 160ms ease-out",
    "&:hover": {
        background: "$inputBackground"
    },
    '&[data-orientation="vertical"]': {
        width: $cc145f97c30ab30a$var$SCROLLBAR_SIZE
    },
    '&[data-orientation="horizontal"]': {
        flexDirection: "column",
        height: $cc145f97c30ab30a$var$SCROLLBAR_SIZE
    }
});
const $cc145f97c30ab30a$var$ScrollAreaThumb = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Thumb1, {
    flex: 1,
    background: "$wellBackground",
    borderRadius: $cc145f97c30ab30a$var$SCROLLBAR_SIZE,
    // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
    position: "relative",
    "&::before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        minWidth: 44,
        minHeight: 44
    }
});
const $cc145f97c30ab30a$var$ScrollAreaCorner = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)($bNXjM$Corner, {
    background: "$wellBackground"
});
const $cc145f97c30ab30a$var$RKScrollArea = ({ children: children , ...props })=>{
    return /*#__PURE__*/ (0, $bNXjM$jsxs)($cc145f97c30ab30a$var$ScrollArea, {
        ...props,
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)($cc145f97c30ab30a$var$ScrollAreaViewport, {
                children: children
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)($cc145f97c30ab30a$var$ScrollAreaScrollbar, {
                orientation: "vertical",
                children: /*#__PURE__*/ (0, $bNXjM$jsx)($cc145f97c30ab30a$var$ScrollAreaThumb, {})
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)($cc145f97c30ab30a$var$ScrollAreaScrollbar, {
                orientation: "horizontal",
                children: /*#__PURE__*/ (0, $bNXjM$jsx)($cc145f97c30ab30a$var$ScrollAreaThumb, {})
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)($cc145f97c30ab30a$var$ScrollAreaCorner, {})
        ]
    });
};
$cc145f97c30ab30a$var$RKScrollArea.Root = $cc145f97c30ab30a$var$ScrollArea;
$cc145f97c30ab30a$var$RKScrollArea.Viewport = $cc145f97c30ab30a$var$ScrollAreaViewport;
$cc145f97c30ab30a$var$RKScrollArea.Scrollbar = $cc145f97c30ab30a$var$ScrollAreaScrollbar;
$cc145f97c30ab30a$var$RKScrollArea.Thumb = $cc145f97c30ab30a$var$ScrollAreaThumb;
$cc145f97c30ab30a$var$RKScrollArea.Corner = $cc145f97c30ab30a$var$ScrollAreaCorner;
var $cc145f97c30ab30a$export$2e2bcd8739ae039 = $cc145f97c30ab30a$var$RKScrollArea;



const $6f4174f8fd0c1da3$var$AttributeSelector = ({ attributes: attributes , setTrait: setTrait , setOpen: setOpen , tokenCount: tokenCount  })=>{
    const [results, setResults] = (0, $bNXjM$useState)([]);
    const [query, setQuery] = (0, $bNXjM$useState)("");
    (0, $bNXjM$useEffect)(()=>{
        if (query === "") setResults(attributes);
        else {
            let results = [];
            attributes?.forEach((attribute)=>{
                const values = attribute.values?.filter(({ value: value  })=>value.toLowerCase().includes(query.toLowerCase()));
                if (values && values.length > 0) results?.push({
                    ...attribute,
                    values: values
                });
            });
            setResults(results ? [
                ...results
            ] : []);
        }
    }, [
        query
    ]);
    if (!attributes) return null;
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
        css: {
            maxWidth: 500,
            zIndex: 1000,
            padding: "$4",
            overflowY: "auto",
            borderRadius: "$space$2",
            backgroundColor: "$popoverBackground"
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a235eda53948b6ff$export$2e2bcd8739ae039), {
                css: {
                    marginBottom: "$4",
                    padding: "$space$4 $space$4 $space$4 48px"
                },
                placeholder: "Filter attribute",
                value: query,
                onChange: (e)=>setQuery(e.target.value),
                iconCss: {
                    top: "26px",
                    color: "$neutralText"
                },
                icon: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                    icon: (0, $bNXjM$faMagnifyingGlass),
                    width: 16,
                    height: 16
                })
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $cc145f97c30ab30a$export$2e2bcd8739ae039), {
                css: {
                    minWidth: "80vw",
                    "@bp1": {
                        minWidth: 468
                    }
                },
                children: results?.map(({ key: key , values: values  })=>{
                    if (values?.length === 0) return null;
                    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                        css: {
                            paddingRight: "$4",
                            marginBottom: 24
                        },
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                style: "subtitle1",
                                color: "accent",
                                as: "div",
                                css: {
                                    marginBottom: "$4"
                                },
                                children: key
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $72bd45ddbf898068$export$2e2bcd8739ae039), {
                                css: {
                                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                    gap: "$2",
                                    "@bp1": {
                                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))"
                                    }
                                },
                                children: values?.map(({ value: value , count: count , floorAskPrice: floorAskPrice  })=>/*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                        css: {
                                            display: "grid",
                                            alignContent: "space-between",
                                            cursor: "pointer",
                                            backgroundColor: "$contentBackground",
                                            borderRadius: "$space$2",
                                            $$shadowColor: "$colors$gray7",
                                            boxShadow: "box-shadow: 0px 2px 16px $$shadowColor",
                                            border: "1px solid $borderColor",
                                            width: "100%",
                                            padding: "12px 16px"
                                        },
                                        as: "button",
                                        onClick: ()=>{
                                            setTrait({
                                                key: key,
                                                value: value,
                                                floorAskPrice: floorAskPrice
                                            });
                                            setOpen(false);
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                justify: "between",
                                                css: {
                                                    gap: "$2",
                                                    marginBottom: "$1"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                        css: {
                                                            maxWidth: 85,
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            textAlign: "start"
                                                        },
                                                        style: "subtitle2",
                                                        children: value
                                                    }),
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                        css: {
                                                            flex: "none"
                                                        },
                                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                                                            amount: floorAskPrice,
                                                            logoWidth: 10,
                                                            maximumFractionDigits: 1,
                                                            textStyle: "subtitle2"
                                                        })
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                justify: "between",
                                                css: {
                                                    gap: "$2"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                        style: "body2",
                                                        color: "subtle",
                                                        children: count && tokenCount ? `${Math.round(count / tokenCount * 100)}%` : "-"
                                                    }),
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                        style: "body2",
                                                        color: "subtle",
                                                        children: "floor"
                                                    })
                                                ]
                                            })
                                        ]
                                    }, value))
                            })
                        ]
                    }, key);
                })
            })
        ]
    });
};
var $6f4174f8fd0c1da3$export$2e2bcd8739ae039 = $6f4174f8fd0c1da3$var$AttributeSelector;




const $4369b30d085782f5$var$PseudoInput = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("div", {
    all: "unset",
    width: "auto",
    padding: "$4",
    borderRadius: "$space$2",
    fontFamily: "$body",
    fontSize: 16,
    fontWeight: 400,
    color: "$neutralText",
    backgroundColor: "$inputBackground"
});
var $4369b30d085782f5$export$2e2bcd8739ae039 = $4369b30d085782f5$var$PseudoInput;



function $5f98c9e3399e3959$var$titleForStep(step) {
    switch(step){
        case (0, $97f9e638db55049c$export$7a92ddb9e11f37f7).SetPrice:
            return "Make an Offer";
        case (0, $97f9e638db55049c$export$7a92ddb9e11f37f7).Offering:
            return "Complete Offer";
        case (0, $97f9e638db55049c$export$7a92ddb9e11f37f7).Complete:
            return "Offer Submitted";
    }
}
const $5f98c9e3399e3959$var$ContentContainer = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
    width: "100%",
    flexDirection: "column",
    "@bp1": {
        flexDirection: "row"
    }
});
const $5f98c9e3399e3959$var$MainContainer = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
    flex: 1,
    borderColor: "$borderColor",
    borderTopWidth: 1,
    borderLeftWidth: 0,
    "@bp1": {
        borderTopWidth: 0,
        borderLeftWidth: 1
    },
    defaultVariants: {
        direction: "column"
    }
});
const $5f98c9e3399e3959$var$minimumDate = (0, $bNXjM$dayjs)().add(1, "h").format("MM/DD/YYYY h:mm A");
function $5f98c9e3399e3959$export$556cfc4a654987bd({ openState: openState , trigger: trigger , tokenId: tokenId , collectionId: collectionId , attribute: attribute , normalizeRoyalties: normalizeRoyalties , onViewOffers: onViewOffers , onClose: onClose , onBidComplete: onBidComplete , onBidError: onBidError  }) {
    const [open, setOpen] = (0, $d115e0b00eaf4565$export$2e2bcd8739ae039)(openState ? openState[0] : false, openState);
    const datetimeElement = (0, $bNXjM$useRef)(null);
    const [stepTitle, setStepTitle] = (0, $bNXjM$useState)("");
    const [localMarketplace, setLocalMarketplace] = (0, $bNXjM$useState)(null);
    const [attributesSelectable, setAttributesSelectable] = (0, $bNXjM$useState)(false);
    (0, $bNXjM$useEffect)(()=>{
        setLocalMarketplace((0, $c07b724742ae0148$export$2e2bcd8739ae039)());
    }, []);
    const [attributeSelectorOpen, setAttributeSelectorOpen] = (0, $bNXjM$useState)(false);
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $97f9e638db55049c$export$89d91658eb2b6698), {
        open: open,
        tokenId: tokenId,
        collectionId: collectionId,
        attribute: attribute,
        normalizeRoyalties: normalizeRoyalties,
        children: ({ token: token , collection: collection , attributes: attributes , bidStep: bidStep , expirationOption: expirationOption , expirationOptions: expirationOptions , wrappedBalance: wrappedBalance , wrappedContractName: wrappedContractName , wrappedContractAddress: wrappedContractAddress , bidAmount: bidAmount , bidAmountUsd: bidAmountUsd , hasEnoughNativeCurrency: hasEnoughNativeCurrency , hasEnoughWrappedCurrency: hasEnoughWrappedCurrency , amountToWrap: amountToWrap , balance: balance , uniswapConvertLink: uniswapConvertLink , transactionError: transactionError , stepData: stepData , bidData: bidData , isBanned: isBanned , setBidAmount: setBidAmount , setExpirationOption: setExpirationOption , setBidStep: setBidStep , setTrait: setTrait , trait: trait , placeBid: placeBid  })=>{
            const [expirationDate, setExpirationDate] = (0, $bNXjM$useState)("");
            const tokenCount = collection?.tokenCount ? +collection.tokenCount : undefined;
            const itemImage = token && token.token?.image ? token.token?.image : collection?.image;
            (0, $bNXjM$useEffect)(()=>{
                if (stepData) switch(stepData.currentStep.kind){
                    case "signature":
                        setStepTitle("Confirm Offer");
                        break;
                    default:
                        setStepTitle(stepData.currentStep.action);
                        break;
                }
            }, [
                stepData
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (expirationOption && expirationOption.relativeTime) {
                    const newExpirationTime = expirationOption.relativeTimeUnit ? (0, $bNXjM$dayjs)().add(expirationOption.relativeTime, expirationOption.relativeTimeUnit) : (0, $bNXjM$dayjs).unix(expirationOption.relativeTime);
                    setExpirationDate(newExpirationTime.format("MM/DD/YYYY h:mm A"));
                } else setExpirationDate("");
            }, [
                expirationOption
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (bidStep === (0, $97f9e638db55049c$export$7a92ddb9e11f37f7).Complete && onBidComplete) {
                    const data = {
                        tokenId: tokenId,
                        collectionId: collectionId,
                        bidData: bidData
                    };
                    onBidComplete(data);
                }
            }, [
                bidStep
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (transactionError && onBidError) {
                    const data = {
                        tokenId: tokenId,
                        collectionId: collectionId,
                        bidData: bidData
                    };
                    onBidError(transactionError, data);
                }
            }, [
                transactionError
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (open && attributes && !tokenId && attribute) setTrait(attribute);
                else setTrait(undefined);
                if (open && attributes && !tokenId) {
                    let attributeCount = 0;
                    for(let i = 0; i < attributes.length; i++){
                        attributeCount += attributes[i].attributeCount || 0;
                        if (attributeCount >= 2000) break;
                    }
                    if (attributeCount >= 2000) setAttributesSelectable(false);
                    else setAttributesSelectable(true);
                } else setAttributesSelectable(false);
            }, [
                open,
                attributes
            ]);
            return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $b86bf9f1e9f1a187$export$2b77a92f1a5ad772), {
                size: bidStep !== (0, $97f9e638db55049c$export$7a92ddb9e11f37f7).Complete ? (0, $b86bf9f1e9f1a187$export$e8598848ef5f29c0).LG : (0, $b86bf9f1e9f1a187$export$e8598848ef5f29c0).MD,
                trigger: trigger,
                title: $5f98c9e3399e3959$var$titleForStep(bidStep),
                open: open,
                onOpenChange: (open)=>{
                    if (!open && onClose) {
                        const data = {
                            tokenId: tokenId,
                            collectionId: collectionId,
                            bidData: bidData
                        };
                        onClose(data, stepData, bidStep);
                    }
                    setOpen(open);
                },
                loading: !collection,
                onPointerDownOutside: (e)=>{
                    if (e.target instanceof Element && datetimeElement.current?.flatpickr?.calendarContainer && datetimeElement.current.flatpickr.calendarContainer.contains(e.target)) e.preventDefault();
                },
                onFocusCapture: (e)=>{
                    e.stopPropagation();
                },
                children: [
                    bidStep === (0, $97f9e638db55049c$export$7a92ddb9e11f37f7).SetPrice && collection && /*#__PURE__*/ (0, $bNXjM$jsxs)($5f98c9e3399e3959$var$ContentContainer, {
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $8a5afc850b23a4a7$export$2e2bcd8739ae039), {
                                token: token ? token : undefined,
                                collection: collection,
                                trait: trait
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)($5f98c9e3399e3959$var$MainContainer, {
                                css: {
                                    p: "$4"
                                },
                                children: [
                                    isBanned && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $4c76c4b4e6d5247c$export$2e2bcd8739ae039), {
                                        message: "Token is not tradable on OpenSea",
                                        css: {
                                            mb: "$2",
                                            p: "$2",
                                            borderRadius: 4
                                        }
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        justify: "between",
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "tiny",
                                                children: "Offer Amount"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                as: (0, $a08469b1b360d6cf$export$2e2bcd8739ae039),
                                                css: {
                                                    gap: "$1"
                                                },
                                                align: "center",
                                                style: "tiny",
                                                children: [
                                                    "Balance:",
                                                    " ",
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $39af25d905d8680a$export$2e2bcd8739ae039), {
                                                        logoWidth: 10,
                                                        textStyle: "tiny",
                                                        amount: wrappedBalance?.value
                                                    }),
                                                    " "
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            mt: "$2",
                                            gap: 20
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                as: (0, $a08469b1b360d6cf$export$2e2bcd8739ae039),
                                                css: {
                                                    gap: "$2",
                                                    ml: "$3",
                                                    flexShrink: 0
                                                },
                                                align: "center",
                                                style: "body1",
                                                color: "subtle",
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bb13850b05622906$export$2e2bcd8739ae039), {
                                                        css: {
                                                            height: 20
                                                        },
                                                        address: wrappedContractAddress
                                                    }),
                                                    wrappedContractName
                                                ]
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a235eda53948b6ff$export$2e2bcd8739ae039), {
                                                type: "number",
                                                value: bidAmount,
                                                onChange: (e)=>{
                                                    setBidAmount(e.target.value);
                                                },
                                                placeholder: "Enter price here",
                                                containerCss: {
                                                    width: "100%"
                                                },
                                                css: {
                                                    color: "$neutralText",
                                                    textAlign: "left"
                                                }
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $208ab5b0155991db$export$2e2bcd8739ae039), {
                                        css: {
                                            marginLeft: "auto",
                                            mt: "$2",
                                            display: "inline-block",
                                            minHeight: 15
                                        },
                                        style: "tiny",
                                        amount: bidAmountUsd
                                    }),
                                    attributes && attributes.length > 0 && (attributesSelectable || trait) && !tokenId && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                as: (0, $e779e4a6b41db55c$export$2e2bcd8739ae039),
                                                css: {
                                                    mb: "$2"
                                                },
                                                style: "tiny",
                                                children: "Attributes"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $364926f073e51b94$export$2e2bcd8739ae039).Root, {
                                                open: attributeSelectorOpen,
                                                onOpenChange: attributesSelectable ? setAttributeSelectorOpen : undefined,
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $364926f073e51b94$export$2e2bcd8739ae039).Trigger, {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $4369b30d085782f5$export$2e2bcd8739ae039), {
                                                            children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                                justify: "between",
                                                                css: {
                                                                    gap: "$2",
                                                                    alignItems: "center",
                                                                    color: "$neutralText"
                                                                },
                                                                children: trait ? /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                                            css: {
                                                                                maxWidth: 385,
                                                                                overflow: "hidden",
                                                                                textOverflow: "ellipsis",
                                                                                whiteSpace: "nowrap"
                                                                            },
                                                                            children: [
                                                                                /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                                                    color: "accent",
                                                                                    style: "subtitle1",
                                                                                    children: [
                                                                                        trait?.key,
                                                                                        ":",
                                                                                        " "
                                                                                    ]
                                                                                }),
                                                                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                                                    style: "subtitle1",
                                                                                    children: trait?.value
                                                                                })
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                                            css: {
                                                                                alignItems: "center",
                                                                                gap: "$2"
                                                                            },
                                                                            children: [
                                                                                trait?.floorAskPrice && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                                                                    css: {
                                                                                        flex: "none"
                                                                                    },
                                                                                    children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                                                                                        amount: trait?.floorAskPrice,
                                                                                        maximumFractionDigits: 2,
                                                                                        logoWidth: 11
                                                                                    })
                                                                                }),
                                                                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                                                                    style: {
                                                                                        cursor: "pointer"
                                                                                    },
                                                                                    onClick: (e)=>{
                                                                                        e.preventDefault();
                                                                                        setTrait(undefined);
                                                                                    },
                                                                                    icon: (0, $bNXjM$faClose),
                                                                                    width: 16,
                                                                                    height: 16
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }) : /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                                            css: {
                                                                                color: "$neutralText"
                                                                            },
                                                                            children: "All Attributes"
                                                                        }),
                                                                        /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                                                            icon: (0, $bNXjM$faChevronDown),
                                                                            width: 16,
                                                                            height: 16
                                                                        })
                                                                    ]
                                                                })
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $364926f073e51b94$export$2e2bcd8739ae039).Content, {
                                                        sideOffset: -50,
                                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $6f4174f8fd0c1da3$export$2e2bcd8739ae039), {
                                                            attributes: attributes,
                                                            tokenCount: tokenCount,
                                                            setTrait: setTrait,
                                                            setOpen: setAttributeSelectorOpen
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        as: (0, $e779e4a6b41db55c$export$2e2bcd8739ae039),
                                        css: {
                                            mt: "$4",
                                            mb: "$2"
                                        },
                                        style: "tiny",
                                        children: "Expiration Date"
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            gap: "$2",
                                            mb: "$4"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039), {
                                                css: {
                                                    flex: 1,
                                                    "@bp1": {
                                                        width: 160,
                                                        flexDirection: "row"
                                                    }
                                                },
                                                value: expirationOption?.text || "",
                                                onValueChange: (value)=>{
                                                    const option = expirationOptions.find((option)=>option.value == value);
                                                    if (option) setExpirationOption(option);
                                                },
                                                children: expirationOptions.map((option)=>/*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).Item, {
                                                        value: option.value,
                                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f6c56793b47f1e35$export$2e2bcd8739ae039).ItemText, {
                                                            children: option.text
                                                        })
                                                    }, option.text))
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $6b118f5ec5d1b565$export$2e2bcd8739ae039), {
                                                ref: datetimeElement,
                                                icon: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                                    icon: (0, $bNXjM$faCalendar),
                                                    width: 14,
                                                    height: 16
                                                }),
                                                value: expirationDate,
                                                options: {
                                                    minDate: $5f98c9e3399e3959$var$minimumDate,
                                                    enableTime: true,
                                                    minuteIncrement: 1
                                                },
                                                defaultValue: expirationDate,
                                                onChange: (e)=>{
                                                    if (Array.isArray(e)) {
                                                        const customOption = expirationOptions.find((option)=>option.value === "custom");
                                                        if (customOption) setExpirationOption({
                                                            ...customOption,
                                                            relativeTime: e[0] / 1000
                                                        });
                                                    }
                                                },
                                                containerCss: {
                                                    width: 46,
                                                    "@bp1": {
                                                        flex: 1,
                                                        width: "100%"
                                                    }
                                                },
                                                css: {
                                                    padding: 0,
                                                    "@bp1": {
                                                        padding: "12px 16px 12px 48px"
                                                    }
                                                }
                                            })
                                        ]
                                    }),
                                    bidAmount === "" && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                        disabled: true,
                                        css: {
                                            width: "100%",
                                            mt: "auto"
                                        },
                                        children: "Enter a Price"
                                    }),
                                    bidAmount !== "" && hasEnoughWrappedCurrency && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                        onClick: placeBid,
                                        css: {
                                            width: "100%",
                                            mt: "auto"
                                        },
                                        children: token && token.token ? "Make an Offer" : trait ? "Make an Attribute Offer" : "Make a Collection Offer"
                                    }),
                                    bidAmount !== "" && !hasEnoughWrappedCurrency && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                        css: {
                                            width: "100%",
                                            mt: "auto"
                                        },
                                        children: [
                                            !hasEnoughNativeCurrency && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                css: {
                                                    gap: "$2",
                                                    mt: 10
                                                },
                                                justify: "center",
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                        style: "body2",
                                                        color: "error",
                                                        children: [
                                                            balance?.symbol || "ETH",
                                                            " Balance"
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                                                        amount: balance?.value
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                css: {
                                                    gap: "$2",
                                                    mt: 10,
                                                    overflow: "hidden",
                                                    flexDirection: "column-reverse",
                                                    "@bp1": {
                                                        flexDirection: "row"
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                                        css: {
                                                            flex: "1 0 auto"
                                                        },
                                                        color: "secondary",
                                                        onClick: ()=>{
                                                            window.open(uniswapConvertLink, "_blank");
                                                        },
                                                        children: "Convert Manually"
                                                    }),
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                                        css: {
                                                            flex: 1,
                                                            maxHeight: 44
                                                        },
                                                        disabled: !hasEnoughNativeCurrency,
                                                        onClick: placeBid,
                                                        children: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                            style: "h6",
                                                            color: "button",
                                                            ellipsify: true,
                                                            children: [
                                                                "Convert ",
                                                                amountToWrap,
                                                                " ",
                                                                balance?.symbol || "ETH",
                                                                " ",
                                                                "for me"
                                                            ]
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    bidStep === (0, $97f9e638db55049c$export$7a92ddb9e11f37f7).Offering && collection && /*#__PURE__*/ (0, $bNXjM$jsxs)($5f98c9e3399e3959$var$ContentContainer, {
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $9f138a5099b04af6$export$2e2bcd8739ae039), {
                                token: token ? token : undefined,
                                collection: collection,
                                bidData: bidData
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)($5f98c9e3399e3959$var$MainContainer, {
                                css: {
                                    p: "$4"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $fe4973a3dd519dab$export$2e2bcd8739ae039), {
                                        value: stepData?.stepProgress || 0,
                                        max: stepData?.totalSteps || 0
                                    }),
                                    transactionError && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $4c76c4b4e6d5247c$export$2e2bcd8739ae039), {
                                        css: {
                                            mt: 24
                                        }
                                    }),
                                    stepData && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                css: {
                                                    textAlign: "center",
                                                    mt: 48,
                                                    mb: 28
                                                },
                                                style: "subtitle1",
                                                children: stepTitle
                                            }),
                                            stepData.currentStep.kind === "signature" && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $10061c592b503910$export$2e2bcd8739ae039), {
                                                justify: "center",
                                                fromImg: itemImage || "",
                                                toImg: localMarketplace?.icon || ""
                                            }),
                                            stepData.currentStep.kind !== "signature" && // <WethApproval style={{ margin: '0 auto' }} />
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                align: "center",
                                                justify: "center",
                                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                    css: {
                                                        background: "$neutalLine",
                                                        borderRadius: 8
                                                    },
                                                    children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bb13850b05622906$export$2e2bcd8739ae039), {
                                                        css: {
                                                            height: 56,
                                                            width: 56
                                                        },
                                                        address: wrappedContractAddress
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                css: {
                                                    textAlign: "center",
                                                    mt: 24,
                                                    maxWidth: 395,
                                                    mx: "auto",
                                                    mb: "$4"
                                                },
                                                style: "body3",
                                                color: "subtle",
                                                children: stepData?.currentStep.description
                                            })
                                        ]
                                    }),
                                    !stepData && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            height: "100%"
                                        },
                                        justify: "center",
                                        align: "center",
                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {})
                                    }),
                                    !transactionError && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                        css: {
                                            width: "100%",
                                            mt: "auto"
                                        },
                                        disabled: true,
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {}),
                                            "Waiting for Approval"
                                        ]
                                    }),
                                    transactionError && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            mt: "auto",
                                            gap: 10
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                                color: "secondary",
                                                css: {
                                                    flex: 1
                                                },
                                                onClick: ()=>setBidStep((0, $97f9e638db55049c$export$7a92ddb9e11f37f7).SetPrice),
                                                children: "Edit Offer"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                                css: {
                                                    flex: 1
                                                },
                                                onClick: placeBid,
                                                children: "Retry"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    bidStep === (0, $97f9e638db55049c$export$7a92ddb9e11f37f7).Complete && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        align: "center",
                        css: {
                            p: "$4"
                        },
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                css: {
                                    color: "$successAccent",
                                    mt: 48
                                },
                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                    icon: (0, $bNXjM$faCheckCircle),
                                    style: {
                                        width: "32px",
                                        height: "32px"
                                    }
                                })
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                style: "h5",
                                css: {
                                    textAlign: "center",
                                    mt: 36,
                                    mb: 80
                                },
                                children: "Offer Submitted!"
                            }),
                            onViewOffers ? /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                css: {
                                    width: "100%"
                                },
                                onClick: ()=>{
                                    onViewOffers();
                                },
                                children: "View Offers"
                            }) : /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                css: {
                                    width: "100%"
                                },
                                onClick: ()=>{
                                    setOpen(false);
                                },
                                children: "Close"
                            })
                        ]
                    })
                ]
            });
        }
    });
}
$5f98c9e3399e3959$export$556cfc4a654987bd.Custom = (0, $97f9e638db55049c$export$89d91658eb2b6698);













let $56323ed10ce02ae6$export$f4dd52ca63b5fdde;
(function(AcceptBidStep) {
    AcceptBidStep[AcceptBidStep["Checkout"] = 0] = "Checkout";
    AcceptBidStep[AcceptBidStep["ApproveMarketplace"] = 1] = "ApproveMarketplace";
    AcceptBidStep[AcceptBidStep["Confirming"] = 2] = "Confirming";
    AcceptBidStep[AcceptBidStep["Finalizing"] = 3] = "Finalizing";
    AcceptBidStep[AcceptBidStep["Complete"] = 4] = "Complete";
    AcceptBidStep[AcceptBidStep["Unavailable"] = 5] = "Unavailable";
})($56323ed10ce02ae6$export$f4dd52ca63b5fdde || ($56323ed10ce02ae6$export$f4dd52ca63b5fdde = {}));
const $56323ed10ce02ae6$export$2d08bd3f57775802 = ({ open: open , tokenId: tokenId , bidId: bidId , collectionId: collectionId , normalizeRoyalties: normalizeRoyalties , children: children  })=>{
    const { data: signer  } = (0, $bNXjM$useSigner)();
    const [stepData, setStepData] = (0, $bNXjM$useState)(null);
    const [totalPrice, setTotalPrice] = (0, $bNXjM$useState)(0);
    const [acceptBidStep, setAcceptBidStep] = (0, $bNXjM$useState)($56323ed10ce02ae6$export$f4dd52ca63b5fdde.Checkout);
    const [transactionError, setTransactionError] = (0, $bNXjM$useState)();
    const [txHash, setTxHash] = (0, $bNXjM$useState)(null);
    const { chain: activeChain  } = (0, $bNXjM$useNetwork)();
    const etherscanBaseUrl = activeChain?.blockExplorers?.etherscan?.url || "https://etherscan.io";
    const contract = collectionId ? collectionId?.split(":")[0] : undefined;
    const { data: tokens , mutate: mutateTokens  } = (0, $54bf018b076821f1$export$2e2bcd8739ae039)(open && {
        tokens: [
            `${contract}:${tokenId}`
        ],
        includeTopBid: true,
        normalizeRoyalties: normalizeRoyalties
    }, {
        revalidateFirstPage: true
    });
    const { data: collections , mutate: mutateCollection  } = (0, $38f38860f7db3263$export$2e2bcd8739ae039)(open && {
        id: collectionId,
        normalizeRoyalties: normalizeRoyalties
    });
    const { data: bids , isValidating: isFetchingBidData , mutate: mutateBids  } = (0, $ed463f024c26b3ca$export$2e2bcd8739ae039)({
        ids: bidId,
        status: "active",
        includeCriteriaMetadata: true,
        normalizeRoyalties: normalizeRoyalties
    }, {
        revalidateFirstPage: true
    }, open && bidId ? true : false);
    const bid = bids && bids[0] ? bids[0] : undefined;
    const collection = collections && collections[0] ? collections[0] : undefined;
    const token = tokens && tokens.length > 0 ? tokens[0] : undefined;
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    let feeBreakdown;
    let source;
    let expiration;
    let bidAmount = 0;
    let bidAmountCurrency;
    let ethBidAmount;
    if (acceptBidStep !== $56323ed10ce02ae6$export$f4dd52ca63b5fdde.Unavailable) {
        source = bidId ? bid?.source : token?.market?.topBid?.source;
        expiration = bidId ? bid?.expiration : token?.market?.topBid?.validUntil;
        bidAmount = bidId ? bid?.price?.amount?.decimal || 0 : token?.market?.topBid?.price?.amount?.decimal || 0;
        bidAmountCurrency = bidId ? bid?.price?.currency : token?.market?.topBid?.price?.currency;
        ethBidAmount = bidId ? bid?.price?.amount?.native : token?.market?.floorAsk?.price?.amount?.native;
        feeBreakdown = bidId ? bid?.feeBreakdown : token?.market?.topBid?.feeBreakdown;
    }
    const usdPrice = (0, $742accbc1cb453a5$export$2e2bcd8739ae039)(open && bidAmountCurrency ? "USD" : undefined, bidAmountCurrency?.symbol);
    const totalUsd = totalPrice * (usdPrice || 0);
    const fees = {
        creatorRoyalties: collection?.royalties?.bps || 0,
        feeBreakdown: feeBreakdown
    };
    const acceptBid = (0, $bNXjM$useCallback)(()=>{
        if (!signer) {
            const error = new Error("Missing a signer");
            setTransactionError(error);
            throw error;
        }
        if (!tokenId || !collectionId) {
            const error = new Error("Missing tokenId or collectionId");
            setTransactionError(error);
            throw error;
        }
        if (!client) {
            const error = new Error("ZooClient was not initialized");
            setTransactionError(error);
            setTransactionError(null);
            throw error;
        }
        const contract = collectionId.split(":")[0];
        let options = {};
        if (bidId) options = {
            ...options,
            orderId: bidId
        };
        setAcceptBidStep($56323ed10ce02ae6$export$f4dd52ca63b5fdde.Confirming);
        client.actions.acceptOffer({
            expectedPrice: totalPrice,
            signer: signer,
            token: {
                tokenId: tokenId,
                contract: contract
            },
            onProgress: (steps)=>{
                if (!steps) return;
                const executableSteps = steps.filter((step)=>step.items && step.items.length > 0);
                let stepCount = executableSteps.length;
                let currentStepItem;
                let currentStepIndex = 0;
                executableSteps.find((step, index)=>{
                    currentStepIndex = index;
                    currentStepItem = step.items?.find((item)=>item.status === "incomplete");
                    return currentStepItem;
                });
                const currentStep = currentStepIndex > -1 ? executableSteps[currentStepIndex] : executableSteps[stepCount - 1];
                if (currentStepItem) {
                    setStepData({
                        totalSteps: stepCount,
                        currentStep: currentStep,
                        currentStepItem: currentStepItem
                    });
                    if (currentStepIndex !== executableSteps.length - 1) setAcceptBidStep($56323ed10ce02ae6$export$f4dd52ca63b5fdde.ApproveMarketplace);
                    else if (currentStepItem.txHash) {
                        setTxHash(currentStepItem.txHash);
                        setAcceptBidStep($56323ed10ce02ae6$export$f4dd52ca63b5fdde.Finalizing);
                    } else setAcceptBidStep($56323ed10ce02ae6$export$f4dd52ca63b5fdde.Confirming);
                } else if (executableSteps.every((step)=>!step.items || step.items.length == 0 || step.items?.every((item)=>item.status === "complete"))) {
                    setAcceptBidStep($56323ed10ce02ae6$export$f4dd52ca63b5fdde.Complete);
                    const lastStepItem = currentStep.items ? currentStep.items[currentStep.items?.length - 1] : undefined;
                    if (lastStepItem) setStepData({
                        totalSteps: stepCount,
                        currentStep: currentStep,
                        currentStepItem: lastStepItem
                    });
                }
            },
            options: options
        }).catch((e)=>{
            const error = e;
            const errorType = error?.type;
            let message = "Oops, something went wrong. Please try again.";
            if (errorType && errorType === "price mismatch") message = error.message;
            const transactionError = new Error(message, {
                cause: error
            });
            setTransactionError(transactionError);
            setAcceptBidStep($56323ed10ce02ae6$export$f4dd52ca63b5fdde.Checkout);
            setStepData(null);
            if (bidId) mutateBids();
            mutateCollection();
            mutateTokens();
        });
    }, [
        tokenId,
        collectionId,
        client,
        signer,
        totalPrice,
        mutateTokens,
        mutateCollection,
        mutateBids
    ]);
    (0, $bNXjM$useEffect)(()=>{
        if (bidId) {
            let price = 0;
            if (bid && bid.status === "active" && bid.price?.netAmount?.native && bid.criteria?.data?.collection?.id === collectionId) {
                if (bid.criteria?.kind === "token") {
                    const tokenSetPieces = bid.tokenSetId.split(":");
                    const bidTokenId = tokenSetPieces[tokenSetPieces.length - 1];
                    if (tokenId === bidTokenId) price = bid.price?.netAmount?.native;
                } else price = bid.price?.netAmount?.native;
            }
            if (!isFetchingBidData) {
                setTotalPrice(price);
                setAcceptBidStep(price > 0 ? $56323ed10ce02ae6$export$f4dd52ca63b5fdde.Checkout : $56323ed10ce02ae6$export$f4dd52ca63b5fdde.Unavailable);
            }
        } else if (token) {
            let topBid = token.market?.topBid?.price?.netAmount?.native;
            if (topBid) {
                setTotalPrice(topBid);
                setAcceptBidStep($56323ed10ce02ae6$export$f4dd52ca63b5fdde.Checkout);
            } else {
                setAcceptBidStep($56323ed10ce02ae6$export$f4dd52ca63b5fdde.Unavailable);
                setTotalPrice(0);
            }
        }
    }, [
        token,
        client,
        bid,
        isFetchingBidData
    ]);
    const { address: address  } = (0, $bNXjM$useAccount)();
    (0, $bNXjM$useEffect)(()=>{
        if (!open) {
            setAcceptBidStep($56323ed10ce02ae6$export$f4dd52ca63b5fdde.Checkout);
            setTxHash(null);
            setStepData(null);
            setTransactionError(null);
        }
    }, [
        open
    ]);
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$Fragment), {
        children: children({
            loading: bidId ? isFetchingBidData || !token : !token,
            token: token,
            collection: collection,
            source: source,
            expiration: expiration,
            totalPrice: totalPrice,
            bidAmount: bidAmount,
            bidAmountCurrency: bidAmountCurrency,
            ethBidAmount: ethBidAmount,
            fees: fees,
            acceptBidStep: acceptBidStep,
            transactionError: transactionError,
            txHash: txHash,
            totalUsd: totalUsd,
            usdPrice: usdPrice,
            address: address,
            etherscanBaseUrl: etherscanBaseUrl,
            acceptBid: acceptBid,
            setAcceptBidStep: setAcceptBidStep,
            stepData: stepData
        })
    });
};






const $fbf72147e3a614fb$export$b25a304ec7d746bb = ({ acceptBidStep: acceptBidStep , etherscanBaseUrl: etherscanBaseUrl , marketplace: marketplace , tokenImage: tokenImage , stepData: stepData  })=>{
    const { chain: activeChain  } = (0, $bNXjM$useNetwork)();
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        direction: "column",
        css: {
            alignItems: "center",
            gap: "$4",
            mt: "$5",
            mb: "$3"
        },
        children: [
            acceptBidStep == (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).ApproveMarketplace && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                        style: "h6",
                        css: {
                            mb: 28
                        },
                        children: stepData && stepData.totalSteps > 2 ? stepData.currentStep.action : `Approve ${marketplace?.name} to access item in your wallet`
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        css: {
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 22,
                            mb: 24
                        },
                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $10061c592b503910$export$2e2bcd8739ae039), {
                            fromImg: tokenImage || "",
                            toImg: marketplace?.image
                        })
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                        style: "subtitle2",
                        css: {
                            mx: 56,
                            textAlign: "center"
                        },
                        children: stepData && stepData.totalSteps > 2 ? stepData.currentStep.description : `We’ll ask your approval for the ${marketplace?.name} exchange to
            access your token. This is a one-time only operation per collection.`
                    })
                ]
            }),
            acceptBidStep == (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).Confirming && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                        style: "h6",
                        children: "Confirm transaction in your wallet"
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                        css: {
                            color: "$neutralText"
                        },
                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                            icon: (0, $bNXjM$faWallet),
                            style: {
                                width: "32px",
                                height: "32px",
                                margin: "12px 0px"
                            }
                        })
                    })
                ]
            }),
            acceptBidStep == (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).Finalizing && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                        style: "h6",
                        children: "Finalizing on blockchain"
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                        css: {
                            color: "$neutralText"
                        },
                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                            icon: (0, $bNXjM$faCube),
                            style: {
                                width: "32px",
                                height: "32px",
                                margin: "12px 0px"
                            }
                        })
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $31d3f3a80135a993$export$2e2bcd8739ae039), {
                        color: "primary",
                        weight: "medium",
                        css: {
                            fontSize: 12
                        },
                        href: etherscanBaseUrl,
                        target: "_blank",
                        children: [
                            "View on ",
                            activeChain?.blockExplorers?.default.name || "Etherscan"
                        ]
                    })
                ]
            })
        ]
    });
};











const $ad71e86fdcf8771a$var$Fees = ({ fees: { feeBreakdown: feeBreakdown  } , marketplace: marketplace  })=>{
    // Return null when there are no fees
    if (!(feeBreakdown && feeBreakdown?.length > 0)) return null;
    const parsedFeeBreakdown = feeBreakdown?.map(({ bps: bps , kind: kind  })=>{
        const percentage = bps ? bps * 0.01 : 0;
        let name = "";
        let tooltipMessage = null;
        switch(kind){
            case "royalty":
                name = "Creator Royalties";
                tooltipMessage = "A fee on every order that goes to the collection creator.";
                break;
            case "marketplace":
                name = `${marketplace} Fee`;
                tooltipMessage = "A fee included in the order from the marketplace in which it was created.";
                break;
            default:
                name = "Misc. Fees";
                break;
        }
        return {
            name: name,
            percentage: percentage,
            tooltipMessage: tooltipMessage
        };
    });
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        css: {
            px: "$4",
            mt: "$4",
            flexDirection: "column"
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "subtitle2",
                color: "subtle",
                css: {
                    mb: "$2"
                },
                children: "Fees"
            }),
            parsedFeeBreakdown?.map(({ name: name , percentage: percentage , tooltipMessage: tooltipMessage  }, i)=>/*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                    css: {
                        justifyContent: "space-between",
                        mb: "$2"
                    },
                    children: [
                        /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                            css: {
                                alignItems: "center",
                                gap: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                    style: "subtitle2",
                                    color: "subtle",
                                    children: name
                                }),
                                tooltipMessage && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f1a77cb69cf0ff83$export$2e2bcd8739ae039), {
                                    side: "right",
                                    width: 200,
                                    content: tooltipMessage
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                            style: "subtitle2",
                            children: [
                                percentage,
                                "%"
                            ]
                        })
                    ]
                }, i))
        ]
    });
};
var $ad71e86fdcf8771a$export$2e2bcd8739ae039 = $ad71e86fdcf8771a$var$Fees;




function $0b4a951eb65dd888$var$titleForStep(step) {
    switch(step){
        case (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).Unavailable:
            return "Selected item is no longer available";
        default:
            return "Accept Offer";
    }
}
function $0b4a951eb65dd888$export$91ee3fa7c9f4e6c2({ openState: openState , trigger: trigger , tokenId: tokenId , collectionId: collectionId , bidId: bidId , normalizeRoyalties: normalizeRoyalties , onBidAccepted: onBidAccepted , onClose: onClose , onBidAcceptError: onBidAcceptError , onCurrentStepUpdate: onCurrentStepUpdate  }) {
    const [open, setOpen] = (0, $d115e0b00eaf4565$export$2e2bcd8739ae039)(openState ? openState[0] : false, openState);
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const { chain: activeChain  } = (0, $bNXjM$useNetwork)();
    const reservoirChain = client?.currentChain();
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $56323ed10ce02ae6$export$2d08bd3f57775802), {
        open: open,
        tokenId: tokenId,
        collectionId: collectionId,
        bidId: bidId,
        normalizeRoyalties: normalizeRoyalties,
        children: ({ loading: loading , token: token , collection: collection , source: source , expiration: expiration , totalPrice: totalPrice , bidAmount: bidAmount , bidAmountCurrency: bidAmountCurrency , ethBidAmount: ethBidAmount , fees: fees , acceptBidStep: acceptBidStep , transactionError: transactionError , txHash: txHash , totalUsd: totalUsd , usdPrice: usdPrice , address: address , etherscanBaseUrl: etherscanBaseUrl , stepData: stepData , acceptBid: acceptBid  })=>{
            const title = $0b4a951eb65dd888$var$titleForStep(acceptBidStep);
            (0, $bNXjM$useEffect)(()=>{
                if (acceptBidStep === (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).Complete && onBidAccepted) {
                    const data = {
                        tokenId: tokenId,
                        collectionId: collectionId,
                        maker: address
                    };
                    if (txHash) data.txHash = txHash;
                    onBidAccepted(data);
                }
            }, [
                acceptBidStep
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (transactionError && onBidAcceptError) {
                    const data = {
                        tokenId: tokenId,
                        collectionId: collectionId,
                        maker: address
                    };
                    onBidAcceptError(transactionError, data);
                }
            }, [
                transactionError
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (stepData && onCurrentStepUpdate) onCurrentStepUpdate(stepData);
            }, [
                stepData
            ]);
            const floorPrice = token?.market?.floorAsk?.price?.amount?.native;
            const difference = floorPrice && ethBidAmount ? (floorPrice - ethBidAmount) / floorPrice * 100 : undefined;
            const warning = difference && difference > 50 ? `${difference}% lower than floor price` : undefined;
            const marketplace = {
                name: source?.name || "Marketplace",
                image: source?.icon || ""
            };
            const tokenImage = token?.token?.image || token?.token?.collection?.image;
            const expires = (0, $c952bf73c842abfc$export$2e2bcd8739ae039)(expiration);
            return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $b86bf9f1e9f1a187$export$2b77a92f1a5ad772), {
                trigger: trigger,
                title: title,
                open: open,
                onOpenChange: (open)=>{
                    if (!open && onClose) {
                        const data = {
                            tokenId: tokenId,
                            collectionId: collectionId,
                            maker: address
                        };
                        onClose(data, stepData, acceptBidStep);
                    }
                    setOpen(open);
                },
                loading: loading,
                children: [
                    acceptBidStep === (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).Unavailable && !loading && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c5f5dee31b69b8f3$export$2e2bcd8739ae039), {
                                tokenDetails: token,
                                collection: collection,
                                usdConversion: usdPrice || 0,
                                isUnavailable: true,
                                price: bidAmount,
                                warning: warning,
                                currency: bidAmountCurrency,
                                expires: expires,
                                isOffer: true,
                                sourceImg: source?.icon ? source.icon : undefined
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                onClick: ()=>setOpen(false),
                                css: {
                                    m: "$4"
                                },
                                children: "Close"
                            })
                        ]
                    }),
                    acceptBidStep === (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).Checkout && !loading && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            transactionError && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    color: "$errorAccent",
                                    p: "$4",
                                    gap: "$2",
                                    background: "$wellBackground"
                                },
                                align: "center",
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                        icon: (0, $bNXjM$faCircleExclamation),
                                        width: 16,
                                        height: 16
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "body2",
                                        color: "errorLight",
                                        children: transactionError.message
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c5f5dee31b69b8f3$export$2e2bcd8739ae039), {
                                tokenDetails: token,
                                collection: collection,
                                usdConversion: usdPrice || 0,
                                price: bidAmount,
                                warning: warning,
                                currency: bidAmountCurrency,
                                expires: expires,
                                isOffer: true,
                                sourceImg: source?.icon ? source.icon : undefined
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $ad71e86fdcf8771a$export$2e2bcd8739ae039), {
                                fees: fees,
                                marketplace: marketplace.name
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                align: "center",
                                justify: "between",
                                css: {
                                    px: "$4",
                                    mt: "$4"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "h6",
                                        children: "You Get"
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                                        textStyle: "h6",
                                        amount: totalPrice,
                                        address: bidAmountCurrency?.contract,
                                        logoWidth: 16
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                justify: "end",
                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $208ab5b0155991db$export$2e2bcd8739ae039), {
                                    amount: totalUsd,
                                    color: "subtle",
                                    css: {
                                        mr: "$4"
                                    }
                                })
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                style: {
                                    flex: 1,
                                    marginBottom: 16,
                                    marginTop: 16,
                                    marginRight: 16,
                                    marginLeft: 16
                                },
                                color: "primary",
                                onClick: acceptBid,
                                children: "Accept"
                            })
                        ]
                    }),
                    (acceptBidStep === (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).Confirming || acceptBidStep === (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).Finalizing || acceptBidStep === (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).ApproveMarketplace) && token && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c5f5dee31b69b8f3$export$2e2bcd8739ae039), {
                                tokenDetails: token,
                                collection: collection,
                                usdConversion: usdPrice || 0,
                                price: bidAmount,
                                warning: warning,
                                currency: bidAmountCurrency,
                                expires: expires,
                                isOffer: true,
                                sourceImg: source?.icon ? source.icon : undefined
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $fbf72147e3a614fb$export$b25a304ec7d746bb), {
                                acceptBidStep: acceptBidStep,
                                etherscanBaseUrl: `${etherscanBaseUrl}/tx/${txHash}`,
                                marketplace: marketplace,
                                tokenImage: tokenImage,
                                stepData: stepData
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                disabled: true,
                                css: {
                                    m: "$4"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {}),
                                    acceptBidStep === (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).Confirming ? "Waiting for approval..." : "Waiting for transaction to be validated"
                                ]
                            })
                        ]
                    }),
                    acceptBidStep === (0, $56323ed10ce02ae6$export$f4dd52ca63b5fdde).Complete && token && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    py: "$5",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center"
                                },
                                children: [
                                    " ",
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                        css: {
                                            color: "$successAccent",
                                            mb: 24
                                        },
                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                            icon: (0, $bNXjM$faCheckCircle),
                                            fontSize: 32
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "h5",
                                        css: {
                                            mb: 8
                                        },
                                        children: "Bid accepted!"
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            mb: 24,
                                            maxWidth: "100%"
                                        },
                                        align: "center",
                                        justify: "center",
                                        children: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                            style: "subtitle2",
                                            css: {
                                                maxWidth: "100%"
                                            },
                                            ellipsify: true,
                                            children: [
                                                "You’ve sold",
                                                " ",
                                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $31d3f3a80135a993$export$2e2bcd8739ae039), {
                                                    color: "primary",
                                                    weight: "medium",
                                                    css: {
                                                        fontSize: 12
                                                    },
                                                    href: `${reservoirChain?.baseApiUrl}/redirect/sources/${client?.source}/tokens/${token.token?.contract}:${token?.token?.tokenId}/link/v2`,
                                                    target: "_blank",
                                                    children: token?.token?.name ? token?.token?.name : `#${token?.token?.tokenId}`
                                                }),
                                                " ",
                                                "from the ",
                                                token?.token?.collection?.name,
                                                " collection."
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $31d3f3a80135a993$export$2e2bcd8739ae039), {
                                        color: "primary",
                                        weight: "medium",
                                        css: {
                                            fontSize: 12
                                        },
                                        href: `${etherscanBaseUrl}/tx/${txHash}`,
                                        target: "_blank",
                                        children: [
                                            "View on",
                                            " ",
                                            activeChain?.blockExplorers?.default.name || "Etherscan"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    flexDirection: "column",
                                    gap: "$3",
                                    "@bp1": {
                                        flexDirection: "row"
                                    }
                                },
                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                    css: {
                                        width: "100%"
                                    },
                                    onClick: ()=>{
                                        setOpen(false);
                                    },
                                    children: "Done"
                                })
                            })
                        ]
                    })
                ]
            });
        }
    });
}
$0b4a951eb65dd888$export$91ee3fa7c9f4e6c2.Custom = (0, $56323ed10ce02ae6$export$2d08bd3f57775802);











let $a77cc70c3ee0a162$export$c5c5c857eaef0fde;
(function(CancelStep) {
    CancelStep[CancelStep["Cancel"] = 0] = "Cancel";
    CancelStep[CancelStep["Approving"] = 1] = "Approving";
    CancelStep[CancelStep["Complete"] = 2] = "Complete";
})($a77cc70c3ee0a162$export$c5c5c857eaef0fde || ($a77cc70c3ee0a162$export$c5c5c857eaef0fde = {}));
const $a77cc70c3ee0a162$export$d2f670ba420b64c2 = ({ open: open , bidId: bidId , normalizeRoyalties: normalizeRoyalties , children: children  })=>{
    const { data: signer  } = (0, $bNXjM$useSigner)();
    const [cancelStep, setCancelStep] = (0, $bNXjM$useState)($a77cc70c3ee0a162$export$c5c5c857eaef0fde.Cancel);
    const [transactionError, setTransactionError] = (0, $bNXjM$useState)();
    const [stepData, setStepData] = (0, $bNXjM$useState)(null);
    const [steps, setSteps] = (0, $bNXjM$useState)(null);
    const { chain: activeChain  } = (0, $bNXjM$useNetwork)();
    const blockExplorerBaseUrl = activeChain?.blockExplorers?.default.url || "https://etherscan.io";
    const { data: bids , isFetchingPage: isFetchingPage  } = (0, $ed463f024c26b3ca$export$2e2bcd8739ae039)({
        ids: bidId,
        normalizeRoyalties: normalizeRoyalties,
        includeCriteriaMetadata: true
    }, {
        revalidateFirstPage: true
    }, open && bidId ? true : false);
    const bid = bids && bids[0] ? bids[0] : undefined;
    const currency = bid?.price?.currency;
    const coinConversion = (0, $742accbc1cb453a5$export$2e2bcd8739ae039)(open && bid ? "USD" : undefined, currency?.symbol);
    const usdPrice = coinConversion !== undefined && coinConversion !== null ? Number(coinConversion) : 0;
    const totalUsd = usdPrice * (bid?.price?.amount?.decimal || 0);
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const cancelOrder = (0, $bNXjM$useCallback)(()=>{
        if (!signer) {
            const error = new Error("Missing a signer");
            setTransactionError(error);
            throw error;
        }
        if (!bidId) {
            const error = new Error("Missing bid id to cancel");
            setTransactionError(error);
            throw error;
        }
        if (!client) {
            const error = new Error("ZooClient was not initialized");
            setTransactionError(error);
            throw error;
        }
        setCancelStep($a77cc70c3ee0a162$export$c5c5c857eaef0fde.Approving);
        client.actions.cancelOrder({
            id: bidId,
            signer: signer,
            onProgress: (steps)=>{
                if (!steps) return;
                setSteps(steps);
                const executableSteps = steps.filter((step)=>step.items && step.items.length > 0);
                let stepCount = executableSteps.length;
                let currentStepItem;
                const currentStepIndex = executableSteps.findIndex((step)=>{
                    currentStepItem = step.items?.find((item)=>item.status === "incomplete");
                    return currentStepItem;
                });
                const currentStep = currentStepIndex > -1 ? executableSteps[currentStepIndex] : executableSteps[stepCount - 1];
                if (currentStepItem) setStepData({
                    totalSteps: stepCount,
                    stepProgress: currentStepIndex,
                    currentStep: currentStep,
                    currentStepItem: currentStepItem
                });
                else if (steps.every((step)=>!step.items || step.items.length == 0 || step.items?.every((item)=>item.status === "complete"))) setCancelStep($a77cc70c3ee0a162$export$c5c5c857eaef0fde.Complete);
            }
        }).catch((e)=>{
            const error = e;
            const message = "Oops, something went wrong. Please try again.";
            const transactionError = new Error(message, {
                cause: error
            });
            setTransactionError(transactionError);
            setCancelStep($a77cc70c3ee0a162$export$c5c5c857eaef0fde.Cancel);
            setStepData(null);
            setSteps(null);
        });
    }, [
        bidId,
        client,
        signer
    ]);
    (0, $bNXjM$useEffect)(()=>{
        if (!open) {
            setCancelStep($a77cc70c3ee0a162$export$c5c5c857eaef0fde.Cancel);
            setTransactionError(null);
            setStepData(null);
            setSteps(null);
        }
    }, [
        open
    ]);
    let tokenId;
    if (bid?.criteria?.kind === "token") tokenId = bid?.tokenSetId?.split(":")[2];
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$Fragment), {
        children: children({
            loading: isFetchingPage !== undefined ? isFetchingPage : true,
            bid: bid,
            tokenId: tokenId,
            cancelStep: cancelStep,
            transactionError: transactionError,
            usdPrice: usdPrice,
            totalUsd: totalUsd,
            blockExplorerBaseUrl: blockExplorerBaseUrl,
            steps: steps,
            stepData: stepData,
            setCancelStep: setCancelStep,
            cancelOrder: cancelOrder
        })
    });
};








function $0e222eb8e6425c4a$export$89d1e00b7fa831db({ openState: openState , bidId: bidId , trigger: trigger , normalizeRoyalties: normalizeRoyalties , onClose: onClose , onCancelComplete: onCancelComplete , onCancelError: onCancelError  }) {
    const [open, setOpen] = (0, $d115e0b00eaf4565$export$2e2bcd8739ae039)(openState ? openState[0] : false, openState);
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const { chain: activeChain  } = (0, $bNXjM$useNetwork)();
    const reservoirChain = client?.currentChain();
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a77cc70c3ee0a162$export$d2f670ba420b64c2), {
        bidId: bidId,
        open: open,
        normalizeRoyalties: normalizeRoyalties,
        children: ({ loading: loading , bid: bid , tokenId: tokenId , cancelStep: cancelStep , transactionError: transactionError , stepData: stepData , totalUsd: totalUsd , blockExplorerBaseUrl: blockExplorerBaseUrl , cancelOrder: cancelOrder  })=>{
            const expires = (0, $c952bf73c842abfc$export$2e2bcd8739ae039)(bid?.expiration);
            const collectionId = bid?.criteria?.data?.collection?.id;
            const bidImg = tokenId ? `${reservoirChain?.baseApiUrl}/redirect/tokens/${collectionId}:${tokenId}/image/v1` : `${reservoirChain?.baseApiUrl}/redirect/collections/${collectionId}/image/v1`;
            const isAttributeOffer = bid?.criteria?.kind === "attribute";
            (0, $bNXjM$useEffect)(()=>{
                if (cancelStep === (0, $a77cc70c3ee0a162$export$c5c5c857eaef0fde).Complete && onCancelComplete) {
                    const data = {
                        bid: bid,
                        stepData: stepData
                    };
                    onCancelComplete(data);
                }
            }, [
                cancelStep
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (transactionError && onCancelError) {
                    const data = {
                        bid: bid,
                        stepData: stepData
                    };
                    onCancelError(transactionError, data);
                }
            }, [
                transactionError
            ]);
            const isBidAvailable = bid && (bid.status === "active" || bid.status === "inactive") && !loading;
            return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $b86bf9f1e9f1a187$export$2b77a92f1a5ad772), {
                trigger: trigger,
                title: "Cancel Offer",
                open: open,
                onOpenChange: (open)=>{
                    if (!open && onClose) {
                        const data = {
                            bid: bid,
                            stepData: stepData
                        };
                        onClose(data, cancelStep);
                    }
                    setOpen(open);
                },
                loading: loading,
                children: [
                    !isBidAvailable && !loading && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        justify: "center",
                        css: {
                            px: "$4",
                            py: "$6"
                        },
                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                            style: "h6",
                            css: {
                                textAlign: "center"
                            },
                            children: "Selected bid is no longer available"
                        })
                    }),
                    isBidAvailable && cancelStep === (0, $a77cc70c3ee0a162$export$c5c5c857eaef0fde).Cancel && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            transactionError && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    color: "$errorAccent",
                                    p: "$4",
                                    gap: "$2",
                                    background: "$wellBackground"
                                },
                                align: "center",
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                        icon: (0, $bNXjM$faCircleExclamation),
                                        width: 16,
                                        height: 16
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "body2",
                                        color: "errorLight",
                                        children: transactionError.message
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    borderBottom: "1px solid $borderColor"
                                },
                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bd031fc677b64fb0$export$2e2bcd8739ae039), {
                                    img: bidImg,
                                    name: bid?.criteria?.data?.token?.name,
                                    price: bid?.price?.amount?.decimal,
                                    usdPrice: totalUsd,
                                    collection: bid?.criteria?.data?.collection?.name || "",
                                    currencyContract: bid?.price?.currency?.contract,
                                    currencyDecimals: bid?.price?.currency?.decimals,
                                    expires: expires,
                                    source: bid?.source?.icon || "",
                                    isOffer: true
                                })
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                style: "body3",
                                color: "subtle",
                                css: {
                                    mt: "$3",
                                    mr: "$3",
                                    ml: "$3",
                                    textAlign: "center"
                                },
                                children: "This will cancel your offer. You will be asked to confirm this cancelation from your wallet."
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                onClick: cancelOrder,
                                css: {
                                    m: "$4"
                                },
                                children: "Continue to Cancel"
                            })
                        ]
                    }),
                    cancelStep === (0, $a77cc70c3ee0a162$export$c5c5c857eaef0fde).Approving && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    borderBottom: "1px solid $borderColor"
                                },
                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bd031fc677b64fb0$export$2e2bcd8739ae039), {
                                    img: bidImg,
                                    name: bid?.criteria?.data?.token?.name,
                                    price: bid?.price?.amount?.decimal,
                                    usdPrice: totalUsd,
                                    collection: bid?.criteria?.data?.collection?.name || "",
                                    currencyContract: bid?.price?.currency?.contract,
                                    currencyDecimals: bid?.price?.currency?.decimals,
                                    expires: expires,
                                    source: bid?.source?.icon || "",
                                    isOffer: true
                                })
                            }),
                            !stepData && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {
                                css: {
                                    height: 206
                                }
                            }),
                            stepData && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $168bea4f9c9e5bd1$export$2e2bcd8739ae039), {
                                        title: stepData?.currentStepItem.txHash ? "Finalizing on blockchain" : "Confirm cancelation in your wallet",
                                        txHash: stepData?.currentStepItem.txHash,
                                        blockExplorerBaseUrl: `${blockExplorerBaseUrl}/tx/${stepData?.currentStepItem.txHash}`
                                    }),
                                    isAttributeOffer && !stepData?.currentStepItem.txHash && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        justify: "center",
                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                            style: "body3",
                                            color: "subtle",
                                            css: {
                                                maxWidth: 400,
                                                textAlign: "center",
                                                mx: "$3"
                                            },
                                            children: "This will cancel your offer on all items that were included in this attribute offer."
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                disabled: true,
                                css: {
                                    m: "$4"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {}),
                                    stepData?.currentStepItem.txHash ? "Waiting for transaction to be validated" : "Waiting for approval..."
                                ]
                            })
                        ]
                    }),
                    cancelStep === (0, $a77cc70c3ee0a162$export$c5c5c857eaef0fde).Complete && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    py: "$5",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "h5",
                                        css: {
                                            mb: "$2"
                                        },
                                        children: "Offer Canceled!"
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "body3",
                                        color: "subtle",
                                        css: {
                                            mb: 24
                                        },
                                        children: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                            children: [
                                                "Your",
                                                " ",
                                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                    style: "body3",
                                                    color: "accent",
                                                    children: bid?.source?.name
                                                }),
                                                " ",
                                                "offer for",
                                                " ",
                                                /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                    style: "body3",
                                                    color: "accent",
                                                    children: [
                                                        bid?.criteria?.data?.token?.name || bid?.criteria?.data?.collection?.name,
                                                        " "
                                                    ]
                                                }),
                                                "at ",
                                                bid?.price?.amount?.decimal,
                                                " ",
                                                bid?.price?.currency?.symbol,
                                                " has been canceled."
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $31d3f3a80135a993$export$2e2bcd8739ae039), {
                                        color: "primary",
                                        weight: "medium",
                                        css: {
                                            fontSize: 12
                                        },
                                        href: `${blockExplorerBaseUrl}/tx/${stepData?.currentStepItem.txHash}`,
                                        target: "_blank",
                                        children: [
                                            "View on",
                                            " ",
                                            activeChain?.blockExplorers?.default.name || "Etherscan"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                onClick: ()=>{
                                    setOpen(false);
                                },
                                css: {
                                    m: "$4"
                                },
                                children: "Close"
                            })
                        ]
                    })
                ]
            });
        }
    });
}
$0e222eb8e6425c4a$export$89d1e00b7fa831db.Custom = (0, $a77cc70c3ee0a162$export$d2f670ba420b64c2);











let $92f34bd13bb54e67$export$c5c5c857eaef0fde;
(function(CancelStep) {
    CancelStep[CancelStep["Cancel"] = 0] = "Cancel";
    CancelStep[CancelStep["Approving"] = 1] = "Approving";
    CancelStep[CancelStep["Complete"] = 2] = "Complete";
})($92f34bd13bb54e67$export$c5c5c857eaef0fde || ($92f34bd13bb54e67$export$c5c5c857eaef0fde = {}));
const $92f34bd13bb54e67$export$784ecbb108ae6a2c = ({ open: open , listingId: listingId , normalizeRoyalties: normalizeRoyalties , children: children  })=>{
    const { data: signer  } = (0, $bNXjM$useSigner)();
    const [cancelStep, setCancelStep] = (0, $bNXjM$useState)($92f34bd13bb54e67$export$c5c5c857eaef0fde.Cancel);
    const [transactionError, setTransactionError] = (0, $bNXjM$useState)();
    const [stepData, setStepData] = (0, $bNXjM$useState)(null);
    const [steps, setSteps] = (0, $bNXjM$useState)(null);
    const { chain: activeChain  } = (0, $bNXjM$useNetwork)();
    const blockExplorerBaseUrl = activeChain?.blockExplorers?.default.url || "https://etherscan.io";
    const { data: listings , isFetchingPage: isFetchingPage  } = (0, $40f16bae928ea461$export$2e2bcd8739ae039)({
        ids: listingId,
        normalizeRoyalties: normalizeRoyalties,
        includeCriteriaMetadata: true
    }, {
        revalidateFirstPage: true
    }, open && listingId ? true : false);
    const listing = listings && listings[0] ? listings[0] : undefined;
    const currency = listing?.price?.currency;
    const coinConversion = (0, $742accbc1cb453a5$export$2e2bcd8739ae039)(open && listing ? "USD" : undefined, currency?.symbol);
    const usdPrice = coinConversion !== undefined && coinConversion !== null ? Number(coinConversion) : 0;
    const totalUsd = usdPrice * (listing?.price?.amount?.decimal || 0);
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const cancelOrder = (0, $bNXjM$useCallback)(()=>{
        if (!signer) {
            const error = new Error("Missing a signer");
            setTransactionError(error);
            throw error;
        }
        if (!listingId) {
            const error = new Error("Missing list id to cancel");
            setTransactionError(error);
            throw error;
        }
        if (!client) {
            const error = new Error("ZooClient was not initialized");
            setTransactionError(error);
            throw error;
        }
        setCancelStep($92f34bd13bb54e67$export$c5c5c857eaef0fde.Approving);
        client.actions.cancelOrder({
            id: listingId,
            signer: signer,
            onProgress: (steps)=>{
                if (!steps) return;
                setSteps(steps);
                const executableSteps = steps.filter((step)=>step.items && step.items.length > 0);
                let stepCount = executableSteps.length;
                let currentStepItem;
                const currentStepIndex = executableSteps.findIndex((step)=>{
                    currentStepItem = step.items?.find((item)=>item.status === "incomplete");
                    return currentStepItem;
                });
                const currentStep = currentStepIndex > -1 ? executableSteps[currentStepIndex] : executableSteps[stepCount - 1];
                if (currentStepItem) setStepData({
                    totalSteps: stepCount,
                    stepProgress: currentStepIndex,
                    currentStep: currentStep,
                    currentStepItem: currentStepItem
                });
                else if (steps.every((step)=>!step.items || step.items.length == 0 || step.items?.every((item)=>item.status === "complete"))) setCancelStep($92f34bd13bb54e67$export$c5c5c857eaef0fde.Complete);
            }
        }).catch((e)=>{
            const error = e;
            const message = "Oops, something went wrong. Please try again.";
            //@ts-ignore: Should be fixed in an update to typescript
            const transactionError = new Error(message, {
                cause: error
            });
            setTransactionError(transactionError);
            setCancelStep($92f34bd13bb54e67$export$c5c5c857eaef0fde.Cancel);
            setStepData(null);
            setSteps(null);
        });
    }, [
        listingId,
        client,
        signer
    ]);
    (0, $bNXjM$useEffect)(()=>{
        if (!open) {
            setCancelStep($92f34bd13bb54e67$export$c5c5c857eaef0fde.Cancel);
            setTransactionError(null);
            setStepData(null);
            setSteps(null);
        }
    }, [
        open
    ]);
    const tokenId = listing?.tokenSetId?.split(":")[2];
    const contract = listing?.tokenSetId?.split(":")[1];
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$Fragment), {
        children: children({
            loading: isFetchingPage !== undefined ? isFetchingPage : true,
            listing: listing,
            tokenId: tokenId,
            contract: contract,
            cancelStep: cancelStep,
            transactionError: transactionError,
            usdPrice: usdPrice,
            totalUsd: totalUsd,
            blockExplorerBaseUrl: blockExplorerBaseUrl,
            steps: steps,
            stepData: stepData,
            setCancelStep: setCancelStep,
            cancelOrder: cancelOrder
        })
    });
};








function $93ba2f12ea89aa2b$export$5ccdc2f8532db25b({ openState: openState , listingId: listingId , trigger: trigger , normalizeRoyalties: normalizeRoyalties , onClose: onClose , onCancelComplete: onCancelComplete , onCancelError: onCancelError  }) {
    const [open, setOpen] = (0, $d115e0b00eaf4565$export$2e2bcd8739ae039)(openState ? openState[0] : false, openState);
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const { chain: activeChain  } = (0, $bNXjM$useNetwork)();
    const reservoirChain = client?.currentChain();
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $92f34bd13bb54e67$export$784ecbb108ae6a2c), {
        listingId: listingId,
        open: open,
        normalizeRoyalties: normalizeRoyalties,
        children: ({ loading: loading , listing: listing , tokenId: tokenId , contract: contract , cancelStep: cancelStep , transactionError: transactionError , stepData: stepData , totalUsd: totalUsd , blockExplorerBaseUrl: blockExplorerBaseUrl , cancelOrder: cancelOrder  })=>{
            const expires = (0, $c952bf73c842abfc$export$2e2bcd8739ae039)(listing?.expiration);
            const listingImg = tokenId ? `${reservoirChain?.baseApiUrl}/redirect/tokens/${contract}:${tokenId}/image/v1` : `${reservoirChain?.baseApiUrl}/redirect/collections/${contract}/image/v1`;
            (0, $bNXjM$useEffect)(()=>{
                if (cancelStep === (0, $92f34bd13bb54e67$export$c5c5c857eaef0fde).Complete && onCancelComplete) {
                    const data = {
                        listing: listing,
                        stepData: stepData
                    };
                    onCancelComplete(data);
                }
            }, [
                cancelStep
            ]);
            (0, $bNXjM$useEffect)(()=>{
                if (transactionError && onCancelError) {
                    const data = {
                        listing: listing,
                        stepData: stepData
                    };
                    onCancelError(transactionError, data);
                }
            }, [
                transactionError
            ]);
            const isListingAvailable = listing && (listing.status === "active" || listing.status === "inactive") && !loading;
            return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $b86bf9f1e9f1a187$export$2b77a92f1a5ad772), {
                trigger: trigger,
                title: "Cancel Listing",
                open: open,
                onOpenChange: (open)=>{
                    if (!open && onClose) {
                        const data = {
                            listing: listing,
                            stepData: stepData
                        };
                        onClose(data, cancelStep);
                    }
                    setOpen(open);
                },
                loading: loading,
                children: [
                    !isListingAvailable && !loading && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        justify: "center",
                        css: {
                            px: "$4",
                            py: "$6"
                        },
                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                            style: "h6",
                            css: {
                                textAlign: "center"
                            },
                            children: "Selected listing is no longer available"
                        })
                    }),
                    isListingAvailable && cancelStep === (0, $92f34bd13bb54e67$export$c5c5c857eaef0fde).Cancel && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            transactionError && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    color: "$errorAccent",
                                    p: "$4",
                                    gap: "$2",
                                    background: "$wellBackground"
                                },
                                align: "center",
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                        icon: (0, $bNXjM$faCircleExclamation),
                                        width: 16,
                                        height: 16
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "body2",
                                        color: "errorLight",
                                        children: transactionError.message
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    borderBottom: "1px solid $borderColor"
                                },
                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bd031fc677b64fb0$export$2e2bcd8739ae039), {
                                    img: listingImg,
                                    name: listing.criteria?.data?.token?.name,
                                    price: listing?.price?.amount?.decimal,
                                    usdPrice: totalUsd,
                                    collection: listing.criteria?.data?.collection?.name || "",
                                    currencyContract: listing.price?.currency?.contract,
                                    currencyDecimals: listing?.price?.currency?.decimals,
                                    expires: expires,
                                    source: listing?.source?.icon || ""
                                })
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                style: "body3",
                                color: "subtle",
                                css: {
                                    mt: "$3",
                                    mr: "$3",
                                    ml: "$3",
                                    textAlign: "center"
                                },
                                children: "This will cancel your listing. You will be asked to confirm this cancelation from your wallet."
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                onClick: cancelOrder,
                                css: {
                                    m: "$4"
                                },
                                children: "Continue to Cancel"
                            })
                        ]
                    }),
                    cancelStep === (0, $92f34bd13bb54e67$export$c5c5c857eaef0fde).Approving && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    borderBottom: "1px solid $borderColor"
                                },
                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bd031fc677b64fb0$export$2e2bcd8739ae039), {
                                    img: listingImg,
                                    name: listing?.criteria?.data?.token?.name,
                                    price: listing?.price?.amount?.decimal,
                                    usdPrice: totalUsd,
                                    collection: listing?.criteria?.data?.collection?.name || "",
                                    currencyContract: listing?.price?.currency?.contract,
                                    currencyDecimals: listing?.price?.currency?.decimals,
                                    expires: expires,
                                    source: listing?.source?.icon || ""
                                })
                            }),
                            !stepData && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {
                                css: {
                                    height: 206
                                }
                            }),
                            stepData && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$Fragment), {
                                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $168bea4f9c9e5bd1$export$2e2bcd8739ae039), {
                                    title: stepData?.currentStepItem.txHash ? "Finalizing on blockchain" : "Confirm cancelation in your wallet",
                                    txHash: stepData?.currentStepItem.txHash,
                                    blockExplorerBaseUrl: `${blockExplorerBaseUrl}/tx/${stepData?.currentStepItem.txHash}`
                                })
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                disabled: true,
                                css: {
                                    m: "$4"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {}),
                                    stepData?.currentStepItem.txHash ? "Waiting for transaction to be validated" : "Waiting for approval..."
                                ]
                            })
                        ]
                    }),
                    cancelStep === (0, $92f34bd13bb54e67$export$c5c5c857eaef0fde).Complete && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        direction: "column",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                css: {
                                    p: "$4",
                                    py: "$5",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "h5",
                                        css: {
                                            mb: "$2"
                                        },
                                        children: "Listing Canceled!"
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "body3",
                                        color: "subtle",
                                        css: {
                                            mb: 24
                                        },
                                        children: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $bNXjM$Fragment), {
                                            children: [
                                                "Your",
                                                " ",
                                                /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                    style: "body3",
                                                    color: "accent",
                                                    children: listing?.source?.name
                                                }),
                                                " ",
                                                "listing for",
                                                " ",
                                                /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                    style: "body3",
                                                    color: "accent",
                                                    children: [
                                                        listing?.criteria?.data?.token?.name || listing?.criteria?.data?.collection?.name,
                                                        " "
                                                    ]
                                                }),
                                                "at ",
                                                listing?.price?.amount?.decimal,
                                                " ",
                                                listing?.price?.currency?.symbol,
                                                " has been canceled."
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $31d3f3a80135a993$export$2e2bcd8739ae039), {
                                        color: "primary",
                                        weight: "medium",
                                        css: {
                                            fontSize: 12
                                        },
                                        href: `${blockExplorerBaseUrl}/tx/${stepData?.currentStepItem.txHash}`,
                                        target: "_blank",
                                        children: [
                                            "View on",
                                            " ",
                                            activeChain?.blockExplorers?.default.name || "Etherscan"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                onClick: ()=>{
                                    setOpen(false);
                                },
                                css: {
                                    m: "$4"
                                },
                                children: "Close"
                            })
                        ]
                    })
                ]
            });
        }
    });
}
$93ba2f12ea89aa2b$export$5ccdc2f8532db25b.Custom = (0, $92f34bd13bb54e67$export$784ecbb108ae6a2c);






let $34d36a7c680f3f16$var$modelViewerInjected = false;
const $34d36a7c680f3f16$var$importScript = (src)=>{
    if (document) {
        const script = document.createElement("script");
        script.async = true;
        script.src = src;
        script.type = "module";
        document.body.appendChild(script);
    }
};
const $34d36a7c680f3f16$var$useModelViewer = (enabled)=>{
    (0, $bNXjM$useEffect)(()=>{
        if (enabled && !$34d36a7c680f3f16$var$modelViewerInjected) {
            $34d36a7c680f3f16$var$modelViewerInjected = true;
            $34d36a7c680f3f16$var$importScript("https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js");
        }
    }, [
        enabled
    ]);
};
var $34d36a7c680f3f16$export$2e2bcd8739ae039 = $34d36a7c680f3f16$var$useModelViewer;









const $612d895dc0e4af81$var$MediaPlayButton = ({ mediaRef: mediaRef  })=>{
    const [playing, setPlaying] = (0, $bNXjM$useState)(false);
    (0, $bNXjM$useEffect)(()=>{
        if (mediaRef.current) {
            mediaRef.current.onplaying = ()=>{
                setPlaying(true);
            };
            mediaRef.current.onpause = ()=>{
                setPlaying(false);
            };
        }
        return ()=>{
            if (mediaRef.current) {
                mediaRef.current.onplaying = null;
                mediaRef.current.onpause = null;
            }
        };
    }, [
        mediaRef
    ]);
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
        css: {
            zIndex: 5,
            position: "absolute",
            right: 16,
            bottom: 16,
            backdropFilter: "blur(2px)",
            background: "rgba(105, 113, 119, 0.5)",
            width: 48,
            height: 48,
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            "&:hover": {
                background: "rgba(105, 113, 119, 0.7)"
            }
        },
        onClick: (e)=>{
            e.preventDefault();
            if (mediaRef.current) {
                if (mediaRef.current.paused) mediaRef.current.play();
                else mediaRef.current.pause();
            }
        },
        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
            icon: playing ? (0, $bNXjM$faPause) : (0, $bNXjM$faPlay),
            width: 24,
            height: 24
        })
    });
};
var $612d895dc0e4af81$export$2e2bcd8739ae039 = $612d895dc0e4af81$var$MediaPlayButton;








const $10d057445baf6773$var$TokenFallback = ({ style: style , className: className , token: token , chainId: chainId , onRefreshClicked: onRefreshClicked  })=>{
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const reservoirChain = chainId ? client?.chains.find((chain)=>chain.id === chainId) : client?.currentChain();
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        justify: "center",
        align: "center",
        direction: "column",
        css: {
            gap: "$2",
            aspectRatio: "1/1",
            p: "$2",
            ...style
        },
        className: className,
        children: [
            token?.collection?.image && /*#__PURE__*/ (0, $bNXjM$jsx)("img", {
                style: {
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 8
                },
                src: token?.collection?.image
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                style: "body3",
                css: {
                    textAlign: "center"
                },
                children: "No Content Available"
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                color: "secondary",
                onClick: ()=>{
                    if (!reservoirChain) throw "ZooClient missing chain configuration";
                    onRefreshClicked();
                    const url = `${reservoirChain?.baseApiUrl}/tokens/refresh/v1`;
                    const body = {
                        token: `${token?.collection?.id}:${token?.tokenId}`
                    };
                    const headers = {
                        ...(0, $0a64ae8247e4abb5$export$a6f1ecf08e412113)(reservoirChain?.apiKey, client?.version),
                        "Content-Type": "application/json"
                    };
                    fetch(url, {
                        headers: headers,
                        method: "POST",
                        body: JSON.stringify(body)
                    }).then((res)=>res.json()).catch((e)=>{
                        throw e;
                    });
                },
                children: "Refresh"
            })
        ]
    });
};
var $10d057445baf6773$export$2e2bcd8739ae039 = $10d057445baf6773$var$TokenFallback;


const $965711be26a09bce$export$b7d45a46da28b4d3 = (token)=>{
    let extension = null;
    if (token?.media) {
        const pieces = token.media.split("/");
        const file = pieces && pieces[pieces.length - 1] ? pieces[pieces.length - 1] : null;
        const matches = file ? file.match("(\\.[^.]+)$") : null;
        extension = matches && matches[0] ? matches[0].replace(".", "") : null;
    }
    return extension ? extension : null;
};
const $965711be26a09bce$var$TokenMedia = ({ preview: preview , token: token , style: style , className: className , modelViewerOptions: modelViewerOptions = {} , videoOptions: videoOptions = {} , audioOptions: audioOptions = {} , iframeOptions: iframeOptions = {} , fallback: fallback , onError: onError = ()=>{} , onRefreshToken: onRefreshToken = ()=>{}  })=>{
    const mediaRef = (0, $bNXjM$useRef)(null);
    const themeContext = (0, $bNXjM$useContext)((0, $b15843e937ac72b8$export$2c657da244d00bd6));
    let borderRadius = themeContext?.radii?.borderRadius?.value || "0";
    const [error, setError] = (0, $bNXjM$useState)(null);
    const media = token?.media;
    const tokenPreview = token?.image;
    const mediaType = $965711be26a09bce$export$b7d45a46da28b4d3(token);
    const defaultStyle = {
        width: "150px",
        height: "150px",
        objectFit: "cover",
        borderRadius: borderRadius,
        position: "relative"
    };
    const computedStyle = {
        ...defaultStyle,
        ...style
    };
    (0, $34d36a7c680f3f16$export$2e2bcd8739ae039)(!preview && mediaType && (mediaType === "gltf" || mediaType === "glb") ? true : false);
    const [measurements, containerRef] = (0, $bNXjM$useMeasure)();
    const isContainerLarge = (measurements?.width || 0) >= 360;
    if (!token && !preview) {
        console.warn("A token object or a media url are required!");
        return null;
    }
    if (error || !media && !tokenPreview) {
        let fallbackElement;
        if (fallback) fallbackElement = fallback(mediaType);
        if (!fallbackElement) fallbackElement = /*#__PURE__*/ (0, $bNXjM$jsx)((0, $10d057445baf6773$export$2e2bcd8739ae039), {
            style: style,
            className: className,
            token: token,
            onRefreshClicked: onRefreshToken
        });
        return fallbackElement;
    }
    const onErrorCb = (e)=>{
        setError(e);
        onError(e.nativeEvent);
    };
    if (preview || !media) return /*#__PURE__*/ (0, $bNXjM$jsx)("img", {
        alt: "Token Image",
        src: tokenPreview,
        style: {
            ...computedStyle,
            visibility: !tokenPreview || tokenPreview.length === 0 ? "hidden" : "visible"
        },
        className: className,
        onError: onErrorCb
    });
    // VIDEO
    if (mediaType === "mp4") return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
        className: className,
        style: computedStyle,
        ref: containerRef,
        children: [
            !isContainerLarge && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $612d895dc0e4af81$export$2e2bcd8739ae039), {
                mediaRef: mediaRef
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)("video", {
                style: computedStyle,
                className: className,
                poster: tokenPreview,
                ...videoOptions,
                controls: isContainerLarge,
                loop: true,
                playsInline: true,
                onError: onErrorCb,
                ref: mediaRef,
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)("source", {
                        src: media,
                        type: "video/mp4"
                    }),
                    "Your browser does not support the",
                    /*#__PURE__*/ (0, $bNXjM$jsx)("code", {
                        children: "video"
                    }),
                    " element."
                ]
            })
        ]
    });
    // AUDIO
    if (mediaType === "wav" || mediaType === "mp3") return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
        className: className,
        style: computedStyle,
        ref: containerRef,
        children: [
            !isContainerLarge && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $612d895dc0e4af81$export$2e2bcd8739ae039), {
                mediaRef: mediaRef
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)("img", {
                alt: "Audio Poster",
                src: tokenPreview,
                style: {
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    visibility: !tokenPreview || tokenPreview.length === 0 ? "hidden" : "visible",
                    objectFit: "cover"
                },
                onError: onErrorCb
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)("audio", {
                src: media,
                ...audioOptions,
                onError: onErrorCb,
                ref: mediaRef,
                controls: isContainerLarge,
                style: {
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    width: "calc(100% - 32px)"
                },
                children: [
                    "Your browser does not support the",
                    /*#__PURE__*/ (0, $bNXjM$jsx)("code", {
                        children: "audio"
                    }),
                    " element."
                ]
            })
        ]
    });
    // 3D
    if (mediaType === "gltf" || mediaType === "glb") return /*#__PURE__*/ (0, $bNXjM$jsx)("model-viewer", {
        src: media,
        ar: true,
        "ar-modes": "webxr scene-viewer quick-look",
        poster: tokenPreview,
        "seamless-poster": true,
        "shadow-intensity": "1",
        "camera-controls": true,
        "enable-pan": true,
        ...modelViewerOptions,
        style: computedStyle,
        className: className,
        onError: onErrorCb
    });
    //Image
    if (mediaType === "png" || mediaType === "jpeg" || mediaType === "jpg" || mediaType === "gif") return /*#__PURE__*/ (0, $bNXjM$jsx)("img", {
        alt: "Token Image",
        src: media,
        className: className,
        style: {
            ...computedStyle,
            visibility: !media || media.length === 0 ? "hidden" : "visible"
        },
        onError: onErrorCb
    });
    // HTML
    if (mediaType === "html" || mediaType === null || mediaType === undefined || mediaType === "other" || mediaType === "svg") return /*#__PURE__*/ (0, $bNXjM$jsx)("iframe", {
        style: computedStyle,
        className: className,
        src: media,
        sandbox: "allow-scripts",
        frameBorder: "0",
        ...iframeOptions
    });
    return /*#__PURE__*/ (0, $bNXjM$jsx)("img", {
        alt: "Token Image",
        src: tokenPreview,
        style: {
            ...computedStyle,
            visibility: !tokenPreview || tokenPreview.length === 0 ? "hidden" : "visible"
        },
        className: className,
        onError: onErrorCb
    });
};
var $965711be26a09bce$export$2e2bcd8739ae039 = $965711be26a09bce$var$TokenMedia;





















const $d75deef711b420b1$var$CartItemImage = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)("img", {
    width: 56,
    height: 56,
    borderRadius: 4,
    objectFit: "cover"
});
const $d75deef711b420b1$var$CloseButton = (0, $fcefeedae0fec8b6$export$3817b7a54a07cec7)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
    position: "absolute",
    width: 24,
    height: 24,
    top: -8,
    right: -8,
    flexShrink: 0,
    defaultVariants: {
        size: "none",
        corners: "circle"
    }
});
const $d75deef711b420b1$var$CartItem = ({ item: item , usdConversion: usdConversion , tokenUrl: tokenUrl  })=>{
    const { token: token , collection: collection , isBannedOnOpensea: isBannedOnOpensea  } = item;
    const contract = collection.id.split(":")[0];
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const { remove: remove , data: cartCurrency  } = (0, $50bacb8bed3891ec$export$2e2bcd8739ae039)((cart)=>cart.currency);
    const { data: cartChain  } = (0, $50bacb8bed3891ec$export$2e2bcd8739ae039)((cart)=>cart.chain);
    let price = item.price?.currency?.contract !== cartCurrency?.contract ? item.price?.amount?.native : item.price?.amount?.decimal;
    let previousPrice = item.previousPrice?.currency?.contract !== cartCurrency?.contract ? item.previousPrice?.amount?.native : item.previousPrice?.amount?.decimal;
    let priceDiff = 0;
    let priceIncrease = false;
    let priceDecrease = false;
    if (price !== undefined && previousPrice !== undefined) {
        priceDiff = Math.abs((price - previousPrice) / price * 100);
        priceIncrease = price > previousPrice;
        priceDecrease = price < previousPrice;
    }
    const usdPrice = (usdConversion || 0) * (price || 0);
    const reservoirChain = client?.chains.find((chain)=>cartChain?.id === chain.id);
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        onClick: ()=>{
            const chain = Object.values($bNXjM$wagmichains).find((chain)=>cartChain?.id === chain.id);
            let url = tokenUrl;
            if (!url && cartChain) {
                let tokenMetaKey = null;
                if (cartChain.id === (0, $bNXjM$mainnet).id) tokenMetaKey = "reservoir:token-url-mainnet";
                else tokenMetaKey = `reservoir:token-url-${chain?.name.toLowerCase()}`;
                const tokenMetaTag = document.querySelector(`meta[property='${tokenMetaKey}']`);
                if (tokenMetaTag) url = tokenMetaTag.getAttribute("content") || undefined;
            }
            if (url) window.location.href = url.replace("${contract}", contract).replace("${tokenId}", token.id);
        },
        css: {
            width: "100%",
            px: 24,
            py: 8,
            transition: "background-color 0.25s ease-in-out",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "$neutralBgHover",
                [`& ${$d75deef711b420b1$var$CloseButton}`]: {
                    background: "$errorAccent"
                }
            }
        },
        children: [
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                css: {
                    position: "relative",
                    minWidth: 0,
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)($d75deef711b420b1$var$CartItemImage, {
                        src: `${reservoirChain?.baseApiUrl}/redirect/tokens/${contract}:${token.id}/image/v1`,
                        css: !price ? {
                            filter: "grayscale(1)"
                        } : {}
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)($d75deef711b420b1$var$CloseButton, {
                        css: {
                            background: item.isBannedOnOpensea || !item.price ? "$errorAccent" : "$neutralSolid"
                        },
                        onClick: (e)=>{
                            e.stopPropagation();
                            e.preventDefault();
                            remove([
                                `${collection.id}:${token.id}`
                            ]);
                        },
                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                            icon: (0, $bNXjM$faClose),
                            width: "16",
                            height: "16"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                direction: "column",
                justify: "center",
                css: {
                    gap: 2,
                    ml: "$2",
                    minWidth: 0
                },
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        align: "center",
                        css: {
                            gap: "$1"
                        },
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                style: "h6",
                                color: price ? undefined : "subtle",
                                ellipsify: true,
                                children: token.name ? token.name : `#${token.id}`
                            }),
                            isBannedOnOpensea && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f1a77cb69cf0ff83$export$2e2bcd8739ae039), {
                                side: "bottom",
                                width: 200,
                                content: "Item not tradeable on OpenSea",
                                kind: "error"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                        style: "body2",
                        color: "subtle",
                        ellipsify: true,
                        children: collection.name
                    }),
                    !price && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                        style: "body2",
                        color: "error",
                        children: "Item no longer available"
                    }),
                    priceIncrease && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        css: {
                            gap: "$1",
                            color: "$accentSolidHover"
                        },
                        align: "center",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                width: "11",
                                icon: (0, $bNXjM$faArrowUp)
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                style: "body2",
                                color: "accent",
                                children: [
                                    "Price has gone up ",
                                    (0, $e70e85f6f4e64430$export$f5dd818bff069720)(priceDiff),
                                    "%"
                                ]
                            })
                        ]
                    }),
                    priceDecrease && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                        css: {
                            gap: "$1",
                            color: "$accentSolidHover"
                        },
                        align: "center",
                        children: [
                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                width: "11",
                                icon: (0, $bNXjM$faArrowDown)
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                style: "body2",
                                color: "accent",
                                children: [
                                    "Price went down ",
                                    (0, $e70e85f6f4e64430$export$f5dd818bff069720)(priceDiff),
                                    "%"
                                ]
                            })
                        ]
                    })
                ]
            }),
            price && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                direction: "column",
                justify: "center",
                css: {
                    ml: "auto",
                    flexShrink: 0,
                    gap: "$1",
                    "> div": {
                        ml: "auto"
                    }
                },
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                        textStyle: "subtitle2",
                        amount: price,
                        address: cartCurrency?.contract,
                        decimals: cartCurrency?.decimals,
                        logoWidth: 12,
                        chainId: cartChain?.id
                    }),
                    usdPrice && usdPrice > 0 && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $208ab5b0155991db$export$2e2bcd8739ae039), {
                        amount: usdPrice,
                        style: "tiny",
                        color: "subtle",
                        css: {
                            textAlign: "end"
                        }
                    })
                ]
            })
        ]
    });
};
var $d75deef711b420b1$export$2e2bcd8739ae039 = $d75deef711b420b1$var$CartItem;







const $7ae733b262346b1b$var$CartToast = ({ kind: kind = "success" , message: message , link: link  })=>{
    return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
        css: {
            width: "100%",
            background: "$wellBackground",
            p: "$2",
            borderRadius: "$borderRadius",
            mb: "$2"
        },
        children: [
            kind === "success" && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                color: "success",
                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                    icon: (0, $bNXjM$faCircleCheck),
                    width: "16",
                    height: "16"
                })
            }),
            kind === "error" && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                color: "error",
                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                    icon: (0, $bNXjM$faTriangleExclamation),
                    width: "16",
                    height: "16"
                })
            }),
            kind === "warning" && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                color: "error",
                children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                    icon: (0, $bNXjM$faCircleInfo),
                    width: "16",
                    height: "16"
                })
            }),
            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                css: {
                    ml: "$1",
                    mt: 3
                },
                style: "body2",
                children: message
            }),
            link
        ]
    });
};
var $7ae733b262346b1b$export$2e2bcd8739ae039 = $7ae733b262346b1b$var$CartToast;









const $208cf8c19944ad35$export$6c07efeb053daea6 = ({ open: open , children: children  })=>{
    const client = (0, $c6195489119ab58a$export$2e2bcd8739ae039)();
    const [hasEnoughCurrency, setHasEnoughCurrency] = (0, $bNXjM$useState)(true);
    const { data: data , clear: clear , clearTransaction: clearTransaction , validate: validate , remove: remove , add: add , checkout: checkout  } = (0, $50bacb8bed3891ec$export$2e2bcd8739ae039)((cart)=>cart);
    const { isValidating: isValidating , totalPrice: totalPrice , items: items , currency: currency , transaction: transaction , referrerFee: referrerFee , chain: cartChain  } = data;
    const usdPrice = (0, $742accbc1cb453a5$export$2e2bcd8739ae039)(open ? "USD" : undefined, currency?.symbol || currency?.name);
    const { chains: chains  } = (0, $bNXjM$useNetwork)();
    const chain = chains.find((chain)=>chain.id === transaction?.chain.id);
    const blockExplorerBaseUrl = chain?.blockExplorers?.default?.url || "https://etherscan.io";
    (0, $bNXjM$useEffect)(()=>{
        if (open) validate();
        else if (transaction?.status === (0, $588062ced050a0db$export$de7bcda3c490bf18).Complete || transaction?.error) clearTransaction();
    }, [
        open
    ]);
    const flaggedItems = (0, $bNXjM$useMemo)(()=>items.filter((item)=>item.isBannedOnOpensea), [
        items
    ]);
    const unavailableItems = (0, $bNXjM$useMemo)(()=>items.filter((item)=>!item.price), [
        items
    ]);
    const priceChangeItems = (0, $bNXjM$useMemo)(()=>items.filter(({ previousPrice: previousPrice , price: price  })=>previousPrice && price?.amount?.decimal !== undefined && previousPrice.amount?.decimal !== price?.amount?.decimal), [
        items
    ]);
    const { address: address  } = (0, $bNXjM$useAccount)();
    const { data: balance  } = (0, $bNXjM$useBalance)({
        chainId: cartChain?.id || client?.currentChain()?.id,
        address: address,
        token: currency?.contract !== (0, $bNXjM$constants).AddressZero ? currency?.contract : undefined,
        watch: open,
        formatUnits: currency?.decimals
    });
    (0, $bNXjM$useEffect)(()=>{
        if (balance) {
            const totalPriceTruncated = (0, $e70e85f6f4e64430$export$a81f732198733497)(totalPrice, currency?.decimals || 18);
            if (!balance.value) setHasEnoughCurrency(false);
            else if (balance.value.lt((0, $bNXjM$utils).parseUnits(`${totalPriceTruncated}`, currency?.decimals))) setHasEnoughCurrency(false);
            else setHasEnoughCurrency(true);
        }
    }, [
        totalPrice,
        balance,
        currency
    ]);
    (0, $bNXjM$useEffect)(()=>{
        if (hasEnoughCurrency && transaction?.errorType === (0, $588062ced050a0db$export$6adf53dcf2d42374).InsufficientBalance) setHasEnoughCurrency(false);
    }, [
        transaction
    ]);
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$Fragment), {
        children: children({
            loading: isValidating,
            items: items,
            flaggedItems: flaggedItems,
            unavailableItems: unavailableItems,
            priceChangeItems: priceChangeItems,
            currency: currency,
            totalPrice: totalPrice,
            referrerFee: referrerFee,
            usdPrice: usdPrice,
            hasEnoughCurrency: hasEnoughCurrency,
            balance: balance?.value,
            transaction: transaction,
            blockExplorerBaseUrl: blockExplorerBaseUrl,
            cartChain: cartChain,
            checkout: checkout,
            clear: clear,
            remove: remove,
            add: add,
            validate: validate
        })
    });
};
var $208cf8c19944ad35$export$2e2bcd8739ae039 = $208cf8c19944ad35$export$6c07efeb053daea6;



const $e0049ac10b4d489f$var$scaleUp = (0, $fcefeedae0fec8b6$export$d25ddfdf17c3ad3e)({
    "0%": {
        opacity: 0,
        transform: "scale(0.9) translateY(-10px)"
    },
    "100%": {
        opacity: 1,
        transform: "scale(1) translateY(0)"
    }
});
const $e0049ac10b4d489f$var$scaleDown = (0, $fcefeedae0fec8b6$export$d25ddfdf17c3ad3e)({
    "0%": {
        opacity: 1,
        transform: "scale(1) translateY(0)"
    },
    "100%": {
        opacity: 0,
        transform: "scale(0.9) translateY(-10px)"
    }
});
const $e0049ac10b4d489f$var$CONTENT_OFFSET = 8;
function $e0049ac10b4d489f$export$15123b0cb184ed6e({ trigger: trigger , side: side , openState: openState , tokenUrl: tokenUrl  }) {
    const [popoverTrigger, setPopoverTrigger] = (0, $bNXjM$useState)(null);
    const [open, setOpen] = (0, $d115e0b00eaf4565$export$2e2bcd8739ae039)(openState ? openState[0] : false, openState);
    // const providerOptionsContext = useContext(ProviderOptionsContext)
    const [displayPendingTransaction, setDisplayPendingTransaction] = (0, $bNXjM$useState)(false);
    const [purchaseComplete, setPurchaseComplete] = (0, $bNXjM$useState)(false);
    (0, $bNXjM$useEffect)(()=>{
        if (!open) {
            setDisplayPendingTransaction(false);
            setPurchaseComplete(false);
        }
    }, [
        open
    ]);
    const triggerBottom = (0, $bNXjM$useMemo)(()=>(popoverTrigger?.offsetTop || 0) + (popoverTrigger?.offsetHeight || 0) + $e0049ac10b4d489f$var$CONTENT_OFFSET, [
        trigger
    ]);
    return /*#__PURE__*/ (0, $bNXjM$jsx)((0, $208cf8c19944ad35$export$2e2bcd8739ae039), {
        open: open,
        children: ({ loading: loading , items: items , flaggedItems: flaggedItems , unavailableItems: unavailableItems , priceChangeItems: priceChangeItems , totalPrice: totalPrice , referrerFee: referrerFee , usdPrice: usdPrice , hasEnoughCurrency: hasEnoughCurrency , balance: balance , currency: currency , transaction: transaction , blockExplorerBaseUrl: blockExplorerBaseUrl , cartChain: cartChain , remove: remove , clear: clear , checkout: checkout  })=>{
            (0, $bNXjM$useEffect)(()=>{
                if (transaction?.status === (0, $588062ced050a0db$export$de7bcda3c490bf18).Complete) {
                    setDisplayPendingTransaction(false);
                    setPurchaseComplete(true);
                }
            }, [
                transaction?.status
            ]);
            const flaggedItemsSubject = flaggedItems.length > 1 ? "items" : "item";
            const unavailableItemsSubject = unavailableItems.length > 1 ? "items" : "item";
            const priceChangeItemsSubject = priceChangeItems.length > 1 ? "items prices" : "item price";
            const isCartEmpty = items.length === 0;
            const hasValidItems = items.length > unavailableItems.length;
            return /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $364926f073e51b94$export$2e2bcd8739ae039).Root, {
                modal: true,
                open: open,
                onOpenChange: setOpen,
                children: [
                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $364926f073e51b94$export$2e2bcd8739ae039).Trigger, {
                        asChild: true,
                        ref: setPopoverTrigger,
                        children: trigger
                    }),
                    /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $364926f073e51b94$export$2e2bcd8739ae039).Content, {
                        side: side,
                        sideOffset: $e0049ac10b4d489f$var$CONTENT_OFFSET,
                        css: {
                            display: "flex",
                            flexDirection: "column",
                            zIndex: 1001,
                            transformOrigin: "var(--radix-popover-content-transform-origin)",
                            animation: `${open ? $e0049ac10b4d489f$var$scaleUp : $e0049ac10b4d489f$var$scaleDown} 0.2s ease-in-out`,
                            overflowY: "auto",
                            borderRadius: "$borderRadius",
                            $$shadowColor: "$colors$gray7",
                            boxShadow: "box-shadow: 0px 2px 16px $$shadowColor",
                            border: "1px solid $borderColor",
                            p: 24,
                            minHeight: 500,
                            width: 395,
                            maxHeight: `calc(100vh - ${triggerBottom || 0}px - (25px * 2) - 10px)`,
                            backgroundColor: "$contentBackground",
                            boxSizing: "border-box",
                            "@media(max-width: 520px)": {
                                height: `calc(100vh - ${triggerBottom || 0}px - (25px * 2))`,
                                width: "100vw",
                                minHeight: "100%"
                            }
                        },
                        children: [
                            loading && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {
                                css: {
                                    backgroundColor: "$contentBackground",
                                    position: "absolute",
                                    inset: 0,
                                    opacity: 0.6,
                                    zIndex: 10000
                                }
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                align: "center",
                                css: {
                                    mb: "$4"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "h6",
                                        children: "Cart"
                                    }),
                                    !isCartEmpty && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        align: "center",
                                        justify: "center",
                                        css: {
                                            background: "$accentBgActive",
                                            height: 20,
                                            width: 20,
                                            borderRadius: "99999px",
                                            ml: "$2"
                                        },
                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                            style: "subtitle2",
                                            children: items.length
                                        })
                                    }),
                                    !isCartEmpty && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "subtitle2",
                                        color: "accent",
                                        css: {
                                            cursor: "pointer",
                                            ml: 24,
                                            "&:hover": {
                                                color: "$accentSolidHover"
                                            }
                                        },
                                        onClick: clear,
                                        children: "Clear All"
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                        size: "none",
                                        color: "ghost",
                                        css: {
                                            color: "$neutralSolid",
                                            ml: "auto"
                                        },
                                        onClick: ()=>{
                                            setOpen(false);
                                        },
                                        children: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                            icon: (0, $bNXjM$faClose),
                                            width: "16",
                                            height: "16"
                                        })
                                    })
                                ]
                            }),
                            flaggedItems.length > 0 && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $7ae733b262346b1b$export$2e2bcd8739ae039), {
                                kind: "warning",
                                message: `${flaggedItems.length} ${flaggedItemsSubject} not tradeable on OpenSea`,
                                link: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                    color: "accent",
                                    style: "subtitle2",
                                    css: {
                                        ml: "auto",
                                        mt: 3,
                                        cursor: "pointer"
                                    },
                                    onClick: (e)=>{
                                        e.preventDefault();
                                        remove(flaggedItems.map((item)=>`${item.collection.id}:${item.token.id}`));
                                    },
                                    children: [
                                        "Remove ",
                                        flaggedItemsSubject
                                    ]
                                })
                            }),
                            unavailableItems.length > 0 && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $7ae733b262346b1b$export$2e2bcd8739ae039), {
                                kind: "error",
                                message: `${unavailableItems.length} ${unavailableItemsSubject} no longer available`,
                                link: /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                    color: "accent",
                                    style: "subtitle2",
                                    css: {
                                        ml: "auto",
                                        mt: 3,
                                        cursor: "pointer"
                                    },
                                    onClick: (e)=>{
                                        e.preventDefault();
                                        remove(unavailableItems.map((item)=>`${item.collection.id}:${item.token.id}`));
                                    },
                                    children: [
                                        "Remove ",
                                        unavailableItemsSubject
                                    ]
                                })
                            }),
                            priceChangeItems.length > 0 && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $7ae733b262346b1b$export$2e2bcd8739ae039), {
                                kind: "warning",
                                message: `${priceChangeItems.length} ${priceChangeItemsSubject} updated`
                            }),
                            transaction?.error && transaction.errorType !== (0, $588062ced050a0db$export$6adf53dcf2d42374).UserDenied && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $7ae733b262346b1b$export$2e2bcd8739ae039), {
                                kind: "error",
                                message: transaction.error.message
                            }),
                            purchaseComplete && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $7ae733b262346b1b$export$2e2bcd8739ae039), {
                                message: `Transaction Complete`,
                                link: /*#__PURE__*/ (0, $bNXjM$jsx)((0, $31d3f3a80135a993$export$2e2bcd8739ae039), {
                                    href: `${blockExplorerBaseUrl}/tx/${transaction?.txHash}`,
                                    target: "_blank",
                                    css: {
                                        ml: "auto",
                                        fontSize: 12,
                                        mt: 2
                                    },
                                    weight: "medium",
                                    color: "primary",
                                    children: "Etherscan"
                                })
                            }),
                            !isCartEmpty && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                direction: "column",
                                css: {
                                    gap: "$4",
                                    mb: "$4",
                                    overflowY: "auto",
                                    mx: -24
                                },
                                children: items.map((item)=>/*#__PURE__*/ (0, $bNXjM$jsx)((0, $d75deef711b420b1$export$2e2bcd8739ae039), {
                                        item: item,
                                        usdConversion: usdPrice,
                                        tokenUrl: tokenUrl
                                    }, `${item.collection.id}:${item.token.id}`))
                            }),
                            isCartEmpty && !(displayPendingTransaction && transaction?.status === (0, $588062ced050a0db$export$de7bcda3c490bf18).Finalizing) && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                direction: "column",
                                align: "center",
                                justify: "center",
                                css: {
                                    color: "$neutralBorderHover",
                                    flex: 1,
                                    gap: "$5"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                        icon: (0, $bNXjM$faShoppingCart),
                                        width: "30",
                                        height: "30",
                                        style: {
                                            height: 30
                                        }
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "body3",
                                        color: "subtle",
                                        children: "No items in your cart"
                                    })
                                ]
                            }),
                            displayPendingTransaction && transaction?.status === (0, $588062ced050a0db$export$de7bcda3c490bf18).Finalizing && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                direction: "column",
                                align: "center",
                                justify: "center",
                                css: {
                                    color: "$neutralBorderHover",
                                    flex: 1,
                                    gap: "$5"
                                },
                                children: [
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "h6",
                                        children: "Finalizing on blockchain"
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                        icon: (0, $bNXjM$faCube),
                                        width: "24"
                                    }),
                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $31d3f3a80135a993$export$2e2bcd8739ae039), {
                                        href: `${blockExplorerBaseUrl}/tx/${transaction?.txHash}`,
                                        color: "primary",
                                        weight: "medium",
                                        target: "_blank",
                                        css: {
                                            fontSize: 12
                                        },
                                        children: "View on Etherscan"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                direction: "column",
                                css: {
                                    mt: "auto",
                                    pb: 10
                                },
                                children: [
                                    !isCartEmpty && referrerFee ? /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            mb: "$4"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "subtitle2",
                                                children: "Referrer Fee"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                direction: "column",
                                                justify: "center",
                                                css: {
                                                    ml: "auto",
                                                    gap: "$1",
                                                    "> div": {
                                                        ml: "auto"
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                                                        textStyle: "subtitle2",
                                                        amount: referrerFee,
                                                        address: currency?.contract,
                                                        decimals: currency?.decimals,
                                                        logoWidth: 12,
                                                        chainId: cartChain?.id
                                                    }),
                                                    usdPrice && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $208ab5b0155991db$export$2e2bcd8739ae039), {
                                                        amount: usdPrice * referrerFee,
                                                        style: "subtitle2",
                                                        color: "subtle",
                                                        css: {
                                                            textAlign: "end"
                                                        }
                                                    })
                                                ]
                                            })
                                        ]
                                    }) : null,
                                    !isCartEmpty && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        css: {
                                            mb: 28
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "h6",
                                                children: "Total"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                                direction: "column",
                                                justify: "center",
                                                css: {
                                                    ml: "auto",
                                                    gap: "$1",
                                                    "> div": {
                                                        ml: "auto"
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                                                        textStyle: "h6",
                                                        amount: totalPrice,
                                                        address: currency?.contract,
                                                        decimals: currency?.decimals,
                                                        logoWidth: 18,
                                                        chainId: cartChain?.id
                                                    }),
                                                    usdPrice && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $208ab5b0155991db$export$2e2bcd8739ae039), {
                                                        amount: usdPrice * totalPrice,
                                                        style: "subtitle2",
                                                        color: "subtle",
                                                        css: {
                                                            textAlign: "end"
                                                        }
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    displayPendingTransaction && transaction?.status === (0, $588062ced050a0db$export$de7bcda3c490bf18).Approving && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                        style: "body2",
                                        color: "subtle",
                                        css: {
                                            mb: "$2",
                                            textAlign: "center"
                                        },
                                        children: [
                                            "Please confirm purchase in your wallet",
                                            " "
                                        ]
                                    }),
                                    !hasEnoughCurrency && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $a08469b1b360d6cf$export$2e2bcd8739ae039), {
                                        align: "center",
                                        justify: "center",
                                        css: {
                                            mb: "$2",
                                            gap: "$2"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $3d59341a2d8e6cce$export$2e2bcd8739ae039), {
                                                style: "body2",
                                                color: "error",
                                                children: "Insufficient balance"
                                            }),
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $c370900a6d71021a$export$2e2bcd8739ae039), {
                                                textStyle: "body2",
                                                amount: balance,
                                                address: currency?.contract,
                                                decimals: currency?.decimals,
                                                logoWidth: 10
                                            })
                                        ]
                                    }),
                                    isCartEmpty && !displayPendingTransaction && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                        disabled: true,
                                        children: "Select Items to Buy"
                                    }),
                                    !isCartEmpty && hasValidItems && (transaction?.status === (0, $588062ced050a0db$export$de7bcda3c490bf18).Idle || !displayPendingTransaction) && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                        disabled: !hasEnoughCurrency,
                                        onClick: async ()=>{
                                            checkout().then(()=>{
                                                setDisplayPendingTransaction(true);
                                            }).catch((e)=>{
                                                console.error(e);
                                                setDisplayPendingTransaction(false);
                                            });
                                        },
                                        children: hasEnoughCurrency ? "Purchase" : "Add Funds to Purchase"
                                    }),
                                    !isCartEmpty && !hasValidItems && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                        color: "secondary",
                                        onClick: ()=>{
                                            clear();
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $bNXjM$FontAwesomeIcon), {
                                                icon: (0, $bNXjM$faRefresh),
                                                width: "16",
                                                height: "16"
                                            }),
                                            "Refresh Cart"
                                        ]
                                    }),
                                    displayPendingTransaction && transaction?.status === (0, $588062ced050a0db$export$de7bcda3c490bf18).Approving && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                        disabled: true,
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {}),
                                            "Waiting for Approval..."
                                        ]
                                    }),
                                    displayPendingTransaction && transaction?.status === (0, $588062ced050a0db$export$de7bcda3c490bf18).Finalizing && /*#__PURE__*/ (0, $bNXjM$jsxs)((0, $f8f1c7bd1550c954$export$2e2bcd8739ae039), {
                                        disabled: true,
                                        children: [
                                            /*#__PURE__*/ (0, $bNXjM$jsx)((0, $0ff8966798df47ad$export$2e2bcd8739ae039), {}),
                                            "Waiting to be Validated..."
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    open && /*#__PURE__*/ (0, $bNXjM$jsx)((0, $e779e4a6b41db55c$export$2e2bcd8739ae039), {
                        css: {
                            backgroundColor: "$overlayBackground",
                            position: "fixed",
                            inset: 0,
                            zIndex: 1000
                        }
                    })
                ]
            });
        }
    });
}
$e0049ac10b4d489f$export$15123b0cb184ed6e.Custom = (0, $208cf8c19944ad35$export$2e2bcd8739ae039);
var $e0049ac10b4d489f$export$2e2bcd8739ae039 = $e0049ac10b4d489f$export$15123b0cb184ed6e;





export {$b15843e937ac72b8$export$e400fd05a10fd94a as ZooProvider, $c216485f70235e8a$export$bf730ab0ed25211d as ZooClientProvider, $38f38860f7db3263$export$2e2bcd8739ae039 as useCollections, $6006670c0a098975$export$2e2bcd8739ae039 as useCollectionActivity, $a977118e24599639$export$2e2bcd8739ae039 as useUsersActivity, $c6195489119ab58a$export$2e2bcd8739ae039 as useZooClient, $54bf018b076821f1$export$2e2bcd8739ae039 as useTokens, $9898620691963117$export$2e2bcd8739ae039 as useTokenOpenseaBanned, $40f16bae928ea461$export$2e2bcd8739ae039 as useListings, $2503c60624d9b72b$export$2e2bcd8739ae039 as useOwnerListings, $a77f332d243f1426$export$2e2bcd8739ae039 as useAttributes, $ed463f024c26b3ca$export$2e2bcd8739ae039 as useBids, $7ef173c8b4177008$export$2e2bcd8739ae039 as useUserTokens, $b3db166a82febb11$export$2e2bcd8739ae039 as useUserTopBids, $fdff2793179dd2d0$export$2e2bcd8739ae039 as useUserCollections, $50bacb8bed3891ec$export$2e2bcd8739ae039 as useCart, $75e58b92a1baee06$export$2e2bcd8739ae039 as useDynamicTokens, $5ca18e7553dfd06e$export$2e2bcd8739ae039 as lightTheme, $1b804d6c5a50513c$export$2e2bcd8739ae039 as darkTheme, $ad2cbb1f5242b499$export$7055e49b90860ae6 as BuyModal, $537a8475c59a6e21$export$b41ddf00b39567e8 as BuyStep, $a93b26d073373c23$export$d23efc006864db2f as ListModal, $052d60b4fc42e2f9$export$7f4afd65e1e67072 as ListStep, $5f98c9e3399e3959$export$556cfc4a654987bd as BidModal, $97f9e638db55049c$export$7a92ddb9e11f37f7 as BidStep, $0b4a951eb65dd888$export$91ee3fa7c9f4e6c2 as AcceptBidModal, $56323ed10ce02ae6$export$f4dd52ca63b5fdde as AcceptBidStep, $0e222eb8e6425c4a$export$89d1e00b7fa831db as CancelBidModal, $a77cc70c3ee0a162$export$c5c5c857eaef0fde as CancelBidStep, $93ba2f12ea89aa2b$export$5ccdc2f8532db25b as CancelListingModal, $92f34bd13bb54e67$export$c5c5c857eaef0fde as CancelListingStep, $965711be26a09bce$export$2e2bcd8739ae039 as TokenMedia, $965711be26a09bce$export$b7d45a46da28b4d3 as extractMediaType, $e0049ac10b4d489f$export$2e2bcd8739ae039 as CartPopover, $588062ced050a0db$export$9081b9c87ee4e12e as CartProvider};
//# sourceMappingURL=index.mjs.map
