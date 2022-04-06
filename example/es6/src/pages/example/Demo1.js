import React, { useState } from "react";
import { searchCardBin, validateCardInfo } from 'bankcard';
import SyntaxHighlighter from "react-syntax-highlighter";
import tomorrowNightEighties from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties";

export default function Demo1() {
  const [cardNo, setCardNo] = useState('');
  const [resultBin, setResultBin] = useState('');
  const [resultBinMultiple, setResultBinMultiple] = useState('');
  const [resultCardInfo, setResultCardInfo] = useState('');

  function handleChangeCardNo(e) {
    const { value } = e.currentTarget;
    setCardNo(value);

    const ret1 = searchCardBin(value);
    const ret2 = searchCardBin(value, { multiple: true });
    const ret3 = validateCardInfo(value);

    setResultBin(JSON.stringify(ret1));
    setResultBinMultiple(JSON.stringify(ret2))
    setResultCardInfo(JSON.stringify(ret3));
  }

  return (
    <>
      <div className="demo-box">
        <h2>查询所有银行卡号</h2>
        <p>存在部分不同银行的卡Bin相同，但卡号长度不同。如622303和622305，16位是南京银行，18位是中国工商银行</p>
        <input type="text" placeholder="请输入银行卡号" value={cardNo} onChange={handleChangeCardNo} />
        <h3>searchCardBin(cardNo) - 匹配单个银行卡bin:</h3>
        <div>{resultBin}</div>
        <h3>searchCardBin(cardNo, true) - 匹配多个银行卡bin:</h3>
        <div>{resultBinMultiple}</div>
        <h3>validateCardInfo(cardNo) - 校验银行卡号:</h3>
        <div>{resultCardInfo}</div>
      </div>

      <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
        {`import React from 'react';
import { CardBin } from 'bankcard';

export default function Demo(){
  const [cardNo, setCardNo] = useState('');
  const [resultBin, setResultBin] = useState('');
  const [resultBinMultiple, setResultBinMultiple] = useState('');
  const [resultCardInfo, setResultCardInfo] = useState('');

  function handleChangeCardNo(e) {
    const { value } = e.currentTarget;
    setCardNo(value);

    const ret1 = searchCardBin(value);
    const ret2 = searchCardBin(value, { multiple: true });
    const ret3 = validateCardInfo(value);

    setResultBin(JSON.stringify(ret1));
    setResultBinMultiple(JSON.stringify(ret2))
    setResultCardInfo(JSON.stringify(ret3));
  }

  return (
    <>
      <input type="text" placeholder="请输入银行卡号" value={cardNo} onChange={handleChangeCardNo} />
      <h3>searchCardBin - 匹配单个银行卡bin:</h3>
      <div>{resultBin}</div>
      <h3>searchCardBin - 匹配多个银行卡bin:</h3>
      <div>{resultBinMultiple}</div>
      <h3>validateCardInfo - 校验银行卡号:</h3>
      <div>{resultCardInfo}</div>
    </>
  )
}`}
      </SyntaxHighlighter>
    </>
  );
}