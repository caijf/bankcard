import React, { useState } from "react";
import { cards, searchCardBin, validateCardInfo } from 'bankcard';
import SyntaxHighlighter from "react-syntax-highlighter";
import tomorrowNightEighties from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties";

const supportBanks = ['ABC', 'ICBC'];
const regCardBin = /^62/;

const data = cards.filter(item => supportBanks.indexOf(item.bankCode) > -1 && regCardBin.test(item.cardBin))

export default function Demo2() {
  const [cardNo, setCardNo] = useState('');
  const [resultBin, setResultBin] = useState('');
  const [resultBinMultiple, setResultBinMultiple] = useState('');
  const [resultCardInfo, setResultCardInfo] = useState('');

  function handleChangeCardNo(e) {
    const { value } = e.currentTarget;
    setCardNo(value);

    const ret1 = searchCardBin(value, { data });
    const ret2 = searchCardBin(value, { multiple: true, data });
    const ret3 = validateCardInfo(value, { data });

    setResultBin(JSON.stringify(ret1));
    setResultBinMultiple(JSON.stringify(ret2));
    setResultCardInfo(JSON.stringify(ret3));
  }

  return (
    <>
      <div className="demo-box">
        <h2>仅查询【中国农业银行】【中国工商银行】【62】开头的银行卡</h2>
        <input type="text" placeholder="请输入银行卡号" value={cardNo} onChange={handleChangeCardNo} />
        <h3>searchCardBin - 匹配单个银行卡bin:</h3>
        <div>{resultBin}</div>
        <h3>searchCardBin - 匹配多个银行卡bin:</h3>
        <div>{resultBinMultiple}</div>
        <h3>validateCardInfo - 校验银行卡号:</h3>
        <div>{resultCardInfo}</div>
      </div>

      <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
        {`import React from 'react';
import { CardBin } from 'bankcard';

const supportBanks = ['ABC', 'ICBC'];
const regCardBin = /^62/;

const data = cards.filter(item => supportBanks.indexOf(item.bankCode) > -1 && regCardBin.test(item.cardBin))

export default function Demo(){
  const [cardNo, setCardNo] = useState('');
  const [resultBin, setResultBin] = useState('');
  const [resultBinMultiple, setResultBinMultiple] = useState('');
  const [resultCardInfo, setResultCardInfo] = useState('');

  function handleChangeCardNo(e) {
    const { value } = e.currentTarget;
    setCardNo(value);

    const ret1 = searchCardBin(value, { data });
    const ret2 = searchCardBin(value, { multiple: true, data });
    const ret3 = validateCardInfo(value, { data });

    setResultBin(JSON.stringify(ret1));
    setResultBinMultiple(JSON.stringify(ret2))
    setResultCardInfo(JSON.stringify(ret3));
  }

  return (
    <>
      <input type="text" placeholder="请输入银行卡号" value={cardNo} onChange={handleChangeCardNo} />
      <h3>cardBin - 匹配单个银行卡bin:</h3>
      <div>{resultBin}</div>
      <h3>cardBin - 匹配多个银行卡bin:</h3>
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