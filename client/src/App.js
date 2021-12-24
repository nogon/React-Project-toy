import './App.css';
import React from 'react';
import Customer from './components/Customer';

import { Paper } from '@material-ui/core';

import { Table } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import { CircularProgress } from '@material-ui/core';

import CustomerAdd from './components/CustomerAdd';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth:1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})

class App extends React.Component {

  // 서버에 접속해서 데이터 가져오기
  // state는 React.Component 내에서 변경될 수 있는 변수를 처리하고자 할 때 사용
  state = {
    customers: "",
    completed: 0
  }
  /*
    component lifeCicle
    1. constructor() -> 2. componentWillMount() -> 3. render() -> 4. componentDidMount()
    props or state가 변경될 경우 -> shouldComponentUpdate() -> view 자동 갱신
  */
  // api 서버에 접근하여 데이터를 받아오는 작업은 componentDidMount 함
  // 모든 컴포넌트가 mount가 완료되었을때 실행됨.
  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>사진</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            { this.state.customers ? this.state.customers.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.img}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.birth}</TableCell>
                <TableCell>{c.gender}</TableCell>
                <TableCell>{c.job}</TableCell>
                  {/* <Customer key={c.id}
                    id={c.id} img={c.img} name={c.name} birth={c.birth} gender={c.gender} job={c.job}
                  /> */}
              </TableRow>
            )) :
              <TableRow>
                  <TableCell colSpan={6} align='center'>
                    <CircularProgress className={classes.progress} variant='determinate' value={this.state.completed} />
                  </TableCell>
              </TableRow>}
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd />
      </div>
    )
  }
}

export default withStyles(styles) (App);
