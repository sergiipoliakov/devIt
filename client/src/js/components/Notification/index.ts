import { ArgsProps, IconType } from 'antd/lib/notification';
import { notification } from 'antd';
import './index.sass';

const Notification = (type: string) => (props: ArgsProps): void => {
    const {
        message,
        description,
        className,
        style,
        duration
    } = props;

    notification[type as IconType]({
        message,
        duration,
        description,
        className,
        style
    });
};

export default Notification;
