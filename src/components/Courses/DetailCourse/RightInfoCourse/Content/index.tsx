import React from 'react';
import { ReactComponent as IconTick } from '../../../../../assets/svg/IconTick.svg';
import './style.scss';

const mockupData = [
    {
        key: 'LV1',
        title: 'Khoá 1 - Giới thiệu về excel',
        units: [
            'U1: Presentation',
            'U2: Job opportunities (career profile)',
            'U3: How to get the most out of this course!'
        ]
    },
    {
        key: 'LV2',
        title: 'Khoá 2 - Làm việc chuyên sâu',
        units: [
            'U4: Hiểu về biểu thức',
            'U5: Cấu trúc điều kiện',
            'U6: Thực hành biểu thức, cấu trúc điều kiện'
        ]
    },

]
export const ContentInfoSource = () => {
    console.log(mockupData[0].units[0].split(':'));

    return (
        <div className="container-content-info-course">
            <h3>Tổng quan</h3>
            {mockupData.map((item) => {
                return (
                    <div className="level-course" key={item.key}>
                        <span className="title">{item.title}</span>
                        <ul className="list-units">
                            {item.units.map((unitItem) => {
                                return (
                                    <li key={item.key + item.units}>
                                        <span className="title-unit">{unitItem.split(':')[0]}</span>
                                        <span className="name-unit">{unitItem.split(':')[1].trim()}</span>
                                        <IconTick className={`status true`} />
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                )
            })}
        </div>
    )
}
