import React, { useState } from "react";
import { CardBin } from 'bankcard';
import SyntaxHighlighter from "react-syntax-highlighter";
import tomorrowNightEighties from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties";

const supportBanks = ['ABC', 'ICBC'];
const regCardBin = /^62/;

const bc = new CardBin({
  filter: (data)=>{
    return supportBanks.indexOf(data.bankCode) > -1 && regCardBin.test(data.cardBin);
  }
});

export default function Demo2() {
  const [cardNo, setCardNo] = useState('');
  const [resultBin, setResultBin] = useState('');
  const [resultBinMultiple, setResultBinMultiple] = useState('');
  const [resultCardInfo, setResultCardInfo] = useState('');

  function handleChangeCardNo(e) {
    const { value } = e.currentTarget;
    setCardNo(value);

    const ret1 = bc.searchCardBin(value);
    const ret2 = bc.searchCardBin(value, true);
    const ret3 = bc.validateCardInfo(value);

    setResultBin(JSON.stringify(ret1));
    setResultBinMultiple(JSON.stringify(ret2));
    setResultCardInfo(JSON.stringify(ret3));
  }

  return (
    <>
      <div className="demo-box">
        <h2>仅查询【中国农业银行】【中国工商银行】【62】开头的银行卡</h2>
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

const supportBanks = ['ABC', 'ICBC'];
const regCardBin = /^62/;

const bc = new CardBin({
  filter: (data)=>{
    return supportBanks.indexOf(data.bankCode) > -1 && regCardBin.test(data.cardBin);
  }
});

export default function Demo(){
  const [cardNo, setCardNo] = useState('');
  const [resultBin, setResultBin] = useState('');
  const [resultBinMultiple, setResultBinMultiple] = useState('');
  const [resultCardInfo, setResultCardInfo] = useState('');

  function handleChangeCardNo(e) {
    const { value } = e.currentTarget;
    setCardNo(value);

    const ret1 = bc.searchCardBin(value);
    const ret2 = bc.searchCardBin(value, true);
    const ret3 = bc.validateCardInfo(value);

    setResultBin(JSON.stringify(ret1));
    setResultBinMultiple(JSON.stringify(ret2))
    setResultCardInfo(JSON.stringify(ret3));
  }

  return (
    <>
      <input type="text" placeholder="请输入银行卡号" value={cardNo} onChange={handleChangeCardNo} />
      <h3>cardBin(cardNo) - 匹配单个银行卡bin:</h3>
      <div>{resultBin}</div>
      <h3>cardBin(cardNo, true) - 匹配多个银行卡bin:</h3>
      <div>{resultBinMultiple}</div>
      <h3>validateCardInfo(cardNo) - 校验银行卡号:</h3>
      <div>{resultCardInfo}</div>
    </>
  )
}`}
        </SyntaxHighlighter>
    </>
  );
}