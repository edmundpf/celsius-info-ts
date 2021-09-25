[celsius-info-ts](../README.md) / [Exports](../modules.md) / default

# Class: default

CelsiusInfo Class

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [balances](default.md#balances)
- [sdk](default.md#sdk)
- [stats](default.md#stats)
- [transactions](default.md#transactions)

### Methods

- [authenticate](default.md#authenticate)
- [coinMarketCapRequest](default.md#coinmarketcaprequest)
- [driver](default.md#driver)
- [getBalances](default.md#getbalances)
- [getQuotes](default.md#getquotes)
- [getStats](default.md#getstats)
- [getTransactions](default.md#gettransactions)
- [log](default.md#log)

## Constructors

### constructor

• **new default**()

## Properties

### balances

• **balances**: `ActionDict` = `{}`

#### Defined in

[utils/CelsiusInfo.ts:51](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L51)

___

### sdk

• `Optional` **sdk**: `CelsiusInstance`

#### Defined in

[utils/CelsiusInfo.ts:46](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L46)

___

### stats

• **stats**: `Stats`

#### Defined in

[utils/CelsiusInfo.ts:47](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L47)

___

### transactions

• **transactions**: `TransactionRecord`[] = `[]`

#### Defined in

[utils/CelsiusInfo.ts:52](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L52)

## Methods

### authenticate

▸ **authenticate**(): `Promise`<`void`\>

Authenticate

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/CelsiusInfo.ts:79](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L79)

___

### coinMarketCapRequest

▸ `Private` **coinMarketCapRequest**(`endpoint`, `args?`): `Promise`<`any`\>

Coin Market Cap Request

#### Parameters

| Name | Type |
| :------ | :------ |
| `endpoint` | ``"api"`` \| ``"quotes"`` \| ``"authHeader"`` |
| `args?` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[utils/CelsiusInfo.ts:333](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L333)

___

### driver

▸ **driver**(`args?`): `Promise`<`void`\>

Driver

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `DriverArgs` |

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/CelsiusInfo.ts:58](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L58)

___

### getBalances

▸ **getBalances**(): `Promise`<`void`\>

Get Balances

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/CelsiusInfo.ts:92](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L92)

___

### getQuotes

▸ `Private` **getQuotes**(): `Promise`<`NumericDict`\>

Get Quotes

#### Returns

`Promise`<`NumericDict`\>

#### Defined in

[utils/CelsiusInfo.ts:309](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L309)

___

### getStats

▸ **getStats**(): `Promise`<`void`\>

Get Stats

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/CelsiusInfo.ts:234](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L234)

___

### getTransactions

▸ **getTransactions**(`args?`): `Promise`<`any`\>

Get Transactions

#### Parameters

| Name | Type |
| :------ | :------ |
| `args?` | `TransactionArgs` |

#### Returns

`Promise`<`any`\>

#### Defined in

[utils/CelsiusInfo.ts:122](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L122)

___

### log

▸ `Private` **log**(): `Promise`<`void`\>

Log

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/CelsiusInfo.ts:357](https://github.com/edmundpf/celsius-info-ts/blob/63bdf52/src/utils/CelsiusInfo.ts#L357)
