import { Tabs } from 'antd';
import { fetchData } from '../../api/fetchData';
import style from './HeadTabs.module.css';
import { useEffect } from 'react';

const HeadTabs = ({ setCurrentTab }) => {
  useEffect(() => {
    sessionStorage.setItem('tab', 'search');
  }, []);

  const items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ];

  const onChange = (key) => {
    setCurrentTab(items[key - 1].label.toLowerCase());
    sessionStorage.setItem('tab', items[key - 1].label.toLowerCase());
    fetchData();
  };

  return <Tabs className={style.tabs} defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default HeadTabs;
