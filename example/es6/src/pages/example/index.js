import React, { useState } from "react";
import { Link } from 'react-router-dom';

import './styles.less';

import Demo1 from './Demo1';
import Demo2 from './Demo2';
import Demo3 from './Demo3';

const demoData = [
  {
    id: '1',
    text: '查询所有银行卡号',
    component: Demo1
  },
  {
    id: '2',
    text: '仅查询【中国农业银行】【中国工商银行】非【62】开头的银行卡',
    component: Demo2
  },
  {
    id: '3',
    text: '仅查询【62】开头的信用卡',
    component: Demo3
  }
];

export default function ({ match, history }) {
  const { params: { id } } = match;

  const hanldeBack = () => {
    history.goBack();
  }

  const demoObj = id ? demoData.find(item => item.id === id) || {} : {};
  const Comp = demoObj.component;

  return (
    <div className="demo-box">
      {
        id ? <button type="button" onClick={hanldeBack}>返回</button> : (
          <ul>
            {
              demoData.map(item => <li key={item.id}><Link to={`/${item.id}`}>{item.text}</Link></li>)
            }
          </ul>
        )
      }
      {
        Comp && <Comp />
      }
    </div>
  );
}
