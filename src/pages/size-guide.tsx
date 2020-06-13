import React, { useContext } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";
import { Col, Row, Table } from 'antd';
import WindowDimensionsProvider from '../shared/WindowDimensionsProvider';
import { WindowDimensionsContext } from "../shared/WindowDimensionsProvider";

const SizeTable = () => {
  const { width } = useContext(WindowDimensionsContext);
  const dataSource1 = [
    {
      key: '1',
      size: 'Bust (cm)',
      34: 80,
      36: 84,
      38: 88,
      40: 92,
      42: 96,
      44: 100,
      46: 104,
      48: 108
    },
    {
      key: '2',
      size: 'Waist (cm)',
      34: 62,
      36: 64,
      38: 68,
      40: 72,
      42: 76,
      44: 80,
      46: 84,
      48: 88
    },
    {
      key: '3',
      size: 'Hip (cm)',
      34: 88,
      36: 92,
      38: 96,
      40: 100,
      42: 104,
      44: 108,
      46: 112,
      48: 116
    },
  ];

  const columns1 = [
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '34',
      dataIndex: '34',
      key: '34',
    },
    {
      title: '36',
      dataIndex: '36',
      key: '36',
    },
    {
      title: '38',
      dataIndex: '38',
      key: '38',
    },
    {
      title: '40',
      dataIndex: '40',
      key: '40',
    },
    {
      title: '42',
      dataIndex: '42',
      key: '42',
    },
    {
      title: '44',
      dataIndex: '44',
      key: '44',
    },
    {
      title: '46',
      dataIndex: '46',
      key: '46',
    },
    {
      title: '48',
      dataIndex: '48',
      key: '48',
    }
  ];
  ///////////////////
  const columns2 = [
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '50',
      dataIndex: '50',
      key: '50',
    },
    {
      title: '52',
      dataIndex: '52',
      key: '52',
    },
    {
      title: '54',
      dataIndex: '54',
      key: '54',
    },
    {
      title: '56',
      dataIndex: '56',
      key: '56',
    },
    {
      title: '58',
      dataIndex: '58',
      key: '58',
    },
    {
      title: '60',
      dataIndex: '60',
      key: '60',
    },
    {
      title: '62',
      dataIndex: '62',
      key: '62',
    },
    {
      title: '64',
      dataIndex: '64',
      key: '64',
    }
  ];
  const dataSource2 = [
    {
      key: '1',
      size: 'Bust (cm)',
      50: 113,
      52: 118,
      54: 123,
      56: 128,
      58: 133,
      60: 138,
      62: 143,
      64: 148
    },
    {
      key: '2',
      size: 'Waist (cm)',
      50: 93,
      52: 98,
      54: 103,
      56: 108,
      58: 113,
      60: 118,
      62: 123,
      64: 128
    },
    {
      key: '3',
      size: 'Hip (cm)',
      50: 121,
      52: 126,
      54: 131,
      56: 136,
      58: 141,
      60: 146,
      62: 151,
      64: 156
    },
  ];


  /// Mobile
  const columnMobile = [
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Bust (cm)',
      dataIndex: 'bust',
      key: 'bust',
    },
    {
      title: 'Waist (cm)',
      dataIndex: 'waist',
      key: 'waist',
    },
    {
      title: 'Hip (cm)',
      dataIndex: 'hip',
      key: 'hip',
    },
  ];

  const dataMobile = [
    {
      key: '1',
      size: '34',
      bust: 80,
      waist: 62,
      hip: 88,
    },
    {
      key: '2',
      size: '36',
      bust: 84,
      waist: 64,
      hip: 92,
    },
    {
      key: '3',
      size: '38',
      bust: 88,
      waist: 68,
      hip: 96,
    },
    {
      key: '4',
      size: '40',
      bust: 92,
      waist: 72,
      hip: 100,
    },
    {
      key: '5',
      size: '42',
      bust: 96,
      waist: 76,
      hip: 104,
    },
    {
      key: '6',
      size: '44',
      bust: 100,
      waist: 80,
      hip: 108,
    },
    {
      key: '7',
      size: '46',
      bust: 104,
      waist: 84,
      hip: 112,
    },
    {
      key: '8',
      size: '48',
      bust: 108,
      waist: 88,
      hip: 116,
    },
    {
      key: '9',
      size: '50',
      bust: 113,
      waist: 93,
      hip: 121,
    },
    {
      key: '10',
      size: '52',
      bust: 118,
      waist: 98,
      hip: 126,
    },
    {
      key: '11',
      size: '54',
      bust: 123,
      waist: 103,
      hip: 131,
    },
    {
      key: '12',
      size: '56',
      bust: 128,
      waist: 108,
      hip: 136,
    },
    {
      key: '13',
      size: '58',
      bust: 133,
      waist: 113,
      hip: 141,
    },
    {
      key: '14',
      size: '60',
      bust: 138,
      waist: 118,
      hip: 146,
    },
    {
      key: '15',
      size: '62',
      bust: 143,
      waist: 123,
      hip: 151,
    },
    {
      key: '16',
      size: '64',
      bust: 148,
      waist: 128,
      hip: 156,
    },
  ];

  return (
    <Row className='centerAlign' type='flex' justify='center' gutter={40}>
      { width <= 576 ?
        (
          <Col span={24} lg={12} md={16}>
            <Table dataSource={dataMobile} columns={columnMobile} pagination={{pageSize: 8}}/>
          </Col>
        ) : (
          <Col span={24} lg={12} md={16}>
            <Table dataSource={dataSource1} columns={columns1} pagination={false} />
            <hr className="divider" />
            <Table dataSource={dataSource2} columns={columns2} pagination={false} />
          </Col>
        )}
    </Row>
  );
}
const SizeGuide = ({ location }) => {

  return (
    <Layout location={location}>
      <WindowDimensionsProvider>
        <Helmet title={`FAQ | ${config.siteTitle}`} />
        <hr className='divider' />
        <div className='grid'>
          <h1 className="centerAlign">
            Size Guide
        </h1>
          <SizeTable />
        </div>
        <hr className='divider' />
      </WindowDimensionsProvider>
    </Layout >
  );
}

export default SizeGuide;
