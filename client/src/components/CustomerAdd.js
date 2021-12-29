import React from 'react';
import { post } from 'axios';

// midal 창 lib
import { Dialog, DialogContentText } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

// 디자인 class 정하기. ex) hidden이란 class
const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class CustomerAdd extends React.Component {

    // 생성자 정의
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birth: '',
            gender: 0,
            job: '',
            fileName: '',
            open: false
        }
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
            file: null,
            userName: '',
            birth: '',
            gender: 0,
            job: '',
            fileName: '',
            open: false
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log('---->',response.data);
                // App.js에 있는 stateRefresh 불러오기
                // (고객 목록을 불러오는 과정은 비동기적이라 서버로부터 고객을 추가한 이후에 응답을 받고 나서 refresh 하도록 설정)
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            birth: '',
            gender: 0,
            job: '',
            fileName: '',
            open: false
        })
        // window.location.reload();
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        //const formData = new URLSearchParams();
        formData.append('img', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birth', this.state.birth);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        // 파일이 포함되어 있는 데이터를 서버로 보낼시엔 웹표준에 맞는 header를 추가해줘야함
        const config = {
            Headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    render() {
        // 디자인 클래스를 입히기 위해서 클래스 변수를 초기화.
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가 화면</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName == "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br />
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
                        <br />
                        <TextField label="생년월일" input type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange} />
                        <br />
                        <TextField label="성별" input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
                        <br />
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
                        <br />
                    </DialogContent>

                    <DialogActions>
                        <Button variant='contained' color='primary' onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant='outlined' color='primary' onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            
            // <form onSubmit={this.handleFormSubmit}>
            //     <h1>사용자 추가</h1>
            //     프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} />
            //     <br />
            //     이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} />
            //     <br />
            //     생년월일 : <input type="text" name="birth" value={this.state.birth} onChange={this.handleValueChange} />
            //     <br />
            //     성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} />
            //     <br />
            //     직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} />
            //     <br />
            //     <button type='submit'>추가</button>
            // </form>
        )
    }
}

// 외부 라이브러리에서 사용 할 수 있게 export
// 디자인 요소가 적용되었기 때문에 CustomerAdd를 내보낼 때 withStyles를 적용해서 내보내면 됨
export default withStyles(styles) (CustomerAdd);