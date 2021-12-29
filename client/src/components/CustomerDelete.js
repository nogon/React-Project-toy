import React from 'react';

class CustomerDelete extends React.Component {

    deleteCustomer(id) {
        console.log('id : ', id);
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        }).then((res) => {
            console.log('res----',res);
            // 삭제 후 refresh
            this.props.stateRefresh();
        });

    }
    
    render() {
        return(
            <button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
        )
    }
}

export default CustomerDelete;