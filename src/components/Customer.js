// react lib 불러오기
import React from 'react';

import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';

// Customer Class 정의하기. React에 Component 형태로 작성된 Class
class Customer extends React.Component {
    render() {
        const name = this.props.name;
        return  (
            <div>
                {/* <CustomerProfile id={this.props.id} img={this.props.img} name={this.props.name} />
                <CustomerInfo birth={this.props.birth} gender={this.props.gender} job={this.props.job} /> */}

                <TableRow>
                    <TableCell>{this.props.id}</TableCell>
                    <TableCell><img src={this.props.img} alt="profile"></img></TableCell>
                    <TableCell>{this.props.name}</TableCell>
                    <TableCell>{this.props.birth}</TableCell>
                    <TableCell>{this.props.gender}</TableCell>
                    <TableCell>{this.props.job}</TableCell>
                </TableRow>
            </div>
        )
    }
}

class CustomerProfile extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.img} alt="profile" />
                <h2>{this.props.id} - {this.props.name}</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.birth}</p>
                <p>{this.props.gender}</p>
                <p>{this.props.job}</p>
            </div>
        )
    }
}

// Customer 내보내기
export default Customer;