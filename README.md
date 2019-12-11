# bankcard

通过银行卡号查询银行卡信息，支持浏览器端（es5、es6）和node

## 安装

```shell
npm install bankcard
```

## 使用

- **浏览器引入 `es5`**

在浏览器中使用 `script` 标签直接引入文件，并使用全局变量 `bankcard` 。

`npm` 包的 `bankcard/dist` 目录下提供了 `bankcard.js` 以及 `bankcard.min.js`。你也可以通过 [UNPKG](https://unpkg.com/bankcard@latest/dist/) 进行下载。

```javascript
<script src="https://unpkg.com/browse/bankcard@1/dist/bankcard.min.js"></script>
<script>
	bankcard.cardBin("10354");
	bankcard.validateCardInfo("622305453434432224");
</script>
```

- **`es6`**

```javascript
import { cardBin } from 'bankcard';

cardBin("622305453434432224");
```

- **`umd` `node`**

```javascript
const bankcard = require('bankcard');

bankcard.cardBin("622305453434432224");
```

## 示例

- [查询所有银行卡](https://codesandbox.io/s/confident-cartwright-1uh1z?fontsize=14)
- [仅查询【中国农业银行】【中国工商银行】非【62】开头的银行卡](https://codesandbox.io/s/mystifying-wave-czzzx?fontsize=14)
- [仅查询【62】开头的信用卡](https://codesandbox.io/s/hardcore-keller-8ymxc?fontsize=14)
- [浏览器直接引入](https://codesandbox.io/s/wizardly-fire-8mrnj?fontsize=14&hidenavigation=1&theme=dark)
- [node中使用](https://codesandbox.io/s/youthful-wave-sb4ou?fontsize=14)

## API

**bank**

银行列表

```javascript
[
  {
    bank: string, // 银行编码
    name: string  // 银行名称
  }
]
```

**cardType**

卡类型映射名称

```
{
  DC: "储蓄卡",
  CC: "信用卡",
  SCC: "准贷记卡",
  PC: "预付费卡"
}
```

**bankCardBin**

银行卡Bin列表

```javascript
[
  {
    bin: string, // 银行卡bin
    bank: string, // 银行编码
    type: string, // 卡类型，DC、CC、SCC、PC
    length: number // 卡号长度
  }
]
```

**format(*bankCardBinItem*)**

格式化银行卡信息，参数为卡bin。用于格式化 `cardBin` `validateCardInfo` 方法的返回值。

```javascript
// 可以配合 bankCardBin 使用
format(bankCardBin[0])
```

**carBin(*cardNo*, *multiple=false*)**

根据银行卡卡号查询卡bin，适用于输入银行卡号匹配银行卡信息。

无结果返回 `null`，有结果返回：

```javascript
{
  bankName: string, // 银行名称
  bankCode: string, // 银行编码
  cardType: string, // 卡类型
  cardTypeName: string, // 卡类型名称
  length: number // 卡号长度
}
```

如果第二个参数为 `true`，返回数组。无结果则返回 `[]`。*(不常用，仅少数不同银行的卡bin存在重复)*

**validateCardInfo(*cardNo*)**

验证银行卡号。返回：

```javascript
{
  validated: boolean, // 验证结果
  message: string, // 错误信息
  
  // 当卡bin查找有结果时，才有以下值
  bankName: string,
  bankCode: string,
  cardType: string,
  cardTypeName: string,
  length: number
}
```

`message` 有以下值

1. `格式不正确（非0开头，15-19位数字）`：格式错误，银行卡号为15至19位数字
2. `找不到卡bin`：找不到该银行卡号
4. `卡号长度不对`：该银行卡号长度为x为数字

**BankCardClass**

银行卡类，可自定义规则，实例化不同场景。如：仅查询【中国农业银行】和【中国工商银行】，卡bin非【62】开头的银行卡。

```javascript
const bankcardInstance = new BankCardClass({
  include: {
    bank: ["ABC", "ICBC"]
  },
  exclude: {
    bin: /^62/
  }
});

console.log(bankcardInstance.bank);
console.log(bankcardInstance.bankCardBin);
```

实例参数

```javascript
{
  include: {
    bank: [Array<String|RegExp> | String | RegExp],
    bin: [Array<String|RegExp> | String | RegExp],
    type: [Array<String|RegExp> | String | RegExp],
    length: [Array<Number|RegExp> | Number | RegExp]
  },
  exclude: {
    bank: [Array<String|RegExp> | String | RegExp],
    bin: [Array<String|RegExp> | String | RegExp],
    type: [Array<Number |RegExp> | Number | RegExp],
    length: [Array<String|RegExp> | String | RegExp]
  },
}
```

创建实例时，实例的 `bank` `bankCardBin` 会根据 `include` `exclude` 进行过滤。

## 其他

- 为什么不采用[Luhn算法](https://baike.baidu.com/item/Luhn%E7%AE%97%E6%B3%95/22799984)校验卡号？

部分银行卡不符合Luhn算法。如招商银行的运通卡、中国银行借记卡等等。可参阅《[支付宝为什么不采用银行卡Luhn算法校验卡号？](https://www.zhihu.com/question/21729157)》。


