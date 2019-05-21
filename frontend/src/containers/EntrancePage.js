import React from 'react'
import { connect } from 'react-redux'
import { EntrancePage } from 'components'

const EntrancePageContainer = (props) => {
  return <EntrancePage {...props} />
}

const mapStateToProps = () => ({

})

export default connect(mapStateToProps)(EntrancePageContainer)
