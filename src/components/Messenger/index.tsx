import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar, Badge, Input } from 'antd';
import { ReactComponent as Plus } from '../../assets/svg/plus.svg';
import Chat from './Chat';
import './style.scss';
import httpClient from '../../utils/axios';
import { Obj } from '../../global/interface';
import { formatTimeLast } from '../../utils';
import { io } from 'socket.io-client';

const Messenger = () => {
    const [crrRoomId, setCrrRoomId] = useState(null);
    const [chat, setChat] = useState<any>(null);
    const [crrChat, setCrrChat] = useState<any>(null);

    async function callData() {
        if (!chat) {
            const dataChat = await httpClient.get('api/chat');
            if (dataChat) {
                setChat(dataChat.data.response.data);
                setCrrRoomId(dataChat.data.response.data[0]._id);
            }
        }
    }
    useEffect(() => {
        callData();
    }, []);
    useEffect(() => {
        setCrrChat(() => {
            return (chat as unknown as Array<Obj>)?.filter((item) => item._id === crrRoomId)
        })
    }, [crrRoomId])

    return <div className="container-messenger">
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
            {chat ? (chat as any).map((item: Obj) => {
                return (
                    <div className="summary-chat" key={item._id} onClick={() => { setCrrRoomId(item._id) }}>
                        <div className="image-partner">
                            <Badge>
                                <Avatar shape="circle" size="large" src={""} />
                            </Badge>
                        </div>
                        <div className="current-chat">
                            <div className="name-time">
                                <span className="name-user">
                                    {item.myFriendInfo.name}
                                </span>
                                <span className="time">{(formatTimeLast(new Date(item.createTime)))}</span>
                            </div>
                            <div className="summary-chat-own">
                                <div className="summary-near-chat-time">
                                    <p>
                                        {item.message[item.message.length]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) : "đata"}

        </div>
        <div className="right-messenger">
            {crrChat && <Chat currentRoomId={crrRoomId as unknown as string} data={crrChat[0]} />}

        </div>
    </div>
}
export default Messenger