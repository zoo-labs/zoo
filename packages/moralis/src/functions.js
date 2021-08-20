"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// Should replace variables here to target different networks
var contracts_json_1 = require("./contracts.json");
var ZK = contracts_json_1["default"]['97']['testnet']['ZooKeeper'];
var CHAIN_ID = '97';
// Get this enviroment's ZK contract
function getZooKeeper() {
    return __awaiter(this, void 0, void 0, function () {
        var web3;
        return __generator(this, function (_a) {
            web3 = moralis_1["default"].web3ByChain(CHAIN_ID);
            return [2 /*return*/, new web3.eth.Contract(ZK.abi, ZK.address)];
        });
    });
}
// Query for a specific Animal
function getAnimal(tokenID) {
    return __awaiter(this, void 0, void 0, function () {
        var Animals, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Animals = moralis_1["default"].Object.extend('Animals');
                    query = new moralis_1["default"].Query(Animals);
                    query.equalTo('tokenID', tokenID);
                    return [4 /*yield*/, query.find()];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    });
}
// Query for a specific Egg
function getEgg(eggID) {
    return __awaiter(this, void 0, void 0, function () {
        var Eggs, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Eggs = moralis_1["default"].Object.extend('Eggs');
                    query = new moralis_1["default"].Query(Eggs);
                    query.equalTo('tokenID', eggID);
                    return [4 /*yield*/, query.find()];
                case 1: return [2 /*return*/, (_a.sent())[0]];
            }
        });
    });
}
// Get latest token information from ZK
function getToken(tokenID) {
    return __awaiter(this, void 0, void 0, function () {
        var zooKeeper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getZooKeeper()];
                case 1:
                    zooKeeper = _a.sent();
                    return [4 /*yield*/, zooKeeper.methods.tokens(tokenID).call()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// Is current request confirmed?
function confirmed(request) {
    return request.object.get('confirmed');
}
function setCommon(entity, _a) {
    var object = _a.object;
    entity.set('owner', object.get('from'));
    entity.set('from', object.get('from'));
    entity.set('blockNumber', object.get('block_number'));
    entity.set('transactionHash', object.get('transaction_hash'));
    entity.set('timestamp', Date.now());
}
// Instantiate a new Animal
function newAnimal(request) {
    var Animals = moralis_1["default"].Object.extend('Animals');
    var animal = new Animals();
    setCommon(animal, request);
    return animal;
}
// Instantiate a new Egg
function newEgg(request) {
    var Eggs = moralis_1["default"].Object.extend('Eggs');
    var egg = new Eggs();
    setCommon(egg, request);
    return egg;
}
// Instantiate a new Transaction
function newTransaction(request) {
    var Transactions = moralis_1["default"].Object.extend('Transactions');
    var tx = new Transactions();
    setCommon(tx, request);
    return tx;
}
moralis_1["default"].Cloud.afterSave('BuyEgg', function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, eggID, egg_1, egg, tok, tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = moralis_1["default"].Cloud.getLogger();
                eggID = parseInt(request.object.get('eggID')) // new Token ID
                ;
                if (!!confirmed(request)) return [3 /*break*/, 2];
                egg_1 = newEgg(request);
                egg_1.set('tokenID', eggID);
                egg_1.set('kind', 0);
                egg_1.set('type', 'basic');
                egg_1.set('interactive', false);
                egg_1.set('hatched', false);
                return [4 /*yield*/, egg_1.save()];
            case 1:
                _a.sent();
                logger.info("Egg " + eggID + " saved at " + Date.now());
                return [2 /*return*/];
            case 2: return [4 /*yield*/, getEgg(eggID)];
            case 3:
                egg = _a.sent();
                return [4 /*yield*/, getToken(eggID)];
            case 4:
                tok = _a.sent();
                egg.set('interactive', true);
                egg.set('tokenURI', tok.data.tokenURI);
                egg.set('metadataURI', tok.data.metadataURI);
                egg.set('rarity', tok.rarity.name);
                return [4 /*yield*/, egg.save()];
            case 5:
                _a.sent();
                tx = newTransaction(request);
                tx.set('action', 'Bought Egg');
                tx.set('tokenID', eggID);
                return [4 /*yield*/, tx.save()];
            case 6:
                _a.sent();
                logger.info("Egg " + eggID + " saved at " + Date.now());
                return [2 /*return*/];
        }
    });
}); });
moralis_1["default"].Cloud.afterSave('Hatch', function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, eggID, tokenID, egg, animal_1, animal, tok, tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = moralis_1["default"].Cloud.getLogger();
                eggID = parseInt(request.object.get('eggID')) // Egg hatching will be burned
                ;
                tokenID = parseInt(request.object.get('tokenID')) // New Animal minted
                ;
                return [4 /*yield*/, getEgg(eggID)];
            case 1:
                egg = _a.sent();
                if (!!confirmed(request)) return [3 /*break*/, 4];
                // Update egg state
                egg.set('animalID', tokenID);
                egg.set('hatched', true);
                egg.set('interactive', false);
                return [4 /*yield*/, egg.save()
                    // Set initial animal state
                ];
            case 2:
                _a.sent();
                animal_1 = newAnimal(request);
                animal_1.set('tokenID', tokenID);
                animal_1.set('eggID', eggID);
                return [4 /*yield*/, animal_1.save()];
            case 3:
                _a.sent();
                logger.info("Hatch Egg " + eggID + " saved at " + Date.now());
                return [2 /*return*/];
            case 4:
                // Update Egg
                egg.set('hatched', true);
                egg.set('interactive', true);
                return [4 /*yield*/, egg.save()
                    // Update Animal with confirmed state
                ];
            case 5:
                _a.sent();
                return [4 /*yield*/, getAnimal(tokenID)];
            case 6:
                animal = _a.sent();
                return [4 /*yield*/, getToken(tokenID)];
            case 7:
                tok = _a.sent();
                animal.set('kind', parseInt(tok.kind));
                animal.set('tokenURI', tok.data.tokenURI);
                animal.set('metadataURI', tok.data.metadataURI);
                animal.set('rarity', tok.rarity.name);
                animal.set('yield', parseInt(tok.rarity.yield));
                animal.set('boost', parseInt(tok.rarity.boost));
                animal.set('name', tok.name);
                animal.set('listed', false);
                animal.set('revealed', false);
                return [4 /*yield*/, animal.save()];
            case 8:
                _a.sent();
                tx = newTransaction(request);
                tx.set('action', 'Hatched Egg');
                tx.set('eggID', eggID);
                tx.set('tokenID', tokenID);
                return [4 /*yield*/, tx.save()];
            case 9:
                _a.sent();
                logger.info("Hatched new " + tok.name + " (" + tokenID + ") from " + eggID);
                return [2 /*return*/];
        }
    });
}); });
moralis_1["default"].Cloud.afterSave('Breed', function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, eggID, parentA, parentB, now, egg_2, pA, pB, egg, tok, tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = moralis_1["default"].Cloud.getLogger();
                eggID = parseInt(request.object.get('eggID')) // new Hybrid Egg
                ;
                parentA = parseInt(request.object.get('parentA')) // parent A ID
                ;
                parentB = parseInt(request.object.get('parentB')) // parent B ID
                ;
                now = Date.now();
                if (!!confirmed(request)) return [3 /*break*/, 6];
                egg_2 = newEgg(request);
                egg_2.set('tokenID', eggID);
                egg_2.set('kind', 2);
                egg_2.set('type', 'hybrid');
                egg_2.set('interactive', false);
                egg_2.set('hatched', false);
                egg_2.set('parentA', parentA);
                egg_2.set('parentB', parentB);
                return [4 /*yield*/, egg_2.save()
                    // Update breeding time on animals
                ];
            case 1:
                _a.sent();
                return [4 /*yield*/, getAnimal(parentA)];
            case 2:
                pA = _a.sent();
                pA.set('recentBreedTime', now);
                return [4 /*yield*/, pA.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, getAnimal(parentB)];
            case 4:
                pB = _a.sent();
                pB.set('recentBreedTime', now);
                return [4 /*yield*/, pB.save()];
            case 5:
                _a.sent();
                logger.info("Hybrid Egg " + eggID + " hatched, pending confirmation");
                return [2 /*return*/];
            case 6: return [4 /*yield*/, getEgg(eggID)];
            case 7:
                egg = _a.sent();
                return [4 /*yield*/, getToken(eggID)];
            case 8:
                tok = _a.sent();
                egg.set('interactive', true);
                egg.set('tokenURI', tok.data.tokenURI);
                egg.set('metadataURI', tok.data.metadataURI);
                egg.set('rarity', tok.rarity.name);
                return [4 /*yield*/, egg.save()];
            case 9:
                _a.sent();
                tx = newTransaction(request);
                tx.set('action', 'Breed Animals');
                tx.set('parentA', tok.parentA);
                tx.set('parentB', tok.parentB);
                tx.set('tokenID', tok.tokenID);
                return [4 /*yield*/, tx.save()];
            case 10:
                _a.sent();
                logger.info("Hybrid Egg " + tok.tokenID + " saved successfully");
                return [2 /*return*/];
        }
    });
}); });
// Update token state after burn
moralis_1["default"].Cloud.afterSave('Burn', function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, tokenID, tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!confirmed(request))
                    return [2 /*return*/];
                logger = moralis_1["default"].Cloud.getLogger();
                tokenID = parseInt(request.object.get('tokenID')) // Token burning
                ;
                tx = newTransaction(request);
                tx.set('action', 'Burned Token');
                tx.set('tokenID', tokenID);
                return [4 /*yield*/, tx.save()];
            case 1:
                _a.sent();
                logger.info("Burned " + tokenID);
                return [2 /*return*/];
        }
    });
}); });
// Update animal state after Free
moralis_1["default"].Cloud.afterSave('Free', function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, tokenID, animal, tx;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!confirmed(request))
                    return [2 /*return*/];
                logger = moralis_1["default"].Cloud.getLogger();
                tokenID = parseInt(request.object.get('tokenID')) // Animal being freed
                ;
                return [4 /*yield*/, getAnimal(tokenID)];
            case 1:
                animal = _a.sent();
                animal.set('burned', true);
                animal.set('freed', true);
                return [4 /*yield*/, animal.save()];
            case 2:
                _a.sent();
                tx = newTransaction(request);
                tx.set('action', 'Free Animal');
                tx.set('tokenID', tokenID);
                return [4 /*yield*/, tx.save()];
            case 3:
                _a.sent();
                logger.info("Animal " + animal.name + " (" + tokenID + " released into Wild");
                return [2 /*return*/];
        }
    });
}); });
moralis_1["default"].Cloud.define('getAverageGasPrice', function (request) {
    return __awaiter(this, void 0, void 0, function () {
        var query, pipeline;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new moralis_1["default"].Query('BscTransactions');
                    pipeline = [
                        {
                            group: {
                                // group by "from_address"
                                objectId: '$from_address',
                                // add computed property avgGas
                                // get average and convert wei to gwei
                                avgGas: { $avg: { $divide: ['$gas_price', 1000000000] } }
                            }
                        },
                        { sort: { avgGas: -1 } },
                        { limit: 10 }, // only return top 10 results
                    ];
                    return [4 /*yield*/, query.aggregate(pipeline, { useMasterKey: true })];
                case 1: 
                // the master key is required for aggregate queries
                return [2 /*return*/, _a.sent()];
            }
        });
    });
});
// This is a convenience function to drop the tables
moralis_1["default"].Cloud.define('dropTables', function (request) { return __awaiter(void 0, void 0, void 0, function () {
    var logger, classNames, _i, classNames_1, name_1, Class, query, results, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger = moralis_1["default"].Cloud.getLogger();
                classNames = ['User', 'Breed', 'Burn', 'BuyEgg', 'Free', 'Hatch', 'Mint', 'Eggs', 'Animals', 'Transactions'];
                _i = 0, classNames_1 = classNames;
                _a.label = 1;
            case 1:
                if (!(_i < classNames_1.length)) return [3 /*break*/, 7];
                name_1 = classNames_1[_i];
                Class = moralis_1["default"].Object.extend(name_1);
                query = new moralis_1["default"].Query(Class);
                return [4 /*yield*/, query.limit(1000).find()];
            case 2:
                results = _a.sent();
                logger.info("Dropping table " + name_1);
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < results.length)) return [3 /*break*/, 6];
                return [4 /*yield*/, results[i].destroy()];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6:
                _i++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/];
        }
    });
}); });
