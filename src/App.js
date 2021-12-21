import './App.css';
import React from 'react';
import Customer from './components/Customer';

import { Paper } from '@material-ui/core';

import { Table } from '@material-ui/core';
import { TableHead } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';

import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth:1080
  }
})

const customers = [
  {
    'id' : 1,
    'img' : 'https://placeimg.com/64/64/1',
    'name' : '홍길동',
    'birth' : '920523',
    'gender' : '남자',
    'job' : '대학생'
  }, {
    'id' : 2,
    'img' : 'https://placeimg.com/64/64/2',
    'name' : '이순신',
    'birth' : '820523',
    'gender' : '남자',
    'job' : '직장인'
  }, {
    'id' : 3,
    'img' : 'https://placeimg.com/64/64/3',
    'name' : '강감찬',
    'birth' : '720523',
    'gender' : '남자',
    'job' : '프리랜서'
  },
]

class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
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
          { customers.map(c => (
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
          )) }
            </TableBody>
          </Table>
      </Paper>
    )
  }
}

export default withStyles(styles) (App);
