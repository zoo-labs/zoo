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
var $63606961de7cfbf3$exports = {};

$parcel$export($63606961de7cfbf3$exports, "ZooClient", () => $63606961de7cfbf3$export$f29e902efe386198);
$parcel$export($63606961de7cfbf3$exports, "getClient", () => $63606961de7cfbf3$export$6bb76d6eba7e258c);
$parcel$export($63606961de7cfbf3$exports, "createClient", () => $63606961de7cfbf3$export$5d730b7aed1a3eb0);



async function $1f074173aef8d3e6$export$f014594cc879f602(request, dataParser, maximumAttempts = 15, attemptCount = 0) {
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
    await $1f074173aef8d3e6$export$f014594cc879f602(request, dataParser, maximumAttempts, attemptCount);
}
async function $1f074173aef8d3e6$export$d2c70568ef790b87(request, validate, maximumAttempts = 15, attemptCount = 0) {
    if (attemptCount >= maximumAttempts) throw `Failed to get an ok response after ${attemptCount} attempt(s), aborting`;
    const res = await (0, $4mq6z$axios).request(request);
    if (!validate) validate = (res)=>res.status === 200;
    // Check that the response from an endpoint updated
    if (!validate(res)) {
        // The response is still unchanged. Check again in five seconds
        await new Promise((resolve)=>setTimeout(resolve, 5000));
        attemptCount++;
        await $1f074173aef8d3e6$export$d2c70568ef790b87(request, validate, maximumAttempts, attemptCount);
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
 */ function $647b25b545ba3e6d$export$dc1827290674c112(url, query) {
    Object.keys(query).map((key)=>{
        let value = query[key];
        if (value !== undefined) {
            if (Array.isArray(value)) value.forEach((item)=>{
                url.searchParams.append(key, item);
            });
            else url.searchParams.append(key, query[key]?.toString());
        }
        return url;
    });
}


async function $a89c379ae92dec7a$export$21ece85d7636deb(request, signer, setState, newJson, expectedPrice) {
    try {
        let json = newJson;
        if (!request.headers) request.headers = {
            "Content-Type": "application/json",
            "x-api-key": "",
            "x-rkc-version": "0.4.0",
            "x-rkui-version": "0.9.0"
        };
        const client = (0, $63606961de7cfbf3$export$6bb76d6eba7e258c)();
        const currentChain = client?.currentChain();
        if (currentChain?.baseApiUrl) request.baseURL = currentChain.baseApiUrl;
        if (currentChain?.apiKey) request.headers["x-api-key"] = currentChain.apiKey;
        if (!json) {
            const res = await (0, $4mq6z$axios).request(request);
            json = res.data;
            if (res.status !== 200) throw json;
        }
        // Handle errors
        if (json.error || !json.steps) throw json;
        const isBuy = request.url?.includes("/execute/buy");
        const isSell = request.url?.includes("/execute/sell");
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
                    ...json?.steps
                ]);
                throw error;
            }
        }
        // Update state on first call or recursion
        setState([
            ...json?.steps
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
            json = await (0, $1f074173aef8d3e6$export$f014594cc879f602)(request, (json)=>{
                const data = json;
                return data?.steps?.[incompleteStepIndex].items?.[incompleteStepItemIndex].data ? true : false;
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
                    if (json.steps[incompleteStepIndex].items?.[incompleteStepItemIndex]) stepItem.txHash = tx.hash;
                    setState([
                        ...json?.steps
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
                    client?.uiVersion;
                    await (0, $1f074173aef8d3e6$export$d2c70568ef790b87)({
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
                            (0, $647b25b545ba3e6d$export$dc1827290674c112)(indexerConfirmationUrl, queryParams);
                            await (0, $1f074173aef8d3e6$export$d2c70568ef790b87)({
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
                                ...json?.steps
                            ]);
                        } catch (err) {
                            json.steps[incompleteStepIndex].error = "Your order could not be posted.";
                            setState([
                                ...json?.steps
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
        await $a89c379ae92dec7a$export$21ece85d7636deb(request, signer, setState, json);
    } catch (err) {
        const error = new Error(err?.message);
        console.error(error);
        throw err;
    }
}



function $abfac63fd1119cf4$export$b5fe3f66a567bec0(config = {}) {
    const client = (0, $63606961de7cfbf3$export$6bb76d6eba7e258c)();
    const currentChain = client.currentChain();
    const headers = {
        "Content-Type": "application/json",
        "x-rkc-version": "0.4.0"
    };
    if (currentChain?.apiKey) headers["x-api-key"] = currentChain.apiKey;
    return (0, $4mq6z$axios).request({
        headers: headers,
        ...config
    });
}


async function $c759a5b848c3f340$export$ed27da83bcbea2e5(data) {
    const { token: token , expectedPrice: expectedPrice , signer: signer , onProgress: onProgress  } = data;
    const taker = await signer.getAddress();
    const client = (0, $63606961de7cfbf3$export$6bb76d6eba7e258c)();
    const options = data.options || {};
    const baseApiUrl = client.currentChain()?.baseApiUrl;
    if (!client.currentChain()) throw new ReferenceError("ZooClient missing chain configuration");
    try {
        const params = {
            taker: taker,
            token: `${token.contract}:${token.tokenId}`,
            source: client.source || "",
            ...options
        };
        if (client.normalizeRoyalties !== undefined && params.normalizeRoyalties === undefined) params.normalizeRoyalties = client.normalizeRoyalties;
        await (0, $a89c379ae92dec7a$export$21ece85d7636deb)({
            url: `${baseApiUrl}/execute/sell/v6`,
            method: "post",
            data: params
        }, signer, onProgress, undefined, expectedPrice);
        return true;
    } catch (err) {
        const data = {
            token: `${token.contract}:${token.tokenId}`
        };
        (0, $abfac63fd1119cf4$export$b5fe3f66a567bec0)({
            method: "POST",
            url: `${baseApiUrl}/tokens/refresh/v1`,
            data: JSON.stringify(data)
        });
        throw err;
    }
}




async function $31cb625494aa0d5b$export$5e1997c166a16792(data) {
    const { tokens: tokens , orderIds: orderIds , rawOrders: rawOrders , expectedPrice: expectedPrice , signer: signer , onProgress: onProgress  } = data;
    const taker = await signer.getAddress();
    const client = (0, $63606961de7cfbf3$export$6bb76d6eba7e258c)();
    const options = data.options || {};
    const baseApiUrl = client.currentChain()?.baseApiUrl;
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
        if (tokens) params.tokens = tokens?.map((token)=>`${token.contract}:${token.tokenId}`);
        else if (orderIds) params.orderIds = orderIds;
        else if (rawOrders) params.rawOrders = rawOrders;
        if (client.normalizeRoyalties !== undefined && params.normalizeRoyalties === undefined) params.normalizeRoyalties = client.normalizeRoyalties;
        await (0, $a89c379ae92dec7a$export$21ece85d7636deb)({
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
            (0, $abfac63fd1119cf4$export$b5fe3f66a567bec0)({
                method: "POST",
                url: `${baseApiUrl}/tokens/refresh/v1`,
                data: JSON.stringify(data)
            });
        });
        throw err;
    }
}




async function $ad2aa4cd981c9917$export$1d5423ff89b08a3c(data) {
    const { id: id , signer: signer , onProgress: onProgress  } = data;
    const client = (0, $63606961de7cfbf3$export$6bb76d6eba7e258c)();
    const options = data.options || {};
    const baseApiUrl = client.currentChain()?.baseApiUrl;
    if (!baseApiUrl) throw new ReferenceError("ZooClient missing chain configuration");
    try {
        const params = {
            id: id,
            ...options
        };
        await (0, $a89c379ae92dec7a$export$21ece85d7636deb)({
            url: `${baseApiUrl}/execute/cancel/v2`,
            params: params
        }, signer, onProgress);
        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
}





async function $cdcfb7335e58885c$export$c5dd9dc6df16df31(data) {
    const { listings: listings , signer: signer , onProgress: onProgress = ()=>{} , precheck: precheck  } = data;
    const client = (0, $63606961de7cfbf3$export$6bb76d6eba7e258c)();
    const maker = await signer.getAddress();
    const baseApiUrl = client.currentChain()?.baseApiUrl;
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
                "x-rkc-version": "0.4.0"
            }
        };
        if (precheck) {
            const apiKey = client.currentChain()?.apiKey;
            if (apiKey && request.headers) request.headers["x-api-key"] = apiKey;
            if (client?.uiVersion && request.headers) request.headers["x-rkui-version"] = client.uiVersion;
            const res = await (0, $4mq6z$axios).request(request);
            if (res.status !== 200) throw res.data;
            const data = res.data;
            onProgress(data["steps"]);
            return data["steps"];
        } else await (0, $a89c379ae92dec7a$export$21ece85d7636deb)(request, signer, onProgress);
        return true;
    } catch (err) {
        console.error(err);
        throw err;
    }
}




async function $974a8862ee28a959$export$6d65a5902ff15306({ bids: bids , signer: signer , onProgress: onProgress  }) {
    const client = (0, $63606961de7cfbf3$export$6bb76d6eba7e258c)();
    const maker = await signer.getAddress();
    const baseApiUrl = client.currentChain()?.baseApiUrl;
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
        await (0, $a89c379ae92dec7a$export$21ece85d7636deb)({
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


const $d5566eff14828706$var$actions = {
    acceptOffer: $c759a5b848c3f340$export$ed27da83bcbea2e5,
    buyToken: $31cb625494aa0d5b$export$5e1997c166a16792,
    cancelOrder: $ad2aa4cd981c9917$export$1d5423ff89b08a3c,
    listToken: $cdcfb7335e58885c$export$c5dd9dc6df16df31,
    placeBid: $974a8862ee28a959$export$6d65a5902ff15306
};
var $d5566eff14828706$export$2e2bcd8739ae039 = $d5566eff14828706$var$actions;


var $30cb609612a5109b$exports = {};

$parcel$export($30cb609612a5109b$exports, "executeSteps", () => $a89c379ae92dec7a$export$21ece85d7636deb);
$parcel$export($30cb609612a5109b$exports, "setParams", () => $647b25b545ba3e6d$export$dc1827290674c112);
$parcel$export($30cb609612a5109b$exports, "pollUntilOk", () => $1f074173aef8d3e6$export$d2c70568ef790b87);
$parcel$export($30cb609612a5109b$exports, "pollUntilHasData", () => $1f074173aef8d3e6$export$f014594cc879f602);
$parcel$export($30cb609612a5109b$exports, "isOpenSeaBanned", () => $dc98aca5039a1d2b$export$feaa73ad8ed3f2b9);
$parcel$export($30cb609612a5109b$exports, "request", () => $abfac63fd1119cf4$export$b5fe3f66a567bec0);





async function $dc98aca5039a1d2b$export$feaa73ad8ed3f2b9(ids) {
    let url = "https://api.opensea.io/api/v1/assets";
    ids.forEach((id, i)=>{
        const [contract, tokenId] = id.split(":");
        const prefix = i === 0 ? "?" : "&";
        url = `${url}${prefix}token_ids=${tokenId}&asset_contract_addresses=${contract}`;
    });
    const res = await (0, $4mq6z$axios).get(url);
    const json = res.data;
    const client = (0, $63606961de7cfbf3$export$6bb76d6eba7e258c)();
    const currentChain = client?.currentChain();
    const baseApiUrl = currentChain?.apiKey;
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
            if (client?.uiVersion) headers["x-rkui-version"] = client.uiVersion;
            (0, $4mq6z$axios).post(`${baseApiUrl}/tokens/flag/v1`, JSON.stringify(body), {
                headers: headers
            }).catch(()=>{});
        });
    }
    return statuses;
}





let $63606961de7cfbf3$var$_client;
class $63606961de7cfbf3$export$f29e902efe386198 {
    utils = {
        ...$30cb609612a5109b$exports
    };
    actions = (0, $d5566eff14828706$export$2e2bcd8739ae039);
    constructor(options){
        this.version = "0.4.0" // hardcode this for now
        ;
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
function $63606961de7cfbf3$export$6bb76d6eba7e258c() {
    //throw an error
    return $63606961de7cfbf3$var$_client;
}
function $63606961de7cfbf3$export$5d730b7aed1a3eb0(options) {
    if (!$63606961de7cfbf3$var$_client) $63606961de7cfbf3$var$_client = new $63606961de7cfbf3$export$f29e902efe386198(options);
    else $63606961de7cfbf3$var$_client.configure(options);
    return $63606961de7cfbf3$var$_client;
}



var $7da7428cf263c8f9$exports = {};
var $0f5d1df90d4e0898$exports = {};
/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */ 

$parcel$exportWildcard($7da7428cf263c8f9$exports, $0f5d1df90d4e0898$exports);




export {$63606961de7cfbf3$export$f29e902efe386198 as ZooClient, $63606961de7cfbf3$export$6bb76d6eba7e258c as getClient, $63606961de7cfbf3$export$5d730b7aed1a3eb0 as createClient, $a89c379ae92dec7a$export$21ece85d7636deb as executeSteps, $647b25b545ba3e6d$export$dc1827290674c112 as setParams, $1f074173aef8d3e6$export$d2c70568ef790b87 as pollUntilOk, $1f074173aef8d3e6$export$f014594cc879f602 as pollUntilHasData, $dc98aca5039a1d2b$export$feaa73ad8ed3f2b9 as isOpenSeaBanned, $abfac63fd1119cf4$export$b5fe3f66a567bec0 as request};
//# sourceMappingURL=index.mjs.map
