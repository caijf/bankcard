import React, { useState } from "react";
import { cards, searchCardBin, validateCardInfo } from 'bankcard';
import SyntaxHighlighter from "react-syntax-highlighter";
import tomorrowNightEighties from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties";

const regCardBin = /^62/;
const supportCardType = 'CC';

const data = cards.filter(item => regCardBin.test(item.cardBin) && supportCardType === item.cardType);

export default function Demo3() {
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
        <h2>仅查询【62】开头的信用卡</h2>
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

const regCardBin = /^62/;
const supportCardType = 'CC';

const data = cards.filter(item => regCardBin.test(item.cardBin) && supportCardType === item.cardType);

export default function Demo(){
  const [cardNo, setCardNo] = useState('');
  const [resultBin, setResultBin] = useState('');
  const [resultBinMultiple, setResultBinMultiple] = useState('');
  const [resultCardInfo, setResultCardInfo] = useState('');

  function handleChangeCardNo(e) {
    const { value } = e.currentTarget;
    setCardNo(value);

    const ret1 = bc.searchCardBin(value, { data });
    const ret2 = bc.searchCardBin(value, { multiple: true, data });
    const ret3 = bc.validateCardInfo(value, { data });

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