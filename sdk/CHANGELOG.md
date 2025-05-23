## [v1.1.6-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/3ebb44fd825dcf48fa43391e8f39f73c171589ae) (2023-06-16)

- Post results to execute results when signing transactions [62a347f](https://github.com/reservoirprotocol/reservoir-kit/commit/62a347fa9b93a37e7a6b85e7c7f41ab4e283d9bd)

## [v1.1.5-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/0beba7d7841d59650a393d8b0e95f92395d09ee5) (2023-06-13)

- Upgrade viem dependency to ~0.3.35 [8450dd9](https://github.com/reservoirprotocol/reservoir-kit/commit/8450dd9186dd50222dfc0d4f485c874553475fcb)
- Sync api [a8866c1](https://github.com/reservoirprotocol/reservoir-kit/commit/a8866c10ccb6bdd7f819413334909163fb610ce0)

## [v1.1.4-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/f8d10590c54535b3cee1b1ade23f4d05db0286e3) (2023-06-12)

- Sync api [ebaeb06](https://github.com/reservoirprotocol/reservoir-kit/commit/ebaeb0678344f800f396fc7abef33ab89f22c566)

## [v1.1.3-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/e020c0b5011162cee58b346c968f23201e5bd664) (2023-06-12)

- Fix value being undefined when trying to submit transaction [4894bab](https://github.com/reservoirprotocol/reservoir-kit/commit/4894bab779c20d0c59d41ed987669ef4bd140a8c)

## [v1.1.2-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/feddb9c7b3ea63d0c45c47f295a1c357c580a6e9) (2023-06-09)

- Extend support for local accounts [1e5de9f](https://github.com/reservoirprotocol/reservoir-kit/commit/1e5de9fb964a99366de63394fb82aab134049ca8)

## [v1.1.1-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/bf694150c615ba69bfe604e39381a357b6ded7be) (2023-06-08)

- fix sendTransaction to allow privateKeyAccounts [5cdeb4e](https://github.com/reservoirprotocol/reservoir-kit/commit/5cdeb4e3e20e2e8279a261c37b7198ce4bd46b1e)

## [v1.1.0-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/aab81ad978dc73758f49d3e7c305992e3b5b99b8) (2023-06-08)

- Strip out flagged status api calls [9afae7f](https://github.com/reservoirprotocol/reservoir-kit/commit/9afae7f3e3bd9eb1ddcc2eef33913cc18530345d)

## [v1.0.2-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/184ae12361a0b8fe11a3beeb37e14489ddb94730) (2023-06-07)

- Handle sweep price changes [4955f8c](https://github.com/reservoirprotocol/reservoir-kit/commit/4955f8c20d7bf75603be3354554fffc211a59b2e)

## [v1.0.1-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/7b5a62277d1439f728afbdadf394cad20e7a1d2e) (2023-06-06)

- Remove all opensea api methods and hooks [3d131a5](https://github.com/reservoirprotocol/reservoir-kit/commit/3d131a5882ee4dbae39a3c52b40b51223522882a)

## [v1.0.0-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/11b74c5d5af10f57d83e6d009103732b242140bf) (2023-06-01)

- Replace useTokens with execute/buy precheck [8948876](https://github.com/reservoirprotocol/reservoir-kit/commit/894887652e47d5065f08db77d788081c19944c41)
- Update buyToken with precheck logic [0e55942](https://github.com/reservoirprotocol/reservoir-kit/commit/0e5594251b9cb33f1cdbd6b01bdc475cb0a6fef3)
- Allow overriding chain when triggering SDK actions [4e01f24](https://github.com/reservoirprotocol/reservoir-kit/commit/4e01f24eabbccfb31639b68c368722479fba2f5a)
- Moved viem client to executeSteps [aa6a6fd](https://github.com/reservoirprotocol/reservoir-kit/commit/aa6a6fd28f667c55fefefc5a9c85b03d28180f72)
- Sync api [09afad4](https://github.com/reservoirprotocol/reservoir-kit/commit/09afad4c3641f179b7ff3a57aae8ac9eb01b5fd4)

## [v0.11.0-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/dc00e0e655c95db43da184ef3522792772ff64d0) (2023-05-30)

- Add block number to error log [29d345e](https://github.com/reservoirprotocol/reservoir-kit/commit/29d345e0de3fd904c01938514e176173ff8759b6)

## [v0.10.7-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/668bc1fd1e2f144868bb0c8371b08e9c89722031) (2023-05-27)

- Merge pull request #244 from reservoirprotocol/pedro/grwth-2551-support-batch-selling-in-rk [48d2ba4](https://github.com/reservoirprotocol/reservoir-kit/commit/48d2ba44c74877f353e1b38d0e6781aec1ca7408)
- Revert back to importing allChains from viem [47696f3](https://github.com/reservoirprotocol/reservoir-kit/commit/47696f3f25cccc4319e2b55cb0d509b89a7fe8ff)
- Got speeding up a transaction to work [f2aedb1](https://github.com/reservoirprotocol/reservoir-kit/commit/f2aedb101d7cbb4a04f92194ce4aca5ef9bb559e)

## [v0.10.6-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/63c59e0da409013f57823945f85e69c08f4da306) (2023-05-23)

- Merge pull request #251 from reservoirprotocol/armando/grwth-2747-add-hook-for-activity-search [7acbc47](https://github.com/reservoirprotocol/reservoir-kit/commit/7acbc47b899d9b71bdf0e6a7ede24fb2653a0b8f)
- Merge pull request #238 from reservoirprotocol/armando/grwth-2582-use-opensea-testnet-api [b8023c0](https://github.com/reservoirprotocol/reservoir-kit/commit/b8023c0b0f55da699afec8b07f1777e35247fa6b)
- feat: Sync APIs [af5529a](https://github.com/reservoirprotocol/reservoir-kit/commit/af5529af47bdee8a435009981d38d5a805bcbb47)
- Fixed signTypedData in executeSteps [2023-05-22](https://github.com/reservoirprotocol/reservoir-kit/commit/c2b71db)
- fix: add data to sendTransaction [98e9e26](https://github.com/reservoirprotocol/reservoir-kit/commit/98e9e264b71139b51aa716496b7b67138c31642a)
- Fix http url error [53a1c73](https://github.com/reservoirprotocol/reservoir-kit/commit/53a1c73ad0261bbc2fe9b9d8e971c9a56cf808a0)
- moved wagmi to peer dependencies [2023-05-16](https://github.com/reservoirprotocol/reservoir-kit/commit/ae63a9c)
- attempting to fix build errors [52ec0f9](https://github.com/reservoirprotocol/reservoir-kit/commit/52ec0f976073baf041cee1995649c414976b78c8)
- wip [ffbdcaf](https://github.com/reservoirprotocol/reservoir-kit/commit/ffbdcaf018b247209cb3b25da889f36217d16bf0)
- Switch sdk to viem [d35f183](https://github.com/reservoirprotocol/reservoir-kit/commit/d35f18338dba5966a841c3bc10791eb3205fbd82)
- wip batch accepting bids [dac02e1](https://github.com/reservoirprotocol/reservoir-kit/commit/dac02e1f319ccbfa4aaccf6e299f6d2dfa30df5e)
- feat: Resolve review [de5cc74](https://github.com/reservoirprotocol/reservoir-kit/commit/de5cc74d6662d9768f136ed1ab8aba440aba03f0)
- feat: Add overriding [86e476b](https://github.com/reservoirprotocol/reservoir-kit/commit/86e476b297f7e88c8b47df6c9d0f3cfea932aba5)
- feat: Small improvement [ed45401](https://github.com/reservoirprotocol/reservoir-kit/commit/ed4540187a79a768dadaaa927beee2cd013eb9b2)
- feat: Hardcode chain value [f2ef440](https://github.com/reservoirprotocol/reservoir-kit/commit/f2ef440dd1541ebe6f720be92404b36a82262a33)
- feat: Use testnet api on goerli [ee898e0](https://github.com/reservoirprotocol/reservoir-kit/commit/ee898e09b9b4c2e8fbff1784983ddd1cebeb0c4e)

## [v0.10.5-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/ae3b3aa61933b6ec64b8743afa5e7f59082ca514) (2023-05-18)

## [v0.10.4-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/61f26707b30936b517d84b5a21e286a45ca60715) (2023-05-16)

- Sync api [b43c772](https://github.com/reservoirprotocol/reservoir-kit/commit/b43c772de1928fe1d102052fc8e87b8c6c70e15d)

## [v0.10.3-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/7a221f668302c45f48185ed630dc0482bc3c37cc) (2023-05-15)

- Sync api [e4a5184](https://github.com/reservoirprotocol/reservoir-kit/commit/e4a5184b02a7fbd54bad62129ccce294f5ee2e26)
- feat: Use baseApiUrl [3ff1b50](https://github.com/reservoirprotocol/reservoir-kit/commit/3ff1b501993d3e42f776d4f3691e50494de3fe93)

## [v0.10.2-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/ab6cc02aea8ad246d5344324949ccdb35171d338) (2023-05-09)

## [v0.10.1-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/5035eb2d3895caff0c55feb1fdb84d477a3b1495) (2023-05-05)

## [v0.10.0-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/3fadb8c442e9a28685c190261ed46870c6583b49) (2023-05-05)

- [BREAKING] Fix reserved keyword typescript errors with default chain type (changed to active) [f93eea0](https://github.com/reservoirprotocol/reservoir-kit/commit/f93eea0a25028c0cd1be7ab2543898232f68a9a6)
- Fix: Only validate sales if the step has an id of sale [e9ee4aa](https://github.com/reservoirprotocol/reservoir-kit/commit/e9ee4aa19fec17f530affc65431743470c004511)

## [v0.9.3-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/4c4a3c7f2cefc49c724c6277dfd0e33931daf860) (2023-05-02)

- Sync API Types

## [v0.9.2-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/b160e2344e988e0d0ae4fd36ce6117cc46c27b7d) (2023-04-28)

- Show a warning when using deprecated APIs [c6bf13d](https://github.com/reservoirprotocol/reservoir-kit/commit/c6bf13d57fffee302af86d3ee8c1dccce73aa526)
- Sync API types [04f7435](https://github.com/reservoirprotocol/reservoir-kit/commit/04f743578fc59805b6def02af78a958e9970be46)

## [v0.9.1-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/a334f4cb644d8ca1393e8fa000cf3cb34f9c87d2) (2023-04-19)

## [v0.9.0-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/96af2dade0e25fc8a932252a076353f953eb1ad8) (2023-04-17)

- feat: syncing api types for opensea_verification_status [b2be3f7](https://github.com/reservoirprotocol/reservoir-kit/commit/b2be3f795c67f33e16c1b14a1f1f84b1be2d4f15)
- Notification emitter [1e2eb52](https://github.com/reservoirprotocol/reservoir-kit/commit/1e2eb522a220c9ee9799187f866f78c3cf7c9a30)
- Displaying steps in the cart [7d58d3e](https://github.com/reservoirprotocol/reservoir-kit/commit/7d58d3eb86824bed24c7efd44d402d12f14ae282)

## [v0.8.0-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/da760bb5d868cedc47d729dcf6a0ab5f6a42abbc) (2023-04-12)

- Add sales data to step item [1dd82b7](https://github.com/reservoirprotocol/reservoir-kit/commit/1dd82b708d79c63120fb054e8221ef19735000e9)
- Safely handle transactions being sped up and replaced [b1f406b](https://github.com/reservoirprotocol/reservoir-kit/commit/b1f406b288611ecb1de3ac0bb89d10c834f793bd)
- Added missing setState to execute steps [1e48ab6](https://github.com/reservoirprotocol/reservoir-kit/commit/1e48ab696d6d085ffc0d9be124a170a323d4c97a)
- Updated executeSteps [ fixed error ux](https://github.com/reservoirprotocol/reservoir-kit/commit/2023-04-06)

## [v0.7.3-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/e475a3838507e242eda6fd0f2f6ee3b8b80e6097) (2023-04-06)

- Added path to executeSteps state [2023-04-05](https://github.com/reservoirprotocol/reservoir-kit/commit/57271d6)

## [v0.7.2-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/f711acc75d34e6633ac8622a8bfbc91e0824625e) (2023-04-04)

- Sync api [6c80b4c](https://github.com/reservoirprotocol/reservoir-kit/commit/6c80b4c9c5936f009e3b2628d0c0e5db1d2701d3)
- Fix buyToken method [2023-04-04](https://github.com/reservoirprotocol/reservoir-kit/commit/d15707e)
- Added new marketplace api to dynamically calculate the marketplace fee [6dadd2f](https://github.com/reservoirprotocol/reservoir-kit/commit/6dadd2f6a0616de6e00f356888d737c4391897ee)
- Sync api [9db0e0a](https://github.com/reservoirprotocol/reservoir-kit/commit/9db0e0a72a48b57a4dbcd21888c0000a0c83902c)
- fix: bugs in the executeSteps parallelization changes [00677ef](https://github.com/reservoirprotocol/reservoir-kit/commit/00677ef9f198e1e54f9bab7b26e1bf5778e896f4)
- Parallelize step items [2023-03-31](https://github.com/reservoirprotocol/reservoir-kit/commit/1caf531)

## [v0.7.1-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/985268ee145e864fa15781e001505755ed22cdb0) (2023-04-03)

- Fix buyToken method regression, refresh token not triggered when buying a token that fails to be purchased [2023-04-04](https://github.com/reservoirprotocol/reservoir-kit/commit/d15707e)

- Sync api [6f68c95](https://github.com/reservoirprotocol/reservoir-kit/commit/6f68c95135b1b53cb8f07355e7bce8553c98bae5)

## [v0.7.0-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/1a88adbe5702e73ff1df400537404a3de546919f) (2023-03-23)

- Upgrade cancelOrder action to use v3 api [73ab41f](https://github.com/reservoirprotocol/reservoir-kit/commit/73ab41f82c989b1ddde8d0842faa811edf26b9b6)
- [BREAKING] Change the StepData type to include batched orderIds and crossPostingOrderId [d3d49d5](https://github.com/reservoirprotocol/reservoir-kit/commit/d3d49d548af4b85c5d4d172dc0605980cc5d5b3f)
- Advanced sdk logging' [3773fda](https://github.com/reservoirprotocol/reservoir-kit/commit/3773fda53bd0e6390a5bfc303a646f84528c2a49)
- Expose crosspost listing id [7f6fb52](https://github.com/reservoirprotocol/reservoir-kit/commit/7f6fb52c0d153ae09530730f5adafa33940552bf)
- update api.ts [8111c95](https://github.com/reservoirprotocol/reservoir-kit/commit/8111c9598261645eab9d78998a89889f5cd885d8)

## [v0.6.5-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/1daaf0a3144a164d5f0b9409ea119e8bd57d951f) (2023-03-21)

- Sync Api [eb9ddfd](https://github.com/reservoirprotocol/reservoir-kit/commit/eb9ddfd85306044fb6d10d52961f42faf977d20d)

* fix: removing space from top of changelog and fixing package.json version:update [de1aea7](https://github.com/reservoirprotocol/reservoir-kit/commit/de1aea7acf3fd69e762c60311513bc149aff38d4)

## [v0.6.4-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/29ba325ecf702f48c2e22937b5d01383bd11bf01) (2023-03-15)

- Fix mixed currency quote handling to support converted Buy-In quotes [6ada9e6](https://github.com/reservoirprotocol/reservoir-kit/commit/6ada9e6dfb3da534ec7cc1635f1d948028ca67cd)
- feat: adding logic to add git tags on version release and receive tag info in changelog generator [74fcca9](https://github.com/reservoirprotocol/reservoir-kit/commit/74fcca9783f7a3de7c6a7d84fa5aed7cf9c10fff)

## [v0.6.3-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/56ccb67aeaea5cff1ade7e16b8e98b27a7308184) (2023-03-10)

- Update progress when step items are dynamically fetched [bcd789b](https://github.com/reservoirprotocol/reservoir-kit/commit/bcd789bc6a4dad901b19b56f100a22cd1765d60a)

## [v0.6.2-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/f3d1d1761df44761235e6762dfa8bbccc79f20cf) (2023-03-08)

- Add oracle support to list modal [cd3e456](https://github.com/reservoirprotocol/reservoir-kit/commit/cd3e456e96bf8a1a61cc84e1c0b301813b6e4134)

## [v0.6.1-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/f66cccd1ff2d994a728d8531a81d4cc04a393e54) (2023-03-03)

- Fix empty source string passed when accepting an order [8f99333](https://github.com/reservoirprotocol/reservoir-kit/commit/8f9933339106d84349e81b4903a9f7e1b75168fe)

## [v0.6.0-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/68b7c39c14258ba3ae0d22e62bf3bcc52c0d93b4) (2023-03-02)

- Resolve conflicts [c111a94](https://github.com/reservoirprotocol/reservoir-kit/commit/c111a9492d15bfa8a570f1785fbba0219d61fedc)
- fix: Remove autofill from window location [a802631](https://github.com/reservoirprotocol/reservoir-kit/commit/a80263184c78b9be8f1a00b4c14b5bf1d346c763)
- fix: set source to undefined instead of an empty string [d2cbd22](https://github.com/reservoirprotocol/reservoir-kit/commit/d2cbd2294937cf8205bc99b2c0226a82cb1dfc79)

## [v0.5.1-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/f2cc71a861884ade62ce85c0829938a116fb156e) (2023-02-28)

- Fix BidModal net amount not in the same currency as bid amount [3dad8df](https://github.com/reservoirprotocol/reservoir-kit/commit/3dad8dfae6e59f66b4007042a168d13438f90ace)

## [v0.5.0-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/321f56e3643e040db75ef4ce43e6642a132c16c6) (2023-02-23)

- Upgrade execute/sell and execute/buy to v7 [1a4388a](https://github.com/reservoirprotocol/reservoir-kit/commit/1a4388afe4bfa10dc43c450000295339714cc86d)
- Upgrade to execute/bid v5 [e5c9a0b](https://github.com/reservoirprotocol/reservoir-kit/commit/e5c9a0b4bb432954868485e05e0f9a1780a3bbe5)
- Upgrade to execute/list v5 [c0aad51](https://github.com/reservoirprotocol/reservoir-kit/commit/c0aad51d089dc580accecab9be4ea8ebdc5c1260)

## [v0.4.0-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/6ac00fb924afc58590ad3e8c3bee8f0d3aedd062) (2023-02-15)

- Sync api [f08021d](https://github.com/reservoirprotocol/reservoir-kit/commit/f08021dfd25baff6626665d6a82377a149073599)
- Merge pull request #154 from reservoirprotocol/pedro/grwth-1940-hooks-configured-with-dynamic-reservoir [e93f7a5](https://github.com/reservoirprotocol/reservoir-kit/commit/e93f7a5a367797c68470eb6cf5934ac3376fbffb)
- Fix inline parameter docs [d7a7d16](https://github.com/reservoirprotocol/reservoir-kit/commit/d7a7d16bedb525b56953195f4cd1deeb22952cba)

## [v0.3.7-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/d5eda0b5123747bdae4609a0797fec4f9a189766) (2023-02-15)

- Tweak copy, enlarge cart popover empty state [10a18a2](https://github.com/reservoirprotocol/reservoir-kit/commit/10a18a20ad0b93453a1426b859b6a0c0950d5e0e)
- [BREAKING]: chain configuration overhaul [5214394](https://github.com/reservoirprotocol/reservoir-kit/commit/52143949362b4974d95ead6f6844e9dea1b6b9d3)
- Merge pull request #151 from reservoirprotocol/pedro/grwth-2014-maximum-transaction-detection-attempts [c59b624](https://github.com/reservoirprotocol/reservoir-kit/commit/c59b6242a8406a149f2b04c80cd3b0a46f2be8e6)

## [v0.3.6-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/4b2de3ee1f41a26bf44d38836d68822e35c88786) (2023-02-09)

- Update sdk types [d00b2a5](https://github.com/reservoirprotocol/reservoir-kit/commit/d00b2a591ad5e7741fdf2f5b0bb40c94611a9810)
- Merge pull request #147 from reservoirprotocol/ted/grwth-1949-allow-overriding-taker-in-sdk-actions [7ff3029](https://github.com/reservoirprotocol/reservoir-kit/commit/7ff3029d230ca5170c26116e961ba3130c421751)
- Add maximum attempts logic when detecting transaction ingestion [2a5d525](https://github.com/reservoirprotocol/reservoir-kit/commit/2a5d5258859dbd2d024ee932eea1c584b56a1a4b)
- Add dynamic pricing, refactor to have a simpler interface [5418e70](https://github.com/reservoirprotocol/reservoir-kit/commit/5418e705af0494322c1f5e70dae1f5ce281d46bc)
- Allow overriding taker in SDK actions [3871a31](https://github.com/reservoirprotocol/reservoir-kit/commit/3871a31049377a12ca030611fcacbbb9caa60105)

## [v0.3.5-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/760fcae0ab472374c209e0167ae25d7f7e17c684) (2023-01-30)

- Sync api [73267d3](https://github.com/reservoirprotocol/reservoir-kit/commit/73267d3178c13be00357e6ba24c8f51ed4f153ce)
- 🎉 Release client package v0.3.5 [9621708](https://github.com/reservoirprotocol/reservoir-kit/commit/9621708517e0b2043515510137f2584931eada51)
- Sync api [6863447](https://github.com/reservoirprotocol/reservoir-kit/commit/6863447142a5f24a046d93432e0c1b4de7d1f138)
- Support fetching multiple ban statuses from opensea [aacf0f7](https://github.com/reservoirprotocol/reservoir-kit/commit/aacf0f700d6d4fb918bf34d1c79a7348ab793275)

## [v0.3.4-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/a1aa27c0ffbd2b950028e46e383b14d2fe0791c5) (2023-01-20)

- Merge pull request #136 from reservoirprotocol/pedro/grwth-1678-acceptbid-modal-price-change-update [0c71239](https://github.com/reservoirprotocol/reservoir-kit/commit/0c712394a59bd2e4113bd1143eae41ef9210b11b)
- update price mismatch copy [84a04e9](https://github.com/reservoirprotocol/reservoir-kit/commit/84a04e94abcc84a527b39dba9932e96d2b76048e)
- Update error copy for price mismatch [f1086c9](https://github.com/reservoirprotocol/reservoir-kit/commit/f1086c9d0fbbbb1f10e38daddf78f3394be12b7f)

## [v0.3.3-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/9ec88ec35f9bb86b49242242af3d4f2fb67736d3) (2023-01-12)

- Sync api [af8f49c](https://github.com/reservoirprotocol/reservoir-kit/commit/af8f49cde96150615ff3a72a408c62dc733f66a0)
- Refresh token when buying or selling fails [85b209f](https://github.com/reservoirprotocol/reservoir-kit/commit/85b209fadb8a240ad1de1aea830b24575c9da815)

## [v0.3.2-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/fc97237b808aa00a5f12b15e585dd2aaa0a4f3c0) (2023-01-03)

- Fix alternative type enum array [2d9ce57](https://github.com/reservoirprotocol/reservoir-kit/commit/2d9ce571a2eed3a52292431249c8eba9a478974c)

## [v0.3.1-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/e3b46439464926156ec8faf97691e8e741adaa24) (2023-01-03)

- Fix array type transformations [f92f574](https://github.com/reservoirprotocol/reservoir-kit/commit/f92f5741c0c4c76071e0dcc935d709df6fe76632)

## [v0.3.0-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/6cbbff34c2425239ff6493494b9be247b44bbd7c) (2023-01-03)

- Sync API and add script to support parameters with simple x-alternatives types [784ef4d](https://github.com/reservoirprotocol/reservoir-kit/commit/784ef4db60c31e68712ca9e41799cd112ed017d0)
- Merge pull request #122 from reservoirprotocol/pedro/res-1638-rk-simulate-top-bid-if-accepting-offer [f92b606](https://github.com/reservoirprotocol/reservoir-kit/commit/f92b606f76be5e24ab74171399131d8579f746bb)
- Merge pull request #120 from reservoirprotocol/pedro/res-1664-rk-set-global-marketplace-fees-if-no [1e7c2b4](https://github.com/reservoirprotocol/reservoir-kit/commit/1e7c2b4150f153573447da3608bc4af240f0cd27)
- Simulate top bid if acceptOffer action fails [df3f63b](https://github.com/reservoirprotocol/reservoir-kit/commit/df3f63bc1be9e337ad0eb9c97c9ae33e4304ad05)
- Set global marketplace fee when no orderbook is passed, assuming it will be treated as reservoir on the backend [7c2fd67](https://github.com/reservoirprotocol/reservoir-kit/commit/7c2fd670f51943458a14fa37c2d6e9bb9ae85333)
- Fix opensea flagged check for contract ranges [ecfe971](https://github.com/reservoirprotocol/reservoir-kit/commit/ecfe971d4ae5f3493bce2d8f9bfb9a630aa65ca5)

## [v0.2.6-SDK](https://github.com/reservoirprotocol/reservoir-kit/commit/348e74af44287cc4ea087831a2ab874fdd2db2cc) (2022-12-28)

- Rename reservoir-kit-client to reservoir-sdk [5591309](https://github.com/reservoirprotocol/reservoir-kit/commit/5591309a87948588f0d379133be0a5669855f2f3)
- Rename client-sdk to reservoir-kit-core, rename reservoir-kit to reservoir-kit-ui [6f57826](https://github.com/reservoirprotocol/reservoir-kit/commit/6f57826858578442f39fa9ef80c25fbc5540aad7)
- Add automated royalty fees global option to the client sdk [3a638cf](https://github.com/reservoirprotocol/reservoir-kit/commit/3a638cf9315c993817874e73281459c821a33917)
- Mono repo setup [cd7043b](https://github.com/reservoirprotocol/reservoir-kit/commit/cd7043bbd4333d2e2668974c91434563ff5914db)
