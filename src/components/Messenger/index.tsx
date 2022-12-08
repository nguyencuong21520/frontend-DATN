import React from 'react';
import { connect } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Badge, Input } from 'antd';
import { State } from '../../redux-saga/reducer/reducer';
import { ReactComponent as Plus } from '../../assets/svg/plus.svg';
import AvatarUser from '../../assets/img/AvatarUser.jpg';
import Chat from './Chat';
import './style.scss';

interface TypeSummaryDataChat {
    avatar: string;
    name: string;
    time: string;
    currentMess: string;
    room: string;
}
const mockUpDataChatSummary: Array<TypeSummaryDataChat> = [
    {
        avatar: AvatarUser,
        name: 'Nguyễn Văn Cường',
        time: '8:10 PM',
        currentMess: 'Đây là chat của tôi hoặc người cộng sự chat cùng, hahahaaaaaaaaaaaaaaaaah',
        room: '188sdas-12'
    },
    {
        avatar: AvatarUser,
        name: 'Nguyễn Văn Cường',
        time: '8:10 PM',
        currentMess: 'Đây là chat của tôi hoặc người cộng sự chat cùng, hahahaaaaaaaaaaaaaaaaah',
        room: '188sdas12osdsa12vgj-12'
    },
    {
        avatar: AvatarUser,
        name: 'Nguyễn Văn Cường',
        time: '8:10 PM',
        currentMess: 'Đây là chat của tôi hoặc người cộng sự chat cùng, hahahaaaaaaaaaaaaaaaaah',
        room: '188sdksahdsas-12'
    },
    {
        avatar: AvatarUser,
        name: 'Nguyễn Văn Cường',
        time: '8:10 PM',
        currentMess: 'Đây là chat của tôi hoặc người cộng sự chat cùng, hahahaaaaaaaaaaaaaaaaah',
        room: '188sd123axcasas-12'
    },
    {
        avatar: AvatarUser,
        name: 'Nguyễn Văn Cường',
        time: '8:10 PM',
        currentMess: 'Đây là chat của tôi hoặc người cộng sự chat cùng, hahahaaaaaaaaaaaaaaaaah',
        room: '188s--123das-12'
    },
    {
        avatar: AvatarUser,
        name: 'Nguyễn Văn Cường',
        time: '8:10 PM',
        currentMess: 'Đây là chat của tôi hoặc người cộng sự chat cùng, hahahaaaaaaaaaaaaaaaaah',
        room: '188szmnmxcqwdas-12'
    },
    {
        avatar: AvatarUser,
        name: 'Nguyễn Văn A',
        time: '8:10 PM',
        currentMess: 'Đây là chat của tôi hoặc người cộng sự chat cùng, hahahaaaaaaaaaaaaaaaaah',
        room: '181213xa112qwdas-12'
    },

]
interface MessengerProps {
    type?: string;
}
interface MessengerState {
    currentRoomId: string;
}
class Messenger extends React.Component<MessengerProps, MessengerState> {
    constructor(props: MessengerProps) {
        super(props);
        document.title = 'Tin nhắn'
        this.state = {
            currentRoomId: mockUpDataChatSummary[0].room
        }
    }
    shouldComponentUpdate(nextProps: Readonly<MessengerProps>, nextState: Readonly<MessengerState>): boolean {
        if (this.state.currentRoomId !== nextState.currentRoomId) {
            return true;
        }
        return false;
    }
    private onChangeRoomMessenger = (idRoom: string) => {
        this.setState({
            currentRoomId: idRoom
        })
    }
    render(): React.ReactNode {
        return (
            <div className="container-messenger">
                <div className="left-messenger">
                    <div className="round">
                        <div className="title">
                            <span>Tin nhắn</span>
                            <Plus className="add" />
                        </div>
                        <div className="search">
                            <Input size="large" placeholder="Search" prefix={<SearchOutlined className="icon-search" />} className="input-search" />
                        </div>
                    </div>
                    {mockUpDataChatSummary.map((item) => {
                        return (
                            <div className="summary-chat" key={item.room} onClick={() => { this.onChangeRoomMessenger(item.room) }}>
                                <div className="image-partner">
                                    <Badge>
                                        <Avatar shape="circle" size="large" src={item.avatar} />
                                    </Badge>
                                </div>
                                <div className="current-chat">
                                    <div className="name-time">
                                        <span className="name-user">
                                            {item.name}
                                        </span>
                                        <span className="time">{item.time}</span>
                                    </div>
                                    <div className="summary-chat-own">
                                        <div className="summary-near-chat-time">
                                            <p>
                                                {item.currentMess}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
                <div className="right-messenger">
                    <Chat currentRoomId={this.state.currentRoomId} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger)