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

// App bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  paper: {
    marginLeft: 20,
    marginRight: 20
  },
  progress: {
    margin: theme.spacing(2)
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
});


class App extends React.Component {

  // 서버에 접속해서 데이터 가져오기
  // state는 React.Component 내에서 변경될 수 있는 변수를 처리하고자 할 때 사용
  // state 초기화 변수
  // state = {
  //   customers: "",
  //   completed: 0
  // }

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callApi()
      .then(res => {
        this.setState({customers: res});
        console.log('stateRefresh res --- ', res);
      })
      .catch(err => console.log(err));
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
    const cellList = ["번호","사진","이름","생년월일","성별","직업","설정"];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Customer Manage System
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
        {/* props값으로 stateRefresh를 설정. 함수 자체를 props 형태로 보내주는 것.  */}
        <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {/* <TableCell>번호</TableCell>
                <TableCell>사진</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>설정</TableCell> */}
                {cellList.map(c => {
                  return ( <TableCell className={classes.tableHead}>{c}</TableCell>)
                })}
              </TableRow>
            </TableHead>

            {/* <TableBody>
            { this.state.customers ? this.state.customers.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.id}</TableCell>
                <TableCell>{c.img}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.birth}</TableCell>
                <TableCell>{c.gender}</TableCell>
                <TableCell>{c.job}</TableCell>
              </TableRow>
            )) : */}
            
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => {
                return(
                  <Customer stateRefresh={this.stateRefresh} key={c.id}
                    id={c.id} img={c.img} name={c.name} birth={c.birth} gender={c.gender} job={c.job} />)
              }) :
              <TableRow>
                  <TableCell colSpan={6} align='center'>
                    <CircularProgress className={classes.progress} variant='determinate' value={this.state.completed} />
                  </TableCell>
              </TableRow>}
            </TableBody>
          </Table>
        </Paper>
        
      </div>
    )
  }
}

export default withStyles(styles) (App);
