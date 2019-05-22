import React from 'react'
import { Link } from 'react-router-dom'

/**
 * import할 때 복잡하게 상대참조 할 필요 없이 'components', 'containers'만 지정해주면 된다.
 * ???Form 계열, ???Page 계열은 redux 로직이 필요하므로 'components'가 아닌 'containers'에서 import 한다.
 */ 
import { Block } from 'components'
import { LoginForm } from 'containers'

/**
 * components는 presentational components를 상징하며, 따라서 redux 로직이 들어가지 않는 것을 권장한다.
 * 별도의 추가 state 없이 props에서 정보를 받아 표현해주는 역할만 수행한다.
 * https://github.com/diegohaz/arc/wiki/Containers
 */

const MainPage = (props) => {
  return (
    <div>
      <Block>
        <h1>Dutch Broomstick</h1>
        <LoginForm />
      </Block>
      <Block>
        <p>계정이 없다면? <Link to="/signup">회원가입</Link></p>
      </Block>
    </div>
  )
}

export default MainPage
