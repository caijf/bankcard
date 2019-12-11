import React from "react";
import { cardType } from 'bankcard';

export default function DemoDescription(props) {
  const { bankCardInstance } = props;

  return (
    <div className="demo-box">
      <h4>查询以下银行（{bankCardInstance.bank.length}）</h4>
      <table>
        <thead>
          <tr>
            <th>银行名称</th>
            <th>银行编码</th>
          </tr>
        </thead>
      </table>
      <div style={{ maxHeight: 300, overflow: 'auto' }}>
        <table>
          <tbody>
            {
              bankCardInstance.bank.map(item => (
                <tr key={item.bank}>
                  <td>{item.name}</td>
                  <td>{item.bank}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <h4>查询以下银行卡（{bankCardInstance.bankCardBin.length}）</h4>
      <table>
        <thead>
          <tr>
            <th>银行编码</th>
            <th>bin</th>
            <th>卡类型</th>
            <th>卡号长度</th>
          </tr>
        </thead>
      </table>
      <div style={{ maxHeight: 300, overflow: 'auto' }}>
        <table>
          <tbody>
            {
              bankCardInstance.bankCardBin.map(item => (
                <tr key={item.bin + item.length}>
                  <td>{item.bank}</td>
                  <td>{item.bin}</td>
                  <td>{cardType[item.type]}</td>
                  <td>{item.length}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}