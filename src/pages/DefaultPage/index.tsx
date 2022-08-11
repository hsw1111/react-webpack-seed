import './index.less';
import { Empty } from 'antd';
import emptyImg from '@/assets/svg/empty_default_img.svg';

const DefaultPage: React.FC = () => {
  return (
    <div className="my-default-page">
      <Empty
        className="img"
        image={emptyImg}
        imageStyle={{
          width: 151,
          height: 151,
        }}
        description={<span className="no-data">暂无数据</span>}
      />
    </div>
  );
};

export default DefaultPage;
