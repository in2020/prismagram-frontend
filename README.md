# install packages
- `npm add styled-components react-router-dom graphql react-apollo-hooks apollo-boost react-helmet react-toastify styled-reset`

# React hook
Class 없이 State를 사용할 수 있는 기능
- useState:  함수형 컴포넌트 상태 관리 함수. 기본적인 React 문법에 따라 Component Class this.setState 등을 수행해야하는 번거로움 개선 
- useEffect: 함수형 컴포넌트 에서 componentDidMount, componentWillUpdate, componentWillUnmount를 제어하는 함수. state 별 설정 가능.
```
useEffect(함수, [스테이트])
example
const number = useState(0)[0];
useEffect(sayHello, [number])
```

# React Context(Provider)
props, state 이외 상태를 관리하는 속성, props top down 방식과 다르게 Tree 구조내에서 전역 변수처럼 변경 가능     

# Apollo
- GraphQL Client Package 
- ApolloProvider 설정하고 apollo chrome plugin을 설치하면 plugin에서 모든 Query, Mutaion, Subscription을 볼수 있다.