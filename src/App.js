import './App.css';
import React from 'react';
import Customer from './components/Customer';

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
    return (
      <div>
        { customers.map(c => {
            return(
              <Customer key={c.id}
                id={c.id}
                img={c.img}
                name={c.name}
                birth={c.birth}
                gender={c.gender}
                job={c.job}
              />
            );
          }) }
      </div>
    )
  }
}

export default App;
