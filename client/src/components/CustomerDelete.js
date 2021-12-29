import React from 'react';

// midal 창 lib
import { Dialog, DialogContentText } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

class CustomerDelete extends React.Component {

    // 생성자 명시
    constructor(props) {
        super(props);
        // state 값을 초기화 할 수 있도록 함
        this.state = {
            open: false
        }
    }

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

    
    // 고객추가 버튼을 눌러서 modal창을 띄우기 위해 설정. open값을 true로 변경
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    // handleClose() {
    // handleClose = () => {    자동으로 바인딩처리가 됨
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    
    render() {
        return(
            // button onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</button>
            <div>
                <Button variant='contained' color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객 정보가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default CustomerDelete;