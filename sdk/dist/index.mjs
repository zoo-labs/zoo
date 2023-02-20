import {arrayify as $4mq6z$arrayify} from "ethers/lib/utils";
import $4mq6z$axios from "axios";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
var $fc674cd0863de20b$exports = {};

$parcel$export($fc674cd0863de20b$exports, "ZooClient", () => $fc674cd0863de20b$export$f29e902efe386198);
$parcel$export($fc674cd0863de20b$exports, "getClient", () => $fc674cd0863de20b$export$6bb76d6eba7e258c);
$parcel$export($fc674cd0863de20b$exports, "createClient", () => $fc674cd0863de20b$export$5d730b7aed1a3eb0);



async function $687a7783fd478e3b$export$f014594cc879f602(request, dataParser, maximumAttempts = 15, attemptCount = 0) {
    if (attemptCount >= maximumAttempts) throw `Failed to get data after ${attemptCount} attempt(s), aborting`;
    async function getData() {
        let res = await (0, $4mq6z$axios).request(request);
        return res.data;
    }
    const json = await getData();
    // Check if the data exists
    const dataExists = dataParser(json);
    if (dataExists) return json;
    // The response is still unchanged. Check again in five seconds
    await new Promise((resolve)=>setTimeout(resolve, 5000));
    attemptCount++;
    await $687a7783fd478e3b$export$f014594cc879f602(request, dataParser, maximumAttempts, attemptCount);
}
async function $687a7783fd478e3b$export$d2c70568ef790b87(request, validate, maximumAttempts = 15, attemptCount = 0) {
    if (attemptCount >= maximumAttempts) throw `Failed to get an ok response after ${attemptCount} attempt(s), aborting`;
    const res = await (0, $4mq6z$axios).request(request);
    if (!validate) validate = (res)=>res.status === 200;
    // Check that the response from an endpoint updated
    if (!validate(res)) {
        // The response is still unchanged. Check again in five seconds
        await new Promise((resolve)=>setTimeout(resolve, 5000));
        attemptCount++;
        await $687a7783fd478e3b$export$d2c70568ef790b87(request, validate, maximumAttempts, attemptCount);
    }
    return true;
}




/**
 *  Set URL query params using a typed objects
 *
 * This will convert an object
 *
 * ```js
 *  {
 *    foo: 'bar',
 *    age: 50,
 *  }
 * ```
 *
 * into a query string
 *
 * `?foo=bar&age=50`
 *
 * and append it to URL provided
 *
 * `https://api.example.com/tokens?foo=bar&age=50`
 *
 * @param url An URL instance
 * @param query An object containing all needed query params.
 */ function $36e844bf1398f57b$export$dc1827290674c112(url, query) {
    Object.keys(query).map((key)=>{
        var _a;
        let value = query[key];
        if (value !== undefined) {
            if (Array.isArray(value)) value.forEach((item)=>{
                url.searchParams.append(key, item);
            });
            else url.searchParams.append(key, (_a = query[key]) === null || _a === void 0 ? void 0 : _a.toString());
        }
        return url;
    });
}


async function $93bc29f5073032e6$export$21ece85d7636deb(request, signer, setState, newJson, expectedPrice) {
    var _a, _b, _c;
    try {
        let json = newJson;
        if (!request.headers) request.headers = {
            "Content-Type": "application/json",
            "x-api-key": "",
            "x-rkc-version": "0.4.0",
            "x-rkui-version": "0.9.0"
        };
        const client = (0, $fc674cd0863de20b$export$6bb76d6eba7e258c)();
        const currentChain = client === null || client === void 0 ? void 0 : client.currentChain();
        if (currentChain === null || currentChain === void 0 ? void 0 : currentChain.baseApiUrl) request.baseURL = currentChain.baseApiUrl;
        if (currentChain === null || currentChain === void 0 ? void 0 : currentChain.apiKey) request.headers["x-api-key"] = currentChain.apiKey;
        if (!json) {
            const res = await (0, $4mq6z$axios).request(request);
            json = res.data;
            if (res.status !== 200) throw json;
        }
        // Handle errors
        if (json.error || !json.steps) throw json;
        const isBuy = (_a = request.url) === null || _a === void 0 ? void 0 : _a.includes("/execute/buy");
        const isSell = (_b = request.url) === null || _b === void 0 ? void 0 : _b.includes("/execute/sell");
        // Handle price changes to protect users from paying more
        // than expected when buying and selling for less than expected
        if (json.path && expectedPrice) {
            const quote = json.path.reduce((total, path)=>{
                total += path.quote || 0;
                return total;
            }, 0);
            // Check if the user is selling
            let error = null;
            if (isSell && quote - expectedPrice < -0.00001) error = {
                type: "price mismatch",
                message: `Attention: the offer price of this token is now ${quote}`
            };
            // Check if the user is buying
            if (isBuy && quote - expectedPrice > 0.00001) error = {
                type: "price mismatch",
                message: `Attention: the price of this token is now ${quote}`
            };
            if (error) {
                json.steps[0].error = error.message;
                json.steps[0].errorData = json.path;
                setState([
                    ...json === null || json === void 0 ? void 0 : json.steps
                ]);
                throw error;
            }
        }
        // Update state on first call or recursion
        setState([
            ...json === null || json === void 0 ? void 0 : json.steps
        ]);
        let incompleteStepIndex = -1;
        let incompleteStepItemIndex = -1;
        json.steps.find((step, i)=>{
            if (!step.items) return false;
            incompleteStepItemIndex = step.items.findIndex((item)=>item.status == "incomplete");
            if (incompleteStepItemIndex !== -1) {
                incompleteStepIndex = i;
                return true;
            } else return false;
        });
        // There are no more incomplete steps
        if (incompleteStepIndex === -1) return;
        const step = json.steps[incompleteStepIndex];
        const stepItems = json.steps[incompleteStepIndex].items;
        if (!stepItems) return;
        let { kind: kind  } = step;
        let stepItem = stepItems[incompleteStepItemIndex];
        // If step item is missing data, poll until it is ready
        if (!stepItem.data) {
            json = await (0, $687a7783fd478e3b$export$f014594cc879f602)(request, (json)=>{
                var _a, _b;
                const data = json;
                return ((_b = (_a = data === null || data === void 0 ? void 0 : data.steps) === null || _a === void 0 ? void 0 : _a[incompleteStepIndex].items) === null || _b === void 0 ? void 0 : _b[incompleteStepItemIndex].data) ? true : false;
            });
            if (!json.steps || !json.steps[incompleteStepIndex].items) throw json;
            const items = json.steps[incompleteStepIndex].items;
            if (!items || !items[incompleteStepItemIndex] || !items[incompleteStepItemIndex].data) throw json;
            stepItem = items[incompleteStepItemIndex];
        }
        const stepData = stepItem.data;
        // Handle each step based on it's kind
        switch(kind){
            // Make an on-chain transaction
            case "transaction":
                {
                    const tx = await signer.sendTransaction(stepData);
                    if ((_c = json.steps[incompleteStepIndex].items) === null || _c === void 0 ? void 0 : _c[incompleteStepItemIndex]) stepItem.txHash = tx.hash;
                    setState([
                        ...json === null || json === void 0 ? void 0 : json.steps
                    ]);
                    await tx.wait();
                    //Implicitly poll the confirmation url to confirm the transaction went through
                    const confirmationUrl = new URL(`${request.baseURL}/transactions/${tx.hash}/synced/v1`);
                    const headers = {
                        "Content-Type": "application/json",
                        "x-api-key": "0.0.0",
                        "x-rkc-version": "0.4.0",
                        "x-rkui-version": "0.9.0"
                    };
                    if (request.headers && request.headers["x-api-key"]) headers["x-api-key"] = request.headers["x-api-key"];
                    client === null || client === void 0 || client.uiVersion;
                    await (0, $687a7783fd478e3b$export$d2c70568ef790b87)({
                        url: confirmationUrl.href,
                        method: "get",
                        headers: headers
                    }, (res)=>res && res.data.synced);
                    if (json.steps.slice(incompleteStepIndex + 1).findIndex((step)=>step.kind === "transaction") === -1) //Confirm that on-chain tx has been picked up by the indexer for the last transaction
                    {
                        if (stepItem.txHash && (isSell || isBuy)) {
                            const indexerConfirmationUrl = new URL(`${request.baseURL}/sales/v3`);
                            const queryParams = {
                                txHash: stepItem.txHash
                            };
                            (0, $36e844bf1398f57b$export$dc1827290674c112)(indexerConfirmationUrl, queryParams);
                            await (0, $687a7783fd478e3b$export$d2c70568ef790b87)({
                                url: indexerConfirmationUrl.href,
                                method: "get",
                                headers: headers
                            }, (res)=>{
                                if (res.status === 200) {
                                    const data = res.data;
                                    return data.sales && data.sales.length > 0 ? true : false;
                                }
                                return false;
                            });
                        }
                    }
                    break;
                }
            // Sign a message
            case "signature":
                {
                    let signature;
                    const signData = stepData["sign"];
                    const postData = stepData["post"];
                    if (signData) {
                        // Request user signature
                        if (signData.signatureKind === "eip191") {
                            if (signData.message.match(/0x[0-9a-fA-F]{64}/)) // If the message represents a hash, we need to convert it to raw bytes first
                            signature = await signer.signMessage((0, $4mq6z$arrayify)(signData.message));
                            else signature = await signer.signMessage(signData.message);
                        } else if (signData.signatureKind === "eip712") signature = await signer._signTypedData(signData.domain, signData.types, signData.value);
                        if (signature) request.params = {
                            ...request.params,
                            signature: signature
                        };
                    }
                    if (postData) {
                        const postOrderUrl = new URL(`${request.baseURL}${postData.endpoint}`);
                        try {
                            const getData = async function() {
                                const headers = {
                                    "Content-Type": "application/json",
                                    "x-api-key": "",
                                    "x-rkc-version": "0.4.0",
                                    "x-rkui-version": "0.9.0"
                                };
                                if (request.headers && request.headers["x-api-key"]) headers["x-api-key"] = request.headers["x-api-key"];
                                let response = await (0, $4mq6z$axios).post(postOrderUrl.href, JSON.stringify(postData.body), {
                                    method: postData.method,
                                    headers: headers,
                                    params: request.params
                                });
                                return response;
                            };
                            const res = await getData();
                            if (res.status > 299 || res.status < 200) throw res.data;
                            stepItem.orderId = res.data.orderId;
                            setState([
                                ...json === null || json === void 0 ? void 0 : json.steps
                            ]);
                        } catch (err) {
                            json.steps[incompleteStepIndex].error = "Your order could not be posted.";
                            setState([
                                ...json === null || json === void 0 ? void 0 : json.steps
                            ]);
                            throw err;
                        }
                    }
                    break;
                }
            default:
                break;
        }
        delete step.message;
        stepItem.status = "complete";
        // Recursively call executeSteps()
        await $93bc29f5073032e6$export$21ece85d7636deb(request, signer, setState, json);
    } catch (err) {
        const error = new Error(err === null || err === void 0 ? void 0 : err.message);
        console.error(error);
        throw err;
    }
}



function $ab4c5b6add749096$export$b5fe3f66a567bec0(config = {}) {
    const client = (0, $fc674cd0863de20b$export$6bb76d6eba7e258c)();
    const currentChain = client.currentChain();
    const headers = {
        "Content-Type": "application/json",
        "x-rkc-version": "0.4.0"
    };
    if (currentChain === null || currentChain === void 0 ? void 0 : currentChain.apiKey) headers["x-api-key"] = currentChain.apiKey;
    return (0, $4mq6z$axios).request({
        headers: headers,
        ...config
    });
}


async function $3578b68922ba0b40$export$ed27da83bcbea2e5(data) {
    var _a;
    const { token: token , expectedPrice: expectedPrice , signer: signer , onProgress: onProgress  } = data;
    const taker = await signer.getAddress();
    const client = (0, $fc674cd0863de20b$export$6bb76d6eba7e258c)();
    const options = data.options || {};
    const baseApiUrl = (_a = client.currentChain()) === null || _a === void 0 ? void 0 : _a.baseApiUrl;
    if (!client.currentChain()) throw new ReferenceError("ZooClient missing chain configuration");
    try {
        const params = {
            taker: taker,
            token: `${token.contract}:${token.tokenId}`,
            source: client.source || "",
            ...options
        };
        if (client.normalizeRoyalties !== undefined && params.normalizeRoyalties === undefined) params.normalizeRoyalties = client.normalizeRoyalties;
        await (0, $93bc29f5073032e6$export$21ece85d7636deb)({
            url: `${baseApiUrl}/execute/sell/v6`,
            method: "post",
            data: params
        }, signer, onProgress, undefined, expectedPrice);
        return true;
    } catch (err) {
        const data = {
            token: `${token.contract}:${token.tokenId}`
        };
        (0, $ab4c5b6add749096$export$b5fe3f66a567bec0)({
            method: "POST",
            url: `${baseApiUrl}/tokens/refresh/v1`,
            data: JSON.stringify(data)
        });
        throw err;
    }
}




async function $a80f03dc07cf3a91$export$5e1997c166a16792(data) {
    var _a;
    const { tokens: tokens , orderIds: orderIds , rawOrders: rawOrders , expectedPrice: expectedPrice , signer: signer , onProgress: onProgress  } = data;
    const taker = await signer.getAddress();
    const client = (0, $fc674cd0863de20b$export$6bb76d6eba7e258c)();
    const options = data.options || {};
    const baseApiUrl = (_a = client.currentChain()) === null || _a === void 0 ? void 0 : _a.baseApiUrl;
    if (!baseApiUrl) throw new ReferenceError("ZooClient missing chain configuration");
    if ((!tokens || !tokens.length) && (!data.orderIds || !data.orderIds.length) && !data.rawOrders) {
        console.debug(data);
        throw new ReferenceError("ZooClient missing data: At least one of the following is required, tokens, orderIds or rawOrders");
    }
    if (tokens && (orderIds || rawOrders) || orderIds && (tokens || rawOrders) || rawOrders && (orderIds || tokens)) {
        console.debug(data);
        throw new ReferenceError("ZooClient conflicting data: tokens, orderIds and rawOrders are mutually exclusive");
    }
    try {
        const params = {
            taker: taker,
            source: client.source || "",
            ...options
        };
        if (tokens) params.tokens = tokens === null || tokens === void 0 ? void 0 : tokens.map((token)=>`${token.contract}:${token.tokenId}`);
        else if (orderIds) params.orderIds = orderIds;
        else if (rawOrders) params.rawOrders = rawOrders;
        if (client.normalizeRoyalties !== undefined && params.normalizeRoyalties === undefined) params.normalizeRoyalties = client.normalizeRoyalties;
        await (0, $93bc29f5073032e6$export$21ece85d7636deb)({
            url: `${baseApiUrl}/execute/buy/v6`,
            method: "post",
            data: params
        }, signer, onProgress, undefined, expectedPrice);
        return true;
    } catch (err) {
        if (tokens) tokens.forEach((token)=>{
            const data = {
                token: `${token.contract}:${token.tokenId}`
            };
            (0, $ab4c5b6add749096$export$b5fe3f66a567bec0)({
                method: "POST",
                url: `${baseApiUrl}/tokens/refresh/v1`,
                data: JSON.stringify(data)
            });
        });
        throw err;
    }
}




async function $5a5394e7716c7898$export$1d5423ff89b08a3c(data) {
    var _a;
    const { id: id , signer: signer , onProgress: onProgress  } = data;
    const client = (0, $fc674cd0863de20b$export$6bb76d6eba7e258c)();
    const options = data.options || {};
    const baseApiUrl = (_a = client.currentChain()) === null || _a === void 0 ? void 0 : _a.baseApiUrl;
    if (!baseApiUrl) throw new ReferenceError("ZooClient missing chain configuration");
    try {
        const params = {
            id: id,
            ...options
        };
        await (0, $93bc29f5073032e6$export$21ece85d7636deb)({
            url: `${baseApiUrl}/execute/cancel/v2`,
            params: params
        }, signer, onProgress);
        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
}





var $d7d887a3e64a76d0$exports = {};
$d7d887a3e64a76d0$exports = JSON.parse('{"name":"@zoolabs/sdk","version":"5.4.3","description":"An SDK that can be used in any javascript/typescript context to easily interact with Zoo liquidity APIs","source":"src/index.ts","module":"dist/index.mjs","type":"module","types":"dist/index.d.ts","author":"Zoo Labs Foundation","license":"MIT","files":["dist"],"scripts":{"build":"tsc -p .","clean":"rm -rf dist","version":"yarn version","version:package":"sh ../../scripts/package-version.sh","version:update":"yarn version ${0}; PACKAGE_VERSION=$(yarn version:package); git add -A; git commit -m \\"\uD83C\uDF89 Release client package v$PACKAGE_VERSION\\"; git push","syncApi":"node ./sync-api.mjs","changelog":"node ../../scripts/generate-changelog.js package=sdk"},"repository":{"type":"git","url":"https://github.com/zoo-labs/zdk"},"sideEffects":false,"keywords":["nft","zoo","zoo-sdk","zdk","protocol","sdk"],"peerDependencies":{"ethers":"^5.7.2"},"dependencies":{"@types/node":"^18.14.0","axios":"^1.3.3","typescript":"^4.9.5"},"publishConfig":{"access":"public"},"devDependencies":{"@babel/core":"^7.20.12","openapi-typescript":"^6.1.0"}}');


async function $1c1078d75c9f24df$export$c5dd9dc6df16df31(data) {
    var _a, _b;
    const { listings: listings , signer: signer , onProgress: onProgress = ()=>{} , precheck: precheck  } = data;
    const client = (0, $fc674cd0863de20b$export$6bb76d6eba7e258c)();
    const maker = await signer.getAddress();
    const baseApiUrl = (_a = client.currentChain()) === null || _a === void 0 ? void 0 : _a.baseApiUrl;
    if (!baseApiUrl) throw new ReferenceError("ZooClient missing chain configuration");
    try {
        const data = {
            maker: maker,
            source: client.source || ""
        };
        listings.forEach((listing)=>{
            if ((!listing.orderbook || listing.orderbook === "reservoir") && client.marketplaceFee && client.marketplaceFeeRecipient && !("fees" in listing)) listing.fees = [
                `${client.marketplaceFeeRecipient}:${client.marketplaceFee}`
            ];
            if (!("automatedRoyalties" in listing) && "automatedRoyalties" in client) listing.automatedRoyalties = client.automatedRoyalties;
        });
        data.params = listings;
        const request = {
            url: `${baseApiUrl}/execute/list/v4`,
            method: "post",
            data: data,
            headers: {
                "x-rkc-version": (0, $d7d887a3e64a76d0$exports.version)
            }
        };
        if (precheck) {
            const apiKey = (_b = client.currentChain()) === null || _b === void 0 ? void 0 : _b.apiKey;
            if (apiKey && request.headers) request.headers["x-api-key"] = apiKey;
            if ((client === null || client === void 0 ? void 0 : client.uiVersion) && request.headers) request.headers["x-rkui-version"] = client.uiVersion;
            const res = await (0, $4mq6z$axios).request(request);
            if (res.status !== 200) throw res.data;
            const data = res.data;
            onProgress(data["steps"]);
            return data["steps"];
        } else await (0, $93bc29f5073032e6$export$21ece85d7636deb)(request, signer, onProgress);
        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
}




async function $19e3360e57cbdd5f$export$6d65a5902ff15306({ bids: bids , signer: signer , onProgress: onProgress  }) {
    var _a;
    const client = (0, $fc674cd0863de20b$export$6bb76d6eba7e258c)();
    const maker = await signer.getAddress();
    const baseApiUrl = (_a = client.currentChain()) === null || _a === void 0 ? void 0 : _a.baseApiUrl;
    if (!baseApiUrl) throw new ReferenceError("ZooClient missing configuration");
    try {
        const data = {
            maker: maker,
            source: client.source || ""
        };
        bids.forEach((bid)=>{
            if (!bid.token && !bid.collection && !bid.tokenSetId && (!bid.attributeKey || !bid.attributeValue)) throw {
                message: "Some bid data is missing",
                data: bid
            };
            if ((!bid.orderbook || bid.orderbook === "reservoir") && client.marketplaceFee && client.marketplaceFeeRecipient && !("fees" in bid)) bid.fees = [
                `${client.marketplaceFeeRecipient}:${client.marketplaceFee}`
            ];
            if (!("automatedRoyalties" in bid) && "automatedRoyalties" in client) bid.automatedRoyalties = client.automatedRoyalties;
        });
        data.params = bids;
        await (0, $93bc29f5073032e6$export$21ece85d7636deb)({
            url: `${baseApiUrl}/execute/bid/v4`,
            method: "post",
            data: data
        }, signer, onProgress);
        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


const $7eac3262c9d81e1a$var$actions = {
    acceptOffer: $3578b68922ba0b40$export$ed27da83bcbea2e5,
    buyToken: $a80f03dc07cf3a91$export$5e1997c166a16792,
    cancelOrder: $5a5394e7716c7898$export$1d5423ff89b08a3c,
    listToken: $1c1078d75c9f24df$export$c5dd9dc6df16df31,
    placeBid: $19e3360e57cbdd5f$export$6d65a5902ff15306
};
var $7eac3262c9d81e1a$export$2e2bcd8739ae039 = $7eac3262c9d81e1a$var$actions;


var $7b499f039cd2c001$exports = {};

$parcel$export($7b499f039cd2c001$exports, "executeSteps", () => $93bc29f5073032e6$export$21ece85d7636deb);
$parcel$export($7b499f039cd2c001$exports, "setParams", () => $36e844bf1398f57b$export$dc1827290674c112);
$parcel$export($7b499f039cd2c001$exports, "pollUntilOk", () => $687a7783fd478e3b$export$d2c70568ef790b87);
$parcel$export($7b499f039cd2c001$exports, "pollUntilHasData", () => $687a7783fd478e3b$export$f014594cc879f602);
$parcel$export($7b499f039cd2c001$exports, "isOpenSeaBanned", () => $5ffb320f51f29c3d$export$feaa73ad8ed3f2b9);
$parcel$export($7b499f039cd2c001$exports, "request", () => $ab4c5b6add749096$export$b5fe3f66a567bec0);





async function $5ffb320f51f29c3d$export$feaa73ad8ed3f2b9(ids) {
    let url = "https://api.opensea.io/api/v1/assets";
    ids.forEach((id, i)=>{
        const [contract, tokenId] = id.split(":");
        const prefix = i === 0 ? "?" : "&";
        url = `${url}${prefix}token_ids=${tokenId}&asset_contract_addresses=${contract}`;
    });
    const res = await (0, $4mq6z$axios).get(url);
    const json = res.data;
    const client = (0, $fc674cd0863de20b$export$6bb76d6eba7e258c)();
    const currentChain = client === null || client === void 0 ? void 0 : client.currentChain();
    const baseApiUrl = currentChain === null || currentChain === void 0 ? void 0 : currentChain.apiKey;
    const statuses = json.assets.reduce((statuses, asset)=>{
        statuses[`${asset.asset_contract.address}:${asset.token_id}`] = !asset.supports_wyvern;
        return statuses;
    }, {});
    if (res.status === 200 && baseApiUrl) {
        const apiKey = currentChain.apiKey;
        const headers = {
            "Content-Type": "application/json",
            "x-rkc-version": "0.4.0"
        };
        Object.keys(statuses).forEach((token)=>{
            const status = statuses[token];
            const body = {
                token: token,
                flag: status ? 1 : 0
            };
            if (apiKey) headers["x-api-key"] = apiKey;
            if (client === null || client === void 0 ? void 0 : client.uiVersion) headers["x-rkui-version"] = client.uiVersion;
            (0, $4mq6z$axios).post(`${baseApiUrl}/tokens/flag/v1`, JSON.stringify(body), {
                headers: headers
            }).catch(()=>{});
        });
    }
    return statuses;
}






let $fc674cd0863de20b$var$_client;
class $fc674cd0863de20b$export$f29e902efe386198 {
    constructor(options){
        this.utils = {
            ...$7b499f039cd2c001$exports
        };
        this.actions = (0, $7eac3262c9d81e1a$export$2e2bcd8739ae039);
        this.version = (0, $d7d887a3e64a76d0$exports.version);
        this.chains = options.chains;
        this.uiVersion = options.uiVersion;
        this.automatedRoyalties = options.automatedRoyalties;
        this.marketplaceFee = options.marketplaceFee;
        this.marketplaceFeeRecipient = options.marketplaceFeeRecipient;
        this.normalizeRoyalties = options.normalizeRoyalties;
        if (!options.source) {
            if (typeof window !== "undefined") {
                let host = location.hostname;
                if (host.indexOf("www.") === 0) host = host.replace("www.", "");
                this.source = host;
                console.warn("ZDK automatically generated a source based on the url, we recommend providing a source when initializing ZDK. Refer to our docs for steps on how to do this: http://docs.reservoir.tools");
            }
        } else this.source = options.source;
    }
    configure(options) {
        this.source = options.source ? options.source : this.source;
        this.uiVersion = options.uiVersion ? options.uiVersion : this.uiVersion;
        this.chains = options.chains ? options.chains : this.chains;
        this.marketplaceFee = options.marketplaceFee ? options.marketplaceFee : this.marketplaceFee;
        this.marketplaceFeeRecipient = options.marketplaceFeeRecipient ? options.marketplaceFeeRecipient : this.marketplaceFeeRecipient;
        this.automatedRoyalties = options.automatedRoyalties;
        this.normalizeRoyalties = options.normalizeRoyalties !== undefined ? options.normalizeRoyalties : this.normalizeRoyalties;
    }
    currentChain() {
        if (this.chains && this.chains.length > 0) {
            const defaultChain = this.chains.find((chain)=>chain.default);
            if (defaultChain) return defaultChain;
            return this.chains[0];
        }
        return null;
    }
}
function $fc674cd0863de20b$export$6bb76d6eba7e258c() {
    //throw an error
    return $fc674cd0863de20b$var$_client;
}
function $fc674cd0863de20b$export$5d730b7aed1a3eb0(options) {
    if (!$fc674cd0863de20b$var$_client) $fc674cd0863de20b$var$_client = new $fc674cd0863de20b$export$f29e902efe386198(options);
    else $fc674cd0863de20b$var$_client.configure(options);
    return $fc674cd0863de20b$var$_client;
}



var $4096c3b3ea054668$exports = {};
var $b92a430bd4a69747$exports = {};
/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */ 

$parcel$exportWildcard($4096c3b3ea054668$exports, $b92a430bd4a69747$exports);




export {$fc674cd0863de20b$export$f29e902efe386198 as ZooClient, $fc674cd0863de20b$export$6bb76d6eba7e258c as getClient, $fc674cd0863de20b$export$5d730b7aed1a3eb0 as createClient, $93bc29f5073032e6$export$21ece85d7636deb as executeSteps, $36e844bf1398f57b$export$dc1827290674c112 as setParams, $687a7783fd478e3b$export$d2c70568ef790b87 as pollUntilOk, $687a7783fd478e3b$export$f014594cc879f602 as pollUntilHasData, $5ffb320f51f29c3d$export$feaa73ad8ed3f2b9 as isOpenSeaBanned, $ab4c5b6add749096$export$b5fe3f66a567bec0 as request};
//# sourceMappingURL=index.mjs.map
